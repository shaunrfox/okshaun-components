import { cx } from '@styled-system/css';
import { skeleton } from '@styled-system/recipes';
import type { ElementType, ReactNode } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

/** Props accepted by {@link Skeleton}. */
export type SkeletonProps = Omit<BoxProps, 'as'> & {
  variant?: 'text' | 'circular' | 'rounded' | 'rectangular';
  animation?: 'pulse' | 'wave' | false;
  /** @default "span" */
  component?: ElementType;
  /** Content whose dimensions the skeleton should match. */
  children?: ReactNode;
};

/**
 * Reserves the shape of content while that content is loading.
 *
 * `Skeleton` is visual only and does not announce loading. Put it in a region
 * with an appropriate accessible loading state when users need that feedback.
 *
 * @example
 * ```tsx
 * <Skeleton width="full" height="40" aria-hidden />
 * ```
 */
export const Skeleton = (props: SkeletonProps) => {
  const {
    variant = 'text',
    animation = 'pulse',
    component = 'span',
    children,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = skeleton({
    variant,
    animation: animation === false ? 'false' : animation,
  });

  return (
    <Box
      {...dsComponent('Skeleton')}
      as={component}
      className={cx(classes, className)}
      aria-hidden="true"
      {...otherProps}
    >
      {children && (
        <Box as="span" aria-hidden="true" visibility="hidden">
          {children}
        </Box>
      )}
    </Box>
  );
};
