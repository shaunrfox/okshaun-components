import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

// Shared low-level styling for segmented input guts (MM/DD/YYYY, HH:MM AM/PM,
// account-style part numbers, phone-like segments, etc). Higher-level input
// wrappers own border, background, padding, validation, and open/focus state.
const segmentedInputsBase = {
  root: {
    ...globalBaseStyles,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0',
    width: 'fit',
    color: 'text',
    fontFamily: 'mono',
    lineHeight: 'default',
    cursor: 'text',
    userSelect: 'none',
    flexGrow: '0',
    flexShrink: '0',
    flexBasis: 'fit',
    minW: '0',
    _disabled: {
      color: 'text.disabled',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },

  // Individual focusable segment span (MM, DD, YYYY, HH, AM/PM, ...)
  segment: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    borderRadius: '2',
    cursor: 'default',
    userSelect: 'none',
    fontFamily: 'mono',
    fontVariantsProperty: 'mono',
    fontVariantNumeric: 'tabular-nums',
    textAlign: 'center',
    color: 'text',
    _focus: {
      bg: 'bg.accent.gold.subtlest/75',
    },
    _groupDisabled: {
      color: 'text.disabled',
    },
  },

  // The "/" or ":" or " " literal between segments. `minWidth: '0.75em'`
  // is a deliberate floor, not decoration — the " " separators (minute/AM-PM,
  // and the gap between a DateTimeInput's date/time halves) render at 0
  // layout width in the Recursive Variable font at this size/axis regardless
  // of `whiteSpace: 'pre'` (confirmed: real space character, zero measured
  // width) — a font-rendering quirk, not a whitespace-collapsing bug. The
  // floor keeps the visual gap independent of what the glyph itself measures.
  separator: {
    color: 'text.placeholder',
    textAlign: 'center',
    userSelect: 'none',
    whiteSpace: 'pre',
    minWidth: '0.75em',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&[data-gap=none]': {
      minWidth: '0',
      px: '0',
    },
    '&[data-gap=tight]': {
      minWidth: '0.5em',
      px: '1',
    },
    '&[data-gap=normal]': {
      minWidth: '0.75em',
      px: '1',
    },
    '&[data-gap=loose]': {
      minWidth: '1.25em',
      px: '2',
    },
  },
};

const segmentedInputsVariants = {
  size: {
    sm: { root: { fontSize: '14' } },
    md: { root: { fontSize: '16' } },
    lg: { root: { fontSize: '16' } },
    xl: { root: { fontSize: '20' } },
  },
};

export const segmentedInputsRecipe = defineSlotRecipe({
  className: 'segmentedInputs',
  jsx: ['SegmentedInputs', 'SegmentedInput', 'SegmentedDate', 'SegmentedTime'],
  slots: ['root', 'segment', 'separator'],
  base: segmentedInputsBase,
  variants: segmentedInputsVariants,
  defaultVariants: {
    size: 'md',
  },
});
