# Sprite Injection

The SVG sprite is bundled as a JavaScript string and lazy-injected into the DOM.

## Mechanism

```typescript
// src/utils/spriteContent.ts (auto-generated)
export const spriteContent = "<svg>...<symbol id='alarm'>...</symbol>...</svg>";

// src/utils/injectSprite.ts
let spriteInjected = false;

export function injectSprite(): void {
  if (spriteInjected || typeof document === 'undefined') return;
  const container = document.createElement('div');
  container.style.display = 'none';
  container.setAttribute('aria-hidden', 'true');
  container.innerHTML = spriteContent;
  document.body.insertBefore(container, document.body.firstChild);
  spriteInjected = true;
}
```

## When It Runs

First `<Icon>` component render triggers injection via `useEffect`:

```typescript
useEffect(() => {
  injectSprite();
}, []);
```

- Singleton: runs exactly once regardless of how many Icons render
- Idempotent: safe to call multiple times
- SSR-safe: checks for `typeof document === 'undefined'`

## How Icons Reference the Sprite

```html
<svg viewBox="0 0 24 24">
  <use xlink:href="#alarm" />  <!-- References <symbol id="alarm"> in sprite -->
</svg>
```

## Why Bundled (Not Separate File)

- Self-contained npm distribution — no sprite file to copy
- No extra HTTP request in consuming apps
- Works immediately on import, zero configuration
- Tradeoff: larger JS bundle, but eliminates setup complexity

## Debugging

If icons don't render:
1. Check DOM for hidden div with sprite content (first child of body)
2. Verify `spriteContent.ts` exists (run `npm run generate-sprite`)
3. Check console for injection errors
4. Confirm icon name matches a `<symbol id>` in the sprite
