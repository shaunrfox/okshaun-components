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
    fontFamily: 'mono',
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
      borderColor: 'border.danger',
      _hover: {
        borderColor: 'border.danger',
      },
      _focusWithin: {
        borderColor: 'border.danger',
        outlineColor: 'border.danger',
      },
      _open: {
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
    borderRadius: '{sizes.2}',
    cursor: 'default',
    userSelect: 'none',
    fontFamily: 'mono',
    fontVariantsProperty: 'mono',
    fontVariantNumeric: 'tabular-nums',
    minWidth: '{sizes.24}',
    textAlign: 'center',
    color: 'text',
    _focusVisible: {
      bg: 'bg.neutral.hovered',
    },
    _groupDisabled: {
      color: 'text.disabled',
    },
  },

  // The "/" or " " literal between date segments
  separator: {
    color: 'text.placeholder',
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
    zIndex: '1000',
    width: '280',
    overflow: 'hidden',
    outline: 'none',
  },

  // Month/year navigation row
  calendarHeader: {
    fontFamily: 'mono',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: '8',
    py: '8',
    borderBottom: 'default',
    gap: '4',
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
    userSelect: 'none',
  },

  // Individual day button in the grid
  day: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'mono',
    width: '32',
    height: '32',
    _today: {
      fontWeight: 'bold',
      color: 'text.selected',
      bg: 'bg.selected',
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
        py: '0',
        px: '8',
        fontSize: '14',
      },
    },
    md: {
      input: {
        py: '3',
        px: '10',
        fontSize: '16',
      },
    },
    lg: {
      input: {
        py: '7',
        px: '12',
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
