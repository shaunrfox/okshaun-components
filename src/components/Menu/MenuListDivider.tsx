import React from 'react';
import { Box } from '../Box';
import { cx } from '@styled-system/css';
import { menu as menuRecipe } from '@styled-system/recipes';
import { splitProps } from '~/utils/splitProps';
import type { MenuListDividerProps } from './types';

export const MenuListDivider: React.FC<MenuListDividerProps> = ({
  size,
  indicatorPosition,
  className,
  ...props
}) => {
  const [cssClassName, otherProps] = splitProps(props);
  const classes = menuRecipe({ size, indicatorPosition });

  return (
    <Box
      role="separator"
      className={cx(classes.menuDivider, cssClassName, className)}
      {...otherProps}
    />
  );
};
