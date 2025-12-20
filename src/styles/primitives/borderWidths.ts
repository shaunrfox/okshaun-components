import { defineTokens } from '@pandacss/dev';

export const borderWidths = defineTokens.borderWidths({
  '0': { value: '{sizes.0}' },
  '1': { value: '{sizes.1}' },
  '2': { value: '{sizes.2}' },
  '4': { value: '{sizes.4}' },
  '8': { value: '{sizes.8}' },
  '16': { value: '{sizes.16}' },
});
