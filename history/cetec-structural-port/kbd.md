# Kbd

## Current state and Cetec delta

Okshaun has keyboard-related icons but no component for presenting shortcuts.
Cetec adds a `Kbd` component that renders one or more keys, uses semantic
`<kbd>` elements, maps common symbols to spoken labels, and exposes the expanded
shortcut through a Tooltip.

## Target API

Add `KbdProps` extending Box-compatible span props with required
`keys: KbdValue[]`. Export `KbdValue` and the special-symbol type. Keep the
initial API intentionally small; separators and platform auto-detection are out
of scope.

Supported labels include Command, Option, Control, Shift, Escape, Delete,
Return, Tab, and arrow directions. Unknown strings render and announce
themselves unchanged.

## Implementation and recipe

Render an outer inline span and one `<kbd>` per key. Use stable keys that do not
assume values are unique. Add regular and symbol variants to a dedicated recipe
using okshaun typography, border, surface, radius, and spacing tokens.

The tooltip label joins expanded key labels with “ + ”. Preserve the visible
symbols and do not replace them with Cetec fonts or platform-specific glyph
fonts.

## Accessibility

The visible `<kbd>` content remains available to assistive technology. Tooltip
text supplements abbreviated symbols. Verify keyboard focus behavior inherited
from Tooltip does not make static Kbd content unexpectedly tabbable.

## Stories and documentation

Add stories for a single key, multi-key shortcuts, symbol shortcuts, arrow
keys, unknown values, and dark theme. Add a short usage section explaining that
the component documents shortcuts but does not register key handlers.

## Verification

Build the new recipe, verify tooltip labels, inspect semantic output, and
confirm root exports and declarations. Acceptance requires responsive style
props to pass through without changing key labels.

## Dependencies and exclusions

Depends on Tooltip and responsive recipe registration. Do not copy Cetec fonts,
colors, or exact keycap styling.

