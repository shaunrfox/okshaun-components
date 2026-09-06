import { createContext, useContext } from 'react';

/** State and close behavior shared with descendants of {@link ModalWrapper}. */
export interface ModalWrapperContextValue {
  /** Whether the modal is currently in its open phase. */
  open: boolean;
  /** Requests closing through the parent modal's `onOpenChange(false)`. */
  onClose: () => void;
  /** Whether the parent modal blocks overlay-triggered closing. */
  preventOverlayClose?: boolean;
}

export const ModalWrapperContext =
  createContext<ModalWrapperContextValue | null>(null);

/**
 * Returns state and close behavior from the closest parent {@link ModalWrapper}.
 *
 * Call only in a modal descendant; it throws when no modal context is present.
 *
 * @example
 * ```tsx
 * const { onClose } = useModalWrapperContext();
 * ```
 */
export const useModalWrapperContext = () => {
  const context = useContext(ModalWrapperContext);
  if (!context) {
    throw new Error(
      'Modal components must be used within a <ModalWrapper> provider',
    );
  }
  return context;
};
