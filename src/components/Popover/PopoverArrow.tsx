import { FloatingArrow } from '@floating-ui/react';

import { token } from '@styled-system/tokens';

import { usePopoverContext } from './PopoverContext';

/** Props for {@link PopoverArrow}. Prefer `showArrow` on the root in most cases. */
export type PopoverArrowProps = {
  /** Override fill color token variable. */
  fill?: string;
  /** Override stroke color token variable. */
  stroke?: string;
};

/**
 * Optional explicit arrow. Content already renders an arrow when
 * `showArrow` is true on the root; use this only when customizing fill/stroke
 * and setting `showArrow={false}` on the root.
 *
 * @example
 * ```tsx
 * <Popover showArrow={false}>
 *   <PopoverContent>
 *     <PopoverBody>…</PopoverBody>
 *     <PopoverArrow />
 *   </PopoverContent>
 * </Popover>
 * ```
 */
export const PopoverArrow = (props: PopoverArrowProps) => {
  const { fill, stroke } = props;
  const { floatingContext, arrowRef } = usePopoverContext();

  return (
    <FloatingArrow
      ref={arrowRef}
      context={floatingContext}
      fill={fill ?? token.var('colors.surface.overlay')}
      stroke={stroke ?? token.var('colors.border')}
      strokeWidth={1}
    />
  );
};
