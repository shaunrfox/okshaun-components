import { defineRecipe, defineStyles } from '@pandacss/dev';

const baseButtonStyles = defineStyles({
  position: 'relative',
  appearance: 'none',
  minWidth: 0,
  transitionDuration: 'fast',
  transitionProperty: 'background, border-color, color, box-shadow',
  transitionTimingFunction: 'default',
  userSelect: 'none',
  verticalAlign: 'middle',
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontFamily: 'sans',
  fontSize: 16,
  fontWeight: 'medium',
  lineHeight: 'default',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'transparent',
  borderRadius: 4,
  outlineWidth: 2,
  outlineStyle: 'solid',
  outlineColor: 'transparent',
  outlineOffset: 1,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  _disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
  _focusVisible: {
    outlineColor: { base: 'gray.80', _dark: 'gray.5' },
  },
  '& svg': {
    fill: 'current',
  },
});

const buttonVariants = defineStyles({
  variant: {
    primary: {
      bg: { base: 'gray.90', _dark: 'gray.5' },
      color: { base: 'gray.5', _dark: 'gray.90' },
      _hover: {
        bg: { base: 'gray.70', _dark: 'gray.20' },
      },
      _active: {
        bg: { base: 'gray.100', _dark: 'gray.30' },
        borderColor: 'transparent',
      },
      _disabled: {
        _hover: {
          bg: { base: 'gray.90', _dark: 'gray.5' },
        },
      },
      _selected: {
        bg: { base: 'gray.5', _dark: 'gray.90' },
        color: { base: 'gray.90', _dark: 'gray.5' },
        borderColor: 'transparent',
      },
    },
    standard: {
      bg: { base: 'gray.5', _dark: 'gray.70' },
      color: { base: 'gray.90', _dark: 'gray.5' },
      _hover: {
        bg: { base: 'gray.10', _dark: 'gray.60' },
      },
      _active: {
        bg: { base: 'gray.20', _dark: 'gray.80' },
        borderColor: 'transparent',
      },
      _disabled: {
        _hover: {
          bg: { base: 'gray.5', _dark: 'gray.70' },
        },
      },
      _selected: {
        bg: { base: 'gray.90', _dark: 'gray.5' },
        color: { base: 'gray.5', _dark: 'gray.90' },
        borderColor: 'transparent',
      },
    },
    hollow: {
      bg: 'transparent',
      borderColor: { base: 'gray.30', _dark: 'gray.60' },
      color: { base: 'gray.90', _dark: 'gray.5' },
      _hover: {
        bg: { base: 'gray.10', _dark: 'gray.60' },
        borderColor: { base: 'gray.10', _dark: 'gray.60' },
      },
      _active: {
        bg: { base: 'gray.20', _dark: 'gray.70' },
        borderColor: { base: 'gray.20', _dark: 'gray.70' },
      },
      _disabled: {
        _hover: {
          bg: 'transparent',
        },
      },
      _selected: {
        bg: { base: 'gray.90', _dark: 'gray.5' },
        color: { base: 'gray.5', _dark: 'gray.90' },
        borderColor: 'transparent',
      },
    },
    ghost: {
      bg: 'transparent',
      color: { base: 'gray.90', _dark: 'gray.5' },
      _hover: {
        bg: { base: 'gray.10', _dark: 'gray.60' },
      },
      _active: {
        bg: { base: 'gray.20', _dark: 'gray.70' },
        borderColor: 'transparent',
      },
      _disabled: {
        _hover: {
          bg: 'transparent',
        },
      },
      _selected: {
        bg: { base: 'gray.90', _dark: 'gray.5' },
        color: { base: 'gray.5', _dark: 'gray.90' },
        borderColor: 'transparent',
      },
    },
    cta: {
      bg: { base: 'blue.50', _dark: 'blue.50' },
      color: { base: 'gray.5', _dark: 'gray.5' },
      _hover: {
        bg: { base: 'blue.40', _dark: 'blue.40' },
      },
      _active: {
        bg: { base: 'blue.60', _dark: 'blue.60' },
        borderColor: 'transparent',
      },
      _disabled: {
        _hover: {
          bg: { base: 'blue.50', _dark: 'blue.50' },
        },
      },
    },
    danger: {
      bg: { base: 'red.50', _dark: 'red.50' },
      color: { base: 'gray.0', _dark: 'gray.0' },
      _hover: {
        bg: { base: 'red.40', _dark: 'red.40' },
      },
      _active: {
        bg: { base: 'red.60', _dark: 'red.60' },
        borderColor: 'transparent',
      },
      _disabled: {
        _hover: {
          bg: { base: 'red.50', _dark: 'red.50' },
        },
      },
    },
  },
});

export const buttonRecipe = defineRecipe({
  className: 'button',
  jsx: ['Button'],
  base: baseButtonStyles,
  variants: {
    ...buttonVariants,
    size: {
      standard: {
        fontSize: '16',
        py: '3',
        px: '12',
      },
      large: {
        fontSize: '16',
        py: '7',
        px: '14',
      },
      small: {
        fontSize: '14',
        py: '1',
        px: '8',
      },
    },
  },
  defaultVariants: {
    variant: 'standard',
    size: 'standard',
  },
});

export const iconButtonRecipe = defineRecipe({
  className: 'icon-button',
  jsx: ['IconButton'],
  base: baseButtonStyles,
  variants: {
    ...buttonVariants,
    size: {
      standard: {
        fontSize: '16',
        p: '3',
      },
      large: {
        fontSize: '16',
        p: '7',
      },
      small: {
        fontSize: '14',
        p: '1',
      },
    },
  },
  defaultVariants: {
    variant: 'standard',
    size: 'standard',
  },
});
