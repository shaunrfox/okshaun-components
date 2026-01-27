import { definePreset } from '@pandacss/dev';
import pandaBasePreset from '@pandacss/preset-base';
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
import * as componentRecipes from './recipes';

// Extract slot recipes separately
const {
  badgeRecipe,
  buttonRecipe,
  iconButtonRecipe,
  checkboxRecipe,
  radioRecipe,
  tooltipRecipe,
  menuRecipe,
  selectRecipe,
  toggleRecipe,
  chipRecipe,
  avatarRecipe,
  modalRecipe,
  formFieldRecipe,
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
// const { breakpoints, keyframes, ...rawTokens } = tokens;

const theme = {
  tokens: {
    ...tokens,
  },
  semanticTokens: {
    colors: semanticTokens.colors,
    shadows: semanticTokens.shadows,
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
      },
      breakpoints: breakpoints,
      containerSizes: containerSizes,
      keyframes: keyframes,
      layerStyles: layerStyles,
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
        select: selectRecipe,
        toggle: toggleRecipe,
        chip: chipRecipe,
        avatar: avatarRecipe,
        modal: modalRecipe,
        formField: formFieldRecipe,
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
