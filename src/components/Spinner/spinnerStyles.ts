import { cva, type RecipeVariantProps } from '@styled-system/css';

export const spinnerStyle = cva({
  base: {
    aspectRatio: 'square',
    rounded: '100',
    borderWidth: '3',
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderTopColor: 'slate.90',
    borderBottomColor: 'slate.90',
    animation: 'spin',
    // @ts-ignore
    filter: 'invert(1)',
    mixBlendMode: 'difference',
    isolation: 'isolate',
  },
  variants: {
    size: {
      standard: {
        height: '20',
        minHeight: '20',
      },
      small: {
        height: '16',
        minHeight: '16',
      },
      large: {
        height: '32',
        minHeight: '32',
      },
    }
  },
  defaultVariants: {
    size: 'standard'
  }
});

export type SpinnerVariantProps = RecipeVariantProps<typeof spinnerStyle>;
