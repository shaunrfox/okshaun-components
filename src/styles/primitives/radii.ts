import { defineTokens } from '@pandacss/dev';
import { utilitySizes } from './sizes';

export const radii = defineTokens.radii({
  '0': { value: '{sizes.0}' },
  '1': { value: '{sizes.1}' },
  '2': { value: '{sizes.2}' },
  '3': { value: '{sizes.3}' },
  '4': { value: '{sizes.4}' },
  '8': { value: '{sizes.8}' },
  '16': { value: '{sizes.16}' },
  '100': { value: utilitySizes.full.value },
  '999': { value: '999px' },
});
