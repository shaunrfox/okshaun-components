import { createContext, useContext } from 'react';

export type RadioGroupContextValue = {
  name: string;
  value: string | null;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(
  null,
);

export const useRadioGroup = () => useContext(RadioGroupContext);
