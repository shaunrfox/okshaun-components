import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

// Ported from the Cetec design system: slots, the custom-property sizing
// mechanism and interaction behaviour. The recipe's before/after variants are
// internal; TextInput's public before/after/iconBefore/iconAfter props are
// unchanged.

const textInputBase = {
  container: {
    ...globalBaseStyles,
    '--input-py': 'token(sizes.3)',
    '--input-px': 'token(sizes.10)',
    '--input-slot-side-padding': 'token(sizes.0)',
    '--input-fs': 'token(sizes.16)',
    '--slot-size': 'token(sizes.20)',
    '--slot-px': 'token(sizes.6)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: 'full',
    bg: 'surface',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'border.input',
    borderRadius: '4',
    outlineWidth: '1',
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    '&:focus-within:not(:has(button:focus))': {
      outlineColor: 'border.focused',
      borderColor: 'border.focused',
    },
    _error: {
      borderColor: 'border.danger',
      '&:focus-within:not(:has(button:focus))': {
        borderColor: 'border.danger',
        outlineColor: 'border.danger',
      },
    },
    _invalid: {
      borderColor: 'border.danger',
      '&:focus-within:not(:has(button:focus))': {
        borderColor: 'border.danger',
        outlineColor: 'border.danger',
      },
    },
    _valid: {
      borderColor: 'border.success',
      '&:focus-within:not(:has(button:focus))': {
        borderColor: 'border.success',
        outlineColor: 'border.success',
      },
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
      '&:focus-within:not(:has(button:focus))': {
        outlineColor: 'transparent',
        borderColor: 'border.input',
      },
    },
    _groupDisabled: {
      opacity: 1, // let FormField handle disabled state opacity
    },
  },
  input: {
    width: 'full',
    bg: 'surface',
    py: 'var(--input-py)',
    px: 'var(--input-px)',
    fontSize: 'var(--input-fs)',
    borderRadius: '3',
    color: 'text',
    lineHeight: 'default',
    fontFamily: 'sans',
    border: 'none',
    outline: 'none',
    _placeholder: {
      color: 'text.placeholder',
    },
  },
  slot: {
    display: 'inline-flex',
    alignItems: 'center',
    transitionDuration: 'fast',
    transitionProperty: 'all',
    transitionTimingFunction: 'default',
    flex: '0 0 var(--slot-size)',
    px: 'var(--slot-px)',
    fill: 'icon.decorative',
    pointerEvents: 'none',
    zIndex: 1,
  },
  buttonSlot: {
    display: 'inline-flex',
    alignItems: 'center',
    flex: '0 0 var(--slot-size)',
    px: '0',
    zIndex: 1,
    m: '-1',
  },
};

const textInputVariants = {
  size: {
    sm: {
      container: {
        '--input-py': 'token(sizes.0)',
        '--input-px': 'token(sizes.8)',
        '--input-slot-side-padding': 'token(sizes.0)',
        '--input-fs': 'token(sizes.14)',
        '--slot-size': 'token(sizes.16)',
        '--slot-px': 'token(sizes.4)',
      },
    },
    md: {
      container: {
        '--input-py': 'token(sizes.3)',
        '--input-px': 'token(sizes.10)',
        '--input-slot-side-padding': 'token(sizes.0)',
        '--input-fs': 'token(sizes.16)',
        '--slot-size': 'token(sizes.20)',
        '--slot-px': 'token(sizes.6)',
      },
    },
    lg: {
      container: {
        '--input-py': 'token(sizes.7)',
        '--input-px': 'token(sizes.12)',
        '--input-slot-side-padding': 'token(sizes.0)',
        '--input-fs': 'token(sizes.16)',
        '--slot-size': 'token(sizes.24)',
        '--slot-px': 'token(sizes.8)',
      },
    },
    xl: {
      container: {
        '--input-py': 'token(sizes.9)',
        '--input-px': 'token(sizes.16)',
        '--input-slot-side-padding': 'token(sizes.0)',
        '--input-fs': 'token(sizes.20)',
        '--slot-size': 'token(sizes.28)',
        '--slot-px': 'token(sizes.10)',
      },
    },
  },
  before: {
    true: {
      input: {
        ps: '0',
      },
      buttonSlot: {
        '& button': {
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0',
        },
      },
    },
  },
  after: {
    true: {
      input: {
        pe: '0',
      },
      buttonSlot: {
        '& button': {
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
        },
      },
    },
  },
  autoSize: {
    true: {
      input: {
        fieldSizing: 'content',
        maxW: 'full',
      },
    },
  },
};

export const textInputRecipe = defineSlotRecipe({
  className: 'textInput',
  jsx: ['TextInput'],
  slots: ['container', 'input', 'slot', 'buttonSlot', 'before', 'after'],
  base: textInputBase,
  variants: textInputVariants,
  defaultVariants: {
    size: 'md',
  },
});
