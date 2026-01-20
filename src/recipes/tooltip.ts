import { defineSlotRecipe } from '@pandacss/dev';

const tooltipBase = {
  wrapper: {
    position: 'relative',
    width: 'fit-content',
    height: 'fit-content',
    cursor: 'default',
  },
  tooltipContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
    bg: { base: 'gray.90', _dark: 'gray.10' },
    color: { base: 'gray.10', _dark: 'gray.90' },
    fontFamily: 'sans',
    fontWeight: 'normal',
    borderRadius: '4',
    position: 'absolute',
    maxWidth: 'max-content',
    width: 'max-content',
    boxShadow: 'medium',
    zIndex: 1,
    pointerEvents: 'none',
    _after: {
      content: "''",
      position: 'absolute',
      width: '0',
      height: '0',
      borderWidth: '9',
      borderStyle: 'solid',
      borderColor: 'transparent',
    },
  },
  title: {
    fontWeight: 'bold',
    color: 'text',
  },
  text: {
    color: 'text.subtlest',
  },
};

const tooltipVariants = {
  position: {
    top: {
      tooltipContent: {
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: 1,
        _after: {
          top: '100%',
          left: '50%',
          transform: 'translate(-50%, -2%)',
          borderTopColor: { base: 'gray.90', _dark: 'gray.10' },
        },
      },
    },
    bottom: {
      tooltipContent: {
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        _after: {
          bottom: '100%',
          left: '50%',
          transform: 'translate(-50%, 2%)',
          borderBottomColor: { base: 'gray.90', _dark: 'gray.10' },
        },
      },
    },
    left: {
      tooltipContent: {
        top: '50%',
        right: 'calc(100% - 0.75rem)',
        transform: 'translate(-10%, -50%)',
        _after: {
          top: '50%',
          right: '-6%',
          transform: 'translate(48%, -50%)',
          borderLeftColor: { base: 'gray.90', _dark: 'gray.10' },
        },
      },
    },
    right: {
      tooltipContent: {
        top: '50%',
        left: `calc(100% - 0.75rem)`,
        transform: 'translate(10%, -50%)',
        _after: {
          top: '50%',
          left: '-6%',
          transform: 'translate(-48%, -50%)',
          borderRightColor: { base: 'gray.90', _dark: 'gray.10' },
        },
      },
    },
    'top-start': {
      tooltipContent: {
        bottom: '100%',
        left: '0',
        _after: {
          top: '100%',
          left: '8',
          transform: 'translate(0, -2%)',
          borderTopColor: { base: 'gray.90', _dark: 'gray.10' },
        },
      },
    },
    'bottom-start': {
      tooltipContent: {
        top: '100%',
        left: '0',
        transform: 'translateX(0)',
        _after: {
          bottom: '100%',
          left: '8',
          transform: 'translate(0%, 2%)',
          borderBottomColor: { base: 'gray.90', _dark: 'gray.10' },
        },
      },
    },
    'left-start': {
      tooltipContent: {
        top: '0',
        right: 'calc(100% - 0.75rem)',
        transform: 'translate(-10%, -0%)',
        _after: {
          top: '8',
          right: '-6%',
          transform: 'translate(48%, 0)',
          borderLeftColor: { base: 'gray.90', _dark: 'gray.10' },
        },
      },
    },
    'right-start': {
      tooltipContent: {
        top: '0',
        left: `calc(100% - 0.75rem)`,
        transform: 'translate(10%, 0%)',
        _after: {
          top: '8',
          left: '-6%',
          transform: 'translate(-48%, 0)',
          borderRightColor: { base: 'gray.90', _dark: 'gray.10' },
        },
      },
    },
    'top-end': {
      tooltipContent: {
        bottom: '100%',
        right: '0',
        _after: {
          top: '100%',
          right: '8',
          transform: 'translate(0, -2%)',
          borderTopColor: { base: 'gray.90', _dark: 'gray.10' },
        },
      },
    },
    'bottom-end': {
      tooltipContent: {
        top: '100%',
        right: '0',
        transform: 'translateX(0)',
        _after: {
          bottom: '100%',
          right: '8',
          transform: 'translate(0%, 2%)',
          borderBottomColor: { base: 'gray.90', _dark: 'gray.10' },
        },
      },
    },
    'left-end': {
      tooltipContent: {
        bottom: '0',
        right: 'calc(100% - 0.75rem)',
        transform: 'translate(-10%, -0%)',
        _after: {
          bottom: '8',
          right: '-6%',
          transform: 'translate(48%, 0)',
          borderLeftColor: { base: 'gray.90', _dark: 'gray.10' },
        },
      },
    },
    'right-end': {
      tooltipContent: {
        bottom: '0',
        left: `calc(100% - 0.75rem)`,
        transform: 'translate(10%, -0%)',
        _after: {
          bottom: '8',
          left: '-6%',
          transform: 'translate(-48%, 0)',
          borderRightColor: { base: 'gray.90', _dark: 'gray.10' },
        },
      },
    },
  },
  caret: {
    true: {
      tooltipContent: {
        _after: {
          display: 'block',
        },
      },
      _position: {
        top: {
          tooltipContent: {
            mb: '12',
          },
        },
      },
    },
    false: {
      tooltipContent: {
        _after: {
          display: 'none',
        },
      },
      _position: {
        top: {
          tooltipContent: {
            mb: '8',
          },
        },
      },
    },
  },
  size: {
    sm: {
      tooltipContent: {
        py: '4',
        px: '8',
      },
      title: {
        fontSize: '12',
      },
      text: {
        fontSize: '12',
      },
    },
    md: {
      tooltipContent: {
        py: '8',
        px: '12',
      },
      title: {
        fontSize: '14',
      },
      text: {
        fontSize: '14',
      },
    },
    lg: {
      tooltipContent: {
        py: '12',
        px: '16',
      },
      title: {
        fontSize: '16',
      },
      text: {
        fontSize: '16',
      },
    },
  },
};

export const tooltipRecipe = defineSlotRecipe({
  className: 'tooltip',
  jsx: ['Tooltip'],
  slots: ['wrapper', 'tooltipContent', 'title', 'text'],
  base: tooltipBase,
  variants: {
    ...tooltipVariants,
  },
  defaultVariants: {
    position: 'bottom',
    caret: true,
    size: 'md',
  },
  compoundVariants: [
    {
      position: ['top', 'top-start', 'top-end'],
      caret: true,
      css: {
        tooltipContent: {
          mb: '12',
        },
      },
    },
    {
      position: ['top', 'top-start', 'top-end'],
      caret: false,
      css: {
        tooltipContent: {
          mb: '8',
        },
      },
    },
    {
      position: ['bottom', 'bottom-start', 'bottom-end'],
      caret: true,
      css: {
        tooltipContent: {
          mt: '12',
        },
      },
    },
    {
      position: ['bottom', 'bottom-start', 'bottom-end'],
      caret: false,
      css: {
        tooltipContent: {
          mt: '8',
        },
      },
    },
    {
      position: ['left', 'left-start', 'left-end'],
      caret: true,
      css: {
        tooltipContent: {
          mr: '12',
        },
      },
    },
    {
      position: ['left', 'left-start', 'left-end'],
      caret: false,
      css: {
        tooltipContent: {
          mr: '8',
        },
      },
    },
    {
      position: ['right', 'right-start', 'right-end'],
      caret: true,
      css: {
        tooltipContent: {
          ml: '12',
        },
      },
    },
    {
      position: ['right', 'right-start', 'right-end'],
      caret: false,
      css: {
        tooltipContent: {
          ml: '8',
        },
      },
    },
  ],
});
