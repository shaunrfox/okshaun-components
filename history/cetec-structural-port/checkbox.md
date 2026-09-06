# Checkbox

## Current state and Cetec delta

Okshaun Checkbox requires `checked` and `onChange` and chooses one icon in
JavaScript. Cetec supports native controlled or uncontrolled state, applies the
native indeterminate property, inherits FieldContext state, and renders static
state icons selected by CSS.

## Target API

Make `checked` and `onChange` optional. Add `defaultChecked?: boolean` and
`invalid?: boolean`. Keep required `name`, `indeterminate`, recipe variant
props, and current event types.

## Implementation

If `checked` is defined, pass it to the native input. Otherwise pass
`defaultChecked`. Set `input.indeterminate` from an effect/ref and expose
`aria-checked="mixed"` when active.

Resolve disabled, error, and invalid through explicit props then FieldContext.
Render all state icons with `aria-hidden` and use recipe selectors tied to the
native input state. This allows uncontrolled visuals without React state.

## Accessibility and form behavior

Preserve native checkbox semantics, form submission, focus, and change events.
Invalid state sets `aria-invalid`; error may remain visual for compatibility.
Indeterminate does not imply checked and must be controlled separately.

## Stories and documentation

Add uncontrolled, controlled, indeterminate transitions, FormField
inheritance, disabled, invalid, native form reset, and interaction stories.

## Verification

Assert native checked/defaultChecked behavior, form reset, submitted values,
mixed ARIA state, icon visuals, and single callback invocation.

## Dependencies and exclusions

Depends on FieldContext and static-state recipes. Keep okshaun checkbox icons,
colors, and dimensions.

