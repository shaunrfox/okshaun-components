# CheckboxInput

## Current state and Cetec delta

Okshaun CheckboxInput is a labeled controlled Checkbox composition. Cetec adds
uncontrolled defaults, invalid state, and FormField inheritance.

## Target API

Make `checked` and `onChange` optional. Add `defaultChecked?: boolean` and
`invalid?: boolean`. Keep required name, optional ID, children, disabled,
error, indeterminate, and recipe props.

## Implementation

Resolve field state in CheckboxInput and pass it explicitly to Checkbox so the
wrapper and control share one state. Preserve generated IDs and Label
association. Do not add a second state owner.

Forward `defaultChecked` only when `checked` is undefined. Preserve native form
reset and submission.

## Accessibility

The Label remains the clickable accessible name. Invalid state reaches the
native input. Indeterminate state remains announced as mixed through Checkbox.

## Stories and documentation

Cover controlled, uncontrolled, indeterminate, disabled, invalid FormField
composition, rich label content, native form reset, and responsive styling.

## Verification

Click the label and control, assert one change callback, verify generated IDs,
form data, and context override behavior.

## Dependencies and exclusions

Depends on Checkbox and FieldContext. Preserve okshaun label spacing and
typography.

