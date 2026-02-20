import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box/Box';
import { divider, type DividerVariantProps } from '@styled-system/recipes';

export type DividerProps = Omit<BoxProps, keyof DividerVariantProps> &
  DividerVariantProps;

export const Divider = (props: DividerProps) => {
  const { direction, weight, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  return (
    <Box
      as="div"
      className={cx(divider({ direction, weight }), className)}
      {...otherProps}
    />
  );
};
