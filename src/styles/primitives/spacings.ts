import { defineTokens } from '@pandacss/dev';
import { numericSizes, utilitySizes } from './sizes';

export const spacing = defineTokens.spacing({
  ...numericSizes,
  ...utilitySizes,
});
