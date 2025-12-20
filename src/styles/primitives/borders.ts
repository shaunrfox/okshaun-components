import { defineTokens } from '@pandacss/dev';

/**
 * Border shorthand tokens for common border combinations.
 * Uses semantic color tokens for theming support.
 * Usage: border: 'subtle' or border: 'default'
 */
export const borders = defineTokens.borders({
  default: {
    value: '{borderWidths.1} solid {colors.border}',
  },
  strong: {
    value: '{borderWidths.2} solid {colors.border.bold}',
  },
  input: {
    value: '{borderWidths.1} solid {colors.border.input}',
  },
  focused: {
    value: '{borderWidths.2} solid {colors.border.focused}',
  },
  success: {
    value: '{borderWidths.1} solid {colors.border.success}',
  },
  warning: {
    value: '{borderWidths.1} solid {colors.border.warning}',
  },
  danger: {
    value: '{borderWidths.1} solid {colors.border.danger}',
  },
  info: {
    value: '{borderWidths.1} solid {colors.border.info}',
  },
  none: {
    value: 'none',
  },
});
