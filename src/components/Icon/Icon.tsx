import React, { type SVGAttributes } from 'react';
import { Box, type BoxProps } from '~/components/Box';
import { splitCssProps } from '@styled-system/jsx';
import { cx, css } from '@styled-system/css';
// import { type ColorToken } from '@styled-system/tokens';
import { type IconNamesList } from './icons.d.ts';
import { icon } from '@styled-system/patterns';
import { numericSizes } from '~/styles/tokens';

/*
 * Using the size prop in this way cannot handle non-numeric sizes,
 * so importing this list of keys directly from the tokens to ensure
 * that only valid sizes are allowed.
 */
export type AllowedIconSizes = keyof typeof numericSizes;

export type IconProps = Omit<BoxProps, 'size'> &
  SVGAttributes<SVGElement> & {
    name: IconNamesList;
    size?: AllowedIconSizes;
    fill?: string;
  };
export const Icon: React.FC<IconProps> = ({
  name,
  size = '24',
  fill = 'current',
  ...props
}: IconProps) => {
  const [cssProps, otherProps] = splitCssProps(props);
  const { css: cssProp, ...styleProps } = cssProps;
  const className = css(cssProp, styleProps);

  return (
    <Box
      as={'svg'}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cx(icon({ size: size as AllowedIconSizes, fill }), className)}
      {...otherProps}
    >
      <use xlinkHref={`/sprite.svg#${name}`} />
    </Box>
  );
};
