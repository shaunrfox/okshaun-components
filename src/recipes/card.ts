import { defineRecipe } from '@pandacss/dev';

export const cardRecipe = defineRecipe({
  className: 'card',
  jsx: ['Card'],
  base: {
    display: 'block',
    bg: { base: 'gray.10', _dark: 'gray.80' },
    borderRadius: '4',
    outlineWidth: '1',
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    outlineOffset: '0',
  },
  variants: {
    appearance: {
      elevated: {
        boxShadow: 'low',
        borderWidth: '1',
        borderColor: 'transparent',
      },
      flat: {
        borderWidth: '1',
        borderStyle: 'solid',
        borderColor: { base: 'gray.20', _dark: 'gray.70' },
      },
      ghost: {
        bg: 'transparent',
        borderWidth: '1',
        borderStyle: 'solid',
        borderColor: 'transparent',
      },
    },
    interactive: {
      true: {
        cursor: 'pointer',
        transition: 'all 0.15s ease-in-out',
      },
      false: {},
    },
  },
  compoundVariants: [
    // Elevated + interactive
    {
      appearance: 'elevated',
      interactive: true,
      css: {
        _hover: {
          boxShadow: 'medium',
        },
        _active: {
          boxShadow: 'inset',
        },
        _focusVisible: {
          boxShadow: 'none',
          borderWidth: '1',
          outlineColor: { base: 'gray.90', _dark: 'gray.10' },
          borderColor: { base: 'gray.90', _dark: 'gray.10' },
        },
        _disabled: {
          opacity: '0.4',
          cursor: 'not-allowed',
          _hover: {
            boxShadow: 'low',
          },
          _active: {
            boxShadow: 'low',
          },
        },
      },
    },
    // Flat + interactive
    {
      appearance: 'flat',
      interactive: true,
      css: {
        _hover: {
          borderColor: { base: 'gray.30', _dark: 'gray.100' },
        },
        _active: {
          borderColor: { base: 'gray.100', _dark: 'gray.30' },
        },
        _focusVisible: {
          boxShadow: 'none',
          outlineColor: { base: 'gray.90', _dark: 'gray.10' },
          borderColor: { base: 'gray.90', _dark: 'gray.10' },
        },
        _disabled: {
          opacity: '0.4',
          cursor: 'not-allowed',
          _hover: {
            borderColor: { base: 'gray.20', _dark: 'gray.70' },
          },
          _active: {
            borderColor: { base: 'gray.20', _dark: 'gray.70' },
          },
        },
      },
    },
    // Ghost + interactive
    {
      appearance: 'ghost',
      interactive: true,
      css: {
        _hover: {
          bg: { base: 'gray.10', _dark: 'gray.80' },
          borderColor: { base: 'gray.20', _dark: 'gray.70' },
        },
        _active: {
          bg: { base: 'gray.20', _dark: 'gray.70' },
        },
        _focusVisible: {
          outlineColor: { base: 'gray.90', _dark: 'gray.10' },
          borderColor: { base: 'gray.90', _dark: 'gray.10' },
        },
        _disabled: {
          opacity: '0.4',
          cursor: 'not-allowed',
          _hover: {
            bg: 'transparent',
            borderColor: 'transparent',
          },
        },
      },
    },
  ],
  defaultVariants: {
    appearance: 'elevated',
    interactive: false,
  },
});
