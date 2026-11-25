import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

/**
 * The filter bar's field: a search icon, the filter tokens, one text input,
 * a "+N more" button for tokens that do not fit, and a clear-all button.
 * The frame matches the `Autocomplete` control.
 */
export const filterFieldRecipe = defineSlotRecipe({
  className: 'filterField',
  jsx: ['FilterField'],
  slots: [
    'root',
    'icon',
    'values',
    'sizer',
    'token',
    'input',
    'more',
    'shortcut',
    'clear',
  ],
  base: {
    root: {
      ...globalBaseStyles,
      '--filter-field-gap': 'token(sizes.6)',
      '--filter-field-input-min': 'token(sizes.120)',
      display: 'flex',
      alignItems: 'center',
      gap: '8',
      w: 'full',
      minW: '0',
      minH: '40',
      ps: '10',
      pe: '4',
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
      _disabled: {
        bg: 'bg.disabled',
        borderColor: 'border.disabled',
        color: 'text.disabled',
        cursor: 'not-allowed',
      },
    },
    icon: {
      flexShrink: '0',
    },
    values: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--filter-field-gap)',
      flex: '1',
      minW: '0',
    },
    // Spans the values area so the overflow hook reads its width. The end
    // padding keeps room for the input.
    sizer: {
      position: 'absolute',
      inset: '0',
      columnGap: 'var(--filter-field-gap)',
      pe: 'calc(var(--filter-field-input-min) + var(--filter-field-gap))',
      visibility: 'hidden',
      pointerEvents: 'none',
    },
    token: {
      display: 'inline-flex',
      flexShrink: '0',
      // A token behind "+N more" stays in the DOM, so its width can be read.
      '&[data-overflowed]': {
        position: 'absolute',
        insetInlineStart: '0',
        visibility: 'hidden',
        pointerEvents: 'none',
      },
    },
    input: {
      flex: '1',
      minW: 'var(--filter-field-input-min)',
      h: '28',
      p: '0',
      bg: 'transparent',
      color: 'text',
      fontFamily: 'sans',
      fontSize: '14',
      borderWidth: '0',
      outline: 'none',
      _placeholder: {
        color: 'text.placeholder',
      },
      _disabled: {
        cursor: 'not-allowed',
      },
      // Inside a token, the input is as wide as its text.
      '&[data-inline]': {
        flex: 'none',
        minW: '0',
        h: '22',
      },
    },
    more: {
      flexShrink: '0',
      '&[data-pending]': {
        borderStyle: 'dashed',
      },
      '&[data-open]': {
        borderColor: 'border.focused',
      },
    },
    shortcut: {
      flexShrink: '0',
      // At the end of the field, the hint lines up with the start padding.
      me: '6',
      '[data-has-clear] &': {
        me: '0',
      },
    },
    clear: {
      flexShrink: '0',
    },
  },
});
