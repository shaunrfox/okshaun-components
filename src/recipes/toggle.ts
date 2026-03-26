import { defineSlotRecipe } from '@pandacss/dev';

export const toggleRecipe = defineSlotRecipe({
  className: 'toggle',
  jsx: ['Toggle'],
  slots: ['container', 'input', 'indicator'],
  base: {
    container: {
      position: 'relative',
      w: '32',
      h: '20',
      my: '2',
      rounded: '20',
      bg: 'surface',
      cursor: 'pointer',
      transitionProperty: 'border-color, background-color',
      transitionDuration: 'default',
      transitionTimingFunction: 'ease-in-out',
      borderWidth: '2',
      borderStyle: 'solid',
      borderColor: 'icon.decorative.subtle',
      '&:has(input:checked)': {
        bg: 'bg.neutral.inverse',
        borderColor: 'transparent',
      },
      _error: {
        borderColor: 'border.danger',
      },
      '&:has(:focus-visible)': {
        appearance: 'none',
        opacity: '[1]',
        outlineColor: 'border.focused',
        outlineOffset: '1',
        outlineWidth: '2',
        outlineStyle: 'solid',
        rounded: '20',
        w: '32',
        h: '20',
      },
    },

    input: {
      position: 'absolute',
      opacity: '[0]',
      w: '32',
      h: '20',
      m: '-2',
      p: '0',
      border: 'none',
      zIndex: 'base',
      cursor: 'inherit',
    },

    indicator: {
      display: 'none',
      w: '20',
      h: '20',
      m: '-2',
      transitionProperty: 'transform, opacity',
      transitionDuration: '200ms',
      transitionTimingFunction: 'ease-in-out',

      "&:is([name='circle'])": {
        display: 'inline-grid',
        position: 'absolute',
        opacity: '[1]',
        fill: 'icon.decorative.subtle',
        transform: '[translateX(0)]',
        'input:checked ~ &': {
          opacity: '[0]',
          transform: '[translateX(8px)]',
        },
      },

      "&:is([name='circle-check'])": {
        display: 'inline-grid',
        position: 'absolute',
        opacity: 'inherit',
        transform: '[translateX(0)]',
        fill: 'icon.inverse',
        'input:checked ~ &': {
          opacity: '[1]',
          transform: '[translateX(12px)]',
          fill: 'icon.inverse',
        },
      },
    },
  },
});
