# Button

## Current state and Cetec delta

Okshaun Button accepts named before/after icons and an adjustable gap. Cetec
adds arbitrary before/after content, FieldContext and SlotContext inheritance,
validation state, and a slot-based recipe. It keeps named icons temporarily as
compatibility props.

## Target API

Add `before?: ReactNode`, `after?: ReactNode`, `error?: boolean`, and
`invalid?: boolean`. Retain `iconBefore`, `iconAfter`, and `gap` during the
compatibility window. Arbitrary content wins when both APIs target the same
side; emit a development warning.

Preserve button, submit, reset, and anchor behavior. Loading and disabled links
must remain noninteractive and accessible.

## Implementation

Resolve size and state from explicit props, then SlotContext, then
FieldContext. Convert named icons to Icon elements. Wrap each side in a
SlotContext provider and a recipe slot; wrap children in `mainContent`.

Do not forward button-only attributes to anchors. Preserve consumer handlers
and prevent disabled anchors from navigating. Loading keeps stable dimensions,
sets busy/live semantics, and uses Spinner without exposing duplicate text.

## Recipe changes

Adopt mainContent and slot structure plus CSS variables for size geometry.
Retain all okshaun variants and visual tokens. Do not rename the current default
variant merely to match Cetec.

## Stories and documentation

Cover arbitrary Icon, Avatar, Badge, and Spinner slots; compatibility icon
props; responsive sizes; loading; links; validation inheritance; and explicit
prop overrides.

## Verification

Test semantic element selection, submit behavior, disabled links, loading
announcement, slot sizing, warning precedence, and existing Button story
interactions.

## Dependencies and exclusions

Depends on FieldContext, SlotContext, Icon, Spinner, and responsive recipes.
Do not copy Cetec CTA colors, spacing values, or font.

