import { defineSlotRecipe } from '@pandacss/dev';

// Ported from the Cetec design system: slots, sizing scale and behaviour.
// okshaun's semantic tokens carry the colours.

import { globalBaseStyles } from '~/styles/utilities';

export const badgeRecipe = defineSlotRecipe({
  className: 'badge',
  jsx: ['Badge'],
  slots: ['root', 'indicator'],
  base: {
    root: {
      ...globalBaseStyles,
      '--indicator-min-width': 'token(sizes.16)',
      display: 'inline-flex',
      position: 'relative',
      verticalAlign: 'middle',
      w: 'fit',
      h: 'fit',
      flex: '0',
    },
    indicator: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      h: 'fit',
      borderRadius: '999',
      fontWeight: 'medium',
      fontFamily: 'sans',
      lineHeight: 'none',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      zIndex: '1',
    },
  },
  variants: {
    size: {
      sm: {
        indicator: {
          '--indicator-min-width': 'token(sizes.16)',
          minH: '6',
          fontSize: '10',
          p: '3',
        },
      },
      md: {
        indicator: {
          '--indicator-min-width': 'token(sizes.20)',
          minH: '8',
          fontSize: '12',
          p: '4',
        },
      },
      lg: {
        indicator: {
          '--indicator-min-width': 'token(sizes.24)',
          minH: '10',
          fontSize: '14',
          p: '5',
        },
      },
      xl: {
        indicator: {
          '--indicator-min-width': 'token(sizes.28)',
          minH: '12',
          fontSize: '16',
          p: '6',
        },
      },
    },
    // When standalone (no children), don't use absolute positioning
    standalone: {
      true: {
        root: {
          display: 'inline-flex',
        },
        indicator: {
          position: 'static',
          transform: 'none',
          h: 'fit',
        },
      },
      false: {
        root: {
          display: 'inline-flex',
          position: 'relative',
          verticalAlign: 'middle',
        },
        indicator: {
          position: 'absolute',
          top: '0',
          right: '0',
          transform: 'translate(50%, -50%)',
          h: 'fit',
        },
      },
    },
    // Dot mode: smaller, no text
    dot: {
      true: {},
      false: {
        indicator: {
          h: 'fit',
          minW: 'var(--indicator-min-width)',
        },
      },
    },
    // variant variants for color schemes
    variant: {
      neutral: {
        indicator: {
          color: { base: 'neutral.110', _dark: 'neutral.0' },
          bg: { base: 'neutral.40', _dark: 'neutral.70' },
        },
      },
      subtle: {
        indicator: {
          color: { base: 'neutral.100', _dark: 'darkNeutral.120' },
          bg: { base: 'neutralA.20', _dark: 'darkNeutralA.20' },
        },
      },
      bold: {
        indicator: {
          color: { base: 'neutral.0', _dark: 'darkNeutral.10' },
          bg: { base: 'darkNeutral.0', _dark: 'neutral.0' },
        },
      },
      inverse: {
        indicator: {
          color: { base: 'neutral.110', _dark: 'darkNeutral.120' },
          bg: { base: 'neutral.0', _dark: 'darkNeutral.0' },
        },
      },
      success: {
        indicator: {
          color: { base: 'neutral.0', _dark: 'darkNeutral.0' },
          bg: { base: 'green.50', _dark: 'green.40' },
        },
      },
      warning: {
        indicator: {
          color: { base: 'neutral.100', _dark: 'darkNeutral.10' },
          bg: { base: 'orange.30', _dark: 'orange.30' },
        },
      },
      danger: {
        indicator: {
          color: { base: 'neutral.0', _dark: 'neutral.0' },
          bg: { base: 'red.50', _dark: 'red.50' },
        },
      },
      info: {
        indicator: {
          color: { base: 'neutral.0', _dark: 'darkNeutral.10' },
          bg: { base: 'blue.50', _dark: 'blue.40' },
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'danger',
  },
});
