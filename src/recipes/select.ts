import { defineSlotRecipe } from '@pandacss/dev';

const selectBase = {
  root: {
    '--icon-size': 'token(sizes.24)',
    '--icon-margin': 'token(sizes.3)',
    '--input-icon-padding': 'token(sizes.10)',
    display: 'inline-flex',
    flexDirection: 'column',
    position: 'relative',
    minWidth: '0',
    maxW: 'full',
    width: 'fit',
  },
  trigger: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: 'fit',
    minWidth: '0',
    maxWidth: 'full',
    pe: 'var(--input-icon-padding)',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'border.input',
    borderRadius: '4',
    outlineWidth: '2',
    outlineOffset: '-1',
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    bg: 'bg.input',
    color: 'text',
    fontFamily: 'sans',
    lineHeight: 'default',
    cursor: 'pointer',
    overflow: 'hidden',
    transitionDuration: 'fast',
    transitionProperty: 'background, border-color, outline-color',
    transitionTimingFunction: 'default',
    _hover: {
      bg: 'bg.input.hovered',
    },
    _focusVisible: {
      bg: 'bg.input.pressed',
      borderColor: 'border.focused',
      outlineColor: 'border.focused',
    },
    _open: {
      bg: 'bg.input.pressed',
      borderColor: 'border.focused',
      outlineColor: 'border.focused',
    },
    _disabled: {
      bg: 'bg.disabled',
      borderColor: 'border.disabled',
      color: 'text.disabled',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
    _error: {
      borderColor: 'border.danger',
      _hover: {
        borderColor: 'border.danger',
      },
      _focusVisible: {
        borderColor: 'border.danger',
        outlineColor: 'border.danger',
      },
      _open: {
        borderColor: 'border.danger',
        outlineColor: 'border.danger',
      },
    },
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '0',
    width: 'full',
    flex: '1',
    ps: 'var(--select-px)',
  },
  before: {
    display: 'inline-flex',
    alignItems: 'center',
    flex: '0 0 auto',
    alignSelf: 'center',
    px: 'var(--select-slot-px)',
    fill: 'icon.decorative',
    pointerEvents: 'none',
  },
  value: {
    flex: 1,
    minWidth: '0',
    textAlign: 'left',
    truncate: true,
    color: 'text',
  },
  placeholder: {
    flex: 1,
    minWidth: '0',
    textAlign: 'left',
    truncate: true,
    color: 'text.placeholder',
  },
  chips: {
    display: 'flex',
    alignItems: 'center',
    gap: '4',
    minWidth: '0',
    width: 'full',
    flex: '1',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollbarWidth: 'thin',
  },
  icon: {
    position: 'absolute',
    top: '50%',
    right: '1',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'var(--icon-size)',
    height: 'var(--icon-size)',
    marginInline: 'var(--icon-margin)',
    transform: 'translateY(-50%)',
    bg: 'bg.input',
    fill: 'icon.decorative',
    pointerEvents: 'none',
    transitionDuration: 'fast',
    transitionProperty: 'all',
    transitionTimingFunction: 'default',
    _icon: {
      width: 'var(--icon-size)',
      height: 'var(--icon-size)',
      transitionDuration: 'fast',
      transitionProperty: 'all',
      transitionTimingFunction: 'default',
    },
    _peerHover: {
      bg: 'bg.input.hovered',
    },
    _open: {
      '& > svg': {
        transform: 'rotate(-180deg)',
        transformOrigin: 'center',
      },
    },
  },
};

const selectVariants = {
  size: {
    sm: {
      root: {
        '--icon-size': 'token(sizes.22)',
        '--icon-margin': 'token(sizes.2)',
        '--input-icon-padding': '[26px]',
        '--select-px': 'token(sizes.8)',
        '--select-slot-px': 'token(sizes.4)',
      },
      content: {
        py: '0',
        fontSize: '14',
      },
      chips: {
        gap: '3',
        py: '2',
      },
    },
    md: {
      root: {
        '--icon-size': 'token(sizes.24)',
        '--icon-margin': 'token(sizes.3)',
        '--input-icon-padding': '[31px]',
        '--select-px': 'token(sizes.10)',
        '--select-slot-px': 'token(sizes.6)',
      },
      content: {
        py: '3',
        fontSize: '16',
      },
      chips: {
        gap: '4',
        py: '5',
      },
    },
    lg: {
      root: {
        '--icon-size': 'token(sizes.24)',
        '--icon-margin': 'token(sizes.5)',
        '--input-icon-padding': '[34px]',
        '--select-px': 'token(sizes.12)',
        '--select-slot-px': 'token(sizes.8)',
      },
      content: {
        py: '7',
        fontSize: '16',
      },
      chips: {
        gap: '5',
        py: '0',
      },
    },
    xl: {
      root: {
        '--icon-size': 'token(sizes.28)',
        '--icon-margin': 'token(sizes.7)',
        '--input-icon-padding': '[42px]',
        '--select-px': 'token(sizes.16)',
        '--select-slot-px': 'token(sizes.10)',
      },
      content: {
        py: '9',
        fontSize: '20',
      },
      chips: {
        gap: '6',
        py: '2',
      },
    },
  },
  before: {
    true: {
      content: {
        ps: '0',
      },
    },
  },
  multiple: {
    true: {
      trigger: {
        alignItems: 'flex-start',
      },
      content: {
        alignItems: 'flex-start',
      },
    },
  },
  autoSize: {
    true: {
      trigger: {
        height: 'auto',
      },
      value: {
        whiteSpace: 'normal',
        textWrap: 'wrap',
        overflow: 'visible',
        textOverflow: 'clip',
      },
      placeholder: {
        whiteSpace: 'normal',
        textWrap: 'wrap',
        overflow: 'visible',
        textOverflow: 'clip',
      },
      chips: {
        flexWrap: 'wrap',
        overflowX: 'visible',
        overflowY: 'visible',
      },
    },
    false: {
      chips: {
        flexWrap: 'nowrap',
      },
    },
  },
};

export const selectRecipe = defineSlotRecipe({
  className: 'select',
  jsx: ['Select'],
  slots: [
    'root',
    'trigger',
    'content',
    'value',
    'placeholder',
    'chips',
    'before',
    'icon',
  ],
  base: selectBase,
  variants: selectVariants,
  defaultVariants: {
    size: 'md',
  },
});
