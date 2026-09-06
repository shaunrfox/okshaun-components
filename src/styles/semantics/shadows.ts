import { defineSemanticTokens } from '@pandacss/dev';

export const shadows = defineSemanticTokens.shadows({
  zero: { value: { base: '{shadows.zeroLight}', _dark: '{shadows.zeroDark}' } },
  raised: {
    value: { base: '{shadows.raisedLight}', _dark: '{shadows.raisedDark}' },
  },
  elevated: {
    value: { base: '{shadows.elevatedLight}', _dark: '{shadows.elevatedDark}' },
  },
  overlay: {
    value: { base: '{shadows.overlayLight}', _dark: '{shadows.overlayDark}' },
  },
  overflow: {
    value: { base: '{shadows.overflowLight}', _dark: '{shadows.overflowDark}' },
  },
});
