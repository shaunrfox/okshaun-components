import { defineRecipe } from '@pandacss/dev';

export const textareaRecipe = defineRecipe({
  className: 'textarea',
  jsx: ['Textarea'],
  base: {
    position: 'relative',
    display: 'inline-grid',
    verticalAlign: 'top',
    alignItems: 'center',
    padding: '0',
    fontFamily: 'body',
    fontSize: '16',
    fontWeight: 'normal',
    lineHeight: 'normal',
    color: { base: 'gray.90', _dark: 'gray.5' },
    borderRadius: '8',
    // transitionDuration: 'fast',
    // transitionProperty: 'background, border-color, color, box-shadow',
    // transitionTimingFunction: 'default',
    '&::after, & textarea': {
      width: 'auto',
      minWidth: '16',
      maxWidth: 'full',
      font: 'inherit',
      py: '4',
      px: '8',
      m: '0',
      resize: 'none',
      appearance: 'none',
      borderWidth: '1',
      borderStyle: 'solid',
      borderRadius: '4',
      borderColor: 'transparent',
    },
    _after: {
      content: 'attr(data-value) " "',
      // visibility: 'hidden',
      outline: '1px solid olive',
      whiteSpace: 'pre-wrap',
      transform: 'translate(4px, 4px)',
      opacity: '0.3',
    },
    '& textarea': {
      // _disabled: {
      //   opacity: 0.4,
      //   cursor: 'not-allowed',
      // },
      // _invalid: {
      //   borderColor: 'red.50',
      //   _focus: {
      //     borderColor: 'red.50',
      //   },
      // },
      // _placeholder: {
      //   color: { base: 'gray.50', _dark: 'gray.60' },
      //   opacity: 'full',
      // },
    },
  },
  defaultVariants: {
    stacked: true,
    internalLabel: false,
    autoGrow: false,
  },
  compoundVariants: [],
  variants: {
    autoGrow: {
      false: {
        width: 'full',
      },
      true: {
        width: 'fit-content',
      },
    },
    stacked: {
      true: {
        gridTemplateRows: 'auto 1fr',
        alignItems: 'stretch',
        '&::after, & textarea': {
          gridArea: '2 / 1',
        },
        '& textarea': {
          background: { base: 'gray.0', _dark: 'gray.90' },
          borderColor: { base: 'gray.40', _dark: 'gray.50' },
          // _hover: {
          //   borderColor: { base: 'gray.20', _dark: 'gray.30' },
          // },
          // _focus: {
          //   borderColor: { base: 'gray.90', _dark: 'gray.5' },
          // },
        },
      },
      false: {
        gridTemplateColumns: 'auto 1fr',
        alignItems: 'center',
        '& textarea': {
          background: { base: 'gray.0', _dark: 'gray.90' },
          borderColor: { base: 'green.40', _dark: 'green.50' },
          // _hover: {
          //   borderColor: { base: 'gray.20', _dark: 'gray.30' },
          // },
          // _focus: {
          //   borderColor: { base: 'gray.90', _dark: 'gray.5' },
          // },
        },
      },
    },
    internalLabel: {
      false: {},
      true: {
        // _focusWithin: {
        //   outlineWidth: 1,
        //   outlineStyle: 'solid',
        //   outlineColor: { base: 'gray.90', _dark: 'gray.5' },
        //   // outlineOffset: 2,
        //   ml: '-4',
        // },
      },
    },
  },
});
