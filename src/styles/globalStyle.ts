import { defineGlobalStyles } from '@pandacss/dev';

export const globalCss = defineGlobalStyles({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  'html, body': {
    bg: { base: 'gray.0', _osDark: 'gray.90' },
    color: { base: 'gray.60', _osDark: 'gray.30' },
    fontSize: '16',
    fontWeight: 'normal',
    lineHeight: '1.5',
  },
  'h1, h2, h3, h4, h5, h6': {
    color: { base: 'gray.90', _osDark: 'gray.5' },
    fontWeight: 'bold',
    lineHeight: 'calc(1em + 0.5rem)',
  },
  p: {
    marginBottom: '0.5rem',
  },
});
