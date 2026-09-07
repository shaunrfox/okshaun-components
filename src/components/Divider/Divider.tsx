import { cx } from '@styled-system/css';
import { type DividerVariantProps, divider } from '@styled-system/recipes';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box/Box';

/** Props accepted by {@link Divider}. */
export type DividerProps = Omit<BoxProps, keyof DividerVariantProps> &
  DividerVariantProps & {
    direction?: string;
    weight?: string;
  };

/**
 * Draws a visual separator between adjacent regions.
 *
 * `Divider` is decorative and renders a `div`; use semantic sectioning and
 * headings when the separation must also be conveyed to assistive technology.
 *
 * @example
 * ```tsx
 * <Divider />
 * ```
 */
export const Divider = (props: DividerProps) => {
  const { direction, weight, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  return (
    <Box
      {...dsComponent('Divider')}
      as="div"
      className={cx(divider({ direction, weight }), className)}
      {...otherProps}
    />
  );
};
