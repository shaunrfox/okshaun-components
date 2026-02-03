# Token Hierarchy

Design tokens flow through a strict hierarchy. Changes cascade downward.

## Chain

```
Primitives (src/styles/primitives/)
  → Semantic Tokens (src/styles/semantics/)
    → Recipes (src/recipes/)
      → Components (src/components/)
```

## Primitives

Base values with no theme awareness:

- `colors.ts` — Color families with numeric shades (`neutral.0`–`neutral.110`)
- `sizes.ts` — Numeric (`0`–`280` in rem), utility (`full`, `half`, `fit`), container (`2xs`–`8xl`)
- `spacings.ts` — Reuses same numeric + utility sizes as `sizes.ts`
- `fonts.ts` — Named families: `heading`, `sans`, `body`, `serif`, `mono`
- `fontSizes.ts` — Numeric scale: `10`–`40`
- `fontWeights.ts` — Semantic: `normal`, `medium`, `bold`, `black`

## Semantic Tokens

Theme-aware tokens that reference primitives:

- `colors.ts` — `bg.*`, `text.*`, `border.*`, `icon.*`, `surface.*`, `link.*`, `blanket.*`
- `shadows.ts` — `raised`, `elevated`, `overlay`, `overflow`

## Build Requirement

After modifying ANY token or recipe:

```bash
npm run panda  # Regenerates src/styled-system/
```

Dev server watch mode handles this automatically, but you may need to restart the dev server if types don't update.

## Cascade Warning

- Changing size tokens affects shadow tokens (shadows reference `{sizes.*}`)
- Changing primitive colors affects ALL semantic tokens referencing that family
- Always verify downstream impact after token changes
