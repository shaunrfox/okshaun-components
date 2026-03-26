import { cx } from '@styled-system/css';
import {
  type ListItemGroupVariantProps,
  listItemGroup,
} from '@styled-system/recipes';

import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';
import { Divider } from '../Divider';
import { Text } from '../Text';

import { useListContext } from './listContext';

export type ListItemGroupProps = Omit<
  BoxProps,
  keyof ListItemGroupVariantProps | 'children'
> &
  ListItemGroupVariantProps & {
    label?: string;
    children: BoxProps['children'];
    divider?: boolean;
  };

export const ListItemGroup = (props: ListItemGroupProps) => {
  const { label, children, divider, density, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const listContext = useListContext();

  const classes = listItemGroup({
    density: density ?? listContext.density,
  });

  return (
    <Box className={cx(classes.wrapper, className)} {...otherProps}>
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
