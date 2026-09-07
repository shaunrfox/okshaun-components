import { defineSlotRecipe } from '@pandacss/dev';

// Ported from the Cetec design system: slot names, sizing and type treatment.
// Two Cetec properties are dropped rather than faked: `cornerShape` is a Cetec
// utility okshaun does not register, and `fontVariant` drives Recursive's
// variable-font axes, which IBM Plex Mono does not expose.
export const kbdRecipe = defineSlotRecipe({
  className: 'kbd',
  jsx: ['Kbd'],
  slots: ['kbdGroup', 'key'],
  base: {
    kbdGroup: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '2',
      verticalAlign: 'middle',
    },
    key: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1',
      h: '16',
      w: 'fit',
      minW: '16',
      rounded: '6',
      bg: 'bg.neutral',
      px: '4',
      fontFamily: 'mono',
      lineHeight: 'tight',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: 'text.subtle',
      userSelect: 'none',
      pointerEvents: 'none',
      fontSize: '10',
    },
  },
  variants: {
    variant: {
      default: {
        key: {
          fontSize: '10',
        },
      },
      symbol: {
        key: {
          fontSize: '12',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
