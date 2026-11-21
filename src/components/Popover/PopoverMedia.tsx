import { cx } from '@styled-system/css';
import { popover } from '@styled-system/recipes';
import type { ReactNode } from 'react';

import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';

/** Props for {@link PopoverMedia}, an optional media region. */
export type PopoverMediaProps = Omit<BoxProps, 'children'> & {
  /** Media content such as an image or illustration. */
  children: ReactNode;
};

/**
 * Renders an optional media region inside {@link PopoverContent}.
 *
 * Place images or other illustrative content here. Keep interactive controls
 * in Body or Footer so media stays presentational.
 *
 * @example
 * ```tsx
 * <PopoverMedia>
 *   <img src="/diagram.png" alt="Cycle time diagram" />
 * </PopoverMedia>
 * ```
 */
export const PopoverMedia = (props: PopoverMediaProps) => {
  const { children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = popover();

  return (
    <Box className={cx(classes.media, className)} {...otherProps}>
      {children}
    </Box>
  );
};
