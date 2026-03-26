import { cx } from '@styled-system/css';
import { type IconVariantProps, icon } from '@styled-system/recipes';
import type { ColorToken } from '@styled-system/tokens';
import type { SVGAttributes } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import type { numericSizes } from '~/styles/primitives';
import { splitProps } from '~/utils/splitProps';

import { useIconConfig } from './IconContext';

import type { IconNamesList } from './icons';

/*
 * Using the size prop in this way cannot handle non-numeric sizes,
 * so importing this list of keys directly from the tokens to ensure
 * that only valid sizes are allowed.
 */
export type AllowedIconSizes = keyof typeof numericSizes;

export type IconProps = Omit<BoxProps, IconNamesList | 'size'> &
  SVGAttributes<SVGElement> &
  IconVariantProps & {
    name: IconNamesList;
    size?: AllowedIconSizes;
    fill?: ColorToken;
  };

export const Icon = (props: IconProps) => {
  const { name, size, fill, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const { spritePath } = useIconConfig();
  const spriteHref = `${spritePath}#${name}`;

  return (
    <Box
      as="svg"
      name={name}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...(size && { width: size })}
      fill={fill}
      className={cx(icon(), className)}
      {...otherProps}
    >
      <use xlinkHref={spriteHref} />
    </Box>
  );
};
