import { defineUtility } from '@pandacss/dev';

export const filters = {
  invert: { value: 'invert(1)' },
  blur: { value: 'blur(8px)' },
  none: { value: 'none' },
};

export const filtersProperty = defineUtility({
  className: 'filters',
  values: 'filters',
});
