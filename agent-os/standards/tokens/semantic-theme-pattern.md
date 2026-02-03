# Semantic Token Theme Pattern

Semantic tokens support light/dark themes via Panda CSS conditional values.

## Structure

```typescript
tokenName: {
  value: {
    base: '{colors.neutralA.20}',      // Light mode
    _dark: '{colors.darkNeutralA.20}', // Dark mode
  },
}
```

- `base` = light mode (default)
- `_dark` = dark mode
- No other conditions (no `_sm`, `_md` responsive tokens)

## Naming Convention

Multi-level nesting for state variants:

```typescript
bg: {
  neutral: {
    DEFAULT: { value: {...} },        // bg.neutral
    bold: {
      DEFAULT: { value: {...} },      // bg.neutral.bold
      hovered: { value: {...} },      // bg.neutral.bold.hovered
      pressed: { value: {...} },      // bg.neutral.bold.pressed
    },
  },
}
```

## Brand Palette

Single variable controls the entire brand color system:

```typescript
const BRAND_PALETTE = 'gray' as const;
const brandPalette = (shade: string) => `{colors.${BRAND_PALETTE}.${shade}}`;
```

This is configurable per-project. Consuming apps that fork the preset can change `BRAND_PALETTE` to any color family (`blue`, `red`, `green`, etc.) to rebrand all `brand.*` tokens at once.

## Inverse Pattern

Inverse tokens intentionally flip light/dark:

```typescript
bg.neutral.inverse: {
  base: '{colors.darkNeutral.0}',   // Dark bg in light mode
  _dark: '{colors.neutral.0}',      // Light bg in dark mode
}
```

## Categories

`bg`, `text`, `border`, `icon`, `surface`, `link`, `blanket` — each with semantic sub-tokens for states like `disabled`, `selected`, `success`, `warning`, `danger`, `info`.
