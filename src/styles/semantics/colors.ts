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
      DEFAULT: {
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
        DEFAULT: {
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
        DEFAULT: {
          value: {
            base: '{colors.neutral.100}',
            _dark: '{colors.darkNeutral.110}',
          },
        },
      },
      subtle: {
        DEFAULT: { value: { base: '#ffffff02', _dark: '#ffffff02' } },
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
        DEFAULT: {
          value: {
            base: '{colors.darkNeutral.0}',
            _dark: '{colors.neutral.0}',
          },
        },
        subtle: {
          DEFAULT: { value: { base: '#00000029', _dark: '#ffffff29' } },
          hovered: { value: { base: '#0000003d', _dark: '#ffffff3d' } },
          // hovered.2: { value: { base: "#00000052", _dark: "#ffffff52" } },
          // pressed: {},
        },
      },
    },
    selected: {
      DEFAULT: {
        value: { base: '{colors.blue.10}', _dark: '{colors.blue.100}' },
      },
      hovered: {
        value: { base: '{colors.blue.20}', _dark: '{colors.blue.90}' },
      },
      pressed: {
        value: { base: '{colors.blue.30}', _dark: '{colors.blue.80}' },
      },
      bold: {
        DEFAULT: {
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
        DEFAULT: {
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
        DEFAULT: {
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
        DEFAULT: {
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
      DEFAULT: {
        value: { base: '{colors.lime.10}', _dark: '{colors.lime.100}' },
      },
      hovered: {
        value: { base: '{colors.lime.20}', _dark: '{colors.lime.90}' },
      },
      pressed: {
        value: { base: '{colors.lime.30}', _dark: '{colors.lime.80}' },
      },
      bold: {
        DEFAULT: {
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
      DEFAULT: {
        value: { base: '{colors.orange.10}', _dark: '{colors.orange.100}' },
      },
      hovered: {
        value: { base: '{colors.orange.20}', _dark: '{colors.orange.90}' },
      },
      pressed: {
        value: { base: '{colors.orange.30}', _dark: '{colors.orange.80}' },
      },
      bold: {
        DEFAULT: {
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
      DEFAULT: {
        value: { base: '{colors.red.10}', _dark: '{colors.red.100}' },
      },
      hovered: { value: { base: '{colors.red.20}', _dark: '{colors.red.90}' } },
      pressed: { value: { base: '{colors.red.30}', _dark: '{colors.red.80}' } },
      bold: {
        DEFAULT: {
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
      DEFAULT: {
        value: { base: '{colors.blue.10}', _dark: '{colors.blue.100}' },
      },
      hovered: {
        value: { base: '{colors.blue.20}', _dark: '{colors.blue.90}' },
      },
      pressed: {
        value: { base: '{colors.blue.30}', _dark: '{colors.blue.80}' },
      },
      bold: {
        DEFAULT: {
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
      DEFAULT: {
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
      // subtle: { DEFAULT: {}, hovered: {}, pressed: {}, },
      // subtler: { DEFAULT: {}, hovered: {}, pressed: {}, },
      // subtlest: { DEFAULT: {}, hovered: {}, pressed: {}, },
      // bold: { DEFAULT: {}, hovered: {}, pressed: {}, }
      // },
      gray: {
        subtle: {
          value: {
            base: '{colors.neutral.50}',
            _dark: '{colors.darkNeutral.50}',
          },
        },
        subtler: {
          value: {
            base: '{colors.neutral.30}',
            _dark: '{colors.darkNeutral.40}',
          },
        },
        subtlest: {
          value: {
            base: '{colors.neutral.20}',
            _dark: '{colors.darkNeutral.30}',
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
        subtle: {
          value: { base: '{colors.blue.40}', _dark: '{colors.blue.80}' },
        },
        subtler: {
          value: { base: '{colors.blue.20}', _dark: '{colors.blue.90}' },
        },
        subtlest: {
          value: { base: '{colors.blue.10}', _dark: '{colors.blue.100}' },
        },
        bold: {
          value: { base: '{colors.blue.70}', _dark: '{colors.blue.40}' },
        },
      },
      green: {
        subtle: {
          value: { base: '{colors.green.40}', _dark: '{colors.green.80}' },
        },
        subtler: {
          value: { base: '{colors.green.20}', _dark: '{colors.green.90}' },
        },
        subtlest: {
          value: { base: '{colors.green.10}', _dark: '{colors.green.90}' },
        },
        bold: {
          value: { base: '{colors.green.70}', _dark: '{colors.green.40}' },
        },
      },
      indigo: {
        subtle: {
          value: { base: '{colors.indigo.40}', _dark: '{colors.indigo.80}' },
        },
        subtler: {
          value: { base: '{colors.indigo.20}', _dark: '{colors.indigo.90}' },
        },
        subtlest: {
          value: { base: '{colors.indigo.10}', _dark: '{colors.indigo.90}' },
        },
        bold: {
          value: { base: '{colors.indigo.70}', _dark: '{colors.indigo.40}' },
        },
      },
      lime: {
        subtle: {
          value: { base: '{colors.lime.40}', _dark: '{colors.lime.80}' },
        },
        subtler: {
          value: { base: '{colors.lime.20}', _dark: '{colors.lime.90}' },
        },
        subtlest: {
          value: { base: '{colors.lime.10}', _dark: '{colors.lime.90}' },
        },
        bold: {
          value: { base: '{colors.lime.70}', _dark: '{colors.lime.40}' },
        },
      },
      magenta: {
        subtle: {
          value: { base: '{colors.magenta.40}', _dark: '{colors.magenta.80}' },
        },
        subtler: {
          value: { base: '{colors.magenta.20}', _dark: '{colors.magenta.90}' },
        },
        subtlest: {
          value: { base: '{colors.magenta.10}', _dark: '{colors.magenta.90}' },
        },
        bold: {
          value: { base: '{colors.magenta.70}', _dark: '{colors.magenta.40}' },
        },
      },
      orange: {
        subtle: {
          value: { base: '{colors.orange.40}', _dark: '{colors.orange.80}' },
        },
        subtler: {
          value: { base: '{colors.orange.20}', _dark: '{colors.orange.90}' },
        },
        subtlest: {
          value: { base: '{colors.orange.10}', _dark: '{colors.orange.90}' },
        },
        bold: {
          value: { base: '{colors.orange.70}', _dark: '{colors.orange.40}' },
        },
      },
      purple: {
        subtle: {
          value: { base: '{colors.purple.40}', _dark: '{colors.purple.80}' },
        },
        subtler: {
          value: { base: '{colors.purple.20}', _dark: '{colors.purple.90}' },
        },
        subtlest: {
          value: { base: '{colors.purple.10}', _dark: '{colors.purple.90}' },
        },
        bold: {
          value: { base: '{colors.purple.70}', _dark: '{colors.purple.40}' },
        },
      },
      red: {
        subtle: {
          value: { base: '{colors.red.40}', _dark: '{colors.red.80}' },
        },
        subtler: {
          value: { base: '{colors.red.20}', _dark: '{colors.red.90}' },
        },
        subtlest: {
          value: { base: '{colors.red.10}', _dark: '{colors.red.100}' },
        },
        bold: {
          value: { base: '{colors.red.70}', _dark: '{colors.red.40}' },
        },
      },
      tan: {
        subtle: {
          value: { base: '{colors.tan.40}', _dark: '{colors.tan.80}' },
        },
        subtler: {
          value: { base: '{colors.tan.20}', _dark: '{colors.tan.90}' },
        },
        subtlest: {
          value: { base: '{colors.tan.10}', _dark: '{colors.tan.90}' },
        },
        bold: {
          value: { base: '{colors.tan.70}', _dark: '{colors.tan.40}' },
        },
      },
      teal: {
        subtle: {
          value: { base: '{colors.teal.40}', _dark: '{colors.teal.80}' },
        },
        subtler: {
          value: { base: '{colors.teal.20}', _dark: '{colors.teal.90}' },
        },
        subtlest: {
          value: { base: '{colors.teal.10}', _dark: '{colors.teal.90}' },
        },
        bold: {
          value: { base: '{colors.teal.70}', _dark: '{colors.teal.40}' },
        },
      },
      yellow: {
        subtle: {
          value: { base: '{colors.yellow.30}', _dark: '{colors.yellow.80}' },
        },
        subtler: {
          value: { base: '{colors.yellow.20}', _dark: '{colors.yellow.90}' },
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
    DEFAULT: { value: { base: '#17171775', _dark: '#10121499' } },
    danger: { value: { base: '#ef5c4814', _dark: '#e3493514' } },
    selected: { value: { base: '#388bff14', _dark: '#1d7afc14' } },
  },
  border: {
    DEFAULT: {
      value: {
        base: '{colors.neutralA.30}',
        _dark: '{colors.darkNeutralA.30}',
      },
    },
    bold: {
      value: { base: '{colors.neutral.60}', _dark: '{colors.darkNeutral.60}' },
    },
    inverse: {
      value: { base: '{colors.neutral.0}', _dark: '{colors.darkNeutral.0}' },
    },
    disabled: {
      value: {
        base: '{colors.neutralA.20}',
        _dark: '{colors.darkNeutralA.20}',
      },
    },
    focused: {
      DEFAULT: {
        value: { base: '{colors.blue.50}', _dark: '{colors.blue.30}' },
      },
      inverse: {
        value: { base: '{colors.blue.100}', _dark: '{colors.blue.10}' },
      },
    },
    selected: {
      value: { base: '{colors.blue.70}', _dark: '{colors.blue.40}' },
    },
    input: {
      value: { base: '{colors.neutral.50}', _dark: '{colors.darkNeutral.60}' },
    },
    success: { value: { base: '{colors.lime.60}', _dark: '{colors.lime.50}' } },
    warning: {
      value: { base: '{colors.orange.60}', _dark: '{colors.orange.50}' },
    },
    danger: { value: { base: '{colors.red.60}', _dark: '{colors.red.50}' } },
    info: { value: { base: '{colors.blue.60}', _dark: '{colors.blue.50}' } },
  },
  icon: {
    DEFAULT: {
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
      value: { base: '{colors.blue.70}', _dark: '{colors.blue.40}' },
    },
    disabled: {
      value: {
        base: '{colors.neutralA.40}',
        _dark: '{colors.darkNeutralA.40}',
      },
    },
    decorative: {
      DEFAULT: {
        value: {
          base: '{colors.neutral.50}',
          _dark: '{colors.darkNeutral.60}',
        },
      },
      hovered: {
        value: { base: '{colors.neutral.100}', _dark: '{colors.neutral.0}' },
      },
      inverse: {
        DEFAULT: {
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
    },
    success: { value: { base: '{colors.lime.60}', _dark: '{colors.lime.50}' } },
    warning: {
      DEFAULT: {
        value: { base: '{colors.orange.60}', _dark: '{colors.orange.30}' },
      },
      inverse: {
        value: {
          base: '{colors.neutral.100}',
          _dark: '{colors.darkNeutral.10}',
        },
      },
    },
    danger: { value: { base: '{colors.red.70}', _dark: '{colors.red.50}' } },
    info: { value: { base: '{colors.blue.60}', _dark: '{colors.blue.50}' } },
  },
  link: {
    DEFAULT: { value: { base: '{colors.blue.70}', _dark: '{colors.blue.40}' } },
    pressed: { value: { base: '{colors.blue.80}', _dark: '{colors.blue.30}' } },
  },
  surface: {
    DEFAULT: {
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
    overlay: {
      DEFAULT: {
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
    raised: {
      DEFAULT: {
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
  },
  text: {
    DEFAULT: {
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
    placeholder: {
      value: { base: '{colors.neutral.50}', _dark: '{colors.darkNeutral.60}' },
    },
    bold: {
      value: {
        base: '{colors.neutral.100}',
        _dark: '{colors.darkNeutral.110}',
      },
    },
    inverse: {
      value: { base: '{colors.neutral.0}', _dark: '{colors.darkNeutral.10}' },
    },
    selected: {
      value: { base: '{colors.blue.70}', _dark: '{colors.blue.40}' },
    },
    disabled: {
      value: {
        base: '{colors.neutralA.40}',
        _dark: '{colors.darkNeutralA.40}',
      },
    },
    success: { value: { base: '{colors.lime.80}', _dark: '{colors.lime.30}' } },
    warning: {
      DEFAULT: {
        value: { base: '{colors.orange.80}', _dark: '{colors.orange.30}' },
      },
      inverse: {
        value: {
          base: '{colors.neutral.100}',
          _dark: '{colors.darkNeutral.10}',
        },
      },
    },
    danger: { value: { base: '{colors.red.80}', _dark: '{colors.red.30}' } },
    info: { value: { base: '{colors.blue.80}', _dark: '{colors.blue.30}' } },
    accent: {
      gray: {
        DEFAULT: {
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
        DEFAULT: {
          value: { base: '{colors.red.80}', _dark: '{colors.red.30}' },
        },
        bold: {
          value: { base: '{colors.red.90}', _dark: '{colors.red.20}' },
        },
      },
      orange: {
        DEFAULT: {
          value: { base: '{colors.orange.80}', _dark: '{colors.orange.30}' },
        },
        bold: {
          value: { base: '{colors.orange.90}', _dark: '{colors.orange.20}' },
        },
      },
      yellow: {
        DEFAULT: {
          value: { base: '{colors.yellow.80}', _dark: '{colors.yellow.30}' },
        },
        bold: {
          value: { base: '{colors.yellow.90}', _dark: '{colors.yellow.20}' },
        },
      },
      lime: {
        DEFAULT: {
          value: { base: '{colors.lime.80}', _dark: '{colors.lime.30}' },
        },
        bold: {
          value: { base: '{colors.lime.90}', _dark: '{colors.lime.20}' },
        },
      },
      green: {
        DEFAULT: {
          value: { base: '{colors.green.80}', _dark: '{colors.green.30}' },
        },
        bold: {
          value: { base: '{colors.green.90}', _dark: '{colors.green.20}' },
        },
      },
      teal: {
        DEFAULT: {
          value: { base: '{colors.teal.80}', _dark: '{colors.teal.30}' },
        },
        bold: {
          value: { base: '{colors.teal.90}', _dark: '{colors.teal.20}' },
        },
      },
      blue: {
        DEFAULT: {
          value: { base: '{colors.blue.80}', _dark: '{colors.blue.30}' },
        },
        bold: {
          value: { base: '{colors.blue.90}', _dark: '{colors.blue.20}' },
        },
      },
      indigo: {
        DEFAULT: {
          value: { base: '{colors.indigo.80}', _dark: '{colors.indigo.30}' },
        },
        bold: {
          value: { base: '{colors.indigo.90}', _dark: '{colors.indigo.20}' },
        },
      },
      purple: {
        DEFAULT: {
          value: { base: '{colors.purple.80}', _dark: '{colors.purple.30}' },
        },
        bold: {
          value: { base: '{colors.purple.90}', _dark: '{colors.purple.20}' },
        },
      },
      magenta: {
        DEFAULT: {
          value: { base: '{colors.magenta.80}', _dark: '{colors.magenta.30}' },
        },
        bold: {
          value: { base: '{colors.magenta.90}', _dark: '{colors.magenta.20}' },
        },
      },
      tan: {
        DEFAULT: {
          value: { base: '{colors.tan.80}', _dark: '{colors.tan.30}' },
        },
        bold: {
          value: { base: '{colors.tan.90}', _dark: '{colors.tan.20}' },
        },
      },
    },
  },
  utility: {
    shadowColor: {
      value: { base: '{colors.slate.90/20}', _dark: '{colors.slate.100/40}' },
    },
  },
});
