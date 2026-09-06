# Textarea

## Current state and Cetec delta

Okshaun Textarea supports size, error, disabled, and auto sizing. Cetec adds
invalid semantics, FormField inheritance, and responsive size stories.

## Target API

Add `invalid?: boolean`. Broaden size typing to the generated responsive recipe
variant where required. Preserve error, disabled, autoSize, name, ID, and all
native textarea props.

## Implementation

Resolve size, error, invalid, and disabled from explicit props then
FieldContext. Apply native disabled and `aria-invalid`, plus state data
attributes used by the recipe. Preserve refs, value/defaultValue, resize,
events, and autocomplete behavior.

## Recipe changes

Add invalid selectors and static responsive size coverage using okshaun input
tokens. Do not copy Cetec dimensions or validation colors.

## Stories and documentation

Add FormField inheritance, explicit override, controlled/uncontrolled native
value, autoSize, invalid/error, disabled, responsive sizes, and long-content
behavior.

## Verification

Confirm typing and resizing remain stable, native form submission works,
responsive classes generate, and `aria-invalid` reflects resolved state.

## Dependencies and exclusions

Depends on FieldContext and responsive recipes. Keep okshaun typography,
surface, border, focus, and resize behavior.

