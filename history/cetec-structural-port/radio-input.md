# RadioInput

## Current state and Cetec delta

Okshaun RadioInput requires name, checked, and onChange. Cetec allows
standalone uncontrolled usage and integrates RadioInput with RadioGroup through
an optional value.

## Target API

Add `value?: string`, `defaultChecked?: boolean`, and `invalid?: boolean`.
Make name, checked, and onChange optional when RadioGroup supplies them. Keep
standalone labeled-radio usage fully supported.

## Resolution behavior

When a RadioGroup exists and `value` is supplied:

- Group name wins.
- Checked state is `group.value === value`.
- Change selects the value through group context.
- Group disabled state participates in normal precedence.

Without both group and value, use direct Radio props. Invoke both group
selection and consumer event callback exactly once.

## Accessibility

Preserve generated ID and Label association. The group owns radiogroup labeling;
each RadioInput label remains the individual radio name.

## Stories and documentation

Cover grouped controlled and uncontrolled selection, standalone controlled and
uncontrolled use, disabled groups, per-item disabled state, FormField
composition, and form submission.

## Verification

Assert group name/value propagation, callback ordering, label clicks, native
form values, keyboard navigation, and standalone compatibility.

## Dependencies and exclusions

Depends on RadioGroup, Radio, and FieldContext. Keep okshaun radio-input layout
and typography.

