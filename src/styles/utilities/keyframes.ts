import { defineKeyframes } from '@pandacss/dev';

export const keyframes = defineKeyframes({
  spin: {
    to: {
      transform: 'rotate(360deg)',
    },
  },
  ping: {
    '75%, 100%': {
      transform: 'scale(2)',
      opacity: '0',
    },
  },
  pulse: {
    '50%': {
      opacity: '.5',
    },
  },
  bounce: {
    '0%, 100%': {
      transform: 'translateY(-25%)',
      animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
    },
    '50%': {
      transform: 'none',
      animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
    },
  },
  badgePop: {
    '0%': {
      transform: 'translate(50%, -50%) scale(1)',
    },
    '50%': {
      transform: 'translate(50%, -50%) scale(1.2)',
    },
    '100%': {
      transform: 'translate(50%, -50%) scale(1)',
    },
  },
  badgePopStandalone: {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.2)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
  slideLeft: {
    '0%': { transform: 'translateX(100%)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },
  slideRight: {
    '0%': { transform: 'translateX(-100%)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },
  skeletonWave: {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
  // Modal animations
  modalFadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  modalFadeOut: {
    '0%': { opacity: '1' },
    '100%': { opacity: '0' },
  },
  // The dialog is centred by `place-content` on the position wrapper, so these
  // carry no translate(-50%, -50%). The old absolutely-positioned modal needed
  // one; keeping it shifted the panel up and left by half its size.
  modalScaleIn: {
    '0%': {
      opacity: '0',
      transform: 'scale(0.95) translateY(20px)',
    },
    '100%': {
      opacity: '1',
      transform: 'scale(1) translateY(0)',
    },
  },
  modalScaleOut: {
    '0%': {
      opacity: '1',
      transform: 'scale(1) translateY(0)',
    },
    '100%': {
      opacity: '0',
      transform: 'scale(0.95) translateY(20px)',
    },
  },
  modalScaleInTop: {
    '0%': {
      opacity: '0',
      transform: 'scale(0.97) translateY(-40px)',
    },
    '100%': {
      opacity: '1',
      transform: 'scale(1) translateY(0)',
    },
  },
  modalScaleOutTop: {
    '0%': {
      opacity: '1',
      transform: 'scale(1) translateY(0)',
    },
    '100%': {
      opacity: '0',
      transform: 'scale(0.97) translateY(-40px)',
    },
  },
});
