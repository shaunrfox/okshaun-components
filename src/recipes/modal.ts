import { defineSlotRecipe } from '@pandacss/dev';

/** Shared animation duration (ms) — used in both CSS animations and JS unmount timeout */
export const MODAL_ANIMATION_DURATION = 150;

const modalBase = {
  overlay: {
    position: 'fixed',
    inset: '0',
    bg: 'blanket',
    zIndex: 'overlay',
    // Initial state matches animation start
    opacity: '0',
    // Animation handled via data-state
    animation: `modalFadeIn ${MODAL_ANIMATION_DURATION}ms ease-out forwards`,
    '&[data-state="closing"]': {
      animation: `modalFadeOut ${MODAL_ANIMATION_DURATION}ms ease-out forwards`,
    },
  },
  container: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '90vh',
    bg: 'surface.overlay',
    borderRadius: '12',
    boxShadow: 'overlay',
    outline: 'none',
    zIndex: 'modal',
    // Initial state matches animation start
    opacity: '0',
    transform: 'translate(-50%, -50%) scale(0.95) translateY(-10px)',
    // Animation handled via data-state
    animation: `modalScaleIn ${MODAL_ANIMATION_DURATION}ms ease-out forwards`,
    '&[data-state="closing"]': {
      animation: `modalScaleOut ${MODAL_ANIMATION_DURATION}ms ease-out forwards`,
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12',
    px: '20',
    py: '12',
    borderBottom: 'default',
  },
  title: {
    w: 'full',
    truncate: true,
  },
  closeButton: {
    // IconButton styles will be applied via IconButton component
    // This slot is for any additional wrapper styling if needed
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    gap: '16',
    px: '20',
    py: '16',
    color: 'text',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '8',
    px: '20',
    py: '12',
    borderTop: 'default',
  },
};

const modalVariants = {
  size: {
    sm: {
      container: {
        maxWidth: '400',
      },
      title: {
        fontSize: 'md',
      },
    },
    md: {
      container: {
        maxWidth: '560',
      },
      title: {
        fontSize: 'lg',
      },
    },
    lg: {
      container: {
        maxWidth: '720',
      },
      title: {
        fontSize: 'xl',
      },
    },
  },
};

export const modalRecipe = defineSlotRecipe({
  className: 'modal',
  jsx: ['Modal', 'ModalHeader', 'ModalBody', 'ModalFooter'],
  slots: [
    'overlay',
    'container',
    'header',
    'title',
    'closeButton',
    'body',
    'footer',
  ],
  base: modalBase,
  variants: modalVariants,
  defaultVariants: {
    size: 'md',
  },
});
