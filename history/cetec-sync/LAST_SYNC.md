# Last Cetec DS sync

The next sync starts from the baseline below. Port the range `6cbec700..<new DS head>`.

| | |
|---|---|
| Cetec-Design-System baseline | `6cbec700` |
| okshaun release | 5.0.0 |
| Date | 2026-11-25 |
| Range ported | `c329563d..6cbec700` |
| Plan | [docs/plans/2026-11-20-cetec-sync.md](../../docs/plans/2026-11-20-cetec-sync.md) |

## Skipped on purpose

These DS changes are in the range but were not ported. Do not treat them as gaps in the next sync. Port one only after a new ruling.

| DS change | Commits | Reason |
|---|---|---|
| Print foundation | `a07fccf2`, `e98d372b`, `db6b4680` | Excluded for now. |
| `icon.success` and `icon.info` semantic colors | `ef5d674e` | okshaun keeps its own tokens. |
| `fonts.css` shipping | | Cetec packaging. okshaun keeps its own fonts. |
| Panda preset split | DS #201 | Cetec packaging. |
| i18next lint, Figma docs, and visual baselines | | Cetec tooling. |

## Deviations from the DS

- DS `body.*` text styles map to okshaun `sans.*`. okshaun's `body.*` is serif.
- Selected Chip icons use the inverse fill through a `[data-selected=true]` rule on the chip body. The DS rule uses `:has()`, which does not match the element itself.
