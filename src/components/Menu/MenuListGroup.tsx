import { Box } from '../Box';
import { cx } from '@styled-system/css';
import { menu as menuRecipe } from '@styled-system/recipes';
import { splitProps } from '~/utils/splitProps';
import type { MenuListGroupProps } from './MenuList';

export const MenuListGroup = (props: MenuListGroupProps) => {
  const { label, packing, indicatorPosition, children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = menuRecipe({ packing, indicatorPosition });

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
