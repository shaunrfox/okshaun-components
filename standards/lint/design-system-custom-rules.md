# Design-System Custom Lint Rules

Repo-specific invariants are enforced via a repo-local validator.

Implementation in this repo:

- `tools/validate-standards.mjs` is the CLI entrypoint
- `tools/validate-standards-core.mjs` contains the rule logic
- `tools/tests/validate-standards.test.mjs` covers rule behavior

## Hard Standards

1. Maintain a repo-local validation layer for custom rules.
2. Enforce `recipe-export-name-matches-file`.
3. Enforce `recipe-jsx-name-matches-component`.
4. Enforce `no-react-fc-components`.
5. Enforce `no-react-namespace-type-imports`.
6. Enforce `no-inline-style-prop`.
7. Enforce `no-pixel-units`.
8. Enforce `no-raw-font-weight-values`.
9. Enforce `no-classname-css-call`.

## Hard With Exceptions

Enforce `no-hardcoded-design-values-in-recipes`, with narrowly documented exceptions for known false positives or parser limits.

Warn on `discourage-css-variable-styling` to guide migration from
`var(--...)` references toward semantic tokens.

## Inline Suppression

Any rule can be suppressed on a per-occurrence basis with a `validate-ignore` comment on the **same line** or the **line immediately above** the flagged code:

```tsx
// validate-ignore: no-inline-style-prop — dynamic animation values
style={{
  transform: `translateX(-${offset}%)`,
}}
```

Multiple rules can be suppressed in a single comment using comma separation:

```tsx
// validate-ignore: no-inline-style-prop, no-pixel-units
```

**Guidelines:**

- Always include a short reason after the rule name (use ` — ` as separator).
- Only suppress when the flagged code is intentional and cannot be expressed with tokens, recipes, or Panda style props (e.g., dynamic computed values for animations).
- Do not use suppression to bypass rules during migration — fix the code instead.

## Migration Rollout

- `recipe-export-name-matches-file` and `recipe-jsx-name-matches-component` are blocking on touched files.
- The remaining design-system rules stay warn-only until the migration cleanup phase.
- `src/App.tsx`, `src/storybook/**`, `**/*.stories.tsx`, `src/recipes/recipes-regular.ts`, and `src/recipes/recipes-slot.ts` are outside the phase-1 blocking surface.
