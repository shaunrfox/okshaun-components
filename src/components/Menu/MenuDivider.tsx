import React from 'react';
import { Box } from '../Box';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { useMenuContext } from './MenuContext';
import type { MenuDividerProps } from './types';

export const MenuDivider: React.FC<MenuDividerProps> = ({
  className,
  ...props
}) => {
  const [cssClassName, otherProps] = splitProps(props);
  const { classes } = useMenuContext();

  return (
    <Box
      role="separator"
      className={cx(classes.menuDivider, cssClassName, className)}
      {...otherProps}
    />
  );
};
