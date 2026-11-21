import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

const keyFactBase = {
  root: {
    ...globalBaseStyles,
    display: 'flex',
    minW: '0',
    maxW: 'full',
  },
  label: {
    flex: 'none',
    whiteSpace: 'nowrap',
  },
  // The label's text renders in these, through Box. Box resets font and color,
  // so they take both from the label.
  labelWithColon: {
    color: 'inherit',
    fontFamily: 'inherit',
    fontVariationSettings: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
  },
  labelPlain: {
    color: 'inherit',
    fontFamily: 'inherit',
    fontVariationSettings: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
  },
  value: {
    display: 'flex',
    minW: '0',
    // The truncation tooltip wraps the value in a span. Let it shrink so the
    // value can truncate.
    '& > span': {
      w: 'full',
      minW: '0',
    },
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    flex: 'none',
    gap: '2',
    ms: '4',
  },
  text: {
    display: 'block',
    minW: '0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
};

const keyFactVariants = {
  /**
   * `horizontal` reads "Label: Value" on one line, for a page header `aside`.
   * `vertical` stacks the label over a larger value, for a facts strip.
   */
  // Each layout sets every property the other one sets, so a conditional
  // layout switches cleanly at a breakpoint. The label renders in both forms,
  // and the layout shows one.
  layout: {
    horizontal: {
      root: { flexDirection: 'row', alignItems: 'center', gap: '4' },
      // A text style sets its own color, so set the label color after it.
      label: { textStyle: 'sans.sm', color: 'text.subtle' },
      labelWithColon: { display: 'inline' },
      labelPlain: { display: 'none' },
      value: { textStyle: 'sans.sm' },
    },
    vertical: {
      root: { flexDirection: 'column', alignItems: 'stretch', gap: '2' },
      label: { textStyle: 'sans.sm', color: 'text.subtle' },
      labelWithColon: { display: 'none' },
      labelPlain: { display: 'inline' },
      value: { textStyle: 'sans.lg' },
    },
  },
  /** Replaces the value with a text input. */
  editing: {
    true: {
      root: { w: '280' },
      value: { flex: '1' },
    },
    false: {},
  },
};

export const keyFactRecipe = defineSlotRecipe({
  className: 'keyFact',
  jsx: ['KeyFact'],
  slots: [
    'root',
    'label',
    'labelWithColon',
    'labelPlain',
    'value',
    'text',
    'actions',
  ],
  base: keyFactBase,
  variants: keyFactVariants,
  defaultVariants: {
    layout: 'horizontal',
    editing: false,
  },
});
