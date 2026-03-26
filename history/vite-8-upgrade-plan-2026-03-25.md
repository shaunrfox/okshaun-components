# Vite 8 Upgrade Plan

Date: 2026-03-25

Tracking:
- Epic: `okshaun-components-5tc`
- Core toolchain subtask: `okshaun-components-5tc.6`
- Storybook subtask: `okshaun-components-5tc.4`
- Verification subtask: `okshaun-components-5tc.5`

## Scope

Keep this migration limited to:
- Vite and directly coupled build plugins
- Storybook compatibility work required to unblock Vite 8
- Build, Storybook, and package-output verification

Explicitly out of scope:
- Unrelated existing validation debt in `src/components/**` and `src/recipes/**`
- General component cleanup or Storybook content polish unrelated to compatibility

## Official Compatibility Snapshot

Verified on 2026-03-25 from package metadata and official docs:

- `vite@8.0.2`
  - Node engine: `^20.19.0 || >=22.12.0`
- `@vitejs/plugin-react@6.0.1`
  - Peer dependency: `vite@^8.0.0`
- `vite-plugin-static-copy@4.0.0`
  - Peer dependency: `vite@^6.0.0 || ^7.0.0 || ^8.0.0`
- `vite-plugin-dts@4.5.4`
  - Peer dependency: `vite@*`
- `@storybook/react-vite@8.6.18`
  - Peer dependency: `vite@^4 || ^5 || ^6`
- `@storybook/react-vite@9.1.20`
  - Peer dependency: `vite@^5 || ^6 || ^7`
- `@storybook/react-vite@10.3.3`
  - Peer dependency: `vite@^5 || ^6 || ^7 || ^8`

Conclusion:
- Storybook 8.6 is a hard blocker for Vite 8.
- Storybook 9 is not a valid final target for Vite 8.
- Storybook 10 is the first supported Storybook line for Vite 8.

## Recommended Version Set

Safest target set for this repo:

- `vite`: `8.0.2`
- `@vitejs/plugin-react`: `6.0.1`
- `vite-plugin-static-copy`: `4.0.0`
- `vite-plugin-dts`: keep `4.5.4` unless a repo-local issue appears during testing

Storybook target set:
- `storybook`: `10.3.3`
- `@storybook/react`: `10.3.3`
- `@storybook/react-vite`: `10.3.3`
- `@storybook/addon-a11y`: `10.3.3`
- `@storybook/addon-themes`: `10.3.3`
- `@storybook/addon-docs`: `10.3.3`

Storybook packages to remove or replace during migration:
- Remove `@storybook/addon-essentials`
- Remove `@storybook/addon-interactions`
- Remove `@storybook/test`
- Migrate imports from `@storybook/test` to `storybook/test`
- Migrate imports from `@storybook/manager-api` to `storybook/manager-api`
- Migrate imports from `@storybook/theming` to `storybook/theming`
- Migrate MDX doc-block imports from `@storybook/blocks` to `@storybook/addon-docs/blocks`

Why this is the safest set:
- It uses the latest officially compatible Vite 8 line.
- It avoids pinning to unsupported peer combinations.
- It keeps `vite-plugin-dts` stable because it is already version-agnostic on Vite.
- It treats Storybook as a required coordinated upgrade instead of trying to force Vite 8 into an unsupported 8.x or 9.x Storybook stack.

## Repo-Specific Breakpoints

### Low-risk areas

- [`vite.config.ts`](/Users/shaunfox/Documents/bigfootcode/okshaun-components/vite.config.ts)
  - The config is relatively simple.
  - No custom `optimizeDeps`, `manualChunks`, `commonjsOptions`, or esbuild hooks were found.
  - This supports the earlier assessment that the file itself is low risk.

### Likely breakpoints

1. Storybook package line and addons
   - [`package.json`](/Users/shaunfox/Documents/bigfootcode/okshaun-components/package.json#L27)
   - Current direct Storybook packages are all `8.6.x`, and `@storybook/react-vite` cannot peer with Vite 8.
   - `@storybook/addon-essentials` and `@storybook/addon-interactions` are not part of the Storybook 10 target shape.

2. Story interaction-test imports
   - [`src/components/Button/Button.stories.tsx`](/Users/shaunfox/Documents/bigfootcode/okshaun-components/src/components/Button/Button.stories.tsx#L1)
   - [`src/components/Card/Card.stories.tsx`](/Users/shaunfox/Documents/bigfootcode/okshaun-components/src/components/Card/Card.stories.tsx#L1)
   - [`src/components/CheckboxInput/CheckboxInput.stories.tsx`](/Users/shaunfox/Documents/bigfootcode/okshaun-components/src/components/CheckboxInput/CheckboxInput.stories.tsx#L1)
   - [`src/components/ToggleInput/ToggleInput.stories.tsx`](/Users/shaunfox/Documents/bigfootcode/okshaun-components/src/components/ToggleInput/ToggleInput.stories.tsx#L1)
   - These currently import from `@storybook/test`, which must move to `storybook/test`.

3. Storybook manager/theming imports
   - [`.storybook/manager.tsx`](/Users/shaunfox/Documents/bigfootcode/okshaun-components/.storybook/manager.tsx#L1)
   - [`.storybook/theme.tsx`](/Users/shaunfox/Documents/bigfootcode/okshaun-components/.storybook/theme.tsx#L1)
   - These currently use `@storybook/manager-api` and `@storybook/theming`.
   - Current Storybook docs now point to `storybook/manager-api` and `storybook/theming`.

4. MDX doc-block imports
   - [`src/storybook/doctemplate.mdx`](/Users/shaunfox/Documents/bigfootcode/okshaun-components/src/storybook/doctemplate.mdx#L1)
   - Multiple docs under [`src/storybook/`](/Users/shaunfox/Documents/bigfootcode/okshaun-components/src/storybook) import from `@storybook/blocks`.
   - Storybook 10 docs examples use `@storybook/addon-docs/blocks`.
   - Expect broad but mechanical import updates across MDX docs.

5. Package-output behavior tied to Vite plugins
   - [`vite.config.ts`](/Users/shaunfox/Documents/bigfootcode/okshaun-components/vite.config.ts#L24)
   - The library build depends on `vite-plugin-dts` and `vite-plugin-static-copy`.
   - The main migration risk here is not config complexity, but ensuring the copied files and emitted types remain identical enough for package consumers.

6. Build pipeline shelling around Vite
   - [`package.json`](/Users/shaunfox/Documents/bigfootcode/okshaun-components/package.json#L11)
   - `dev`, `build`, and `preview` are Vite-driven.
   - `build` chains Panda generation and spec output before `vite build`, so breakage may surface as packaging regressions rather than Vite config errors.

### Probably unaffected

- [`playroom.config.js`](/Users/shaunfox/Documents/bigfootcode/okshaun-components/playroom.config.js)
  - Playroom is webpack-based and should remain unaffected by the Vite upgrade itself.
- Node version
  - [`.nvmrc`](/Users/shaunfox/Documents/bigfootcode/okshaun-components/.nvmrc#L1) is already `22.12.0`, which satisfies Vite 8.

## Migration Sequence

Use small commits and keep rollback points after each stage.

### Phase 0: Baseline capture

Goal:
- Record the current working baseline before touching dependencies.

Actions:
- Create a dedicated branch for the migration.
- Record current versions from `package.json`.
- Run and capture outputs for:
  - `npm run build`
  - `npm run storybook:build`
  - `npm pack --dry-run`
- Save the dry-run file manifest and key build output notes in the migration PR or issue thread.

Rollback point:
- Clean branch tip with only baseline notes captured.

### Phase 1: Storybook 8.6 -> 9.x compatibility pass

Why first:
- Storybook 9 still works with Vite 6, so it lets the repo absorb package-structure changes before the Vite major bump.
- Storybook 10’s migration guide expects a 9.x-ready codebase.

Actions:
- Upgrade the Storybook packages to the latest 9.x line that still supports Vite 6/7.
- Apply Storybook automigrations.
- Replace removed or consolidated packages/imports enough to make Storybook run again.
- Do not bump Vite yet.

Expected repo edits:
- `package.json`
- `.storybook/*`
- story files importing `@storybook/test`
- MDX docs importing old doc-block packages

Verification gate:
- `npm run storybook`
- `npm run storybook:build`

Rollback point:
- Commit containing only Storybook 9 migration work.

### Phase 2: Storybook 9.x -> 10.3.3 pass

Why:
- Storybook 10 is the first line that officially supports Vite 8.

Actions:
- Upgrade Storybook core/framework/addons to `10.3.3`.
- Replace remaining outdated package imports with current public paths.
- Reconcile addon list with Storybook 10 package structure.

Expected repo edits:
- `package.json`
- `.storybook/main.ts`
- `.storybook/manager.tsx`
- `.storybook/theme.tsx`
- Story files and MDX docs

Verification gate:
- `npm run storybook`
- `npm run storybook:build`
- Confirm MDX docs render and interaction tests still compile

Rollback point:
- Commit containing only Storybook 10 migration work.

### Phase 3: Vite 6 -> 8 core toolchain pass

Actions:
- Upgrade:
  - `vite` -> `8.0.2`
  - `@vitejs/plugin-react` -> `6.0.1`
  - `vite-plugin-static-copy` -> `4.0.0`
- Keep `vite-plugin-dts` at `4.5.4` initially.
- Reinstall lockfile cleanly.
- Re-run only build-tooling verification, not unrelated full-repo cleanup.

Expected repo edits:
- `package.json`
- `package-lock.json`
- `vite.config.ts` only if a concrete compatibility issue appears

Verification gate:
- `npm run build`
- `npm run preview` if needed for smoke testing the demo build
- `npm pack --dry-run`

Rollback point:
- Commit containing only Vite/plugin upgrades.

### Phase 4: Packaging parity pass

Goal:
- Make sure consumers get the same shape of published artifacts after the upgrade.

Actions:
- Compare pre/post-upgrade dry-run manifests.
- Inspect:
  - `dist/index.js`
  - `dist/preset.js`
  - `dist/types/**`
  - copied styled-system files
  - `dist/styles.css`
  - `dist/sprite.svg`

Verification gate:
- No unexpected missing exports
- No missing copied assets or type declarations
- No changed package entry points unless intentionally documented

Rollback point:
- Final validation commit before merge.

## Verification Checklist

Run only focused checks needed for this migration.

### Build

- `npm run build` completes on Node `22.12.0`
- `dist/index.js` and `dist/preset.js` are emitted
- source maps are still emitted
- `dist/types/index.d.ts` and `dist/types/preset.d.ts` exist
- static-copy outputs still appear in `dist/`
- no new Vite/Rollup/Rolldown warnings that imply consumer-facing regressions

### Storybook

- `npm run storybook` boots without package-resolution errors
- `.mdx` docs pages render
- manager theme still loads
- global theming decorator still works
- story files using play functions still typecheck and compile
- `npm run storybook:build` completes

### Packaging

- `npm pack --dry-run` contains expected `dist/` assets
- `exports` in `package.json` still match emitted files
- `files` whitelist still includes everything needed by consumers
- no accidental publish of migration-only artifacts

### Out-of-scope guardrails

- Do not use `validate:full` as a migration gate for this work.
- Do not expand the change set to fix pre-existing component or recipe debt unless a change is directly required for Storybook 9/10 or Vite 8 compatibility.

## Sources

Official docs and package metadata used for this plan:

- Vite migration guide: <https://main.vite.dev/guide/migration>
- Storybook 9 migration guide: <https://storybook.js.org/docs/migration-guide/from-older-version>
- Storybook 10 migration guide: <https://storybook.js.org/docs/9/migration-guide>
- Storybook addon API: <https://storybook.js.org/docs/addons/addons-api>
- Storybook theming docs: <https://storybook.js.org/docs/configure/user-interface/theming>
- Storybook testing docs: <https://storybook.js.org/docs/writing-tests>
