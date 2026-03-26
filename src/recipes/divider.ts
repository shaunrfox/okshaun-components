import { defineRecipe } from '@pandacss/dev';

export const dividerRecipe = defineRecipe({
  className: 'divider',
  jsx: ['Divider'],
  base: {
    borderStyle: 'solid',
    color: 'border',
    borderColor: 'current',
    borderWidth: '0',
    minWidth: '1',
    minHeight: '1',
  },
  variants: {
    direction: {
      horizontal: {
        width: 'stretch',
        borderTopWidth: '{sizes.1}',
      },
      vertical: {
        height: 'stretch',
        borderLeftWidth: '{sizes.1}',
      },
    },
    weight: {
      thin: {
        borderTopWidth: '{sizes.1}',
        borderLeftWidth: '{sizes.1}',
      },
      medium: {
        borderTopWidth: '{sizes.2}',
        borderLeftWidth: '{sizes.2}',
      },
      thick: {
        borderTopWidth: '{sizes.4}',
        borderLeftWidth: '{sizes.4}',
      },
      thicker: {
        borderTopWidth: '{sizes.6}',
        borderLeftWidth: '{sizes.6}',
      },
    },
  },
  defaultVariants: {
    direction: 'horizontal',
    weight: 'thin',
  },
});
