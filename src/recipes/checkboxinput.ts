import { defineRecipe } from '@pandacss/dev';

const checkboxInputBase = {
  display: 'flex',
  alignItems: 'start',
  gap: '4',
  '&[class*="-label"]': {
    fontSize: '{sizes.16}',
    lineHeight: 'default',
  },
  _disabled: {
    opacity: '40%',
    cursor: 'not-allowed',
  },
  _groupDisabled: {
    opacity: 1, // let FormField handle disabled state opacity
  },
};

export const checkboxinputRecipe = defineRecipe({
  className: 'checkboxInput',
  jsx: ['CheckboxInput', 'Checkboxinput'],
  base: checkboxInputBase,
  variants: {},
});
