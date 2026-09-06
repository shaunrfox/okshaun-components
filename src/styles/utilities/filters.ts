import { defineUtility } from '@pandacss/dev';

/**
 * Every filter slot, each empty until a utility fills it. Composing through
 * custom properties lets dropShadow set its own slot without clearing the rest.
 * The string matches Panda's own `filter: auto` value, so the base utility and
 * `dropShadow` stay in agreement.
 */
export const filterAutoValue =
  'var(--blur, ) var(--brightness, ) var(--contrast, ) var(--grayscale, ) var(--hue-rotate, ) var(--invert, ) var(--saturate, ) var(--sepia, ) var(--drop-shadow, )';

export const filterValues = {
  auto: filterAutoValue,
  invert: 'invert(1)',
  blur: 'blur(8px)',
  none: 'none',
};

/**
 * Extends Panda's base `filter` utility, which ships `auto` alone, with the
 * library's named filters.
 */
export const filterProperty = defineUtility({
  className: 'filter',
  group: 'Effect',
  values: filterValues,
});
