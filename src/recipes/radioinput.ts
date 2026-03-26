import { defineRecipe } from '@pandacss/dev';

const radioInputBase = {
  display: 'flex',
  alignItems: 'flex-start',
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

export const radioinputRecipe = defineRecipe({
  className: 'radioInput',
  jsx: ['RadioInput', 'Radioinput'],
  base: radioInputBase,
  variants: {},
});
