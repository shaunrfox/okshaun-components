import { defineTokens } from '@pandacss/dev';

export const shadows = defineTokens.shadows({
  raisedLight: {
    value:
      '{sizes.0} {sizes.1} {sizes.1} rgba(30, 31, 33, 0.25), {sizes.0} {sizes.0} {sizes.1} rgba(30, 31, 33, 0.31)',
  },
  raisedDark: {
    value:
      '{sizes.0} {sizes.0} {sizes.0} rgba(0, 0, 0, 0), {sizes.0} {sizes.1} {sizes.1} rgba(1, 4, 4, 0.5), {sizes.0} {sizes.0} {sizes.1} rgba(1, 4, 4, 0.5)',
  },
  overlayLight: {
    value:
      '{sizes.0} {sizes.8} {sizes.12} rgba(30, 31, 33, 0.15), {sizes.0} {sizes.0} {sizes.1} rgba(30, 31, 33, 0.31)',
  },
  overlayDark: {
    value:
      '{sizes.0} {sizes.0} {sizes.0} rgba(189, 189, 189, 0.12), {sizes.0} {sizes.8} {sizes.12} rgba(1, 4, 4, 0.36), {sizes.0} {sizes.0} {sizes.1} rgba(1, 4, 4, 0.5)',
  },
  overflowLight: {
    value:
      '{sizes.0} {sizes.0} {sizes.8} rgba(30, 31, 33, 0.16), {sizes.0} {sizes.0} {sizes.1} rgba(30, 31, 33, 0.12)',
  },
  overflowDark: {
    value:
      '{sizes.0} {sizes.0} {sizes.12} rgba(1, 4, 4, 0.56), {sizes.0} {sizes.0} {sizes.1} rgba(1, 4, 4, 0.5)',
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
