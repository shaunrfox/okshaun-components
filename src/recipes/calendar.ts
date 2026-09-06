import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

export const calendarRecipe = defineSlotRecipe({
  className: 'calendar',
  jsx: ['Calendar'],
  slots: ['root', 'header', 'grid', 'weekdayLabel', 'day', 'monthYearGrid'],
  base: {
    root: {
      ...globalBaseStyles,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      bg: 'surface',
      width: '278',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '4',
      width: 'full',
      p: '8',
      borderBottom: 'default',
      fontFamily: 'mono',
      fontVariantsProperty: 'mono',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
      gap: '4',
      width: 'fit',
      p: '8',
      mx: 'auto',
    },
    weekdayLabel: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
    },
    day: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'mono',
      width: '32',
      height: '32',
      minWidth: '32',
      _today: {
        outline: '1px solid {colors.border.focused}',
        outlineOffset: '1',
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
    monthYearGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      gap: '4',
      width: 'full',
      p: '8',
    },
  },
  variants: {
    type: {
      days: {},
      months: {
        day: {
          width: 'auto',
          px: '8',
        },
      },
      years: {
        day: {
          width: 'auto',
          px: '8',
        },
      },
    },
  },
  defaultVariants: {
    type: 'days',
  },
});
