import { cx } from '@styled-system/css';
import { type SpinnerVariantProps, spinner } from '@styled-system/recipes';

import { Icon } from '~/components/Icon';
import { useSlotContext } from '~/system/context/SlotContext';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box/Box';

export type SpinnerProps = Omit<BoxProps, keyof SpinnerVariantProps> &
  SpinnerVariantProps & {
    inverse?: boolean;
    centered?: boolean;
  };

export const Spinner = (props: SpinnerProps) => {
  const slotContext = useSlotContext();
  const { size: sizeProp, inverse, centered, ...rest } = props;
  const size =
    sizeProp ?? (slotContext?.size as SpinnerProps['size'] | undefined);
  const [className, otherProps] = splitProps(rest);
  const classes = spinner({
    size,
    inverse,
    centered,
  });

  return (
    <Box
      {...dsComponent('Spinner')}
      className={cx(classes.container, className)}
      {...otherProps}
    >
      <Icon
        name="spinner"
        className={classes.spinnerSvg}
        data-inverse={inverse ? 'true' : undefined}
      />
    </Box>
  );
};
