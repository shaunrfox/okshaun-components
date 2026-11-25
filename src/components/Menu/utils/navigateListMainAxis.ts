import type { RefObject } from 'react';

/**
 * First traversable index in a FloatingList `elementsRef` (skips disabled items).
 */
export function findFirstEnabledListIndex(
  listRef: RefObject<Array<HTMLElement | null>>,
): number | null {
  const items = listRef.current;
  if (!items?.length) {
    return null;
  }

  for (let i = 0; i < items.length; i++) {
    const el = items[i];
    if (!el) {
      continue;
    }
    if (
      el.hasAttribute('disabled') ||
      el.getAttribute('aria-disabled') === 'true'
    ) {
      continue;
    }
    return i;
  }

  return null;
}

/**
 * Next enabled index along the main axis with wrap (matches Menu useListNavigation loop).
 */
export function navigateListMainAxisLoop(
  listRef: RefObject<Array<HTMLElement | null>>,
  direction: 1 | -1,
  previousIndex: number | null,
): number | null {
  const items = listRef.current;
  const len = items.length;
  if (len === 0) {
    return previousIndex ?? null;
  }

  const isDisabled = (index: number) => {
    const el = items[index];
    if (!el) {
      return true;
    }
    return (
      el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true'
    );
  };

  let current = previousIndex ?? 0;
  for (let step = 0; step < len; step++) {
    current = (current + direction + len) % len;
    if (!isDisabled(current)) {
      return current;
    }
  }

  return previousIndex ?? null;
}
