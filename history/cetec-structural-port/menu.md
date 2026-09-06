# Menu

## Current state and Cetec delta

Okshaun already supports inline and floating menus, filtering, hover submenus,
digin navigation, controlled open state, and density. Cetec adds a combined
click-and-hover trigger mode, APG-style horizontal menubar coordination,
stronger nested keyboard navigation, explicit focus restoration, responsive
density propagation, trigger ref/event composition, and coarse-pointer-safe
hover polygons.

## Target API

Extend `MenuTriggerInteraction` with `'click-and-hover'`.

Add `onMenubarEdgeNavigate?: (direction: 1 | -1) => void` for applications that
compose multiple Menu instances into a horizontal menubar. Keep this optional
and avoid embedding global menubar state in Menu.

Retain all existing okshaun Menu types and context aliases. Navigation helpers
remain internal.

## Interaction behavior

- Click-and-hover triggers open from either interaction and do not close from a
  safe-polygon hover transition.
- Preserve consumer trigger refs and handlers when cloning the trigger.
- When menubar coordination is enabled, focus initially remains on the trigger
  until the user enters the menu.
- ArrowDown/ArrowUp on a submenu trigger navigate siblings rather than
  prematurely entering the nested panel.
- ArrowRight opens a nested flyout and focuses its first enabled item.
- ArrowLeft closes a nested flyout and restores focus to its trigger.
- At the root edge, ArrowLeft/ArrowRight can delegate to the adjacent menubar
  section.
- Navigation loops over enabled items and skips disabled or missing nodes.
- Closing or switching menus clears stale active indices.

## Pointer behavior

Use `safePolygon`, but enable global pointer-event blocking only when no coarse
pointer is present. Subscribe to `(any-pointer: coarse)` changes and clean up
the listener. Touch interaction with nested flyouts must remain possible.

## Recipe changes

Pass density into List recipes at every root and nested level. Port structural
before/after slots, focus states, nested-panel geometry, and conditional
density support using okshaun tokens. Preserve existing panel variants and
digin visuals.

## Stories and documentation

Adapt Cetec's top-navigation menubar example and documentation. Add interactions
for click-and-hover, nested Arrow navigation, disabled items, focus return,
controlled open switching, touch/coarse-pointer behavior, filtering, and digin
mode. Retain existing okshaun stories.

## Verification

Use Storybook interaction tests for keyboard sequences and focus assertions.
Manually test pointer travel between trigger, submenu trigger, and flyout.
Run React Doctor because trigger cloning and callback composition are
high-risk.

## Dependencies and exclusions

Depends on List, responsive density recipes, and floating-UI infrastructure.
Do not copy Cetec navigation colors, top-nav styling, or exported internal
matching helpers.

