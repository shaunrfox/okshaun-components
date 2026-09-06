# Badge

## Current state and Cetec delta

Okshaun Badge supports count and visual variants through `lg`. Cetec derives
size from SlotContext and adds an `xl` size.

## Target API

Keep current Badge props and `BadgeVariant` compatibility type. Derive variant
and size types from the generated Badge recipe. Add `xl` only if it maps
coherently onto okshaun's size scale.

## Implementation

Resolve explicit size before SlotContext size. Preserve count formatting,
maximum-count behavior, text badges, and existing accessibility semantics.

## Recipe changes

Add structural `xl` geometry using okshaun spacing and typography tokens. Do
not copy Cetec numeric values. Ensure responsive size values generate static
CSS.

## Stories and documentation

Cover all sizes, responsive size, count overflow, text content, slot use inside
Button/TextInput/Chip, and explicit override behavior.

## Verification

Confirm count width remains stable, inherited sizes align with sibling slot
content, declarations expose the new size, and existing variants are unchanged.

## Dependencies and exclusions

Depends on SlotContext and responsive recipes. Keep okshaun badge colors,
typography, radius, and count-animation behavior.

