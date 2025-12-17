import React from 'react';
import { Box } from '../Box';
import { cx } from '@styled-system/css';
import { menu as menuRecipe } from '@styled-system/recipes';
import { splitProps } from '~/utils/splitProps';
import type { MenuListGroupProps } from './types';

export const MenuListGroup: React.FC<MenuListGroupProps> = ({
  label,
  size,
  indicatorPosition,
  children,
  className,
  ...props
}) => {
  const [cssClassName, otherProps] = splitProps(props);
  const classes = menuRecipe({ size, indicatorPosition });

  return (
    <Box
      role="group"
      aria-label={label}
      className={cx(classes.menuGroup, cssClassName, className)}
      {...otherProps}
    >
      {label && <Box className={classes.menuGroupLabel}>{label}</Box>}
      {children}
    </Box>
  );
};
