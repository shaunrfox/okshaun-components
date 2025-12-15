export const animations = {
  spin: {
    value: 'spin 1s linear infinite',
  },
  ping: {
    value: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
  },
  pulse: {
    value: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
  bounce: {
    value: 'bounce 1s infinite',
  },
};

export const keyframes = {
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
};

export const easings = {
  default: {
    value: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  linear: {
    value: 'linear',
  },
  in: {
    value: 'cubic-bezier(0.4, 0, 1, 1)',
  },
  out: {
    value: 'cubic-bezier(0, 0, 0.2, 1)',
  },
  'in-out': {
    value: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export const durations = {
  fastest: {
    value: '50ms',
  },
  faster: {
    value: '100ms',
  },
  fast: {
    value: '150ms',
  },
  normal: {
    value: '200ms',
  },
  slow: {
    value: '300ms',
  },
  slower: {
    value: '400ms',
  },
  slowest: {
    value: '500ms',
  },
};

/**
 * Transition property tokens for use with strictTokens.
 * These are common CSS property combinations for transitions.
 * Usage: transitionProperty: 'colors' or transitionProperty: 'transform'
 */
export const transitions = {
  none: {
    value: 'none',
  },
  all: {
    value: 'all',
  },
  common: {
    value: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
  },
  colors: {
    value: 'background-color, border-color, color, fill, stroke',
  },
  opacity: {
    value: 'opacity',
  },
  shadow: {
    value: 'box-shadow',
  },
  transform: {
    value: 'transform',
  },
  position: {
    value: 'top, right, bottom, left',
  },
  size: {
    value: 'width, height',
  },
  spacing: {
    value: 'margin, padding',
  },
  outline: {
    value: 'outline, outline-color, outline-offset',
  },
  border: {
    value: 'border, border-color',
  },
};
