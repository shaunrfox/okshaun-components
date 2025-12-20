import { defineSemanticTokens } from '@pandacss/dev';

export const shadows = defineSemanticTokens.shadows({
  raised: {
    value: { base: '{shadows.raisedLight}', _dark: '{shadows.raisedDark}' },
  },
  overlay: {
    value: { base: '{shadows.overlayLight}', _dark: '{shadows.overlayDark}' },
  },
  overflow: {
    value: { base: '{shadows.overflowLight}', _dark: '{shadows.overflowDark}' },
  },
  // TODO: delete below once migration is complete
  low: {
    value: { base: '{shadows.lowLight}', _dark: '{shadows.lowDark}' },
  },
  medium: {
    value: { base: '{shadows.mediumLight}', _dark: '{shadows.mediumDark}' },
  },
  high: {
    value: { base: '{shadows.highLight}', _dark: '{shadows.highDark}' },
  },
  inset: {
    value: { base: '{shadows.insetLight}', _dark: '{shadows.insetDark}' },
  },
});
