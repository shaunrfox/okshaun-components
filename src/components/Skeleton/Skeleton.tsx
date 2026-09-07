import { cx } from '@styled-system/css';
import { skeleton } from '@styled-system/recipes';
import type { ElementType, ReactNode } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

export type SkeletonProps = Omit<BoxProps, 'as'> & {
  variant?: 'text' | 'circular' | 'rounded' | 'rectangular';
  animation?: 'pulse' | 'wave' | false;
  component?: ElementType;
  children?: ReactNode;
};

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
