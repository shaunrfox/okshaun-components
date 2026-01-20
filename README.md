# Okshaun Components

A comprehensive React component library built with **Panda CSS** for styling. Provides a complete design system with themed components, light/dark mode support, and TypeScript-first development.

## Features

- 🎨 **Panda CSS** - Build-time CSS-in-JS with type-safe tokens
- 🌗 **Light/Dark Mode** - Built-in theme switching with system preference detection
- 📦 **Polymorphic Components** - All components accept `as` prop for flexible rendering
- 🔤 **TypeScript** - Full type safety and autocomplete
- ♿ **Accessible** - ARIA-compliant components
- 🎯 **Tree-shakeable** - Import only what you need
- 📐 **Customizable** - Extend tokens, recipes, and components

## Installation

```bash
npm install @okshaun/components @pandacss/dev
# or
yarn add @okshaun/components @pandacss/dev
# or
pnpm add @okshaun/components @pandacss/dev
```

## Quick Start

### 1. Configure Panda CSS

Create `panda.config.ts` in your project root:

```typescript
import { defineConfig } from '@pandacss/dev'
import { okshaunPreset } from '@okshaun/components/preset'

export default defineConfig({
  // Include your app's files AND the component library
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@okshaun/components/dist/**/*.js'
  ],

  exclude: [],

  // Use the okshaun preset
  presets: [
    '@pandacss/preset-base',
    okshaunPreset
  ],

  // Optional: customize the preset
  theme: {
    extend: {
      tokens: {
        // Add your custom tokens here
      }
    }
  },

  // Configure output
  outdir: 'styled-system',
  jsxFramework: 'react',

  // Recommended settings
  strictTokens: true, // Enforce token usage
  importMap: '@styled-system',
})
```

### 2. Configure PostCSS

Create `postcss.config.js`:

```javascript
export default {
  plugins: {
    '@pandacss/dev/postcss': {},
  },
}
```

### 3. Add Panda CSS to Your Styles

In your main CSS file (e.g., `src/index.css`):

```css
@layer reset, base, tokens, recipes, utilities;
```

### 4. Set Up Your Application

In your app entry point (e.g., `src/main.tsx`):

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@okshaun/components'
import App from './App'

// Import your app styles and Panda CSS output
import './index.css'
import '../styled-system/styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
```

### 5. Update package.json Scripts

Add Panda CSS generation to your scripts:

```json
{
  "scripts": {
    "dev": "panda codegen --watch & vite",
    "build": "panda codegen && tsc && vite build",
    "panda": "panda codegen"
  }
}
```

### 6. Configure TypeScript

Update `tsconfig.json` to include Panda CSS path aliases:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@styled-system/*": ["./styled-system/*"]
    }
  }
}
```

### 7. Configure Vite (if using Vite)

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@styled-system': resolve(__dirname, './styled-system'),
    },
  },
})
```

## Usage

### Using Components

```typescript
import { Button, Box, Text, Icon } from '@okshaun/components'
import { css } from '../styled-system/css'

function App() {
  return (
    <Box p="4">
      <Text size="xl" weight="bold" mb="4">
        Hello from Okshaun Components!
      </Text>

      <Button appearance="primary" size="md">
        Click Me
      </Button>

      {/* Use Panda CSS directly with preset tokens */}
      <div className={css({
        bg: 'primary.default',
        color: 'primary.contrast',
        p: '4',
        borderRadius: 'md'
      })}>
        Styled with preset tokens
      </div>
    </Box>
  )
}
```

### Theme Switching

```typescript
import { ThemeSwitcher, useTheme } from '@okshaun/components'

function MyApp() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>

      {/* Or use the built-in ThemeSwitcher component */}
      <ThemeSwitcher />
    </div>
  )
}
```

### Using Icons

Icons are automatically injected into the DOM when you use the first Icon component:

```typescript
import { Icon } from '@okshaun/components'

function MyComponent() {
  return (
    <>
      <Icon name="check" size="md" fill="success.default" />
      <Icon name="close" size="lg" fill="error.default" />
    </>
  )
}
```

All icon names are type-safe - your editor will autocomplete available icons.

### Polymorphic Components

All components can render as different HTML elements or React components:

```typescript
import { Box, Button } from '@okshaun/components'
import { Link } from 'react-router-dom'

function Examples() {
  return (
    <>
      {/* Box as a section */}
      <Box as="section" p="4">
        Content
      </Box>

      {/* Button as a link */}
      <Button as="a" href="https://example.com" appearance="primary">
        External Link
      </Button>

      {/* Button as React Router Link */}
      <Button as={Link} to="/about">
        About Page
      </Button>
    </>
  )
}
```

## Available Components

- **Layout**: Box
- **Typography**: Text, Heading
- **Buttons**: Button, IconButton
- **Forms**: TextInput, Textarea, Checkbox, CheckboxInput, Radio, RadioInput, Toggle, ToggleInput, Label
- **Feedback**: Badge, Spinner, Tooltip
- **Data Display**: Card, Tag, Divider, Icon
- **Navigation**: Link, Breadcrumbs, Menu
- **Code**: Pre (code blocks)
- **Theme**: ThemeProvider, ThemeSwitcher

## Customization

### Extending Tokens

You can extend or override preset tokens in your `panda.config.ts`:

```typescript
export default defineConfig({
  presets: [okshaunPreset],
  theme: {
    extend: {
      tokens: {
        colors: {
          brand: {
            primary: { value: '#your-color' },
            secondary: { value: '#another-color' }
          }
        },
        spacing: {
          huge: { value: '10rem' }
        }
      },
      semanticTokens: {
        colors: {
          'custom-bg': {
            value: { base: '{colors.gray.100}', _dark: '{colors.gray.800}' }
          }
        }
      }
    }
  }
})
```

### Using Preset Tokens

The preset provides comprehensive design tokens:

```typescript
import { css } from '../styled-system/css'

const styles = css({
  // Colors from semantic tokens
  bg: 'surface.default',
  color: 'text.default',
  borderColor: 'border.default',

  // Spacing (0-280 + container sizes)
  p: '4',
  m: '8',
  gap: '2',

  // Border radius
  borderRadius: 'md', // xs, sm, md, lg, xl, 2xl, 3xl, full

  // Shadows
  boxShadow: 'md', // sm, md, lg, xl, 2xl

  // Typography
  fontSize: 'md',
  fontWeight: 'medium',
  lineHeight: 'normal'
})
```

## Fonts

The preset includes **IBM Plex Sans**, **IBM Plex Mono**, and **Piazzolla Variable** as the default font families. These fonts are **optional peer dependencies** - you can choose to use them or override with your own fonts.

### Option 1: Use Default Fonts

Install the font packages:

```bash
npm install @fontsource/ibm-plex-sans @fontsource/ibm-plex-mono @fontsource-variable/piazzolla
```

Import them in your app entry file (e.g., `src/main.tsx`):

```typescript
// Import default fonts
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/400-italic.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/500-italic.css'
import '@fontsource/ibm-plex-sans/700.css'
import '@fontsource/ibm-plex-sans/700-italic.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/600.css'
import '@fontsource-variable/piazzolla/index.css'
```

### Option 2: Use Custom Fonts

Override the font tokens in your `panda.config.ts`:

```typescript
import { defineConfig } from '@pandacss/dev'
import { okshaunPreset } from '@okshaun/components/preset'

export default defineConfig({
  presets: [okshaunPreset],
  theme: {
    extend: {
      tokens: {
        fonts: {
          sans: { value: "'Inter', sans-serif" },
          serif: { value: "'Merriweather', serif" },
          mono: { value: "'Fira Code', monospace" }
        }
      }
    }
  }
})
```

Then load your custom fonts using your preferred method:
- `@fontsource` packages: `npm install @fontsource/inter`
- Google Fonts CDN
- Self-hosted font files

### Option 3: Use System Fonts

For minimal bundle size, use system fonts:

```typescript
theme: {
  extend: {
    tokens: {
      fonts: {
        sans: {
          value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', system-ui, sans-serif"
        },
        serif: {
          value: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif"
        },
        mono: {
          value: "ui-monospace, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace"
        }
      }
    }
  }
}
```

No additional font packages needed!

## Development

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Local Development

```bash
# Install dependencies
npm install

# Generate Panda CSS
npm run panda

# Start development server
npm run dev

# Start Storybook
npm run storybook

# Run linter
npm run lint

# Build library
npm run build
```

## Publishing

Publishing is handled via GitHub Actions with a manual workflow that prevents common pitfalls like tag conflicts.

### How to Publish

1. Go to the repository on GitHub
2. Click **Actions** tab
3. Select **"Publish to NPM"** workflow from the left sidebar
4. Click **"Run workflow"** button (dropdown on the right)
5. Select the version bump type:
   - **patch** (0.3.4 → 0.3.5) - Bug fixes, minor changes
   - **minor** (0.3.4 → 0.4.0) - New features, backward compatible
   - **major** (0.3.4 → 1.0.0) - Breaking changes
6. Click **"Run workflow"**

### What the Workflow Does

1. Builds and lints the package
2. **Validates** the new version doesn't already exist (on npm or as a git tag)
3. Bumps `package.json` version and commits
4. Pushes the commit to `main`
5. Publishes to npm with provenance
6. Creates git tag and GitHub release (only after successful publish)

### Troubleshooting

**"Tag already exists" error:**
```bash
# Delete the conflicting tag locally and remotely
git tag -d v0.3.5
git push origin :refs/tags/v0.3.5
```

**"Version already published" error:**
- Choose a higher version bump level (e.g., minor instead of patch)

**Workflow failed mid-way:**
- Safe to re-run - the workflow validates before making changes
- If version commit was pushed but npm publish failed, fix the issue and re-run

## Storybook

View all components in Storybook: [https://shaunrfox.github.io/okshaun-components](https://shaunrfox.github.io/okshaun-components)

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Links

- [GitHub Repository](https://github.com/shaunrfox/okshaun-components)
- [NPM Package](https://www.npmjs.com/package/@okshaun/components)
- [Panda CSS Documentation](https://panda-css.com/)
