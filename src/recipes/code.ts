import { defineRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

const codeBase = {
  ...globalBaseStyles,
  display: 'inline',
  fontFamily: 'mono',
  // Relative to the surrounding text, so inline code keeps the same optical
  // size in a heading, a paragraph, or a table cell.
  fontSize: 'smaller',
  lineHeight: 'inherit',
  color: 'text',
  px: '4',
  rounded: '4',
  boxDecorationBreak: 'clone',
  // Long identifiers, part numbers, and tokens wrap instead of overflowing
  // their container.
  overflowWrap: 'anywhere',
  whiteSpace: 'normal',
};

const codeVariants = {
  variant: {
    /** Tinted background. The default for code inside running text. */
    subtle: {
      bg: 'bg.neutral',
    },
    /** Border only. Use where a tint would compete with a selected row. */
    outline: {
      borderWidth: '1',
      borderStyle: 'solid',
      borderColor: 'border',
      bg: 'transparent',
    },
    /** Monospace font only. Use for values in dense tables and lists. */
    plain: {
      px: '0',
      bg: 'transparent',
    },
  },
};

export const codeRecipe = defineRecipe({
  className: 'code',
  jsx: ['Code'],
  base: codeBase,
  variants: codeVariants,
  defaultVariants: {
    variant: 'subtle',
  },
});
