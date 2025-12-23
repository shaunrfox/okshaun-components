import { createContext, useContext } from 'react';
import type { ModalContextValue } from './types';

export const ModalContext = createContext<ModalContextValue | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal components must be used within a <Modal> provider');
  }
  return context;
};
