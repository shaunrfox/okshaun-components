# List and ListItem

## Current state and Cetec delta

Okshaun List contains fallback listbox keyboard navigation and ListItem supports
button rows with active and selected states. Cetec makes density part of the
List recipe, allows ListItem anchors, adds icon fill control and structural
before/after slots, and delegates keyboard navigation to owners such as Menu
and Select.

## Target API

Add `href?: string`, `iconBeforeFill`, and `iconAfterFill` to ListItem.
Retain `active` for compatibility even if Menu and Select move to managed focus
and selected state. Keep List's query/highlight/density context.

## Element behavior

Render an anchor when `href` is provided and a button otherwise. Forward valid
anchor attributes such as target and rel through the polymorphic Box type.
Disabled links must not navigate and require an accessible disabled pattern.

List itself remains presentation plus context. Remove fallback keyboard
navigation only after Select and any standalone listbox stories have owner
navigation. If retained, ensure it does not conflict with Floating UI handlers.

## Recipe changes

Pass density to the List recipe. Add reusable density structure and
beforeSlot/afterSlot classes for controls and icons. Port layout and selector
behavior using okshaun tokens while preserving active-state visibility fixed in
the current library.

## Accessibility

Do not assign `role=option` unconditionally to ordinary linked lists. The owner
should set list/listbox/menu roles appropriate to the use case. Define the
default ListItem semantics and allow Menu/Select to supply specialized roles.

Nested checkbox/toggle controls remain untabbable when the row owns selection.

## Stories and documentation

Add linked items, icon fills, density conditions, disabled links, selected and
active states, highlighted filtering, and standalone keyboard examples.
Document owner-managed roles and navigation.

## Verification

Test anchor navigation attributes, disabled behavior, focus visibility,
density propagation, and compatibility with Menu and Select. Confirm removal
of duplicate key handling before deleting fallback navigation.

## Dependencies and exclusions

Depends on responsive density recipes. Keep okshaun row spacing, colors, and
active-state treatment.

