import { defineRecipe } from '@pandacss/dev';

export const highlightTextRecipe = defineRecipe({
  className: 'highlightText',
  jsx: ['HighlightText'],
  base: {
    bg: { base: 'orange.40/40', _dark: 'orange.60/40' },
    color: 'text',
    borderRadius: '2',
    lineHeight: 'inherit',
    mixBlendMode: { base: 'multiply', _dark: 'lighten' },
  },
  variants: {},
});
