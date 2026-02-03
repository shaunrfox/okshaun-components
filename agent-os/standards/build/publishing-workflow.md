# Publishing Workflow

NPM publishing is handled via GitHub Actions with safety checks.

## Trigger

Manual workflow dispatch only (Actions > "Publish to NPM" > Run workflow).

Select version bump: `patch`, `minor`, or `major`.

## Pipeline Steps

1. Checkout + Node 20 setup
2. `npm ci` (clean install)
3. Lint check
4. Generate SVG sprite (`npm run generate-sprite`)
5. Build library (`npm run build`)
6. Calculate new version number
7. Check for duplicate version (git tags + npm registry)
8. Commit version bump to `package.json`
9. Push commit to main
10. `npm publish --provenance` (with attestation)
11. Create git tag + push
12. Create GitHub Release

## Requirements

- `NPM_TOKEN` secret in GitHub repo settings (granular access, read+write)
- Package name: `@okshaun/components`

## Safety Features

- Duplicate version check prevents overwriting published versions
- Provenance flag creates verifiable build attestation
- Git tag created AFTER successful npm publish (not before)
- Version commit pushed to main before publish

## No Auto-Publish

Publishing never triggers automatically on push or merge. Always manual.
