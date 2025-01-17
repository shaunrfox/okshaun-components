// import { styled } from '@styled-system/jsx';
// import type { StyledComponent } from '@styled-system/jsx';
// import type { ComponentProps } from 'react';
// import { textStyle } from './textStyle';

// type ParagraphProps = ComponentProps<'p'> & { as?: React.ElementType } & {
//   [key: string]: any;
//   className?: string;
// };

// export const Text = styled('p', textStyle) as StyledComponent<
//   'p',
//   ParagraphProps
// >;

// export type TextProps = ComponentProps<typeof Text>;

// SOURCE
// https://www.adebayosegun.com/blog/typography-component-with-panda-css-recipes

import { textStyle, type TextVariantProps } from './textStyle';
import { cx } from '../../../styled-system/css';

type TypographyHTMLProps = React.HTMLAttributes<HTMLElement>;

type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export type TypographyProps = TextVariantProps &
  TypographyHTMLProps & { as?: TypographyElement };

export function Text(props: TypographyProps) {
  const [variantProps, localProps] = textStyle.splitVariantProps(props);
  const { as: Component = 'p', className, ...restProps } = localProps;
  return (
    <Component
      className={cx(textStyle(variantProps), className)}
      {...restProps}
    />
  );
}
