import * as React from 'react';
import { cx, css } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { type BoxProps } from '~/components/Box';
import { badge, type BadgeVariantProps } from '@styled-system/recipes';

export type BadgeAppearance =
  | 'neutral'
  | 'inverted'
  | 'subtle'
  | 'subtle-inverted'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

export type BadgeProps = BoxProps &
  Omit<BadgeVariantProps, 'standalone' | 'dot'> & {
    /** Number to show in badge. If provided, switches to count mode. */
    count?: number;
    /** Show badge when count is zero. Default: false */
    showZero?: boolean;
    /** Max count to show. Displays "99+" when exceeded. Default: 99 */
    overflowCount?: number;
    /** Color scheme of the badge. Default: 'danger' */
    appearance?: BadgeAppearance;
    /** Additional class name */
    className?: string;
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
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      count,
      showZero = false,
      overflowCount = 99,
      appearance = 'danger',
      size = 'md',
      children,
      ...props
    },
    ref,
  ) => {
    const [className, otherProps] = splitProps(props);
    // Track count changes for animation
    const prevCountRef = React.useRef<number | undefined>(count);
    const [isAnimating, setIsAnimating] = React.useState(false);

    // Trigger animation when count changes
    React.useEffect(() => {
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
      appearance,
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
      <span className={cx(classes.indicator, animationClass)}>
        {displayCount}
      </span>
    ) : null;

    // Standalone mode: just return the indicator
    if (isStandalone) {
      return (
        <span ref={ref} className={cx(classes.root, className)} {...otherProps}>
          {indicator}
        </span>
      );
    }

    // Wrapper mode: wrap children with positioned indicator
    return (
      <span ref={ref} className={cx(classes.root, className)} {...otherProps}>
        {children}
        {indicator}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
