import { defineTokens } from '@pandacss/dev';

import {
  getBoxShadowPrimitive,
  getDarkBoxShadowPrimitive,
} from '../utilities/shadowDefinitions';

/**
 * Generated from the shared layer definitions, so boxShadow and dropShadow
 * cannot drift apart. The layer colors resolve per mode on their own, which is
 * why each elevation needs one primitive rather than a light and dark pair.
 * The `Base` suffix keeps these distinct from the semantic names in
 * `styles/semantics/shadows.ts`, which share the shadows namespace.
 */
export const shadows = defineTokens.shadows({
  zeroBase: { value: getBoxShadowPrimitive('zero') },
  raisedBase: { value: getBoxShadowPrimitive('raised') },
  elevatedBase: { value: getBoxShadowPrimitive('elevated') },
  overlayBase: { value: getBoxShadowPrimitive('overlay') },
  overflowBase: { value: getBoxShadowPrimitive('overflow') },
  // Dark mode is the one place where the geometry differs, not just the color.
  overflowDarkBase: { value: getDarkBoxShadowPrimitive('overflow') },
});
