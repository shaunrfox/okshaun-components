import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
import { useMenuContext } from './MenuContext';

export type MenuDividerProps = Omit<BoxProps, 'children'>;

export const MenuDivider = (props: MenuDividerProps) => {
  const [className, otherProps] = splitProps(props);
  const { classes } = useMenuContext();

  return (
    <Box
      role="separator"
      className={cx(classes.menuDivider, className)}
      {...otherProps}
    />
  );
};
