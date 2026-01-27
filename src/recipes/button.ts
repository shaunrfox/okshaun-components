import { defineSlotRecipe } from '@pandacss/dev';

const baseButtonStyles = {
  container: {
    position: 'relative',
    appearance: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    minWidth: 0,
    width: 'fit',
    height: 'fit',
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
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    _focusVisible: {
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
  variant: {
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
      md: {
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
      xl: {
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
      lg: {
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
      sm: {
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
      size: 'md',
      iconBefore: true,
      css: {
        container: { ps: '3' },
      },
    },
    {
      size: 'md',
      iconAfter: true,
      css: {
        container: { pe: '3' },
      },
    },
    {
      size: 'sm',
      iconBefore: true,
      css: {
        container: { ps: '2' },
      },
    },
    {
      size: 'sm',
      iconAfter: true,
      css: {
        container: { pe: '2' },
      },
    },
    {
      size: 'lg',
      iconBefore: true,
      css: {
        container: { ps: '5' },
      },
    },
    {
      size: 'lg',
      iconAfter: true,
      css: {
        container: { pe: '5' },
      },
    },
    {
      size: 'xl',
      iconBefore: true,
      css: {
        container: { ps: '7' },
      },
    },
    {
      size: 'xl',
      iconAfter: true,
      css: {
        container: { pe: '7' },
      },
    },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'md',
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
      md: {
        container: {
          fontSize: '16',
          p: '3',
        },
        icon: {
          w: '24',
          h: '24',
        },
      },
      sm: {
        container: {
          fontSize: '14',
          p: '1',
        },
        icon: {
          w: '22',
          h: '22',
        },
      },
      lg: {
        container: {
          fontSize: '16',
          p: '7',
        },
        icon: {
          w: '24',
          h: '24',
        },
      },
      xl: {
        container: {
          fontSize: '20',
          p: '9',
        },
        icon: {
          w: '28',
          h: '28',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});
