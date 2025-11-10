import { defineSlotRecipe } from '@pandacss/dev';

export const checkboxRecipe = defineSlotRecipe({
  className: 'checkbox',
  jsx: ['Checkbox'],
  slots: ['container', 'input', 'indicator'],
  base: {
    container: {
      position: 'relative',
      display: 'inline-grid',
      gridTemplateColumns: 'auto 1fr',
      gap: 4,
      alignItems: 'start',
      cursor: 'pointer',
      userSelect: 'none',
    },
    input: {
      position: 'absolute',
      opacity: 0,
      width: 'full',
      height: 'full',
      margin: '0',
      padding: '0',
      zIndex: 1,
      cursor: 'inherit',
      "& ~ [name='checkbox']": {
        display: 'inline-grid',
      },
      _checked: {
        "& ~ [name='checkbox-checked']": {
          display: 'inline-grid',
          fill: { base: 'gray.90', _dark: 'gray.0' },
        },
        "& ~ [name='checkbox']": {
          display: 'none',
        },
      },
      _indeterminate: {
        "& ~ [name='checkbox-indeterminate']": {
          display: 'inline-grid',
          fill: { base: 'gray.90', _dark: 'gray.0' },
          _disabled: {},
        },
        "& ~ [name='checkbox']": {
          display: 'none',
        },
      },
      _disabled: {
        '& ~ svg': {
          opacity: 0.4,
          pointerEvents: 'none',
          cursor: 'none',
        },
        display: 'inline-grid',
      },
      _error: {
        display: 'inline-grid',
        '& ~ svg': {
          fill: { base: 'error.default', _dark: 'error.default' },
        },
      },
      _focusVisible: {
        "& ~ [name='checkbox-focus']": {
          display: 'inline-grid',
          position: 'absolute',
          fill: { base: 'gray.90', _dark: 'gray.1' },
        },
      },
    },
    indicator: {
      placeContent: 'center',
      display: 'none',
      width: 24,
      height: 24,
      "& ~ [name='checkbox']": {
        display: 'inline-grid',
        fill: { base: 'gray.30', _dark: 'gray.20' },
      },
    },
  },
});
