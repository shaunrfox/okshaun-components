import { defineRecipe } from '@pandacss/dev';

const cardBase = {
  bg: { base: 'gray.10', _dark: 'gray.80' },
  borderRadius: '4',
  outlineWidth: '1',
  outlineStyle: 'solid',
  outlineColor: 'transparent',
  outlineOffset: '0',
};

const cardVariant = {
  variant: {
    default: {
      boxShadow: 'low',
      borderWidth: '1',
      borderColor: 'transparent',
      _hover: {
        boxShadow: 'medium',
      },
      _active: {
        boxShadow: 'inset',
        _grabbed: {
          boxShadow: 'high',
          cursor: 'grabbing',
        },
      },
      _focusVisible: {
        boxShadow: 'none',
        borderWidth: '1',
        outlineColor: { base: 'gray.90', _dark: 'gray.10' },
        borderColor: { base: 'gray.90', _dark: 'gray.10' },
      },
      _disabled: {
        opacity: '0.4',
        _hover: {
          boxShadow: 'low',
        },
        _active: {
          boxShadow: 'low',
        },
      },
    },
    flat: {
      borderWidth: '1',
      borderStyle: 'solid',
      borderColor: { base: 'gray.10', _dark: 'gray.70' },
      _hover: {
        borderColor: { base: 'gray.30', _dark: 'gray.100' },
      },
      _active: {
        borderColor: { base: 'gray.100', _dark: 'gray.30' },
        _grabbed: {
          boxShadow: 'high',
          cursor: 'grabbing',
        },
      },
      _focusVisible: {
        boxShadow: 'none',
        outlineColor: { base: 'gray.90', _dark: 'gray.10' },
        borderColor: { base: 'gray.90', _dark: 'gray.10' },
      },
      _disabled: {
        opacity: '0.4',
        _hover: {
          borderColor: { base: 'gray.10', _dark: 'gray.70' },
        },
        _active: {
          borderColor: { base: 'gray.10', _dark: 'gray.70' },
        },
      },
    },
  },
};

export const cardRecipe = defineRecipe({
  className: 'card',
  jsx: ['Card'],
  base: cardBase,
  variants: cardVariant,
  defaultVariants: {
    variant: 'default',
  },
});
