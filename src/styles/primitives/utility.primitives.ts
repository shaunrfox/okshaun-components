export const radii = {
  '0': { value: '{sizes.0}' },
  '1': { value: '{sizes.1}' },
  '2': { value: '{sizes.2}' },
  '4': { value: '{sizes.4}' },
  '8': { value: '{sizes.8}' },
  '16': { value: '{sizes.16}' },
  '100': { value: '100%' },
};

export const borderWidths = {
  '0': { value: '{sizes.0}' },
  '1': { value: '{sizes.1}' },
  '2': { value: '{sizes.2}' },
  '4': { value: '{sizes.4}' },
  '8': { value: '{sizes.8}' },
  '16': { value: '{sizes.16}' },
};

export const shadows = {
  low: {
    value:
      '0px 1px 1px {colors.utility.shadowColor}, 0px 2px 2px {colors.utility.shadowColor}',
  },
  medium: {
    value:
      '0px 2px 2px {colors.utility.shadowColor}, 0px 4px 4px {colors.utility.shadowColor}, 0px 8px 8px {colors.utility.shadowColor}',
  },
  high: {
    value:
      '0px 2px 2px {colors.utility.shadowColor}, 0px 4px 4px {colors.utility.shadowColor}, 0px 8px 8px {colors.utility.shadowColor}, 0px 16px 16px {colors.utility.shadowColor}',
  },
  inset: {
    value:
      'inset 0px 2px 1px {colors.utility.shadowColor}, inset 0px 3px 2px {colors.utility.shadowColor}',
  },
  none: {
    value: '0 0 0 {colors.transparent}',
  },
};

export const aspectRatios = {
  square: {
    value: '1 / 1',
  },
  landscape: {
    value: '4 / 3',
  },
  portrait: {
    value: '3 / 4',
  },
  wide: {
    value: '16 / 9',
  },
  ultrawide: {
    value: '18 / 5',
  },
  golden: {
    value: '1.618 / 1',
  },
};

export const blurs = {
  sm: {
    value: '4px',
  },
  base: {
    value: '8px',
  },
  md: {
    value: '12px',
  },
  lg: {
    value: '16px',
  },
  xl: {
    value: '24px',
  },
  '2xl': {
    value: '40px',
  },
  '3xl': {
    value: '64px',
  },
};

/**
 * Border shorthand tokens for common border combinations.
 * Uses semantic color tokens for theming support.
 * Usage: border: 'subtle' or border: 'default'
 */
export const borders = {
  none: {
    value: 'none',
  },
  subtle: {
    value: '1px solid {colors.border}',
  },
  default: {
    value: '1px solid {colors.border}',
  },
  strong: {
    value: '2px solid {colors.border.bold}',
  },
  input: {
    value: '1px solid {colors.border.input}',
  },
  focused: {
    value: '2px solid {colors.border.focused}',
  },
  selected: {
    value: '2px solid {colors.border.selected}',
  },
  success: {
    value: '1px solid {colors.border.success}',
  },
  warning: {
    value: '1px solid {colors.border.warning}',
  },
  danger: {
    value: '1px solid {colors.border.danger}',
  },
  info: {
    value: '1px solid {colors.border.info}',
  },
};
