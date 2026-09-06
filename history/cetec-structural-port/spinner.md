# Spinner

## Current state and Cetec delta

Okshaun Spinner renders a CSS/div structure. Cetec renders a generated
`spinner` sprite icon, derives size from SlotContext, and expands size support.

## Target API

Retain `inverse`, `centered`, current size names, class/style props, and
accessibility behavior. Add slot-derived responsive size. Introduce additional
sizes only where they fit the okshaun scale.

## Implementation

Add the spinner SVG through the normal sprite pipeline and render it using
Icon. Ensure animation applies to the icon without making all Icon instances
spin. Centered mode remains an overlay/layout option and must not change the
containing block unexpectedly.

The Spinner should be decorative when a parent Button or Chip exposes
`aria-busy`; standalone usage needs a documented status label pattern.

## Recipe changes

Replace spinnerDiv-specific structure with icon-compatible classes while
retaining okshaun duration, easing, fill, inverse, centered, and reduced-motion
behavior.

## Stories and documentation

Cover every size, responsive and slot-inherited sizes, inverse surfaces,
centered use, Button/Chip loading, reduced motion, and standalone accessible
status usage.

## Verification

Run sprite generation, inspect animation and fill in both themes, confirm
centered layout, and verify existing loading components remain dimensionally
stable.

## Dependencies and exclusions

Depends on Icon assets, SlotContext, and packaging. Do not copy Cetec spinner
dimensions, colors, or default-size changes automatically.

