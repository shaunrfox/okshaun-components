import { cx } from '@styled-system/css';
import { modal as modalRecipe } from '@styled-system/recipes';
import type { ReactNode } from 'react';

import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';

export type ModalFooterProps = Omit<BoxProps, 'children'> & {
  /** Footer content (typically action buttons) */
  children: ReactNode;
};

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
