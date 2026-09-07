import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

const validationStyles = {
  danger: {
    borderColor: 'border.danger',
    outlineColor: 'border.danger',
  },
  success: {
    borderColor: 'border.success',
    outlineColor: 'border.success',
  },
};

const autocompleteBase = {
  root: {
    ...globalBaseStyles,
    '--control-py': 'token(sizes.3)',
    '--control-px': 'token(sizes.10)',
    '--control-fs': 'token(sizes.16)',
    '--control-min-height': 'token(sizes.32)',
    '--value-gap': 'token(sizes.4)',
    '--input-min-width': 'token(sizes.80)',
    '--loading-size': 'token(sizes.20)',
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    width: 'full',
    minWidth: '0',
    maxWidth: 'full',
    fontFamily: 'sans',
    lineHeight: 'default',
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
    _groupDisabled: {
      opacity: 1,
    },
  },
  control: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: 'full',
    minWidth: '0',
    minHeight: 'var(--control-min-height)',
    py: 'var(--control-py)',
    ps: 'var(--control-px)',
    pe: 'var(--control-px)',
    bg: 'surface',
    color: 'text',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'border.input',
    borderRadius: '4',
    outlineWidth: '1',
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    cursor: 'text',
    transitionDuration: 'fast',
    transitionProperty: 'background, border-color, outline-color',
    transitionTimingFunction: 'default',
    _focusWithin: {
      borderColor: 'border.focused',
      outlineColor: 'border.focused',
    },
    _open: {
      borderColor: 'border.focused',
      outlineColor: 'border.focused',
    },
    _error: validationStyles.danger,
    _invalid: validationStyles.danger,
    _valid: validationStyles.success,
    _disabled: {
      bg: 'bg.disabled',
      borderColor: 'border.disabled',
      color: 'text.disabled',
      cursor: 'not-allowed',
      pointerEvents: 'none',
      _focusWithin: {
        borderColor: 'border.disabled',
        outlineColor: 'transparent',
      },
    },
  },
  valueContainer: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    flex: '1',
    flexWrap: 'wrap',
    minWidth: '0',
    gap: 'var(--value-gap)',
  },
  input: {
    flexGrow: '1',
    flexShrink: '0',
    flexBasis: 'var(--input-min-width)',
    minWidth: 'var(--input-min-width)',
    maxWidth: 'full',
    p: '0',
    marginBlock: '-3',
    bg: 'transparent',
    color: 'text',
    fontFamily: 'sans',
    fontSize: 'var(--control-fs)',
    lineHeight: 'default',
    border: 'none',
    outline: 'none',
    _placeholder: {
      color: 'text.placeholder',
    },
    _disabled: {
      color: 'text.disabled',
      cursor: 'not-allowed',
    },
  },
  token: {
    minWidth: '0',
    maxWidth: 'full',
    flex: '0 1 auto',
    _new: {
      bg: 'transparent',
      outlineWidth: '1',
      outlineStyle: 'dashed',
      outlineColor: 'border.warning',
    },
  },
  overflowIndicator: {
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: '0',
    minHeight: 'var(--loading-size)',
    px: '6',
    bg: 'bg.neutral',
    color: 'text.subtle',
    borderRadius: '999',
    fontSize: '14',
    fontWeight: 'medium',
    lineHeight: 'default',
    whiteSpace: 'nowrap',
  },
  loadingIndicator: {
    display: 'inline-flex',
    alignItems: 'center',
    alignSelf: 'center',
    flexShrink: '0',
    ms: 'var(--control-py)',
    width: 'var(--loading-size)',
    height: 'var(--loading-size)',
    _icon: {
      width: 'var(--loading-size)',
      height: 'var(--loading-size)',
    },
  },
  listbox: {
    ...globalBaseStyles,
    width: 'full',
    maxHeight: '192',
    overflowY: 'auto',
    bg: 'surface',
    borderRadius: '4',
    boxShadow: 'overlay',
    outline: 'none',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    width: 'full',
    minHeight: '40',
    px: '12',
    py: '8',
    color: 'text.subtle',
    fontSize: '14',
    lineHeight: 'default',
  },
  liveRegion: {
    srOnly: true,
  },
};

const autocompleteVariants = {
  layer: {
    elevated: {
      listbox: {
        zIndex: 'elevated',
      },
    },
    modalFloating: {
      listbox: {
        zIndex: 'modalFloating',
      },
    },
  },
  size: {
    sm: {
      root: {
        '--control-py': 'token(sizes.0)',
        '--control-px': 'token(sizes.8)',
        '--control-fs': 'token(sizes.14)',
        '--control-min-height': 'token(sizes.24)',
        '--value-gap': 'token(sizes.3)',
        '--input-min-width': 'token(sizes.64)',
        '--loading-size': 'token(sizes.16)',
      },
    },
    md: {
      root: {
        '--control-py': 'token(sizes.3)',
        '--control-px': 'token(sizes.10)',
        '--control-fs': 'token(sizes.16)',
        '--control-min-height': 'token(sizes.32)',
        '--value-gap': 'token(sizes.4)',
        '--input-min-width': 'token(sizes.80)',
        '--loading-size': 'token(sizes.20)',
      },
    },
    lg: {
      root: {
        '--control-py': 'token(sizes.7)',
        '--control-px': 'token(sizes.12)',
        '--control-fs': 'token(sizes.16)',
        '--control-min-height': 'token(sizes.40)',
        '--value-gap': 'token(sizes.5)',
        '--input-min-width': 'token(sizes.96)',
        '--loading-size': 'token(sizes.20)',
      },
    },
    xl: {
      root: {
        '--control-py': 'token(sizes.9)',
        '--control-px': 'token(sizes.16)',
        '--control-fs': 'token(sizes.20)',
        '--control-min-height': 'token(sizes.48)',
        '--value-gap': 'token(sizes.6)',
        '--input-min-width': 'token(sizes.112)',
        '--loading-size': 'token(sizes.24)',
      },
    },
  },
};

export const autocompleteRecipe = defineSlotRecipe({
  className: 'autocomplete',
  jsx: ['Autocomplete'],
  slots: [
    'root',
    'control',
    'valueContainer',
    'input',
    'token',
    'overflowIndicator',
    'loadingIndicator',
    'listbox',
    'status',
    'liveRegion',
  ],
  base: autocompleteBase,
  variants: autocompleteVariants,
  defaultVariants: {
    size: 'md',
    layer: 'elevated',
  },
});
