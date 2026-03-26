# Lint Baseline Rules

Baseline lint/type checks that must exist before custom design-system rules.

This repo enforces the baseline with:

- `biome.json` for linting, formatting, import organization, and filename policy
- `tsconfig.json` for casing/import-resolution correctness
- `tools/run-validate.mjs` for touched-file rollout behavior

## Hard Standards

1. Enable `forceConsistentCasingInFileNames: true` in TypeScript config.
2. Enforce folder filename policy:
   - `src/components/**`: PascalCase component files
   - `src/recipes/**`: camelCase recipe files

## Hard With Exceptions

1. Adopt the equivalent baseline enforcement in this repo with phased exceptions during migration:
   - Biome `style/useImportType`
   - Biome `style/useFilenamingConvention`
   - Biome `style/useNamingConvention`
   - Biome `style/useComponentExportOnlyModules`
   - Biome organize imports
   - TypeScript `tsc --noEmit`
2. Legacy filename exceptions may be allowlisted only if narrow, documented, and time-bound.

## Migration Rollout

- Touched files are the only blocking surface during the migration phase.
- Full-repo validation remains available for reporting via `npm run validate:full`.
- Import resolution and casing remain a TypeScript responsibility in this repo.
