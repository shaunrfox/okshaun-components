# Dynamic Variant Generation

Some recipes generate variants programmatically from token objects instead of hardcoding.

## Pattern

```typescript
import { fontSizes as fontSizeTokens } from '~/styles/primitives';

type FontSizeKey = keyof typeof fontSizeTokens;
const fontSizes = (Object.keys(fontSizeTokens) as FontSizeKey[]).reduce(
  (acc, key) => {
    acc[key] = { fontSize: fontSizeTokens[key].value };
    return acc;
  },
  {} as Record<FontSizeKey, Record<'fontSize', string>>,
);

const textVariants = {
  size: fontSizes,     // All font sizes automatically available
  weight: fontWeights, // All font weights automatically available
};
```

## When to Use

- Token set is large and likely to grow (font sizes, spacing)
- 1:1 mapping between token and variant (each token = one variant option)
- Avoids maintaining duplicate lists

## When NOT to Use

- Small, stable variant sets (2-4 options) — just hardcode
- Variant values differ from token values (need custom mapping)
- Compound or conditional logic per variant

## Currently Used In

- `text.ts` — font sizes, font weights generated from token imports
- Most other recipes use hardcoded variant objects
