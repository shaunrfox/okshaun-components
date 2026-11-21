import { cx } from '@styled-system/css';
import { popover } from '@styled-system/recipes';
import type { ReactNode } from 'react';

import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';

/** Props for {@link PopoverHeader}, the optional heading region. */
export type PopoverHeaderProps = Omit<BoxProps, 'children'> & {
  /** Header content, typically `PopoverTitle` and optional `PopoverClose`. */
  children?: ReactNode;
};

/**
 * Renders the optional header region of a parent {@link PopoverContent}.
 *
 * @example
 * ```tsx
 * <PopoverHeader>
 *   <PopoverTitle>Warning</PopoverTitle>
 *   <PopoverClose />
 * </PopoverHeader>
 * ```
 */
export const PopoverHeader = (props: PopoverHeaderProps) => {
  const { children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = popover();

  return (
    <Box className={cx(classes.header, className)} {...otherProps}>
      {children}
    </Box>
  );
};
