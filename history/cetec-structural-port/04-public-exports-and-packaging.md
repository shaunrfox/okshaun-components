# Public Exports and Packaging

## Current state and Cetec delta

Okshaun's root export file exposes substantially more component prop types than
Cetec. Cetec adds Kbd, Skeleton, RadioGroup, two icon assets, optional reset and
build-info package exports, and several internal context/helper names. Some
Cetec context functions are incorrectly presented as type exports.

## Target public surface

Add root exports for:

- `Kbd`, `KbdProps`, and useful keyboard-value types.
- `Skeleton`, `SkeletonProps`, `SkeletonVariant`, and `SkeletonAnimation`.
- `RadioGroup` and `RadioGroupProps`.
- New public props introduced by the component plans.
- `BreakpointIndicatorProps`.

Continue exporting existing okshaun component types and aliases. Preserve
`Autocomplete`, `Dropdown`, `SelectTrigger`, existing context aliases, the
okshaun preset, theme types, and hooks unless an individual plan explicitly
deprecates them.

## Internal export policy

Do not export implementation-only Menu matching functions, list contexts,
slot context, or focus helpers merely because Cetec does. Export a hook or type
only when it enables a supported composition pattern and can be maintained as
public API.

## Assets and package map

Add `barcode-off` and `spinner` source SVGs, metadata, icon-name types, and
generated sprite symbols. Keep all okshaun chevrons.

Do not add `reset.css` by default. A reset export changes consumer CSS behavior
and requires a separate product decision. `panda.buildinfo.json` may be exposed
only if a current consumer or Panda integration requires it; otherwise retain
the current package map.

Ensure package `files` and Vite static-copy configuration include every new
runtime asset and declaration.

## Compatibility and declarations

- Keep named and default exports consistent with current conventions.
- Ensure runtime exports and declaration exports match exactly.
- Avoid Cetec's mistaken `export type { useX }` patterns.
- Preserve source-level type aliases during deprecation windows.
- Confirm responsive recipe types survive declaration generation.

## Stories and documentation

Update README installation and component lists for new components and APIs.
Document that consumers should continue importing okshaun styles and preset,
not Cetec assets.

## Verification

After each export milestone, run the library build and inspect:

- `dist/index.js`
- `dist/types/index.d.ts`
- `dist/preset.js`
- `dist/types/preset.d.ts`
- `dist/styles.css`
- `dist/sprite.svg`

Run `npm pack --dry-run` and compare the manifest with the current package.
Completion requires no accidental export removals and no references to
`cetecPreset`, Cetec fonts, or Cetec package paths.

## Exclusions

Do not adopt Cetec's package name, preset export, reset stylesheet, font files,
theme assets, reduced root type surface, or internal helper exports.
