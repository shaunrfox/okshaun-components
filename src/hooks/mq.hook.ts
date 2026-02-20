import { useMemo, useSyncExternalStore } from 'react';
import { breakpoints } from '~/styles/utilities';

type BreakpointKey = keyof typeof breakpoints;
type QueryDirection = 'min' | 'max';

/**
 * Token-aware media query hook for conditional rendering based on breakpoints.
 *
 * @example
 * // Mobile-first: matches when viewport is >= md (768px)
 * const isDesktop = useMediaQuery('md');
 *
 * @example
 * // Max-width: matches when viewport is < lg (1024px)
 * const isMobile = useMediaQuery('lg', 'max');
 *
 * @example
 * // In JSX
 * {isDesktop && <DesktopOnlyComponent />}
 */
export default function useMediaQuery(
  breakpoint: BreakpointKey,
  direction: QueryDirection = 'min',
): boolean {
  // Memoize the query string based on breakpoint and direction
  const query = useMemo(() => {
    const breakpointValue = breakpoints[breakpoint];
    const breakpointNum = Number.parseInt(breakpointValue, 10);

    return direction === 'min'
      ? `(min-width: ${breakpointValue})`
      : `(max-width: ${breakpointNum - 1}px)`;
  }, [breakpoint, direction]);

  // Memoize the MediaQueryList object
  const mediaQuery = useMemo(() => {
    if (typeof window === 'undefined') {
      // SSR fallback - return a mock that always returns false
      return {
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
      } as unknown as MediaQueryList;
    }
    return window.matchMedia(query);
  }, [query]);

  return useSyncExternalStore(
    (callback) => {
      mediaQuery.addEventListener('change', callback);
      return () => {
        mediaQuery.removeEventListener('change', callback);
      };
    },
    () => mediaQuery.matches,
    // SSR fallback - return false on server
    () => false,
  );
}
