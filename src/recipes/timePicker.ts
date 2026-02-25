import { defineSlotRecipe } from '@pandacss/dev';

const timePickerBase = {
  root: {
    display: 'inline-flex',
    flexDirection: 'column',
    position: 'relative',
  },

  // The segmented input container — visually identical to textinput
  input: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2',
    width: 'full',
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
    fontFamily: 'body',
    lineHeight: 'default',
    cursor: 'text',
    userSelect: 'none',
    transitionDuration: 'fast',
    transitionProperty: 'background, border-color, outline-color',
    transitionTimingFunction: 'default',
    _focusWithin: {
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
      bg: 'bg.danger',
      borderColor: 'border.danger',
      color: 'text.danger',
      _hover: {
        bg: 'bg.danger.hovered',
        borderColor: 'border.danger',
      },
      _focusWithin: {
        bg: 'bg.danger',
        borderColor: 'border.danger',
        outlineColor: 'border.danger',
      },
      _open: {
        bg: 'bg.danger',
        borderColor: 'border.danger',
        outlineColor: 'border.danger',
      },
    },
  },

  // Individual focusable segment span (HH, MM, AM/PM)
  segment: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    borderRadius: '2',
    cursor: 'default',
    userSelect: 'none',
    fontVariantNumeric: 'tabular-nums',
    minWidth: '1.5em',
    textAlign: 'center',
    _focusVisible: {
      bg: 'bg.neutral.hovered',
    },
  },

  // The ":" separator between time segments
  separator: {
    color: 'text.subtlest',
    userSelect: 'none',
    display: 'inline-flex',
    alignItems: 'center',
  },

  // The floating time list container
  popover: {
    display: 'flex',
    flexDirection: 'row',
    bg: 'surface.overlay',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'border',
    borderRadius: '8',
    boxShadow: 'overlay',
    zIndex: 1000,
    overflow: 'hidden',
    outline: 'none',
    minWidth: '160',
  },

  // A single scrollable column (hours, minutes, or AM/PM)
  column: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    flex: 1,
    maxHeight: '200',
    scrollSnapType: 'y mandatory',
    borderRight: 'default',
    _last: {
      borderRight: 'none',
    },
    // Hide scrollbar visually but keep functionality
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none' as const,
    msOverflowStyle: 'none',
  },

  // Optional column header (e.g. "Hr", "Min")
  columnLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    py: '4',
    px: '8',
    fontSize: '11',
    fontWeight: 'medium',
    color: 'text.subtlest',
    textTransform: 'uppercase',
    letterSpacing: 'widest',
    borderBottom: 'default',
    position: 'sticky',
    top: '0',
    bg: 'surface.overlay',
    zIndex: 1,
    userSelect: 'none',
  },

  // Individual time option button in a column
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'full',
    py: '8',
    px: '8',
    fontSize: '14',
    cursor: 'pointer',
    outline: 'none',
    bg: 'transparent',
    border: 'none',
    color: 'text',
    scrollSnapAlign: 'start',
    transitionDuration: 'fast',
    transitionProperty: 'background, color',
    transitionTimingFunction: 'default',
    _hover: {
      bg: 'bg.neutral',
    },
    _focusVisible: {
      outlineWidth: '2',
      outlineStyle: 'solid',
      outlineColor: 'border.focused',
      outlineOffset: '-2',
    },
    _selected: {
      bg: 'bg.selected',
      color: 'text.selected',
      fontWeight: 'medium',
      _hover: {
        bg: 'bg.selected.hovered',
      },
    },
  },
};

const timePickerVariants = {
  size: {
    sm: {
      input: {
        py: 0,
        px: 8,
        fontSize: '14',
      },
    },
    md: {
      input: {
        py: 3,
        px: 10,
        fontSize: '16',
      },
    },
    lg: {
      input: {
        py: 7,
        px: 12,
        fontSize: '16',
      },
    },
  },
};

export const timePickerRecipe = defineSlotRecipe({
  className: 'timePicker',
  jsx: ['TimePicker', 'TimeRangePicker'],
  slots: [
    'root',
    'input',
    'segment',
    'separator',
    'popover',
    'column',
    'columnLabel',
    'listItem',
  ],
  base: timePickerBase,
  variants: timePickerVariants,
  defaultVariants: {
    size: 'md',
  },
});
