import { defineSlotRecipe } from '@pandacss/dev';

const kbdBase = {
  container: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1',
    verticalAlign: 'middle',
  },
  key: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minH: '6',
    minW: '6',
    px: '2',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'border.subtle',
    borderRadius: '6',
    bg: 'bg.neutral',
    color: 'text',
    fontFamily: 'mono',
    fontSize: '12',
    lineHeight: 'none',
    fontWeight: 'medium',
    letterSpacing: 'wide',
    whiteSpace: 'nowrap',
    boxShadow: 'sm',
  },
};

export const kbdRecipe = defineSlotRecipe({
  className: 'kbd',
  jsx: ['Kbd'],
  slots: ['container', 'key'],
  base: kbdBase,
  variants: {
    symbol: {
      true: {
        key: {
          minW: '7',
          px: '2.5',
          fontSize: '14',
          letterSpacing: 'normal',
        },
      },
    },
  },
  defaultVariants: {
    symbol: false,
  },
});
