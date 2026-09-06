import { defineSlotRecipe } from '@pandacss/dev';

const spinnerBase = {
  container: {
    position: 'relative',
    display: 'grid',
    placeContent: 'center',
    zIndex: '100',
    w: 'fit',
    h: 'fit',
    flex: '0',
  },
  spinnerSvg: {
    aspectRatio: 'square',
    animation: 'spin',
    fill: 'icon',
    isolation: 'isolate',
    flex: '0',
  },
};

const spinnerVariants = {
  size: {
    xs: {
      spinnerSvg: {
        h: '16',
        w: '16',
        minHeight: '16',
      },
    },
    sm: {
      spinnerSvg: {
        h: '20',
        w: '20',
        minHeight: '20',
      },
    },
    md: {
      spinnerSvg: {
        h: '24',
        w: '24',
        minHeight: '24',
      },
    },
    lg: {
      spinnerSvg: {
        h: '32',
        w: '32',
        minHeight: '32',
      },
    },
  },
  inverse: {
    true: {
      spinnerSvg: {
        fill: 'icon.inverse',
      },
    },
  },
  centered: {
    true: {
      container: {
        position: 'absolute',
        inset: '0',
        width: 'full',
        height: 'full',
      },
    },
  },
};

export const spinnerRecipe = defineSlotRecipe({
  className: 'spinner',
  jsx: ['Spinner'],
  slots: ['container', 'spinnerSvg'],
  base: spinnerBase,
  variants: spinnerVariants,
  defaultVariants: {
    size: 'md',
  },
});
