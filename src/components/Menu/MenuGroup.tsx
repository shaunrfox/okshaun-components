import React from 'react';
import { Box, type BoxProps } from '../Box';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { useMenuContext } from './MenuContext';

export type MenuGroupProps = Omit<BoxProps, 'title'> & {
  /** Group label */
  label?: string;
  /** Children (MenuItem components) */
  children: React.ReactNode;
};

export const MenuGroup = (props: MenuGroupProps) => {
  const { label, children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const { classes } = useMenuContext();

  return (
    <Box
      role="group"
      aria-label={label}
      className={cx(classes.menuGroup, className)}
      {...otherProps}
    >
      {label && <Box className={classes.menuGroupLabel}>{label}</Box>}
      {children}
    </Box>
  );
};
