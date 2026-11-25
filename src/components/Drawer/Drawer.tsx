import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useInteractions,
  useMergeRefs,
} from '@floating-ui/react';
import { cx } from '@styled-system/css';
import {
  type DrawerVariantProps,
  drawer as drawerRecipe,
} from '@styled-system/recipes';
import {
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { FloatingLayerContext } from '~/system/floating-ui/FloatingLayerContext';
import { useOverlayFloating } from '~/system/floating-ui/floating';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';
import { DsChainPortalRoot } from '../DsChainScope/DsChainPortalRoot';

import { DrawerContext, type DrawerContextValue } from './DrawerContext';

/** Duration of the enter and exit motion, matched to the drawer recipe. */
const DRAWER_MOTION_MS = 200;

/** Props for {@link Drawer}, a controlled, portalled panel at the screen edge. */
export type DrawerProps = Omit<
  BoxProps,
  keyof DrawerVariantProps | 'children'
> & {
  /** Controlled drawer state. Render state changes by updating this value after `onOpenChange`. */
  open: boolean;
  /** Called when Escape, the close button, or (modal only) an outside press requests closing. */
  onOpenChange: (open: boolean) => void;
  /**
   * When `true`, the drawer covers the page with a scrim, traps focus, locks
   * page scroll, and closes on an outside press.
   *
   * When `false`, the page behind stays visible and usable: there is no scrim,
   * focus moves into the drawer on open but Tab can leave it, the page can
   * scroll, and an outside press does not close it. Escape closes the drawer
   * only while focus is inside it. Use this for a detail panel beside a list,
   * where a click on another row changes the drawer's content.
   * @default true
   */
  modal?: boolean;
  /**
   * Screen edge the drawer attaches to.
   * @default 'right'
   */
  side?: DrawerVariantProps['side'];
  /**
   * Drawer width: `sm` 448px, `md` 576px, `lg` 768px, `xl` 1024px, `full` the
   * whole viewport. Every size is full width below the `xs` breakpoint.
   * @default 'md'
   */
  size?: DrawerVariantProps['size'];
  /**
   * Prevents an outside press from requesting close. Modal drawers only;
   * Escape still requests close.
   * @default false
   */
  preventOutsideClose?: boolean;
  /**
   * Element to focus when the drawer opens. Forwarded to Floating UI's
   * `FloatingFocusManager`. A number selects by tabbable index; a ref targets
   * a specific element. Defaults to the drawer panel itself when the drawer
   * is non-modal or a `DrawerHeader` close button is shown, so opening it does
   * not show the close button's tooltip. Otherwise defaults to the first
   * tabbable element.
   */
  initialFocus?: number | RefObject<HTMLElement | null>;
  /**
   * Returns focus to the previously focused element when the drawer closes, or
   * to a specific element when given a ref.
   * @default true
   */
  returnFocus?: boolean | RefObject<HTMLElement | null>;
  /** Drawer content, typically composed from `DrawerHeader`, `DrawerBody`, and `DrawerFooter`. */
  children: ReactNode;
  /** Identifier applied to the drawer element. Provide accessible naming with `aria-label` or `aria-labelledby`. */
  id?: string;
};

type DrawerPhase = 'open' | 'closing' | 'closed';

type DrawerAction =
  | { type: 'open' }
  | { type: 'startClosing' }
  | { type: 'finishClosing' };

const drawerPhaseReducer = (
  phase: DrawerPhase,
  action: DrawerAction,
): DrawerPhase => {
  switch (action.type) {
    case 'open':
      return 'open';
    case 'startClosing':
      return phase === 'closed' ? phase : 'closing';
    case 'finishClosing':
      return 'closed';
    default:
      return phase;
  }
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Renders a controlled panel that slides in from the edge of the screen.
 *
 * By default the drawer is modal: it adds a scrim, traps focus, locks page
 * scroll, and closes on Escape or an outside press. Set `modal={false}` for a
 * detail panel that sits beside a list the user keeps working in. Changing the
 * drawer's children while it stays open swaps the content without replaying
 * the entry motion.
 *
 * Supply an accessible name through `aria-label` or `aria-labelledby`; a
 * visible `DrawerHeader` title alone is not linked automatically.
 *
 * @example
 * ```tsx
 * <Drawer open={open} onOpenChange={setOpen} aria-labelledby={titleId}>
 *   <DrawerHeader title="Filters" titleId={titleId} />
 *   <DrawerBody>…</DrawerBody>
 *   <DrawerFooter><Button onClick={apply}>Apply</Button></DrawerFooter>
 * </Drawer>
 * ```
 *
 * @example
 * ```tsx
 * // Non-modal: the list behind stays clickable; a row click swaps the case.
 * <Drawer open={caseId !== null} onOpenChange={() => setCaseId(null)} modal={false} size="xl" aria-label="Case detail">
 *   <CaseDetail caseId={caseId} />
 * </Drawer>
 * ```
 */
export const Drawer = (props: DrawerProps) => {
  const {
    open,
    onOpenChange,
    modal = true,
    side = 'right',
    size = 'md',
    preventOutsideClose = false,
    initialFocus,
    returnFocus = true,
    children,
    id,
    ref,
    onKeyDown,
    onAnimationEnd,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = drawerRecipe({ side, size });
  const [phase, dispatch] = useReducer(
    drawerPhaseReducer,
    open ? 'open' : 'closed',
  );
  const panelRef = useRef<HTMLElement | null>(null);

  const { refs, context } = useOverlayFloating({
    open,
    onOpenChange,
    strategy: 'fixed',
    middleware: [],
  });

  // Non-modal drawers handle Escape on the panel instead, so the key only
  // closes the drawer while focus is inside it.
  const dismiss = useDismiss(context, {
    escapeKey: modal,
    outsidePress: modal && !preventOutsideClose,
  });
  const { getFloatingProps } = useInteractions([dismiss]);

  useEffect(() => {
    if (open) {
      dispatch({ type: 'open' });
      return;
    }
    dispatch({ type: 'startClosing' });
    // Fallback for when the exit animation does not run or its end event is
    // missed; the animationend handler normally finishes first.
    const timeout = setTimeout(
      () => dispatch({ type: 'finishClosing' }),
      prefersReducedMotion() ? 0 : DRAWER_MOTION_MS,
    );
    return () => clearTimeout(timeout);
  }, [open]);

  const setPanelRef = useCallback(
    (node: HTMLElement | null) => {
      panelRef.current = node;
      refs.setFloating(node);
    },
    [refs],
  );
  // A consumer ref must not replace the internal one: Floating UI needs the
  // panel for initial focus, the focus trap, and non-modal Escape.
  const mergedPanelRef = useMergeRefs([setPanelRef, ref]);

  // The panel stays mounted through the exit animation, so a second press on
  // the close button or a second Escape must not request close again.
  const onClose = useCallback(() => {
    if (open) {
      onOpenChange(false);
    }
  }, [open, onOpenChange]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    // The consumer handler runs first, so it can opt out with preventDefault.
    onKeyDown?.(event);
    if (modal || event.key !== 'Escape' || event.defaultPrevented) {
      return;
    }
    // Escape during IME composition cancels the composition, not the drawer.
    // Modal drawers get the same guard from useDismiss.
    if (event.nativeEvent.isComposing) {
      return;
    }
    // React bubbles key events out of portals. Ignore Escape from a menu or
    // picker that is portalled outside the panel; it closes itself.
    if (!panelRef.current?.contains(event.target as Node)) {
      return;
    }
    event.stopPropagation();
    onClose();
  };

  // Registered from a layout effect, so the count is current before Floating
  // UI moves focus (it waits a microtask after mount).
  const [headerCloseButtons, setHeaderCloseButtons] = useState(0);
  const registerHeaderCloseButton = useCallback(() => {
    setHeaderCloseButtons((count) => count + 1);
    return () => setHeaderCloseButtons((count) => count - 1);
  }, []);
  const contextValue: DrawerContextValue = useMemo(
    () => ({
      open: phase === 'open',
      onClose,
      modal,
      registerHeaderCloseButton,
      panelRef,
    }),
    [modal, onClose, phase, registerHeaderCloseButton],
  );
  const focusPanel = !modal || headerCloseButtons > 0;

  if (phase === 'closed') {
    return null;
  }

  const dataState = phase === 'closing' ? 'closing' : 'open';

  return (
    <FloatingLayerContext.Provider value="modalFloating">
      <DrawerContext.Provider value={contextValue}>
        <FloatingPortal>
          {/*
           * No `reference`: a Drawer is driven by the `open` prop and never
           * calls `refs.setReference`, the same as ModalWrapper.
           */}
          <DsChainPortalRoot>
            {/*
             * No click handler: useDismiss already closes on a scrim press as
             * an outside press. A second handler would call onOpenChange twice
             * for one click. useDismiss stops listening once `open` is false,
             * so presses on the fading scrim request nothing.
             */}
            {modal && (
              <FloatingOverlay
                lockScroll
                className={classes.overlay}
                data-state={dataState}
                aria-hidden="true"
              />
            )}
            <FloatingFocusManager
              context={context}
              modal={modal}
              initialFocus={initialFocus ?? (focusPanel ? panelRef : 0)}
              returnFocus={returnFocus}
              closeOnFocusOut={false}
            >
              <Box
                {...dsComponent('Drawer')}
                ref={mergedPanelRef}
                className={cx(classes.container, className)}
                data-state={dataState}
                data-side={side}
                id={id}
                role="dialog"
                aria-modal={modal ? 'true' : undefined}
                {...(getFloatingProps({
                  // Consumer props go through Floating UI so its handlers
                  // merge with them instead of being overwritten.
                  ...otherProps,
                  onKeyDown: handleKeyDown,
                  onAnimationEnd: (event) => {
                    onAnimationEnd?.(event);
                    if (
                      phase === 'closing' &&
                      event.target === event.currentTarget
                    ) {
                      dispatch({ type: 'finishClosing' });
                    }
                  },
                }) as Record<string, unknown>)}
              >
                {children}
              </Box>
            </FloatingFocusManager>
          </DsChainPortalRoot>
        </FloatingPortal>
      </DrawerContext.Provider>
    </FloatingLayerContext.Provider>
  );
};
