import type { ColorToken, NumericSizeToken } from '@styled-system/tokens';

type ShadowLayer = {
  x: NumericSizeToken;
  y: NumericSizeToken;
  blur: NumericSizeToken;
  color: `colors.${ColorToken}`;
  spread?: NumericSizeToken;
};

const sizeToken = (value: NumericSizeToken) => `{sizes.${value}}`;
const colorToken = (value: ShadowLayer['color']) => `{${value}}`;

const formatBoxShadowLayer = (layer: ShadowLayer) =>
  [
    sizeToken(layer.x),
    sizeToken(layer.y),
    sizeToken(layer.blur),
    layer.spread ? sizeToken(layer.spread) : undefined,
    colorToken(layer.color),
  ]
    .filter(Boolean)
    .join(' ');

/**
 * Geometry for each elevation, declared once. The light and dark appearance
 * differs by color alone, because `colors.shadow.*` are semantic tokens that
 * carry their own `_dark` value. Only `overflow` needs a second geometry.
 */
export const elevationShadowDefinitions = {
  zero: [
    { x: '0', y: '0', blur: '0', color: 'colors.transparent' },
    { x: '0', y: '0', blur: '0', color: 'colors.transparent' },
  ],
  raised: [
    { x: '0', y: '1', blur: '1', color: 'colors.shadow.raised.1' },
    { x: '0', y: '0', blur: '1', color: 'colors.shadow.raised.2' },
  ],
  elevated: [
    { x: '0', y: '0', blur: '0', color: 'colors.shadow.elevated.1' },
    { x: '0', y: '4', blur: '7', color: 'colors.shadow.elevated.2' },
    { x: '0', y: '0', blur: '1', color: 'colors.shadow.elevated.3' },
  ],
  overlay: [
    { x: '0', y: '0', blur: '0', color: 'colors.shadow.overlay.1' },
    { x: '0', y: '8', blur: '12', color: 'colors.shadow.overlay.2' },
    { x: '0', y: '0', blur: '1', color: 'colors.shadow.overlay.3' },
  ],
  overflow: [
    { x: '0', y: '0', blur: '8', color: 'colors.shadow.overflow.1' },
    { x: '0', y: '0', blur: '1', color: 'colors.shadow.overflow.2' },
  ],
} as const satisfies Record<string, readonly ShadowLayer[]>;

/**
 * Dark mode widens the overflow blur. Every other elevation shares one
 * geometry across modes, so this map holds the single exception.
 */
export const darkElevationShadowDefinitions = {
  overflow: [
    { x: '0', y: '0', blur: '12', color: 'colors.shadow.overflow.1' },
    { x: '0', y: '0', blur: '1', color: 'colors.shadow.overflow.2' },
  ],
} as const satisfies Record<string, readonly ShadowLayer[]>;

export type ElevationShadowName = keyof typeof elevationShadowDefinitions;
export type DarkElevationShadowName =
  keyof typeof darkElevationShadowDefinitions;
export type DropShadowName = Exclude<ElevationShadowName, 'overflow'>;

const joinBoxShadowLayers = (layers: readonly ShadowLayer[]) =>
  layers.map(formatBoxShadowLayer).join(', ');

export const getBoxShadowPrimitive = (name: ElevationShadowName) =>
  joinBoxShadowLayers(elevationShadowDefinitions[name]);

export const getDarkBoxShadowPrimitive = (name: DarkElevationShadowName) =>
  joinBoxShadowLayers(darkElevationShadowDefinitions[name]);
