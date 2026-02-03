# Consuming App Setup

How consuming apps integrate the component library.

## Minimal Setup

```typescript
import { ThemeProvider, Button } from '@okshaun/components'

function App() {
  return (
    <ThemeProvider>
      <Button>Click me</Button>
    </ThemeProvider>
  )
}
```

`ThemeProvider` is required — it manages light/dark mode and sets the `data-color-mode` attribute.

## With Panda CSS Extension

Consuming apps can extend the design system:

```typescript
// panda.config.ts
import { defineConfig } from '@pandacss/dev'
import { okshaunPreset } from '@okshaun/components/preset'

export default defineConfig({
  presets: [okshaunPreset],
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  outdir: 'styled-system',
})
```

## CSS Import Options

**Option 1: Pre-built CSS** (simpler)
```typescript
import '@okshaun/components/styles.css'
```

**Option 2: Let Panda generate** (if consuming app uses Panda)
- Panda codegen with the preset produces equivalent CSS automatically

## Peer Dependencies

Required:
- `react >= 19.0.0`
- `react-dom >= 19.0.0`

Optional (fonts):
- `@fontsource/ibm-plex-sans`
- `@fontsource/ibm-plex-mono`
- `@fontsource-variable/piazzolla`

## Icons Work Automatically

SVG sprite is bundled in `dist/index.js`. No sprite file to copy or configure. First `<Icon>` render injects the sprite into the DOM.

## Local Testing

```bash
# In library
npm run build && npm pack

# In consuming app
npm install /path/to/okshaun-components-x.x.x.tgz
rm -rf node_modules/.vite  # Clear Vite cache
npm run dev
```
