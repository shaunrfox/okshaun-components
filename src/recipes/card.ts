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
    variant: {
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
      variant: 'default',
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
      variant: 'flat',
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
      variant: 'sunken',
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
      variant: 'ghost',
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
      variant: 'overlay',
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
    variant: 'default',
    interactive: false,
  },
});
