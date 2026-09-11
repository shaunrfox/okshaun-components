# Figma Layout Standards

Layout rules for the `okshaun` Figma library's documentation pages and
component frames. They exist to stop collapsed frames, fixed-size wrappers that
fight their children, and pages that are hard to edit incrementally.

> Adapted from the Cetec Design System's `standards/figma/figma-layout-standards.md`
> (Cetec-ERP/Cetec-Design-System PR #202), by the same author. The rules were
> proven on that library's documentation pages.

## Core Principle

Prefer a small number of stable auto-layout patterns and reuse them.

The failure mode these rules prevent is a frame that looks right in metadata but
still has rigid sizing: wrappers stuck at a fixed height, horizontal groups that
hug when they should stretch, text that will not fill its container.

## Page Pattern

Top-level documentation frames:

- `layoutMode: VERTICAL`
- `layoutSizingHorizontal: FIXED`
- `layoutSizingVertical: HUG`
- `primaryAxisSizingMode: AUTO`
- `counterAxisSizingMode: FIXED`
- `clipsContent: false`

Fixed canvas width, variable vertical length, generous page padding.

## Section Wrappers

Major sections inside a page:

- `layoutMode: VERTICAL`
- `layoutSizingHorizontal: FILL`
- `layoutSizingVertical: HUG`
- `layoutAlign: STRETCH`
- `clipsContent: false`

The wrapper owns the spacing between its children. Never fake section spacing
with manual `y` positioning when the frame can own it.

## Horizontal Rows

For stat rows, side-by-side cards, and two-column mode comparisons:

- `layoutMode: HORIZONTAL`
- `layoutSizingHorizontal: FILL`
- `layoutSizingVertical: HUG`
- `layoutAlign: STRETCH`

For evenly distributed children: `layoutSizingHorizontal: FILL` plus
`layoutGrow: 1`.

## Cards

- `layoutMode: VERTICAL`
- `layoutSizingHorizontal: FILL`
- `layoutSizingVertical: HUG`
- `layoutGrow: 1` inside an equal-width row

Use consistent padding and item spacing instead of resizing a card to fit its
text.

## Text

Inside auto-layout frames, titles, headings and body copy should use
`width: fill` and `height: hug`, and stretch when the parent is vertical.

Two API notes that bite here:

- A TEXT node defaults to `textAutoResize: 'WIDTH_AND_HEIGHT'`, which ignores
  `FILL` and collapses toward zero width. For a wrapping block set
  `textAutoResize = 'HEIGHT'` and an explicit width, then verify `width > 0`.
- `resize()` resets both axis sizing modes to `FIXED`. Call it before setting
  `HUG` or `FILL`, never after.

## Sizing Order

`HUG` and `FILL` are rejected unless the node's structural context allows them:

1. Append the child to an auto-layout parent first, then set its sizing.
2. `HUG` is valid only on an auto-layout frame itself, or on a TEXT child of
   one.
3. `FILL` needs an auto-layout parent, and the child must not be
   absolutely positioned.
4. A `HUG` parent gives `FILL` children no room. The parent must be `FIXED` or
   `FILL` for a `FILL` child to expand.
