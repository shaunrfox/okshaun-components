import { defineRecipe } from '@pandacss/dev';

const iconBase = {
  w: '24',
  aspectRatio: 'square',
  fill: 'icon.decorative',
};

export const iconRecipe = defineRecipe({
  className: 'icon',
  jsx: ['Icon'],
  base: iconBase,
});
