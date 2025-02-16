import { cva } from '@styled-system/css';

export const linkStyle = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1',
    color: { base: 'slate.90', _dark: 'slate.5' },
    textDecoration: 'none',
    backgroundImage: 'linear-gradient(90deg, currentColor 0% 100%)',
    backgroundSize: '100% 1px',
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: '100%',
    width: 'fit-content',
    cursor: 'pointer',
    _hover: { 
      color: { base: 'cyan.50', _dark: 'cyan.40' },
      backgroundColor: { base: 'cyan.5', _dark: 'cyan.4' },
    },
  },
  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
        opacity: 0.7,
        pointerEvents: 'none'
      }
    }
  }
});
