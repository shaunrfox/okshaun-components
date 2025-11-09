const outputDir = 'public';
const optimizedDir = 'public/svgs';
const previewTemplate = './src/utils/sprite-preview-template.html';

const config = {
  mode: {
    symbol: {
      sprite: 'sprite.svg',
      dest: outputDir,
      example: {
        template: previewTemplate,
      },
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
