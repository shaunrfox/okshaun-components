import { cx } from '@styled-system/css';
import {
  type ListItemGroupVariantProps,
  listItemGroup,
} from '@styled-system/recipes';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
import { Divider } from '../Divider';
import { Text } from '../Text';
import { useListContext } from './listContext';

/** Props for {@link ListItemGroup}. */
export type ListItemGroupProps = Omit<
  BoxProps,
  keyof ListItemGroupVariantProps | 'children'
> &
  ListItemGroupVariantProps & {
    /** Optional heading displayed above the group's children. */
    label?: string;
    /** Items or other content belonging to this group. */
    children: BoxProps['children'];
    /** Displays a separator after the group. */
    divider?: boolean;
  };

/**
 * Groups related list items under an optional label and can add a trailing
 * separator.
 *
 * The group inherits search settings from its parent list and provides its
 * resolved density to descendants. Use {@link List} as the parent when items
 * should share list semantics and configuration.
 *
 * @example
 * ```tsx
 * <ListItemGroup label="Account">
 *   <ListItem label="Profile" />
 * </ListItemGroup>
 * ```
 */
export const ListItemGroup = (props: ListItemGroupProps) => {
  const { label, children, divider, density, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const listContext = useListContext();

  const classes = listItemGroup({
    density: density ?? listContext.density,
  });

  return (
    <Box
      {...dsComponent('ListItemGroup')}
      className={cx(classes.wrapper, className)}
      {...otherProps}
    >
      {label && (
        <Text as="div" className={classes.groupLabel}>
          {label}
        </Text>
      )}

      <Box w="full">{children}</Box>

      {divider && <Divider role="separator" className={classes.divider} />}
    </Box>
  );
};
