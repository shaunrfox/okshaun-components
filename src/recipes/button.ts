import { defineRecipe } from '@pandacss/dev';

export const button = defineRecipe({
  className: 'button',
  jsx: ['Button'],
  base: {
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
    lineHeight: 24,
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
      outlineColor: { base: 'gray.80', _osDark: 'gray.5' },
    },
    '& svg': {
      fill: 'current',
      width: 24,
      height: 24,
    },
  },
  variants: {
    variant: {
      standard: {
        bg: { base: 'gray.5', _osDark: 'gray.70' },
        color: { base: 'gray.80', _osDark: 'gray.5' },
        _hover: {
          bg: { base: 'gray.10', _osDark: 'gray.60' },
        },
        _active: {
          bg: { base: 'gray.20', _osDark: 'gray.100' },
          borderColor: 'transparent',
        },
        _disabled: {
          _hover: {
            bg: { base: 'gray.5', _osDark: 'gray.70' },
          },
        },
      },
      primary: {
        bg: 'blue.50',
        color: 'gray.0',
        _hover: {
          bg: 'blue.40',
        },
        _active: {
          bg: 'blue.60',
          borderColor: 'transparent',
        },
        _disabled: {
          _hover: {
            bg: 'blue.50',
          },
        },
      },
      danger: {
        bg: 'red.50',
        color: 'gray.0',
        _hover: {
          bg: 'red.40',
        },
        _active: {
          bg: 'red.60',
          borderColor: 'transparent',
        },
        _disabled: {
          _hover: {
            bg: 'red.50',
          },
        },
      },
      hollow: {
        bg: 'transparent',
        borderColor: { base: 'gray.30', _osDark: 'gray.60' },
        color: { base: 'gray.80', _osDark: 'gray.5' },
        _hover: {
          bg: { base: 'gray.10', _osDark: 'gray.60' },
        },
        _active: {
          bg: { base: 'gray.20', _osDark: 'gray.100' },
          // borderColor: 'transparent',
        },
        _disabled: {
          _hover: {
            bg: 'transparent',
          },
        },
      },
      utility: {
        bg: { base: 'gray.80', _osDark: 'gray.5' },
        color: { base: 'gray.5', _osDark: 'gray.80' },
        _hover: {
          bg: { base: 'gray.60', _osDark: 'gray.20' },
        },
        _active: {
          bg: { base: 'gray.100', _osDark: 'gray.20' },
          borderColor: 'transparent',
        },
        _disabled: {
          _hover: {
            bg: { base: 'gray.80', _osDark: 'gray.5' },
          },
        },
      },
    },
    size: {
      standard: {
        fontSize: 16,
        py: 3,
        px: 12,
      },
      large: {
        fontSize: 16,
        py: 7,
        px: 14,
      },
      small: {
        fontSize: 14,
        py: 1,
        px: 8,
      },
    },
  },
  defaultVariants: {
    variant: 'standard',
    size: 'standard',
  },
});
