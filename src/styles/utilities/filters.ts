import { defineUtility } from '@pandacss/dev';

/**
 * Every filter slot, each empty until a utility fills it. Composing through
 * custom properties lets dropShadow set its own slot without clearing the rest.
 */
export const filterAutoValue =
  'var(--blur, ) var(--brightness, ) var(--contrast, ) var(--grayscale, ) var(--hue-rotate, ) var(--invert, ) var(--saturate, ) var(--sepia, ) var(--drop-shadow, )';

export const filters = {
  auto: { value: filterAutoValue },
  invert: { value: 'invert(1)' },
  blur: { value: 'blur(8px)' },
  none: { value: 'none' },
};

export const filtersProperty = defineUtility({
  className: 'filters',
  values: 'filters',
});
