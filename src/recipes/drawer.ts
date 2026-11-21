import { defineSlotRecipe } from '@pandacss/dev';

import { globalBaseStyles } from '~/styles/utilities';

const drawerBase = {
  overlay: {
    position: 'fixed',
    inset: '0',
    bg: 'blanket',
    zIndex: 1100,
    // Initial state matches animation start
    opacity: '0',
    animation: 'modalFadeIn 200ms ease-out forwards',
    '&[data-state="closing"]': {
      animation: 'modalFadeOut 200ms ease-out forwards',
    },
    _motionReduce: {
      opacity: '1',
      animation: 'none',
    },
  },
  container: {
    ...globalBaseStyles,
    position: 'fixed',
    top: '0',
    bottom: '0',
    display: 'flex',
    flexDirection: 'column',
    // Size to the visible viewport, so the footer stays on screen when mobile
    // browser controls expand. 100vh is the fallback for browsers without dvh.
    h: '100vh',
    '@supports (height: 100dvh)': {
      h: '100dvh',
    },
    maxW: '100vw',
    bg: 'surface.overlay',
    boxShadow: 'overlay',
    outline: 'none',
    // Same layer as the modal's position wrapper, not its 1101 container: the
    // modal's 1101 only applies inside that wrapper's stacking context. On a
    // tie, the later portal paints on top, so a modal opened from a drawer
    // covers it. The container follows the overlay in the DOM, so it still
    // paints above its own scrim.
    zIndex: 1100,
    _motionReduce: {
      animation: 'none',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12',
    flexShrink: 0,
    px: '20',
    py: '12',
    borderBottom: 'default',
  },
  title: {
    w: 'full',
    truncate: true,
  },
  closeButton: {
    // IconButton styles are applied by the IconButton component.
  },
  body: {
    flex: 1,
    minH: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12',
    px: '20',
    py: '20',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '8',
    flexShrink: 0,
    px: '20',
    py: '12',
    borderTop: 'default',
  },
};

const mobile = {
  xsDown: {
    w: '100vw',
  },
};

const drawerVariants = {
  side: {
    right: {
      container: {
        right: '0',
        animation: 'drawerSlideInRight 200ms ease-out forwards',
        '&[data-state="closing"]': {
          animation: 'drawerSlideOutRight 200ms ease-in forwards',
          _motionReduce: { animation: 'none' },
        },
        _motionReduce: { animation: 'none' },
      },
    },
    left: {
      container: {
        left: '0',
        animation: 'drawerSlideInLeft 200ms ease-out forwards',
        '&[data-state="closing"]': {
          animation: 'drawerSlideOutLeft 200ms ease-in forwards',
          _motionReduce: { animation: 'none' },
        },
        _motionReduce: { animation: 'none' },
      },
    },
  },
  size: {
    sm: { container: { w: 'md', ...mobile } },
    md: { container: { w: 'xl', ...mobile } },
    lg: { container: { w: '3xl', ...mobile } },
    xl: { container: { w: '5xl', ...mobile } },
    full: { container: { w: '100vw' } },
  },
  scrollable: {
    true: { body: { overflowY: 'auto' } },
    false: { body: { overflow: 'hidden' } },
  },
};

export const drawerRecipe = defineSlotRecipe({
  className: 'drawer',
  jsx: ['Drawer', 'DrawerHeader', 'DrawerBody', 'DrawerFooter'],
  slots: [
    'overlay',
    'container',
    'header',
    'title',
    'closeButton',
    'body',
    'footer',
  ],
  base: drawerBase,
  variants: drawerVariants,
  defaultVariants: {
    side: 'right',
    size: 'md',
    scrollable: true,
  },
});
