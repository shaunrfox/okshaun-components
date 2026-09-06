import { defineRecipe } from '@pandacss/dev';

export const listDensity = {
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
    row: {
      py: '3',
      px: '10',
    },
    icon: {
      w: '24',
      h: '24',
    },
    beforeSlot: {
      mr: '3',
    },
    afterSlot: {
      ml: '3',
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
    row: {
      py: '7',
      px: '12',
    },
    icon: {
      w: '24',
      h: '24',
    },
    beforeSlot: {
      mr: '3',
    },
    afterSlot: {
      ml: '3',
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
    row: {
      py: '9',
      px: '16',
    },
    icon: {
      w: '28',
      h: '28',
    },
    beforeSlot: {
      mr: '4',
    },
    afterSlot: {
      ml: '4',
    },
  },
} as const;

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
  variants: {
    density: {
      compact: {},
      comfortable: {},
      spacious: {},
    },
  },
  defaultVariants: {
    density: 'compact',
  },
});
