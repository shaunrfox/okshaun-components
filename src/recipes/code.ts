import { defineRecipe } from '@pandacss/dev';

const codeBase = {
  bg: 'gray.80',
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
  borderColor: 'gray.60',
  bg: 'gray.80',
  color: 'gray.10',
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
