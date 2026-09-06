import { cx } from '@styled-system/css';
import { modal as modalRecipe } from '@styled-system/recipes';
import type { ReactNode } from 'react';

import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';

/** Props for {@link ModalFooter}, the action region of a modal. */
export type ModalFooterProps = Omit<BoxProps, 'children'> & {
  /** Content displayed in the footer, typically dialog action buttons. */
  children: ReactNode;
};

/**
 * Renders the action region of a {@link ModalWrapper}.
 *
 * @example
 * ```tsx
 * <ModalFooter><Button>Save</Button></ModalFooter>
 * ```
 */
export const ModalFooter = (props: ModalFooterProps) => {
  const { children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = modalRecipe();

  return (
    <Box className={cx(classes.footer, className)} {...otherProps}>
      {children}
    </Box>
  );
};
