import { cx } from '@styled-system/css';
import type { BreadcrumbsVariantProps } from '@styled-system/recipes';
import { breadcrumbs } from '@styled-system/recipes';
import type { MouseEvent } from 'react';

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
    items: BreadcrumbItem[];
  };

/** One segment of a {@link Breadcrumbs} path. */
export type BreadcrumbItem = {
  /** Stable key for the segment. */
  id: string;
  /** Visible segment text. */
  label: string;
  /** Destination of a linked segment. Omit it for the current page. */
  href?: string;
  /**
   * Called when a linked segment is clicked. Call `event.preventDefault()` to
   * handle the navigation in the app, such as a client-side route change or
   * closing a panel, instead of following `href`. A segment without `href`
   * is plain text and ignores this handler.
   */
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

/**
 * Displays the current navigation path as a semantic unordered list.
 *
 * Linked segments use {@link Link}; segments without `href` are rendered as
 * plain text. Give a linked segment `onClick` when the app handles the
 * navigation itself. Use page navigation instead when the hierarchy is not a path to
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
            <Link
              href={item.href}
              onClick={item.onClick}
              className={classes.linkSegment}
            >
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
