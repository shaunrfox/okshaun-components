import { cx } from '@styled-system/css';
import { type IconVariantProps, icon } from '@styled-system/recipes';
import type { ColorToken } from '@styled-system/tokens';

import { Box, type BoxProps } from '~/components/Box';
import type { numericSizes } from '~/styles/primitives';
import { useSlotContext } from '~/system/context/SlotContext';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';
import { useIconConfig } from './IconContext';
import type { IconNamesList } from './icons';

/*
 * Using the size prop in this way cannot handle non-numeric sizes,
 * so importing this list of keys directly from the tokens to ensure
 * that only valid sizes are allowed.
 */
export type AllowedIconSizes = keyof typeof numericSizes;

type IconOwnProps = {
  name: IconNamesList;
  /**
   * Icon size recipe variant. Responsive/conditional values are supported.
   * An explicit value takes precedence over slot context.
   */
  size?: IconVariantProps['size'];
  /**
   * Design-token fill color. An explicit value takes precedence over slot
   * context; otherwise the recipe uses the decorative icon color.
   */
  fill?: ColorToken;
};

// Size is applied through the recipe variant, never through Box `width`.
// Assigning a conditional size value to Box's `width` prop made tsc run for
// over 30 minutes; the recipe variant compiles to static classes instead.
export type IconProps = Omit<
  BoxProps,
  IconNamesList | keyof IconVariantProps | keyof IconOwnProps
> &
  Omit<IconVariantProps, keyof IconOwnProps> &
  IconOwnProps;

export const Icon = (props: IconProps) => {
  const slotContext = useSlotContext();
  const { name, size: sizeProp, fill: fillProp, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const { spritePath } = useIconConfig();
  const spriteHref = `${spritePath}#${name}`;
  const slotSize = slotContext?.size as IconProps['size'] | undefined;
  const slotFill = slotContext?.fill as IconProps['fill'] | undefined;
  const size = sizeProp ?? slotSize;
  const fill = fillProp ?? slotFill;

  return (
    <Box
      {...dsComponent('Icon')}
      as="svg"
      name={name}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      className={cx(icon({ size }), className)}
      {...otherProps}
    >
      <use xlinkHref={spriteHref} />
    </Box>
  );
};
