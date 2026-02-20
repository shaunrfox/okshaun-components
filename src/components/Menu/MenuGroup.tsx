import { cx } from '@styled-system/css';
import type React from 'react';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
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
      // biome-ignore lint/a11y/useSemanticElements: role="group" is correct ARIA for menu groups — <fieldset> is for form controls
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
