import { defineRecipe } from '@pandacss/dev';

const checkBoxBase = {
  width: '14px',
  height: '14px',
  borderRadius: '3px',
  borderWidth: '1px',
  '& [type="checkbox"]': {
    position: 'absolute',
    appearance: 'none',
    '-webkit-appearance': 'none',
  },
};

const checkBoxVariants = {
  variant: {
    default: {
      bg: { base: 'gray.0', _dark: 'gray.90' },
      color: { base: 'gray.90', _dark: 'gray.0' },
      borderColor: 'gray.20',
    },
    checked: {
      bg: { base: 'gray.90', _dark: 'gray.0' },
      color: { base: 'gray.0', _dark: 'gray.90' },
      borderColor: { base: 'gray.90', _dark: 'gray.0' },
    },
    indeterminate: {
      bg: { base: 'gray.90', _dark: 'gray.0' },
      color: { base: 'gray.0', _dark: 'gray.90' },
      borderColor: { base: 'gray.90', _dark: 'gray.0' },
    },
    disabled: {
      bg: { base: 'gray.0', _dark: 'gray.90' },
      opacity: 0.4,
    },
    error: {
      bg: { base: 'gray.0', _dark: 'gray.90' },
      borderColor: 'red.50',
    },
  },
};

export const checkBoxRecipe = defineRecipe({
  className: 'checkbox',
  jsx: ['CheckBox'],
  base: checkBoxBase,
  variants: checkBoxVariants,
  defaultVariants: {
    variant: 'default',
  },
});
