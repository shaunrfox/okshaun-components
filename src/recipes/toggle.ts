import { defineSlotRecipe } from '@pandacss/dev';

const toggleBase = {
  container: {
    position: 'relative',
    w: '40',
    h: '24',
    cursor: 'pointer',
    _disabled: {
      opacity: 0.4,
      pointerEvents: 'none',
      cursor: 'none',
      display: 'inline-grid',
    },
  },

  background: {
    position: 'absolute',
    w: '40',
    h: '24',
    rounded: '24',
    bg: { base: 'gray.0', _dark: 'gray.90' },
    transitionProperty: 'border-color, background-color',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-in-out',
    borderWidth: '2',
    borderStyle: 'solid',
    borderColor: { base: 'gray.20', _dark: 'gray.40' },
  },

  input: {
    position: 'absolute',
    opacity: 0,
    w: '40',
    h: '24',
    rounded: '24',
    m: 0,
    p: 0,
    border: 'none',
    zIndex: 0,
    cursor: 'inherit',

    "& ~ [name='circle']": {
      display: 'inline-grid',
      position: 'absolute',
      opacity: 1,
      transform: 'translateX(0)',
      transitionProperty: 'transform, opacity',
      transitionDuration: '200ms',
      transitionTimingFunction: 'ease-in-out',
    },

    "& ~ [name='circle-check']": {
      display: 'inline-grid',
      position: 'absolute',
      filter: { base: 'invert(100%)', _dark: 'invert(0%)' },
      opacity: 0,
      transform: 'translateX(0)',
      transitionProperty: 'transform, opacity',
      transitionDuration: '200ms',
      transitionTimingFunction: 'ease-in-out',
      // fill: {base: 'gray.90 !important', _dark: 'gray.0 !important'}
    },

    _checked: {
      "& ~ [name='circle']": {
        opacity: 0,
        transform: 'translateX(10px)',
      },
      "& ~ [name='circle-check']": {
        opacity: 1,
        transform: 'translateX(16px)',
      },
      "& ~ [name='toggle-bg']": {
        bg: { base: 'gray.90', _dark: 'gray.0' },
        borderColor: { base: 'gray.90 !important', _dark: 'gray.0 !important' },
      },
    },
    _error: {
      "& ~ [name='toggle-bg']": {
        borderColor: 'error.default',
      },
    },

    _focusVisible: {
      appearance: 'none',
      opacity: 1,
      outlineColor: { base: 'gray.80', _dark: 'gray.5' },
      outlineOffset: 1,
      outlineWidth: 2,
      outlineStyle: 'solid',
      rounded: '24',
      w: '40',
      h: '24',
    },
  },

  indicator: {
    display: 'none',
    w: '24',
    h: '24',
    transitionProperty: 'border-color, background-color',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-in-out',
    "&:is([name='circle'])": {
      fill: { base: 'gray.20 !important', _dark: 'gray.40 !important' },
    },
  },
};

export const toggleRecipe = defineSlotRecipe({
  className: 'toggle',
  jsx: ['toggle'],
  slots: ['container', 'input', 'indicator', 'background'],
  base: toggleBase,
});
