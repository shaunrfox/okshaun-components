import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

// Ported from the Cetec design system: slots, sizing scale, the
// custom-property mechanism and interaction behaviour. okshaun's semantic
// tokens carry the colours.

const buttonStyles = {
  appearance: 'none',
  cursor: 'pointer',
  transitionDuration: 'fast',
  transitionProperty: 'background, color',
  transitionTimingFunction: 'default',
  _icon: {
    fill: 'icon.decorative',
  },
  _hover: {
    bg: 'bg.neutral.hovered',
    _icon: {
      fill: 'icon',
    },
  },
  _active: {
    bg: 'bg.neutral.pressed',
    _icon: {
      fill: 'icon',
    },
  },
  _focusVisible: {
    outlineColor: 'border.focused',
  },
  _disabled: {
    cursor: 'not-allowed',
  },
  '&:has([data-disabled=true])': {
    cursor: 'not-allowed',
  },
  '&:has([data-deleted=true])': {
    textDecoration: 'line-through',
    opacity: '[0.6]',
  },
  '&:has([data-selected=true])': {
    bg: 'bg.neutral.boldest',
    _icon: {
      fill: 'icon.decorative.inverse',
    },
  },
  '&:has([data-selected=true]):is(:hover, [data-hover])': {
    bg: 'bg.neutral.bold.hovered',
    _icon: {
      fill: 'icon.decorative.inverse.hovered',
    },
  },
  '&:has([data-selected=true]):is(:active, [data-active])': {
    bg: 'bg.neutral.bold.pressed',
    _icon: {
      fill: 'icon.decorative.inverse.hovered',
    },
  },
};

export const chipRecipe = defineSlotRecipe({
  className: 'chip',
  jsx: ['Chip'],
  slots: ['container', 'body', 'mainContent', 'dismissButton', 'slot'],
  base: {
    container: {
      ...globalBaseStyles,
      '--chip-h': 'token(sizes.24)',
      '--main-px': 'token(sizes.8)',
      '--main-fs': 'token(sizes.14)',
      '--main-slot-side-padding': 'token(sizes.4)',
      '--slot-size': 'token(sizes.20)',
      '--slot-px': 'token(sizes.2)',
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      width: 'fit',
      height: 'var(--chip-h)',
      borderRadius: '999',
      fontFamily: 'sans',
      lineHeight: 'default',
      fontWeight: 'medium',
      whiteSpace: 'nowrap',
      verticalAlign: 'middle',
      transitionDuration: 'fast',
      transitionProperty: 'all',
      transitionTimingFunction: 'default',
      userSelect: 'none',
      bg: 'bg.neutral',
      _loading: {
        animation: 'pulse',
      },
      '&:has([data-selected=true])': {
        bg: 'bg.neutral.boldest',
        color: 'text.inverse',
      },
      '&:has([data-disabled=true])': {
        cursor: 'not-allowed',
        bg: 'bg.disabled',
        color: 'text.disabled',
        opacity: '[0.3]',
      },
    },
    body: {
      ...globalBaseStyles,
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      minW: '0',
      height: 'var(--chip-h)',
      flexShrink: '0',
      bg: 'transparent',
      border: 'none',
      borderRadius: '999',
      outlineWidth: '2',
      outlineStyle: 'solid',
      outlineColor: 'transparent',
      outlineOffset: 'calc(token(sizes.2) * -1)',
      'button&': {
        ...buttonStyles,
      },
    },
    mainContent: {
      display: 'inline-flex',
      alignItems: 'center',
      minW: '0',
      px: 'var(--main-px)',
      fontSize: 'var(--main-fs)',
      color: 'text',
      '[data-selected=true] > &': {
        color: 'text.inverse',
      },
    },
    dismissButton: {
      ...globalBaseStyles,
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minW: '0',
      flexShrink: '0',
      bg: 'transparent',
      border: 'none',
      borderRadius: '999',
      outlineWidth: '2',
      outlineStyle: 'solid',
      outlineColor: 'transparent',
      outlineOffset: 'calc(token(sizes.2) * -1)',
      aspectRatio: 'square',
      ...buttonStyles,
      // Deviation from Cetec: no hover background here. okshaun's bg.neutral
      // tokens are semi-transparent, so painting hovered over the pill
      // composites to roughly 26% rather than the 14% the token specifies.
      _hover: {
        bg: 'transparent',
        _icon: { fill: 'icon' },
      },
      _active: {
        bg: 'transparent',
        _icon: { fill: 'icon' },
      },
      w: 'calc(var(--slot-size) + (var(--slot-px) * 2))',
      h: 'calc(var(--slot-size) + (var(--slot-px) * 2))',
      _icon: {
        fill: 'icon.decorative',
        width: 'var(--slot-size)',
        height: 'var(--slot-size)',
      },
    },
    slot: {
      display: 'inline-flex',
      alignItems: 'center',
      px: 'var(--slot-px)',
    },
  },
  variants: {
    size: {
      sm: {
        container: {
          '--chip-h': 'token(sizes.18)',
          '--main-px': 'token(sizes.6)',
          '--main-fs': 'token(sizes.12)',
          '--main-slot-side-padding': 'token(sizes.4)',
          '--slot-size': 'token(sizes.16)',
          '--slot-px': 'token(sizes.1)',
        },
      },
      md: {
        container: {
          '--chip-h': 'token(sizes.24)',
          '--main-px': 'token(sizes.8)',
          '--main-fs': 'token(sizes.14)',
          '--main-slot-side-padding': 'token(sizes.4)',
          '--slot-size': 'token(sizes.20)',
          '--slot-px': 'token(sizes.2)',
        },
      },
      lg: {
        container: {
          '--chip-h': 'token(sizes.28)',
          '--main-px': 'token(sizes.10)',
          '--main-fs': 'token(sizes.16)',
          '--main-slot-side-padding': 'token(sizes.4)',
          '--slot-size': 'token(sizes.24)',
          '--slot-px': 'token(sizes.2)',
        },
      },
      xl: {
        container: {
          '--chip-h': 'token(sizes.32)',
          '--main-px': 'token(sizes.12)',
          '--main-fs': 'token(sizes.20)',
          '--main-slot-side-padding': 'token(sizes.4)',
          '--slot-size': 'token(sizes.28)',
          '--slot-px': 'token(sizes.2)',
        },
      },
    },
    before: {
      true: {
        mainContent: {
          ps: 'var(--main-slot-side-padding)',
        },
      },
    },
    after: {
      true: {
        mainContent: {
          pe: 'var(--main-slot-side-padding)',
        },
      },
    },
    dismissable: {
      true: {},
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
