import { cx } from '@styled-system/css';
import {
  type BreadcrumbsVariantProps,
  breadcrumbs,
} from '@styled-system/recipes';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';
import type { BoxProps } from '../Box';
import { Link } from '../Link';
import { Text } from '../Text';

/** Props for {@link Breadcrumbs}. */
export type BreadcrumbsProps = Omit<BoxProps, keyof BreadcrumbsVariantProps> &
  BreadcrumbsVariantProps & {
    /**
     * Ordered path segments. A segment with `href` renders as a link; a segment
     * without it renders as plain text, which is normally the current page.
     * Keep the final segment non-linked when it represents the current page.
     */
    items: { id: string; label: string; href?: string }[];
  };

/**
 * Displays the current navigation path as a semantic unordered list.
 *
 * Linked segments use {@link Link}; segments without `href` are rendered as
 * plain text. Use page navigation instead when the hierarchy is not a path to
 * the current location.
 *
 * @example
 * ```tsx
 * <Breadcrumbs
 *   items={[
 *     { id: 'home', label: 'Home', href: '/' },
 *     { id: 'invoices', label: 'Invoices' },
 *   ]}
 * />
 * ```
 */
export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { items, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = breadcrumbs();

  return (
    <Text
      {...dsComponent('Breadcrumbs')}
      as="ul"
      className={cx(classes.wrapper, className)}
      {...otherProps}
    >
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
