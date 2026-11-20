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

- [ ] 1. Storybook 8 → 10 (story import paths: `storybook/test`, `@storybook/addon-docs/blocks`)
- [ ] 2. LocaleProvider (wire labels into each component as it is ported)
- [ ] 3. Icons: circle-dashed, square-dashed, not-equal, barcode-reader-off
- [ ] 4. Token-scale fixes from `4d4a38bc` (avatar, button, spinner, timeMenus, toggle, fontSizes) — structure only
- [ ] 5. Button and IconButton: `disabledReason`, no hover or press when disabled, danger icon in dark mode, tooltip fixes
- [ ] 6. Tooltip: open when a focused trigger becomes enabled
- [ ] 7. Modal and focus: focus the dialog on open, Escape returns focus to the trigger
- [ ] 8. Menu: viewport height cap, drill-in focus and width, classic scrollbars
- [ ] 9. Select: clear icon, `before` slot, viewport height cap
- [ ] 10. Chip: string-array children with overflow tooltip, `items` prop, ChipGroup registration
- [ ] 11. Checkbox: clicks on the box reach the input
- [ ] 12. Autocomplete: custom-value blur commit, create option, `isCustomValue`
- [ ] 13. DateTime and Calendar: clear actions, locale month and weekday names, locale first weekday, Gregorian names
- [ ] 14. Breadcrumbs click handlers. Tag `sm` size and responsive sizes
- [ ] 15. CodeBlock replaces Pre; inline Code rework (**breaking**)
- [ ] 16. Popover
- [ ] 17. Drawer
- [ ] 18. Tabs (priority-plus overflow)
- [ ] 19. Alert, PageBanner, Toast, InlineNote
- [ ] 20. AvatarStack
- [ ] 21. FilterToken, FilterMenu, FilterField
- [ ] 22. KeyFact
- [ ] 23. PeekBar (needs Drawer)
- [ ] 24. Gap audit (Foil), then fixes
- [ ] 25. Storybook review, merge in order, publish 5.0.0
- [ ] 26. Consumer break list for mockingbird-site and peeel. Move the baseline to `6cbec700` in `history/cetec-sync/LAST_SYNC.md`

## Port checks (every item)

`fonts.body` → `sans`. Map DS-only tokens. `staticCss` for runtime variants. Real `recipeOverrides` keys. `biome-ignore`, not `eslint-disable`. JS maps keyed on variants. Port keyframes and config entries. Reverse imports. `dsComponent` only on a real root. Scan the generated CSS for unresolved tokens.

## Breaking changes (running list)

- Pre removed; CodeBlock replaces it. Inline Code reworked.
