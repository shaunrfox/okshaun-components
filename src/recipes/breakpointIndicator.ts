import { defineRecipe } from '@pandacss/dev';

export const breakpointIndicatorRecipe = defineRecipe({
  className: 'breakpointIndicator',
  jsx: ['BreakpointIndicator'],
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
