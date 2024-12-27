import SVGSpriter from 'svg-sprite';
import fs from 'fs';
import glob from 'glob';
import path from 'path';  // Changed this line
import config from './sprite-config.js';

const svgFiles = glob.sync('src/components/Icon/utils/svgsOptimized/*.svg');

const spriter = new SVGSpriter(config);

for (const file of svgFiles) {
  const contents = fs.readFileSync(file, 'utf8');
  spriter.add(file, null, contents);
}

const { result } = await spriter.compileAsync();

for (const mode of Object.values(result)) {
  for (const resource of Object.values(mode)) {
    fs.mkdirSync(path.dirname(resource.path), { recursive: true });
    fs.writeFileSync(resource.path, resource.contents);
  }
}
