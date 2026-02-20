import { useRef, useState, useEffect } from 'react';
import { cx, css } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '~/components/Box';
import { badge, type BadgeVariantProps } from '@styled-system/recipes';

export type BadgeVariant =
  | 'neutral'
  | 'inverted'
  | 'subtle'
  | 'subtle-inverted'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

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
    children?: React.ReactNode;
  };

// Animation styles
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
  const {
    count,
    showZero = false,
    overflowCount = 99,
    variant = 'danger',
    size = 'md',
    children,
    ref,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  // Track count changes for animation
  const prevCountRef = useRef<number | undefined>(count);
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation when count changes
  useEffect(() => {
    if (count !== undefined && prevCountRef.current !== count) {
      // Only animate if count actually changed (not on initial render)
      if (prevCountRef.current !== undefined) {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 200);
        return () => clearTimeout(timer);
      }
    }
    prevCountRef.current = count;
  }, [count]);

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
  const animationClass = isAnimating
    ? isStandalone
      ? animationStyles.popStandalone
      : animationStyles.pop
    : '';

  // If not visible, don't render the indicator (but still render children wrapper if needed)
  if (!isVisible && !children) {
    return null;
  }

  const indicator = isVisible ? (
    <Box as="span" className={cx(classes.indicator, animationClass)}>
      {displayCount}
    </Box>
  ) : null;

  // Standalone mode: just return the indicator
  if (isStandalone) {
    return (
      <Box as="span" ref={ref} className={cx(classes.root, className)} {...otherProps}>
        {indicator}
      </Box>
    );
  }

  // Wrapper mode: wrap children with positioned indicator
  return (
    <Box as="span" ref={ref} className={cx(classes.root, className)} {...otherProps}>
      {children}
      {indicator}
    </Box>
  );
};
