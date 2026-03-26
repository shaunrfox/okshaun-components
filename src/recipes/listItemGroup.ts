import { defineSlotRecipe } from '@pandacss/dev';

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
        groupLabel: {
          px: '10',
          pt: '8',
          pb: '2',
          fontSize: '12',
        },
        divider: {
          my: '4',
          mx: '10',
        },
      },
      comfortable: {
        groupLabel: {
          px: '12',
          pt: '12',
          pb: '4',
          fontSize: '14',
        },
        divider: {
          my: '6',
          mx: '12',
        },
      },
      spacious: {
        groupLabel: {
          px: '16',
          pt: '16',
          pb: '6',
          fontSize: '16',
        },
        divider: {
          my: '8',
          mx: '16',
        },
      },
    },
  },
  defaultVariants: {
    density: 'compact',
  },
});
