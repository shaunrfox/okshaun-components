import { cx } from '@styled-system/css';
import { popover } from '@styled-system/recipes';
import type { ReactNode } from 'react';

import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';

import { usePopoverContext } from './PopoverContext';

/** Props for {@link PopoverBody}, the main content region. */
export type PopoverBodyProps = Omit<BoxProps, 'children'> & {
  /** Body content. Strings render as text; nodes may include links and controls. */
  children: string | ReactNode;
};

/**
 * Renders the main content region of a {@link PopoverContent}.
 *
 * @example
 * ```tsx
 * <PopoverBody>
 *   Cycle time includes queue and wait, not only active work.
 * </PopoverBody>
 * ```
 */
export const PopoverBody = (props: PopoverBodyProps) => {
  const { children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const { size } = usePopoverContext();
  const classes = popover({ size });

  return (
    <Box className={cx(classes.body, className)} {...otherProps}>
      {children}
    </Box>
  );
};
