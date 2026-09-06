import { defineRecipe } from '@pandacss/dev';

import type { AllowedIconSizes } from '~/components/Icon';
import { numericSizes } from '~/styles/primitives';

const sizeVariants = Object.fromEntries(
  Object.keys(numericSizes).map((key) => [key, { w: key }]),
) as Record<AllowedIconSizes, { w: AllowedIconSizes }>;

export const iconRecipe = defineRecipe({
  className: 'icon',
  jsx: ['Icon'],
  base: {
    aspectRatio: 'square',
    fill: 'icon.decorative',
    flexShrink: 0,
    // Default size. Does not affect variant class names, so it is safe here.
    w: '24',
  },
  variants: {
    size: {
      ...sizeVariants,
      sm: { w: '16' },
      md: { w: '20' },
      lg: { w: '24' },
      xl: { w: '28' },
    },
  },
  // No default size variant: a default here would be hard to override in
  // other recipes.
  defaultVariants: {},
});
