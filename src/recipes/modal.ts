import { defineSlotRecipe } from '@pandacss/dev';

const modalBase = {
  overlay: {
    position: 'fixed',
    inset: '0',
    bg: 'blanket',
    zIndex: '1100',
    // Initial state matches animation start
    opacity: '0',
    // Animation handled via data-state
    animation: 'modalFadeIn 150ms ease-out forwards',
    '&[data-state="closing"]': {
      animation: 'modalFadeOut 150ms ease-out forwards',
    },
  },
  container: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    display: 'flex',
    flexDirection: 'column',
    width: 'full',
    maxHeight: '[95vh]',
    bg: 'surface.overlay',
    borderRadius: '12',
    boxShadow: 'overlay',
    outline: 'none',
    zIndex: '1101',
    // Initial state matches animation start
    opacity: '0',
    transform: '[translate(-50%, -50%) scale(0.95) translateY(-10px)]',
    // Animation handled via data-state
    animation: 'modalScaleIn 150ms ease-out forwards',
    '&[data-state="closing"]': {
      animation: 'modalScaleOut 150ms ease-out forwards',
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
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    gap: '12',
    px: '20',
    py: '20',
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
        maxWidth: 'md',
      },
    },
    md: {
      container: {
        maxWidth: 'xl',
      },
    },
    lg: {
      container: {
        maxWidth: '3xl',
      },
    },
    xl: {
      container: {
        maxWidth: '5xl',
      },
    },
    full: {
      container: {
        maxWidth: '[95vw]',
      },
    },
    mobile: {
      container: {
        width: 'full',
        height: 'full',
        maxWidth: '[100vw]',
        maxHeight: '[100vh]',
        borderRadius: '0',
      },
    },
  },
  variant: {
    default: {
      container: {
        xsDown: {
          width: 'full',
          height: 'full',
          maxWidth: '[100vw]',
          maxHeight: '[100vh]',
          borderRadius: '0',
        },
      },
    },
    confirmation: {
      container: {
        height: 'fit',
        width: 'md',
        maxWidth: '[90vw]',
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
    variant: 'default',
    size: 'md',
  },
});
