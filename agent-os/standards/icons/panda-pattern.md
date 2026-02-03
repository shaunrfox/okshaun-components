# Icon as Panda Pattern

Icon styling uses a Panda CSS **pattern** (not a recipe). This is intentional.

## Why Pattern Instead of Recipe

- Icons need size transformation (`size` → `width` + `height`), which patterns handle natively
- No variant-based styling needed (no "primary"/"secondary" icon variants)
- Patterns are utility-like; recipes are component-like

## Definition

```typescript
// In preset.ts
patterns: {
  icon: {
    properties: {
      size: { type: 'enum', value: sizeKeys },
    },
    transform(props) {
      const { size, ...rest } = props;
      return { width: size, height: size, ...rest };
    },
  },
}
```

## Usage in Icon Component

```typescript
<Box
  as="svg"
  viewBox="0 0 24 24"
  className={cx(icon({ size, fill }), className)}
  {...otherProps}
>
  <use xlinkHref={`#${name}`} />
</Box>
```

## Color via Fill Prop

```typescript
<Icon name="alarm" fill="icon.danger" />    // Semantic color token
<Icon name="alarm" fill="red.50" />          // Primitive color
```

`fill` is a Panda style prop applied through `splitProps` — it becomes a CSS `fill` property on the SVG element.

## Allowed Sizes

Icon `size` prop accepts the full numeric size scale (`0`–`280`) plus utility sizes. Default is `'24'`.
