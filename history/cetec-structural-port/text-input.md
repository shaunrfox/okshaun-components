# TextInput

## Current state and Cetec delta

Okshaun TextInput accepts named icons before and after the input. Cetec accepts
arbitrary React slots, recognizes embedded Button and IconButton content,
inherits FormField state and size, and adds valid/invalid semantics.

## Target API

Add `before?: ReactNode`, `after?: ReactNode`, `valid?: boolean`, and
`invalid?: boolean`. Retain `iconBefore` and `iconAfter` as compatibility
aliases. If both forms are passed for a side, arbitrary content wins and a
development warning explains the precedence.

## Implementation

Resolve size, disabled, error, and invalid through explicit props followed by
FieldContext. Convert named icons into Icon elements, then render each side
through SlotContext.

Button and IconButton slots use a structural button-slot class; all other
content uses the normal slot class. Avoid brittle checks where possible:
prefer a documented slot contract or shared marker over component identity if
wrapped components must work.

Apply native `disabled`, `aria-invalid`, and state data attributes to the input.
Apply container data attributes for recipe selectors. Preserve consumer event
handlers, refs, autocomplete, and all valid input attributes.

## Recipe changes

Replace icon-specific recipe booleans with generic before/after booleans while
retaining compatibility aliases in TypeScript. Add container, input, slot, and
buttonSlot layout behavior using okshaun tokens. Embedded actions must have
usable focus rings and hit targets.

## Stories and documentation

Cover named icons, arbitrary Icon/Avatar/Badge content, before/after buttons,
both compatibility and new props, valid/invalid/error, FormField inheritance,
responsive sizes, disabled state, and keyboard focus order.

## Verification

Verify slot action clicks do not focus or submit unexpectedly, warnings occur
only in development, explicit props override context, and text entry behavior
is unchanged. Inspect ARIA and tab order manually.

## Dependencies and exclusions

Depends on FieldContext, SlotContext, Button, IconButton, and responsive recipe
structure. Preserve okshaun input colors, dimensions, and font.

