import {
  defineConfig,
  defineTokens,
  defineSemanticTokens,
} from '@pandacss/dev';
import * as tokens from './src/styles/tokens';
import { globalCss } from './src/styles/globalStyle';

import {
  buttonRecipe,
  iconButtonRecipe,
  inputRecipe,
  textareaRecipe,
  headingRecipe,
  linkRecipe,
  labelRecipe,
  textRecipe,
  checkBoxRecipe,
  spinnerRecipe,
  preRecipe,
  codeRecipe,
  boxRecipe,
} from './src/recipes/index';
import { conditions } from './src/styles/conditions';

const theme = {
  tokens: defineTokens({
    aspectRatios: tokens.aspectRatios,
    borders: tokens.borders,
    shadows: tokens.shadows,
    easings: tokens.easings,
    durations: tokens.durations,
    letterSpacings: tokens.letterSpacings,
    lineHeights: tokens.lineHeights,
    blurs: tokens.blurs,
    animations: tokens.animations,
    colors: tokens.colors,
    fonts: tokens.fonts,
    fontSizes: tokens.fontSizes,
    fontWeights: tokens.fontWeights,
    sizes: tokens.sizes,
    spacing: tokens.sizes,
    radii: tokens.radii,
    keyframes: tokens.keyframes,
    containerSizes: tokens.containerSizes,
    breakpoints: tokens.breakpoints,
  }),
  semanticTokens: defineSemanticTokens({
    colors: {
      success: tokens.colors.status.success,
      warning: tokens.colors.status.warning,
      danger: tokens.colors.status.danger,
      utility: {
        shadowColor: {
          value: {
            base: '{colors.slate.90/10}',
            _dark: '{colors.slate.100/10}',
          },
        },
      },
    },
  }),
};

export default defineConfig({
  presets: ['@pandacss/dev/presets', '@pandacss/preset-base'],
  gitignore: true,
  jsxFramework: 'react',
  jsxStyleProps: 'all',
  jsxFactory: 'styled',
  watch: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*'],
  preflight: true,
  exclude: [],
  strictTokens: true,
  importMap: '@styled-system',
  outdir: 'styled-system',

  theme: {
    containerSizes: tokens.containerSizes,
    keyframes: tokens.keyframes,
    tokens: {
      aspectRatios: theme.tokens.aspectRatios,
      borders: theme.tokens.borders,
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
      breakpoints: theme.tokens.breakpoints,
      textStyles: tokens.textStyles,
      recipes: {
        text: textRecipe,
        heading: headingRecipe,
        link: linkRecipe,
        label: labelRecipe,
        button: buttonRecipe,
        iconButton: iconButtonRecipe,
        input: inputRecipe,
        textarea: textareaRecipe,
        checkbox: checkBoxRecipe,
        code: codeRecipe,
        pre: preRecipe,
        spinner: spinnerRecipe,
        box: boxRecipe,
      },
      slotRecipes: {},
    },
  },

  patterns: {
    icon: {
      properties: {
        size: {
          type: 'enum',
          value: Object.keys(tokens.sizes),
        },
      },
      transform(props) {
        const { size, ...rest } = props;
        return {
          width: size,
          height: size,
          ...rest,
        };
      },
    },
    extend: {
      container: {
        transform(props) {
          return Object.assign(
            {
              position: 'relative',
              width: '100%',
              maxWidth: '7xl',
              mx: 'auto',
              px: { base: '24', md: '20', sm: '16' },
            },
            props,
          );
        },
      },
    },
  },

  globalCss: {
    ...globalCss,
    html: {
      '--global-font-sans': 'fonts.sans',
      '--global-font-serif': 'fonts.serif',
      '--global-font-mono': 'fonts.mono',
    },
  },

  conditions: {
    ...conditions,

    // States
    indeterminate:
      '&:is(:indeterminate, [data-indeterminate], [aria-checked=mixed], [data-state=indeterminate])',
    hidden: '&:is([hidden])',
    current: '&:is([data-current])',
    today: '&:is([data-today])',
    collapsed:
      '&:is([aria-collapsed=true], [data-collapsed], [data-state="collapsed"])',

    // Containers
    containerSmall: '@container (max-width: 560px)',
    containerMedium: '@container (min-width: 561px) and (max-width: 999px)',
    containerLarge: '@container (min-width: 1000px)',
  },
});
