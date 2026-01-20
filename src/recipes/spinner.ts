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
  isolation: 'isolate',
};

const spinnerVariants = {
  size: {
    xs: {
      height: '16',
      minHeight: '16',
      borderWidth: '2',
    },
    sm: {
      height: '20',
      minHeight: '20',
      borderWidth: '2',
    },
    md: {
      height: '24',
      minHeight: '24',
    },
    lg: {
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
    size: 'md',
  },
});
