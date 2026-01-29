import { css } from '@styled-system/css';

export const wrapperStyles = css({
  w: 'fit',
  py: '2',
  px: '4',
  borderWidth: '1',
  borderColor: 'transparent',
  borderStyle: 'dashed',
  flexDirection: 'column',
  bg: 'transparent',
  gap: '4',
  rounded: '2',
  _utility: {
    borderColor: 'border',
    bg: 'bg.accent.neutral.subtlest',
  },
});

export const sizeBarStyles = css({
  height: '8',
  rounded: '2',
  bg: 'bg.accent.blue',
});
