# RadioGroup

## Current state and Cetec delta

Okshaun exposes individual controlled Radio and RadioInput components but no
group state owner. Cetec adds a controlled/uncontrolled RadioGroup context that
provides name, selected value, disabled state, and a selection callback to
RadioInput.

## Target API

Add `RadioGroupProps` with:

- required `name`
- `value?: string | null`
- `defaultValue?: string | null`
- `onChange?: (value: string) => void`
- `children`
- `label?: string`
- `id?: string`
- `disabled?: boolean`

RadioInput gains an optional `value`. When both group context and value exist,
the group owns checked state and name. Standalone RadioInput remains supported.

## Behavior

Support controlled and uncontrolled selection. Group disabled state is the
default for children, but an explicit child policy must follow the shared
context precedence decision. Radio selection invokes the group callback once
and the RadioInput event callback once.

Use native radio inputs so browser arrow-key behavior and form submission
remain available. All grouped radios share the group name.

## Accessibility

Render `role="radiogroup"` with either `aria-label` or `aria-labelledby`.
Define a stable label-ID pattern when the group is composed with FormField.
Do not create duplicate tabbable wrappers.

## Stories and documentation

Add controlled, uncontrolled, disabled, FormField-composed, and native form
submission stories. Include an interaction story that arrows between choices
and verifies one checked value.

## Verification

Verify name propagation, initial default selection, controlled behavior,
disabled state, callback count, and submitted form data. Check standalone
RadioInput compatibility.

## Dependencies and exclusions

Depends on controllable-state policy, Radio, RadioInput, and FieldContext. Do
not copy Cetec spacing or radio colors.

