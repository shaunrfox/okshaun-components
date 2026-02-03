# Shared Base Styles

Related recipes can share a base styles object to avoid duplication.

## Pattern

```typescript
// Shared base extracted as constant
const baseButtonStyles = {
  container: {
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    // ... common button styles
  },
  icon: {
    display: 'inline-flex',
  },
};

// Both recipes use the same base
export const buttonRecipe = defineSlotRecipe({
  base: baseButtonStyles,
  variants: { ...buttonVariants, size: { /* button sizes */ } },
});

export const iconButtonRecipe = defineSlotRecipe({
  base: baseButtonStyles,
  variants: { ...buttonVariants, size: { /* icon button sizes */ } },
});
```

## Rules

- Only share base styles between truly related components (same family)
- Variants can also be shared via spread: `{ ...buttonVariants, size: { ... } }`
- Keep shared objects in the same file as the recipes that use them
- If base styles diverge significantly, stop sharing and duplicate instead
