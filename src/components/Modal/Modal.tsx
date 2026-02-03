import { useState, useEffect, useRef } from 'react';
import {
  FloatingPortal,
  FloatingFocusManager,
  useDismiss,
  useFloating,
  useInteractions,
  FloatingOverlay,
} from '@floating-ui/react';
import { Box, type BoxProps } from '../Box';
import {
  modal as modalRecipe,
  type ModalVariantProps,
} from '@styled-system/recipes';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { ModalContext, ModalContextValue } from './ModalContext';
import { MODAL_ANIMATION_DURATION } from '~/recipes/modal';

export type ModalProps = Omit<BoxProps, keyof ModalVariantProps> &
  ModalVariantProps & {
    /** Controlled open state (REQUIRED) */
    open: boolean;
    /** Callback when open state should change (REQUIRED) */
    onOpenChange: (open: boolean) => void;
    /** Whether clicking the overlay should close the modal */
    preventOverlayClose?: boolean;
    /** Children (ModalHeader, ModalBody, ModalFooter) */
    children: React.ReactNode;
    /** Optional ID for ARIA attributes */
    id?: string;
  };

export const Modal = (props: ModalProps) => {
  const {
    open,
    onOpenChange,
    size = 'md',
    preventOverlayClose = false,
    children,
    id,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = modalRecipe({ size });
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(open);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Floating UI setup
  const { refs, context } = useFloating({
    open,
    onOpenChange,
  });

  // Dismiss on Escape key
  const dismiss = useDismiss(context, {
    outsidePress: !preventOverlayClose,
  });

  const { getFloatingProps } = useInteractions([dismiss]);

  // Handle open/close state with animation
  useEffect(() => {
    if (open) {
      setShouldRender(true);
      setIsClosing(false);
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } else if (shouldRender) {
      // Start closing animation
      setIsClosing(true);
      // Wait for animation to complete before unmounting
      timeoutRef.current = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, MODAL_ANIMATION_DURATION);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [open, shouldRender]);

  // Context value
  const contextValue: ModalContextValue = {
    open: shouldRender && !isClosing,
    onClose: () => onOpenChange(false),
    preventOverlayClose,
  };

  if (!shouldRender) {
    return null;
  }

  const dataState = isClosing ? 'closing' : 'open';

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
