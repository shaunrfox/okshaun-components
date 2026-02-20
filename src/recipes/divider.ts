import { defineRecipe } from '@pandacss/dev';

const dividerBase = {
  '--divider-weight': 'sizes.1',
  borderStyle: 'solid',
  color: 'border.default',
  borderColor: 'current',
  minWidth: '1',
  minHeight: '1',
};

const dividerVariants = {
  direction: {
    horizontal: {
      width: 'stretch',
      borderTopStyle: 'solid',
      borderTopWidth: 'var(--divider-weight)',
    },
    vertical: {
      height: 'stretch',
      borderLeftStyle: 'solid',
      borderLeftWidth: 'var(--divider-weight)',
    },
  },
  weight: {
    thin: { '--divider-weight': 'sizes.1' },
    medium: { '--divider-weight': 'sizes.2' },
    thick: { '--divider-weight': 'sizes.4' },
    thicker: { '--divider-weight': 'sizes.6' },
  },
};

export const dividerRecipe = defineRecipe({
  className: 'divider',
  jsx: ['Divider'],
  base: dividerBase,
  variants: dividerVariants,
  defaultVariants: {
    direction: 'horizontal',
    weight: 'thin',
  },
});
