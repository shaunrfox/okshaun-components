import { cx } from '@styled-system/css';
import {
  type BreadcrumbsVariantProps,
  breadcrumbs,
} from '@styled-system/recipes';

import { splitProps } from '~/utils/splitProps';

import type { BoxProps } from '../Box';
import { Link } from '../Link';
import { Text } from '../Text';

export type BreadcrumbsProps = Omit<BoxProps, keyof BreadcrumbsVariantProps> &
  BreadcrumbsVariantProps & {
    items: { id: string; label: string; href?: string }[];
  };

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { items, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = breadcrumbs();

  return (
    <Text as="ul" className={cx(classes.wrapper, className)} {...otherProps}>
      {items?.map((item, index) => (
        <Text as="li" key={item.id}>
          {item.href ? (
            <Link href={item.href} className={classes.linkSegment}>
              {item.label}
            </Link>
          ) : (
            <Text className={classes.currentSegment}>{item.label}</Text>
          )}
          {index < items?.length - 1 && (
            <Text className={classes.slash}>/</Text>
          )}
        </Text>
      ))}
    </Text>
  );
};
