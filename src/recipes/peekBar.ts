import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

const peekBarBase = {
  root: {
    ...globalBaseStyles,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8',
    px: '16',
    py: '8',
    borderBottomWidth: '1',
    borderBottomStyle: 'solid',
    borderColor: 'border',
  },
  position: {
    textStyle: 'sans.md',
    color: 'text',
    whiteSpace: 'nowrap',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '4',
  },
};

export const peekBarRecipe = defineSlotRecipe({
  className: 'peekBar',
  jsx: ['PeekBar'],
  slots: ['root', 'position', 'controls'],
  base: peekBarBase,
});
