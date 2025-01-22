import SVGSpriter from 'svg-sprite';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
import config from './sprite-config.js';

const svgFiles = glob.sync('src/components/Icon/utils/svgsOptimized/*.svg');

const svgCount = svgFiles.length;
console.log(`Found ${svgCount} svgFiles`);

const spriter = new SVGSpriter(config);

fs.mkdirSync('public', { recursive: true });

for (const file of svgFiles) {
  const contents = fs.readFileSync(file, 'utf8');
  spriter.add(file, null, contents);
}

const { result } = await spriter.compileAsync();

// Write files to both the original location and public folder
for (const mode of Object.values(result)) {
  for (const resource of Object.values(mode)) {
    // Write to original location
    fs.mkdirSync(path.dirname(resource.path), { recursive: true });
    fs.writeFileSync(resource.path, resource.contents);

    // Only write sprite.svg and sprite.symbol.html to public folder
    const filename = path.basename(resource.path);
    if (filename === 'sprite.svg' || filename === 'sprite.symbol.html') {
      const publicPath = path.join('public', filename);
      fs.writeFileSync(publicPath, resource.contents);
    }
  }
}

// Generate IconNamesList in icons.d.ts
const iconNamesList = svgFiles.map((file) => path.basename(file, '.svg'));
const iconNamesListString = `export type IconNamesList = ${iconNamesList.map((name) => `'${name}'`).join(' | ')}`;
const iconNamesListFile = `src/components/Icon/utils/icons.d.ts`;
fs.writeFileSync(iconNamesListFile, iconNamesListString);

// Generate IconNames in iconNames.ts
const iconNamesFile = `src/components/Icon/utils/iconNames.ts`;
fs.writeFileSync(
  iconNamesFile,
  `export const IconNames = {
  ${iconNamesList.map((name) => `'${name}': '${name}'`).join(',\n  ')}
} as const;
`,
);
