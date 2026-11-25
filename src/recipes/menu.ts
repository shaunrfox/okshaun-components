import { defineSlotRecipe } from '@pandacss/dev';

const menuBase = {
  wrapper: {
    width: 'fit',
    bg: 'surface',
    borderRadius: '4',
    boxShadow: 'overlay',
    overflow: 'hidden',
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
    bg: { base: 'tan.10', _dark: 'tan.60' },
    width: 'full',
    textAlign: 'left',
    cursor: 'pointer',
    color: 'text',
    _hover: {
      bg: { base: 'tan.20', _dark: 'tan.50' },
    },
    _active: {
      bg: { base: 'tan.20', _dark: 'tan.70' },
    },
  },
  // `clip` (not `hidden`) so the oversized size probe inside can't make this a
  // programmatically scrollable ancestor that `scrollIntoView()` would move.
  levelsViewport: {
    overflow: 'clip',
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
    // `max-content`, not `fit-content`: the probe sits inside the wrapper, so
    // `fit-content` capped it at the wrapper's current width. Going back from
    // a narrow level then measured the wider level at the narrow width, and
    // its labels wrapped. `100vw` keeps very long labels on screen.
    width: 'max-content',
    maxWidth: '100vw',
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
  // Floating content inherits its layer from FloatingLayerContext, so a menu
  // opened inside a modal stacks above the dialog instead of behind it.
  layer: {
    elevated: {
      wrapper: {
        zIndex: 'elevated',
      },
    },
    modalFloating: {
      wrapper: {
        zIndex: 'modalFloating',
      },
    },
  },
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
  // Caps the wrapper to `--available-height`, which Floating UI's `size()`
  // middleware writes at runtime, and scrolls the overflow. The floor keeps a
  // few rows visible when the trigger sits at the viewport edge.
  scrollable: {
    true: {
      wrapper: {
        maxHeight: 'max(var(--available-height), token(sizes.120))',
        overflowY: 'auto',
      },
      // Drill-in sets an explicit wrapper height, so each level can fill it
      // and scroll on its own. Otherwise every level stretches to the tallest
      // one and a short level scrolls into blank space. Single-level menus
      // have no explicit height, so the wrapper still does the scrolling.
      levelsViewport: {
        height: 'full',
      },
      levelsTrack: {
        height: 'full',
      },
      // Keeps keyboard focus scrolling from landing under the sticky header;
      // Menu measures the header into `--menu-back-header-height`.
      level: {
        overflowY: 'auto',
        scrollPaddingTop: 'var(--menu-back-header-height, 0px)',
      },
      backHeader: {
        position: 'sticky',
        top: '0',
        zIndex: '1',
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
    layer: 'elevated',
  },
});
