# Recipe Naming and Registration

Defines the contract from recipe filename to preset registration.

## Hard Standards

1. `src/recipes/**` filenames are camelCase.
2. Recipe exports use `*Recipe` suffix.
3. Regular recipes are registered by stripping `Recipe` suffix.
4. Slot recipes are explicitly registered under `theme.extend.slotRecipes`.
5. New slot recipes must complete all steps:
   - export from `src/recipes/index.ts`
   - destructure in `src/cetec-preset.ts`
   - register in `slotRecipes`
6. Recipe `jsx` names must align with component naming conventions.

## Registration Pattern

```ts
const transformedRecipes = Object.fromEntries(
  Object.entries(regularRecipes).map(([key, value]) => [
    key.replace(/Recipe$/, ''),
    value,
  ]),
);
```
