import { defineRecipe } from '@pandacss/dev';

const skeletonBase = {
  position: 'relative',
  display: 'inline-flex',
  overflow: 'hidden',
  verticalAlign: 'middle',
  pointerEvents: 'none',
  userSelect: 'none',
  color: 'transparent',
  bg: 'bg.neutral',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: '0',
    transform: 'translateX(-100%)',
    bg: 'bg.neutral.hovered',
    opacity: '0.45',
    pointerEvents: 'none',
  },
  '@media (prefers-reduced-motion: reduce)': {
    animation: 'none',
    '&::after': {
      animation: 'none',
    },
  },
};

export const skeletonRecipe = defineRecipe({
  className: 'skeleton',
  jsx: ['Skeleton'],
  base: skeletonBase,
  variants: {
    variant: {
      text: {
        h: '4',
        w: 'full',
        borderRadius: 'full',
      },
      circular: {
        borderRadius: 'full',
        aspectRatio: 'square',
      },
      rounded: {
        borderRadius: '8',
      },
      rectangular: {
        borderRadius: '2',
      },
    },
    animation: {
      pulse: {
        animation: 'pulse',
      },
      wave: {
        '&::after': {
          animation: 'skeletonWave',
        },
      },
      false: {
        animation: 'none',
        '&::after': {
          display: 'none',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'text',
    animation: 'pulse',
  },
});
