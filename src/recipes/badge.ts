import { defineSlotRecipe } from '@pandacss/dev';

export const badgeRecipe = defineSlotRecipe({
  className: 'badge',
  jsx: ['Badge'],
  slots: ['root', 'indicator'],
  base: {
    root: {
      display: 'inline-flex',
      position: 'relative',
      verticalAlign: 'middle',
    },
    indicator: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '999',
      fontWeight: 'medium',
      fontFamily: 'sans',
      lineHeight: 'none',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      zIndex: 'raised',
    },
  },
  variants: {
    size: {
      sm: {
        indicator: {
          h: '6',
          fontSize: '10',
          p: '3',
        },
      },
      md: {
        indicator: {
          h: '8',
          fontSize: '12',
          p: '4',
        },
      },
      lg: {
        indicator: {
          h: '10',
          fontSize: '14',
          p: '5',
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
        },
      },
    },
    // Dot mode: smaller, no text
    dot: {
      true: {
        indicator: {
          // Dot mode styles handled by base + size variants
        },
      },
      false: {
        indicator: {
          // Count mode - compound variants handle sizing
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
  compoundVariants: [
    // Count mode sizes (smaller than count mode)
    {
      dot: false,
      size: 'sm',
      css: {
        indicator: {
          minW: '16',
          h: 'fit',
        },
      },
    },
    {
      dot: false,
      size: 'md',
      css: {
        indicator: {
          minW: '20',
          h: 'fit',
        },
      },
    },
    {
      dot: false,
      size: 'lg',
      css: {
        indicator: {
          minW: '24',
          h: 'fit',
        },
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'danger',
  },
});
