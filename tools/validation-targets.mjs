import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const RECIPE_EXCEPTIONS = new Set([
  'src/recipes/recipes-regular.ts',
  'src/recipes/recipes-slot.ts',
]);

const runGit = (args) => {
  try {
    return execFileSync('git', args, {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return '';
  }
};

export const normalizePath = (filePath) =>
  filePath.split(path.sep).join('/').replace(/^\.\//, '');

export const isEligibleValidationFile = (filePath) => {
  const normalizedPath = normalizePath(filePath);

  if (normalizedPath === 'src/App.tsx') {
    return false;
  }

  if (normalizedPath.startsWith('src/storybook/')) {
    return false;
  }

  if (normalizedPath.endsWith('.stories.tsx')) {
    return false;
  }

  if (normalizedPath === 'src/preset.ts') {
    return true;
  }

  if (/^src\/components\/.+\.(ts|tsx)$/.test(normalizedPath)) {
    return true;
  }

  if (/^src\/recipes\/[^/]+\.ts$/.test(normalizedPath)) {
    return !RECIPE_EXCEPTIONS.has(normalizedPath);
  }

  return false;
};

export const filterValidationFiles = (files) =>
  [
    ...new Set(
      files
        .map(normalizePath)
        .filter(isEligibleValidationFile)
        .filter((filePath) => fs.existsSync(filePath)),
    ),
  ].sort();

const splitGitOutput = (output) =>
  output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const refExists = (ref) =>
  Boolean(runGit(['rev-parse', '--verify', '--quiet', ref]));

export const detectBaseRef = () => {
  if (process.env.VALIDATION_BASE_REF) {
    return process.env.VALIDATION_BASE_REF;
  }

  const originHead = runGit([
    'symbolic-ref',
    '--quiet',
    'refs/remotes/origin/HEAD',
  ]);
  if (originHead) {
    return originHead.replace(/^refs\/remotes\//, '');
  }

  for (const candidate of ['origin/main', 'origin/master', 'main', 'master']) {
    if (refExists(candidate)) {
      return candidate;
    }
  }

  return null;
};

export const getStagedValidationFiles = () =>
  filterValidationFiles(
    splitGitOutput(
      runGit(['diff', '--name-only', '--cached', '--diff-filter=ACMR']),
    ),
  );

export const getChangedValidationFiles = (baseRef = detectBaseRef()) => {
  if (!baseRef) {
    return {
      baseRef: null,
      files: getStagedValidationFiles(),
      source: 'staged-fallback',
    };
  }

  const mergeBase = runGit(['merge-base', 'HEAD', baseRef]);
  if (!mergeBase) {
    return {
      baseRef,
      files: getStagedValidationFiles(),
      source: 'staged-fallback',
    };
  }

  return {
    baseRef,
    files: filterValidationFiles(
      splitGitOutput(
        runGit([
          'diff',
          '--name-only',
          '--diff-filter=ACMR',
          `${mergeBase}...HEAD`,
        ]),
      ),
    ),
    source: 'changed',
  };
};

export const getAllValidationFiles = () =>
  filterValidationFiles(
    splitGitOutput(
      runGit([
        'ls-files',
        '--cached',
        '--others',
        '--exclude-standard',
        '--',
        'src',
      ]),
    ),
  );

export const resolveValidationTargets = ({
  files = [],
  mode = 'full',
} = {}) => {
  if (files.length > 0) {
    return {
      mode: 'files',
      files: filterValidationFiles(files),
      source: 'explicit',
      baseRef: null,
    };
  }

  if (mode === 'staged') {
    return {
      mode,
      files: getStagedValidationFiles(),
      source: 'staged',
      baseRef: null,
    };
  }

  if (mode === 'changed') {
    return {
      mode,
      ...getChangedValidationFiles(),
    };
  }

  return {
    mode: 'full',
    files: getAllValidationFiles(),
    source: 'full',
    baseRef: null,
  };
};
