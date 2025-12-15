import {
  defineTokens,
  defineSemanticTokens,
  definePreset,
} from '@pandacss/dev';
import pandaBasePreset from '@pandacss/preset-base';
import * as tokens from './src/styles/primitives';
import * as semantics from './src/styles/semantics';
import { textStyles } from './src/styles/semantics/textStyles.semantics';
import { conditions } from './src/styles/conditions';
import { globalCss } from './src/styles/globalStyle';
import * as componentRecipes from './src/recipes';

// Extract slot recipes separately
const {
  badgeRecipe,
  buttonRecipe,
  iconButtonRecipe,
  checkboxRecipe,
  radioRecipe,
  tooltipRecipe,
  menuRecipe,
  toggleRecipe,
  chipRecipe,
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
const {
  box: _box,
  divider: _divider,
  ...pandaBasePresetPatterns
} = pandaBasePreset.patterns;
const pandaBasePresetConditions = pandaBasePreset.conditions;
const pandaBasePresetUtilities = pandaBasePreset.utilities;
const pandaBasePresetGlobalCss = pandaBasePreset.globalCss;

// Extract size keys before processing
const sizeKeys = Object.keys(tokens.sizes);

// Exclude textStyles, breakpoints, and keyframes from tokens
// textStyles is already processed by defineTextStyles
// breakpoints and keyframes are passed separately at theme level
const { breakpoints, keyframes, ...rawTokens } = tokens;

const theme = {
  tokens: defineTokens({
    ...rawTokens,
    spacing: tokens.sizes, // Map spacing to our size scale for consistent sizing
  }),
  semanticTokens: defineSemanticTokens({
    ...semantics,
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
        badge: badgeRecipe,
        button: buttonRecipe,
        iconButton: iconButtonRecipe,
        checkbox: checkboxRecipe,
        radio: radioRecipe,
        tooltip: tooltipRecipe,
        menu: menuRecipe,
        toggle: toggleRecipe,
        chip: chipRecipe,
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
              px: { base: '24', md: '32', lg: '48' },
            },
            props,
          );
        },
      },
    },
  },
  utilities: {
    ...pandaBasePresetUtilities,
    // Custom utility for transitionProperty that uses our transition tokens
    transitionProperty: {
      className: 'transition-property',
      values: 'transitions',
    },
  },

  // Global styles
  globalCss: {
    ...pandaBasePresetGlobalCss,
    ...globalCss,
    html: {
      '--global-font-heading': 'fonts.heading',
      '--global-font-body': 'fonts.body',
      '--global-font-sans': 'fonts.sans',
      '--global-font-serif': 'fonts.serif',
      '--global-font-mono': 'fonts.mono',
    },
  },

  // Conditions for responsive and state-based styling
  conditions: {
    ...pandaBasePresetConditions,
    ...conditions,
  },
});
