import { defineSlotRecipe } from '@pandacss/dev';

const menuBase = {
  wrapper: {
    position: { base: 'fixed', md: 'relative' },
    left: '0',
    bottom: '0',
    width: { base: 'full', md: '260' },
    bg: { base: 'gray.0', _dark: 'gray.80' },
    py: { base: '12', md: '4' },
    boxShadow: 'medium',
    borderRadius: {
      base: '8',
      md: '4',
    },
    borderBottomLeftRadius: { base: '0', md: '4' },
    borderBottomRightRadius: { base: '0', md: '4' },
    '& ~ svg': {
      fill: { base: 'gray.90', _dark: 'gray.0' },
      mr: 'auto',
    },
    overflow: 'hidden',
    zIndex: 1,
  },

  wrapperInner: {
    display: 'flex',
    flexDirection: 'column',
    '&[data-anim=slide-left]': { animation: 'slideLeft' },
    '&[data-anim=slide-right]': { animation: 'slideRight' },
  },

  menuItem: {
    display: 'flex',
    gap: '4',
    px: { base: '20', md: '12' },
    outline: '2px solid transparent',
    outlineOffset: '0',

    '& a': {
      display: 'flex',
      justifyContent: 'space-between',
      w: 'full',
    },

    _hover: {
      bg: { base: 'gray.2', _dark: 'gray.50' },
      cursor: 'pointer',
    },
    _active: {
      bg: { base: 'gray.10', _dark: 'gray.100' },
    },
    _focusVisible: {
      outlineColor: { base: 'gray.90', _dark: 'gray.0' },
      outlineOffset: '-2',
    },
    _disabled: {
      opacity: 0.4,
      _hover: {
        bg: 'transparent',
        pointerEvents: 'none',
        cursor: 'not-allowed',
      },
      _active: { bg: 'transparent' },
      _focusVisible: { outlineColor: 'transparent' },
    },

    "&[data-selected='true']": {
      bg: { base: 'gray.10', _dark: 'gray.100' },
    },
  },

  sectionTitle: {
    px: { base: '20', md: '12' },
    pt: { base: '20', md: '12' },
    pb: { base: '12', md: '4' },
  },

  menuLabel: { fontWeight: 'normal' },

  parentLabel: {
    display: 'flex',
    py: '4',
    pr: '12',
    pl: '4',
    bg: { base: 'gray.5', _dark: 'gray.60' },
    cursor: 'pointer',
  },

  multiLevelIcon: { ml: 'auto' },

  dividerSection: {
    py: { base: '8', md: '12' },
    px: { base: '20', md: '12' },
  },

  spacerSection: { h: { base: '24', md: '16' } },

  iconSection: { w: '24' },

  toggleMenu: { py: '6' },
};

const menuVariants = {
  iconPlacement: {
    left: {
      menuItem: { flexDirection: 'row' },
    },
    right: {
      menuItem: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
      },
    },
  },
  multiSelectType: {
    toggle: {
      menuItem: { py: { base: '16', md: '6' }, gap: '12' },
    },
    checkbox: {
      menuItem: { py: { base: '12', md: '4' } },
    },
  },
};

export const menuRecipe = defineSlotRecipe({
  className: 'menu',
  jsx: ['Menu'],
  slots: [
    'wrapper',
    'sectionTitle',
    'menuItem',
    'menuLabel',
    'menuDescription',
    'parentLabel',
    'multiLevelIcon',
    'dividerSection',
    'spacerSection',
    'wrapperInner',
    'iconSection',
    'toggleMenu',
  ],
  base: menuBase,
  variants: menuVariants,
  defaultVariants: {
    iconPlacement: 'left',
    multiSelectType: 'checkbox',
  },
});
