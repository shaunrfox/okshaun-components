import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

const partButtonStyles = {
  appearance: 'none',
  cursor: 'pointer',
  _hover: {
    bg: 'bg.neutral.hovered',
  },
  _active: {
    bg: 'bg.neutral.pressed',
  },
  _focusVisible: {
    outlineColor: 'border.focused',
  },
  _disabled: {
    cursor: 'not-allowed',
    _hover: { bg: 'transparent' },
  },
};

/**
 * One filter in a filter field: field, operator, value, then remove.
 * States are data attributes on the root, so a state picked at runtime
 * never depends on generated variant classes.
 */
export const filterTokenRecipe = defineSlotRecipe({
  className: 'filterToken',
  jsx: ['FilterToken'],
  slots: [
    'root',
    'part',
    'field',
    'operator',
    'value',
    'valueText',
    'count',
    'editor',
    'remove',
  ],
  base: {
    root: {
      ...globalBaseStyles,
      display: 'inline-flex',
      alignItems: 'center',
      flexShrink: '0',
      maxW: 'full',
      h: '28',
      ps: '2',
      pe: '2',
      borderWidth: '1',
      borderStyle: 'solid',
      borderColor: 'border',
      borderRadius: '4',
      bg: 'bg.neutral',
      color: 'text',
      fontFamily: 'sans',
      fontSize: '14',
      whiteSpace: 'nowrap',
      transitionDuration: 'fast',
      transitionProperty: 'background, border-color, opacity',
      transitionTimingFunction: 'default',
      // Lets every part shrink, the tooltip wrapper around the value included.
      '& > *': {
        minW: '0',
      },
      '&[data-state=editing]': {
        bg: 'surface',
        borderColor: 'border.focused',
      },
      '&[data-state=pending]': {
        bg: 'surface',
        borderColor: 'border.bold',
        borderStyle: 'dashed',
      },
      '&[data-state=removing]': {
        bg: 'surface',
        borderColor: 'border.bold',
        borderStyle: 'dashed',
        opacity: '[0.6]',
      },
      '&[data-state=armed]': {
        bg: 'bg.neutral.hovered',
        borderColor: 'border.focused',
      },
      '&[data-disabled]': {
        opacity: '[0.6]',
      },
    },
    part: {
      ...globalBaseStyles,
      display: 'inline-flex',
      alignItems: 'center',
      minW: '0',
      h: '22',
      px: '4',
      bg: 'transparent',
      borderWidth: '0',
      borderRadius: '2',
      outlineWidth: '2',
      outlineStyle: 'solid',
      outlineColor: 'transparent',
      outlineOffset: '-2',
      fontFamily: 'sans',
      fontSize: '14',
      lineHeight: 'tight',
      textAlign: 'start',
      'button&': partButtonStyles,
      '[data-state=removing] &': {
        textDecoration: 'line-through',
      },
    },
    field: {
      color: 'text',
    },
    operator: {
      color: 'text.subtlest',
      // A locked operator reads as part of the sentence, not as a control.
      '&[data-locked]': {
        cursor: 'default',
      },
      '[data-tone=exclude] > &': {
        color: 'text.danger',
        bg: 'bg.danger',
        _hover: { bg: 'bg.danger.hovered' },
      },
    },
    value: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4',
      color: 'text',
      fontWeight: 'medium',
    },
    // A long single value truncates. The +N count after it always stays visible.
    valueText: {
      minW: '0',
      color: 'text',
      maxW: '240',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    count: {
      flexShrink: '0',
      color: 'text.subtle',
    },
    editor: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4',
      ps: '4',
      cursor: 'text',
    },
    remove: {
      ...globalBaseStyles,
      appearance: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: '0',
      w: '20',
      h: '20',
      ms: '2',
      p: '0',
      bg: 'transparent',
      borderWidth: '0',
      borderRadius: '2',
      outlineWidth: '2',
      outlineStyle: 'solid',
      outlineColor: 'transparent',
      outlineOffset: '-2',
      cursor: 'pointer',
      _icon: {
        fill: 'icon.subtle',
      },
      _hover: {
        bg: 'bg.neutral.hovered',
        _icon: { fill: 'icon' },
      },
      _focusVisible: {
        outlineColor: 'border.focused',
      },
      _disabled: {
        cursor: 'not-allowed',
      },
    },
  },
});
