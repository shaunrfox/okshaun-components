import type { FormFieldVariantProps } from '@styled-system/recipes';
import { createContext, useContext } from 'react';

export type FieldContextValue = {
  size?: FormFieldVariantProps['size'];
  disabled?: boolean;
  error?: boolean;
  invalid?: boolean;
  describedBy?: string;
};

export const FieldContext = createContext<FieldContextValue | null>(null);

export const useFieldContext = () => {
  return useContext(FieldContext);
};
