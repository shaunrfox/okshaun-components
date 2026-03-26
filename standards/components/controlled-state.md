# Controlled State Standard

Interactive components are controlled-first by default.

## Hard Standards

1. Default API model is controlled state (`value/checked` + `onChange`).
2. Overlays and pickers must support controlled visibility (`open` + `onOpenChange`).
3. Any uncontrolled fallback must be documented as compatibility/transitional behavior, not preferred API.
4. Value-owning components should emit domain values from `onChange`; emit `null` only for intentional clear.

## Hard With Exceptions

Controlled-first can opt out for documented integration scenarios (example: using menu UI while delegating behavior to third-party control systems).

## Scope Notes

- Native input wrappers (`Checkbox`, `Radio`, `Toggle`) may emit DOM events by design.
- Action components (`MenuItem`) may expose click/action events instead of domain value payloads.
