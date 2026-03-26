import { defineTokens } from '@pandacss/dev';

export const shadows = defineTokens.shadows({
  zeroShadow: {
    value:
      '{sizes.0} {sizes.0} {sizes.0} {colors.transparent}, {sizes.0} {sizes.0} {sizes.0} {colors.transparent}',
  },
  raisedLight: {
    value:
      '{sizes.0} {sizes.1} {sizes.1} {colors.shadow.raised.1.light}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.raised.2.light}',
  },
  raisedLightUp: {
    value:
      '{sizes.0} [-1] {sizes.1} {colors.shadow.raised.1.light}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.raised.2.light}',
  },
  raisedDark: {
    value:
      '{sizes.0} {sizes.1} {sizes.1} {colors.shadow.raised.1.dark}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.raised.2.dark}',
  },
  raisedDarkUp: {
    value:
      '{sizes.0} [-1] {sizes.1} {colors.shadow.raised.1.dark}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.raised.2.dark}',
  },
  elevatedLight: {
    value:
      '{sizes.0} {sizes.0} {sizes.0} {colors.shadow.elevated.1.light}, {sizes.0} {sizes.4} {sizes.7} {colors.shadow.elevated.2.light}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.elevated.3.light}',
  },
  elevatedLightUp: {
    value:
      '{sizes.0} {sizes.0} {sizes.0} {colors.shadow.elevated.1.light}, {sizes.0} [-4] {sizes.7} {colors.shadow.elevated.2.light}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.elevated.3.light}',
  },
  elevatedDark: {
    value:
      '{sizes.0} {sizes.0} {sizes.0} {colors.shadow.elevated.1.dark}, {sizes.0} {sizes.4} {sizes.7} {colors.shadow.elevated.2.dark}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.elevated.3.dark}',
  },
  elevatedDarkUp: {
    value:
      '{sizes.0} {sizes.0} {sizes.0} {colors.shadow.elevated.1.dark}, {sizes.0} [-4] {sizes.7} {colors.shadow.elevated.2.dark}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.elevated.3.dark}',
  },
  overlayLight: {
    value:
      '{sizes.0} {sizes.0} {sizes.0} {colors.shadow.overlay.1.light}, {sizes.0} {sizes.8} {sizes.12} {colors.shadow.overlay.2.light}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.overlay.3.light}',
  },
  overlayLightUp: {
    value:
      '{sizes.0} {sizes.0} {sizes.0} {colors.shadow.overlay.1.light}, {sizes.0} [-8] {sizes.12} {colors.shadow.overlay.2.light}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.overlay.3.light}',
  },
  overlayDark: {
    value:
      '{sizes.0} {sizes.0} {sizes.0} {colors.shadow.overlay.1.dark}, {sizes.0} {sizes.8} {sizes.12} {colors.shadow.overlay.2.dark}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.overlay.3.dark}',
  },
  overlayDarkUp: {
    value:
      '{sizes.0} {sizes.0} {sizes.0} {colors.shadow.overlay.1.dark}, {sizes.0} [-8] {sizes.12} {colors.shadow.overlay.2.dark}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.overlay.3.dark}',
  },
  overflowLight: {
    value:
      '{sizes.0} {sizes.0} {sizes.8} {colors.shadow.overflow.1.light}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.overflow.2.light}',
  },
  overflowDark: {
    value:
      '{sizes.0} {sizes.0} {sizes.12} {colors.shadow.overflow.1.dark}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.overflow.2.dark}',
  },
});
