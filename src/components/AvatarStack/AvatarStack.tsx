import type { ReactNode } from 'react';
import { Children, isValidElement, useMemo } from 'react';

import { Avatar, type AvatarSize } from '~/components/Avatar';
import { Box, type BoxProps } from '~/components/Box';
import {
  SlotContext,
  type SlotContextValue,
} from '~/system/context/SlotContext';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

/** Props accepted by {@link AvatarStack}. */
export type AvatarStackProps = BoxProps & {
  /** `Avatar` elements to show, in order. Later avatars sit on top of earlier ones. */
  children?: ReactNode;
  /** Size applied to every avatar that does not set its own `size`. */
  /** @default "md" */
  size?: AvatarSize;
  /**
   * Largest number of avatars to show. Any avatars after this number are
   * replaced by one "+N" overflow avatar. Leave unset to show all avatars.
   */
  max?: number;
};

/**
 * A row of overlapping avatars with an optional "+N" overflow avatar.
 *
 * Each avatar overlaps the previous one by 4px and gets a 2px ring in the
 * surface color, drawn inside its edge so initials stay readable. Use circle
 * or square avatars; the ring does not follow the hexagon shape.
 *
 * @example
 * ```tsx
 * <AvatarStack max={3} aria-label="Assigned to 5 people">
 *   <Avatar name="Ada Lovelace" />
 *   <Avatar name="Grace Hopper" />
 *   <Avatar name="Alan Turing" />
 *   <Avatar name="Katherine Johnson" />
 *   <Avatar name="Edsger Dijkstra" />
 * </AvatarStack>
 * ```
 */
export const AvatarStack = (props: AvatarStackProps) => {
  const { children, size = 'md', max, ref, ...rest } = props;
  const [className, otherProps] = splitProps(rest);

  const items = Children.toArray(children).filter(isValidElement);
  const visibleCount =
    max !== undefined && items.length > max ? Math.max(max, 0) : items.length;
  const overflowCount = items.length - visibleCount;

  const contextValue = useMemo<SlotContextValue>(
    () => ({ owner: 'AvatarStack', placement: 'before', size }),
    [size],
  );

  return (
    <Box
      {...dsComponent('AvatarStack')}
      as="span"
      ref={ref}
      display="inline-flex"
      alignItems="center"
      verticalAlign="middle"
      className={className}
      {...otherProps}
    >
      <SlotContext.Provider value={contextValue}>
        {items.slice(0, visibleCount)}
        {overflowCount > 0 && <Avatar fallback={`+${overflowCount}`} />}
      </SlotContext.Provider>
    </Box>
  );
};
