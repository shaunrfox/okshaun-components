import { defineConfig } from '@pandacss/dev';

import { okshaunPreset } from '../src/preset';

export default defineConfig({
  eject: true,
  gitignore: true,
  jsxFramework: 'react',
  jsxStyleProps: 'all',
  jsxFactory: 'styled',
  preflight: false, // do not add Panda's default reset styles
  strictTokens: true,
  watch: true,

  presets: [okshaunPreset],

  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.stories.{js,jsx,mjs,ts,tsx}',
    './src/storybook/**/*.{js,jsx,mjs,ts,tsx,mdx}',
  ],

  exclude: [],

  prefix: 'cetec',
  importMap: '@styled-system',
  outdir: 'src/styled-system',

  staticCss: {
    css: [
      {
        properties: {
          background: ['*'],
          backgroundColor: ['*'],
          color: ['*'],
          fill: ['*'],
          stroke: ['*'],
          border: ['*'],
          borderColor: ['*'],
          borderRadius: ['*'],
          borderWidth: ['*'],
          boxShadow: ['*'],
          display: ['*'],
          position: ['*'],
          flex: ['*'],
          flexDirection: ['*'],
          flexWrap: ['*'],
          alignItems: ['*'],
          alignContent: ['*'],
          alignSelf: ['*'],
          justifyItems: ['*'],
          justifyContent: ['*'],
          justifySelf: ['*'],
          gap: ['*'],
          rowGap: ['*'],
          columnGap: ['*'],
          zIndex: ['*'],
          width: ['*'],
          minWidth: ['*'],
          maxWidth: ['*'],
          height: ['*'],
          minHeight: ['*'],
          maxHeight: ['*'],
          margin: ['*'],
          marginTop: ['*'],
          marginRight: ['*'],
          marginBottom: ['*'],
          marginLeft: ['*'],
          padding: ['*'],
          paddingTop: ['*'],
          paddingRight: ['*'],
          paddingBottom: ['*'],
          paddingLeft: ['*'],
          fontFamily: ['*'],
          fontSize: ['*'],
          fontWeight: ['*'],
          lineHeight: ['*'],
          letterSpacing: ['*'],
          textStyle: ['*'],
        },
        conditions: ['light', 'dark'],
        responsive: true,
      },
    ],
    recipes: '*',
  },

  hooks: {
    'preset:resolved': ({ utils, preset, name }) => {
      if (name === 'okshaunPreset') {
        return utils.omit(preset, ['patterns.box', 'patterns.divider']);
      }
      return preset;
    },
  },
});
