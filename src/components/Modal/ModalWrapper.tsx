import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useInteractions,
} from '@floating-ui/react';
import { cx } from '@styled-system/css';
import {
  type ModalVariantProps,
  modal as modalRecipe,
} from '@styled-system/recipes';
import {
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { FloatingLayerContext } from '~/system/floating-ui/FloatingLayerContext';
import { useOverlayFloating } from '~/system/floating-ui/floating';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';
import { DsChainPortalRoot } from '../DsChainScope/DsChainPortalRoot';

import {
  ModalWrapperContext,
  type ModalWrapperContextValue,
} from './ModalWrapperContext';

/** Props for {@link ModalWrapper}, a controlled, portalled dialog shell. */
export type ModalWrapperProps = Omit<BoxProps, keyof ModalVariantProps> &
  ModalVariantProps & {
    /** Controlled dialog state. Render state changes by updating this value after `onOpenChange`. */
    open: boolean;
    /** Called when Escape, overlay interaction, or a descendant close control requests closing. */
    onOpenChange: (open: boolean) => void;
    /**
     * Prevents overlay clicks from requesting close. Escape still requests close.
     * @default false
     */
    preventOverlayClose?: boolean;
    /**
     * Element to focus when the dialog opens. Forwarded to Floating UI's
     * `FloatingFocusManager`. A number selects by tabbable index; a ref targets
     * a specific element (for example Cancel on a delete confirmation).
     */
    initialFocus?: number | RefObject<HTMLElement | null>;
    /** Dialog content, typically composed from `ModalHeader`, `ModalBody`, and `ModalFooter`. */
    children: ReactNode;
    /** Identifier applied to the dialog element. Provide accessible naming with `aria-label` or `aria-labelledby`. */
    id?: string;
    /**
     * Recipe size for the dialog panel.
     * @default 'md'
     */
    size?: ModalVariantProps['size'];
    /**
     * Recipe position for the dialog panel.
     * @default 'centered'
     */
    position?: ModalVariantProps['position'];
  };

type ModalPhase = 'open' | 'closing' | 'closed';

type ModalState = {
  phase: ModalPhase;
};

type ModalAction =
  | { type: 'open' }
  | { type: 'startClosing' }
  | { type: 'finishClosing' };

const modalStateReducer = (
  state: ModalState,
  action: ModalAction,
): ModalState => {
  switch (action.type) {
    case 'open':
      return { phase: 'open' };
    case 'startClosing':
      if (state.phase === 'closed') {
        return state;
      }
      return { phase: 'closing' };
    case 'finishClosing':
      return { phase: 'closed' };
    default:
      return state;
  }
};

/**
 * Renders a controlled modal dialog shell in a portal with focus management and
 * a scroll-locking overlay.
 *
 * Escape always calls `onOpenChange(false)`. By default, pressing the overlay
 * does too. The dialog remains mounted for a 150 ms closing animation. Supply
 * an accessible name through `aria-label` or `aria-labelledby`; a visible
 * `ModalHeader` title alone is not linked automatically.
 *
 * Compose with `ModalHeader`, `ModalBody`, and `ModalFooter`, or use the
 * pre-built {@link Modal} and {@link ConfirmationModal} components.
 *
 * @example
 * ```tsx
 * <ModalWrapper open={open} onOpenChange={setOpen} aria-label="Delete project">
 *   <ModalHeader title="Delete project" />
 *   <ModalBody>This cannot be undone.</ModalBody>
 *   <ModalFooter><Button onClick={remove}>Delete</Button></ModalFooter>
 * </ModalWrapper>
 * ```
 */
export const ModalWrapper = (props: ModalWrapperProps) => {
  const {
    open,
    onOpenChange,
    size = 'md',
    preventOverlayClose = false,
    initialFocus,
    children,
    id,
    position = 'centered',
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = modalRecipe({ size, position });
  const [{ phase }, dispatch] = useReducer(modalStateReducer, {
    phase: open ? 'open' : 'closed',
  });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Floating UI setup
  const { refs, context } = useOverlayFloating({
    open,
    onOpenChange,
    strategy: 'fixed',
    middleware: [],
  });

  // Dismiss on Escape key
  const dismiss = useDismiss(context, {
    outsidePress: !preventOverlayClose,
  });

  const { getFloatingProps } = useInteractions([dismiss]);

  // Handle open/close state with animation
  useEffect(() => {
    if (open) {
      dispatch({ type: 'open' });
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    dispatch({ type: 'startClosing' });
    timeoutRef.current = setTimeout(() => {
      dispatch({ type: 'finishClosing' });
    }, 150);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [open]);

  const onClose = useCallback(() => onOpenChange(false), [onOpenChange]);
  const contextValue: ModalWrapperContextValue = useMemo(
    () => ({
      open: phase === 'open',
      onClose,
      preventOverlayClose,
    }),
    [onClose, phase, preventOverlayClose],
  );

  if (phase === 'closed') {
    return null;
  }

  const dataState = phase === 'closing' ? 'closing' : 'open';

  return (
    <FloatingLayerContext.Provider value="modalFloating">
      <ModalWrapperContext.Provider value={contextValue}>
        <FloatingPortal>
          {/*
           * No `reference`: a ModalWrapper is driven by the `open` prop and never
           * calls `refs.setReference`, so there is no opening element to resolve a
           * business object from. Clicks inside resolve their chain but no
           * object, which is the correct answer here — inventing one from the
           * page would be right on a legacy screen and wrong on a React screen
           * that tags individual elements.
           */}
          <DsChainPortalRoot>
            <Box className={classes.positionWrapper}>
              <FloatingOverlay
                lockScroll
                className={classes.overlay}
                data-state={dataState}
                onClick={
                  preventOverlayClose ? undefined : () => onOpenChange(false)
                }
                aria-hidden="true"
              />
              <FloatingFocusManager
                context={context}
                modal={true}
                initialFocus={initialFocus}
              >
                <Box
                  {...dsComponent('ModalWrapper')}
                  ref={refs.setFloating}
                  className={cx(classes.container, className)}
                  data-state={dataState}
                  id={id}
                  role="dialog"
                  aria-modal="true"
                  {...(getFloatingProps() as Record<string, unknown>)}
                  {...otherProps}
                >
                  {children}
                </Box>
              </FloatingFocusManager>
            </Box>
          </DsChainPortalRoot>
        </FloatingPortal>
      </ModalWrapperContext.Provider>
    </FloatingLayerContext.Provider>
  );
};
