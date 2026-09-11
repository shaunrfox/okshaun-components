# Figma Library — Completion Plan

Written 2026-09-11, from a measured audit of the `okshaun` Figma library
against `main` at `180ede5` (v4.0.0 plus one commit).

Scope: the Figma library itself. Consumer files are out of scope, except the
note on `mockingbird-site` at the end.

Rules that govern the work: `standards/figma/figma-component-token-policy.md`
and `standards/figma/figma-layout-standards.md`.

## The File

| Library | File key | Pages |
| --- | --- | --- |
| okshaun | `cKo796vIgXLI8ugYLsLyZ5` | `_Thumb`, `Tokens`, `Components`, `Scratch` |

Its `Button` set was last updated **2026-04-22**. v3.0.0 shipped 2026-09-05 and
v4.0.0 on 2026-09-07, so the library predates both releases.

## Measured Gap

| Area | Figma | Code | State |
| --- | --- | --- | --- |
| Primitive colors | 150 | 199 | All 150 match. Code adds `gray` (10), `slate` (16), `shadow` (20). |
| Fonts, containers, breakpoints, line heights | — | — | Match. |
| Button size padding | `Small`–`XLarge` | `sm`–`xl` | Same values, different mode names. |
| Semantic colors | 107 | 214 | 75 identical, 22 differ, 10 Figma-only, 117 code-only. |
| Shadows | 0 effect styles | 5 semantic | Missing. |
| Icons | 312 | 325 | 310 shared. 15 missing from Figma. `contract` and `expand` exist only in Figma. |
| Components | 5 sets | 44 | Missing most of the library. |

The 117 code-only tokens are mostly whole groups that Figma never had: 48
`bg.accent.*`, 24 `text.accent.*`, the `brand.10`–`brand.100` scale, 10 shadow
layer colors, `surface.selected`, `text.placeholder`.

The 15 icons Figma lacks: the four chevrons, four filled chevrons, `spinner`,
`magnet`, `cheese`, `collapse-vertical`, `expand-vertical`,
`to-date-backward`, `to-date-forward`.

## Open Decisions

These block Phase 2. None should be decided silently.

1. ~~**The 22 differing semantic values.**~~ **RESOLVED 2026-09-11 — and the
   answer reversed the sync direction.** The code was wrong, not Figma. Its
   light-mode foregrounds used mid palette steps where both this library's Figma
   file and the Cetec DS use dark steps, so 33 tokens sat below WCAG:
   `text.success` at 2.44:1, `text.danger` at 3.31:1, `link` at 3.5:1, and four
   `*.inverse` status tokens between 1.19:1 and 3.04:1 against their own
   backgrounds.

   **Fixed in `src/styles/semantics/colors.ts`** — 33 tokens, 8 of them in use
   across ~30 references, 25 previously unused. All now pass: 4.5:1 for text,
   3:1 for borders and icons. For 14 of them the fix was simply adopting this
   library's own Figma values.

   **The rule this establishes:** light-mode foregrounds take the `/70` or `/80`
   step, dark-mode takes `/30` or `/40`, and an `*.inverse` token is ink
   (`neutral.0` or `neutral.110`), never a tint of its own hue. Phase 2 now
   syncs code into Figma for this family, since they agree.
2. **The `Disabled` mode in `--btn.state`.** The policy says remove it and let
   the global 0.4 fade carry disabled. That is a visual change to the library.
3. **`IconButton` folding into `Button`.** Inherited from Cetec; unverified
   against this repo's separate `IconButton` API.
4. **`RadioGroup`.** It exists here and not in Cetec. Decide whether it is a
   Figma component or a layout convention.

## Phases

### Phase 1 — record decisions

Done: this plan plus the two standards docs.

### Phase 2 — tokens

1. Resolve the 22 differences above, then sync values.
2. Add the code-only groups: accents, the brand scale, shadow layer colors,
   `surface.selected`, `text.placeholder`.
3. Rename the component collections to `Component / Colors`,
   `Component / Layout` and `Component / State`, with the code's `sm`–`xl` mode
   names.
4. Add the 5 shadows as effect styles and confirm they resolve in both themes.

### Phase 3 — icons

5. Add the 15 missing icons. Decide whether `contract` and `expand` are
   renames of code icons or Figma-only leftovers.

### Phase 4 — components, simple leaves first

6. Update `Button` and `Chip` to the v4 API: variant values `standard`,
   `primary`, `hollow`, `ghost`, `danger`, `selected`; chip sizes 18/24/28/32.
7. Build what `mockingbird-site` consumes: `Text` and `Heading` as text styles,
   then `Divider`, `Label`, `TextInput`, `Textarea`, `Link`.
8. Then `Avatar`, `Kbd`, `Skeleton`, `Badge`, `Tag`, `Spinner`.
9. Then `Tooltip`, `Breadcrumbs`, `FormField`, `Select`, `Autocomplete`,
   `SegmentedInputs`, `Menu`, `List`, `Card`, `Modal`, `Calendar`, `DateTime`.

A component is not done until its entries exist in the matching component
collection. Size or state as a Figma variant is a regression.

### Phase 5 — consumers

10. Point the Mockingbird Figma file (`AGgKzFwhz2w2XQ66aoA5D7`) at this library
    and remap its local variables. It currently holds its own copy of an older
    okshaun token set, including legacy names like `HeadingColor`, and is
    subscribed to no library at all.
11. Upgrade `mockingbird-site` from 3.0.0 to 4.0.0. It is the only consumer and
    exercises none of the removed APIs.

## Why Not Copy Cetec's Components

Cetec vNext has 678 components covering nearly the same inventory — 41 of 43
component names are shared between the two repos. Copying them was considered
and rejected for now:

- Its components bind to `Cetec Tokens vNext` through Cetec's own component
  collections. Pasting them here either drags copies of Cetec's variables into
  this file or drops the bindings. Either way the rebinding is most of the work.
- Only 62 of the 183 shared semantic token names carry the same value, which is
  the intent: same structure, different palette.
- The Figma MCP authenticates as one account per session. The account that can
  edit this file cannot read the Cetec files.

What transfers cleanly is the method: the token policy, the layout standards,
the build order, and the Plugin API traps. Those are now in this repo.
