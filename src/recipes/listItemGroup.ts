import { defineSlotRecipe } from '@pandacss/dev';

import { listDensity } from './list';

export const listItemGroupRecipe = defineSlotRecipe({
  className: 'listItemGroup',
  jsx: ['ListItemGroup'],
  slots: ['wrapper', 'groupLabel', 'divider'],
  base: {
    wrapper: {
      width: 'full',
    },
    groupLabel: {
      color: 'text.subtlest',
      borderStyle: 'solid',
      borderWidth: '1',
      borderColor: 'transparent',
    },
    divider: {},
  },
  variants: {
    density: {
      compact: {
        groupLabel: listDensity.compact.groupLabel,
        divider: listDensity.compact.divider,
      },
      comfortable: {
        groupLabel: listDensity.comfortable.groupLabel,
        divider: listDensity.comfortable.divider,
      },
      spacious: {
        groupLabel: listDensity.spacious.groupLabel,
        divider: listDensity.spacious.divider,
      },
    },
  },
  defaultVariants: {
    density: 'compact',
  },
});
