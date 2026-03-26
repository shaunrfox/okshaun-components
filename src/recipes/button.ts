import { defineSlotRecipe } from '@pandacss/dev';

const baseButtonStyles = {
  container: {
    position: 'relative',
    appearance: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '4',
    minWidth: '0',
    width: 'fit',
    height: 'fit',
    transitionDuration: 'fast',
    transitionProperty: 'background, border-color, color, box-shadow',
    transitionTimingFunction: 'default',
    userSelect: 'none',
    verticalAlign: 'middle',
    fontFamily: 'sans',
    fontWeight: 'medium',
    fontSize: '16',
    lineHeight: 'default',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: '4',
    outlineWidth: '2',
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    _disabled: {
      cursor: 'not-allowed',
      opacity: '0.3',
    },
    _loading: {
      cursor: 'not-allowed',
      opacity: '0.3',
    },
    _focusVisible: {
      outlineColor: 'border.focused',
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
        _hover: {
          bg: 'bg.neutral.hovered',
        },
        _active: {
          bg: 'bg.neutral.pressed',
        },
      },
      icon: {
        fill: 'icon.decorative',
        mixBlendMode: { base: 'multiply', _dark: 'screen' },
        _groupHover: { fill: 'current' },
        _groupActive: { fill: 'current' },
      },
    },
    primary: {
      container: {
        bg: 'bg.neutral.boldest',
        color: 'text.inverse',
        _hover: {
          bg: 'bg.neutral.bold.hovered',
        },
        _active: {
          bg: 'bg.neutral.bold.pressed',
        },
      },
      icon: {
        fill: 'icon.decorative.inverse.subtle',
        mixBlendMode: { base: 'screen', _dark: 'multiply' },
        _groupHover: { fill: 'icon.decorative.inverse' },
        _groupActive: { fill: 'icon.decorative.inverse' },
        _groupDisabled: {
          fill: 'icon.decorative.inverse.subtle',
        },
      },
    },
    hollow: {
      container: {
        bg: 'bg.neutral.subtle',
        borderColor: 'border',
        color: 'text',
        _hover: {
          bg: 'bg.neutral.subtle.hovered',
        },
        _active: {
          bg: 'bg.neutral.subtle.pressed',
        },
      },
      icon: {
        fill: 'icon.decorative',
        mixBlendMode: { base: 'multiply', _dark: 'screen' },
        _groupHover: { fill: 'current' },
        _groupActive: { fill: 'current' },
      },
    },
    ghost: {
      container: {
        bg: 'bg.neutral.subtle',
        color: 'text',
        _hover: {
          bg: 'bg.neutral.subtle.hovered',
        },
        _active: {
          bg: 'bg.neutral.subtle.pressed',
        },
      },
      icon: {
        fill: 'icon.decorative',
        mixBlendMode: { base: 'multiply', _dark: 'screen' },
        _groupHover: { fill: 'current' },
        _groupActive: { fill: 'current' },
      },
    },
    danger: {
      container: {
        bg: 'red.50',
        color: 'neutral.0',
        _hover: {
          bg: 'red.40',
        },
        _active: {
          bg: 'red.60',
        },
      },
      icon: {
        fill: 'icon.decorative.inverse',
        mixBlendMode: 'screen',
        _groupHover: { fill: 'icon.decorative.inverse' },
        _groupActive: { fill: 'icon.decorative.inverse' },
        _groupDisabled: {
          fill: 'icon.decorative.inverse',
        },
      },
    },
    selected: {
      container: {
        bg: 'bg.selected',
        color: 'text.selected',
        icon: { fill: 'icon.selected' },
        _hover: {
          bg: 'bg.selected.hovered',
          color: 'text.selected.hovered',
          icon: { fill: 'icon.selected' },
        },
        _active: {
          bg: 'bg.selected.pressed',
          color: 'text.selected',
          icon: { fill: 'icon.selected' },
        },
      },
      icon: {
        fill: 'icon.selected',
        mixBlendMode: { base: 'multiply', _dark: 'screen' },
        _groupHover: { fill: 'icon.selected' },
        _groupActive: { fill: 'icon.selected' },
        _groupDisabled: {
          fill: 'icon.selected',
        },
      },
    },
    selectedBold: {
      container: {
        bg: 'bg.selected.bold',
        color: 'text.inverse',
        _hover: {
          bg: 'bg.selected.bold.hovered',
        },
        _active: {
          bg: 'bg.selected.bold.pressed',
        },
      },
      icon: {
        fill: 'icon.inverse',
        mixBlendMode: { base: 'screen', _dark: 'multiply' },
        _groupHover: { fill: 'icon.inverse' },
        _groupActive: { fill: 'icon.inverse' },
        _groupDisabled: {
          fill: 'icon.inverse',
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
