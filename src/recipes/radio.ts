import { defineSlotRecipe } from '@pandacss/dev';

export const radioRecipe = defineSlotRecipe({
  className: 'radio',
  jsx: ['Radio'],
  slots: ['container', 'input', 'indicator', 'radioBg'],
  base: {
    container: {
      position: 'relative',
      w: '24',
      h: '24',
      display: 'inline-grid',
      placeContent: 'center',
      gridTemplateColumns: 'auto 1fr',
      alignItems: 'start',
      cursor: 'pointer',
      userSelect: 'none',
    },
    input: {
      position: 'absolute',
      opacity: '0',
      width: 'full',
      height: 'full',
      margin: '0',
      padding: '0',
      zIndex: 'raised',
      cursor: 'inherit',
      "& ~ [name='radio']": {
        display: 'inline-grid',
        zIndex: 'zIndex.3',
      },
      _checked: {
        "& ~ [name='radio-checked']": {
          display: 'inline-grid',
          fill: 'icon',
          zIndex: 'zIndex.2',
        },
        "& ~ [name='radio']": {
          display: 'none',
        },
      },
      _error: {
        display: 'inline-grid',
        '& ~ svg:not([name="circle"])': {
          fill: 'red.50',
          zIndex: 'zIndex.3',
        },
      },
      _focusVisible: {
        "& ~ [name='radio-focus']": {
          display: 'inline-grid',
          position: 'absolute',
          fill: 'border.focused',
          zIndex: 'zIndex.2',
        },
      },
    },
    indicator: {
      display: 'none',
      position: 'absolute',
      inset: '0',
      width: '24',
      height: '24',
      zIndex: 'zIndex.3',
      "&:is([name='radio'])": {
        fill: 'icon.subtlest',
        zIndex: 'zIndex.3',
      },
    },
    radioBg: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '24',
      height: '24',
      fill: 'surface',
      zIndex: 'base',
    },
  },
});
