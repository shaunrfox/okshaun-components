import { defineUtility } from '@pandacss/dev';
import { durations, easings } from '../primitives';

/**
 * Transition property tokens for use with strictTokens.
 * These are common CSS property combinations for transitions.
 * Usage: transitionProperty: 'colors' or transitionProperty: 'transform'
 */
export const transitionProperties = {
  none: {
    value: 'none',
  },
  all: {
    value: 'all',
  },
  common: {
    value:
      'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
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

// Shorthands
export const transitions = {
  none: {
    value: 'none',
  },
  all: {
    value: `${transitionProperties.all} ${durations.normal} ${easings.default}`,
  },
  common: {
    value: `${transitionProperties.common} ${durations.normal} ${easings.default}`,
  },
  colors: {
    value: `${transitionProperties.colors} ${durations.normal} ${easings.default}`,
  },
  opacity: {
    value: `${transitionProperties.opacity} ${durations.normal} ${easings.default}`,
  },
  shadow: {
    value: `${transitionProperties.shadow} ${durations.normal} ${easings.default}`,
  },
  transform: {
    value: `${transitionProperties.transform} ${durations.normal} ${easings.default}`,
  },
  position: {
    value: `${transitionProperties.position} ${durations.normal} ${easings.default}`,
  },
  size: {
    value: `${transitionProperties.size} ${durations.normal} ${easings.default}`,
  },
  spacing: {
    value: `${transitionProperties.spacing} ${durations.normal} ${easings.default}`,
  },
  outline: {
    value: `${transitionProperties.outline} ${durations.normal} ${easings.default}`,
  },
  border: {
    value: `${transitionProperties.border} ${durations.normal} ${easings.default}`,
  },
};

export const transitionProperty = defineUtility({
  className: 'transition-property',
  values: 'transitions',
});
