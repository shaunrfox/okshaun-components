import { cva } from '@styled-system/css';

export const iconStyle = cva({
  base: {
    fill: 'current',
    width: '24',
    height: '24',
    '& use': {
      fill: 'current',
      width: '24',
      height: '24',
    },
  },
});
