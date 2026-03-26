import {
  formatDiagnostics,
  validateFiles,
} from './validate-standards-core.mjs';
import { resolveValidationTargets } from './validation-targets.mjs';

const args = process.argv.slice(2);
const explicitFiles = [];
let mode = 'full';
let reportOnly = false;

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

  explicitFiles.push(arg);
}

const targetResolution = resolveValidationTargets({
  files: explicitFiles,
  mode,
});

if (targetResolution.files.length === 0) {
  console.log(`standards: no eligible ${targetResolution.mode} files found`);
  process.exit(0);
}

if (targetResolution.baseRef) {
  console.log(`standards: comparing against ${targetResolution.baseRef}`);
}

const result = validateFiles(targetResolution.files);
console.log(
  formatDiagnostics({
    diagnostics: result.diagnostics,
    filesLabel: `${targetResolution.files.length} file(s)`,
  }),
);

if (reportOnly) {
  process.exit(0);
}

process.exit(result.errors.length > 0 ? 1 : 0);
