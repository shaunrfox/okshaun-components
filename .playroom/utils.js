import { createHash } from 'node:crypto';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();

export const paths = {
  projectRoot: PROJECT_ROOT,
  distPlayroom: path.join(PROJECT_ROOT, 'dist', 'playroom'),
  playroomStaticCss: path.join(PROJECT_ROOT, 'dist', 'playroom-static.css'),
  playroomStaticCssPublic: path.join(
    PROJECT_ROOT,
    'public',
    'playroom-static.css',
  ),
  playroomFontsCss: path.join(PROJECT_ROOT, 'public', 'playroom-fonts.css'),
  playroomFontsCssDist: path.join(
    PROJECT_ROOT,
    'dist',
    'playroom',
    'playroom-fonts.css',
  ),
  spriteSource: path.join(PROJECT_ROOT, 'public', 'sprite.svg'),
  spriteDist: path.join(PROJECT_ROOT, 'dist', 'playroom', 'sprite.svg'),
  playroomCacheDir: path.join(PROJECT_ROOT, '.tmp', 'playroom-cache'),
};

export function ensureDirectory(directoryPath) {
  if (!existsSync(directoryPath)) {
    mkdirSync(directoryPath, { recursive: true });
  }
}

export function writePlayroomExportsFile() {
  const outputPath = path.join(PROJECT_ROOT, '.playroom', 'exports.ts');
  const content = `export {\n  AspectRatio,\n  Box as PandaBox,\n  Center,\n  Circle,\n  Container,\n  Flex,\n  Grid,\n  GridItem,\n  HStack,\n  Stack,\n  VStack,\n} from '@styled-system/jsx';\n\nexport * from '~/index';\n`;

  writeFileSync(outputPath, content, 'utf8');
}

export function copyPlayroomFontsCssToDist() {
  ensureDirectory(paths.distPlayroom);
  cpSync(paths.playroomFontsCss, paths.playroomFontsCssDist);
}

export function copySpriteToDist() {
  cpSync(paths.spriteSource, paths.spriteDist);
}

export function spriteExists() {
  return existsSync(paths.spriteSource);
}

export function copyPlayroomCssToPublic() {
  cpSync(paths.playroomStaticCss, paths.playroomStaticCssPublic);
}

export function copyPlayroomCssToDist() {
  cpSync(
    paths.playroomStaticCss,
    path.join(paths.distPlayroom, 'playroom-static.css'),
  );
}

const PLAYROOM_HASH_DIRS = [
  'src/components',
  'src/recipes',
  'src/styles',
  'src/contexts',
];

const PLAYROOM_HASH_FILES = [
  'src/index.ts',
  'src/cetec-preset.ts',
  'panda.config.ts',
  'playroom.config.js',
  '.playroom/panda.playroom.config.ts',
  '.playroom/frameComponent.tsx',
  '.playroom/exports.ts',
];

const VALID_SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css']);

function toProjectRelativePath(absolutePath) {
  return path.relative(PROJECT_ROOT, absolutePath).replaceAll(path.sep, '/');
}

function collectSourceFilesFromDirectory(directoryPath) {
  if (!existsSync(directoryPath)) {
    return [];
  }

  const files = [];
  const entries = readdirSync(directoryPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectSourceFilesFromDirectory(fullPath));
      continue;
    }

    if (entry.isFile()) {
      const extension = path.extname(entry.name);
      if (VALID_SOURCE_EXTENSIONS.has(extension)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

function getPlayroomCssInputFiles() {
  const files = [];

  for (const relativeDirectory of PLAYROOM_HASH_DIRS) {
    const absoluteDirectory = path.join(PROJECT_ROOT, relativeDirectory);
    files.push(...collectSourceFilesFromDirectory(absoluteDirectory));
  }

  for (const relativeFile of PLAYROOM_HASH_FILES) {
    const absoluteFile = path.join(PROJECT_ROOT, relativeFile);
    if (existsSync(absoluteFile)) {
      files.push(absoluteFile);
    }
  }

  files.sort((left, right) => left.localeCompare(right));
  return files;
}

function computePlayroomCssHash({ minify }) {
  const hash = createHash('sha256');
  const inputFiles = getPlayroomCssInputFiles();

  hash.update(minify ? 'minify=true' : 'minify=false');

  for (const absoluteFilePath of inputFiles) {
    const relativePath = toProjectRelativePath(absoluteFilePath);
    hash.update(relativePath);
    hash.update('\n');
    hash.update(readFileSync(absoluteFilePath));
    hash.update('\n');
  }

  return hash.digest('hex').slice(0, 16);
}

function cleanupStaleCssCacheFiles(mode) {
  if (!existsSync(paths.playroomCacheDir)) {
    return;
  }

  const maxEntriesPerMode = 3;
  const prefix = `playroom-static-${mode}-`;
  const entries = readdirSync(paths.playroomCacheDir)
    .filter(
      (fileName) => fileName.startsWith(prefix) && fileName.endsWith('.css'),
    )
    .sort()
    .reverse();

  const staleEntries = entries.slice(maxEntriesPerMode);
  for (const staleFileName of staleEntries) {
    rmSync(path.join(paths.playroomCacheDir, staleFileName), { force: true });
  }
}

export function ensurePlayroomStaticCss({ minify, runCommand }) {
  ensureDirectory(path.join(PROJECT_ROOT, 'dist'));
  ensureDirectory(paths.playroomCacheDir);

  const mode = minify ? 'min' : 'dev';
  const hash = computePlayroomCssHash({ minify });
  const cachedCssPath = path.join(
    paths.playroomCacheDir,
    `playroom-static-${mode}-${hash}.css`,
  );

  if (existsSync(cachedCssPath)) {
    cpSync(cachedCssPath, paths.playroomStaticCss);
    console.log(`[playroom] CSS cache hit (${mode}:${hash})`);
    return;
  }

  const minifyFlag = minify ? ' --minify' : '';
  console.log(
    `[playroom] CSS cache miss (${mode}:${hash}), running Panda cssgen`,
  );
  runCommand(
    `PANDA_STATIC=true npx panda cssgen --config .playroom/panda.playroom.config.ts --outfile dist/playroom-static.css${minifyFlag}`,
  );

  cpSync(paths.playroomStaticCss, cachedCssPath);
  cleanupStaleCssCacheFiles(mode);
}
