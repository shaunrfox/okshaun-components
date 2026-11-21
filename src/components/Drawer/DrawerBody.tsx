import { cx } from '@styled-system/css';
import { drawer as drawerRecipe } from '@styled-system/recipes';
import type { ReactNode } from 'react';

import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';

/** Props for {@link DrawerBody}, the main content region of a drawer. */
export type DrawerBodyProps = Omit<BoxProps, 'children'> & {
  /** Content displayed in the drawer's body region. */
  children: ReactNode;
  /**
   * When `true`, the body scrolls as one region. Set `false` when the content
   * manages its own scroll regions, such as a thread and a side rail that
   * scroll separately.
   * @default true
   */
  scrollable?: boolean;
};

/**
 * Renders the main content region of a {@link Drawer}. It fills the height
 * between the header and the footer.
 *
 * @example
 * ```tsx
 * <DrawerBody>Changes are saved automatically.</DrawerBody>
 * ```
 */
export const DrawerBody = (props: DrawerBodyProps) => {
  const { children, scrollable = true, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = drawerRecipe({ scrollable });

  return (
    <Box className={cx(classes.body, className)} {...otherProps}>
      {children}
    </Box>
  );
};
