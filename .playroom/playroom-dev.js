import { execSync } from 'node:child_process';

import {
  copyPlayroomCssToPublic,
  ensurePlayroomStaticCss,
  writePlayroomExportsFile,
} from './utils.js';

function run(command, env = {}) {
  execSync(command, {
    stdio: 'inherit',
    env: { ...process.env, ...env },
  });
}

function main() {
  const cssOnly = process.argv.includes('--css-only');

  writePlayroomExportsFile();

  run('PANDA_STATIC=true npx panda codegen');
  ensurePlayroomStaticCss({ minify: false, runCommand: run });

  copyPlayroomCssToPublic();

  if (!cssOnly) {
    const env = { ...process.env };
    env.NODE_OPTIONS = '--max-old-space-size=8192';
    run('playroom start', env);
  }
}

main();
