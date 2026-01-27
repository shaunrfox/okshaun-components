import { createContext, useContext } from 'react';

export interface ModalContextValue {
  /** Whether the modal is open */
  open: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Whether overlay clicks should close the modal */
  preventOverlayClose?: boolean;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal components must be used within a <Modal> provider');
  }
  return context;
};
