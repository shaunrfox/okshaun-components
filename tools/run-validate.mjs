import { spawnSync } from 'node:child_process';

import {
  formatDiagnostics,
  validateFiles,
} from './validate-standards-core.mjs';
import { resolveValidationTargets } from './validation-targets.mjs';

const args = process.argv.slice(2);
let mode = 'changed';
let reportOnly = false;
let includeTypecheck = false;
let write = false;

for (const arg of args) {
  if (arg === '--staged') {
    mode = 'staged';
    continue;
  }

  if (arg === '--changed') {
    mode = 'changed';
    continue;
  }

  if (arg === '--full') {
    mode = 'full';
    continue;
  }

  if (arg === '--report-only') {
    reportOnly = true;
    continue;
  }

  if (arg === '--include-typecheck') {
    includeTypecheck = true;
    continue;
  }

  if (arg === '--write') {
    write = true;
  }
}

const targetResolution = resolveValidationTargets({ mode });

if (targetResolution.baseRef) {
  console.log(`validate: comparing against ${targetResolution.baseRef}`);
}

if (targetResolution.source === 'staged-fallback') {
  console.log(
    'validate: no default branch ref found, falling back to staged files',
  );
}

if (targetResolution.files.length === 0) {
  console.log(`validate: no eligible ${targetResolution.mode} files found`);
} else {
  const biomeArgs = [
    'biome',
    'check',
    '--files-ignore-unknown=true',
    '--no-errors-on-unmatched',
  ];

  if (write) {
    biomeArgs.push('--write');
  }

  biomeArgs.push(...targetResolution.files);

  console.log(
    `validate: running Biome on ${targetResolution.files.length} ${mode === 'full' ? 'eligible' : 'touched'} file(s)`,
  );
  const biomeResult = spawnSync('npx', biomeArgs, {
    cwd: process.cwd(),
    stdio: 'inherit',
  });

  const standardsResult = validateFiles(targetResolution.files);
  console.log(
    formatDiagnostics({
      diagnostics: standardsResult.diagnostics,
      filesLabel: `${targetResolution.files.length} file(s)`,
    }),
  );

  let typecheckStatus = 0;
  if (includeTypecheck) {
    console.log('validate: running full-repo typecheck report');
    const typecheckResult = spawnSync('npx', ['tsc', '--noEmit'], {
      cwd: process.cwd(),
      stdio: 'inherit',
    });
    typecheckStatus = typecheckResult.status ?? 1;
  }

  if (reportOnly) {
    process.exit(0);
  }

  const hasBlockingStandards = standardsResult.errors.length > 0;
  const biomeStatus = biomeResult.status ?? 1;
  const exitCode =
    biomeStatus !== 0 || hasBlockingStandards || typecheckStatus !== 0 ? 1 : 0;

  process.exit(exitCode);
}

if (includeTypecheck) {
  console.log('validate: running full-repo typecheck report');
  spawnSync('npx', ['tsc', '--noEmit'], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
}

process.exit(0);
