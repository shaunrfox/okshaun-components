import { cx } from '@styled-system/css';
import { modal as modalRecipe } from '@styled-system/recipes';
import type { ReactNode } from 'react';

import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';

/** Props for {@link ModalBody}, the main content region of a modal. */
export type ModalBodyProps = Omit<BoxProps, 'children'> & {
  /** Content displayed in the modal's body region. */
  children: ReactNode;
};

/**
 * Renders the main content region of a {@link ModalWrapper}.
 *
 * @example
 * ```tsx
 * <ModalBody>Changes are saved automatically.</ModalBody>
 * ```
 */
export const ModalBody = (props: ModalBodyProps) => {
  const { children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = modalRecipe();

  return (
    <Box className={cx(classes.body, className)} {...otherProps}>
      {children}
    </Box>
  );
};
