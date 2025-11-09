import { defineRecipe } from '@pandacss/dev';

const textInputVariants = {
  size: {
    medium: {
      py: 3,
      px: 10,
      fontSize: '16',
    },
    small: {
      py: 0,
      px: 8,
      fontSize: '14',
    },
    large: {
      py: 7,
      px: 12,
      fontSize: '16',
    },
  },
  autoSize: {
    true: {
      fieldSizing: 'content',
    },
  },
};

const textInputBase = {
  position: 'relative',
  width: 'full',
  borderWidth: '1',
  borderColor: 'gray.30',
  borderStyle: 'solid',
  borderRadius: '4',
  lineHeight: 'default',
  fontFamily: 'body',
  outlineWidth: '1',
  outlineStyle: 'solid',
  outlineColor: 'transparent',
  color: {
    base: 'gray.90',
    _dark: 'gray.0',
  },
  _placeholder: {
    color: {
      base: 'gray.50',
      _dark: 'gray.40',
    },
  },
  _disabled: {
    opacity: 0.4,
  },

  _focus: {
    outlineColor: { base: 'gray.90', _dark: 'gray.0' },
    borderColor: { base: 'gray.90', _dark: 'gray.0' },
  },
  _error: {
    display: 'inline-grid',
    borderColor: 'error.default',
    _focus: {
      borderColor: { base: 'error.default', _dark: 'error.default' },
      outlineColor: { base: 'error.default', _dark: 'error.default' },
    },
  },
};

export const textinputRecipe = defineRecipe({
  className: 'textinput',
  jsx: ['TextInput'],
  base: textInputBase,
  variants: textInputVariants,
  defaultVariants: {
    size: 'medium',
  },
});
