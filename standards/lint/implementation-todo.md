# Lint Implementation Map

This file records how the work repo's lint/tooling behavior maps to this repo.

## Formatter

- Work repo: Prettier + `.editorconfig`
- Personal repo: Biome formatter + `.editorconfig`

Current equivalence:

- 2-space indentation
- single quotes
- semicolons
- trailing commas
- 80 character line width

## Baseline Linting

- Work repo `@typescript-eslint/consistent-type-imports`
  - Personal repo `style/useImportType`
- Work repo `unicorn/filename-case`
  - Personal repo `style/useFilenamingConvention`
- Work repo `@typescript-eslint/naming-convention`
  - Personal repo `style/useNamingConvention`
- Work repo `react-refresh/only-export-components`
  - Personal repo `style/useComponentExportOnlyModules`
- Work repo `import/order`
  - Personal repo Biome organize imports
- Work repo `import/no-unresolved`
  - Personal repo `tsc --noEmit` plus `forceConsistentCasingInFileNames`

## Repo-Specific Standards

- Work repo local ESLint plugin
  - Personal repo `tools/validate-standards.mjs`

Blocking now:

- recipe export/file naming contract
- recipe `jsx` naming contract

Warn-only during migration:

- no `React.FC`
- no React namespace type imports/usages
- no inline `style={{}}`
- no `className={css(...)}`
- no raw `px`
- no raw numeric `fontWeight`
- discourage raw `var(--...)`
- discourage hardcoded design values in recipes

## Validation Entry Points

- `npm run validate:staged`
  - pre-commit blocking check for staged files only
- `npm run validate`
  - touched-file blocking check for local/PR use
- `npm run validate:full`
  - non-blocking full-repo report
