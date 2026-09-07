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
    // Each hue publishes both colour pairs; `variant` picks one. This replaces
    // 24 compoundVariants, which Panda emitted no CSS for at all: the variant
    // bodies were empty, so every Tag rendered as the uncoloured base. Doing it
    // through custom properties also makes `hue` and `variant` responsive.
    hue: {
      gray: {
        '--tag-fg': 'token(colors.text.subtle)',
        '--tag-bg': 'token(colors.bg.neutral)',
        '--tag-fg-bold': 'token(colors.text.inverse)',
        '--tag-bg-bold': 'token(colors.bg.neutral.boldest)',
      },
      red: {
        '--tag-fg': {
          base: 'token(colors.red.70)',
          _dark: 'token(colors.red.20)',
        },
        '--tag-bg': {
          base: 'token(colors.red.20)',
          _dark: 'token(colors.red.100)',
        },
        '--tag-fg-bold': {
          base: 'token(colors.red.10)',
          _dark: 'token(colors.red.100)',
        },
        '--tag-bg-bold': {
          base: 'token(colors.red.60)',
          _dark: 'token(colors.red.40)',
        },
      },
      orange: {
        '--tag-fg': {
          base: 'token(colors.orange.70)',
          _dark: 'token(colors.orange.20)',
        },
        '--tag-bg': {
          base: 'token(colors.orange.20)',
          _dark: 'token(colors.orange.100)',
        },
        '--tag-fg-bold': {
          base: 'token(colors.orange.10)',
          _dark: 'token(colors.orange.100)',
        },
        '--tag-bg-bold': {
          base: 'token(colors.orange.60)',
          _dark: 'token(colors.orange.50)',
        },
      },
      yellow: {
        '--tag-fg': {
          base: 'token(colors.yellow.80)',
          _dark: 'token(colors.yellow.50)',
        },
        '--tag-bg': {
          base: 'token(colors.yellow.20)',
          _dark: 'token(colors.yellow.90)',
        },
        '--tag-fg-bold': {
          base: 'token(colors.yellow.100)',
          _dark: 'token(colors.yellow.100)',
        },
        '--tag-bg-bold': {
          base: 'token(colors.yellow.40)',
          _dark: 'token(colors.yellow.60)',
        },
      },
      lime: {
        '--tag-fg': {
          base: 'token(colors.lime.70)',
          _dark: 'token(colors.lime.20)',
        },
        '--tag-bg': {
          base: 'token(colors.lime.20)',
          _dark: 'token(colors.lime.90)',
        },
        '--tag-fg-bold': {
          base: 'token(colors.lime.10)',
          _dark: 'token(colors.lime.100)',
        },
        '--tag-bg-bold': {
          base: 'token(colors.lime.60)',
          _dark: 'token(colors.lime.40)',
        },
      },
      green: {
        '--tag-fg': {
          base: 'token(colors.green.70)',
          _dark: 'token(colors.green.20)',
        },
        '--tag-bg': {
          base: 'token(colors.green.20)',
          _dark: 'token(colors.green.90)',
        },
        '--tag-fg-bold': {
          base: 'token(colors.gray.10)',
          _dark: 'token(colors.green.100)',
        },
        '--tag-bg-bold': {
          base: 'token(colors.green.70)',
          _dark: 'token(colors.green.40)',
        },
      },
      teal: {
        '--tag-fg': {
          base: 'token(colors.teal.80)',
          _dark: 'token(colors.teal.20)',
        },
        '--tag-bg': {
          base: 'token(colors.teal.20)',
          _dark: 'token(colors.teal.90)',
        },
        '--tag-fg-bold': {
          base: 'token(colors.teal.10)',
          _dark: 'token(colors.teal.100)',
        },
        '--tag-bg-bold': {
          base: 'token(colors.teal.60)',
          _dark: 'token(colors.teal.50)',
        },
      },
      blue: {
        '--tag-fg': {
          base: 'token(colors.blue.70)',
          _dark: 'token(colors.blue.20)',
        },
        '--tag-bg': {
          base: 'token(colors.blue.20)',
          _dark: 'token(colors.blue.90)',
        },
        '--tag-fg-bold': {
          base: 'token(colors.blue.10)',
          _dark: 'token(colors.blue.10)',
        },
        '--tag-bg-bold': {
          base: 'token(colors.blue.50)',
          _dark: 'token(colors.blue.70)',
        },
      },
      indigo: {
        '--tag-fg': {
          base: 'token(colors.indigo.70)',
          _dark: 'token(colors.indigo.20)',
        },
        '--tag-bg': {
          base: 'token(colors.indigo.20)',
          _dark: 'token(colors.indigo.90)',
        },
        '--tag-fg-bold': {
          base: 'token(colors.indigo.10)',
          _dark: 'token(colors.indigo.10)',
        },
        '--tag-bg-bold': {
          base: 'token(colors.indigo.60)',
          _dark: 'token(colors.indigo.70)',
        },
      },
      purple: {
        '--tag-fg': {
          base: 'token(colors.purple.70)',
          _dark: 'token(colors.purple.20)',
        },
        '--tag-bg': {
          base: 'token(colors.purple.20)',
          _dark: 'token(colors.purple.90)',
        },
        '--tag-fg-bold': {
          base: 'token(colors.purple.10)',
          _dark: 'token(colors.purple.10)',
        },
        '--tag-bg-bold': {
          base: 'token(colors.purple.60)',
          _dark: 'token(colors.purple.80)',
        },
      },
      magenta: {
        '--tag-fg': {
          base: 'token(colors.magenta.80)',
          _dark: 'token(colors.magenta.20)',
        },
        '--tag-bg': {
          base: 'token(colors.magenta.20)',
          _dark: 'token(colors.magenta.90)',
        },
        '--tag-fg-bold': {
          base: 'token(colors.magenta.10)',
          _dark: 'token(colors.magenta.10)',
        },
        '--tag-bg-bold': {
          base: 'token(colors.magenta.70)',
          _dark: 'token(colors.magenta.70)',
        },
      },
      tan: {
        '--tag-fg': {
          base: 'token(colors.tan.70)',
          _dark: 'token(colors.tan.20)',
        },
        '--tag-bg': {
          base: 'token(colors.tan.20)',
          _dark: 'token(colors.tan.80)',
        },
        '--tag-fg-bold': {
          base: 'token(colors.gray.10)',
          _dark: 'token(colors.tan.90)',
        },
        '--tag-bg-bold': {
          base: 'token(colors.tan.60)',
          _dark: 'token(colors.tan.40)',
        },
      },
    },
    variant: {
      default: {
        color: 'var(--tag-fg)',
        bg: 'var(--tag-bg)',
      },
      bold: {
        color: 'var(--tag-fg-bold)',
        bg: 'var(--tag-bg-bold)',
      },
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
  defaultVariants: {
    variant: 'default',
    hue: 'gray',
  },
});
