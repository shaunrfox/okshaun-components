# Field and Slot Contexts

## Current state and Cetec delta

`FormField` currently clones valid React children to inject `error`, `disabled`,
`required`, and `size`. That only works for direct elements and assumes each
child accepts the same props. Nested composition and arbitrary slot content do
not inherit state.

Cetec introduces `FieldContext` for form-level defaults and `SlotContext` for
owner-specific before/after content. Components such as Button, TextInput,
Chip, Icon, Avatar, Badge, Spinner, and IconButton consume these contexts.

## Target interfaces

Add `FieldContext`, `FieldContextValue`, and `useFieldContext` with optional:

- `size`
- `disabled`
- `error`
- `invalid`

Add `SlotContext`, `SlotContextValue`, `SlotPlacement`, and `useSlotContext`
with optional:

- `owner`
- `placement: 'before' | 'after'`
- `size`
- `disabled`
- `error`
- `invalid`
- `fill`

Keep these generic enough for responsive Panda values. Do not narrow context
sizes to a single component's literal union.

## Resolution rules

For all consumers, explicit props win. Slot context is next, then field
context, then recipe defaults. A `false` explicit boolean must override a
contextual `true`; use nullish resolution rather than logical OR.

Slot providers wrap only the rendered slot subtree. They must not leak state
between before and after content or into the component's main content.

## Implementation details

- Export field context from `src/system/context/index.ts`.
- Keep slot context internal unless downstream composition needs a supported
  public hook; component prop types should remain the preferred API.
- Use stable object values or memoization where rerender cost is material.
- Do not use child cloning as a fallback after context adoption.
- Do not encode Cetec font, color, or theme information in either context.

## Accessibility and behavior

Context alone does not emit ARIA attributes. Each consuming component remains
responsible for applying `aria-disabled`, `aria-invalid`, data attributes, and
native `disabled` where semantically valid.

Disabled slot content must inherit visual state, but nested interactive
elements must also receive an actual disabled state where supported.

## Stories and documentation

Add composition stories proving:

- FormField size and validation propagate through nested wrappers.
- Button and TextInput slots inherit responsive sizing.
- Explicit child props override context.
- A false explicit validation/disabled prop can opt out of a contextual value.

Update component-standards and Panda-patterns documentation with the resolution
order and guidance for future slot-aware components.

## Verification

Typecheck context values with responsive sizes, render nested compositions in
Storybook, and run React Doctor to catch unstable provider values or invalid
prop forwarding. Completion requires all current direct-child FormField use
cases to remain functional without cloning.

## Exclusions

Do not copy Cetec field spacing, fonts, border colors, validation colors, or
theme tokens. Context transports state only.

