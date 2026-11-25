import { useLayoutEffect, useState } from 'react';

/**
 * Floating UI `safePolygon({ blockPointerEvents: true })` sets
 * `document.body.style.pointerEvents = 'none'` while a hover-opened menu is
 * open so the cursor can follow the safe polygon without hitting other UI
 * (floating-ui#1722). That global block breaks taps on nested flyouts on
 * touch / coarse-pointer devices.
 *
 * Enable blocking only when there is no coarse pointer (mouse / trackpad
 * primary). Keyboard navigation is unaffected.
 *
 * @see https://floating-ui.com/docs/useHover#safepolygon
 */
export function useBlockPointerEventsForHoverPolygon(): boolean {
  const [block, setBlock] = useState(false);
  useLayoutEffect(() => {
    const mq = window.matchMedia('(any-pointer: coarse)');
    const apply = () => {
      setBlock(!mq.matches);
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);
  return block;
}
