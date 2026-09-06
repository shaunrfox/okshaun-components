# Modal

## Current state and Cetec delta

Okshaun Modal uses a `variant` recipe dimension alongside size. Cetec replaces
that concept with a dedicated `position` variant and adds a wrapper that
positions the dialog independently from the full-screen overlay.

## Target API

Add `position?: 'centered' | other supported okshaun positions` derived from
the Modal recipe. Retain the existing `variant` prop as a deprecated alias
during the compatibility window. Define an explicit mapping from each current
variant to a position or visual variant; do not silently reinterpret values.

## Structure and behavior

Render a portal containing a position wrapper, overlay, and focus-managed
dialog. Overlay must still cover the viewport, lock scroll, honor
`preventOverlayClose`, and participate in closing animation.

Preserve:

- Controlled `open` state.
- Escape dismissal.
- Focus trap and focus return.
- Closing phase and data-state animation.
- Modal context for Header, Body, and Footer.
- Consumer IDs and ARIA labeling.

Ensure clicks inside the dialog do not trigger overlay dismissal and the
position wrapper does not block overlay pointer events.

## Recipe changes

Add `positionWrapper` and `position` variants while retaining okshaun overlay,
surface, shadow, radius, spacing, and motion tokens. Separate positioning from
visual style so future variants do not overload one API.

## Stories and documentation

Cover every position, size, overlay-click prevention, Escape, long scrolling
content, nested focusable controls, initial focus, focus return, and closing
animation. Add a compatibility story for the old variant alias.

## Verification

Assert focus is trapped while open and restored after close, overlay clicks
respect policy, scroll locking is removed after animation, and all positions
work at narrow viewports.

## Dependencies and exclusions

Depends on responsive recipe structure and floating-UI helpers. Do not copy
Cetec modal dimensions, shadows, surfaces, or animation values.

