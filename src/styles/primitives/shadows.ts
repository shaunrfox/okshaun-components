import { defineTokens } from '@pandacss/dev';

import {
  getBoxShadowPrimitive,
  getDarkBoxShadowPrimitive,
} from '../utilities/shadowDefinitions';

/**
 * Generated from the shared layer definitions in `utilities/shadowDefinitions`,
 * so boxShadow and dropShadow cannot drift apart.
 *
 * Each elevation still needs a light and a dark primitive. These are declared on
 * `:root`, and a custom property that references another resolves in the scope
 * where it is defined, so a single primitive pointing at a mode-aware colour
 * would stay light inside a locally dark subtree. The switch happens on the
 * semantic token in `styles/semantics/shadows.ts` instead.
 */
export const shadows = defineTokens.shadows({
  zeroLight: { value: getBoxShadowPrimitive('zero', 'light') },
  zeroDark: { value: getBoxShadowPrimitive('zero', 'dark') },
  raisedLight: { value: getBoxShadowPrimitive('raised', 'light') },
  raisedDark: { value: getBoxShadowPrimitive('raised', 'dark') },
  elevatedLight: { value: getBoxShadowPrimitive('elevated', 'light') },
  elevatedDark: { value: getBoxShadowPrimitive('elevated', 'dark') },
  overlayLight: { value: getBoxShadowPrimitive('overlay', 'light') },
  overlayDark: { value: getBoxShadowPrimitive('overlay', 'dark') },
  overflowLight: { value: getBoxShadowPrimitive('overflow', 'light') },
  // Dark mode is the one place where the geometry differs, not just the colour.
  overflowDark: { value: getDarkBoxShadowPrimitive('overflow') },
});
