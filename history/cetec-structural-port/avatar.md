# Avatar

## Current state and Cetec delta

Okshaun Avatar supports images, initials, fallback content, shape, size,
presence, and status indicators. Cetec derives size from SlotContext and maps
responsive avatar sizes to responsive status-icon sizes.

## Target API

Keep all existing Avatar props and exported types. Broaden size typing to the
generated recipe variant so conditional values are accepted. Explicit size
wins over slot size.

## Implementation

Preserve image loading/failure behavior and initials generation. Add a
deterministic mapper from avatar size to status-icon size for flat and
object-based responsive values. Array-based values require a documented
fallback unless generated types provide a safe mapping.

Keep border color as a normal Box/style prop where possible; do not copy
Cetec's raw inline-style workaround unless Panda typing requires it.

## Recipe and visual policy

Port only conditional size structure and slot composition. Retain okshaun size
names, shape support including hexagon, presence/status colors, border styles,
and icon fills.

## Stories and documentation

Add responsive sizes, Avatar inside Button/Chip slots, image failure, custom
fallback, all presence/status states, and explicit size overriding slot size.

## Verification

Check responsive root and indicator sizing at all breakpoints, image fallback
transitions, accessible alt/name behavior, and current exported types.

## Dependencies and exclusions

Depends on SlotContext, Icon, and responsive recipes. Do not copy Cetec
presence colors, renamed size scale, or status-token choices.

