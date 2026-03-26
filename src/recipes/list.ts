import { defineRecipe } from '@pandacss/dev';

export const listRecipe = defineRecipe({
  className: 'list',
  jsx: ['List'],
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'start',
    gap: '0',
  },
  variants: {},
});
