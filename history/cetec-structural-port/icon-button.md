# IconButton

## Current state and Cetec delta

Okshaun IconButton has icon, label, loading, variant, and size behavior. Cetec
adds FieldContext and SlotContext inheritance, error/invalid state, and
mainContent/slot recipe structure.

## Target API

Add `error?: boolean` and `invalid?: boolean`. Preserve icon name, accessible
label, href, loading, disabled, type, size, and all current variants.

## Implementation

Resolve size and state from explicit props, SlotContext, then FieldContext.
Apply native disabled behavior or accessible disabled-link behavior. Add
`aria-invalid`, validation data attributes, and stable busy semantics.

Render the Icon through structural mainContent and slot classes so it composes
correctly inside TextInput and other slots. Loading must preserve button size
and accessible name.

## Recipe changes

Add structural slots without adopting Cetec's `standard` default rename or CTA
palette. Preserve okshaun icon-button variants and focus treatment.

## Stories and documentation

Cover FormField inheritance, TextInput slot composition, responsive sizing,
loading, disabled anchor/button behavior, validation states, and every current
variant.

## Verification

Inspect focus rings, hit area, accessible name, disabled navigation, slot
alignment, and Spinner replacement. Ensure existing consumers compile.

## Dependencies and exclusions

Depends on contexts, Icon, Spinner, and Button slot conventions. No Cetec
colors, dimensions, or variant naming changes are copied.

