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
    transitionProperty: 'background, border-color, color, box-shadow',
    transitionTimingFunction: 'default',
    userSelect: 'none',
    outlineWidth: 2,
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    bg: 'bg.neutral',
    color: 'text',
    icon: { fill: 'icon.decorative' },
    _hover: {
      bg: 'bg.neutral.hovered',
      icon: { fill: 'icon.decorative.hovered' },
    },
    _active: {
      bg: 'bg.neutral.pressed',
      icon: { fill: 'icon.decorative.hovered' },
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
      opacity: 0.6,
    },
    _disabled: {
      cursor: 'not-allowed',
      bg: 'bg.disabled',
      color: 'text.disabled',
      borderColor: 'border.disabled',
      icon: { fill: 'icon.disabled' },
      _hover: {
        bg: 'bg.disabled',
        color: 'text.disabled',
        borderColor: 'border.disabled',
        icon: { fill: 'icon.disabled' },
      },
    },
    _selected: {
      bg: 'bg.brand.boldest',
      color: 'text.inverse',
      icon: { fill: 'icon.decorative.inverse' },
      _hover: {
        bg: 'bg.brand.boldest.hovered',
        icon: { fill: 'icon.inverse' },
      },
      _active: {
        bg: 'bg.brand.boldest.pressed',
        icon: { fill: 'icon.inverse' },
      },
    },
  },
  icon: {
    aspectRatio: 'square',
    transitionDuration: 'fast',
    transitionProperty: 'fill',
    transitionTimingFunction: 'default',
  },
};

export const chipRecipe = defineSlotRecipe({
  className: 'chip',
  jsx: ['Chip'],
  slots: ['container', 'icon'],
  base: chipBase,
  variants: {
    size: {
      default: {
        container: {
          gap: '4',
          h: '24',
          px: '8',
          py: '1',
          fontSize: '14',
        },
        icon: {
          w: '20',
          h: '20',
        },
      },
      small: {
        container: {
          gap: '2',
          h: '20',
          px: '6',
          py: '0',
          fontSize: '14',
        },
        icon: {
          w: '20',
          h: '20',
        },
      },
      large: {
        container: {
          gap: '4',
          h: '32',
          px: '10',
          py: '4',
          fontSize: '16',
        },
        icon: {
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
      size: 'default',
      before: true,
      css: {
        container: { ps: '2' },
      },
    },
    {
      size: 'default',
      after: true,
      css: {
        container: { pe: '2' },
      },
    },
    {
      size: 'small',
      before: true,
      css: {
        container: { ps: '2' },
      },
    },
    {
      size: 'small',
      after: true,
      css: {
        container: { pe: '2' },
      },
    },
    {
      size: 'large',
      before: true,
      css: {
        container: { ps: '4' },
      },
    },
    {
      size: 'large',
      after: true,
      css: {
        container: { pe: '4' },
      },
    },
  ],
  defaultVariants: {
    size: 'default',
  },
});
