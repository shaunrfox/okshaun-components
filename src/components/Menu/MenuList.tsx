import React from 'react';
import { Box } from '../Box';
import { menu as menuRecipe } from '@styled-system/recipes';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import type { MenuListProps } from './types';

export const MenuList = React.forwardRef<HTMLDivElement, MenuListProps>(
  ({ size, indicatorPosition, role = 'listbox', className, ...props }, ref) => {
    const [cssClassName, otherProps] = splitProps(props);
    const classes = menuRecipe({ size, indicatorPosition });

    return (
      <Box
        ref={ref}
        role={role}
        className={cx(classes.menu, cssClassName, className)}
        {...otherProps}
      />
    );
  }
);

MenuList.displayName = 'MenuList';
