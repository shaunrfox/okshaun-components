# Recipe Naming & Registration

Recipes follow a strict naming convention from definition to preset registration.

## Naming Rules

| Stage | Convention | Example |
|-------|-----------|---------|
| File name | lowercase, no suffix | `button.ts` |
| Export name | camelCase + `Recipe` suffix | `buttonRecipe` |
| `className` field | lowercase | `'button'` |
| `jsx` field | Component name array | `['Button']` |
| Preset registration | suffix stripped | `button: buttonRecipe` |

## Registration in preset.ts

```typescript
import * as componentRecipes from './recipes';

// Slot recipes extracted explicitly
const { buttonRecipe, modalRecipe, ...regularComponents } = componentRecipes;

// Regular recipes: strip "Recipe" suffix automatically
const transformedRecipes = Object.fromEntries(
  Object.entries(regularComponents).map(([key, value]) => [
    key.replace(/Recipe$/, ''),
    value,
  ]),
);

// Register separately
recipes: { ...transformedRecipes },        // Regular recipes
slotRecipes: { button: buttonRecipe, ... } // Slot recipes (manual)
```

## Adding a New Recipe

1. Create `src/recipes/newThing.ts` with `defineRecipe()` or `defineSlotRecipe()`
2. Export from `src/recipes/index.ts` as `newThingRecipe`
3. In `src/preset.ts`:
   - Regular recipe: automatically picked up via spread
   - Slot recipe: add explicitly to `slotRecipes` object AND destructure from import
4. Run `npm run panda`

## When to Use Slot Recipe

- Component has 2+ visual sub-elements (e.g., button container + icon)
- Needs compound variants (style changes based on multiple variant combinations)
- Sub-components need to access specific slot styles

## Slot Naming

Slots use generic names, not component-prefixed:

```typescript
// YES
slots: ['container', 'icon', 'header', 'body']

// NO
slots: ['buttonContainer', 'buttonIcon']
```
