import { useMemo, useSyncExternalStore } from 'react';

import { breakpoints } from '~/styles/utilities';

type BreakpointKey = keyof typeof breakpoints;
type QueryDirection = 'min' | 'max';

export function useMediaQuery(
  breakpoint: BreakpointKey,
  direction: QueryDirection = 'min',
): boolean {
  const query = useMemo(() => {
    const breakpointValue = breakpoints[breakpoint];
    const breakpointNum = Number.parseInt(breakpointValue, 10);

    return direction === 'min'
      ? `(min-width: ${breakpointValue})`
      : `(max-width: ${breakpointNum - 1}px)`;
  }, [breakpoint, direction]);

  const mediaQuery = useMemo(() => {
    if (typeof window === 'undefined') {
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
    () => false,
  );
}
