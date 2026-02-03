# Icon Pipeline

Icons flow from SVG source files to type-safe, bundled components.

## Flow

```
src/utils/svgsSource/*.svg          (source SVGs)
  → npm run generate-sprite
    → SVGO optimization              (strip fill/stroke, set 24x24)
    → svg-sprite (symbol mode)       (combine into sprite)
    → public/sprite.svg              (133 KB sprite file)
    → src/utils/spriteContent.ts     (sprite as JS string)
    → src/components/Icon/icons.d.ts (TypeScript union type)
    → src/components/Icon/iconNames.ts (runtime constant)
  → npm run build
    → spriteContent.ts bundled into dist/index.js
```

## Adding an Icon

1. Place SVG in `src/utils/svgsSource/` (kebab-case: `my-icon.svg`)
2. Run `npm run generate-sprite`
3. Use: `<Icon name="my-icon" />`
4. TypeScript will enforce valid names

## SVGO Transformations

```javascript
// What's REMOVED from source SVGs:
- fill attributes        // Icons are single-color, styled via CSS
- stroke attributes      // Same reason
- class, data-name       // Unnecessary metadata
- width/height attrs     // Replaced with standard 24x24

// What's PRESERVED:
- viewBox               // Required for scaling
- path data             // The actual icon shapes

// What's ADDED:
- width="24" height="24"  // Standard icon dimensions
```

## Single-Color Only

All icons are monochrome. Color is applied via CSS `fill` property through the Panda `icon` pattern. Multi-color icons are not supported — SVGO strips all fill/stroke attributes.

## File Naming

SVG filename becomes the icon name and TypeScript type:
- `arrow-down.svg` → `<Icon name="arrow-down" />`
- Names are alphabetically sorted in generated types
