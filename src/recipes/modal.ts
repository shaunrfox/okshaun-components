import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

const modalBase = {
  positionWrapper: {
    '--wrapper-p': {
      base: 'token(sizes.0)',
      xs: 'token(sizes.12)',
      sm: 'token(sizes.32)',
      md: 'token(sizes.56)',
    },
    position: 'fixed',
    inset: '0',
    display: 'grid',
    p: 'var(--wrapper-p)',
    w: '100vw',
    h: '100vh',
    zIndex: 1100,
  },
  overlay: {
    position: 'fixed',
    inset: '0',
    bg: 'blanket',
    zIndex: 1100,
    // Initial state matches animation start
    opacity: '0',
    // Animation handled via data-state
    animation: 'modalFadeIn 150ms ease-out forwards',
    '&[data-state="closing"]': {
      animation: 'modalFadeOut 150ms ease-out forwards',
    },
  },
  container: {
    ...globalBaseStyles,
    display: 'flex',
    flexDirection: 'column',
    maxW: 'calc(100vw - (2 * var(--wrapper-p)))',
    maxH: 'calc(100vh - (2 * var(--wrapper-p)))',
    bg: 'surface.overlay',
    borderRadius: '12',
    boxShadow: 'overlay',
    outline: 'none',
    zIndex: 1101,
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

const mobile = {
  xsDown: {
    width: '100vw',
    height: '100vh',
    maxWidth: '100vw',
    maxHeight: '100vh',
    borderRadius: '0',
  },
};

const modalVariants = {
  size: {
    sm: {
      container: {
        w: 'md',
        ...mobile,
      },
    },
    md: {
      container: {
        w: 'xl',
        ...mobile,
      },
    },
    lg: {
      container: {
        w: '3xl',
        ...mobile,
      },
    },
    xl: {
      container: {
        w: '5xl',
        ...mobile,
      },
    },
    full: {
      container: {
        w: '95vw',
        ...mobile,
      },
    },
    fullPage: {
      positionWrapper: {
        '--wrapper-p': 'token(sizes.0)',
      },
      container: {
        w: '100vw',
        h: '100vh',
        maxW: '100vw',
        maxH: '100vh',
        borderRadius: '0',
        ...mobile,
      },
    },
  },
  position: {
    centered: {
      positionWrapper: {
        placeContent: 'center',
      },
      container: {
        animation: 'modalScaleIn 150ms ease-out forwards',
        '&[data-state="closing"]': {
          animation: 'modalScaleOut 150ms ease-out forwards',
        },
      },
    },
    top: {
      positionWrapper: {
        placeContent: 'start center',
      },
      container: {
        animation: 'modalScaleInTop 150ms ease-out forwards',
        '&[data-state="closing"]': {
          animation: 'modalScaleOutTop 150ms ease-out forwards',
        },
      },
    },
  },
};

export const modalRecipe = defineSlotRecipe({
  className: 'modal',
  jsx: ['ModalWrapper', 'ModalHeader', 'ModalBody', 'ModalFooter', 'Modal'],
  slots: [
    'positionWrapper',
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
    position: 'centered',
  },
});
