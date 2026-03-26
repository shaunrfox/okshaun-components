import { execSync } from 'node:child_process';

import {
  copyPlayroomCssToDist,
  copyPlayroomFontsCssToDist,
  copySpriteToDist,
  ensureDirectory,
  ensurePlayroomStaticCss,
  paths,
  spriteExists,
  writePlayroomExportsFile,
} from './utils.js';

function run(command, env = {}) {
  execSync(command, {
    stdio: 'inherit',
    env: { ...process.env, ...env },
  });
}

function main() {
  writePlayroomExportsFile();
  ensureDirectory(paths.distPlayroom);

  run('PANDA_STATIC=true npx panda codegen');
  ensurePlayroomStaticCss({ minify: true, runCommand: run });
  const env = { ...process.env };
  env.NODE_OPTIONS = '--max-old-space-size=8192';
  run('playroom build', env);

  copyPlayroomCssToDist();
  copyPlayroomFontsCssToDist();

  if (!spriteExists()) {
    run('npm run generate-sprite');
  }
  copySpriteToDist();
}

main();
