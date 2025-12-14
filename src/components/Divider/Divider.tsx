import { Box, type BoxProps } from '../Box/Box';
import { divider, type DividerVariantProps } from '@styled-system/recipes';

import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';

export type DividerProps = BoxProps &
  DividerVariantProps & {
    direction?: string;
    weight?: string;
  };

export const Divider: React.FC<DividerProps> = ({
  direction,
  weight,
  ...props
}: DividerProps) => {
  const [className, otherProps] = splitProps(props);
  return (
    <Box
      as="div"
      className={cx(divider({ direction, weight }), className)}
      {...otherProps}
    />
  );
};
