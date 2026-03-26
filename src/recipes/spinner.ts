import { defineSlotRecipe } from '@pandacss/dev';

const spinnerBase = {
  spinnerDiv: {
    aspectRatio: 'square',
    rounded: '100',
    borderWidth: '3',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderTopColor: 'icon',
    borderBottomColor: 'icon',
    animation: 'spin',
    isolation: 'isolate',
  },
};

const spinnerVariants = {
  size: {
    xs: {
      spinnerDiv: {
        height: '16',
        minHeight: '16',
        borderWidth: '2',
      },
    },
    sm: {
      spinnerDiv: {
        height: '20',
        minHeight: '20',
        borderWidth: '2',
      },
    },
    md: {
      spinnerDiv: {
        height: '24',
        minHeight: '24',
      },
    },
    lg: {
      spinnerDiv: {
        height: '32',
        minHeight: '32',
      },
    },
  },
  inverse: {
    true: {
      spinnerDiv: {
        borderTopColor: 'icon.inverse',
        borderBottomColor: 'icon.inverse',
      },
    },
  },
  centered: {
    true: {
      container: {
        position: 'absolute',
        inset: '0',
        display: 'grid',
        placeContent: 'center',
        width: 'full',
        height: 'full',
        zIndex: '100',
      },
    },
  },
};

export const spinnerRecipe = defineSlotRecipe({
  className: 'spinner',
  jsx: ['Spinner'],
  slots: ['container', 'spinnerDiv'],
  base: spinnerBase,
  variants: spinnerVariants,
  defaultVariants: {
    size: 'md',
  },
});
