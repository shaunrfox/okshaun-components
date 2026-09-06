# Radio

## Current state and Cetec delta

Okshaun Radio requires controlled checked state. Cetec supports native
controlled or uncontrolled behavior, inherits FieldContext state, and renders
static unchecked/checked/focus icons selected by CSS.

## Target API

Make `name`, `checked`, and `onChange` optional for standalone composition.
Add `defaultChecked?: boolean` and `invalid?: boolean`. Preserve current event
types and recipe variants.

## Implementation

Use native `checked` when controlled and `defaultChecked` otherwise. Resolve
disabled, error, and invalid from explicit props then FieldContext. Render all
state icons with `aria-hidden`; let recipe selectors reflect the native state.

RadioGroup integration belongs in RadioInput so the primitive stays compatible
with direct native-radio usage.

## Accessibility and form behavior

Preserve native radio semantics, names, focus, form submission, and browser
group keyboard behavior. Set `aria-invalid` for invalid state.

## Stories and documentation

Add controlled, uncontrolled, native same-name grouping, FormField state,
disabled, invalid, form reset, and keyboard navigation stories.

## Verification

Check default selection, same-name exclusivity, form data, arrow navigation,
focus visuals, and callback counts.

## Dependencies and exclusions

Depends on FieldContext and static-state recipes. Keep okshaun radio icons,
colors, and dimensions.

