import { defineSlotRecipe } from '@pandacss/dev';

const chipBase = {
  container: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    appearance: 'none',
    width: 'fit',
    borderRadius: '999',
    fontFamily: 'sans',
    lineHeight: 'default',
    fontWeight: 'medium',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    cursor: 'pointer',
    transitionDuration: 'fast',
    transitionProperty: 'background, color',
    transitionTimingFunction: 'default',
    userSelect: 'none',
    border: 'none',
    outlineWidth: '2',
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    bg: 'bg.neutral',
    color: 'text',
    _hover: {
      bg: 'bg.neutral.hovered',
    },
    _active: {
      bg: 'bg.neutral.pressed',
    },
    _focusVisible: {
      outlineColor: 'border.focused',
    },
    _loading: {
      cursor: 'wait',
      animation: 'pulse',
    },
    _deleted: {
      textDecoration: 'line-through',
      cursor: 'not-allowed',
      opacity: '[0.6]',
    },
    _disabled: {
      cursor: 'not-allowed',
      bg: 'bg.disabled',
      color: 'text.disabled',
      borderColor: 'border.disabled',
      _hover: {
        bg: 'bg.disabled',
        color: 'text.disabled',
        borderColor: 'border.disabled',
      },
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

    '[data-selected=true] &': {
      fill: 'icon.decorative.inverse',
    },
    '.group:is(:hover, [data-hover])[data-selected=true] &': {
      fill: 'icon.decorative.inverse.hovered',
    },
  },
};

export const chipRecipe = defineSlotRecipe({
  className: 'chip',
  jsx: ['Chip'],
  slots: ['container', 'chipIcon'],
  base: chipBase,
  variants: {
    size: {
      sm: {
        container: {
          gap: '2',
          h: '20',
          px: '6',
          py: '0',
          fontSize: '14',
        },
        chipIcon: {
          w: '20',
          h: '20',
        },
      },
      md: {
        container: {
          gap: '4',
          h: '24',
          px: '8',
          py: '1',
          fontSize: '14',
        },
        chipIcon: {
          w: '20',
          h: '20',
        },
      },
      lg: {
        container: {
          gap: '4',
          h: '32',
          px: '10',
          py: '4',
          fontSize: '16',
        },
        chipIcon: {
          w: '24',
          h: '24',
        },
      },
    },
    before: {
      true: { container: {} },
    },
    after: {
      true: { container: {} },
    },
  },
  compoundVariants: [
    {
      size: 'sm',
      before: true,
      css: {
        container: { ps: '2' },
      },
    },
    {
      size: 'sm',
      after: true,
      css: {
        container: { pe: '2' },
      },
    },
    {
      size: 'md',
      before: true,
      css: {
        container: { ps: '2' },
      },
    },
    {
      size: 'md',
      after: true,
      css: {
        container: { pe: '2' },
      },
    },
    {
      size: 'lg',
      before: true,
      css: {
        container: { ps: '4' },
      },
    },
    {
      size: 'lg',
      after: true,
      css: {
        container: { pe: '4' },
      },
    },
  ],
  defaultVariants: {
    size: 'md',
  },
});
