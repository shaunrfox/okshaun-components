import { css } from '@styled-system/css';

export const themeSwitchStyles = css({
  position: 'relative',
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: { base: 'gray.30', _dark: 'gray.70' },
  color: 'transparent',
  margin: '8',
  borderRadius: '100',
  cursor: 'pointer',
  display: 'grid',
  lineHeight: 'none',
  width: '14',
  height: '14',
  transition: 'all',
  '&:before': {
    content: '""',
    position: 'absolute',
    inset: '0',
    opacity: 0,
    display: 'block',
    borderRadius: '100',
    backgroundColor: { base: 'gray.98', _dark: 'gray.5' },
    transition: 'all',
    transitionTimingFunction: 'default',
    transitionDuration: 'slow',
  },
  _hover: {
    cursor: 'pointer',
    bg: { base: 'gray.90', _dark: 'gray.5' },
    borderColor: { base: 'gray.90', _dark: 'gray.5' },
    '&:before': {
      inset: '-8',
      opacity: 0.25,
    },
  },
});
