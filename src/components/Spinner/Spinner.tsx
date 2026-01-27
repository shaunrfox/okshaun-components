import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box/Box';
import { spinner, type SpinnerVariantProps } from '@styled-system/recipes';

export type SpinnerProps = Omit<BoxProps, keyof SpinnerVariantProps> &
  SpinnerVariantProps & {
    inverse?: boolean;
  };

export const Spinner = (props: SpinnerProps) => {
  const { size, inverse, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  return (
    <Box
      as="div"
      className={cx(spinner({ size, inverse }), className as string)}
      {...otherProps}
    />
  );
};
