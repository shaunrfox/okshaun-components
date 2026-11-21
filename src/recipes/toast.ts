import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

const toastBase = {
  /**
   * Fixed, bottom-right stack rendered once by `ToastViewport`. The viewport
   * itself is click-through so it never covers the page; each toast re-enables
   * pointer events for its own box.
   */
  viewport: {
    position: 'fixed',
    left: { base: '24', xs: 'auto' },
    right: '24',
    bottom: '24',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '12',
    maxW: 'full',
    pointerEvents: 'none',
    zIndex: 'tooltip',
  },
  root: {
    ...globalBaseStyles,
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8',
    w: 'full',
    minW: { base: '0', xs: 'xs' },
    maxW: 'sm',
    p: '12',
    borderRadius: '8',
    bg: 'surface.overlay',
    boxShadow: 'overlay',
    border: 'default',
    pointerEvents: 'auto',
    animationName: 'toastSlideIn',
    animationDuration: 'fast',
    animationTimingFunction: 'out',
    animationFillMode: 'forwards',
    '&[data-state="closing"]': {
      animationName: 'toastSlideOut',
    },
    _motionReduce: {
      animationName: 'none',
      opacity: '1',
    },
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    flex: 'none',
    minH: '18',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
    flex: '1',
    minW: '0',
  },
  message: {
    maxW: 'full',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '8',
    mt: '4',
  },
  dismiss: {
    flex: 'none',
  },
};

const toastVariants = {
  /** Semantic tone. Drives the leading border accent and the tone icon. */
  tone: {
    info: {
      root: { borderLeft: 'info', borderLeftWidth: '4' },
    },
    success: {
      root: { borderLeft: 'success', borderLeftWidth: '4' },
    },
    warning: {
      root: { borderLeft: 'warning', borderLeftWidth: '4' },
    },
    danger: {
      root: { borderLeft: 'danger', borderLeftWidth: '4' },
    },
    neutral: {
      root: { borderLeft: 'default', borderLeftWidth: '4' },
    },
  },
};

export const toastRecipe = defineSlotRecipe({
  className: 'toast',
  jsx: ['Toast', 'ToastViewport'],
  slots: [
    'viewport',
    'root',
    'icon',
    'content',
    'message',
    'actions',
    'dismiss',
  ],
  base: toastBase,
  variants: toastVariants,
  defaultVariants: {
    tone: 'neutral',
  },
});
