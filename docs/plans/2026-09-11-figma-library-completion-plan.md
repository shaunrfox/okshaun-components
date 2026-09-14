# Figma Library — Completion Plan

Written 2026-09-11. **Updated 2026-09-13, after the collection renames and the icons landed.**

Scope: the `okshaun` Figma library. Consumer files are out of scope except the
`mockingbird-site` note in Phase 5.

Rules that govern this work: `standards/figma/figma-component-token-policy.md`
and `standards/figma/figma-layout-standards.md`.

## Pick up here

**State as of 2026-09-13:** tokens, effect styles, the collection renames and
the icons are done and verified. Icons are 325 in Figma and 325 in code, with
identical names. Nothing is half-finished.

**The next action is step 5.3: `Avatar`, `Kbd`, `Skeleton`, `Badge`, `Tag`,
`Spinner`.** Everything `mockingbird-site` consumes now exists in the library
(step 5.2, 2026-09-13), and `Button`, `Chip`, `TextInput` and `Textarea` match
the code on variables and geometry at all four sizes.

| Thing | Where |
| --- | --- |
| Figma library | `cKo796vIgXLI8ugYLsLyZ5` — pages `_Thumb`, `Tokens`, `Components`, `Scratch` |
| Components page | `1:533` (18 top-level children, ~896 nodes) |
| Mockingbird file | `AGgKzFwhz2w2XQ66aoA5D7` — Phase 5 only |

⚠️ **The Figma MCP authenticates as one account per session.** The account that
can edit this library cannot read the Cetec files, and vice versa.

## Done

### Tokens — ✅ 2026-09-11

- `--Colors` 150 → **160**. Added `Gray/10`–`Gray/100` (`#fbfcfd` … `#060606`),
  because `bg.brand.*` aliases the code's `gray` family. **`slate` was not
  needed** — no semantic token references it.
- `--Theme` 107 → **214**, matching the code's 214 semantic tokens exactly.
  Verified by resolving both sides to hex and diffing all of them, not by
  sampling.
  - 72 accent variables, 45 brand/icon/surface/text/border, 10 shadow layer
    colors, 10 existing updated, 9 `-og` deleted, 1 duplicate deleted
    (`icon/inverse-decorative`; the code path is `icon.decorative.inverse`,
    which is also Cetec's path).
  - `bg/neutral-subtle/default` was set to a raw 2% white to match the code,
    rather than changing the shared `transparent` primitive — four button
    border tokens still alias that primitive at 3%.
- **Naming rule, derived from the file itself:** a state segment appears only
  when the family has states. `bg/danger/default` has one because hovered and
  pressed exist; `bg/disabled` and the accents do not.

### Effect styles — ✅ 2026-09-11

`Shadow/Zero`, `Raised`, `Elevated`, `Overlay`, `Overflow`. Every layer is
bound to a `shadow/*` variable, so the light/dark switch lives on the token
rather than in the style.

⚠️ **`overflow` widens its blur from 8 to 12 in dark mode.** A Figma effect
style cannot vary geometry by mode, only the bound colour. Built at the light
geometry. Recorded, not a defect.

### Code fixes that shipped alongside

- **v4.1.0** — 37 token changes. Light-mode foregrounds used mid palette steps
  where both this library's Figma file and the Cetec DS use dark steps, leaving
  33 tokens below WCAG.
- **v4.1.1** — reverted 5 of those. **32 of v4.1.0's changes stand.**

⚠️ **The rule that survives:** a light-mode foreground takes the `/70` or `/80`
step, dark-mode takes `/30` or `/40`.

⚠️ **The rule that was wrong and shipped anyway:** that an `*.inverse` token is
ink, never a tint of its own hue. Those tokens sit on a dark inverse surface,
not on `bg.*.bold`, so the 1.19:1 measured against the bold background never
described real usage. Cetec keeps them as a tint
(`text.danger.inverse` `#FF4D5B / #E50513`), and so did okshaun before.
**A contrast number is only as good as the background you assumed.**

### Collection renames — ✅ 2026-09-13

| Was | Now | Modes | Variables |
| --- | --- | --- | --- |
| `--btn_inp.size` | `Component / Layout` | `sm`, `md`, `lg`, `xl` | 10 `Button/*` + 7 new `Chip/*` = 17 |
| `--btn.state` | `Component / State` | `Default`, `Hovered`, `Pressed` | 20, `Button/<variant>/<slot>` |
| `--btn.variant` | `Button / Variant` | `standard`, `primary`, `hollow`, `subtle`, `selected` | 4, `Button/<slot>` |
| `--chip.size` | deleted | — | had 0 bindings |

Values did not change. Renames keep variable IDs, so the `Button` set's 60
bindings resolved afterwards with none unresolved. The other four sets bind
straight to `--Theme` and were never affected.

Both decisions were taken as the policy recommends: the `Disabled` mode is
gone (no node had it set explicitly), and `Chip/*` sits on the code's
18/24/28/32 scale.

⚠️ **The original target for `--btn.variant` was wrong and was not applied.**
This plan said `Component / Colors` with `Light` / `Dark` modes. That
collection's modes are the button *variants*, and its four variables route
each variant into `Component / State`. It is a variant selector, not a theme
collection; a Light/Dark rename would have destroyed it. It is now
`Button / Variant` with modes named after the code's values. Cetec's
`Component / Colors` has no counterpart here yet.

Names inside `Component / Layout` follow the policy's `<Component>/<Property>`
form: `Button/Main PX`, `Button/Slot size`, `Chip/Height`, `Chip/Main FS`.
`Chip/Radius` aliases `24` with a description saying why (the code's pill
radius is `999`, which has no primitive; 24 exceeds half of every height).

⚠️ **The chip merge found a code defect.** `chip.ts` set `--chip-h` to
`token(sizes.18)` for `sm`, but the scale had no 18 step, so Panda emitted the
literal `sizes\.18` and a small chip had no height. Fixed in PR #23 by adding
`18` to `sizes.ts`; `--Sizes` in Figma gained the same step. The Cetec port
brought Cetec's scale references without Cetec's scale.

Two things this step deliberately left for step 5: `Button/subtle/*` still
exists in State and `subtle` in Variant, because the `Button` set's variants
still reference them; `ghost` and `danger` do not exist yet.

### Icons — ✅ 2026-09-13

325 in Figma, 325 in code, names identical. Every icon is a 24×24 component
with one `Vector` child whose fill is bound to `icon/decorative`.

- **`expand` and `contract` were old versions of `expand-vertical` and
  `collapse-vertical`.** Renamed in place (component IDs and keys kept) and
  their geometry replaced with the code SVGs. Neither had instances.
- 13 created from `src/utils/svgsSource/*.svg` with `createNodeFromSvg`, then
  flattened to one vector. Placed in the category grids the code's
  `svgsMetadata/*.json` names: 8 chevrons → `Arrows`, `spinner` → `Status`,
  `to-date-*` → `Calendar`, `cheese` and `magnet` → `Other`. Descriptions
  carry `aliases: …` from the same metadata.
- ⚠️ **The 8 chevron SVGs have no `svgsMetadata/*.json` in the code.** Their
  Figma descriptions use derived aliases. Adding the eight files is a code
  task, not a Figma one.
- Plugin API: a grid frame auto-places an appended child in the next free
  cell and grows its row count. Calling `setGridChildPosition` afterwards on
  a cell you computed before the append throws "occupied" — let the grid
  place it.
- Pre-existing, untouched: `Icon/minus-thick` is a `RECTANGLE`, not a
  `VECTOR`.

## Remaining

### 5. Components — simple leaves first

Only 5 of the code's 44 components exist in Figma today.

1. ✅ **Button variables — 2026-09-13.** `Button / Variant` has the code's
   seven modes (`selectedBold` included; the policy had listed six). 28 state
   rows. `subtle` deleted. `primary` re-pointed to `bg/neutral-boldest` and
   `bg/neutral-bold/*` (it had aliased `bg/brand-bold/*`, and its icon a
   soft-deleted `icon/inverse-decorative`). `hollow` color → `text/default`.
   Icon hover → `icon/default`. `Button/Slot size` → 16/20/24/28.
   **1b. ✅ Button geometry — 2026-09-13.** Measured in Storybook first, which
   found two code defects (PR #28, 4.1.3): the legacy `iconBefore`/`iconAfter`
   icon rendered 24px at every size because `renderIcon` skipped the
   `SlotContext.Provider`, and `lineHeight: default` sat on the container so
   every size got a 24px line box. Fixed, then Figma mirrored the fixed
   render: `Button/Line height` 22/24/24/28, `Slot PX (before|after)` and
   `Icon-only P` 4/6/8/10, `Gap` 8/10/12/14 (= slot px + 4, because the icon
   sits directly in the container rather than in a padded slot frame), icon
   `Vector` fill bound to `Button/icon`. Verified at all four sizes: heights
   24/32/40/48, and `Only` 26/34/42/50 (slot size + 2 × slot px + 2 border,
   which is what `IconButton` renders), matching the browser.
   ⚠️ **Trap found here:** resolving primitives by *name* across all
   collections picked `--Line-heights/16` instead of `--Sizes/16`, and the set
   silently rendered 28px icons. Alias primitives by ID, and audit every
   alias's target collection after a write.
   **1c. ✅ `Chip` set — 2026-09-13.** Measured in Storybook first (heights
   18/24/28/32, slot px 1/2/2/2, icons 16/20/24/28, label 12/14/16/20, main px
   6/8/10/12, gap 4, 4px on the slot side of the label, dismiss = a square of
   the pill height). The seven `Chip/*` layout variables already held those
   values; `Chip/Gap` (4) added. Six `Chip/<default|selected>/<bg|color|icon>`
   state rows and a `Chip / Variant` collection (`default`, `selected`) route
   `Chip/bg|color|icon`, the same shape as Button. The set has one variant
   axis, `Slots` = None / Before / After / Both (the label-side padding
   changes next to a slot), plus `Label`, `Icon before`, `Icon after` and
   `Dismissable` properties. Every dimension is bound to a `Chip/*` variable
   and every colour to `Chip/bg|color|icon`. Verified with instances at all
   four sizes, both variants, Light and Dark.
   **Deliberate deviation:** the label's line-height is bound to
   `Chip/Height`. The browser renders a 24px line box at every size (the
   container-level `lineHeight` pattern, same as Button before 4.1.3); the
   pill is a fixed height so it centres and looks identical. Not fixed in
   code because it changes nothing visible.
   **Not modelled:** `deleted`, `loading`, `disabled` (states, not designer
   choices; the global fade covers disabled).
2. ✅ **What `mockingbird-site` consumes — 2026-09-13.**
   - Text styles already matched `textStyles.ts` (five Figma styles cover the
     six code families; `body` and `serif` are identical). One binding fixed
     (`Body-Mono` line-height pointed at `Body-Sans/Line height`);
     descriptions added.
   - **Shared size contract:** the ten `Button/*` layout variables that
     TextInput also needs were renamed **`Field/*`** (`Radius`, `Main PX`,
     `Main PY`, `Main FS`, `Slot size`, `Slot PX`, `Line height`), on Shaun's
     yes. `Button/Gap` and `Button/Icon-only P` stay Button-only. The
     duplicate `Slot PX (after)` was rebound and deleted.
   - `Divider`: `Direction` × `Weight` set (8), thickness 1/2/4/6 from
     `--Sizes`, fill `border/default`.
   - `Label`: Body-Sans 16, `--Line-heights/16` pinned to Tight (20),
     `text/default`. The required asterisk belongs to FormField.
   - `Link`: `Link/color` state row (`link/default` → `link/pressed`),
     underline, `External` boolean showing `arrow-square-out` at 20. Family is
     inherited in code; Figma uses Body-Sans.
   - `TextInput`: `Slots` (None/Before/After/Both) × `State`
     (Default/Focused/Error/Valid) = 16 variants, all bound to `Field/*`;
     Focused = `border/focused` stroke plus a 1px ring effect. Measured in
     Storybook: 24/32/40/48 tall, icons 16/20/24/28.
   - `Textarea`: `State` (Default/Focused/Error); `Textarea/Line height`
     (tight, 18/20/20/24 via `--Line-heights` pinned to Tight) and
     `Textarea/Min height` (48/64/80/96); padding and font size from
     `Field/*`; Piazzolla.
   - **Code defect found on the way (4.1.4, PR #31):** `Button` and
     `TextInput` passed an undefined `size` into slot context, so slot icons
     stayed 24px at the default size — the 4.1.3 fix only worked with an
     explicit size. `Chip` already defaulted to `md`.
3. Then `Avatar`, `Kbd`, `Skeleton`, `Badge`, `Tag`, `Spinner`.
4. Then `Tooltip`, `Breadcrumbs`, `FormField`, `Select`, `Autocomplete`,
   `SegmentedInputs`, `Menu`, `List`, `Card`, `Modal`, `Calendar`, `DateTime`.

**A component is not done until its entries exist in the matching component
collection.** Size or state as a Figma variant is a regression to the
816-variant model the policy exists to prevent.

Still unsettled from the original audit:

- **`IconButton` folding into `Button`.** Inherited from Cetec; unverified
  against this repo's separate `IconButton` API.
- **`RadioGroup`.** Exists here, not in Cetec. Figma component or layout
  convention?

### 6. Consumers

- Point the Mockingbird Figma file at this library and remap its local
  variables. It holds its own copy of an older okshaun token set, including
  legacy names like `HeadingColor`, and subscribes to no library at all.
- Upgrade `mockingbird-site` from 3.0.0 to 4.1.1. It is the only consumer and
  exercises none of the removed APIs.

## Two code questions this surfaced

Neither is a sync error. Both mirror the code faithfully.

- **`border/focused-inverse` and `border/inverse-focused`** are two genuinely
  different tokens (`Blue/100` vs `DarkNeutral/100`) whose names differ only in
  word order. The ambiguity comes from the code.
- **`surface/selected/*` dark values are saturated blues** (`#1868db`,
  `#357de8`, `#1558bc`), not surfaces.

## Why not copy Cetec's components

Cetec vNext has 678 components over nearly the same inventory — 41 of 43
component names are shared between the two repos. Rejected because:

- Its components bind to `Cetec Tokens vNext` through Cetec's own component
  collections. Pasting them here either drags copies of Cetec's variables into
  this file or drops the bindings; either way the rebinding is most of the work.
- Only 62 of the 183 shared semantic token names carry the same value — same
  structure, different palette, which is the intent.
- One Figma account per MCP session, and they are different accounts.

What transferred cleanly is the method: the token policy, the layout standards,
the build order, and the Plugin API traps. Those are in `standards/figma/`.
