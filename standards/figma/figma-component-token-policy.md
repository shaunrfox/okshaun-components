# Figma Component Token Policy

How the `okshaun` Figma library models components, where its variables live,
and how they relate to the token system in this repo.

**This repo is the source of truth for values and public component contracts.**
Figma mirrors it. When the two disagree, the code wins unless this document
records an explicit exception.

> Adapted from the Cetec Design System's `standards/figma/figma-component-token-policy.md`
> (Cetec-ERP/Cetec-Design-System PR #202, 2026-09-10), by the same author. The
> architecture and the mode-not-variant rule are carried over. Token names,
> values, collection names and component decisions below are this repo's own.

## The Library

One Figma file, `cKo796vIgXLI8ugYLsLyZ5`, named **okshaun**. It carries both
roles on separate pages:

| Page | Holds |
| --- | --- |
| `Tokens` | primitives, semantic theme variables, line heights, text styles, effect styles |
| `Components` | component masters and sets, documentation, usage examples |

Cetec splits these into two files. This library does not, and does not need to
at its current size. Component contract variables live in the same file as the
components that use them.

## Layer Model

1. **Foundation primitives** — raw values with no product meaning: colors,
   sizes, containers, breakpoints, line heights, font families and weights.
   Collections `--Colors`, `--Sizes`, `--Containers`, `--Breakpoints`,
   `--Line-heights`, `--Type`.
2. **Global semantic theme tokens** — meaning and theme behavior:
   `text/default`, `bg/neutral/hovered`, `surface/raised`, `border/focused`.
   Collection `--Theme`, modes `Light` and `Dark`. This is the default source
   for theming.
3. **Component contract tokens** — internal component roles, state mappings and
   size contracts, used when direct semantic binding would make a component too
   large to maintain.
4. **Components and styles** — the sets, text styles and effect styles that get
   consumed.

## The Rule That Matters Most

**Size, interaction state, theme and density are variable MODES. They are never
Figma variants.** A property becomes a variant only when it is public API that
a designer picks deliberately.

Cetec's measured result, kept here because it is the reason for the rule: its
Button went from **816 variants to 96**, covering more cases from 8.5× fewer
maintained objects. Sizes became 4 modes, hover and pressed became 3 modes,
light and dark became 2 modes.

This library already works this way. The `Button` set has one variant axis,
`WithIcon`, and each variant carries explicit modes for `--btn_inp.size` and
`--btn.variant`. That is the pattern. It is now the required pattern.

## Collections

Current collections and their target shape. **The rename is intentional: the
modes must match the code's own scale names, not Figma's default casing.**

| Today | Target | Modes (target) | Covers |
| --- | --- | --- | --- |
| `--btn.variant` | `Component / Colors` | `Light`, `Dark` | per-component color that must differ by theme beyond a semantic token |
| `--btn_inp.size`, `--chip.size` | `Component / Layout` | `sm`, `md`, `lg`, `xl` | padding, gap, font size, icon size, min height, radius |
| `--btn.state` | `Component / State` | `Default`, `Hovered`, `Pressed` | per-component interaction color |
| — | `List / Density` | `Compact`, `Comfortable`, `Spacious` | list spacing, once `List` is built |

Naming:

- **State** — `<Component>/<variant>/<bg|border|color|icon>`, such as
  `Button/primary/bg` or `Chip/default/icon`.
- **Layout** — `<Component>/<Property>` in sentence case, such as
  `Button/Main PX` or `Chip/Icon size`.
- **Shared** — cross-component values get their own key, such as
  `Slots/Slot size`. Never duplicate a shared value per component.

Layout variables alias primitives per mode. They hold a raw number only when no
primitive exists, and then the variable's description must say so.

## Alias Rules

- No raw hex. No detached shadow recipes.
- Component contract tokens alias **semantic** tokens, never primitives
  directly, for anything color-bearing.
- Alias depth: primitive → semantic → component contract → component binding.
  Do not add a fifth level without a reason.

## Properties Versus Variables

- **Component property** — a choice a designer makes on purpose: variant, icon
  position, disabled, loading, the text itself.
- **Component variable** — internal visual logic: fill by state, label color by
  state, padding by size.

If a designer should consciously pick it, it is a property. If it exists to keep
the component sane, it is a variable.

## When Component Tokens Are Worth It

Use them when the component has many combinations, repeats themed slots across
variants, shares a size contract with another component (Button and TextInput),
or gets materially smaller because of them.

Skip them when the API is small, few slots and states exist, or the layer would
just rename existing semantics. Bind straight to `--Theme` instead.

The test: *does this layer make the component smaller, faster or clearer without
creating a second theme system?*

## Decisions For This Library

Some are inherited from Cetec and apply unchanged. Some are specific to this
repo. Do not re-litigate either group without a note here.

- **`Text` and `Heading` are text styles, not components.** The `Tokens` page
  carries `Display`, `Heading`, `Body-Sans`, `Body-Serif` and `Body-Mono`, each
  with `xs`, `sm`, `md` and `lg` modes.
- **`Box` and `Code` stay out of the library.**
- **`BreakpointIndicator`, `DsChainScope` and `ThemeSwitcher` stay out.** They
  are developer tooling, not design surface.
- **`IconButton` is part of `Button`.** The `WithIcon=Only` variant covers it.
  ⚠️ Inherited from Cetec and not yet checked against this repo's separate
  `IconButton` API. Confirm before building.
- **Button variant values follow the code, not the old Figma names.** v4.0.0
  ships `standard`, `primary`, `hollow`, `ghost`, `danger` and `selected`. The
  Figma library still says `Default`, `Primary`, `Hollow`, `Subtle` and
  `Selected`. `Default` is now `standard`; `Subtle` is gone.
- **Chip sizes follow the code's four-step scale:** `sm` 18, `md` 24, `lg` 28,
  `xl` 32. Figma currently has three sizes at 20, 24 and 32.
- **Do not add a `Disabled` mode to `Component / State`.** `globalStyle` already
  fades anything disabled to 0.4 opacity, and stacking a disabled color on top
  of that is how a link ended up at 1.2:1 contrast. Cetec's collection has three
  states for the same reason. ⚠️ `--btn.state` has a fourth `Disabled` mode
  today; removing it is a deliberate change, not cleanup.
- **This library's brand scale has no Cetec counterpart.** `brand.10`–`brand.100`,
  `bg.brand.*`, and the lime and teal accents are this repo's own and must be
  authored, not ported.

## What Figma Cannot Express

Recorded so they are not raised again as gaps.

| Class | Why |
| --- | --- |
| `borders.*` composite shorthands | no Figma variable type |
| `blurs`, `aspectRatios`, `animations`, `easings` | no Figma variable type |
| `shadows.*` composites | covered as effect styles instead |
| `radii.100` | it is literally `100%`, not pixels. Bind `radii/999`; identical on a square element. |
| `zIndex` | stacking is not a Figma concept |
| em-based sizing | no em unit. Use the pixel equivalent at `md` and re-check if the type scale changes. |

## Plugin API Traps

Each of these cost a failed script. `use_figma` runs a script as one
transaction, so one throw discards everything the script did.

From the Cetec vNext build (2026-09-09):

- **Constraints resolve before a variable-bound size applies.** Wrap a
  variable-sized child that must sit flush to an edge in a full-bleed
  auto-layout anchor frame and use alignment, not constraints.
- **`addComponentProperty(name, 'INSTANCE_SWAP', value)` takes the default
  component's NODE ID, not its published key.**
- **A focus ring is an effect, not just a stroke.** Copy the whole effects array
  from a donor node; it carries per-effect variable bindings.
  `setBoundVariable('effects', …)` throws.
- **Figma renames a TEXT layer to its own characters.** Set `node.name` after
  writing `characters`, or later lookups by name return null.
- **`minWidth` cannot be set to `0`** — use `null`. It is also not bindable on a
  TEXT node; wrap the text in a frame.
- **A slot must be a direct child of its own component.**
- **A set-level TEXT property forces one default across every variant.**
- **Shared components ship demo slot content.** Slot defaults inside an instance
  can be hidden or reused, never removed.

From the Mockingbird build in the same API (2026-09-11):

- **A component set's width does not hold while its primary axis hugs.** Set
  `primaryAxisSizingMode = 'FIXED'` first, then `resizeWithoutConstraints`, then
  `counterAxisSizingMode = 'AUTO'`.
- **An instance created inside a failed `try` survives `comp.remove()`.** Clean
  up test nodes by exact name and verify they are gone.
- **A font the MCP environment cannot load blocks all text writes.** Cloning an
  already-styled text node still works, and the clone keeps its layout.
  ⚠️ Unverified here: this library uses IBM Plex Sans, IBM Plex Mono and
  Piazzolla, which should load. Check before planning around it.

## Governance

- A component is not finished until its variables exist. One shipped with size
  or state as Figma variants is a regression to the 816-variant model.
- New component tokens need a payoff: multiple variants and states, enough
  internal slots that direct binding repeats, and a stable contract. Tidiness is
  not a reason.
- Figma mirrors the code. Adding a Figma variable with no token behind it means
  either the code needs the token or Figma does not need the variable.
