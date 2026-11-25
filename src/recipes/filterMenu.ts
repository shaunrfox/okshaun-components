import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

/**
 * The popup list of a filter field. Focus stays in the field's input, so the
 * active row is shown with the hover fill, not with focus.
 */
export const filterMenuRecipe = defineSlotRecipe({
  className: 'filterMenu',
  jsx: ['FilterMenu'],
  slots: ['root', 'listbox', 'checkbox', 'before', 'empty', 'footer'],
  base: {
    root: {
      ...globalBaseStyles,
      display: 'flex',
      flexDirection: 'column',
      w: 'xs',
      maxH: 'var(--available-height)',
      bg: 'surface',
      borderRadius: '4',
      boxShadow: 'overlay',
      overflow: 'hidden',
      outline: 'none',
    },
    listbox: {
      flex: '1',
      minH: '0',
      overflowY: 'auto',
      outline: 'none',
    },
    checkbox: {
      display: 'block',
      w: 'var(--list-item-icon-size)',
      h: 'var(--list-item-icon-size)',
    },
    before: {
      display: 'flex',
      alignItems: 'center',
      gap: '6',
    },
    empty: {
      px: '10',
      py: '6',
      color: 'text.subtlest',
      fontFamily: 'sans',
      fontSize: '14',
    },
    footer: {
      px: '10',
      py: '6',
      bg: 'surface.sunken',
      color: 'text.subtlest',
      fontFamily: 'sans',
      fontSize: '12',
    },
  },
  variants: {
    layer: {
      elevated: {
        root: { zIndex: 'elevated' },
      },
      modalFloating: {
        root: { zIndex: 'modalFloating' },
      },
    },
  },
  defaultVariants: {
    layer: 'elevated',
  },
});
