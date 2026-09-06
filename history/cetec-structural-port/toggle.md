# Toggle

## Current state and Cetec delta

Okshaun Toggle requires controlled checked state. Cetec supports controlled or
uncontrolled native behavior, inherits FieldContext state, and renders static
off/on icons selected through CSS.

## Target API

Make `checked` and `onChange` optional. Add `defaultChecked?: boolean` and
`invalid?: boolean`. Keep required name and current event/recipe types.

## Implementation

Use native checked/defaultChecked behavior. Resolve disabled, error, and
invalid from explicit props then FieldContext. Render both visual states with
`aria-hidden` and use recipe selectors based on the native input.

Preserve the current semantic choice of checkbox input. Do not change to
`role=switch` without a separate API/accessibility decision; if switch
semantics are already promised, document and implement them consistently.

## Stories and documentation

Add controlled, uncontrolled, default-on, FormField validation, disabled,
native form reset/submission, and keyboard activation stories.

## Verification

Check Space activation, checked state, callback count, form values, reset
behavior, focus visuals, and explicit-over-context precedence.

## Dependencies and exclusions

Depends on FieldContext and static-state recipes. Keep okshaun toggle icons,
colors, sizing, and semantic contract.

