import {
  autoUpdate,
  flip,
  offset as floatingOffset,
  type Middleware,
  type Placement,
  shift,
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
  extras?: Middleware[];
};

export const createOverlayMiddleware = (
  options: OverlayMiddlewareOptions = {},
) => {
  const { offset = 4, shiftPadding = 8, extras = [] } = options;

  return [
    floatingOffset(offset),
    flip(),
    shift({ padding: shiftPadding }),
    ...extras,
  ];
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
