# Multi-Part Composition Standard

Standards for compound components with parent/child parts.

## Hard Standards

1. Parent component owns shared state and provides context to subparts.
2. Trigger-slot APIs accept a single `ReactElement` child when trigger props/refs must be injected.

## Hard With Exceptions

For consumer-provided triggers, `cloneElement` is required to inject refs/ARIA/interaction props.
Context alone cannot attach props to the trigger element boundary.

## Guidance

1. Compute shared recipe classes once at parent level when practical, then pass to children (via context or props).
2. If child-specific dynamic variants are required, local class computation is acceptable.

### Examples

- Shared-class pattern: `DatePicker` computes classes once and passes to `Calendar`.
- Dynamic-child case: `MenuItem` may need local variants (`itemVariant`, icon presence), so local `menu(...)` calls can be justified.
