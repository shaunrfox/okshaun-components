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
    bg: 'surface',
    transitionProperty: 'border-color, background-color',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-in-out',
    borderWidth: '2',
    borderStyle: 'solid',
    borderColor: 'border',
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
    zIndex: 'base',
    cursor: 'inherit',

    "& ~ [name='circle']": {
      display: 'inline-grid',
      position: 'absolute',
      opacity: 1,
      transform: 'translateX(0)',
      transitionProperty: 'transform, opacity',
      transitionDuration: '200ms',
      transitionTimingFunction: 'ease-in-out',
      fill: 'icon.decorative/80',
    },

    "& ~ [name='circle-check']": {
      display: 'inline-grid',
      position: 'absolute',
      opacity: 0,
      transform: 'translateX(0)',
      transitionProperty: 'transform, opacity',
      transitionDuration: '200ms',
      transitionTimingFunction: 'ease-in-out',
    },

    _checked: {
      "& ~ [name='circle']": {
        opacity: 0,
        transform: 'translateX(10px)',
      },
      "& ~ [name='circle-check']": {
        opacity: 1,
        transform: 'translateX(16px)',
        fill: 'icon.inverse',
      },
      "& ~ [name='toggle-bg']": {
        bg: 'bg.neutral.inverse',
        borderColor: 'bg.neutral.inverse',
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
      outlineColor: { base: 'gray.80', _dark: 'gray.10' },
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
      fill: { base: 'gray.20', _dark: 'gray.40' },
    },
  },
};

export const toggleRecipe = defineSlotRecipe({
  className: 'toggle',
  jsx: ['toggle'],
  slots: ['container', 'input', 'indicator', 'background'],
  base: toggleBase,
});
