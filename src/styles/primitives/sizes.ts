import { defineTokens } from '@pandacss/dev';

export const numericSizes = {
  '0': { value: '0' },
  '1': { value: '0.0625rem' },
  '2': { value: '0.125rem' },
  '3': { value: '0.1875rem' },
  '4': { value: '0.25rem' },
  '5': { value: '0.3125rem' },
  '6': { value: '0.375rem' },
  '7': { value: '0.4375rem' },
  '8': { value: '0.5rem' },
  '9': { value: '0.5625rem' },
  '10': { value: '0.625rem' },
  '12': { value: '0.75rem' },
  '14': { value: '0.875rem' },
  '16': { value: '1rem' },
  '20': { value: '1.25rem' },
  '22': { value: '1.375rem' },
  '24': { value: '1.5rem' },
  '32': { value: '2rem' },
  '40': { value: '2.5rem' },
  '48': { value: '3rem' },
  '56': { value: '3.5rem' },
  '64': { value: '4rem' },
  '72': { value: '4.5rem' },
  '80': { value: '5rem' },
  '88': { value: '5.5rem' },
  '96': { value: '6rem' },
  '104': { value: '6.5rem' },
  '112': { value: '7rem' },
  '120': { value: '7.5rem' },
  '128': { value: '8rem' },
  '136': { value: '8.5rem' },
  '144': { value: '9rem' },
  '152': { value: '9.5rem' },
  '160': { value: '10rem' },
  '168': { value: '10.5rem' },
  '176': { value: '11rem' },
  '184': { value: '11.5rem' },
  '192': { value: '12rem' },
  '200': { value: '12.5rem' },
  '208': { value: '13rem' },
  '216': { value: '13.5rem' },
  '224': { value: '14rem' },
  '232': { value: '14.5rem' },
  '240': { value: '15rem' },
  '248': { value: '15.5rem' },
  '256': { value: '16rem' },
  '264': { value: '16.5rem' },
  '272': { value: '17rem' },
  '280': { value: '17.5rem' },
};

export const utilitySizes = {
  full: { value: '100%' },
  half: { value: '50%' },
  min: { value: 'min-content' },
  max: { value: 'max-content' },
  fit: { value: 'fit-content' },
  prose: { value: '65ch' },
  auto: { value: 'auto' },
};

// Container size tokens for the sizes scale (with value wrappers)
export const containerSizeTokens = {
  '2xs': { value: '16rem' }, // 256px
  xs: { value: '20rem' }, // 320px
  sm: { value: '24rem' }, // 384px
  md: { value: '28rem' }, // 448px
  lg: { value: '32rem' }, // 512px
  xl: { value: '36rem' }, // 576px
  '2xl': { value: '42rem' }, // 672px
  '3xl': { value: '48rem' }, // 768px
  '4xl': { value: '56rem' }, // 896px
  '5xl': { value: '64rem' }, // 1024px
  '6xl': { value: '72rem' }, // 1152px
  '7xl': { value: '80rem' }, // 1280px
  '8xl': { value: '90rem' }, // 1440px
};

export const sizes = defineTokens.sizes({
  ...numericSizes,
  ...utilitySizes,
  ...containerSizeTokens,
});
