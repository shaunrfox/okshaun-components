import {
  defineConfig,
  defineTokens,
  defineSemanticTokens,
} from '@pandacss/dev';
import pandaPandaPreset from '@pandacss/preset-panda';
import * as tokens from './src/styles/tokens';
import { globalCss } from './src/styles/globalStyle';

import { button } from './src/recipes/button';
import { iconButton } from './src/recipes/icon-button';
import { input } from './src/recipes/input';
import { textarea } from './src/recipes/textarea';
// import { text } from './src/recipes/text';

// using pandas methods to define type-safe tokens
const theme = {
  tokens: defineTokens({
    aspectRatios: { ...pandaPandaPreset.theme.tokens.aspectRatios },
    shadows: { ...pandaPandaPreset.theme.tokens.shadows },
    easings: { ...pandaPandaPreset.theme.tokens.easings },
    durations: { ...pandaPandaPreset.theme.tokens.durations },
    letterSpacings: { ...pandaPandaPreset.theme.tokens.letterSpacings },
    lineHeights: { ...pandaPandaPreset.theme.tokens.lineHeights },
    blurs: { ...pandaPandaPreset.theme.tokens.blurs },
    animations: { ...pandaPandaPreset.theme.tokens.animations },
    colors: tokens.colors,
    fonts: tokens.fonts,
    fontSizes: tokens.sizes,
    fontWeights: tokens.fontWeights,
    sizes: tokens.sizes,
    spacing: tokens.sizes,
    radii: tokens.radii,
  }),
  semanticTokens: defineSemanticTokens({
    colors: {
      primary: tokens.colors.blue[50],
      danger: tokens.colors.red[50],
      success: tokens.colors.green[50],
    },
  }),
};

export default defineConfig({
  presets: ['@pandacss/dev/presets', '@pandacss/preset-base'],
  gitignore: true,
  jsxFramework: 'react',
  jsxFactory: 'styled',
  watch: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
  preflight: true,
  exclude: [],
  strictTokens: true,

  theme: {
    textStyles: { ...pandaPandaPreset.theme.textStyles },
    containerSizes: { ...pandaPandaPreset.theme.containerSizes },
    keyframes: { ...pandaPandaPreset.theme.keyframes },
    tokens: {
      aspectRatios: theme.tokens.aspectRatios,
      shadows: theme.tokens.shadows,
      easings: theme.tokens.easings,
      durations: theme.tokens.durations,
      letterSpacings: theme.tokens.letterSpacings,
      lineHeights: theme.tokens.lineHeights,
      blurs: theme.tokens.blurs,
      animations: theme.tokens.animations,
      colors: theme.tokens.colors,
      fonts: theme.tokens.fonts,
      fontSizes: theme.tokens.fontSizes,
      fontWeights: theme.tokens.fontWeights,
      sizes: theme.tokens.sizes,
      spacing: theme.tokens.sizes,
      radii: theme.tokens.radii,
    },
    semanticTokens: {
      colors: theme.semanticTokens.colors,
    },
    extend: {
      breakpoints: {
        ...pandaPandaPreset.theme.breakpoints,
        xs: '480px',
      },
      recipes: {
        // text: text,
        button: button,
        iconButton: iconButton,
        input: input,
        textarea: textarea,
      },
      slotRecipes: {},
    },
  },

  globalCss: {
    ...globalCss,
    html: {
      '--global-font-body': 'fonts.sans',
      '--global-font-mono': 'fonts.mono',
      '--global-font-serif': 'fonts.serif',
    },
  },

  conditions: {
    checked:
      '&:is(:checked, [data-checked], [aria-checked=true], [data-state=checked])',
    indeterminate:
      '&:is(:indeterminate, [data-indeterminate], [aria-checked=mixed], [data-state=indeterminate])',
    closed: '&:is([data-state=closed])',
    open: '&:is([open], [data-state=open])',
    hidden: '&:is([hidden])',
    current: '&:is([data-current])',
    today: '&:is([data-today])',
    placeholderShown: '&:is(:placeholder-shown, [data-placeholder-shown])',
    collapsed:
      '&:is([aria-collapsed=true], [data-collapsed], [data-state="collapsed"])',
    containerSmall: '@container (max-width: 560px)',
    containerMedium: '@container (min-width: 561px) and (max-width: 999px)',
    containerLarge: '@container (min-width: 1000px)',
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
