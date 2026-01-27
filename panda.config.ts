import { defineConfig } from '@pandacss/dev';
import { okshaunPreset } from './src/preset';

// Control whether the staticCss is included or not
// because it's not needed for production and
// generates a ton of CSS
const isStatic = process.env.PANDA_STATIC === 'true';

const staticCss = isStatic
  ? {
      staticCss: {
        css: [
          {
            properties: {
              background: ['*'],
              color: ['*'],
              border: ['*'],
              fill: ['*'],
              boxShadow: ['*'],
              width: ['*'],
              height: ['*'],
              minWidth: ['*'],
              minHeight: ['*'],
              maxWidth: ['*'],
              maxHeight: ['*'],
              borderRadius: ['*'],
              textStyle: ['*'],
              fontFamily: ['*'],
              fontSize: ['*'],
              fontWeight: ['*'],
              lineHeight: ['*'],
              letterSpacing: ['*'],
            },
            conditions: ['light', 'dark'],
          },
        ],
      },
    }
  : { staticCss: { css: [] } };

export default defineConfig({
  eject: true,
  gitignore: true,
  jsxFramework: 'react',
  jsxStyleProps: 'all',
  jsxFactory: 'styled',
  preflight: false, // do not add Panda's default reset styles
  strictTokens: true,
  watch: true,
  clean: true, // empty /styled-system each run

  presets: [okshaunPreset],

  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/*/*.stories.@(js|jsx|mjs|ts|tsx)',
    './src/storybook/**/*.{js,jsx,mjs,ts,tsx,mdx}',
  ],
  exclude: [],

  prefix: 'oks',
  importMap: '@styled-system',
  outdir: 'src/styled-system',

  // hooks: {
  //   'config:resolved': ({ config, utils }) => {
  //     return utils.omit(config, ['patterns.box', 'patterns.divider']);
  //   },
  // },

  // hooks: {
  //   'preset:resolved': ({ utils, preset, name }) => {
  //     if (name === 'okshaunPreset') {
  //       return utils.omit(preset, ['patterns.box', 'patterns.divider']);
  //     }
  //     return preset;
  //   },
  // },

  ...staticCss,
});
