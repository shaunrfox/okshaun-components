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
    zIndex: 1000,
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
      bg: 'surface.overlay.pressed',
    },
    '&[aria-disabled="true"]': {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
    '&[data-selected="true"]': {
      bg: 'bg.selected',
    },
    '&[data-active="true"]': {
      bg: 'surface.overlay.hovered',
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
    color: { base: 'icon.selected', _dark: 'icon.selected' },
  },

  // Left icon area
  menuItemIconLeft: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    w: '24',
    h: '24',
    color: { base: 'icon.decorative', _dark: 'icon.decorative' },
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
    color: { base: 'icon.subtlest', _dark: 'icon.subtlest' },
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
    textStyle: 'body-md',
    color: { base: 'text', _dark: 'text' },
    fontWeight: 'normal',

    // Highlight match styling for autocomplete
    '& mark': {
      bg: { base: 'bg.warning', _dark: 'bg.warning' },
      color: { base: 'text', _dark: 'text' },
      borderRadius: '2',
      px: '2',
    },
  },

  // Secondary description
  menuItemDescription: {
    textStyle: 'body-sm',
    color: { base: 'text.subtlest', _dark: 'text.subtlest' },
    mt: '2',
  },

  // Divider between items/groups
  menuDivider: {
    h: '1',
    mx: '12',
    my: '4',
    bg: { base: 'border', _dark: 'border' },
  },

  // Group container
  menuGroup: {
    display: 'flex',
    flexDirection: 'column',
  },

  // Group label
  menuGroupLabel: {
    textStyle: 'body-xs',
    color: { base: 'text.subtlest', _dark: 'text.subtlest' },
    fontWeight: 'medium',
    textTransform: 'uppercase',
    letterSpacing: 'wide',
    px: '12',
    py: '8',
  },
};

const menuVariants = {
  // Size variants
  size: {
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
    size: 'default',
    indicatorPosition: 'left',
  },
});
