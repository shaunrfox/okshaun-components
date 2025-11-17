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

      <Button variant="primary" size="md">
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
      <Button as="a" href="https://example.com" variant="primary">
        External Link
      </Button>

      {/* Button as React Router Link */}
      <Button as={Link} to="/about" variant="secondary">
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

To publish a new version to npm:

1. Update version in `package.json`
2. Create a git tag: `git tag v1.0.0`
3. Push tag: `git push --tags`
4. Create a GitHub release, or use the manual workflow in GitHub Actions

The package will be automatically published to npm via GitHub Actions.

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
