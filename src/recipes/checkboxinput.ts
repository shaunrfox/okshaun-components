import { defineRecipe } from '@pandacss/dev';

const checkboxInputBase = {
  display: 'flex',
  alignItems: 'start',
  '&[class*="-label"]': {
    fontSize: '16',
  },
};

export const checkboxInputRecipe = defineRecipe({
  className: 'checkbox-input',
  jsx: ['CheckboxInput'],
  base: checkboxInputBase,
});
