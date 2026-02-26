// src/styles/semantics/zIndex.ts
import { defineSemanticTokens } from '@pandacss/dev';

/**
 * Z-index elevation scale — mirrors shadow and surface naming:
 *   raised    → shadows.raised    / surface.raised   (internal component stacking)
 *   elevated  → shadows.elevated                     (menus, dropdowns)
 *   overlay   → shadows.overlay   / surface.overlay  (modal backdrop)
 *   modal     →                                      (modal container, above backdrop)
 *   tooltip   →                                      (always on top)
 */
export const zIndex = defineSemanticTokens.zIndex({
  base:     { value: '{zIndex.0}'    },
  raised:   { value: '{zIndex.1}'    },
  elevated: { value: '{zIndex.1000}' },
  overlay:  { value: '{zIndex.1100}' },
  modal:    { value: '{zIndex.1101}' },
  tooltip:  { value: '{zIndex.1200}' },
});
