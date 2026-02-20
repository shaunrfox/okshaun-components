import { defineSlotRecipe } from '@pandacss/dev';

const datePickerBase = {
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
      _focusWithin: {
        bg: 'bg.danger',
        borderColor: 'border.danger',
        outlineColor: 'border.danger',
      },
    },
  },

  // Individual focusable segment span (MM, DD, YYYY)
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
    color: 'text',
    _focusVisible: {
      bg: 'bg.selected',
      color: 'text.selected',
    },
  },

  // The "/" or " " literal between date segments
  separator: {
    color: 'text.subtlest',
    userSelect: 'none',
    display: 'inline-flex',
    alignItems: 'center',
  },

  // The floating calendar container
  popover: {
    display: 'flex',
    flexDirection: 'column',
    bg: 'surface.overlay',
    borderWidth: '1',
    borderStyle: 'solid',
    borderColor: 'border',
    borderRadius: '8',
    boxShadow: 'overlay',
    zIndex: 1000,
    width: '280',
    overflow: 'hidden',
    outline: 'none',
  },

  // Month/year navigation row
  calendarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: '8',
    py: '8',
    borderBottom: 'default',
    gap: '4',
  },

  // Previous/next month icon buttons
  navButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28',
    height: '28',
    borderRadius: '4',
    cursor: 'pointer',
    color: 'icon.subtle',
    outline: 'none',
    bg: 'transparent',
    border: 'none',
    flexShrink: 0,
    transitionDuration: 'fast',
    transitionProperty: 'background, color',
    transitionTimingFunction: 'default',
    _hover: {
      bg: 'bg.neutral',
      color: 'icon',
    },
    _focusVisible: {
      outlineWidth: '2',
      outlineStyle: 'solid',
      outlineColor: 'border.focused',
      outlineOffset: '-1',
    },
    _disabled: {
      opacity: 0.3,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },

  // 7-column grid for the days
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '2',
    px: '8',
    py: '4',
    pb: '8',
  },

  // Su Mo Tu We Th Fr Sa column headers
  weekdayLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '28',
    fontSize: '12',
    fontWeight: 'medium',
    color: 'text.subtlest',
    userSelect: 'none',
  },

  // Individual day button in the grid
  day: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32',
    height: '32',
    borderRadius: '4',
    fontSize: '14',
    cursor: 'pointer',
    outline: 'none',
    bg: 'transparent',
    border: 'none',
    color: 'text',
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
      outlineOffset: '-1',
    },
    _today: {
      fontWeight: 'bold',
      color: 'text.selected',
    },
    _selected: {
      bg: 'bg.selected.bold',
      color: 'text.inverse',
      _hover: {
        bg: 'bg.selected.bold.hovered',
      },
      _today: {
        bg: 'bg.selected.bold',
        color: 'text.inverse',
      },
    },
    _unavailable: {
      color: 'text.disabled',
      cursor: 'not-allowed',
      pointerEvents: 'none',
      _hover: {
        bg: 'transparent',
      },
    },
  },
};

const datePickerVariants = {
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

export const datePickerRecipe = defineSlotRecipe({
  className: 'datePicker',
  jsx: ['DatePicker', 'DateRangePicker'],
  slots: [
    'root',
    'input',
    'segment',
    'separator',
    'popover',
    'calendarHeader',
    'navButton',
    'calendarGrid',
    'weekdayLabel',
    'day',
  ],
  base: datePickerBase,
  variants: datePickerVariants,
  defaultVariants: {
    size: 'md',
  },
});
