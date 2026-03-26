import { defineSemanticTokens } from '@pandacss/dev';

// ============================================================================
// BRAND PALETTE CONFIGURATION
// Change this single variable to switch your entire brand color palette
// ============================================================================
const BRAND_PALETTE = 'gray' as const;
// Available options: 'yellow', 'blue', 'red', 'green', 'lime', 'orange',
//                    'purple', 'magenta', 'indigo', 'teal', 'tan'

// Helper to generate brand token values
const brandPalette = (shade: string) =>
  `{colors.${BRAND_PALETTE}.${shade}}` as const;

export const colors = defineSemanticTokens.colors({
  // Brand color palette - automatically uses the palette defined above
  brand: {
    '10': { value: brandPalette('10') },
    '20': { value: brandPalette('20') },
    '30': { value: brandPalette('30') },
    '40': { value: brandPalette('40') },
    '50': { value: brandPalette('50') },
    '60': { value: brandPalette('60') },
    '70': { value: brandPalette('70') },
    '80': { value: brandPalette('80') },
    '90': { value: brandPalette('90') },
    '100': { value: brandPalette('100') },
  },
  bg: {
    disabled: {
      value: { base: '{colors.neutral.10}', _dark: '{colors.darkNeutral.10}' },
    },
    neutral: {
      default: {
        value: {
          base: '{colors.neutralA.20}',
          _dark: '{colors.darkNeutralA.20}',
        },
      },
      hovered: {
        value: {
          base: '{colors.neutralA.30}',
          _dark: '{colors.darkNeutralA.30}',
        },
      },
      pressed: {
        value: {
          base: '{colors.neutralA.40}',
          _dark: '{colors.darkNeutralA.40}',
        },
      },
      bold: {
        default: {
          value: {
            base: '{colors.neutral.80}',
            _dark: '{colors.darkNeutral.80}',
          },
        },
        hovered: {
          value: {
            base: '{colors.neutral.90}',
            _dark: '{colors.darkNeutral.90}',
          },
        },
        pressed: {
          value: {
            base: '{colors.neutral.100}',
            _dark: '{colors.darkNeutral.100}',
          },
        },
      },
      boldest: {
        default: {
          value: {
            base: '{colors.neutral.100}',
            _dark: '{colors.darkNeutral.110}',
          },
        },
      },
      subtle: {
        default: { value: { base: '#ffffff02', _dark: '#ffffff02' } },
        hovered: {
          value: {
            base: '{colors.neutralA.20}',
            _dark: '{colors.darkNeutralA.20}',
          },
        },
        pressed: {
          value: {
            base: '{colors.neutralA.30}',
            _dark: '{colors.darkNeutralA.30}',
          },
        },
      },
      inverse: {
        default: {
          value: {
            base: '{colors.darkNeutral.0}',
            _dark: '{colors.neutral.0}',
          },
        },
        subtle: {
          default: { value: { base: '#00000029', _dark: '#ffffff29' } },
          hovered: { value: { base: '#0000003d', _dark: '#ffffff3d' } },
        },
      },
      solid: {
        value: {
          base: '{colors.neutral.20}',
          _dark: '{colors.darkNeutral.20}',
        },
      },
    },
    selected: {
      default: {
        value: { base: '{colors.blue.10}', _dark: '{colors.blue.100}' },
      },
      hovered: {
        value: { base: '{colors.blue.20}', _dark: '{colors.blue.90}' },
      },
      pressed: {
        value: { base: '{colors.blue.30}', _dark: '{colors.blue.80}' },
      },
      bold: {
        default: {
          value: { base: '{colors.blue.70}', _dark: '{colors.blue.40}' },
        },
        hovered: {
          value: { base: '{colors.blue.80}', _dark: '{colors.blue.30}' },
        },
        pressed: {
          value: { base: '{colors.blue.90}', _dark: '{colors.blue.20}' },
        },
      },
    },
    brand: {
      bold: {
        default: {
          value: { base: '{colors.brand.70}', _dark: '{colors.brand.40}' },
        },
        hovered: {
          value: { base: '{colors.brand.80}', _dark: '{colors.brand.30}' },
        },
        pressed: {
          value: { base: '{colors.brand.90}', _dark: '{colors.brand.20}' },
        },
      },
      boldest: {
        default: {
          value: { base: '{colors.brand.100}', _dark: '{colors.brand.20}' },
        },
        hovered: {
          value: { base: '{colors.brand.90}', _dark: '{colors.brand.30}' },
        },
        pressed: {
          value: { base: '{colors.brand.80}', _dark: '{colors.brand.40}' },
        },
      },
      subtle: {
        default: {
          value: { base: '{colors.brand.10}', _dark: '{colors.brand.100}' },
        },
        hovered: {
          value: { base: '{colors.brand.20}', _dark: '{colors.brand.90}' },
        },
        pressed: {
          value: { base: '{colors.brand.30}', _dark: '{colors.brand.80}' },
        },
      },
    },
    success: {
      default: {
        value: { base: '{colors.lime.10}', _dark: '{colors.lime.100}' },
      },
      hovered: {
        value: { base: '{colors.lime.20}', _dark: '{colors.lime.90}' },
      },
      pressed: {
        value: { base: '{colors.lime.30}', _dark: '{colors.lime.80}' },
      },
      bold: {
        default: {
          value: { base: '{colors.lime.70}', _dark: '{colors.lime.40}' },
        },
        hovered: {
          value: { base: '{colors.lime.80}', _dark: '{colors.lime.30}' },
        },
        pressed: {
          value: { base: '{colors.lime.90}', _dark: '{colors.lime.20}' },
        },
      },
    },
    warning: {
      default: {
        value: { base: '{colors.orange.10}', _dark: '{colors.orange.100}' },
      },
      hovered: {
        value: { base: '{colors.orange.20}', _dark: '{colors.orange.90}' },
      },
      pressed: {
        value: { base: '{colors.orange.30}', _dark: '{colors.orange.80}' },
      },
      bold: {
        default: {
          value: { base: '{colors.orange.30}', _dark: '{colors.orange.30}' },
        },
        hovered: {
          value: { base: '{colors.orange.40}', _dark: '{colors.orange.40}' },
        },
        pressed: {
          value: { base: '{colors.orange.50}', _dark: '{colors.orange.50}' },
        },
      },
    },
    danger: {
      default: {
        value: { base: '{colors.red.10}', _dark: '{colors.red.100}' },
      },
      hovered: { value: { base: '{colors.red.20}', _dark: '{colors.red.90}' } },
      pressed: { value: { base: '{colors.red.30}', _dark: '{colors.red.80}' } },
      bold: {
        default: {
          value: { base: '{colors.red.70}', _dark: '{colors.red.40}' },
        },
        hovered: {
          value: { base: '{colors.red.80}', _dark: '{colors.red.30}' },
        },
        pressed: {
          value: { base: '{colors.red.90}', _dark: '{colors.red.20}' },
        },
      },
    },
    info: {
      default: {
        value: { base: '{colors.blue.10}', _dark: '{colors.blue.100}' },
      },
      hovered: {
        value: { base: '{colors.blue.20}', _dark: '{colors.blue.90}' },
      },
      pressed: {
        value: { base: '{colors.blue.30}', _dark: '{colors.blue.80}' },
      },
      bold: {
        default: {
          value: { base: '{colors.blue.70}', _dark: '{colors.blue.40}' },
        },
        hovered: {
          value: { base: '{colors.blue.80}', _dark: '{colors.blue.30}' },
        },
        pressed: {
          value: { base: '{colors.blue.90}', _dark: '{colors.blue.20}' },
        },
      },
    },
    input: {
      default: {
        value: { base: '{colors.neutral.0}', _dark: '{colors.darkNeutral.20}' },
      },
      hovered: {
        value: {
          base: '{colors.neutral.10}',
          _dark: '{colors.darkNeutral.25}',
        },
      },
      pressed: {
        value: { base: '{colors.neutral.0}', _dark: '{colors.darkNeutral.20}' },
      },
    },
    accent: {
      // hue: {
      // subtle: { default: {}, hovered: {}, pressed: {}, },
      // subtler: { default: {}, hovered: {}, pressed: {}, },
      // subtlest: { default: {}, hovered: {}, pressed: {}, },
      // bold: { default: {}, hovered: {}, pressed: {}, }
      // },
      neutral: {
        default: {
          value: {
            base: '{colors.neutral.50}',
            _dark: '{colors.darkNeutral.50}',
          },
        },
        subtle: {
          value: {
            base: '{colors.neutral.30}',
            _dark: '{colors.darkNeutral.40}',
          },
        },
        subtlest: {
          value: {
            base: '{colors.neutral.10}',
            _dark: '{colors.darkNeutral.10}',
          },
        },
        bold: {
          value: {
            base: '{colors.neutral.70}',
            _dark: '{colors.darkNeutral.70}',
          },
        },
      },
      blue: {
        default: {
          value: { base: '{colors.blue.40}', _dark: '{colors.blue.70}' },
        },
        subtle: {
          value: { base: '{colors.blue.20}', _dark: '{colors.blue.80}' },
        },
        subtlest: {
          value: { base: '{colors.blue.10}', _dark: '{colors.blue.90}' },
        },
        bold: {
          value: { base: '{colors.blue.70}', _dark: '{colors.blue.40}' },
        },
      },
      green: {
        default: {
          value: { base: '{colors.green.40}', _dark: '{colors.green.70}' },
        },
        subtle: {
          value: { base: '{colors.green.20}', _dark: '{colors.green.80}' },
        },
        subtlest: {
          value: { base: '{colors.green.10}', _dark: '{colors.green.90}' },
        },
        bold: {
          value: { base: '{colors.green.70}', _dark: '{colors.green.40}' },
        },
      },
      indigo: {
        default: {
          value: { base: '{colors.indigo.40}', _dark: '{colors.indigo.70}' },
        },
        subtle: {
          value: { base: '{colors.indigo.20}', _dark: '{colors.indigo.80}' },
        },
        subtlest: {
          value: { base: '{colors.indigo.10}', _dark: '{colors.indigo.90}' },
        },
        bold: {
          value: { base: '{colors.indigo.70}', _dark: '{colors.indigo.40}' },
        },
      },
      lime: {
        default: {
          value: { base: '{colors.lime.40}', _dark: '{colors.lime.70}' },
        },
        subtle: {
          value: { base: '{colors.lime.20}', _dark: '{colors.lime.80}' },
        },
        subtlest: {
          value: { base: '{colors.lime.10}', _dark: '{colors.lime.90}' },
        },
        bold: {
          value: { base: '{colors.lime.70}', _dark: '{colors.lime.40}' },
        },
      },
      magenta: {
        default: {
          value: { base: '{colors.magenta.40}', _dark: '{colors.magenta.70}' },
        },
        subtle: {
          value: { base: '{colors.magenta.20}', _dark: '{colors.magenta.80}' },
        },
        subtlest: {
          value: { base: '{colors.magenta.10}', _dark: '{colors.magenta.90}' },
        },
        bold: {
          value: { base: '{colors.magenta.70}', _dark: '{colors.magenta.40}' },
        },
      },
      orange: {
        default: {
          value: { base: '{colors.orange.40}', _dark: '{colors.orange.70}' },
        },
        subtle: {
          value: { base: '{colors.orange.20}', _dark: '{colors.orange.80}' },
        },
        subtlest: {
          value: { base: '{colors.orange.10}', _dark: '{colors.orange.90}' },
        },
        bold: {
          value: { base: '{colors.orange.70}', _dark: '{colors.orange.40}' },
        },
      },
      purple: {
        default: {
          value: { base: '{colors.purple.40}', _dark: '{colors.purple.70}' },
        },
        subtle: {
          value: { base: '{colors.purple.20}', _dark: '{colors.purple.80}' },
        },
        subtlest: {
          value: { base: '{colors.purple.10}', _dark: '{colors.purple.90}' },
        },
        bold: {
          value: { base: '{colors.purple.70}', _dark: '{colors.purple.40}' },
        },
      },
      red: {
        default: {
          value: { base: '{colors.red.40}', _dark: '{colors.red.70}' },
        },
        subtle: {
          value: { base: '{colors.red.20}', _dark: '{colors.red.80}' },
        },
        subtlest: {
          value: { base: '{colors.red.10}', _dark: '{colors.red.90}' },
        },
        bold: {
          value: { base: '{colors.red.70}', _dark: '{colors.red.40}' },
        },
      },
      tan: {
        default: {
          value: { base: '{colors.tan.40}', _dark: '{colors.tan.70}' },
        },
        subtle: {
          value: { base: '{colors.tan.20}', _dark: '{colors.tan.80}' },
        },
        subtlest: {
          value: { base: '{colors.tan.10}', _dark: '{colors.tan.90}' },
        },
        bold: {
          value: { base: '{colors.tan.70}', _dark: '{colors.tan.40}' },
        },
      },
      teal: {
        default: {
          value: { base: '{colors.teal.40}', _dark: '{colors.teal.70}' },
        },
        subtle: {
          value: { base: '{colors.teal.20}', _dark: '{colors.teal.80}' },
        },
        subtlest: {
          value: { base: '{colors.teal.10}', _dark: '{colors.teal.90}' },
        },
        bold: {
          value: { base: '{colors.teal.70}', _dark: '{colors.teal.40}' },
        },
      },
      yellow: {
        default: {
          value: { base: '{colors.yellow.30}', _dark: '{colors.yellow.70}' },
        },
        subtle: {
          value: { base: '{colors.yellow.20}', _dark: '{colors.yellow.80}' },
        },
        subtlest: {
          value: { base: '{colors.yellow.10}', _dark: '{colors.yellow.90}' },
        },
        bold: {
          value: { base: '{colors.yellow.70}', _dark: '{colors.yellow.40}' },
        },
      },
    },
  },
  blanket: {
    default: { value: { base: '#17171775', _dark: '#10121499' } },
    danger: { value: { base: '#ef5c4814', _dark: '#e3493514' } },
    selected: { value: { base: '#388bff14', _dark: '#1d7afc14' } },
  },
  border: {
    default: {
      value: {
        base: '{colors.neutralA.30}',
        _dark: '{colors.darkNeutralA.30}',
      },
    },
    bold: {
      value: { base: '{colors.neutral.90}', _dark: '{colors.darkNeutral.90}' },
    },
    inverse: {
      default: {
        value: { base: '{colors.neutral.0}', _dark: '{colors.darkNeutral.0}' },
      },
      focused: {
        value: {
          base: '{colors.darkNeutral.100}',
          _dark: '{colors.neutral.90}',
        },
      },
    },
    disabled: {
      value: {
        base: '{colors.neutralA.20}',
        _dark: '{colors.darkNeutralA.20}',
      },
    },
    focused: {
      default: {
        value: { base: '{colors.blue.50}', _dark: '{colors.blue.30}' },
      },
      inverse: {
        value: { base: '{colors.blue.100}', _dark: '{colors.blue.10}' },
      },
    },
    selected: {
      value: { base: '{colors.blue.60}', _dark: '{colors.blue.40}' },
    },
    input: {
      value: { base: '{colors.neutral.50}', _dark: '{colors.darkNeutral.60}' },
    },
    success: { value: { base: '{colors.lime.50}', _dark: '{colors.lime.50}' } },
    warning: {
      value: { base: '{colors.orange.50}', _dark: '{colors.orange.50}' },
    },
    danger: { value: { base: '{colors.red.50}', _dark: '{colors.red.50}' } },
    info: { value: { base: '{colors.blue.50}', _dark: '{colors.blue.50}' } },
  },
  icon: {
    default: {
      value: {
        base: '{colors.neutral.100}',
        _dark: '{colors.darkNeutral.110}',
      },
    },
    subtle: {
      value: { base: '{colors.neutral.80}', _dark: '{colors.darkNeutral.80}' },
    },
    subtlest: {
      value: { base: '{colors.neutral.70}', _dark: '{colors.darkNeutral.70}' },
    },
    inverse: {
      value: { base: '{colors.neutral.0}', _dark: '{colors.darkNeutral.10}' },
    },
    selected: {
      value: { base: '{colors.blue.60}', _dark: '{colors.blue.40}' },
    },
    disabled: {
      value: {
        base: '{colors.neutralA.40}',
        _dark: '{colors.darkNeutralA.40}',
      },
    },
    decorative: {
      default: {
        value: {
          base: '{colors.neutral.50}',
          _dark: '{colors.darkNeutral.60}',
        },
      },
      hovered: {
        value: { base: '{colors.neutral.100}', _dark: '{colors.neutral.0}' },
      },
      inverse: {
        default: {
          value: {
            base: '{colors.neutral.30}',
            _dark: '{colors.darkNeutral.30}',
          },
        },
        hovered: {
          value: {
            base: '{colors.neutral.0}',
            _dark: '{colors.darkNeutral.10}',
          },
        },
      },
      subtle: {
        value: {
          base: '{colors.neutral.40}',
          _dark: '{colors.darkNeutral.50}',
        },
      },
    },
    success: { value: { base: '{colors.lime.60}', _dark: '{colors.lime.50}' } },
    warning: {
      default: {
        value: { base: '{colors.orange.60}', _dark: '{colors.orange.30}' },
      },
      inverse: {
        value: {
          base: '{colors.neutral.100}',
          _dark: '{colors.darkNeutral.10}',
        },
      },
    },
    danger: {
      default: { value: { base: '{colors.red.70}', _dark: '{colors.red.50}' } },
      inverse: { value: { base: '{colors.red.10}', _dark: '{colors.red.70}' } },
    },
    info: { value: { base: '{colors.blue.60}', _dark: '{colors.blue.50}' } },
  },
  link: {
    default: { value: { base: '{colors.blue.50}', _dark: '{colors.blue.40}' } },
    pressed: { value: { base: '{colors.blue.60}', _dark: '{colors.blue.50}' } },
  },
  surface: {
    default: {
      value: { base: '{colors.neutral.0}', _dark: '{colors.darkNeutral.10}' },
    },
    hovered: {
      value: { base: '{colors.neutral.20}', _dark: '{colors.darkNeutral.20}' },
    },
    pressed: {
      value: { base: '{colors.neutral.30}', _dark: '{colors.darkNeutral.30}' },
    },
    sunken: {
      value: { base: '{colors.neutral.10}', _dark: '{colors.darkNeutral.0}' },
    },
    raised: {
      default: {
        value: { base: '{colors.neutral.0}', _dark: '{colors.darkNeutral.0}' },
      },
      hovered: {
        value: {
          base: '{colors.neutral.20}',
          _dark: '{colors.darkNeutral.25}',
        },
      },
      pressed: {
        value: {
          base: '{colors.neutral.30}',
          _dark: '{colors.darkNeutral.30}',
        },
      },
    },
    overlay: {
      default: {
        value: { base: '{colors.neutral.0}', _dark: '{colors.darkNeutral.25}' },
      },
      hovered: {
        value: {
          base: '{colors.neutral.20}',
          _dark: '{colors.darkNeutral.30}',
        },
      },
      pressed: {
        value: {
          base: '{colors.neutral.30}',
          _dark: '{colors.darkNeutral.35}',
        },
      },
    },
    selected: {
      default: {
        value: { base: '{colors.blue.10}', _dark: '{colors.blue.70}' },
      },
      hovered: {
        value: {
          base: '{colors.blue.10}',
          _dark: '{colors.blue.60}',
        },
      },
      pressed: {
        value: {
          base: '{colors.blue.20}',
          _dark: '{colors.blue.80}',
        },
      },
    },
  },
  text: {
    default: {
      value: {
        base: '{colors.neutral.100}',
        _dark: '{colors.darkNeutral.100}',
      },
    },
    subtle: {
      value: { base: '{colors.neutral.80}', _dark: '{colors.darkNeutral.80}' },
    },
    subtlest: {
      value: { base: '{colors.neutral.70}', _dark: '{colors.darkNeutral.70}' },
    },
    bold: {
      value: {
        base: '{colors.neutral.110}',
        _dark: '{colors.darkNeutral.110}',
      },
    },
    inverse: {
      default: {
        value: { base: '{colors.neutral.0}', _dark: '{colors.darkNeutral.10}' },
      },
      subtlest: {
        value: {
          base: '{colors.neutral.40}',
          _dark: '{colors.darkNeutral.40}',
        },
      },
    },
    selected: {
      value: { base: '{colors.blue.60}', _dark: '{colors.blue.40}' },
    },
    placeholder: {
      value: { base: '{colors.neutral.40}', _dark: '{colors.darkNeutral.40}' },
    },
    disabled: {
      value: {
        base: '{colors.neutralA.40}',
        _dark: '{colors.darkNeutralA.40}',
      },
    },
    success: {
      default: {
        value: { base: '{colors.lime.50}', _dark: '{colors.lime.30}' },
      },
      inverse: {
        value: { base: '{colors.lime.30}', _dark: '{colors.lime.50}' },
      },
    },
    warning: {
      default: {
        value: { base: '{colors.orange.60}', _dark: '{colors.orange.40}' },
      },
      inverse: {
        value: { base: '{colors.orange.40}', _dark: '{colors.orange.60}' },
      },
    },
    danger: {
      default: { value: { base: '{colors.red.50}', _dark: '{colors.red.30}' } },
      inverse: { value: { base: '{colors.red.30}', _dark: '{colors.red.50}' } },
    },
    info: {
      default: {
        value: { base: '{colors.blue.50}', _dark: '{colors.blue.40}' },
      },
      inverse: {
        value: { base: '{colors.blue.40}', _dark: '{colors.blue.50}' },
      },
    },
    accent: {
      neutral: {
        default: {
          value: {
            base: '{colors.neutral.80}',
            _dark: '{colors.darkNeutral.80}',
          },
        },
        bold: {
          value: {
            base: '{colors.neutral.100}',
            _dark: '{colors.darkNeutral.100}',
          },
        },
      },
      red: {
        default: {
          value: { base: '{colors.red.50}', _dark: '{colors.red.30}' },
        },
        bold: {
          value: { base: '{colors.red.60}', _dark: '{colors.red.20}' },
        },
      },
      orange: {
        default: {
          value: { base: '{colors.orange.60}', _dark: '{colors.orange.50}' },
        },
        bold: {
          value: { base: '{colors.orange.70}', _dark: '{colors.orange.30}' },
        },
      },
      yellow: {
        default: {
          value: { base: '{colors.yellow.50}', _dark: '{colors.yellow.30}' },
        },
        bold: {
          value: { base: '{colors.yellow.60}', _dark: '{colors.yellow.20}' },
        },
      },
      lime: {
        default: {
          value: { base: '{colors.lime.50}', _dark: '{colors.lime.40}' },
        },
        bold: {
          value: { base: '{colors.lime.60}', _dark: '{colors.lime.20}' },
        },
      },
      green: {
        default: {
          value: { base: '{colors.green.50}', _dark: '{colors.green.40}' },
        },
        bold: {
          value: { base: '{colors.green.60}', _dark: '{colors.green.20}' },
        },
      },
      teal: {
        default: {
          value: { base: '{colors.teal.50}', _dark: '{colors.teal.40}' },
        },
        bold: {
          value: { base: '{colors.teal.60}', _dark: '{colors.teal.20}' },
        },
      },
      blue: {
        default: {
          value: { base: '{colors.blue.50}', _dark: '{colors.blue.40}' },
        },
        bold: {
          value: { base: '{colors.blue.60}', _dark: '{colors.blue.30}' },
        },
      },
      indigo: {
        default: {
          value: { base: '{colors.indigo.40}', _dark: '{colors.indigo.20}' },
        },
        bold: {
          value: { base: '{colors.indigo.60}', _dark: '{colors.indigo.10}' },
        },
      },
      purple: {
        default: {
          value: { base: '{colors.purple.50}', _dark: '{colors.purple.40}' },
        },
        bold: {
          value: { base: '{colors.purple.60}', _dark: '{colors.purple.30}' },
        },
      },
      magenta: {
        default: {
          value: { base: '{colors.magenta.60}', _dark: '{colors.magenta.40}' },
        },
        bold: {
          value: { base: '{colors.magenta.70}', _dark: '{colors.magenta.30}' },
        },
      },
      tan: {
        default: {
          value: { base: '{colors.tan.50}', _dark: '{colors.tan.30}' },
        },
        bold: {
          value: { base: '{colors.tan.60}', _dark: '{colors.tan.20}' },
        },
      },
    },
  },
});
