import { defineGlobalStyles } from '@pandacss/dev'

export const globalCss = defineGlobalStyles({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  'html, body': {
    bg: 'gray.0',
    color: 'gray.60',
		_osDark: {
      bg: 'gray.90',
			color: 'gray.30'
    },
    fontSize: '16',
    fontWeight: 'normal',
    lineHeight: '1.5'
  }
})