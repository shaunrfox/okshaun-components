# Cetec DS sync — 2026-11-20

## Range

- Cetec-Design-System `c329563d..6cbec700`: 208 non-merge commits. 96 are housekeeping (changelog, version bumps, visual baselines, CI).
- okshaun base: `origin/main` `6062bbf` (v4.2.0).
- Target release: **5.0.0** (CodeBlock replaces Pre).

## Rule

Take Cetec's structure and behavior. Keep okshaun's tokens, fonts, themes, and public API. Sizing scales are structure.

## Rulings (2026-11-20)

| Item | Ruling |
|---|---|
| CodeBlock replaces Pre, inline Code rework (`5ba1e789`) | Adopt, breaking |
| LocaleProvider and localized labels (`0b53073f` and follow-ups) | Adopt |
| Tabs, Alert, PageBanner, Toast, InlineNote, Drawer, Popover, AvatarStack | Adopt |
| FilterToken, FilterMenu, FilterField | Adopt |
| KeyFact, PeekBar | Adopt |
| Print foundation (`a07fccf2`, `e98d372b`, `db6b4680`) | Exclude for now |
| Existing-component fixes, Button `disabledReason`, Tag sizes, icons, token-scale fixes (`4d4a38bc`) | Adopt (rule) |
| Storybook 8 → 10 | Adopt as a prerequisite (rule) |
| `icon.success` / `icon.info` semantic colors (`ef5d674e`) | Exclude (okshaun tokens) |
| `fonts.css` shipping, Panda preset split (#201), i18next lint, Figma docs, visual baselines | Exclude (Cetec packaging and tooling) |
| Drawer icons from `5995fbb9` (found by the gap audit) | Adopt, under the icons ruling |
| DS `body.*` text styles in Alert, InlineNote, PageBanner, Toast, KeyFact, PeekBar | Use okshaun's `sans.*` (okshaun's `body.*` is serif). Older serif uses in FormField and Menu are a separate decision. |
| `SelectOption.label` narrows to `string` | Keep `string`, as in the DS. Breaking. |

## Items, in dependency order

One branch and one PR per item. PRs stay open until the Storybook review.

- [x] 1. Storybook 8 → 10 (story import paths: `storybook/test`, `@storybook/addon-docs/blocks`)
- [x] 2. LocaleProvider (wire labels into each component as it is ported)
- [x] 3. Icons: circle-dashed, square-dashed, not-equal, barcode-reader-off
- [x] 4. Token-scale fixes from `4d4a38bc` (avatar, button, spinner, timeMenus, toggle, fontSizes) — structure only
- [x] 5. Button and IconButton: `disabledReason`, no hover or press when disabled, danger icon in dark mode, tooltip fixes
- [x] 6. Tooltip: open when a focused trigger becomes enabled
- [x] 7. Modal and focus: focus the dialog on open, Escape returns focus to the trigger
- [x] 8. Menu: viewport height cap, drill-in focus and width, classic scrollbars
- [x] 9. Select: clear icon, `before` slot, viewport height cap
- [x] 10. Chip: string-array children with overflow tooltip, `items` prop, ChipGroup registration
- [x] 11. Checkbox: clicks on the box reach the input
- [x] 12. Autocomplete: custom-value blur commit, create option, `isCustomValue`
- [x] 13. DateTime and Calendar: clear actions, locale month and weekday names, locale first weekday, Gregorian names
- [x] 14. Breadcrumbs click handlers. Tag `sm` size and responsive sizes
- [x] 15. CodeBlock replaces Pre; inline Code rework (**breaking**)
- [x] 16. Popover
- [x] 17. Drawer
- [x] 18. Tabs (priority-plus overflow)
- [x] 19. Alert, PageBanner, Toast, InlineNote
- [x] 20. AvatarStack
- [x] 21. FilterToken, FilterMenu, FilterField
- [x] 22. KeyFact
- [x] 23. PeekBar (needs Drawer)
- [x] 24. Gap audit (Foil), then fixes
- [x] 25. Storybook review, merge in order, publish 5.0.0
- [x] 26. Consumer break list for mockingbird-site and peeel. Move the baseline to `6cbec700` in `history/cetec-sync/LAST_SYNC.md`

## Branches and merge order

One linear stack: each branch starts from the one before it, because nearly every item edits the same registries (`src/index.ts`, the recipe index, `panda.config.ts`). Merge in this order. Each PR targets the branch before it, or `main` after the one before it merges.

| Order | Branch | Head |
|---|---|---|
| 1 | `sync/01-storybook-10` | `ff56b21` |
| 2 | `sync/02-locale-provider` | `8514b35` |
| 3 | `sync/03-icons` | `965040e` |
| 4 | `sync/04-token-scale` | `7985af3` |
| 5 | `sync/05-button-disabled-reason` | `af991f8` |
| 6 | `sync/06-tooltip-focus-enable` | `93fc9fb` |
| 7 | `sync/07-modal-menu-focus` | `f2ee228` |
| 8 | `sync/08-menu` | `cd70a16` |
| 9 | `sync/09-select` | `5e571d8` |
| 10 | `sync/10-chip` | `f2be094` |
| 11 | `sync/11-checkbox` | `21bc897` |
| 12 | `sync/12-autocomplete` | `78aac6f` |
| 13 | `sync/13-datetime` | `c9e546d` |
| 14 | `sync/14-breadcrumbs-tag` | `0dbf835` |
| 15 | `sync/15-codeblock` | `bd029ec` |
| 16 | `sync/16-popover` | `704d505` |
| 17 | `sync/17-drawer` | `675aa79` |
| 18 | `sync/18-tabs` | `f7d00cd` |
| 19 | `sync/19-feedback` | `73a6dd2` |
| 20 | `sync/20-avatar-stack` | `01b69d4` |
| 21 | `sync/21-filters` | `369982e` |
| 22 | `sync/22-keyfact` | `6f63cb8` |
| 23 | `sync/23-peekbar` | `368f05d` |

## Port checks (every item)

`fonts.body` → `sans`. DS `body.*` text styles → `sans.*`. Map DS-only tokens, including font sizes and weights. `staticCss` for runtime variants. Real `recipeOverrides` keys. `biome-ignore`, not `eslint-disable`. JS maps keyed on variants. Port keyframes and config entries. Reverse imports. `dsComponent` only on a real root. Scan the generated CSS for unresolved color and font tokens. Add `recipeOverrides` for runtime variants, because consumers do not get the `PANDA_STATIC` set.

## Breaking changes (running list)

- Pre and `PreProps` removed. CodeBlock replaces them.
- Code no longer renders a dark block. Its `lang` prop is now `language`.
- Chip: the default accessible name of the dismiss button is now "Remove <label>" (was "<label>, dismiss"). Only tests that query by that name notice.
- Chip: the dismiss button is now disabled when `onDismiss` is absent, as its doc comment already said.
- Select:
  - The trigger is now a `<div role="combobox">`, not a `<button>`. `SelectProps` extends `BoxProps`, not `BoxProps<'button'>`. `disabled` becomes `aria-disabled` and `tabIndex={-1}`.
  - `SelectOption.label` is now `string` (was `string | ReactNode`). A node label never showed in the list before.
  - `SelectOption.index` is removed.
  - A disabled Select no longer submits its value: its hidden inputs get `disabled`.
  - Option ids change from `-option-<value>` to `-option-<index>`.
  - The multi-select chip dismiss name changes from "<label>, remove" to "Remove <label>".
- Code: `CodeProps` no longer includes `TextProps` (family, size, weight, and the rest). The inner `Text` wrapper is gone.
- Modal: on open, focus goes to the dialog, not the close button. Tests that expect the close button to have focus fail.
- MenuItem: props extend `BoxProps`, not `BoxProps<'button'>`. Inline menus keep a roving tab stop on the first enabled row. peeel's inline suggestion menu needs a check after the upgrade.
- Tooltip: `data-ds-component` moves from the trigger span to the tooltip element.
