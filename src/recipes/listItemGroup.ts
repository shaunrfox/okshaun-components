import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

import { listDensityWrapperVars } from './listDensity';

// Ported from the Cetec design system: reads the shared density custom
// properties rather than spreading a per-density style object.

export const listItemGroupRecipe = defineSlotRecipe({
  className: 'listItemGroup',
  jsx: ['ListItemGroup'],
  slots: ['wrapper', 'groupLabel', 'divider'],
  base: {
    wrapper: {
      width: 'full',
    },
    groupLabel: {
      ...globalBaseStyles,
      color: 'text.subtlest',
      px: 'var(--list-group-label-padding-x)',
      pt: 'var(--list-group-label-padding-top)',
      pb: 'var(--list-group-label-padding-bottom)',
      fontSize: 'var(--list-group-label-size)',
      borderStyle: 'solid',
      borderWidth: '1',
      borderColor: 'transparent',
    },
    divider: {
      my: 'var(--list-group-divider-margin-y)',
      mx: 'var(--list-group-divider-margin-x)',
    },
  },
  variants: {
    density: listDensityWrapperVars,
  },
  defaultVariants: {
    density: 'compact',
  },
});
