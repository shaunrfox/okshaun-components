import { defineRecipe } from '@pandacss/dev'

export const text = defineRecipe({
  className: '',
  base: {
    margin: '0',
    lineHeight: 'normal',
		fontWeight: 'normal',
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
    font: {
      sans: { fontFamily: 'sans' },
      serif: { fontFamily: 'serif' },
      mono: { fontFamily: 'mono' },
    }
  },
  defaultVariants: {
    level: 16,
    font: 'sans',
  }
})