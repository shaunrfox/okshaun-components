import {
  defineTokens,
  defineSemanticTokens,
  definePreset,
} from '@pandacss/dev';
import pandaBasePreset from '@pandacss/preset-base';
import * as tokens from './src/styles/tokens';
import * as semanticTokens from './src/styles/semanticTokens';
import { conditions } from './src/styles/conditions';
import { globalCss } from './src/styles/globalStyle';
import * as componentRecipes from './src/recipes/index';

// Extract slot recipes separately
const {
  checkboxRecipe,
  radioRecipe,
  tooltipRecipe,
  menuRecipe,
  toggleRecipe,
  ...regularComponents
} = componentRecipes;

// Transform recipe keys: remove 'Recipe' suffix to match component imports
// e.g., { boxRecipe: {...} } becomes { box: {...} }
const transformedRecipes = Object.fromEntries(
  Object.entries(regularComponents).map(([key, value]) => [
    key.replace(/Recipe$/, ''),
    value,
  ]),
);

// https://panda-css.com/docs/concepts/extend#removing-something-from-the-base-presets
// omit default patterns here
const { box, divider, ...pandaBasePresetPatterns } = pandaBasePreset.patterns;
const pandaBasePresetConditions = pandaBasePreset.conditions;
const pandaBasePresetUtilities = pandaBasePreset.utilities;
const pandaBasePresetGlobalCss = pandaBasePreset.globalCss;

// Extract size keys before processing
const sizeKeys = Object.keys(tokens.sizes);

// Exclude textStyles, breakpoints, and keyframes from tokens
// textStyles is already processed by defineTextStyles
// breakpoints and keyframes are passed separately at theme level
const { textStyles, breakpoints, keyframes, ...rawTokens } = tokens;

const theme = {
  tokens: defineTokens({
    ...rawTokens,
    spacing: tokens.sizes, // Map spacing to our size scale for consistent sizing
  }),
  semanticTokens: defineSemanticTokens({
    ...semanticTokens,
  }),
};

export const okshaunPreset = definePreset({
  name: 'okshaunPreset',
  theme: {
    extend: {
      tokens: {
        ...theme.tokens,
      },
      semanticTokens: {
        ...theme.semanticTokens,
      },
      breakpoints: breakpoints,
      keyframes: keyframes,
      textStyles: textStyles,
      recipes: {
        ...transformedRecipes,
      },
      slotRecipes: {
        checkbox: checkboxRecipe,
        radio: radioRecipe,
        tooltip: tooltipRecipe,
        menu: menuRecipe,
        toggle: toggleRecipe,
      },
    },
  },
  patterns: {
    icon: {
      properties: {
        size: {
          type: 'enum',
          value: sizeKeys,
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
      ...pandaBasePresetPatterns,
      container: {
        transform(props) {
          return Object.assign(
            {
              position: 'relative',
              width: '100%',
              maxWidth: '8xl',
              mx: 'auto',
              px: { base: '24', md: '20', sm: '16' },
            },
            props,
          );
        },
      },
    },
  },
  utilities: {
    ...pandaBasePresetUtilities,
  },

  // Global styles
  globalCss: {
    ...pandaBasePresetGlobalCss,
    ...globalCss,
    html: {
      '--global-font-heading': 'fonts.sans',
      '--global-font-body': 'fonts.serif',
      '--global-font-mono': 'fonts.mono',
    },
  },

  // Conditions for responsive and state-based styling
  conditions: {
    ...pandaBasePresetConditions,
    ...conditions,
    collapsed:
      '&:is([aria-collapsed=true], [data-collapsed], [data-state="collapsed"])',
  },
});
