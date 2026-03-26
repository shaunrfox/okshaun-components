import { defineRecipe } from '@pandacss/dev';

const codeBase = {
  bg: 'bg.neutral.inverse',
  position: 'relative',
  overflow: 'auto',
  p: '4',
  whiteSpace: 'pre',
  fontSize: '14',
};

const preBase = {
  borderRadius: '8',
  overflow: 'hidden',
  borderWidth: '0',
  borderColor: 'border',
  bg: 'bg.neutral.inverse',
  color: 'text.inverse.subtlest',
  px: '16',
  py: '8',
  my: '8',
  whiteSpace: 'pre',
};

export const codeRecipe = defineRecipe({
  className: 'code',
  jsx: ['Code'],
  base: codeBase,
});

export const preRecipe = defineRecipe({
  className: 'pre',
  jsx: ['Pre'],
  base: preBase,
});
