import { defineSlotRecipe } from '@pandacss/dev';

const menuBase = {
  // Floating container
  menu: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '200',
    maxWidth: '320',
    maxHeight: '400',
    overflowY: 'auto',
    bg: 'surface.overlay',
    borderRadius: '8',
    boxShadow: 'medium',
    outline: 'none',
    zIndex: 'elevated',
  },

  // Individual menu item row
  menuItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8',
    px: '12',
    py: '8',
    cursor: 'pointer',
    outline: 'none',
    transitionProperty: 'background-color, color',
    transitionDuration: 'fast',
    bg: 'surface.overlay',

    _hover: {
      bg: 'surface.overlay.hovered',
    },
    _focusVisible: {
      bg: 'surface.overlay.hovered',
    },
    _active: {
      bg: 'surface.overlay.hovered',
    },
    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
    _selected: {
      bg: 'bg.selected',
    },
  },

  // Selection indicator area (checkmark or checkbox)
  menuItemIndicator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    w: '24',
    h: '24',
    color: 'icon.selected',
  },

  // Left icon area
  menuItemIconLeft: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    w: '24',
    h: '24',
    color: 'icon.decorative',
  },

  // Right icon area
  menuItemIconRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    w: '24',
    h: '24',
    ml: 'auto',
    color: 'icon.decorative',
  },

  // Content wrapper (label + description)
  menuItemContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0, // Enable text truncation
  },

  // Primary label
  menuItemLabel: {
    fontSize: '16',
    color: 'text',
    fontFamily: 'sans',
    fontWeight: 'normal',

    // Highlight match styling for autocomplete
    '& mark': {
      bg: 'bg.warning.hovered',
      color: 'text.bold',
      borderRadius: '2',
      // px: '2',
    },
  },

  // Secondary description
  menuItemDescription: {
    fontSize: '12',
    fontFamily: 'sans',
    color: 'text.subtlest',
  },

  // Divider between items/groups
  menuDivider: {
    h: '1',
    mx: '12',
    my: '4',
    bg: 'border',
  },

  // Group container
  menuGroup: {
    display: 'flex',
    flexDirection: 'column',
  },

  // Group label
  menuGroupLabel: {
    fontSize: '12',
    color: 'text.subtlest',
    fontFamily: 'sans',
    // fontWeight: 'medium',
    // textTransform: 'uppercase',
    // letterSpacing: 'wide',
    px: '12',
    pt: '16',
    pb: '4',
  },
};

const menuVariants = {
  // Size variants
  packing: {
    default: {
      menu: { minWidth: '200' },
      menuItem: { py: '8' },
    },
    compact: {
      menu: { minWidth: '160' },
      menuItem: { py: '4', px: '8' },
      menuItemIconLeft: { w: '20', h: '20' },
      menuItemIconRight: { w: '20', h: '20' },
      menuItemIndicator: { w: '20', h: '20' },
    },
    comfortable: {
      menu: { minWidth: '240' },
      menuItem: { py: '12', px: '16' },
    },
  },

  // Selection indicator position
  indicatorPosition: {
    left: {
      menuItem: {
        flexDirection: 'row',
      },
    },
    right: {
      menuItem: {
        flexDirection: 'row',
      },
      menuItemIndicator: {
        order: 999, // Move to end
        ml: 'auto',
      },
    },
  },
};

export const menuRecipe = defineSlotRecipe({
  className: 'menu',
  jsx: ['Menu', 'MenuItem', 'MenuTrigger', 'MenuDivider', 'MenuGroup'],
  slots: [
    'menu',
    'menuItem',
    'menuItemIndicator',
    'menuItemIconLeft',
    'menuItemIconRight',
    'menuItemContent',
    'menuItemLabel',
    'menuItemDescription',
    'menuDivider',
    'menuGroup',
    'menuGroupLabel',
  ],
  base: menuBase,
  variants: menuVariants,
  defaultVariants: {
    packing: 'default',
    indicatorPosition: 'left',
  },
});
