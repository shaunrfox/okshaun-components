import { defineSemanticTokens } from '@pandacss/dev';

export const shadows = defineSemanticTokens.shadows({
  zero: { value: '{shadows.zeroBase}' },
  raised: { value: '{shadows.raisedBase}' },
  elevated: { value: '{shadows.elevatedBase}' },
  overlay: { value: '{shadows.overlayBase}' },
  overflow: {
    value: {
      base: '{shadows.overflowBase}',
      _dark: '{shadows.overflowDarkBase}',
    },
  },
});
