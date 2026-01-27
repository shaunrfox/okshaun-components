import { createContext, useContext } from 'react';

export interface SelectContextValue {
  /** Current selected value */
  value: string | string[] | null;
  /** Callback when value changes */
  onChange: (value: string | string[] | null) => void;
  /** Whether multiple selection is allowed */
  multiple: boolean;
  /** Placeholder text when no selection */
  placeholder: string;
}

export const SelectContext = createContext<SelectContextValue | null>(null);

export const useSelectContext = (): SelectContextValue => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be used within a Select component');
  }
  return context;
};
