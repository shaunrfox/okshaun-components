import { css, cx } from '@styled-system/css';
import { type BadgeVariantProps, badge } from '@styled-system/recipes';
import type { ReactNode } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { useSlotContext } from '~/system/context/SlotContext';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

/** Supported visual color treatments for {@link Badge}. */
export type BadgeVariant =
  | 'neutral'
  | 'subtle'
  | 'bold'
  | 'inverse'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

/** Props accepted by {@link Badge}. */
export type BadgeProps = Omit<BoxProps, keyof BadgeVariantProps> &
  Omit<BadgeVariantProps, 'standalone' | 'dot'> & {
    /** Number to show in badge. If provided, switches to count mode. */
    count?: number;
    /** Show badge when count is zero. Default: false */
    showZero?: boolean;
    /** Max count to show. Displays "99+" when exceeded. Default: 99 */
    overflowCount?: number;
    /** Color scheme of the badge. Default: 'danger' */
    variant?: BadgeVariant;
    /** Content to wrap with the badge */
    children?: ReactNode;
  };

// Animation styles
const animationStyles = {
  pop: css({
    animationName: 'badgePop',
    animationDuration: 'normal',
    animationTimingFunction: 'default',
  }),
  popStandalone: css({
    animationName: 'badgePopStandalone',
    animationDuration: 'normal',
    animationTimingFunction: 'default',
  }),
};

/**
 * Badge component for displaying notification counts or status indicators.
 *
 * - Without children: renders as standalone badge
 * - With children: wraps content and positions badge at top-right
 * - Without count prop: shows as dot
 * - With count prop: shows the number (or "99+" if exceeds overflowCount)
 */
export const Badge = (props: BadgeProps) => {
  const slotContext = useSlotContext();
  const {
    count,
    showZero = false,
    overflowCount = 99,
    variant = 'danger',
    size: sizeProp,
    children,
    ref,
    ...rest
  } = props;
  const size =
    sizeProp ?? (slotContext?.size as BadgeProps['size'] | undefined);
  const [className, otherProps] = splitProps(rest);
  // Determine if we're in count mode or dot mode
  const isCountMode = count !== undefined;
  const isDotMode = !isCountMode;

  // Determine if badge should be visible
  const isVisible = isDotMode || count !== 0 || showZero;

  // Calculate display text for count mode
  const displayCount =
    isCountMode && count !== undefined
      ? count > overflowCount
        ? `${overflowCount}+`
        : count
      : null;

  // Determine if standalone (no children)
  const isStandalone = !children;

  // Get recipe classes
  const classes = badge({
    size,
    standalone: isStandalone,
    dot: isDotMode,
    variant,
  });

  // Animation class based on position mode
  const animationClass = isCountMode
    ? isStandalone
      ? animationStyles.popStandalone
      : animationStyles.pop
    : '';

  // If not visible, don't render the indicator (but still render children wrapper if needed)
  if (!isVisible && !children) {
    return null;
  }

  const indicator = isVisible ? (
    <Box
      as="span"
      key={isCountMode ? `count-${String(displayCount)}` : 'dot'}
      className={cx(classes.indicator, animationClass)}
    >
      {displayCount}
    </Box>
  ) : null;

  // Standalone mode: just return the indicator
  if (isStandalone) {
    return (
      <Box
        {...dsComponent('Badge')}
        as="span"
        ref={ref}
        className={cx(classes.root, className)}
        {...otherProps}
      >
        {indicator}
      </Box>
    );
  }

  // Wrapper mode: wrap children with positioned indicator
  return (
    <Box
      as="span"
      ref={ref}
      className={cx(classes.root, className)}
      {...otherProps}
    >
      {children}
      {indicator}
    </Box>
  );
};
