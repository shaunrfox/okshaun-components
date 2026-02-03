# Component Prop Type Convention

Every component follows this type pattern to preserve polymorphism while adding recipe variants.

## Pattern

```typescript
export type ComponentProps = Omit<BoxProps, keyof VariantProps> &
  VariantProps & {
    // component-specific props
  };
```

## Order

1. Start with `BoxProps` (includes `as`, style props, HTML attrs)
2. `Omit` any keys that conflict with recipe variant props
3. Union in the recipe's `VariantProps`
4. Add component-specific props last

## Examples

```typescript
// Simple component
export type TextProps = Omit<BoxProps, keyof TextVariantProps> &
  TextVariantProps & { children?: React.ReactNode };

// Component that re-types recipe props
export type ButtonProps = Omit<BoxProps, keyof ButtonVariantProps> &
  Omit<ButtonVariantProps, 'iconBefore' | 'iconAfter'> & {
    iconBefore?: IconNamesList;  // Re-typed from boolean to icon name
    iconAfter?: IconNamesList;
    href?: string;
  };
```

## Rules

- Never skip the `Omit` step — recipe variant names can clash with HTML attributes
- If a recipe prop needs a different type in the component API, omit it from VariantProps and re-declare
- Ref is extracted from props and passed to Box directly (no `React.forwardRef` wrapper needed)
