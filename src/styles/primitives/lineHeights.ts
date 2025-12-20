import { defineTokens } from '@pandacss/dev';

export const lineHeights = defineTokens.lineHeights({
  none: {
    value: '1',
  },
  tight: {
    value: '1em + 0.25rem', // 4
  },
  default: {
    value: '1em + 0.5rem', // 8
  },
  loose: {
    value: '1em + 0.75rem', // 12
  },
});
