import type { ColorToken, NumericSizeToken } from '@styled-system/tokens';

type ShadowColorPath =
  | 'shadow.raised.1'
  | 'shadow.raised.2'
  | 'shadow.elevated.1'
  | 'shadow.elevated.2'
  | 'shadow.elevated.3'
  | 'shadow.overlay.1'
  | 'shadow.overlay.2'
  | 'shadow.overlay.3'
  | 'shadow.overflow.1'
  | 'shadow.overflow.2'
  | 'transparent';

type ShadowLayer = {
  x: NumericSizeToken;
  y: NumericSizeToken;
  blur: NumericSizeToken;
  color: ShadowColorPath;
  spread?: NumericSizeToken;
};

export type ShadowMode = 'light' | 'dark';

/**
 * Geometry for each elevation, declared once and consumed by both the boxShadow
 * primitives and the dropShadow utility so the two cannot drift apart. Only the
 * colour differs between modes, except for `overflow`, which also widens.
 */
export const elevationShadowDefinitions = {
  zero: [
    { x: '0', y: '0', blur: '0', color: 'transparent' },
    { x: '0', y: '0', blur: '0', color: 'transparent' },
  ],
  raised: [
    { x: '0', y: '1', blur: '1', color: 'shadow.raised.1' },
    { x: '0', y: '0', blur: '1', color: 'shadow.raised.2' },
  ],
  elevated: [
    { x: '0', y: '0', blur: '0', color: 'shadow.elevated.1' },
    { x: '0', y: '4', blur: '7', color: 'shadow.elevated.2' },
    { x: '0', y: '0', blur: '1', color: 'shadow.elevated.3' },
  ],
  overlay: [
    { x: '0', y: '0', blur: '0', color: 'shadow.overlay.1' },
    { x: '0', y: '8', blur: '12', color: 'shadow.overlay.2' },
    { x: '0', y: '0', blur: '1', color: 'shadow.overlay.3' },
  ],
  overflow: [
    { x: '0', y: '0', blur: '8', color: 'shadow.overflow.1' },
    { x: '0', y: '0', blur: '1', color: 'shadow.overflow.2' },
  ],
} as const satisfies Record<string, readonly ShadowLayer[]>;

/** Dark mode widens the overflow blur. Every other elevation varies by colour. */
export const darkElevationShadowDefinitions = {
  overflow: [
    { x: '0', y: '0', blur: '12', color: 'shadow.overflow.1' },
    { x: '0', y: '0', blur: '1', color: 'shadow.overflow.2' },
  ],
} as const satisfies Record<string, readonly ShadowLayer[]>;

export type ElevationShadowName = keyof typeof elevationShadowDefinitions;
export type DropShadowName = Exclude<ElevationShadowName, 'overflow'>;

/**
 * boxShadow primitives are declared on `:root`, and a custom property that
 * references another resolves in the scope where it is DEFINED, not where it is
 * used. A `:root`-level `var(--colors-shadow-raised-1)` would therefore stay on
 * the light value inside a locally dark subtree. So each primitive names a
 * mode-specific colour and the light/dark switch happens on the shadow token.
 */
const boxShadowColor = (color: ShadowColorPath, mode: ShadowMode) =>
  color === 'transparent'
    ? '{colors.transparent}'
    : `{colors.${color}.${mode}}`;

/**
 * dropShadow is emitted on the element that uses it, so its `var()` resolves in
 * the using scope. It can read the mode-aware semantic colour directly.
 */
export const dropShadowColorToken = (color: ShadowColorPath) =>
  (color === 'transparent' ? 'colors.transparent' : `colors.${color}`) as
    | 'colors.transparent'
    | `colors.${ColorToken}`;

const formatBoxShadowLayer = (layer: ShadowLayer, mode: ShadowMode) =>
  [
    `{sizes.${layer.x}}`,
    `{sizes.${layer.y}}`,
    `{sizes.${layer.blur}}`,
    layer.spread ? `{sizes.${layer.spread}}` : undefined,
    boxShadowColor(layer.color, mode),
  ]
    .filter(Boolean)
    .join(' ');

export const getBoxShadowPrimitive = (
  name: ElevationShadowName,
  mode: ShadowMode,
) =>
  elevationShadowDefinitions[name]
    .map((layer) => formatBoxShadowLayer(layer, mode))
    .join(', ');

export const getDarkBoxShadowPrimitive = (
  name: keyof typeof darkElevationShadowDefinitions,
) =>
  darkElevationShadowDefinitions[name]
    .map((layer) => formatBoxShadowLayer(layer, 'dark'))
    .join(', ');
