# Controlled Components

All interactive components (forms, modals, menus, selects) are controlled-only.

## Rule

State is always owned by the parent. Components require explicit state props:

```typescript
// Form inputs: checked/value + onChange
<Checkbox checked={checked} onChange={e => setChecked(e.target.checked)} />
<TextInput value={value} onChange={e => setValue(e.target.value)} />

// Overlay components: open + onOpenChange
<Modal open={open} onOpenChange={setOpen}>...</Modal>
<Menu open={open} onOpenChange={setOpen}>...</Menu>
<Select open={open} onOpenChange={setOpen} value={value} onValueChange={setValue}>...</Select>
```

## Why

- Predictable: state is visible and debuggable in parent
- Composable: works with form libraries, state management, URL sync
- Testable: set exact state without simulating user interaction
- Future-proof: compatible with React Server Components

Full rationale: `src/storybook/docs/controlled-components-philosophy.mdx`

## No Uncontrolled Mode

- No `defaultChecked`, `defaultValue`, or `defaultOpen` props
- No internal state management for form values
- Consumers must always provide state + handler

## Exception

Select maintains internal open/value state as fallback when controlled props aren't provided. This is the only component with dual-mode support (intentional for flexibility).
