import type { ColorToken } from '@styled-system/tokens';
import type { ConditionalValue } from '@styled-system/types';
import { createContext, useContext } from 'react';

/**
 * Components that provide slot context. Ported from the Cetec design system,
 * which narrows this from a bare string so a slot cannot claim an owner that
 * does not exist.
 */
export type SlotOwner =
  | 'Button'
  | 'Chip'
  | 'TextInput'
  | 'DateInput'
  | 'DateRangeInput'
  | 'TimeInput'
  | 'TimeRangeInput'
  | 'DateTimeInput';

export type SlotPlacement = 'before' | 'after';

export type SlotContextValue = {
  owner: SlotOwner;
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
