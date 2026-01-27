import { useMemo, useSyncExternalStore, RefObject } from 'react';
import { containerSizes } from '~/styles/utilities';

type ContainerSizeKey = keyof typeof containerSizes;
type QueryDirection = 'min' | 'max';

/**
 * Token-aware container query hook for conditional rendering based on container sizes.
 * Requires a ref to the container element and the container must have container-type set.
 *
 * @example
 * // Component with container query
 * function MyComponent() {
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   const isLarge = useContainerQuery(containerRef, 'lg');
 *
 *   return (
 *     <div ref={containerRef} style={{ containerType: 'inline-size' }}>
 *       {isLarge && <LargeLayout />}
 *       {!isLarge && <SmallLayout />}
 *     </div>
 *   );
 * }
 *
 * @example
 * // Max-width: matches when container is < xl size
 * const isSmall = useContainerQuery(containerRef, 'xl', 'max');
 */
export default function useContainerQuery(
  containerRef: RefObject<HTMLElement>,
  size: ContainerSizeKey,
  direction: QueryDirection = 'min',
): boolean {
  // Memoize the query string based on size and direction
  const query = useMemo(() => {
    const sizeValue = containerSizes[size];
    const sizeNum = parseFloat(sizeValue);

    return direction === 'min'
      ? `(min-width: ${sizeValue})`
      : `(max-width: ${sizeNum - 0.0625}rem)`; // Subtract 1px equivalent
  }, [size, direction]);

  // Create container query using useSyncExternalStore directly
  // This handles ref.current changes and element mounting/unmounting
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined' || !containerRef.current) {
        return () => {};
      }

      const element = containerRef.current;
      const sizeValue = containerSizes[size];
      const sizeNum = parseFloat(sizeValue);
      const threshold = direction === 'min' ? sizeNum : sizeNum - 0.0625;

      const checkSize = () => {
        if (!element) return false;
        const width = element.offsetWidth;
        const widthInRem =
          width /
          parseFloat(getComputedStyle(document.documentElement).fontSize);
        return direction === 'min'
          ? widthInRem >= threshold
          : widthInRem < threshold;
      };

      // Check if Container Query API is available
      if ('queryContainer' in element) {
        try {
          // @ts-expect-error - Container Query API is not fully typed yet
          const containerQuery = element.queryContainer(query);

          containerQuery.addEventListener('change', callback);
          return () => {
            containerQuery.removeEventListener('change', callback);
          };
        } catch {
          // Fall through to ResizeObserver fallback
        }
      }

      // Fallback: Use ResizeObserver to simulate container queries
      let currentMatches = checkSize();
      const callbacks = new Set<() => void>();
      let observer: ResizeObserver | null = null;

      if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(() => {
          const newMatches = checkSize();
          if (newMatches !== currentMatches) {
            currentMatches = newMatches;
            callbacks.forEach((cb) => cb());
          }
        });
        observer.observe(element);
      }

      callbacks.add(callback);

      return () => {
        callbacks.delete(callback);
        if (callbacks.size === 0 && observer) {
          observer.disconnect();
        }
      };
    },
    () => {
      if (typeof window === 'undefined' || !containerRef.current) {
        return false;
      }

      const element = containerRef.current;
      const sizeValue = containerSizes[size];
      const sizeNum = parseFloat(sizeValue);
      const threshold = direction === 'min' ? sizeNum : sizeNum - 0.0625;

      // Check if Container Query API is available
      if ('queryContainer' in element) {
        try {
          // @ts-expect-error - Container Query API is not fully typed yet
          const containerQuery = element.queryContainer(query);
          return containerQuery.matches;
        } catch {
          // Fall through to ResizeObserver fallback
        }
      }

      // Fallback: Calculate current size
      const width = element.offsetWidth;
      const widthInRem =
        width / parseFloat(getComputedStyle(document.documentElement).fontSize);
      return direction === 'min'
        ? widthInRem >= threshold
        : widthInRem < threshold;
    },
    // SSR fallback - return false on server
    () => false,
  );
}
