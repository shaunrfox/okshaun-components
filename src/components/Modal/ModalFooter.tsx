import React from 'react';
import { Box } from '../Box';
import { modal as modalRecipe } from '@styled-system/recipes';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import type { ModalFooterProps } from './types';

export const ModalFooter: React.FC<ModalFooterProps> = ({ children, ...props }) => {
  const [className, otherProps] = splitProps(props);
  const classes = modalRecipe();

  return (
    <Box className={cx(classes.footer, className)} {...otherProps}>
      {children}
    </Box>
  );
};

