import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

import { listDensityWrapperVars } from './listDensity';

// Ported from the Cetec design system: structure, slot order, density
// abstraction and interaction behaviour. okshaun's own semantic tokens carry
// the styling, and they share these names.

export const listItemRecipe = defineSlotRecipe({
  className: 'listItem',
  jsx: ['ListItem'],
  slots: [
    'wrapper',
    'icon',
    'beforeSlot',
    'afterSlot',
    'itemMain',
    'itemLabel',
    'itemDescription',
    'divider',
  ],
  base: {
    wrapper: {
      ...globalBaseStyles,
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'start',
      gap: '4',
      width: 'full',
      py: 'var(--list-item-padding-y)',
      px: 'var(--list-item-padding-x)',
      textAlign: 'left',
      borderWidth: '1',
      borderStyle: 'solid',
      borderColor: 'transparent',
      color: 'text',
      cursor: 'pointer',
      outline: '2px solid transparent',
      outlineOffset: '-2',
      bg: 'transparent',
      scrollSnapAlign: 'start',
      transitionDuration: 'fast',
      transitionProperty: 'background, color',
      transitionTimingFunction: 'default',
      _hover: {
        bg: 'bg.neutral.hovered',
      },
      '&:is(:active)': {
        bg: 'bg.neutral.hovered',
      },
      _focus: {
        bg: 'bg.neutral.hovered',
      },
      _disabled: {
        opacity: '0.4',
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
    icon: {
      aspectRatio: 'square',
      transitionDuration: 'fast',
      transitionProperty: 'fill',
      transitionTimingFunction: 'default',
      flexShrink: '0',
      w: 'var(--list-item-icon-size)',
      h: 'var(--list-item-icon-size)',
    },
    itemMain: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0',
      minWidth: '0',
    },
    itemLabel: {
      color: 'text',
      fontSize: 'var(--list-item-label-size)',
    },
    itemDescription: {
      color: 'text.subtlest',
      fontSize: 'var(--list-item-description-size)',
      lineHeight: 'tight',
    },
    beforeSlot: {
      ms: 'calc(var(--list-item-slot-margin) * -1)',
    },
    afterSlot: {
      me: 'calc(var(--list-item-slot-margin) * -1)',
    },
    divider: {
      width: 'full',
      py: 'var(--list-item-padding-y)',
      px: 'var(--list-item-padding-x)',
    },
  },
  variants: {
    variant: {
      default: {},
      checkbox: {
        wrapper: {
          _hover: {
            bg: 'bg.neutral.hovered',
          },
          _focus: {
            bg: 'bg.neutral.hovered',
          },
          '&:is(:active), &:is([data-active="true"]):hover': {
            bg: 'bg.neutral.hovered',
          },
          _selected: {
            bg: 'surface',
            _hover: {
              bg: 'surface',
            },
            _focus: {
              bg: 'bg.neutral.hovered',
            },
          },
        },
      },
      toggle: {
        wrapper: {
          _hover: {
            bg: 'bg.neutral.hovered',
          },
          _focus: {
            bg: 'bg.neutral.hovered',
          },
          '&:is(:active), &:is([data-active="true"]):hover': {
            bg: 'bg.neutral.hovered',
          },
          _selected: {
            bg: 'surface',
            _hover: {
              bg: 'surface',
            },
            _focus: {
              bg: 'bg.neutral.hovered',
            },
          },
        },
      },
      divider: {},
    },
    density: listDensityWrapperVars,
    selected: {
      true: {
        wrapper: {
          bg: 'surface.selected',
          _hover: {
            bg: 'surface.selected.hovered',
          },
          '&:is(:active)': {
            bg: 'surface.selected.pressed',
          },
          _focusVisible: {
            bg: 'surface.selected.hovered',
          },
        },
      },
      false: {},
    },
    iconBefore: {
      true: {},
      false: {},
    },
    iconAfter: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    variant: 'default',
    density: 'compact',
  },
});
