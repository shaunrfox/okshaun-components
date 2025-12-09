import React from 'react';
import { Box } from '../Box';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { useMenuContext } from './MenuContext';
import type { MenuGroupProps } from './types';

export const MenuGroup: React.FC<MenuGroupProps> = ({
  label,
  children,
  className,
  ...props
}) => {
  const [cssClassName, otherProps] = splitProps(props);
  const { classes } = useMenuContext();

  return (
    <Box
      role="group"
      aria-label={label}
      className={cx(classes.menuGroup, cssClassName, className)}
      {...otherProps}
    >
      {label && (
        <Box className={classes.menuGroupLabel}>{label}</Box>
      )}
      {children}
    </Box>
  );
};
