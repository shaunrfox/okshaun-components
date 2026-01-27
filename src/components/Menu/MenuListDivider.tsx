import { Box } from '../Box';
import { cx } from '@styled-system/css';
import { menu as menuRecipe } from '@styled-system/recipes';
import { splitProps } from '~/utils/splitProps';
import type { MenuListDividerProps } from './MenuList';

export const MenuListDivider = (props: MenuListDividerProps) => {
  const { packing, indicatorPosition, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = menuRecipe({ packing, indicatorPosition });

  return (
    <Box
      role="separator"
      className={cx(classes.menuDivider, className)}
      {...otherProps}
    />
  );
};
