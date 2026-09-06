# Select

## Current state and Cetec delta

Okshaun Select is a controlled-or-internally-empty custom listbox with a button
trigger, SelectContext, SelectTrigger, and support for multiple values. Cetec
adds explicit uncontrolled defaults, chip rendering for multiple selections,
hidden form fields, improved combobox semantics, auto sizing, selected
checkmarks, clear behavior, and stronger keyboard handling.

## Target API

Add:

- `defaultValue?: string | string[] | null`
- `defaultOpen?: boolean`
- `name?: string`
- `autoSize?: boolean`

Keep `value`, `open`, `onChange`, `onOpenChange`, `multiple`, placement,
density, size, error, disabled, and existing option APIs.

Retain `SelectTrigger` and SelectContext during a compatibility window even if
the main implementation no longer requires them. Mark them deprecated only
after confirming external usage.

## Value and form behavior

Controlled props win over defaults. Multi-select displays selected options as
dismissible Chips and emits one hidden input per selected value when `name` is
provided. Single-select emits one hidden input.

Selecting the currently selected single option clears the value. Backspace or
Delete clears a closed single-select value. Dismissing a chip updates only that
value and must not toggle the popup.

## Keyboard and ARIA behavior

Use a focusable combobox trigger with `aria-expanded`, `aria-controls`, and
`aria-activedescendant`. Enter, Space, ArrowDown, and ArrowUp open the popup.
List navigation starts from selected or first enabled option, loops, and skips
disabled options. Escape closes and returns focus predictably.

The list uses `role=listbox`; options use stable IDs and selected state.
Multiple mode sets `aria-multiselectable`.

## Recipe and composition

Adopt root, trigger, content, value, placeholder, chips, and icon slots.
Support wrapping/auto-height behavior under `autoSize`; otherwise chips remain
single-line and horizontally scrollable. Derive Chip sizing conservatively for
responsive Select sizes and document the fallback.

Use List and Chip public APIs rather than duplicating their internals. All
visual values remain okshaun tokens.

## Stories and documentation

Add controlled/uncontrolled value and open-state examples, form submission,
single clearing, multi chip dismissal, disabled options, custom option icons,
responsive sizes, autoSize, validation, and keyboard interactions.

## Verification

Assert callback values, hidden inputs, active descendant IDs, focus return,
selected indicators, and chip-dismiss event isolation. Confirm existing
SelectTrigger consumers compile during the compatibility window.

## Dependencies and exclusions

Depends on List, Chip, controllable state, FieldContext, and responsive recipes.
Do not copy Cetec selected colors, input dimensions, or icon palette.

