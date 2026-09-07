import { cx } from '@styled-system/css';
import { type HeadingVariantProps, heading } from '@styled-system/recipes';
import type { ReactNode } from 'react';

import { Text, type TextProps } from '~/components/Text';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

/** Props accepted by {@link Heading}. */
export type HeadingProps = Omit<TextProps, keyof HeadingVariantProps> &
  HeadingVariantProps & {
    /** Heading content. */
    children?: string | ReactNode;
    /** @default "h2" */
    level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  };

/**
 * Renders a semantic document heading with the matching typography.
 *
 * Choose `level` from the page outline rather than for visual size alone.
 *
 * @example
 * ```tsx
 * <Heading level="h2">Shipping details</Heading>
 * ```
 */
export const Heading = (props: HeadingProps) => {
  const { level = 'h2', allCaps, children, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  return (
    <Text
      {...dsComponent('Heading')}
      as={level}
      className={cx(heading({ level, allCaps }), className)}
      {...otherProps}
    >
      {children}
    </Text>
  );
};
