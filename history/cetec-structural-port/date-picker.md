# DatePicker and Calendar

## Current state and Cetec delta

Okshaun DatePicker provides segmented date entry and a calendar popover.
Cetec adds `defaultValue`, `defaultOpen`, invalid state, FormField inheritance,
and substantive Calendar divergence that must be reviewed behavior by behavior.

## Target API

Add:

- `defaultValue?: DateValue | null`
- `defaultOpen?: boolean`
- `invalid?: boolean`

Size, disabled, error, and invalid resolve through FieldContext. Keep current
controlled APIs, min/max dates, labels, names, and segment behavior.

## State behavior

Initialize uncontrolled segments and calendar view from `defaultValue`.
Controlled `value` remains authoritative and must synchronize segments and view
without destroying partially typed input unnecessarily.

Open state follows the shared controlled/uncontrolled contract. Calendar
selection commits a value, invokes `onChange`, and closes according to current
okshaun behavior. Escape closes and restores focus.

## Calendar reconciliation

Compare Cetec Calendar changes separately for:

- Month navigation and min/max boundaries.
- First-day and date-grid calculations.
- Disabled-day semantics.
- Focus movement across weeks and months.
- Today and selected state.
- Pointer selection and focus restoration.

Port correctness and accessibility fixes; retain okshaun locale assumptions,
tokens, icons, and visual layout unless a structural change requires adaptation.

## Recipe and accessibility

Add invalid selectors and field-derived size without copying Cetec dimensions.
The segmented group emits `aria-invalid`; individual editable segments retain
usable labels. Associate FormField messages where available.

## Stories and documentation

Add controlled/uncontrolled value and open examples, invalid FormField use,
min/max boundaries, keyboard calendar navigation, partial entry, clearing,
responsive sizes, and range-wrapper compatibility.

## Verification

Test date parsing, leap days, month/year boundaries, disabled dates, callback
counts, initial defaults, controlled synchronization, focus return, and
DateRangePicker type compatibility.

## Dependencies and exclusions

Depends on FieldContext, controllable-state policy, and responsive recipes. Do
not import Cetec date colors, fonts, spacing, or locale assumptions.

