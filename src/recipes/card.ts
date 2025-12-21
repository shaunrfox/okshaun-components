import { defineRecipe } from '@pandacss/dev';

const interactiveHoverStyles = {
  cursor: 'pointer',
  transition: 'all',
  _hover: {
    bg: 'surface',
    boxShadow: 'elevated',
  },
  _focusVisible: {
    bg: 'surface',
    boxShadow: 'elevated',
    borderWidth: '1',
    outlineColor: 'border.focused',
    borderColor: 'border.focused',
  },
  _disabled: {
    opacity: '0.4',
    cursor: 'not-allowed',
  },
};

export const cardRecipe = defineRecipe({
  className: 'card',
  jsx: ['Card'],
  base: {
    display: 'block',
    textAlign: 'left',
    bg: 'surface',
    borderRadius: '8',
    outlineWidth: '1',
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    outlineOffset: '0',
  },
  variants: {
    appearance: {
      default: {
        bg: 'surface.raised',
        boxShadow: 'raised',
        borderWidth: '1',
        borderColor: 'transparent',
      },
      flat: {
        borderWidth: '1',
        borderStyle: 'solid',
        borderColor: 'border',
        boxShadow: 'zero',
      },
      sunken: {
        bg: 'surface.sunken',
        borderWidth: '1',
        borderStyle: 'solid',
        borderColor: 'transparent',
      },
      ghost: {
        bg: 'transparent',
        borderWidth: '1',
        borderStyle: 'solid',
        borderColor: 'transparent',
      },
      overlay: {
        bg: 'surface.overlay',
        boxShadow: 'overlay',
        borderWidth: '1',
        borderColor: 'transparent',
      },
    },
    interactive: {
      true: {
        cursor: 'pointer',
      },
      false: {
        cursor: 'default',
      },
    },
  },
  compoundVariants: [
    // Default + interactive
    {
      appearance: 'default',
      interactive: true,
      css: {
        ...interactiveHoverStyles,
        _disabled: {
          _hover: {
            boxShadow: 'raised',
          },
        },
      },
    },
    // Flat + interactive
    {
      appearance: 'flat',
      interactive: true,
      css: {
        ...interactiveHoverStyles,
        _disabled: {
          _hover: {
            boxShadow: 'none',
          },
        },
      },
    },
    // Sunken + interactive
    {
      appearance: 'sunken',
      interactive: true,
      css: {
        ...interactiveHoverStyles,
        _disabled: {
          _hover: {
            boxShadow: 'none',
          },
        },
      },
    },
    // Ghost + interactive
    {
      appearance: 'ghost',
      interactive: true,
      css: {
        ...interactiveHoverStyles,
        _disabled: {
          _hover: {
            boxShadow: 'none',
          },
        },
      },
    },
    // Overlay + interactive
    {
      appearance: 'overlay',
      interactive: true,
      css: {
        _disabled: {
          _hover: {
            boxShadow: 'raised',
          },
        },
      },
    },
  ],
  defaultVariants: {
    appearance: 'default',
    interactive: false,
  },
});
