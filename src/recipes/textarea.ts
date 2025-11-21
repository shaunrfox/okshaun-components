import { defineRecipe } from '@pandacss/dev';

const textareaVariants = {
  size: {
    medium: {
      py: '3',
      px: '10',
      fontSize: '16',
      minHeight: '64',
    },
    small: {
      py: '0',
      px: '8',
      minHeight: '48',
      fontSize: '14',
    },
    large: {
      py: '7',
      px: '12',
      fontSize: '16',
      minHeight: '80',
    },
    xlarge: {
      py: '9',
      px: '16',
      fontSize: '20',
      minHeight: '96',
    },
  },
  // autoGrow: {
  //   false: {
  //     width: 'full',
  //   },
  //   true: {
  //     width: 'fit-content',
  //   },
  // },
  // stacked: {
  //   true: {
  //     gridTemplateRows: 'auto 1fr',
  //     alignItems: 'stretch',
  //     '&::after, & textarea': {
  //       gridArea: '2 / 1',
  //     },
  //     '& textarea': {
  //       background: { base: 'gray.10', _dark: 'gray.90' },
  //       borderColor: { base: 'gray.40', _dark: 'gray.100' },
  //       // _hover: {
  //       //   borderColor: { base: 'gray.20', _dark: 'gray.30' },
  //       // },
  //       // _focus: {
  //       //   borderColor: { base: 'gray.90', _dark: 'gray.10' },
  //       // },
  //     },
  //   },
  //   false: {
  //     gridTemplateColumns: 'auto 1fr',
  //     alignItems: 'center',
  //     '& textarea': {
  //       background: { base: 'gray.10', _dark: 'gray.90' },
  //       borderColor: { base: 'green.40', _dark: 'green.50' },
  //       // _hover: {
  //       //   borderColor: { base: 'gray.20', _dark: 'gray.30' },
  //       // },
  //       // _focus: {
  //       //   borderColor: { base: 'gray.90', _dark: 'gray.10' },
  //       // },
  //     },
  //   },
  // },
  // internalLabel: {
  //   false: {},
  //   true: {
  //     // _focusWithin: {
  //     //   outlineWidth: 1,
  //     //   outlineStyle: 'solid',
  //     //   outlineColor: { base: 'gray.90', _dark: 'gray.10' },
  //     //   // outlineOffset: 2,
  //     //   ml: '-4',
  //     // },
  //   },
  // },
};

const textareaBase = {
  display: 'inline-grid',
  position: 'relative',
  width: 'full',
  verticalAlign: 'top',
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
    color: 'text.subtlest',
  },
  _hover: {
    bg: 'bg.input.hovered',
  },
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

export const textareaRecipe = defineRecipe({
  className: 'textarea',
  jsx: ['Textarea'],
  base: textareaBase,
  variants: textareaVariants,
  defaultVariants: {
    size: 'medium',
    // stacked: true,
    // internalLabel: false,
    // autoGrow: false,
  },
});
