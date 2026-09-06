# Skeleton

## Current state and Cetec delta

Okshaun has Spinner for indeterminate activity but no placeholder component.
Cetec adds Skeleton variants for text, circles, rounded blocks, and rectangles,
with pulse, wave, or disabled animation and optional child-content sizing.

## Target API

Add:

- `variant?: 'text' | 'circular' | 'rounded' | 'rectangular'`
- `animation?: 'pulse' | 'wave' | false`
- `component?: ElementType`
- `width?: Box-compatible width`
- `height?: Box-compatible height`
- `children?: ReactNode`

Default to a text skeleton with pulse animation rendered as a span.

## Behavior and recipe

When children are present, render them invisibly enough to establish layout
while preventing interaction and duplicate accessibility exposure. If width or
height is supplied, it wins over content-derived sizing. Map `animation=false`
to a static recipe state rather than branching class construction.

Use existing okshaun neutral background, radius, and animation tokens. Port the
wave pseudo-element structure only if it works under both themes and respects
overflow.

## Accessibility

Skeleton is presentational by default and should not announce child content.
Documentation should show authors placing `aria-busy` on the loading region
and providing an external accessible label when needed. Respect
`prefers-reduced-motion` by disabling pulse and wave animation.

## Stories and documentation

Cover all shapes, animation modes, explicit dimensions, multiple text lines,
content-wrapping, reduced motion, and light/dark themes. Contrast Skeleton with
Spinner in the loading guidance.

## Verification

Confirm no layout shift between child-backed skeleton and revealed content,
animations stop under reduced motion, and custom `component` types receive
valid props. Validate recipe generation, declarations, and Storybook.

## Dependencies and exclusions

Depends on responsive recipe structure and exports. Do not copy Cetec neutral
colors or animation timing values when okshaun equivalents exist.

