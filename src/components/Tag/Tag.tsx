import { cx } from '@styled-system/css';
import { type TagVariantProps, tag } from '@styled-system/recipes';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
import { Icon, type IconNamesList, type IconProps } from '../Icon';

/** Props accepted by {@link Tag}. */
export type TagProps = Omit<BoxProps, keyof TagVariantProps> &
  Omit<TagVariantProps, 'iconBefore' | 'iconAfter' | 'size'> & {
    /** Visible tag label. */
    children: string;
    /** Decorative icon shown before the label. */
    iconBefore?: IconNamesList;
    /** Decorative icon shown after the label. */
    iconAfter?: IconNamesList;
    /** Height and text size. Use `sm` in dense rows such as table cells. */
    /** @default "md" */
    size?: TagVariantProps['size'];
  };

/**
 * Fills in `md` below the first breakpoint. Panda replaces the recipe default
 * with a conditional value, so `{ md: 'sm' }` or `[null, 'sm']` would leave
 * small screens with no size. The Tag and its icons share the result, and
 * icon sizes share the Tag size names: `sm` is 16 and `md` is 20.
 */
const normalizeSize = (size: TagProps['size']): TagProps['size'] => {
  if (size == null) return 'md';
  if (Array.isArray(size)) {
    return size[0] == null ? ['md', ...size.slice(1)] : size;
  }
  if (typeof size === 'object') {
    return size.base == null ? { ...size, base: 'md' } : size;
  }
  return size;
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
  const { variant, hue, size, iconBefore, iconAfter, children, ...rest } =
    props;
  const tagSize = normalizeSize(size);
  const iconSize = tagSize as IconProps['size'];
  const [className, otherProps] = splitProps(rest);

  return (
    <Box
      {...dsComponent('Tag')}
      className={cx(
        tag({
          size: tagSize,
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
        <Icon
          name={iconBefore}
          fill="current"
          color="inherit"
          size={iconSize}
        />
      )}
      {children}
      {iconAfter && (
        <Icon name={iconAfter} fill="current" color="inherit" size={iconSize} />
      )}
    </Box>
  );
};
