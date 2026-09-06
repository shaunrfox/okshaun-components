# ToggleInput

## Current state and Cetec delta

Okshaun ToggleInput is a labeled controlled Toggle. Cetec adds uncontrolled
defaults, invalid state, and FormField inheritance.

## Target API

Make `checked` and `onChange` optional. Add `defaultChecked?: boolean` and
`invalid?: boolean`. Preserve name, generated/custom ID, children, disabled,
error, and recipe props.

## Implementation

Resolve field defaults once and pass them to Toggle. Forward either checked or
defaultChecked according to controlled status. Preserve Label association and
native form behavior.

## Stories and documentation

Cover controlled/uncontrolled, default-on, disabled, invalid FormField,
rich-label content, form reset, and keyboard activation.

## Verification

Assert label click behavior, one callback per interaction, form submission,
reset behavior, generated IDs, and context precedence.

## Dependencies and exclusions

Depends on Toggle and FieldContext. Preserve okshaun layout, spacing, and
typography.

