import React, { type ElementType } from 'react';
import { Box, type BoxProps } from '~/components/Box';
import { splitCssProps } from '@styled-system/jsx';
import { heading, type HeadingVariantProps } from '@styled-system/recipes';
import { cx, css } from '@styled-system/css';

export type HeadingProps = BoxProps & {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  children?: string | React.ReactNode;
};

export const Heading: React.FC<HeadingProps> = ({
  as,
  children,
  ...props
}: HeadingProps) => {
  const Component = as ?? 'h2';
  const [cssProps, otherProps] = splitCssProps(props);
  const { css: cssProp, ...styleProps } = cssProps;
  const className = css(cssProp, styleProps);

  return (
    <Box
      as={Component}
      className={cx(heading({ as: Component }), className)}
      {...otherProps}
    >
      {children}
    </Box>
  );
};
