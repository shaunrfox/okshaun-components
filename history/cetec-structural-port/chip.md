# Chip and ChipGroup

## Current state and Cetec delta

Okshaun Chip renders one button and treats dismissal as the button's primary
action. ChipGroup is controlled-only and owns keyboard navigation. Cetec
separates body and dismiss actions, supports noninteractive chips, arbitrary
slots, field and slot inheritance, controlled/uncontrolled groups, group size,
validation states, and an additional `xl` size.

## Target API

Chip adds `dismissLabel`, `error`, `invalid`, and button `type`. Keep
`before`, `after`, `dismissable`, `onDismiss`, `onClick`, `value`, loading,
disabled, and deleted.

Retain `children: ReactNode` compatibility even though Cetec narrows it to
string. Require an explicit `dismissLabel` when children cannot produce a
useful accessible label.

ChipGroup changes `value` and `onChange` to optional and adds `defaultValue`
and `size`.

## Interaction structure

Render a container with:

- A button body when selectable or clickable.
- A noninteractive span body otherwise.
- A separate dismiss button when dismissable.
- A centered loading Spinner that does not remove accessible state.

Dismiss clicks stop propagation and invoke only `onDismiss`. Body clicks invoke
selection behavior and then the consumer `onClick`. Disabled or loading chips
must not register as keyboard-navigation targets.

## Group behavior

Support single and multi controlled/uncontrolled values. Single groups use
roving tab index and selection follows arrow-key focus. Multi groups leave each
enabled chip tabbable and Space/Enter toggles selection. Registration order
must update safely as children mount, unmount, or become disabled.

## Recipe and context

Adopt container, body, mainContent, dismissButton, and slot recipe slots.
Port structural CSS variables and responsive sizes using okshaun tokens.
Before/after children receive SlotContext; group size and FormField state are
defaults.

## Stories and documentation

Cover static, clickable, dismissible, clickable+dismissible, loading,
validation, deleted, arbitrary slots, single/multi groups, uncontrolled groups,
responsive sizing, and keyboard navigation.

## Verification

Assert independent action callbacks, accessible dismiss labels, group values,
roving focus, disabled registration, and form-compatible button types. Run
React Doctor for context-value stability.

## Dependencies and exclusions

Depends on contexts, controllable state, Button/Icon/Spinner structure, and
responsive recipes. Keep okshaun chip colors, radius, and typography.

