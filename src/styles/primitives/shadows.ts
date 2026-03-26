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
  raisedDark: {
    value:
      '{sizes.0} {sizes.1} {sizes.1} {colors.shadow.raised.1.dark}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.raised.2.dark}',
  },
  elevatedLight: {
    value:
      '{sizes.0} {sizes.0} {sizes.0} {colors.shadow.elevated.1.light}, {sizes.0} {sizes.4} {sizes.7} {colors.shadow.elevated.2.light}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.elevated.3.light}',
  },
  elevatedDark: {
    value:
      '{sizes.0} {sizes.0} {sizes.0} {colors.shadow.elevated.1.dark}, {sizes.0} {sizes.4} {sizes.7} {colors.shadow.elevated.2.dark}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.elevated.3.dark}',
  },
  overlayLight: {
    value:
      '{sizes.0} {sizes.0} {sizes.0} {colors.shadow.overlay.1.light}, {sizes.0} {sizes.8} {sizes.12} {colors.shadow.overlay.2.light}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.overlay.3.light}',
  },
  overlayDark: {
    value:
      '{sizes.0} {sizes.0} {sizes.0} {colors.shadow.overlay.1.dark}, {sizes.0} {sizes.8} {sizes.12} {colors.shadow.overlay.2.dark}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.overlay.3.dark}',
  },
  overflowLight: {
    value:
      '{sizes.0} {sizes.0} {sizes.8} {colors.shadow.overflow.1.light}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.overflow.2.light}',
  },
  overflowDark: {
    value:
      '{sizes.0} {sizes.0} {sizes.12} {colors.shadow.overflow.1.dark}, {sizes.0} {sizes.0} {sizes.1} {colors.shadow.overflow.2.dark}',
  },
  // TODO: delete below once migration is complete
  lowLight: {
    value:
      '{sizes.0} {sizes.0} {sizes.2} rgba(30, 30, 30, 0.2), {sizes.0} {sizes.1} {sizes.1} rgba(30, 30, 30, 0.2), {sizes.0} {sizes.2} {sizes.3} rgba(30, 30, 30, 0.2)',
  },
  lowDark: {
    value:
      '{sizes.0} {sizes.0} {sizes.2} rgba(0, 0, 0, 0.4), {sizes.0} {sizes.1} {sizes.1} rgba(0, 0, 0, 0.4), {sizes.0} {sizes.2} {sizes.3} rgba(0, 0, 0, 0.4)',
  },
  mediumLight: {
    value:
      '{sizes.0} {sizes.0} {sizes.2} rgba(30, 30, 30, 0.2), {sizes.0} {sizes.2} {sizes.2} rgba(30, 30, 30, 0.2), {sizes.0} {sizes.4} {sizes.4} rgba(30, 30, 30, 0.2), {sizes.0} {sizes.8} {sizes.8} rgba(30, 30, 30, 0.2)',
  },
  mediumDark: {
    value:
      '{sizes.0} {sizes.0} {sizes.2} rgba(0, 0, 0, 0.4), {sizes.0} {sizes.2} {sizes.2} rgba(0, 0, 0, 0.4), {sizes.0} {sizes.4} {sizes.4} rgba(0, 0, 0, 0.4), {sizes.0} {sizes.8} {sizes.8} rgba(0, 0, 0, 0.4)',
  },
  highLight: {
    value:
      '{sizes.0} {sizes.0} {sizes.2} rgba(30, 30, 30, 0.2), {sizes.0} {sizes.2} {sizes.4} rgba(30, 30, 30, 0.2), {sizes.0} {sizes.6} {sizes.8} {sizes.1} rgba(30, 30, 30, 0.2), {sizes.0} {sizes.14} {sizes.16} {sizes.2} rgba(30, 30, 30, 0.2)',
  },
  highDark: {
    value:
      '{sizes.0} {sizes.0} {sizes.2} rgba(0, 0, 0, 0.4), {sizes.0} {sizes.2} {sizes.4} rgba(0, 0, 0, 0.4), {sizes.0} {sizes.6} {sizes.8} {sizes.1} rgba(0, 0, 0, 0.4), {sizes.0} {sizes.14} {sizes.16} {sizes.2} rgba(0, 0, 0, 0.4)',
  },
  insetLight: {
    value:
      'inset {sizes.0} {sizes.0} {sizes.2} rgba(30, 30, 30, 0.2), inset {sizes.0} {sizes.2} {sizes.1} rgba(30, 30, 30, 0.2), inset {sizes.0} {sizes.3} {sizes.2} rgba(30, 30, 30, 0.2)',
  },
  insetDark: {
    value:
      'inset {sizes.0} {sizes.0} {sizes.2} rgba(0, 0, 0, 0.4), inset {sizes.0} {sizes.2} {sizes.1} rgba(0, 0, 0, 0.4), inset {sizes.0} {sizes.3} {sizes.2} rgba(0, 0, 0, 0.4)',
  },
});
