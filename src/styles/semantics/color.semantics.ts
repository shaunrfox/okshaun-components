import { defineSemanticTokens } from '@pandacss/dev';

export const colors = defineSemanticTokens.colors({
  bg: {
    disabled: { value: { base: '{colors.neutral.10}', _dark: '{colors.darkNeutral.10}' } },
    neutral: {
      DEFAULT: { value: { base: '{colors.neutralA.20}', _dark: '{colors.darkNeutralA.20}' } },
      hovered: { value: { base: '{colors.neutralA.30}', _dark: '{colors.darkNeutralA.30}' } },
      pressed: { value: { base: '{colors.neutralA.40}', _dark: '{colors.darkNeutralA.40}' } },
      bold: {
        DEFAULT: { value: { base: '{colors.neutral.80}', _dark: '{colors.darkNeutral.80}' } },
        hovered: { value: { base: '{colors.neutral.90}', _dark: '{colors.darkNeutral.90}' } },
        pressed: { value: { base: '{colors.neutral.100}', _dark: '{colors.darkNeutral.100}' } },
      },
      subtle: {
        DEFAULT: { value: { base: '#ffffff02', _dark: '#ffffff02' } },
        hovered: { value: { base: '{colors.neutralA.20}', _dark: '{colors.darkNeutralA.20}' } },
        pressed: { value: { base: '{colors.neutralA.30}', _dark: '{colors.darkNeutralA.30}' } },
      },
      inverse: {
        subtle: {
          DEFAULT: { value: { base: '#00000029', _dark: '#ffffff29' } },
          hovered: { value: { base: '#0000003d', _dark: '#ffffff3d' } },
          // hovered.2: { value: { base: "#00000052", _dark: "#ffffff52" } },
          // pressed: {},
        },
      },
    },
    selected: {
      DEFAULT: { value: { base: '{colors.blue.10}', _dark: '{colors.blue.100}' } },
      hovered: { value: { base: '{colors.blue.20}', _dark: '{colors.blue.90}' } },
      pressed: { value: { base: '{colors.blue.30}', _dark: '{colors.blue.80}' } },
      bold: {
        DEFAULT: { value: { base: '{colors.blue.70}', _dark: '{colors.blue.40}' } },
        hovered: { value: { base: '{colors.blue.80}', _dark: '{colors.blue.30}' } },
        pressed: { value: { base: '{colors.blue.90}', _dark: '{colors.blue.20}' } },
      },
    },
    brand: {
      bold: {
        DEFAULT: { value: { base: '{colors.neutral.100}', _dark: '{colors.darkNeutral.110}' } },
        hovered: { value: { base: '{colors.neutral.90}', _dark: '{colors.darkNeutral.100}' } },
        pressed: { value: { base: '{colors.neutral.80}', _dark: '{colors.darkNeutral.90}' } },
      },
      'bold.og': {
        DEFAULT: { value: { base: '{colors.blue.70}', _dark: '{colors.blue.40}' } },
        hovered: { value: { base: '{colors.blue.80}', _dark: '{colors.blue.30}' } },
        pressed: { value: { base: '{colors.blue.90}', _dark: '{colors.blue.20}' } },
      },
      // boldest: {
      //   value: {},
      //   hovered: {},
      //   pressed: {},
      // },
      'boldest.og': {
        DEFAULT: { value: { base: '{colors.blue.100}', _dark: '{colors.blue.10}' } },
        hovered: { value: { base: '{colors.blue.90}', _dark: '{colors.blue.20}' } },
        // hovered.2: { base: "blue.80", _dark: "blue.30" },
        // pressed: {},
      },
      subtle: {
        DEFAULT: { value: { base: '{colors.blue.10}', _dark: '{colors.blue.100}' } },
        hovered: { value: { base: '{colors.blue.20}', _dark: '{colors.blue.90}' } },
        pressed: { value: { base: '{colors.blue.30}', _dark: '{colors.blue.80}' } },
      },
      // 'subtle.og': {
      //   value: {},
      //   hovered: {},
      //   pressed: {},
      // },
    },
    success: {
      DEFAULT: { value: { base: '{colors.lime.10}', _dark: '{colors.lime.100}' } },
      hovered: { value: { base: '{colors.lime.20}', _dark: '{colors.lime.90}' } },
      pressed: { value: { base: '{colors.lime.30}', _dark: '{colors.lime.80}' } },
      bold: {
        DEFAULT: { value: { base: '{colors.lime.70}', _dark: '{colors.lime.40}' } },
        hovered: { value: { base: '{colors.lime.80}', _dark: '{colors.lime.30}' } },
        pressed: { value: { base: '{colors.lime.90}', _dark: '{colors.lime.20}' } },
      },
    },
    warning: {
      DEFAULT: { value: { base: '{colors.orange.10}', _dark: '{colors.orange.100}' } },
      hovered: { value: { base: '{colors.orange.20}', _dark: '{colors.orange.90}' } },
      pressed: { value: { base: '{colors.orange.30}', _dark: '{colors.orange.80}' } },
      bold: {
        DEFAULT: { value: { base: '{colors.orange.30}', _dark: '{colors.orange.30}' } },
        hovered: { value: { base: '{colors.orange.40}', _dark: '{colors.orange.40}' } },
        pressed: { value: { base: '{colors.orange.50}', _dark: '{colors.orange.50}' } },
      },
    },
    danger: {
      DEFAULT: { value: { base: '{colors.red.10}', _dark: '{colors.red.100}' } },
      hovered: { value: { base: '{colors.red.20}', _dark: '{colors.red.90}' } },
      pressed: { value: { base: '{colors.red.30}', _dark: '{colors.red.80}' } },
      bold: {
        DEFAULT: { value: { base: '{colors.red.70}', _dark: '{colors.red.40}' } },
        hovered: { value: { base: '{colors.red.80}', _dark: '{colors.red.30}' } },
        pressed: { value: { base: '{colors.red.90}', _dark: '{colors.red.20}' } },
      },
    },
    info: {
      DEFAULT: { value: { base: '{colors.blue.10}', _dark: '{colors.blue.100}' } },
      hovered: { value: { base: '{colors.blue.20}', _dark: '{colors.blue.90}' } },
      pressed: { value: { base: '{colors.blue.30}', _dark: '{colors.blue.80}' } },
      bold: {
        DEFAULT: { value: { base: '{colors.blue.70}', _dark: '{colors.blue.40}' } },
        hovered: { value: { base: '{colors.blue.80}', _dark: '{colors.blue.30}' } },
        pressed: { value: { base: '{colors.blue.90}', _dark: '{colors.blue.20}' } },
      },
    },
    input: {
      DEFAULT: { value: { base: '{colors.neutral.0}', _dark: '{colors.darkNeutral.20}' } },
      hovered: { value: { base: '{colors.neutral.10}', _dark: '{colors.darkNeutral.25}' } },
      pressed: { value: { base: '{colors.neutral.0}', _dark: '{colors.darkNeutral.20}' } },
    },
  },
  blanket: {
    DEFAULT: { value: { base: '#ef5c4814', _dark: '#e3493514' } },
    danger: { value: { base: '#17171775', _dark: '#10121499' } },
    selected: { value: { base: '#388bff14', _dark: '#1d7afc14' } },
  },
  border: {
    DEFAULT: { value: { base: '{colors.neutralA.30}', _dark: '{colors.darkNeutralA.30}' } },
    bold: { value: { base: '{colors.neutral.60}', _dark: '{colors.darkNeutral.60}' } },
    inverse: { value: { base: '{colors.neutral.0}', _dark: '{colors.darkNeutral.0}' } },
    disabled: { value: { base: '{colors.neutralA.20}', _dark: '{colors.darkNeutralA.20}' } },
    focused: {
      DEFAULT: { value: { base: '{colors.blue.50}', _dark: '{colors.blue.30}' } },
      inverse: { value: { base: '{colors.blue.100}', _dark: '{colors.blue.10}' } },
    },
    selected: { value: { base: '{colors.blue.70}', _dark: '{colors.blue.40}' } },
    input: { value: { base: '{colors.neutral.50}', _dark: '{colors.darkNeutral.60}' } },
    success: { value: { base: '{colors.lime.60}', _dark: '{colors.lime.50}' } },
    warning: { value: { base: '{colors.orange.60}', _dark: '{colors.orange.50}' } },
    danger: { value: { base: '{colors.red.60}', _dark: '{colors.red.50}' } },
    info: { value: { base: '{colors.blue.60}', _dark: '{colors.blue.50}' } },
  },
  icon: {
    DEFAULT: { value: { base: '{colors.neutral.100}', _dark: '{colors.neutral.100}' } },
    subtle: { value: { base: '{colors.neutral.80}', _dark: '{colors.darkNeutral.80}' } },
    subtlest: { value: { base: '{colors.neutral.70}', _dark: '{colors.darkNeutral.70}' } },
    inverse: { value: { base: '{colors.neutral.0}', _dark: '{colors.darkNeutral.10}' } },
    selected: { value: { base: '{colors.blue.70}', _dark: '{colors.blue.40}' } },
    disabled: { value: { base: '{colors.neutralA.40}', _dark: '{colors.darkNeutralA.40}' } },
    decorative: {
      DEFAULT: { value: { base: '{colors.neutral.50}', _dark: '{colors.darkNeutral.60}' } },
      inverse: { value: { base: '{colors.neutral.30}', _dark: '{colors.darkNeutral.30}' } },
    },
    success: { value: { base: '{colors.lime.60}', _dark: '{colors.lime.50}' } },
    warning: {
      DEFAULT: { value: { base: '{colors.orange.60}', _dark: '{colors.orange.30}' } },
      inverse: { value: { base: '{colors.neutral.100}', _dark: '{colors.darkNeutral.10}' } },
    },
    danger: { value: { base: '{colors.red.70}', _dark: '{colors.red.50}' } },
    info: { value: { base: '{colors.blue.60}', _dark: '{colors.blue.50}' } },
  },
  link: {
    DEFAULT: { value: { base: '{colors.blue.70}', _dark: '{colors.blue.40}' } },
    pressed: { value: { base: '{colors.blue.80}', _dark: '{colors.blue.30}' } },
  },
  surface: {
    DEFAULT: { value: { base: '{colors.neutral.0}', _dark: '{colors.darkNeutral.10}' } },
    hovered: { value: { base: '{colors.neutral.20}', _dark: '{colors.darkNeutral.20}' } },
    pressed: { value: { base: '{colors.neutral.30}', _dark: '{colors.darkNeutral.30}' } },
    sunken: { value: { base: '{colors.neutral.10}', _dark: '{colors.darkNeutral.0}' } },
    overlay: {
      DEFAULT: { value: { base: '{colors.neutral.0}', _dark: '{colors.darkNeutral.25}' } },
      hovered: { value: { base: '{colors.neutral.20}', _dark: '{colors.darkNeutral.30}' } },
      pressed: { value: { base: '{colors.neutral.30}', _dark: '{colors.darkNeutral.35}' } },
    },
    raised: {
      DEFAULT: { value: { base: '{colors.neutral.0}', _dark: '{colors.darkNeutral.0}' } },
      hovered: { value: { base: '{colors.neutral.20}', _dark: '{colors.darkNeutral.25}' } },
      pressed: { value: { base: '{colors.neutral.30}', _dark: '{colors.darkNeutral.30}' } },
    },
  },
  text: {
    DEFAULT: { value: { base: '{colors.neutral.100}', _dark: '{colors.darkNeutral.100}' } },
    subtle: { value: { base: '{colors.neutral.80}', _dark: '{colors.darkNeutral.80}' } },
    subtlest: { value: { base: '{colors.neutral.70}', _dark: '{colors.darkNeutral.70}' } },
    inverse: { value: { base: '{colors.neutral.0}', _dark: '{colors.darkNeutral.10}' } },
    selected: { value: { base: '{colors.blue.70}', _dark: '{colors.blue.40}' } },
    disabled: { value: { base: '{colors.neutralA.40}', _dark: '{colors.darkNeutralA.40}' } },
    success: { value: { base: '{colors.lime.80}', _dark: '{colors.lime.30}' } },
    warning: {
      DEFAULT: { value: { base: '{colors.orange.80}', _dark: '{colors.orange.30}' } },
      inverse: { value: { base: '{colors.neutral.100}', _dark: '{colors.darkNeutral.10}' } },
    },
    danger: { value: { base: '{colors.red.80}', _dark: '{colors.red.30}' } },
    info: { value: { base: '{colors.blue.80}', _dark: '{colors.blue.30}' } },
  },
  utility: {
    shadowColor: { value: { base: '{colors.slate.90/20}', _dark: '{colors.slate.100/40}' } },
  },
});
