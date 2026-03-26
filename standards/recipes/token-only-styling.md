# Token-Only Styling

Design-system styling is token-first and recipe-driven.

## Hard Standards

1. No hard-coded design values for visual styling (hex, arbitrary px values, magic numbers).
2. Use styling priority:
   - existing recipes first
   - new recipes for repeated patterns
   - Panda utilities for one-offs
3. Run `npm run prepare` after token or recipe changes.

## Hard With Exceptions

Use `{ base: '...', _dark: '...' }` conditional values when theme behavior differs.
Single-value tokens are acceptable when both themes intentionally share the same value.

## Example

```ts
bg: { base: 'bg.default', _dark: 'bg.inverse' }
```
