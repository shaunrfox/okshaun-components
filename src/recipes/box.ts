import { defineRecipe } from '@pandacss/dev';

const boxBase = {};

const boxVariants = {};

export const boxRecipe = defineRecipe({
  className: 'box',
  jsx: ['Box'],
  base: boxBase,
  variants: boxVariants,
  defaultVariants: {},
});
