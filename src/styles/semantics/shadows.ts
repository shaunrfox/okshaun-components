import { defineSemanticTokens } from '@pandacss/dev';

export const shadows = defineSemanticTokens.shadows({
  zero: {
    value: { base: '{shadows.zeroShadow}', _dark: '{shadows.zeroShadow}' },
  },
  raised: {
    default: {
      value: { base: '{shadows.raisedLight}', _dark: '{shadows.raisedDark}' },
    },
    up: {
      value: {
        base: '{shadows.raisedLightUp}',
        _dark: '{shadows.raisedDarkUp}',
      },
    },
  },
  elevated: {
    default: {
      value: {
        base: '{shadows.elevatedLight}',
        _dark: '{shadows.elevatedDark}',
      },
    },
    up: {
      value: {
        base: '{shadows.elevatedLightUp}',
        _dark: '{shadows.elevatedDarkUp}',
      },
    },
  },
  overlay: {
    default: {
      value: { base: '{shadows.overlayLight}', _dark: '{shadows.overlayDark}' },
    },
    dark: {
      value: { base: '{shadows.overlayDark}', _dark: '{shadows.overlayLight}' },
    },
  },
  overflow: {
    value: { base: '{shadows.overflowLight}', _dark: '{shadows.overflowDark}' },
  },
});
