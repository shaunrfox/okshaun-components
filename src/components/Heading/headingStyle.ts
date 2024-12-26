import { cva } from '@styled-system/css';
import { textStyle } from '~/components/Text/textStyle';

export const headingStyle = cva({
  base: {
    ...textStyle.config.base,
    fontWeight: 'bold',
  },
  variants: textStyle.config.variants,
  defaultVariants: {
    level: '24',
    font: 'sans',
  },
});

export type HeadingVariantProps = Parameters<typeof headingStyle>[0];
