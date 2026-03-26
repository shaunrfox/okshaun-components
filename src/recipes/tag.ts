import { defineRecipe } from '@pandacss/dev';

export const tagRecipe = defineRecipe({
  className: 'tag',
  jsx: ['Tag'],
  base: {
    display: 'flex',
    alignItems: 'center',
    py: '0',
    borderRadius: '2',
    gap: '1',
    px: '4',
    w: 'fit',
    h: '20',
    fontSize: '14',
    fontWeight: 'medium',
    lineHeight: 'tight',
    whiteSpace: 'nowrap',
  },
  variants: {
    variant: {
      default: {},
      bold: {},
    },
    hue: {
      gray: {},
      red: {},
      orange: {},
      yellow: {},
      lime: {},
      green: {},
      teal: {},
      blue: {},
      indigo: {},
      purple: {},
      magenta: {},
      tan: {},
    },
    iconBefore: {
      true: {
        gap: '1',
        pl: '1',
      },
      false: {},
    },
    iconAfter: {
      true: {
        gap: '1',
        pr: '1',
      },
      false: {},
    },
    hasIcon: {
      true: {},
      false: {
        px: '4',
      },
    },
  },
  compoundVariants: [
    {
      hue: 'gray',
      variant: 'default',
      css: {
        color: 'text.subtle',
        bg: 'bg.neutral',
      },
    },
    {
      hue: 'gray',
      variant: 'bold',
      css: {
        color: 'text.inverse',
        bg: 'bg.neutral.boldest',
      },
    },
    {
      hue: 'red',
      variant: 'default',
      css: {
        color: { base: 'red.70', _dark: 'red.20' },
        bg: { base: 'red.20', _dark: 'red.100' },
      },
    },
    {
      hue: 'red',
      variant: 'bold',
      css: {
        color: { base: 'red.10', _dark: 'red.100' },
        bg: { base: 'red.60', _dark: 'red.40' },
      },
    },
    {
      hue: 'orange',
      variant: 'default',
      css: {
        color: { base: 'orange.70', _dark: 'orange.20' },
        bg: { base: 'orange.20', _dark: 'orange.100' },
      },
    },
    {
      hue: 'orange',
      variant: 'bold',
      css: {
        color: { base: 'orange.10', _dark: 'orange.100' },
        bg: { base: 'orange.60', _dark: 'orange.50' },
      },
    },
    {
      hue: 'yellow',
      variant: 'default',
      css: {
        color: { base: 'yellow.80', _dark: 'yellow.50' },
        bg: { base: 'yellow.20', _dark: 'yellow.90' },
      },
    },
    {
      hue: 'yellow',
      variant: 'bold',
      css: {
        color: { base: 'yellow.100', _dark: 'yellow.100' },
        bg: { base: 'yellow.40', _dark: 'yellow.60' },
      },
    },
    {
      hue: 'lime',
      variant: 'default',
      css: {
        color: { base: 'lime.70', _dark: 'lime.20' },
        bg: { base: 'lime.20', _dark: 'lime.90' },
      },
    },
    {
      hue: 'lime',
      variant: 'bold',
      css: {
        color: { base: 'lime.10', _dark: 'lime.100' },
        bg: { base: 'lime.60', _dark: 'lime.40' },
      },
    },
    {
      hue: 'green',
      variant: 'default',
      css: {
        color: { base: 'green.70', _dark: 'green.20' },
        bg: { base: 'green.20', _dark: 'green.90' },
      },
    },
    {
      hue: 'green',
      variant: 'bold',
      css: {
        color: { base: 'gray.10', _dark: 'green.100' },
        bg: { base: 'green.70', _dark: 'green.40' },
      },
    },
    {
      hue: 'teal',
      variant: 'default',
      css: {
        color: { base: 'teal.80', _dark: 'teal.20' },
        bg: { base: 'teal.20', _dark: 'teal.90' },
      },
    },
    {
      hue: 'teal',
      variant: 'bold',
      css: {
        color: { base: 'teal.10', _dark: 'teal.100' },
        bg: { base: 'teal.60', _dark: 'teal.50' },
      },
    },
    {
      hue: 'blue',
      variant: 'default',
      css: {
        color: { base: 'blue.70', _dark: 'blue.20' },
        bg: { base: 'blue.20', _dark: 'blue.90' },
      },
    },
    {
      hue: 'blue',
      variant: 'bold',
      css: {
        color: { base: 'blue.10', _dark: 'blue.10' },
        bg: { base: 'blue.50', _dark: 'blue.70' },
      },
    },
    {
      hue: 'indigo',
      variant: 'default',
      css: {
        color: { base: 'indigo.70', _dark: 'indigo.20' },
        bg: { base: 'indigo.20', _dark: 'indigo.90' },
      },
    },
    {
      hue: 'indigo',
      variant: 'bold',
      css: {
        color: { base: 'indigo.10', _dark: 'indigo.10' },
        bg: { base: 'indigo.60', _dark: 'indigo.70' },
      },
    },
    {
      hue: 'purple',
      variant: 'default',
      css: {
        color: { base: 'purple.70', _dark: 'purple.20' },
        bg: { base: 'purple.20', _dark: 'purple.90' },
      },
    },
    {
      hue: 'purple',
      variant: 'bold',
      css: {
        color: { base: 'purple.10', _dark: 'purple.10' },
        bg: { base: 'purple.60', _dark: 'purple.80' },
      },
    },
    {
      hue: 'magenta',
      variant: 'default',
      css: {
        color: { base: 'magenta.80', _dark: 'magenta.20' },
        bg: { base: 'magenta.20', _dark: 'magenta.90' },
      },
    },
    {
      hue: 'magenta',
      variant: 'bold',
      css: {
        color: { base: 'magenta.10', _dark: 'magenta.10' },
        bg: { base: 'magenta.70', _dark: 'magenta.70' },
      },
    },
    {
      hue: 'tan',
      variant: 'default',
      css: {
        color: { base: 'tan.70', _dark: 'tan.20' },
        bg: { base: 'tan.20', _dark: 'tan.80' },
      },
    },
    {
      hue: 'tan',
      variant: 'bold',
      css: {
        color: { base: 'gray.10', _dark: 'tan.90' },
        bg: { base: 'tan.60', _dark: 'tan.40' },
      },
    },
  ],
  defaultVariants: {
    variant: 'default',
    hue: 'gray',
  },
});
