/**
 * Post-build script to copy sprite files to dist/
 * Run this AFTER vite build since vite wipes the dist folder
 */
import SVGSpriter from 'svg-sprite';
import fs from 'fs';
import { glob } from 'glob';
import path from 'path';
import config from './sprite-config.js';

const dirs = {
  svgsOptimized: 'dist/svgs',
  spriteOutput: 'dist',
};

// Ensure dist directories exist
Object.values(dirs).forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
});

// Get already-optimized SVGs from the previous generate-sprite run
// They're temporarily stored, so we need to regenerate from source
const svgsSource = 'src/utils/svgsSource';
const files = glob.sync(`${svgsSource}/*.svg`);

if (files.length === 0) {
  console.error('No SVG files found in source directory');
  process.exit(1);
}

// Import the optimize function
import { optimize } from 'svgo';

const svgoConfig = {
  plugins: [
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
    'removeDimensions',
    {
      name: 'removeAttrs',
      params: {
        attrs: ['class', 'data-name', 'fill', 'stroke'],
      },
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [{ width: '24' }, { height: '24' }],
      },
    },
  ],
};

// Optimize and save SVGs to dist/svgs
const optimizedFiles = files
  .map((file) => {
    const fileName = path.basename(file);
    const outputPath = path.join(dirs.svgsOptimized, fileName);
    const contents = fs.readFileSync(file, 'utf8');

    try {
      const optimizedSvg = optimize(contents, { path: file, ...svgoConfig });
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
  .filter(Boolean);

console.log(`Copied ${optimizedFiles.length} optimized SVGs to dist/svgs`);

// Create sprite
const spriter = new SVGSpriter(config);

optimizedFiles.forEach((file) => {
  const contents = fs.readFileSync(file, 'utf8');
  spriter.add(file, null, contents);
});

const { result } = await spriter.compileAsync();

for (const mode of Object.values(result)) {
  for (const resource of Object.values(mode)) {
    const fileName = path.basename(resource.path);
    if (fileName === 'sprite.svg' || fileName === 'sprite.symbol.html') {
      const outputPath = path.join(dirs.spriteOutput, fileName);
      fs.writeFileSync(outputPath, resource.contents);
      console.log(`Generated ${outputPath}`);
    }
  }
}

console.log('Sprite files copied to dist/ successfully');
