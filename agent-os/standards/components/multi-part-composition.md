# Multi-Part Component Composition

Components with multiple sub-elements (Modal, Menu, Select) use Context + cloneElement.

## Architecture

```
<Parent>              ← Owns state, provides Context, holds Floating UI setup
  <Trigger>           ← cloneElement to inject ref + ARIA props into child
  <FloatingPortal>
    <Content>         ← Reads context for recipe classes + state
      <SubPart />     ← Reads context for specific slot styling
    </Content>
  </FloatingPortal>
</Parent>
```

## Context Pattern

Context holds both state AND recipe classes:

```typescript
// MenuContext provides:
{
  open: boolean;
  setOpen: (open: boolean) => void;
  activeIndex: number | null;
  classes: ReturnType<typeof menu>;  // Recipe slot output
  listRef: MutableRefObject<(HTMLElement | null)[]>;
  getItemProps: Function;
}
```

Sub-components access styling from context instead of calling the recipe again.

## Trigger Pattern

Triggers use `cloneElement` to inject props into a single child element:

```typescript
export const MenuTrigger = ({ children, disabled }: MenuTriggerProps) => {
  const { refs, getReferenceProps, open } = useMenuContext();
  return React.cloneElement(children, {
    ref: refs.setReference,
    'aria-haspopup': 'menu',
    'aria-expanded': open,
    disabled,
    ...(getReferenceProps() as Record<string, unknown>),
  });
};
```

## Rules

- Parent component owns ALL state and Floating UI setup
- Recipe is called ONCE in the parent — classes shared via context
- Sub-components read `classes.slotName` from context
- Trigger accepts a single `ReactElement` child (not arbitrary children)
- Controlled state (`open` + `onOpenChange`) is required, not optional
