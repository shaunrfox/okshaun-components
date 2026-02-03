# Build Pipeline

The production build runs a multi-step pipeline. Order matters.

## Command

```bash
npm run build
# Expands to:
rm -rf dist && \
  PANDA_STATIC=true npx panda codegen && \
  npx panda cssgen --splitting && \
  npx panda spec && \
  npx panda init-mcp --client claude && \
  vite build
```

## Steps

1. **Clean** — Remove previous `dist/`
2. **Panda codegen** — Generate `src/styled-system/` (types, recipes, tokens, CSS utilities)
3. **Panda cssgen** — Generate CSS with file splitting (not monolithic)
4. **Panda spec** — Generate JSON specs for consuming apps
5. **Panda init-mcp** — Generate `.mcp.json` for Claude Code integration
6. **Vite build** — Bundle library with two entry points

## PANDA_STATIC

- `PANDA_STATIC=true` generates ALL possible property/color combinations
- Required for distribution so consuming apps have full design system available
- Dev mode omits this (only generates used styles) for faster builds

## Dev vs Production

| | Dev (`npm run dev`) | Prod (`npm run build`) |
|---|---|---|
| Panda mode | Watch + incremental | Full static generation |
| CSS output | Used styles only | All combinations |
| Vite mode | Dev server | Library bundle |
| Source maps | Inline | Separate files |

## Vite Static Copy

Build copies additional assets to `dist/`:
- `src/styled-system/specs/` → `dist/specs/`
- `src/styled-system/styles/` → `dist/styles/`
- `src/styled-system/styles.css` → `dist/styles.css`
- `.mcp.json` → `dist/.mcp.json`
