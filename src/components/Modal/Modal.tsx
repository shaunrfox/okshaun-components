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
import { type ReactNode, useEffect, useReducer, useRef } from 'react';

import { useOverlayFloating } from '~/system/floating-ui/floating';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';

import { ModalContext, type ModalContextValue } from './ModalContext';

export type ModalProps = Omit<BoxProps, keyof ModalVariantProps> &
  ModalVariantProps & {
    /** Controlled open state (REQUIRED) */
    open: boolean;
    /** Callback when open state should change (REQUIRED) */
    onOpenChange: (open: boolean) => void;
    /** Whether clicking the overlay should close the modal */
    preventOverlayClose?: boolean;
    /** Children (ModalHeader, ModalBody, ModalFooter) */
    children: ReactNode;
    /** Optional ID for ARIA attributes */
    id?: string;
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

export const Modal = (props: ModalProps) => {
  const {
    open,
    onOpenChange,
    size = 'md',
    preventOverlayClose = false,
    children,
    id,
    variant = 'default',
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = modalRecipe({ size, variant });
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

  // Context value
  const contextValue: ModalContextValue = {
    open: phase === 'open',
    onClose: () => onOpenChange(false),
    preventOverlayClose,
  };

  if (phase === 'closed') {
    return null;
  }

  const dataState = phase === 'closing' ? 'closing' : 'open';

  return (
    <ModalContext.Provider value={contextValue}>
      <FloatingPortal>
        <FloatingOverlay
          lockScroll
          className={cx(classes.overlay)}
          data-state={dataState}
          onClick={preventOverlayClose ? undefined : () => onOpenChange(false)}
          aria-hidden="true"
        />
        <FloatingFocusManager context={context} modal={true}>
          <Box
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
      </FloatingPortal>
    </ModalContext.Provider>
  );
};
