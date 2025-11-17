# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React component library built with **Panda CSS** for styling and **Vite** for building. The library provides a comprehensive design system with themed components, support for light/dark modes, and is distributed as an ES module.

## Common Commands

### Development

- `npm run dev` - Start development server with Panda CSS watch mode
- `npm run panda` - Generate Panda CSS output (required after changing tokens/recipes)
- `npm run storybook` - Start Storybook on port 6006 for component development

### Building

- `npm run build` - Generate Panda CSS and build library for distribution
- `npm run build-storybook` - Build static Storybook site
- `npm run preview` - Preview production build

### Code Quality

- `npm run lint` - Run ESLint

### Icons

- `npm run generate-sprite` - Generate SVG sprite from `src/utils/svgsSource/*.svg`
  - Optimizes SVGs with SVGO
  - Generates `src/utils/spriteContent.ts` with bundled sprite data
  - Generates TypeScript types at `src/components/Icon/icons.d.ts` and `iconNames.ts`
  - Sprite is automatically injected into DOM when first Icon component renders

### Package & Publishing

- `npm run build` - Build library for npm distribution
  - Outputs: `dist/index.js`, `dist/preset.js`, type definitions, source maps
  - Sprite content is bundled with components (no separate sprite.svg file)
- `npm pack` - Create .tgz file for local testing
- `npm run ship` - Generate `panda.buildinfo.json` for consuming apps
- Publishing handled via GitHub Actions (see `.github/workflows/publish.yml`)

## Architecture

### Styling System: Panda CSS

The project uses **Panda CSS** (v1.4.3), a CSS-in-JS framework with build-time extraction. Understanding the Panda CSS architecture is critical:

#### Configuration Files

- **`preset.ts`** - Custom Panda preset (`okshaunPreset`) that defines the complete design system
- **`panda.config.ts`** - Panda CSS configuration that uses the preset
- **`styled-system/`** - Auto-generated directory (gitignored) containing Panda CSS output

#### Design Tokens

- **`src/styles/tokens.ts`** - Base tokens (colors, sizes, fonts, shadows, etc.)
- **`src/styles/semanticTokens.ts`** - Semantic tokens that reference base tokens and support theme variants (e.g., `success.default`, `error.light`)
- **`src/styles/conditions.ts`** - Custom conditions for responsive and state-based styling
- **`src/styles/globalStyle.ts`** - Global CSS styles

Key concepts:

- Tokens use Panda's `defineTokens()` and `defineSemanticTokens()` for type safety
- Semantic tokens support light/dark themes via `{ base: value, _dark: value }`
- Size tokens (0-280) are mapped to spacing for consistent sizing
- Container sizes (2xs-8xl) and utility sizes (full, half, min, max, fit, prose, auto)

#### Recipe System

- **`src/recipes/`** - Component style definitions using `defineRecipe()` or `defineSlotRecipe()`
  - Regular recipes (e.g., `button.ts`, `text.ts`) - Single-element components
  - Slot recipes (e.g., `checkbox.ts`, `tooltip.ts`) - Multi-part components with named slots
- Recipes define base styles, variants, and default variants
- Recipe names drop the "Recipe" suffix when registered in preset (e.g., `buttonRecipe` becomes `button`)
- Slot recipes are registered separately in `preset.ts` under `slotRecipes`

#### Import Aliases

- `~/*` - Maps to `./src/*`
- `@styled-system/*` - Maps to `./styled-system/*` (Panda CSS generated code)

### Component Architecture

#### Base Component: Box

All components are built on the **polymorphic `Box` component** (`src/components/Box/Box.tsx`):

- Accepts `as` prop to render as any HTML element or React component
- Supports all Panda CSS style props via `splitProps()` utility
- Provides type-safe polymorphic behavior with proper ref forwarding

#### Component Pattern

Components follow this structure:

1. Extend `BoxProps<E>` for polymorphism
2. Add recipe variant types (e.g., `ButtonVariantProps`)
3. Use `splitProps()` to separate CSS props from HTML props
4. Apply recipe styles via `cx(recipeName({ variants }), className)`
5. Forward all props to underlying `Box` component

Example pattern seen in `Button.tsx`:

```typescript
export type ButtonProps<E extends React.ElementType = 'button'> = BoxProps<E> &
  ButtonVariantProps & {
    // component-specific props
  };

export const Button = React.forwardRef((props, ref) => {
  const { variant, size, className, ...rest } = props;
  return (
    <Box
      className={cx(button({ variant, size }), className)}
      {...rest}
    />
  );
});
```

#### Component Organization

- Each component has its own directory under `src/components/`
- Components export from `index.tsx` or directly from component file
- All public components are re-exported from `src/index.ts`

### Theme System

The theme system (`src/contexts/ThemeContext.tsx`) provides:

- Light/dark theme switching
- localStorage persistence (key: `okshaun-theme-preference`)
- System preference detection
- DOM attribute: `data-color-mode="light|dark"`

Usage:

```typescript
const { theme, setTheme } = useTheme();
```

### Icon System

Icons use a **bundled SVG sprite** workflow:

1. Source SVGs in `src/utils/svgsSource/`
2. Run `npm run generate-sprite` to:
   - Optimize SVGs (removes fill/stroke, adds 24x24 dimensions)
   - Generate `src/utils/spriteContent.ts` with sprite data as JavaScript string
   - Generate TypeScript types for icon names (`icons.d.ts`, `iconNames.ts`)
3. **Sprite injection**:
   - `src/utils/injectSprite.ts` imports `spriteContent.ts`
   - Icon component calls `injectSprite()` on first render
   - Sprite is bundled with the library - no separate file needed by consuming apps
4. Use `Icon` component with type-safe icon names

**Why bundled instead of separate file?**
- Reduces HTTP requests for consuming apps
- Self-contained distribution
- Automatic setup - works out of the box

### Build Configuration

The Vite configuration (`vite.config.ts`) has two modes:

#### Library Mode (default)

Builds the distributable npm package:

- **Entry points**:
  - `src/index.ts` → `dist/index.js` (components)
  - `preset.ts` → `dist/preset.js` (Panda CSS preset)
- **Externals**: `react`, `react-dom`, `react/jsx-runtime`, `@pandacss/dev`
- **Output**: ES modules with TypeScript declarations
- **Bundling**: `preserveModules: false` (fully bundled)
- **Source maps**: Enabled for debugging
- **TypeScript**: Generated via `vite-plugin-dts` with rollup

**Distribution structure**:
```
dist/
  ├── index.js          # Components bundle (252 KB)
  ├── index.d.ts        # Component types
  ├── index.js.map      # Source map
  ├── preset.js         # Panda preset (144 KB)
  ├── preset.d.ts       # Preset types
  ├── preset.js.map     # Source map
  └── panda.buildinfo.json  # For consuming apps
```

#### GitHub Pages Mode

When `GH_REPO` env var is set (e.g., via GitHub Actions):

- Builds Storybook for documentation
- Deployed to GitHub Pages on push to main
- See `.github/workflows/deploy.yml`

### TypeScript Configuration

- Strict mode enabled with `noUncheckedIndexedAccess`
- JSX: `react-jsx` (automatic runtime)
- Module resolution: `bundler` mode
- Path aliases match Vite configuration

### Package Distribution

**package.json exports**:
```json
{
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "default": "./dist/index.js"
    },
    "./preset": {
      "types": "./dist/preset.d.ts",
      "import": "./dist/preset.js",
      "default": "./dist/preset.js"
    },
    "./panda.buildinfo.json": "./dist/panda.buildinfo.json"
  },
  "files": ["dist", "README.md", "LICENSE"]
}
```

**Consuming apps import**:
```typescript
// Components
import { Button, Box, Text, Icon } from '@okshaun/components'

// Theme
import { ThemeProvider, useTheme, type Theme } from '@okshaun/components'

// Panda preset
import { okshaunPreset } from '@okshaun/components/preset'
```

**Key exports from `src/index.ts`**:
- All components (Button, Box, Text, Icon, etc.)
- Theme utilities: `ThemeProvider`, `useTheme`, `Theme` type
- Icon utilities: `Icon`, `IconNames`

## GitHub Actions Workflows

### `.github/workflows/publish.yml` - NPM Publishing

Publishes to npm when:
- A GitHub release is created (automatic)
- Manually triggered via workflow dispatch (with version bump option)

**Setup required**:
1. Create NPM granular access token with "Read and write" permissions
2. Add to GitHub secrets as `NPM_TOKEN`
3. Verify package name `@okshaun/components` is available

**Manual publish**:
- Go to Actions → "Publish to NPM" → Run workflow
- Select version bump: patch, minor, or major
- Workflow creates git tag, commits version, and publishes

### `.github/workflows/deploy.yml` - Storybook Deployment

Deploys Storybook to GitHub Pages on push to main:
- Runs `panda codegen` to generate styles
- Builds Storybook static site
- Deploys to GitHub Pages

**View deployed Storybook**: https://shaunrfox.github.io/okshaun-components

## Key Design Decisions

1. **Panda CSS over other solutions**: Build-time CSS extraction, type-safe tokens, recipe system
2. **Polymorphic components**: All components can render as different elements via `as` prop
3. **Recipe-first styling**: Components use recipes, style props are supplementary
4. **Theme via CSS custom properties**: Panda handles theme switching via CSS variables
5. **Bundled sprite over separate file**: Sprite content embedded in JS bundle for self-contained distribution
6. **Strict TypeScript**: Catch errors early, especially with `noUncheckedIndexedAccess`
7. **Peer dependencies for React**: Consuming apps provide React, reducing bundle duplication

## Important Workflows

### Adding a New Component

1. Create component directory in `src/components/ComponentName/`
2. Create recipe in `src/recipes/componentName.ts` using `defineRecipe()` or `defineSlotRecipe()`
3. Export recipe from `src/recipes/index.ts`
4. Add recipe to `preset.ts` (in `recipes` or `slotRecipes` object)
5. Create component extending `BoxProps` and using recipe
6. Export from `src/index.ts`
7. Run `npm run panda` to regenerate Panda CSS

### Modifying Design Tokens

1. Edit tokens in `src/styles/tokens.ts` or `src/styles/semanticTokens.ts`
2. Update `preset.ts` if adding new token categories
3. Run `npm run panda` to regenerate CSS
4. Restart dev server if running

### Adding Icons

1. Place optimized SVG in `src/utils/svgsSource/`
2. Run `npm run generate-sprite` to:
   - Generate `src/utils/spriteContent.ts` with new sprite data
   - Update type definitions (`icons.d.ts`, `iconNames.ts`)
3. Icon name is auto-generated as type-safe string literal
4. **Important**: Sprite content is bundled with the library, so:
   - No need to copy sprite files in consuming apps
   - Icons work automatically when library is imported
   - Rebuild library (`npm run build`) to include new icons in distribution

### Testing the Package Locally

Before publishing to npm, test the package in a local project:

1. **Build the package**:
   ```bash
   npm run build
   ```

2. **Create test tarball**:
   ```bash
   npm pack
   # Creates: okshaun-components-0.1.0.tgz
   ```

3. **Install in test project**:
   ```bash
   # In your test project
   npm install /path/to/okshaun-components/okshaun-components-0.1.0.tgz
   ```

4. **Clear cache and test**:
   ```bash
   # Clear Vite cache
   rm -rf node_modules/.vite

   # Test the components
   npm run dev
   ```

5. **Common issues**:
   - Missing exports: Check `src/index.ts` exports
   - Type errors: Rebuild with `npm run build` to regenerate `.d.ts` files
   - Import errors: Verify package.json `exports` field

## Testing Component Changes

Use Storybook for component development:

```bash
npm run storybook
```

Stories are colocated with components (e.g., `ComponentName.stories.tsx`).
