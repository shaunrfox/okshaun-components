# Polymorphic Box Base

All components are built on `Box`, the polymorphic base component.

## Pattern

```typescript
// Box uses createElement (not JSX) to handle dynamic `as` prop
export const Box = ({ as = 'div', ...props }: BoxProps) => {
  const [className, otherProps] = splitProps(props);
  return createElement(as, { className: cx(box({}), className), ...otherProps });
};
```

## Rules

- Every component renders through `Box` (never raw HTML elements)
- `splitProps()` returns a tuple `[className, otherProps]` — destructure as array, not object
- Always merge classnames: `cx(recipeClasses, className)` — recipe first, user className last
- `as` prop enables polymorphism: `<Button as="a" href="...">` renders an anchor

## splitProps Flow

```
Component props
  → splitProps(rest)
  → [compiledClassName, remainingHTMLProps]
  → cx(recipe({ variants }), compiledClassName)
  → passed to Box
```

## Common Mistake

```typescript
// WRONG: Named destructuring
const { className, otherProps } = splitProps(rest);

// RIGHT: Tuple destructuring
const [className, otherProps] = splitProps(rest);
```
