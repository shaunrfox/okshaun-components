import { createContext, useContext } from 'react';
import type { SelectContextValue } from './types';

export const SelectContext = createContext<SelectContextValue | null>(null);

export const useSelectContext = (): SelectContextValue => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be used within a Select component');
  }
  return context;
};
