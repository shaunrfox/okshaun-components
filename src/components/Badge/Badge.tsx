import * as React from 'react';
import { cx } from '@styled-system/css';
import { Box } from '~/components/Box';
import { badge, type BadgeVariantProps } from '@styled-system/recipes';

/**
 * BadgeProps is generic and manages its own polymorphism.
 * It includes props for the element type E (default "span") and BadgeVariantProps.
 */
export type BadgeProps<E extends React.ElementType = 'span'> =
  React.ComponentPropsWithoutRef<E> &
  BadgeVariantProps & {
    as?: E;
    className?: string;
    children?: React.ReactNode;
  };

/**
 * Define a polymorphic BadgeComponent type.
 */
type BadgeComponent = <E extends React.ElementType = 'span'>(
  props: BadgeProps<E> & { ref?: React.ForwardedRef<Element> },
) => React.ReactElement;

/**
 * The Badge component uses the polymorphic Box as its base.
 * Renders as a <span> by default but can be changed via the 'as' prop.
 */
export const Badge = React.forwardRef(
  <E extends React.ElementType = 'span'>(
    { variant, size, className, children, ...props }: BadgeProps<E>,
    ref: React.ForwardedRef<Element>,
  ) => {
    return (
      <Box
        as={'span' as E}
        ref={ref as React.ForwardedRef<any>}
        className={cx(badge({ variant, size }), className)}
        {...props}
      >
        {children}
      </Box>
    );
  },
) as BadgeComponent;
