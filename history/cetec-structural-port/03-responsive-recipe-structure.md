# Responsive Recipe Structure

## Current state and Cetec delta

Okshaun already uses Panda recipes and supports many conditional style props.
Cetec extends this into component variant props, shared density recipes,
explicit slot structures, and responsive state-derived sizing. Some Cetec
recipe changes are structural; many others are brand-specific value changes.

## Target architecture

- Permit Panda conditional values for component size, density, and other
  variants where generated recipe types support them.
- Introduce reusable `listDensity` structure so List, Menu, SubMenu, and Select
  share row geometry without duplicating values.
- Add structural slots required by the component plans, including generic
  `mainContent`, `slot`, `beforeSlot`, `afterSlot`, `root`, and
  `positionWrapper` concepts where appropriate.
- Register new Kbd, Skeleton, and BreakpointIndicator recipes in the correct
  regular or slot recipe collections.
- Preserve static CSS coverage needed by responsive and runtime-composed
  variants.

## Porting rules

Compare recipe behavior property by property:

- Port slot boundaries, selectors, data-state hooks, conditional variants,
  overflow behavior, focus outlines, and layout variables.
- Translate every visual value to an existing okshaun semantic or primitive
  token.
- Retain okshaun variants and aliases unless they are technically incompatible.
- Do not import Cetec hue names, gold CTA palette, font variants, reset styles,
  or semantic-token tables.
- Do not remove ThemeSwitcher's recipe until its IconButton composition is
  proven and package consumers no longer require the class.

## Responsive behavior

Responsive values must remain type-safe and generate static classes in the
library build. Components must not inspect responsive objects in JavaScript
except when a derived child size is unavoidable. In those cases, define a
deterministic fallback and document that a single child cannot dynamically
observe the active breakpoint without CSS.

## Stories and documentation

Adapt Cetec's conditions documentation and selected responsive stories for
Card, Heading, Textarea, Avatar, Chip, Menu density, and
BreakpointIndicator. Replace Cetec token names with okshaun examples.

Document when to use recipe variants versus style props and how to add static
coverage for conditional values.

## Verification

- Run Panda generation and `npm run build`.
- Confirm generated recipe typings accept intended conditional values.
- Build Storybook with `PANDA_STATIC=true`.
- Inspect representative components at every configured breakpoint.
- Ensure no Cetec token reference appears in generated source or plans.

## Exclusions

Cetec's `fontVariants.ts`, `recipeGlobalStyles.ts`, palette-specific recipes,
font imports, and semantic-token definitions are not migration sources.

