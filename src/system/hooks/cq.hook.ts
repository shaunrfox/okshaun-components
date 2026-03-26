import { type RefObject, useMemo, useSyncExternalStore } from 'react';

import { containerSizes } from '~/styles/utilities';

type ContainerSizeKey = keyof typeof containerSizes;
type QueryDirection = 'min' | 'max';

export function useContainerQuery(
  containerRef: RefObject<HTMLElement>,
  size: ContainerSizeKey,
  direction: QueryDirection = 'min',
): boolean {
  const query = useMemo(() => {
    const sizeValue = containerSizes[size];
    const sizeNum = Number.parseFloat(sizeValue);

    return direction === 'min'
      ? `(min-width: ${sizeValue})`
      : `(max-width: ${sizeNum - 0.0625}rem)`;
  }, [size, direction]);

  return useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined' || !containerRef.current) {
        return () => {};
      }

      const element = containerRef.current;
      const sizeValue = containerSizes[size];
      const sizeNum = Number.parseFloat(sizeValue);
      const threshold = direction === 'min' ? sizeNum : sizeNum - 0.0625;

      const checkSize = () => {
        if (!element) return false;
        const width = element.offsetWidth;
        const widthInRem =
          width /
          Number.parseFloat(
            getComputedStyle(document.documentElement).fontSize,
          );
        return direction === 'min'
          ? widthInRem >= threshold
          : widthInRem < threshold;
      };

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
      const sizeNum = Number.parseFloat(sizeValue);
      const threshold = direction === 'min' ? sizeNum : sizeNum - 0.0625;

      if ('queryContainer' in element) {
        try {
          // @ts-expect-error - Container Query API is not fully typed yet
          const containerQuery = element.queryContainer(query);
          return containerQuery.matches;
        } catch {
          // Fall through to ResizeObserver fallback
        }
      }

      const width = element.offsetWidth;
      const widthInRem =
        width /
        Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
      return direction === 'min'
        ? widthInRem >= threshold
        : widthInRem < threshold;
    },
    () => false,
  );
}
