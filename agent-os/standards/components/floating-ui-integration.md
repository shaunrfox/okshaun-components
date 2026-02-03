# Floating UI Integration

Modal, Menu, Select, and Tooltip all use Floating UI for positioning and interaction.

## Standard Structure

```typescript
// 1. Floating hooks
const { refs, floatingStyles, context } = useFloating({ /* config */ });
const click = useClick(context);
const dismiss = useDismiss(context);
const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

// 2. Render with portal
<FloatingPortal>
  <FloatingFocusManager context={context}>
    <Box ref={refs.setFloating} style={floatingStyles}
      {...(getFloatingProps() as Record<string, unknown>)}>
      {children}
    </Box>
  </FloatingFocusManager>
</FloatingPortal>
```

## Type Cast Workaround

Floating UI's return types are complex. Cast to `Record<string, unknown>`:

```typescript
// Required pattern — used in ALL floating components
{...(getFloatingProps() as Record<string, unknown>)}
{...(getReferenceProps() as Record<string, unknown>)}
{...(getItemProps({ index }) as Record<string, unknown>)}
```

This loses type safety but is the established workaround. Don't fight it.

## Rules

- Always wrap floating content in `FloatingPortal`
- Always use `FloatingFocusManager` for keyboard accessibility
- Always cast Floating UI prop getters to `Record<string, unknown>`
- Trigger components use `cloneElement` to inject ref and ARIA props into children
