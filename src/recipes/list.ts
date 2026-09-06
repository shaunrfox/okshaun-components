import { defineRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

import { listDensityVars } from './listDensity';

// Ported from the Cetec design system. The same density custom properties are
// published at three levels - list, listItemGroup and listItem - each on its
// own wrapper, so a group label resolves them whether or not it sits inside a
// list item. This replaces okshaun's separate listDensity object, whose values
// were identical.

export const listRecipe = defineRecipe({
  className: 'list',
  jsx: ['List'],
  base: {
    ...globalBaseStyles,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'start',
    gap: '0',
  },
  variants: {
    density: listDensityVars,
  },
  defaultVariants: {
    density: 'compact',
  },
});
