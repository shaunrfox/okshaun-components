# FormField

## Current state and Cetec delta

Okshaun FormField clones direct children to inject size and state. Cetec uses
FieldContext, adds invalid and success states, success messaging, stable label
IDs, layout typing, and configurable input gaps.

## Target API

Add:

- `invalid?: boolean`
- `success?: boolean`
- `successText?: string`
- typed `layout`
- token-typed `gap`

Keep `error` for compatibility. Define the distinction: `invalid` is the
semantic ARIA state; `error` remains a supported visual/error-message alias.
If either is true, child controls receive invalid/error context as appropriate.

## Implementation

Remove child cloning. Wrap the inputs region in FieldContext carrying size,
error, invalid, and disabled. Render children unchanged so fragments, nested
layout, and custom controls work.

Generate `${labelFor}-label` for the Label ID. Associate help, error, and success
text with controls through documented IDs where practical; individual controls
must merge `aria-describedby` rather than overwrite consumer values.

If success and error/invalid are simultaneously true, error/invalid wins and
success messaging is suppressed. Required indication remains visual and the
native control remains responsible for `required`.

## Recipe changes

Port structural layout and state selectors, not Cetec spacing or colors. Use
okshaun success and danger semantic tokens. Preserve current inline and stacked
layouts.

## Stories and documentation

Cover nested controls, explicit child overrides, required, disabled, error,
invalid, success, help text, tooltip help, inline layout, custom gaps, and
responsive size. Update FormField guidance to favor context-aware controls.

## Verification

Confirm non-element children no longer disappear, nested controls inherit
state, IDs are unique, message precedence is deterministic, and current direct
children render identically enough to avoid visual regressions.

## Dependencies and exclusions

Depends on FieldContext and responsive recipes. Do not copy Cetec label
typography, spacing scale choices, or validation colors.

