import { cx } from '@styled-system/css';
import { drawer as drawerRecipe } from '@styled-system/recipes';
import type { ReactNode } from 'react';

import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';

/** Props for {@link DrawerFooter}, the action region of a drawer. */
export type DrawerFooterProps = Omit<BoxProps, 'children'> & {
  /** Content displayed in the footer, typically action buttons. */
  children: ReactNode;
};

/**
 * Renders the action region of a {@link Drawer}. It stays fixed at the bottom
 * while the body scrolls.
 *
 * @example
 * ```tsx
 * <DrawerFooter><Button>Apply</Button></DrawerFooter>
 * ```
 */
export const DrawerFooter = (props: DrawerFooterProps) => {
  const { children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = drawerRecipe();

  return (
    <Box className={cx(classes.footer, className)} {...otherProps}>
      {children}
    </Box>
  );
};
