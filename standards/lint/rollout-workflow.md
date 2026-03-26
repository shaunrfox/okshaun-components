# Lint Rollout Workflow

This repo uses a migration-safe rollout for lint and standards enforcement.

## Blocking Surface

1. Pre-commit runs `npm run validate:staged`.
2. Pull requests run `npm run validate`.
3. Blocking checks apply only to touched files within:
   - `src/components/**/*.{ts,tsx}`
   - `src/recipes/*.ts`
   - `src/preset.ts`

## Exclusions During Migration

- `src/App.tsx`
- `src/storybook/**`
- `**/*.stories.tsx`
- `src/recipes/recipes-regular.ts`
- `src/recipes/recipes-slot.ts`

## Reporting Surface

- `npm run validate:full` reports full-repo Biome, standards, and typecheck debt.
- The full-repo report is non-blocking until migration cleanup is complete.

## Promotion Path

1. Finish recipe/component migration.
2. Clean up existing warnings and legacy exceptions.
3. Promote warn-only design-system rules to blocking where appropriate.
4. Move full-repo validation from report-only to required.
