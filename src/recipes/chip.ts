import { defineSlotRecipe } from '@pandacss/dev';

const chipBase = {
  // The container paints the pill. It has to, because the dismiss button is a
  // sibling of the body rather than a child: a button cannot be nested in the
  // body's button. Whichever element owns the base background must also own the
  // hover and active states, since bg.neutral and its hover and pressed values
  // are all semi-transparent and would composite if painted on top of one
  // another.
  container: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: 'fit-content',
    verticalAlign: 'middle',
    borderRadius: '999',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    transitionDuration: 'fast',
    transitionProperty: 'background, color, border-color, box-shadow',
    transitionTimingFunction: 'default',
    bg: 'bg.neutral',
    color: 'text',
    _hover: {
      bg: 'bg.neutral.hovered',
    },
    _active: {
      bg: 'bg.neutral.pressed',
    },
    _loading: {
      cursor: 'wait',
      animation: 'pulse',
    },
    _deleted: {
      opacity: '[0.6]',
      cursor: 'not-allowed',
    },
    _selected: {
      bg: 'bg.neutral.boldest',
      color: 'text.inverse',
      _hover: {
        bg: 'bg.neutral.bold.hovered',
      },
      _active: {
        bg: 'bg.neutral.bold.pressed',
      },
    },
    _disabled: {
      cursor: 'not-allowed',
      bg: 'bg.disabled',
      color: 'text.disabled',
      borderColor: 'border.disabled',
      _hover: {
        bg: 'bg.disabled',
        color: 'text.disabled',
      },
    },
  },
  // Transparent: the container paints the chip. The body keeps the typography,
  // the focus ring and the label padding, and stays the interactive element.
  body: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    appearance: 'none',
    border: 'none',
    borderRadius: '999',
    fontFamily: 'sans',
    lineHeight: 'default',
    fontWeight: 'medium',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transitionDuration: 'fast',
    transitionProperty: 'background, color, border-color, box-shadow',
    transitionTimingFunction: 'default',
    userSelect: 'none',
    outlineWidth: '2',
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    bg: 'transparent',
    color: 'text',
    _focusVisible: {
      outlineColor: 'border.focused',
    },
    _loading: {
      cursor: 'wait',
    },
    _deleted: {
      textDecoration: 'line-through',
      cursor: 'not-allowed',
    },
    _disabled: {
      cursor: 'not-allowed',
      color: 'text.disabled',
    },
    _selected: {
      color: 'text.inverse',
    },
  },
  mainContent: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'inherit',
    minW: 0,
  },
  slot: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  dismissButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    // `full` is not a radii token here — only 100 and 999 exist — so this
    // silently resolved to 0 and squared off the focus ring.
    borderRadius: '999',
    bg: 'transparent',
    color: 'inherit',
    cursor: 'pointer',
    transitionDuration: 'fast',
    transitionProperty: 'background, color',
    transitionTimingFunction: 'default',
    outlineWidth: '2',
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    // No background on hover. The container already darkens the whole pill, and
    // bg.neutral.hovered over bg.neutral would composite to roughly 26% rather
    // than the 14% the token specifies. The icon carries the affordance instead.
    _hover: {
      _icon: {
        fill: 'icon',
      },
    },
    _active: {
      _icon: {
        fill: 'icon',
      },
    },
    _focusVisible: {
      outlineColor: 'border.focused',
    },
    _disabled: {
      cursor: 'not-allowed',
      color: 'text.disabled',
    },
    '&[data-selected=true]': {
      color: 'text.inverse',
      _icon: {
        fill: 'icon.decorative.inverse',
      },
    },
  },
  chipIcon: {
    fill: 'icon.decorative',
    aspectRatio: 'square',
    transitionDuration: 'fast',
    transitionProperty: 'fill',
    transitionTimingFunction: 'default',
    _groupHover: { fill: 'icon.decorative.hovered' },
    _groupActive: { fill: 'icon.decorative.hovered' },
    _groupDisabled: { fill: 'icon.decorative' },
    // Selection is read from the icon's own data attribute, never from an
    // ancestor. A descendant selector such as `[data-selected=true] &` matches
    // at any depth, so a chip nested in another chip's slot inherited the outer
    // chip's selected fill.
    '&[data-selected=true]': {
      fill: 'icon.decorative.inverse',
    },
    '.group:is(:hover, [data-hover]) &[data-selected=true]': {
      fill: 'icon.decorative.inverse.hovered',
    },
  },
};

export const chipRecipe = defineSlotRecipe({
  className: 'chip',
  jsx: ['Chip'],
  slots: [
    'container',
    'body',
    'mainContent',
    'dismissButton',
    'slot',
    'chipIcon',
  ],
  base: chipBase,
  variants: {
    size: {
      sm: {
        body: {
          gap: '2',
          h: '20',
          px: '6',
          py: '0',
          fontSize: '14',
        },
        mainContent: {
          gap: '2',
        },
        slot: {
          gap: '2',
        },
        chipIcon: {
          w: '20',
          h: '20',
        },
        dismissButton: {
          w: '20',
          h: '20',
        },
      },
      md: {
        body: {
          gap: '4',
          h: '24',
          px: '8',
          py: '1',
          fontSize: '14',
        },
        mainContent: {
          gap: '4',
        },
        slot: {
          gap: '4',
        },
        chipIcon: {
          w: '20',
          h: '20',
        },
        dismissButton: {
          w: '24',
          h: '24',
        },
      },
      lg: {
        body: {
          gap: '4',
          h: '32',
          px: '10',
          py: '4',
          fontSize: '16',
        },
        mainContent: {
          gap: '4',
        },
        slot: {
          gap: '4',
        },
        chipIcon: {
          w: '24',
          h: '24',
        },
        dismissButton: {
          w: '32',
          h: '32',
        },
      },
      xl: {
        body: {
          gap: '4',
          h: '40',
          px: '12',
          py: '5',
          fontSize: '16',
        },
        mainContent: {
          gap: '4',
        },
        slot: {
          gap: '4',
        },
        chipIcon: {
          w: '24',
          h: '24',
        },
        dismissButton: {
          w: '40',
          h: '40',
        },
      },
    },
    before: {
      true: { body: {} },
    },
    after: {
      true: { body: {} },
    },
    dismissable: {
      true: { body: {} },
    },
  },
  compoundVariants: [
    {
      size: 'sm',
      before: true,
      css: {
        body: { ps: '2' },
      },
    },
    {
      size: 'sm',
      after: true,
      css: {
        body: { pe: '2' },
      },
    },
    {
      size: 'md',
      before: true,
      css: {
        body: { ps: '2' },
      },
    },
    {
      size: 'md',
      after: true,
      css: {
        body: { pe: '2' },
      },
    },
    {
      size: 'lg',
      before: true,
      css: {
        body: { ps: '4' },
      },
    },
    {
      size: 'lg',
      after: true,
      css: {
        body: { pe: '4' },
      },
    },
    {
      size: 'xl',
      before: true,
      css: {
        body: { ps: '4' },
      },
    },
    {
      size: 'xl',
      after: true,
      css: {
        body: { pe: '4' },
      },
    },
  ],
  defaultVariants: {
    size: 'md',
  },
});
