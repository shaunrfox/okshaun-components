import { defineRecipe } from '@pandacss/dev';

export const textareaRecipe = defineRecipe({
  className: 'textarea',
  jsx: ['Textarea'],
  base: {
    fontSize: '[100%]',
    position: 'relative',
    width: 'full',
    bg: 'surface',
    color: 'text',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'border.input',
    borderRadius: '4',
    lineHeight: 'tight',
    fontFamily: 'body',
    outlineWidth: '1',
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    resize: 'both',
    _placeholder: {
      color: 'text.placeholder',
    },
    _focus: {
      outlineColor: 'border.focused',
      borderColor: 'border.focused',
    },
    _error: {
      display: 'inline-grid',
      borderColor: 'border.danger',
      _focus: {
        borderColor: 'border.danger',
        outlineColor: 'border.danger',
      },
    },
    _disabled: {
      opacity: '[0.4]',
    },
    _groupDisabled: {
      opacity: '[1]', // let FormField handle disabled state opacity
    },
  },
  variants: {
    size: {
      sm: {
        py: '0',
        px: '8',
        minHeight: '48',
        fontSize: '14',
      },
      md: {
        py: '3',
        px: '10',
        fontSize: '16',
        minHeight: '64',
      },
      lg: {
        py: '7',
        px: '12',
        fontSize: '16',
        minHeight: '80',
      },
      xl: {
        py: '9',
        px: '16',
        fontSize: '20',
        minHeight: '96',
      },
    },
    autoSize: {
      true: {
        fieldSizing: 'content',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
