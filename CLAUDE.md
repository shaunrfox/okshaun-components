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
  - Creates sprite at `dist/sprite.svg`
  - Generates TypeScript types at `src/components/Icon/icons.d.ts` and `iconNames.ts`
  - Opens preview HTML automatically

### Deployment
- `npm run deploy` - Deploy to GitHub Pages

## Architecture

### Styling System: Panda CSS

The project uses **Panda CSS** (v1.4.3), a CSS-in-JS framework with build-time extraction. Understanding the Panda CSS architecture is critical:

#### Configuration Files
- **`preset.ts`** - Custom Panda preset (`okShaunPreset`) that defines the complete design system
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

Icons use an SVG sprite workflow:
1. Source SVGs in `src/utils/svgsSource/`
2. Run `npm run generate-sprite` to:
   - Optimize SVGs (removes fill/stroke, adds 24x24 dimensions)
   - Create sprite at `dist/sprite.svg`
   - Generate TypeScript types for icon names
3. Use `Icon` component with type-safe icon names

### Build Configuration

#### Library Mode (default)
- Entry: `src/index.ts`
- Output: ES module at `dist/ok-shaun-components.es.js`
- Externals: react, react-dom, react/jsx-runtime
- Includes TypeScript declarations via `vite-plugin-dts`

#### GitHub Pages Mode
When `GH_REPO` env var is set, builds as demo app instead of library.

### TypeScript Configuration

- Strict mode enabled with `noUncheckedIndexedAccess`
- JSX: `react-jsx` (automatic runtime)
- Module resolution: `bundler` mode
- Path aliases match Vite configuration

## Key Design Decisions

1. **Panda CSS over other solutions**: Build-time CSS extraction, type-safe tokens, recipe system
2. **Polymorphic components**: All components can render as different elements via `as` prop
3. **Recipe-first styling**: Components use recipes, style props are supplementary
4. **Theme via CSS custom properties**: Panda handles theme switching via CSS variables
5. **SVG sprites over individual imports**: Better performance, single HTTP request
6. **Strict TypeScript**: Catch errors early, especially with `noUncheckedIndexedAccess`

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
2. Run `npm run generate-sprite`
3. Icon name is auto-generated as type-safe string literal

## Testing Component Changes

Use Storybook for component development:
```bash
npm run storybook
```
Stories are colocated with components (e.g., `ComponentName.stories.tsx`).
