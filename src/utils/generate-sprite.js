import SVGSpriter from 'svg-sprite';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import config from './sprite-config.js';
import { optimize } from 'svgo';

// Directory paths
const dirs = {
  svgsSource: 'src/utils/svgsSource',
  svgsOptimized: 'public/svgs',
  spriteOutput: 'public',
  typesOutput: 'src/components/Icon'
};

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
}

// Ensure directories exist
Object.values(dirs).forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

function getSVGs() {
  const files = glob.sync(`${dirs.svgsSource}/*.svg`);
  console.log(`Found ${files.length} SVG files in source directory`);
  return files;
}

function optimizeSVGs(sourceFiles) {
  const optimizedFiles = sourceFiles.map(file => {
    const fileName = path.basename(file);
    const outputPath = path.join(dirs.svgsOptimized, fileName);
    const contents = fs.readFileSync(file, 'utf8');
    
    try {
      // Optimize SVG with SVGO
      const optimizedSvg = optimize(contents, {
        path: file,
        ...svgoConfig
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
  }).filter(Boolean); // Remove any null entries from failed optimizations
  
  console.log(`Optimized ${optimizedFiles.length} SVG files`);
  return optimizedFiles;
} 

function generateTypeDefinitions(files) {
  const iconNamesList = files.map(file => path.basename(file, '.svg'));
  
  // Generate IconNamesList type definition
  const iconNamesListString = `export type IconNamesList = ${iconNamesList.map(name => `'${name}'`).join(' | ')}`;
  fs.writeFileSync(
    path.join(dirs.typesOutput, 'icons.d.ts'),
    iconNamesListString
  );
  
  // Generate IconNames constant
  const iconNamesContent = `export const IconNames = {
  ${iconNamesList.map(name => `'${name}': '${name}'`).join(',\n  ')}
} as const;`;
  fs.writeFileSync(
    path.join(dirs.typesOutput, 'iconNames.ts'),
    iconNamesContent
  );
  
  console.log('Generated type definitions and constants');
}

function createSpriter() {
  return new SVGSpriter(config);
}

function addSvgsToSpriter(spriter, files) {
  files.forEach(file => {
    const contents = fs.readFileSync(file, 'utf8');
    spriter.add(file, null, contents);
  });
  console.log('Added SVGs to spriter');
}

async function generateSprite(spriter) {
  const { result } = await spriter.compileAsync();
  
  for (const mode of Object.values(result)) {
    for (const resource of Object.values(mode)) {
      const fileName = path.basename(resource.path);
      // Only write sprite.svg and sprite.symbol.html to public
      if (fileName === 'sprite.svg' || fileName === 'sprite.symbol.html') {
        const outputPath = path.join(dirs.spriteOutput, fileName);
        fs.writeFileSync(outputPath, resource.contents);
      }
    }
  }
  
  console.log('Generated sprite files');
}

// Main execution
async function main() {
  try {
    // Get source SVGs
    const sourceFiles = getSVGs();
    
    // Optimize SVGs
    const optimizedFiles = optimizeSVGs(sourceFiles);
    
    // Generate type definitions
    generateTypeDefinitions(optimizedFiles);
    
    // Create and configure spriter
    const spriter = createSpriter();
    
    // Add optimized SVGs to spriter
    addSvgsToSpriter(spriter, optimizedFiles);
    
    // Generate sprite
    await generateSprite(spriter);
    
    console.log('SVG sprite generation completed successfully');
  } catch (error) {
    console.error('Error generating SVG sprite:', error);
    process.exit(1);
  }
}

// Run the script
main();
