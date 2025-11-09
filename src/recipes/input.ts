import { defineRecipe } from '@pandacss/dev';
const inputBase = {
  position: 'relative',
  display: 'inline-grid',
  verticalAlign: 'top',
  alignItems: 'center',
  padding: '0',
  fontFamily: 'body',
  fontSize: '16',
  fontWeight: 'normal',
  lineHeight: 'normal',
  color: { base: 'gray.90', _osDark: 'gray.5' },
  borderRadius: '8',
  '& input': {
    width: 'auto',
    minWidth: '16',
    maxWidth: 'full',
    font: 'inherit',
    py: '4',
    px: '8',
    m: '0',
    resize: 'none',
    appearance: 'none',
    borderWidth: '1',
    borderStyle: 'solid',
    borderRadius: '4',
    borderColor: 'transparent',
    background: { base: 'gray.0', _osDark: 'gray.90' },
  },
  gridTemplateColumns: 'auto 1fr',
};

const inputVariants = {
  variant: {
    stacked: {
      gridTemplateRows: 'auto 1fr',
      alignItems: 'stretch',
      '& input': {
        gridArea: '2 / 1',
        background: { base: 'gray.0', _osDark: 'gray.90' },
        borderColor: { base: 'gray.40', _osDark: 'gray.50' },
      },
    },
    internalLabel: {},
  },
};

export const inputRecipe = defineRecipe({
  className: 'input',
  jsx: ['Input'],
  base: inputBase,
  variants: inputVariants,
  defaultVariants: {
    variant: 'stacked',
  },
});
