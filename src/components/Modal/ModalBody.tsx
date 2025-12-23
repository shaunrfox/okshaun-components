import React from 'react';
import { Box } from '../Box';
import { modal as modalRecipe } from '@styled-system/recipes';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import type { ModalBodyProps } from './types';

export const ModalBody: React.FC<ModalBodyProps> = ({ children, ...props }) => {
  const [className, otherProps] = splitProps(props);
  const classes = modalRecipe();

  return (
    <Box className={cx(classes.body, className)} {...otherProps}>
      {children}
    </Box>
  );
};
