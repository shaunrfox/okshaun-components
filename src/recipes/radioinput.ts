import { defineRecipe } from '@pandacss/dev';

const radioInputBase = {
  display: 'flex',
};

export const radioInputRecipe = defineRecipe({
  className: 'radio-input',
  jsx: ['RadioInput'],
  base: radioInputBase,
  variants: {},
});
