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
    xlarge: {
      fontSize: '20',
      py: '9',
      px: '16',
    },
  },
  // autoSize: {
  //   true: {
  //     fieldSizing: 'content',
  //   },
  // },
};

const textInputBase = {
  display: 'inline-grid',
  position: 'relative',
  width: 'full',
  borderWidth: '1',
  borderStyle: 'solid',
  borderColor: 'border.input',
  borderRadius: '4',
  outlineWidth: '2',
  outlineOffset: '-1',
  outlineStyle: 'solid',
  outlineColor: 'transparent',
  lineHeight: 'default',
  fontFamily: 'body',
  bg: 'bg.input',
  color: 'text',
  transitionDuration: 'fast',
  transitionProperty: 'background, border-color, color, outline-color',
  transitionTimingFunction: 'default',
  _placeholder: {
    color: 'text.placeholder',
  },
  // _hover: {
  // bg: 'bg.input.hovered',
  // },
  _focus: {
    bg: 'bg.input.pressed',
    borderColor: 'border.focused',
    outlineColor: 'border.focused',
  },
  _disabled: {
    bg: 'bg.disabled',
    borderColor: 'border.disabled',
    color: 'text.disabled',
  },
  _error: {
    display: 'inline-grid',
    bg: 'bg.danger',
    borderColor: 'border.danger',
    color: 'text.danger',
    _placeholder: {
      color: 'text.danger/60',
    },
    _hover: {
      bg: 'bg.danger.hovered',
      borderColor: 'border.danger',
    },
    _focus: {
      bg: 'bg.danger',
      borderColor: 'border.danger',
      outlineColor: 'border.danger',
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
