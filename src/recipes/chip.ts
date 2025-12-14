import { defineRecipe } from '@pandacss/dev';

const chipBase = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1',
  px: '2',
  py: '0',
  borderRadius: '2',
  fontFamily: 'sans',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  fontWeight: '500',
  whiteSpace: 'nowrap',
  verticalAlign: 'baseline',
  cursor: 'pointer',
  transitionProperty: 'common',
  transitionDuration: 'fast',
  userSelect: 'none',
};

export const chipRecipe = defineRecipe({
  className: 'chip',
  jsx: ['Chip'],
  base: chipBase,
  variants: {
    state: {
      resolved: {},
      placeholder: {
        borderStyle: 'dashed',
        borderWidth: '1px',
      },
      loading: {
        cursor: 'wait',
        animation: 'pulse',
      },
      deleted: {
        textDecoration: 'line-through',
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
    hue: {
      blue: {},
      purple: {},
      orange: {},
      green: {},
      gray: {},
    },
    hasIcon: {
      true: { pl: '1' },
      false: {},
    },
  },
  defaultVariants: {
    state: 'resolved',
    hue: 'blue',
    hasIcon: false,
  },
  compoundVariants: [
    // Blue hue (page)
    {
      hue: 'blue',
      state: 'resolved',
      css: {
        color: { base: 'blue.70', _dark: 'blue.20' },
        bg: { base: 'blue.20', _dark: 'blue.90' },
        _hover: {
          bg: { base: 'blue.30', _dark: 'blue.80' },
        },
      },
    },
    {
      hue: 'blue',
      state: 'placeholder',
      css: {
        color: { base: 'blue.50', _dark: 'blue.40' },
        borderColor: { base: 'blue.40', _dark: 'blue.60' },
        bg: 'transparent',
        _hover: {
          bg: { base: 'blue.10', _dark: 'blue.90/50' },
        },
      },
    },
    {
      hue: 'blue',
      state: 'loading',
      css: {
        color: { base: 'blue.50', _dark: 'blue.40' },
        bg: { base: 'blue.10', _dark: 'blue.90' },
      },
    },
    {
      hue: 'blue',
      state: 'deleted',
      css: {
        color: { base: 'blue.40', _dark: 'blue.60' },
        bg: { base: 'blue.10', _dark: 'blue.90' },
      },
    },

    // Purple hue (daily_note)
    {
      hue: 'purple',
      state: 'resolved',
      css: {
        color: { base: 'purple.70', _dark: 'purple.20' },
        bg: { base: 'purple.20', _dark: 'purple.90' },
        _hover: {
          bg: { base: 'purple.30', _dark: 'purple.80' },
        },
      },
    },
    {
      hue: 'purple',
      state: 'placeholder',
      css: {
        color: { base: 'purple.50', _dark: 'purple.40' },
        borderColor: { base: 'purple.40', _dark: 'purple.60' },
        bg: 'transparent',
        _hover: {
          bg: { base: 'purple.10', _dark: 'purple.90/50' },
        },
      },
    },
    {
      hue: 'purple',
      state: 'loading',
      css: {
        color: { base: 'purple.50', _dark: 'purple.40' },
        bg: { base: 'purple.10', _dark: 'purple.90' },
      },
    },
    {
      hue: 'purple',
      state: 'deleted',
      css: {
        color: { base: 'purple.40', _dark: 'purple.60' },
        bg: { base: 'purple.10', _dark: 'purple.90' },
      },
    },

    // Orange hue (event)
    {
      hue: 'orange',
      state: 'resolved',
      css: {
        color: { base: 'orange.70', _dark: 'orange.20' },
        bg: { base: 'orange.20', _dark: 'orange.100' },
        _hover: {
          bg: { base: 'orange.30', _dark: 'orange.90' },
        },
      },
    },
    {
      hue: 'orange',
      state: 'placeholder',
      css: {
        color: { base: 'orange.50', _dark: 'orange.40' },
        borderColor: { base: 'orange.40', _dark: 'orange.60' },
        bg: 'transparent',
        _hover: {
          bg: { base: 'orange.10', _dark: 'orange.90/50' },
        },
      },
    },
    {
      hue: 'orange',
      state: 'loading',
      css: {
        color: { base: 'orange.50', _dark: 'orange.40' },
        bg: { base: 'orange.10', _dark: 'orange.100' },
      },
    },
    {
      hue: 'orange',
      state: 'deleted',
      css: {
        color: { base: 'orange.40', _dark: 'orange.60' },
        bg: { base: 'orange.10', _dark: 'orange.100' },
      },
    },

    // Green hue (person)
    {
      hue: 'green',
      state: 'resolved',
      css: {
        color: { base: 'green.70', _dark: 'green.20' },
        bg: { base: 'green.20', _dark: 'green.90' },
        _hover: {
          bg: { base: 'green.30', _dark: 'green.80' },
        },
      },
    },
    {
      hue: 'green',
      state: 'placeholder',
      css: {
        color: { base: 'green.50', _dark: 'green.40' },
        borderColor: { base: 'green.40', _dark: 'green.60' },
        bg: 'transparent',
        _hover: {
          bg: { base: 'green.10', _dark: 'green.90/50' },
        },
      },
    },
    {
      hue: 'green',
      state: 'loading',
      css: {
        color: { base: 'green.50', _dark: 'green.40' },
        bg: { base: 'green.10', _dark: 'green.90' },
      },
    },
    {
      hue: 'green',
      state: 'deleted',
      css: {
        color: { base: 'green.40', _dark: 'green.60' },
        bg: { base: 'green.10', _dark: 'green.90' },
      },
    },

    // Gray hue (default/fallback)
    {
      hue: 'gray',
      state: 'resolved',
      css: {
        color: 'text.subtle',
        bg: 'bg.neutral',
        _hover: {
          bg: 'bg.neutral.hovered',
        },
      },
    },
    {
      hue: 'gray',
      state: 'placeholder',
      css: {
        color: 'text.subtlest',
        borderColor: 'border.default',
        bg: 'transparent',
        _hover: {
          bg: 'bg.neutral',
        },
      },
    },
    {
      hue: 'gray',
      state: 'loading',
      css: {
        color: 'text.subtlest',
        bg: 'bg.neutral',
      },
    },
    {
      hue: 'gray',
      state: 'deleted',
      css: {
        color: 'text.disabled',
        bg: 'bg.neutral',
      },
    },
  ],
});
