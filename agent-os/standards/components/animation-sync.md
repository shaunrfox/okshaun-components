# Animation Duration Sync

Components with enter/exit animations must use a shared duration constant.

## Rule

Never hardcode animation durations in both CSS and JS. Use the shared constant:

```typescript
// src/recipes/modal.ts (or wherever the constant lives)
export const MODAL_ANIMATION_DURATION = 150; // ms

// In recipe CSS
animation: `modalScaleIn ${MODAL_ANIMATION_DURATION}ms ease-out forwards`

// In component JS (unmount delay)
timeoutRef.current = setTimeout(() => {
  setShouldRender(false);
}, MODAL_ANIMATION_DURATION);
```

## Why

Modal uses a timeout-based pattern to keep the component mounted during exit animations. The JS timeout MUST match the CSS animation duration exactly. If they drift, the component either unmounts before the animation finishes (visual glitch) or stays mounted too long (interaction delay).

## Pattern

1. Define duration as a named constant in the recipe file
2. Import constant in both the recipe definition and the component
3. Never use magic numbers for animation timing
