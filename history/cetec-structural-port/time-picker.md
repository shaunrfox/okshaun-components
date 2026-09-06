# TimePicker

## Current state and Cetec delta

Okshaun TimePicker provides segmented time entry and a list popover. Cetec adds
`defaultValue`, `defaultOpen`, invalid state, and FormField inheritance while
retaining 12-hour/24-hour and minute-step behavior.

## Target API

Add:

- `defaultValue?: TimeValue | null`
- `defaultOpen?: boolean`
- `invalid?: boolean`

Resolve size, disabled, error, and invalid from explicit props then
FieldContext. Keep `hourCycle`, `minuteStep`, labels, controlled APIs, and
existing exported value types.

## State behavior

Initialize numeric segments, raw input, AM/PM, and list position from the
resolved initial value. Controlled value updates must synchronize committed
segments while preserving valid in-progress editing rules.

Open state follows the shared controlled/uncontrolled contract. Enter and arrow
keys retain current segment editing behavior; list selection commits one value
and closes consistently. Escape closes and restores focus.

## Accessibility

The segmented control remains a labeled group with `aria-disabled` and
`aria-invalid`. Each segment has a meaningful accessible label and predictable
arrow-key behavior. The popup list exposes current selection and disabled
minute choices correctly.

## Recipe changes

Add invalid and inherited-state selectors without copying Cetec dimensions or
colors. Preserve okshaun typography, focus treatment, and popover geometry.

## Stories and documentation

Cover controlled/uncontrolled values and open state, 12-hour and 24-hour
formats, minute steps, midnight/noon, invalid FormField composition, partial
typing, clearing, responsive size, and TimeRangePicker integration.

## Verification

Test conversion between display and 24-hour internal values, boundary arrows,
minute-step rounding, callback count, default initialization, controlled
synchronization, focus return, and range-wrapper type compatibility.

## Dependencies and exclusions

Depends on FieldContext, controllable-state policy, and responsive recipes. Do
not copy Cetec time colors, fonts, spacing, or default locale decisions.

