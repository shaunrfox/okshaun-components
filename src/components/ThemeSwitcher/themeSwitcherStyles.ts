import { css } from '@styled-system/css';

export const themeSwitchStyles = css({
  position: 'relative',
  borderWidth: '2',
  borderStyle: 'solid',
  borderColor: 'border',
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
    bg: 'bg.neutral.bold',
    transition: 'all',
    transitionTimingFunction: 'default',
    transitionDuration: 'normal',
  },
  _hover: {
    cursor: 'pointer',
    bg: { base: 'darkNeutral.0', _dark: 'neutral.0' },
    borderColor: 'bg.neutral.bold',
    '&:before': {
      inset: '-8',
      bg: { base: 'darkNeutral.0', _dark: 'neutral.0' },
      opacity: 0.25,
    },
  },
});
