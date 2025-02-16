import { defineRecipe } from "@pandacss/dev";

const checkBoxBase = {
  width: "14px",
  height: "14px",
  borderRadius: "3px",
  borderWidth: "1px",
  '& [type="checkbox"]': {
    position: 'absolute',
    appearance: 'none',
    '-webkit-appearance': 'none',
  }
}

const checkBoxVariants = {
  variant: {
    default: {
      bg: { base: 'slate.0', _dark: 'slate.90' },
      color: { base: 'slate.90', _dark: 'slate.0' },
      borderColor: 'slate.20'
    },
    checked: {
      bg: { base: 'slate.90', _dark: 'slate.0' },
      color: { base: 'slate.0', _dark: 'slate.90' },
      borderColor: { base: 'slate.90', _dark: 'slate.0' }
    },
    indeterminate: {
      bg: { base: 'slate.90', _dark: 'slate.0' },
      color: { base: 'slate.0', _dark: 'slate.90' },
      borderColor: { base: 'slate.90', _dark: 'slate.0' }
    },
    disabled: {
      bg: { base: 'slate.0', _dark: 'slate.90' },
      opacity: 0.4
    },
    error: {
      bg: { base: 'slate.0', _dark: 'slate.90' },
      borderColor: 'red.50'
    }
  },
}

export const checkBoxRecipe = defineRecipe({
  className: 'checkbox',
  jsx: ['CheckBox'],
  base: checkBoxBase,
  variants: checkBoxVariants,
  defaultVariants: {
    variant: 'default'
  }
})