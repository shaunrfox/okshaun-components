import { cva, type RecipeVariantProps } from '@styled-system/css';

export const textStyle = cva({
  base: {
    margin: '0',
    lineHeight: 'normal',
    fontWeight: 'normal',
    color: { base: 'gray.70', _osDark: 'gray.20' },
  },
  variants: {
    level: {
      12: { fontSize: 12 },
      14: { fontSize: 14 },
      16: { fontSize: 16 },
      20: { fontSize: 20 },
      24: { fontSize: 24 },
      32: { fontSize: 32 },
      40: { fontSize: 40 },
      48: { fontSize: 48 },
      64: { fontSize: 64 },
      72: { fontSize: 72 },
      80: { fontSize: 80 },
      96: { fontSize: 96 },
    },
    heading: {
      1: {
        fontSize: 48,
        fontWeight: 'bold',
      },
    },
    font: {
      sans: { fontFamily: 'sans' },
      serif: { fontFamily: 'serif' },
      mono: { fontFamily: 'mono' },
    },
    bold: {
      true: {
        fontWeight: 'bold',
      },
    },
    italic: {
      true: {
        fontStyle: 'italic',
      },
    },
    underline: {
      true: {
        textDecoration: 'underline',
      },
    },
  },
  defaultVariants: {
    level: 16,
    font: 'sans',
  },
});

export type TextVariantProps = RecipeVariantProps<typeof textStyle>[0];
