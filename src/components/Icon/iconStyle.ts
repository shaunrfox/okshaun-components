import { cva, type RecipeVariantProps } from '@styled-system/css';

export const iconStyle = cva({
  base: {
    fill: 'current',
    width: '24',
    height: '24',
  },
});

export type IconVariantProps = RecipeVariantProps<typeof iconStyle>[0];
