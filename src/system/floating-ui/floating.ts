import {
  autoUpdate,
  type FlipOptions,
  flip,
  offset as floatingOffset,
  type Middleware,
  type Placement,
  shift,
  size,
  useFloating,
} from '@floating-ui/react';

type OverlayOpenChange = (
  open: boolean,
  event?: Event,
  reason?: string,
) => void;

export type OverlayFloatingOptions = {
  open: boolean;
  onOpenChange: OverlayOpenChange;
  placement?: Placement;
  strategy?: 'absolute' | 'fixed';
  middleware?: Middleware[];
  nodeId?: string;
  offset?: number;
  shiftPadding?: number;
};

export type OverlayMiddlewareOptions = {
  offset?: number;
  shiftPadding?: number;
  /** Optional collision fallback settings; omitted to preserve Floating UI defaults. */
  flipOptions?: FlipOptions;
  extras?: Middleware[];
};

export const createOverlayMiddleware = (
  options: OverlayMiddlewareOptions = {},
) => {
  const { offset = 4, shiftPadding = 8, flipOptions, extras = [] } = options;

  return [
    floatingOffset(offset),
    flip(flipOptions),
    shift({ padding: shiftPadding }),
    ...extras,
  ];
};

export type AvailableHeightMiddlewareOptions = {
  /** Sets the floating element's `minWidth` to the reference width. */
  matchReferenceWidth?: boolean;
  padding?: number;
};

/**
 * Writes the space beside the reference to `--available-height` so a recipe
 * (e.g. the `menu` recipe's `scrollable` variant) can cap and scroll the
 * floating element. Place it after `flip()` and `shift()`. The default
 * `padding` matches `createOverlayMiddleware`'s default `shiftPadding`.
 */
export const availableHeightMiddleware = (
  options: AvailableHeightMiddlewareOptions = {},
) => {
  const { matchReferenceWidth = false, padding = 8 } = options;

  return size({
    padding,
    apply({ rects, elements, availableHeight }) {
      if (matchReferenceWidth) {
        elements.floating.style.minWidth = `${rects.reference.width}px`;
      }
      elements.floating.style.setProperty(
        '--available-height',
        `${Math.max(availableHeight, 0)}px`,
      );
    },
  });
};

export const useOverlayFloating = (options: OverlayFloatingOptions) => {
  const {
    open,
    onOpenChange,
    placement = 'bottom-start',
    strategy = 'absolute',
    middleware,
    nodeId,
    offset = 4,
    shiftPadding = 8,
  } = options;

  return useFloating({
    nodeId,
    open,
    onOpenChange,
    placement,
    strategy,
    whileElementsMounted: autoUpdate,
    middleware: middleware ?? createOverlayMiddleware({ offset, shiftPadding }),
  });
};
