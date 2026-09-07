import { cx } from '@styled-system/css';
import { type TagVariantProps, tag } from '@styled-system/recipes';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
import { Icon, type IconNamesList } from '../Icon';

/** Props accepted by {@link Tag}. */
export type TagProps = Omit<BoxProps, keyof TagVariantProps> &
  Omit<TagVariantProps, 'iconBefore' | 'iconAfter'> & {
    /** Visible tag label. */
    children: string;
    /** Decorative icon shown before the label. */
    iconBefore?: IconNamesList;
    /** Decorative icon shown after the label. */
    iconAfter?: IconNamesList;
  };

/**
 * Displays a compact, non-interactive category or status label.
 *
 * Use `Chip` when the item can be selected or dismissed. Icons are decorative,
 * so the text must communicate the tag's meaning.
 *
 * @example
 * ```tsx
 * <Tag hue="green">Approved</Tag>
 * ```
 */
export const Tag = (props: TagProps) => {
  const { variant, hue, iconBefore, iconAfter, children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);

  return (
    <Box
      {...dsComponent('Tag')}
      className={cx(
        tag({
          variant,
          hue,
          iconBefore: Boolean(iconBefore),
          iconAfter: Boolean(iconAfter),
        }),
        className,
      )}
      {...otherProps}
    >
      {iconBefore && (
        <Icon name={iconBefore} fill="current" color="inherit" size="20" />
      )}
      {children}
      {iconAfter && (
        <Icon name={iconAfter} fill="current" color="inherit" size="20" />
      )}
    </Box>
  );
};
