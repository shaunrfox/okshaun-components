import { Box, type BoxProps } from '../Box/Box';
import { spinner, type SpinnerVariantProps } from '@styled-system/recipes';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';

export type SpinnerProps = Omit<BoxProps, keyof SpinnerVariantProps> &
  SpinnerVariantProps & {
    inverse?: boolean;
  };

export const Spinner: React.FC<SpinnerProps> = ({
  size,
  inverse,
  ...props
}: SpinnerProps) => {
  const [className, otherProps] = splitProps(props);
  return (
    <Box
      as="div"
      className={cx(spinner({ size, inverse }), className as string)}
      {...otherProps}
    />
  );
};
