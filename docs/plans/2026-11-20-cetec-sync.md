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
- [ ] 24. Gap audit (Foil), then fixes
- [ ] 25. Storybook review, merge in order, publish 5.0.0
- [ ] 26. Consumer break list for mockingbird-site and peeel. Move the baseline to `6cbec700` in `history/cetec-sync/LAST_SYNC.md`

## Branches and merge order

One linear stack: each branch starts from the one before it, because nearly every item edits the same registries (`src/index.ts`, the recipe index, `panda.config.ts`). Merge in this order. Each PR targets the branch before it, or `main` after the one before it merges.

| Order | Branch | Head |
|---|---|---|
| 1 | `sync/01-storybook-10` | `1df869d` |
| 2 | `sync/02-locale-provider` | `c3ba164` |
| 3 | `sync/03-icons` | `9f5ae50` |
| 4 | `sync/04-token-scale` | `b1234a1` |
| 5 | `sync/05-button-disabled-reason` | `8bf83b9` |
| 6 | `sync/06-tooltip-focus-enable` | `70f80b0` |
| 7 | `sync/07-modal-menu-focus` | `3b088c1` |
| 8 | `sync/08-menu` | `438c3b4` |
| 9 | `sync/09-select` | `46e28e4` |
| 10 | `sync/10-chip` | `477da07` |
| 11 | `sync/11-checkbox` | `363c7da` |
| 12 | `sync/12-autocomplete` | `c25b19e` |
| 13 | `sync/13-datetime` | `7268429` |
| 14 | `sync/14-breadcrumbs-tag` | `21868fa` |
| 15 | `sync/15-codeblock` | `7343759` |
| 16 | `sync/16-popover` | `0a9c537` |
| 17 | `sync/17-drawer` | `fa9346c` |
| 18 | `sync/18-tabs` | `45a2ad4` |
| 19 | `sync/19-feedback` | `e69d88a` |
| 20 | `sync/20-avatar-stack` | `be61f5e` |
| 21 | `sync/21-filters` | `5c9f41b` |
| 22 | `sync/22-keyfact` | `5194832` |
| 23 | `sync/23-peekbar` | `60d5edc` |

## Port checks (every item)

`fonts.body` → `sans`. Map DS-only tokens. `staticCss` for runtime variants. Real `recipeOverrides` keys. `biome-ignore`, not `eslint-disable`. JS maps keyed on variants. Port keyframes and config entries. Reverse imports. `dsComponent` only on a real root. Scan the generated CSS for unresolved tokens.

## Breaking changes (running list)

- Pre and `PreProps` removed. CodeBlock replaces them.
- Code no longer renders a dark block. Its `lang` prop is now `language`.
- Chip: the default accessible name of the dismiss button is now "Remove <label>" (was "<label>, dismiss"). Only tests that query by that name notice.
- Chip: the dismiss button is now disabled when `onDismiss` is absent, as its doc comment already said.
