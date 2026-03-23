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
      lineHeight: '1',
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
          bg: { base: 'neutral.30', _dark: 'darkNeutral.40' },
          color: 'text',
        },
      },
      subtle: {
        indicator: {
          bg: 'bg.neutral',
          color: 'text',
        },
      },
      inverted: {
        indicator: {
          bg: 'bg.neutral.inverse.bold',
          color: 'text.inverse',
        },
      },
      'subtle-inverted': {
        indicator: {
          bg: 'bg.neutral.inverse.subtle',
          color: 'text',
        },
      },
      success: {
        indicator: {
          bg: 'bg.success.bold',
          color: 'text.inverse',
        },
      },
      danger: {
        indicator: {
          bg: 'bg.danger.bold',
          color: 'text.inverse',
        },
      },
      warning: {
        indicator: {
          bg: 'bg.warning.bold',
          color: 'text.warning.inverse',
        },
      },
      info: {
        indicator: {
          bg: 'bg.info.bold',
          color: 'text.inverse',
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
  // staticCss: [
  //   {
  //     size: ['sm', 'md', 'lg'],
  //     standalone: ['true', 'false'],
  //     dot: ['true', 'false'],
  //     variant: [
  //       'neutral',
  //       'inverted',
  //       'subtle',
  //       'subtle-inverted',
  //       'success',
  //       'danger',
  //       'warning',
  //       'info',
  //     ],
  //   },
  // ],
});
