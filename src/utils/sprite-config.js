const outputDir = 'public';
const optimizedDir = 'public/svgs';

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
