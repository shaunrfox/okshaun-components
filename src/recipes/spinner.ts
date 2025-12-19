import { defineRecipe } from '@pandacss/dev';

const spinnerBase = {
  aspectRatio: 'square',
  rounded: '100',
  borderWidth: '3',
  borderStyle: 'solid',
  borderColor: 'transparent',
  borderTopColor: 'icon',
  borderBottomColor: 'icon',
  animation: 'spin',
  // filter: 'invert(1)',
  // mixBlendMode: 'difference',
  isolation: 'isolate',
};

const spinnerVariants = {
  size: {
    standard: {
      height: '20',
      minHeight: '20',
    },
    small: {
      height: '16',
      minHeight: '16',
    },
    large: {
      height: '32',
      minHeight: '32',
    },
  },
  inverse: {
    true: {
      borderTopColor: 'icon.inverse',
      borderBottomColor: 'icon.inverse',
    },
  },
};

export const spinnerRecipe = defineRecipe({
  className: 'spinner',
  jsx: ['Spinner'],
  base: spinnerBase,
  variants: spinnerVariants,
  defaultVariants: {
    size: 'standard',
  },
});
