import { cx } from '@styled-system/css';
import { popover } from '@styled-system/recipes';
import type { ReactNode } from 'react';

import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';

/** Props for {@link PopoverFooter}, the optional action region. */
export type PopoverFooterProps = Omit<BoxProps, 'children'> & {
  /** Footer content, typically actions such as `Button` or `Link`. */
  children: ReactNode;
};

/**
 * Renders the optional footer/actions region of a {@link PopoverContent}.
 *
 * @example
 * ```tsx
 * <PopoverFooter>
 *   <Button size="sm">Got it</Button>
 * </PopoverFooter>
 * ```
 */
export const PopoverFooter = (props: PopoverFooterProps) => {
  const { children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = popover();

  return (
    <Box className={cx(classes.footer, className)} {...otherProps}>
      {children}
    </Box>
  );
};
