import { defineRecipe } from '@pandacss/dev';

const tagBase = {
  display: 'flex',
  py: '0',
  borderRadius: '2',
  gap: '1',
  //   h: '20',
  px: '4',
  fontSize: '14',
  fontWeight: '500',
  //   lineHeight: 'none',
};
const tagVariant = {
  variant: {
    default: {},
    bold: {},
  },
  hue: {
    slate: {},
    tan: {},
    red: {},
    tomato: {},
    orange: {},
    yellow: {},
    green: {},
    grass: {},
    mint: {},
    cyan: {},
    blue: {},
    indigo: {},
    purple: {},
    violet: {},
    pink: {},
    rose: {},
    magenta: {},
  },
  iconPosition: {
    left: {
      flexDirection: 'row',
      gap: '1',
      pl: '1',
    },
    right: {
      flexDirection: 'row-reverse',
      gap: '1',
      pr: '1',
    },
  },
  hasIcon: {
    true: {},
    false: {
      px: 4,
    },
  },
};

export const tagRecipe = defineRecipe({
  className: 'tag',
  jsx: ['Tag'],
  base: tagBase,
  variants: tagVariant,
  defaultVariants: {
    variant: 'default',
    hue: 'slate',
    iconPosition: 'left',
    hasIcon: false,
  },
  compoundVariants: [
    {
      hue: 'slate',
      variant: 'default',
      css: {
        color: { base: 'gray.70', _dark: 'gray.20' },
        bg: { base: 'gray.10', _dark: 'gray.70' },
      },
    },
    {
      hue: 'slate',
      variant: 'bold',
      css: {
        color: { base: 'gray.10', _dark: 'gray.80' },
        bg: { base: 'gray.100', _dark: 'gray.20' },
      },
    },
    {
      hue: 'tan',
      variant: 'default',
      css: {
        color: { base: 'tan.70', _dark: 'tan.20' },
        bg: { base: 'tan.10', _dark: 'tan.70' },
      },
    },
    {
      hue: 'tan',
      variant: 'bold',
      css: {
        color: { base: 'gray.10', _dark: 'tan.80' },
        bg: { base: 'tan.50', _dark: 'tan.20' },
      },
    },
    {
      hue: 'red',
      variant: 'default',
      css: {
        color: { base: 'red.70', _dark: 'red.10' },
        bg: { base: 'red.10', _dark: 'red.70' },
      },
    },
    {
      hue: 'red',
      variant: 'bold',
      css: {
        color: { base: 'gray.10', _dark: 'red.80' },
        bg: { base: 'red.50', _dark: 'red.20' },
      },
    },
    {
      hue: 'tomato',
      variant: 'default',
      css: {
        color: { base: 'tomato.70', _dark: 'tomato.20' },
        bg: { base: 'tomato.10', _dark: 'tomato.70' },
      },
    },
    {
      hue: 'tomato',
      variant: 'bold',
      css: {
        color: { base: 'gray.10', _dark: 'tomato.80' },
        bg: { base: 'tomato.50', _dark: 'tomato.20' },
      },
    },
    {
      hue: 'orange',
      variant: 'default',
      css: {
        color: { base: 'orange.70', _dark: 'orange.20' },
        bg: { base: 'orange.10', _dark: 'orange.70' },
      },
    },
    {
      hue: 'orange',
      variant: 'bold',
      css: {
        color: { base: 'orange.5', _dark: 'orange.80' },
        bg: { base: 'orange.60', _dark: 'orange.20' },
      },
    },
    {
      hue: 'yellow',
      variant: 'default',
      css: {
        color: { base: 'yellow.60', _dark: 'yellow.10' },
        bg: { base: 'yellow.10', _dark: 'yellow.60' },
      },
    },
    {
      hue: 'yellow',
      variant: 'bold',
      css: {
        color: { base: 'yellow.70', _dark: 'yellow.90' },
        bg: { base: 'yellow.20', _dark: 'yellow.20' },
      },
    },
    {
      hue: 'green',
      variant: 'default',
      css: {
        color: { base: 'green.70', _dark: 'green.20' },
        bg: { base: 'green.10', _dark: 'green.70' },
      },
    },
    {
      hue: 'green',
      variant: 'bold',
      css: {
        color: { base: 'gray.10', _dark: 'green.80' },
        bg: { base: 'green.50', _dark: 'green.20' },
      },
    },
    {
      hue: 'grass',
      variant: 'default',
      css: {
        color: { base: 'grass.70', _dark: 'grass.10' },
        bg: { base: 'grass.10', _dark: 'grass.70' },
      },
    },
    {
      hue: 'grass',
      variant: 'bold',
      css: {
        color: { base: 'gray.10', _dark: 'grass.80' },
        bg: { base: 'grass.60', _dark: 'grass.20' },
      },
    },
    {
      hue: 'mint',
      variant: 'default',
      css: {
        color: { base: 'mint.80', _dark: 'mint.30' },
        bg: { base: 'mint.10', _dark: 'mint.80' },
      },
    },
    {
      hue: 'mint',
      variant: 'bold',
      css: {
        color: { base: 'gray.10', _dark: 'mint.80' },
        bg: { base: 'mint.70', _dark: 'mint.20' },
      },
    },
    {
      hue: 'cyan',
      variant: 'default',
      css: {
        color: { base: 'cyan.70', _dark: 'cyan.20' },
        bg: { base: 'cyan.10', _dark: 'cyan.70' },
      },
    },
    {
      hue: 'cyan',
      variant: 'bold',
      css: {
        color: { base: 'cyan.5', _dark: 'cyan.80' },
        bg: { base: 'cyan.60', _dark: 'cyan.30' },
      },
    },
    {
      hue: 'blue',
      variant: 'default',
      css: {
        color: { base: 'blue.70', _dark: 'blue.20' },
        bg: { base: 'blue.10', _dark: 'blue.70' },
      },
    },
    {
      hue: 'blue',
      variant: 'bold',
      css: {
        color: { base: 'gray.10', _dark: 'blue.90' },
        bg: { base: 'blue.50', _dark: 'blue.40' },
      },
    },
    {
      hue: 'indigo',
      variant: 'default',
      css: {
        color: { base: 'indigo.70', _dark: 'indigo.10' },
        bg: { base: 'indigo.10', _dark: 'indigo.70' },
      },
    },
    {
      hue: 'indigo',
      variant: 'bold',
      css: {
        color: { base: 'indigo.5', _dark: 'indigo.80' },
        bg: { base: 'indigo.50', _dark: 'indigo.20' },
      },
    },
    {
      hue: 'purple',
      variant: 'default',
      css: {
        color: { base: 'purple.70', _dark: 'purple.20' },
        bg: { base: 'purple.10', _dark: 'purple.70' },
      },
    },
    {
      hue: 'purple',
      variant: 'bold',
      css: {
        color: { base: 'gray.10', _dark: 'purple.80' },
        bg: { base: 'purple.50', _dark: 'purple.20' },
      },
    },
    {
      hue: 'violet',
      variant: 'default',
      css: {
        color: { base: 'violet.70', _dark: 'violet.10' },
        bg: { base: 'violet.10', _dark: 'violet.70' },
      },
    },
    {
      hue: 'violet',
      variant: 'bold',
      css: {
        color: { base: 'violet.5', _dark: 'violet.80' },
        bg: { base: 'violet.60', _dark: 'violet.20' },
      },
    },
    {
      hue: 'pink',
      variant: 'default',
      css: {
        color: { base: 'pink.70', _dark: 'pink.10' },
        bg: { base: 'pink.10', _dark: 'pink.70' },
      },
    },
    {
      hue: 'pink',
      variant: 'bold',
      css: {
        color: { base: 'pink.5', _dark: 'pink.80' },
        bg: { base: 'pink.70', _dark: 'pink.20' },
      },
    },
    {
      hue: 'rose',
      variant: 'default',
      css: {
        color: { base: 'rose.70', _dark: 'rose.10' },
        bg: { base: 'rose.10', _dark: 'rose.70' },
      },
    },
    {
      hue: 'rose',
      variant: 'bold',
      css: {
        color: { base: 'rose.5', _dark: 'rose.80' },
        bg: { base: 'rose.60', _dark: 'rose.20' },
      },
    },
    {
      hue: 'magenta',
      variant: 'default',
      css: {
        color: { base: 'magenta.70', _dark: 'magenta.10' },
        bg: { base: 'magenta.10', _dark: 'magenta.70' },
      },
    },
    {
      hue: 'magenta',
      variant: 'bold',
      css: {
        color: { base: 'magenta.5', _dark: 'magenta.80' },
        bg: { base: 'magenta.60', _dark: 'magenta.20' },
      },
    },
  ],
});
