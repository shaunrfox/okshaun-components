import { defineSlotRecipe } from '@pandacss/dev';

const menuBase = {
  wrapper: {
    width: 'fit',
    bg: 'surface',
    borderRadius: '4',
    boxShadow: 'overlay',
    overflow: 'hidden',
    zIndex: '100',
    transitionProperty: 'width, height',
    transitionDuration: 'normal',
    transitionTimingFunction: 'default',
    outline: 'none',
  },
  backHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: '0',
    ps: '4',
    borderWidth: '0',
    borderBlockWidth: '3',
    borderColor: 'transparent',
    bg: { base: 'tan.5', _dark: 'tan.60' },
    width: 'full',
    textAlign: 'left',
    cursor: 'pointer',
    color: 'text',
    _hover: {
      bg: { base: 'tan.10', _dark: 'tan.50' },
    },
    _active: {
      bg: { base: 'tan.20', _dark: 'tan.70' },
    },
  },
  levelsViewport: {
    overflow: 'hidden',
    width: 'full',
    position: 'relative',
  },
  levelsTrack: {
    display: 'flex',
    width: 'full',
    transitionProperty: 'transform',
    transitionDuration: 'normal',
    transitionTimingFunction: 'default',
    willChange: 'transform',
  },
  level: {
    minWidth: '0',
    flexShrink: '0',
  },
  sizeProbe: {
    position: 'absolute',
    pointerEvents: 'none',
    visibility: 'hidden',
    top: '0',
    left: '0',
    width: 'fit-content',
    height: 'fit-content',
    overflow: 'visible',
  },
  noResults: {
    px: '12',
    py: '10',
    color: 'text.subtlest',
  },
};

const menuVariants = {
  density: {
    compact: {
      backHeader: {
        py: '1',
        pe: '18',
        ps: '5',
        textStyle: 'body.md',
        color: 'text',
      },
    },
    comfortable: {
      backHeader: {
        py: '5',
        pe: '20',
        ps: '7',
        textStyle: 'body.md',
        color: 'text',
      },
    },
    spacious: {
      backHeader: {
        py: '7',
        pe: '24',
        ps: '9',
        textStyle: 'body.lg',
        color: 'text',
      },
    },
  },
  panel: {
    true: {
      wrapper: {
        width: 'full',
        height: 'full',
        minHeight: 'full',
        overflowY: 'auto',
        rounded: '0',
        boxShadow: 'none',
      },
    },
  },
};

export const menuRecipe = defineSlotRecipe({
  className: 'menu',
  jsx: ['Menu', 'MenuItem', 'MenuGroup', 'SubMenu'],
  slots: [
    'wrapper',
    'backHeader',
    'levelsViewport',
    'levelsTrack',
    'level',
    'sizeProbe',
    'noResults',
  ],
  base: menuBase,
  variants: menuVariants,
  defaultVariants: {
    density: 'compact',
  },
});
