import { defineTokens } from '@pandacss/dev';

export const lineHeights = defineTokens.lineHeights({
  none: {
    value: '1',
  },
  tight: {
    value: 'calc(1em + 0.25rem)', // 4
  },
  default: {
    value: 'calc(1em + 0.5rem)', // 8
  },
  loose: {
    value: 'calc(1em + 0.75rem)', // 12
  },
});
