# Dual Entry Points

The library ships two separate entry points. ES modules only.

## Entry Points

| Entry | Source | Output | Contains |
|-------|--------|--------|----------|
| Main | `src/index.ts` | `dist/index.js` | Components, hooks, theme, utilities |
| Preset | `src/preset.ts` | `dist/preset.js` | Panda CSS preset (tokens, recipes, conditions) |

## Import Paths

```typescript
// Components (main entry)
import { Button, Box, Text, Icon } from '@okshaun/components'
import { ThemeProvider, useTheme } from '@okshaun/components'

// Panda preset (separate entry)
import { okshaunPreset } from '@okshaun/components/preset'

// CSS (separate entry)
import '@okshaun/components/styles.css'
```

## Externals

These are NOT bundled — consuming apps must provide them:

- `react`
- `react-dom`
- `react/jsx-runtime`
- `@pandacss/dev`

## Bundled Dependencies

These ARE included in `dist/index.js`:

- `@floating-ui/react` (positioning for Modal, Menu, Select, Tooltip)
- `date-fns` (date utilities)

## Build Config

```typescript
// vite.config.ts
build: {
  lib: {
    entry: { index: 'src/index.ts', preset: 'src/preset.ts' },
    formats: ['es'],  // No UMD or CJS
  },
  rollupOptions: {
    output: { preserveModules: false },  // Fully bundled per entry
  },
  sourcemap: true,
  minify: false,  // Readable for debugging
}
```

## No CJS Support

ES modules only. Consuming apps must support ESM imports.
