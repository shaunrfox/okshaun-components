import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const outputDir = 'src/components/Icon/utils';
const optimizedDir = 'src/components/Icon/utils/svgsOptimized';

const config = {
  mode: {
    symbol: {
      sprite: 'sprite.svg',
      dest: outputDir,
      example: true,
    },
  },
  shape: {
    transform: ['svgo'],
    id: {
      generator: '%s',
    },
    dest: optimizedDir,
  },
  svg: {
    cleanupIDs: true,
    cleanupSelectors: true,
  },
};

export default config;
