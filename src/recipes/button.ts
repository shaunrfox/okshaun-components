import { defineSlotRecipe } from '@pandacss/dev';

const baseButtonStyles = {
  container: {
    position: 'relative',
    appearance: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    minWidth: 0,
    transitionDuration: 'fast',
    transitionProperty: 'background, border-color, color, box-shadow',
    transitionTimingFunction: 'default',
    userSelect: 'none',
    verticalAlign: 'middle',
    fontFamily: 'sans',
    fontWeight: 'medium',
    fontSize: 16,
    lineHeight: 'default',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: 4,
    outlineWidth: 2,
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    // outlineOffset: 1,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    _focusVisible: {
      // borderColor: 'border.focused',
      outlineColor: 'border.focused',
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
      bg: 'bg.selected',
      color: 'text.selected',
      borderColor: 'transparent',
      icon: { fill: 'icon.selected' },
    },
  },
  icon: {
    aspectRatio: 'square',
    transitionDuration: 'fast',
    transitionProperty: 'fill',
    transitionTimingFunction: 'default',
  },
};

const buttonVariants = {
  appearance: {
    default: {
      container: {
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
      },
    },
    primary: {
      container: {
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
    subtle: {
      container: {
        bg: 'bg.neutral.subtle',
        color: 'text.subtle',
        icon: { fill: 'icon.decorative' },
        _hover: {
          bg: 'bg.neutral.subtle.hovered',
          color: 'text',
          icon: { fill: 'icon.decorative.hovered' },
        },
        _active: {
          bg: 'bg.neutral.subtle.pressed',
          color: 'text',
          icon: { fill: 'icon.decorative.hovered' },
        },
      },
    },
    hollow: {
      container: {
        bg: 'bg.neutral.subtle',
        color: 'text.subtle',
        borderColor: 'border',
        icon: { fill: 'icon.decorative' },
        _hover: {
          bg: 'bg.neutral.subtle.hovered',
          color: 'text',
          borderColor: 'border',
          icon: { fill: 'icon.decorative.hovered' },
        },
        _active: {
          bg: 'bg.neutral.subtle.pressed',
          color: 'text',
          borderColor: 'border',
          icon: { fill: 'icon.decorative.hovered' },
        },
        _disabled: {
          borderColor: 'border.disabled',
          _hover: {
            borderColor: 'border.disabled',
          },
        },
      },
    },
  },
};

export const buttonRecipe = defineSlotRecipe({
  className: 'button',
  jsx: ['Button'],
  slots: ['container', 'icon'],
  base: baseButtonStyles,
  variants: {
    ...buttonVariants,
    size: {
      default: {
        container: {
          fontSize: '16',
          py: '3',
          px: '12',
        },
        icon: {
          w: '24',
          h: '24',
        },
      },
      xlarge: {
        container: {
          fontSize: '20',
          py: '9',
          px: '16',
        },
        icon: {
          w: '28',
          h: '28',
        },
      },
      large: {
        container: {
          fontSize: '16',
          py: '7',
          px: '14',
        },
        icon: {
          w: '24',
          h: '24',
        },
      },
      small: {
        container: {
          fontSize: '14',
          py: '1',
          px: '8',
        },
        icon: {
          w: '22',
          h: '22',
        },
      },
    },
    iconBefore: {
      true: { container: {} },
    },
    iconAfter: {
      true: { container: {} },
    },
  },
  compoundVariants: [
    {
      size: 'default',
      iconBefore: true,
      css: {
        container: { ps: '3' },
      },
    },
    {
      size: 'default',
      iconAfter: true,
      css: {
        container: { pe: '3' },
      },
    },
    {
      size: 'small',
      iconBefore: true,
      css: {
        container: { ps: '2' },
      },
    },
    {
      size: 'small',
      iconAfter: true,
      css: {
        container: { pe: '2' },
      },
    },
    {
      size: 'large',
      iconBefore: true,
      css: {
        container: { ps: '5' },
      },
    },
    {
      size: 'large',
      iconAfter: true,
      css: {
        container: { pe: '5' },
      },
    },
    {
      size: 'xlarge',
      iconBefore: true,
      css: {
        container: { ps: '7' },
      },
    },
    {
      size: 'xlarge',
      iconAfter: true,
      css: {
        container: { pe: '7' },
      },
    },
  ],
  defaultVariants: {
    appearance: 'default',
    size: 'default',
  },
});

export const iconButtonRecipe = defineSlotRecipe({
  className: 'iconButton',
  jsx: ['IconButton'],
  slots: ['container', 'icon'],
  base: baseButtonStyles,
  variants: {
    ...buttonVariants,
    size: {
      default: {
        container: {
          fontSize: '16',
          p: '3',
        },
        icon: {
          w: '24',
          h: '24',
        },
      },
      large: {
        container: {
          fontSize: '16',
          p: '7',
        },
        icon: {
          w: '24',
          h: '24',
        },
      },
      small: {
        container: {
          fontSize: '14',
          p: '1',
        },
        icon: {
          w: '22',
          h: '22',
        },
      },
    },
  },
  defaultVariants: {
    appearance: 'default',
    size: 'default',
  },
});
