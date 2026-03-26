import { defineRecipe } from '@pandacss/dev';

const toggleInputBase = {
  display: 'grid',
  gridTemplateColumns: '{sizes.32} auto',
  gap: '6',
  userSelect: 'none',
  '&.cetec-label': {
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

export const toggleinputRecipe = defineRecipe({
  className: 'toggleInput',
  jsx: ['ToggleInput', 'Toggleinput'],
  base: toggleInputBase,
  variants: {},
});
