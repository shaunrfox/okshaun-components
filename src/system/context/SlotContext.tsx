import type { ColorToken } from '@styled-system/tokens';
import type { ConditionalValue } from '@styled-system/types';
import { createContext, useContext } from 'react';

export type SlotPlacement = 'before' | 'after';

export type SlotContextValue = {
  owner?: string;
  placement?: SlotPlacement;
  size?: ConditionalValue<string>;
  fill?: ConditionalValue<ColorToken>;
  disabled?: boolean;
  error?: boolean;
  invalid?: boolean;
};

export const SlotContext = createContext<SlotContextValue | null>(null);

export const useSlotContext = () => {
  return useContext(SlotContext);
};
