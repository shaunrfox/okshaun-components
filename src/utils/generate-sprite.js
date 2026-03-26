import fs from 'fs';
import { glob } from 'glob';
import path from 'path';
import SVGSpriter from 'svg-sprite';
import { optimize } from 'svgo';
import config from './sprite-config.js';

// Directory paths
const dirs = {
  svgsSource: 'src/utils/svgsSource',
  svgsMetadata: 'src/utils/svgsMetadata',
  svgsOptimized: 'public/svgs',
  spriteOutput: 'public',
  typesOutput: 'src/components/Icon',
};

const iconMetadataPath = path.join(dirs.typesOutput, 'iconMetadata.json');
const iconMetadataOutputPath = path.join(
  dirs.spriteOutput,
  'icon-metadata.json',
);

// SVGO config
const svgoConfig = {
  plugins: [
    // Preset default with some options disabled
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          removeUnknownsAndDefaults: false,
          removeHiddenElems: false,
        },
      },
    },
    // Remove width/height in favor of viewBox
    'removeDimensions',
    // Remove unnecessary attributes
    {
      name: 'removeAttrs',
      params: {
        attrs: ['class', 'data-name', 'fill', 'stroke'],
      },
    },
    // Add consistent dimensions
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [{ width: '24' }, { height: '24' }],
      },
    },
  ],
};

// Ensure directories exist
Object.values(dirs).forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
});

function getSVGs() {
  const files = glob.sync(`${dirs.svgsSource}/*.svg`);
  console.log(`Found ${files.length} SVG files in source directory`);
  return files;
}

function optimizeSVGs(sourceFiles) {
  const optimizedFiles = sourceFiles
    .map((file) => {
      const fileName = path.basename(file);
      const outputPath = path.join(dirs.svgsOptimized, fileName);
      const contents = fs.readFileSync(file, 'utf8');

      try {
        // Optimize SVG with SVGO
        const optimizedSvg = optimize(contents, {
          path: file,
          ...svgoConfig,
        });

        if (optimizedSvg.error) {
          console.error(`Error optimizing ${fileName}:`, optimizedSvg.error);
          return null;
        }

        fs.writeFileSync(outputPath, optimizedSvg.data);
        return outputPath;
      } catch (error) {
        console.error(`Error processing ${fileName}:`, error);
        return null;
      }
    })
    .filter(Boolean); // Remove any null entries from failed optimizations

  console.log(`Optimized ${optimizedFiles.length} SVG files`);
  return optimizedFiles;
}

function loadIconMetadata() {
  if (!fs.existsSync(dirs.svgsMetadata)) {
    console.warn(
      'Icon metadata directory not found, skipping metadata validation',
    );
    return {};
  }

  const metadataFiles = glob.sync(`${dirs.svgsMetadata}/*.json`);
  console.log(`Loaded ${metadataFiles.length} icon metadata files`);

  return Object.fromEntries(
    metadataFiles.map((filePath) => {
      const iconName = path.basename(filePath, '.json');
      const metadataRaw = fs.readFileSync(filePath, 'utf8');
      return [iconName, JSON.parse(metadataRaw)];
    }),
  );
}

function tokenize(value) {
  return value
    .toLowerCase()
    .trim()
    .split(/[\s\-_]+/)
    .filter(Boolean);
}

function createMetadataEntry(existingEntry = {}) {
  const normalizeStringArray = (value) => {
    if (!Array.isArray(value)) {
      return [];
    }

    const seen = new Set();
    const normalized = [];

    for (const item of value) {
      if (typeof item !== 'string') {
        continue;
      }

      const cleanValue = item.trim();
      if (!cleanValue) {
        continue;
      }

      const normalizedKey = cleanValue.toLowerCase();
      if (seen.has(normalizedKey)) {
        continue;
      }

      seen.add(normalizedKey);
      normalized.push(cleanValue);
    }

    return normalized;
  };

  const aliases = normalizeStringArray(existingEntry.aliases);
  const tags = normalizeStringArray(existingEntry.tags);

  return {
    aliases,
    tags,
    category: existingEntry.category ?? null,
    deprecated: existingEntry.deprecated ?? false,
  };
}

function validateIconMetadata(iconNames, iconMetadata) {
  const iconSet = new Set(iconNames);
  const metadataNames = Object.keys(iconMetadata);
  const unknownMetadataIcons = metadataNames.filter(
    (name) => !iconSet.has(name),
  );

  if (unknownMetadataIcons.length > 0) {
    const message =
      'Icon metadata contains unknown icon names: ' +
      unknownMetadataIcons.join(', ');
    throw new Error(message);
  }

  const aliasMap = new Map();

  for (const [iconName, metadata] of Object.entries(iconMetadata)) {
    const aliases = Array.isArray(metadata.aliases) ? metadata.aliases : [];
    for (const alias of aliases) {
      const normalizedAlias = tokenize(alias).join(' ');
      if (!normalizedAlias) {
        continue;
      }

      const existingIcons = aliasMap.get(normalizedAlias) ?? [];
      existingIcons.push(iconName);
      aliasMap.set(normalizedAlias, existingIcons);
    }
  }

  const duplicateAliases = Array.from(aliasMap.entries()).filter(
    ([, names]) => names.length > 1,
  );
  if (duplicateAliases.length > 0) {
    console.warn(
      `Duplicate icon aliases detected:\n${duplicateAliases
        .map(([alias, names]) => `  - "${alias}" -> ${names.join(', ')}`)
        .join('\n')}`,
    );
  }

  const missingMetadataIcons = iconNames.filter(
    (name) => !(name in iconMetadata),
  );
  if (missingMetadataIcons.length > 0) {
    console.warn(
      `Icons without metadata: ${missingMetadataIcons.length}. ` +
        'Add aliases/tags over time for better search quality.',
    );
  }
}

function buildMergedIconMetadata(iconNames, iconMetadata) {
  const sortedIconNames = [...iconNames].sort((a, b) => a.localeCompare(b));

  return Object.fromEntries(
    sortedIconNames.map((iconName) => [
      iconName,
      createMetadataEntry(iconMetadata[iconName]),
    ]),
  );
}

function generateTypeDefinitions(files) {
  files.sort((a, b) => a.localeCompare(b));

  const iconNamesList = files.map((file) => path.basename(file, '.svg'));
  const formatKey = (name) =>
    /^[A-Za-z_$][\w$]*$/u.test(name) ? name : `'${name}'`;

  // Generate IconNamesList type definition
  const iconNamesListString = `export type IconNamesList =\n${iconNamesList
    .map((name) => `  | '${name}'`)
    .join('\n')};\n`;
  fs.writeFileSync(
    path.join(dirs.typesOutput, 'icons.d.ts'),
    iconNamesListString,
  );

  // Generate IconNames constant
  const iconNamesContent = `export const IconNames = {
  ${iconNamesList.map((name) => `${formatKey(name)}: '${name}'`).join(',\n  ')},
} as const;\n`;
  fs.writeFileSync(
    path.join(dirs.typesOutput, 'iconNames.ts'),
    iconNamesContent,
  );

  console.log('Generated type definitions and constants');
}

function createSpriter() {
  return new SVGSpriter(config);
}

function addSvgsToSpriter(spriter, files) {
  files.forEach((file) => {
    const contents = fs.readFileSync(file, 'utf8');
    spriter.add(file, null, contents);
  });
  console.log('Added SVGs to spriter');
}

async function generateSprite(spriter, mergedIconMetadata) {
  const { result } = await spriter.compileAsync();

  for (const mode of Object.values(result)) {
    for (const resource of Object.values(mode)) {
      const fileName = path.basename(resource.path);
      // Only write sprite.svg and sprite.symbol.html to public
      if (fileName === 'sprite.svg' || fileName === 'sprite.symbol.html') {
        const outputPath = path.join(dirs.spriteOutput, fileName);
        const isPreview = fileName === 'sprite.symbol.html';
        if (isPreview) {
          const previewHtml = resource.contents.toString();
          if (!previewHtml.includes('__ICON_METADATA__')) {
            throw new Error(
              'sprite-preview-template is missing __ICON_METADATA__ placeholder',
            );
          }
          const htmlWithMetadata = previewHtml.replace(
            '__ICON_METADATA__',
            JSON.stringify(mergedIconMetadata, null, 2),
          );
          fs.writeFileSync(outputPath, htmlWithMetadata);
        } else {
          fs.writeFileSync(outputPath, resource.contents);
        }
      }
    }
  }

  fs.writeFileSync(
    iconMetadataOutputPath,
    `${JSON.stringify(mergedIconMetadata, null, 2)}\n`,
  );
  fs.writeFileSync(
    iconMetadataPath,
    `${JSON.stringify(mergedIconMetadata, null, 2)}\n`,
  );

  console.log('Generated sprite files');
}

// Main execution
async function main() {
  try {
    // Get source SVGs
    const sourceFiles = getSVGs();

    // Optimize SVGs
    const optimizedFiles = optimizeSVGs(sourceFiles);
    const iconNames = optimizedFiles.map((file) => path.basename(file, '.svg'));
    const iconMetadata = loadIconMetadata();

    validateIconMetadata(iconNames, iconMetadata);
    const mergedIconMetadata = buildMergedIconMetadata(iconNames, iconMetadata);

    // Generate type definitions
    generateTypeDefinitions(optimizedFiles);

    // Create and configure spriter
    const spriter = createSpriter();

    // Add optimized SVGs to spriter
    addSvgsToSpriter(spriter, optimizedFiles);

    // Generate sprite
    await generateSprite(spriter, mergedIconMetadata);

    console.log('SVG sprite generation completed successfully');
    console.log(
      `Preview page: ${path.resolve(dirs.spriteOutput, 'sprite.symbol.html')}`,
    );
  } catch (error) {
    console.error('Error generating SVG sprite:', error);
    process.exit(1);
  }
}

// Run the script
main();
