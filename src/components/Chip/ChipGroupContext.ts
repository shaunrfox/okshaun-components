import { createContext, useContext, type RefObject } from 'react';

export type ChipGroupType = 'single' | 'multi';

export type ChipGroupContextValue = {
  type: ChipGroupType;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  name?: string;
  // Keyboard navigation
  registerChip: (value: string, ref: RefObject<HTMLButtonElement | null>) => void;
  unregisterChip: (value: string) => void;
  focusChip: (direction: 'next' | 'prev', currentValue: string) => void;
  chipValues: string[];
};

export const ChipGroupContext = createContext<ChipGroupContextValue | null>(
  null
);

export const useChipGroup = () => {
  return useContext(ChipGroupContext);
};
