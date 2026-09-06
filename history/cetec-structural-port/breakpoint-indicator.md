# BreakpointIndicator

## Current state and Cetec delta

Okshaun BreakpointIndicator renders a fixed Tag for the largest matching
breakpoint and exposes no style props. Cetec makes it a named export with
Box-compatible props and a dedicated recipe.

## Target API

Add `BreakpointIndicatorProps` derived from Box props and its recipe variants.
Keep the existing named export and add a default export only if current
consumers require it.

## Implementation

Preserve the current media-query hook sequence and largest-breakpoint
resolution. Apply recipe and consumer class names consistently to each
rendered Tag. Avoid reconstructing identical recipe output in every branch;
compute the breakpoint data first, then render once.

## Recipe changes

Add a dedicated recipe for positioning or display variants needed by docs and
responsive examples. Use okshaun Tag hues and retain current breakpoint color
mapping rather than Cetec's palette.

## Accessibility

Treat the indicator as development/documentation output. Its visible label is
sufficient; avoid live-region announcements on resize.

## Stories and documentation

Add recipe variants, custom Box props, theme coverage, and use alongside
responsive Card, Heading, Textarea, Menu density, and Avatar examples.

## Verification

Resize through every configured breakpoint, confirm the largest match,
consumer class/style forwarding, and static recipe generation.

## Dependencies and exclusions

Depends on responsive recipes, Tag, and media-query hooks. Do not copy Cetec
hue choices or tag variant naming.

