import { defineRecipe } from '@pandacss/dev';

const checkboxInputBase = {
  display: 'flex',
  alignItems: 'start',
};

export const checkboxInputRecipe = defineRecipe({
  className: 'checkbox-input',
  jsx: ['CheckboxInput'],
  base: checkboxInputBase,
});
