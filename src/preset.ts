import { definePreset } from '@pandacss/dev';
import pandaBasePreset from '@pandacss/preset-base';
import type { RecipeConfig, SlotRecipeConfig } from '@pandacss/types';
import * as regularRecipes from './recipes/recipes-regular';
import * as slotRecipes from './recipes/recipes-slot';
import * as tokens from './styles/primitives';
import * as semanticTokens from './styles/semantics';
import {
  breakpoints,
  conditions,
  containerSizes,
  filtersProperty,
  globalCss,
  keyframes,
  layerStyles,
  textStyles,
  transitionProperty,
} from './styles/utilities';

const presetRecipes = Object.fromEntries(
  Object.entries(regularRecipes).map(([key, value]) => [
    key.replace(/Recipe$/, ''),
    value,
  ]),
) as unknown as Record<string, Partial<RecipeConfig>>;

const presetSlotRecipes = Object.fromEntries(
  Object.entries(slotRecipes).map(([key, value]) => [
    key.replace(/Recipe$/, ''),
    value,
  ]),
) as unknown as Record<string, Partial<SlotRecipeConfig>>;

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
// const sizeKeys = Object.keys(tokens.sizes);

// Exclude textStyles, breakpoints, and keyframes from tokens
// textStyles is already processed by defineTextStyles
// breakpoints and keyframes are passed separately at theme level
// const { breakpoints, keyframes, ...rawTokens } = tokens;

const theme = {
  tokens: {
    ...tokens,
  },
  semanticTokens: {
    colors: semanticTokens.colors,
    shadows: semanticTokens.shadows,
    zIndex: semanticTokens.zIndex,
  },
};

export const okshaunPreset = definePreset({
  name: 'okshaunPreset',
  theme: {
    extend: {
      tokens: {
        ...theme.tokens,
      },
      semanticTokens: {
        colors: theme.semanticTokens.colors,
        shadows: theme.semanticTokens.shadows,
        zIndex: theme.semanticTokens.zIndex,
      },
      breakpoints: breakpoints,
      containerSizes: containerSizes,
      keyframes: keyframes,
      layerStyles: layerStyles,
      textStyles: textStyles,
      recipes: presetRecipes,
      slotRecipes: presetSlotRecipes,
    },
  },
  patterns: {
    // icon: {
    //   properties: {
    //     size: {
    //       type: "enum",
    //       value: sizeKeys,
    //     },
    //   },
    //   transform(props) {
    //     const { size, ...rest } = props;
    //     return {
    //       width: size,
    //       height: size,
    //       ...rest,
    //     };
    //   },
    // },
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
    filtersProperty,
    transitionProperty,
  },

  // Global styles
  globalCss: {
    ...pandaBasePresetGlobalCss,
    ...globalCss,
  },

  // Conditions for responsive and state-based styling
  conditions: {
    ...pandaBasePresetConditions,
    ...conditions,
  },
});
