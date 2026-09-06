import { isValidElement, type ReactNode, useMemo } from 'react';

import { Box } from '~/components/Box/Box';
import { Button } from '~/components/Button/Button';
import { IconButton } from '~/components/IconButton/IconButton';
import {
  SlotContext,
  type SlotContextValue,
  type SlotOwner,
  type SlotPlacement,
} from '~/system/context/SlotContext';

type InputSlotProps = Omit<SlotContextValue, 'owner' | 'placement'> & {
  buttonSlotClassName: string;
  owner: SlotOwner;
  placement: SlotPlacement;
  slot: ReactNode;
  slotClassName: string;
};

const isButtonLikeSlot = (slot: ReactNode) =>
  isValidElement(slot) && (slot.type === Button || slot.type === IconButton);

export const InputSlot = ({
  buttonSlotClassName,
  disabled,
  error,
  invalid,
  owner,
  placement,
  size,
  slot,
  slotClassName,
}: InputSlotProps) => {
  const contextValue = useMemo<SlotContextValue>(
    () => ({ owner, placement, size, disabled, error, invalid }),
    [disabled, error, invalid, owner, placement, size],
  );

  if (!slot) {
    return null;
  }

  return (
    <SlotContext.Provider value={contextValue}>
      <Box
        className={isButtonLikeSlot(slot) ? buttonSlotClassName : slotClassName}
      >
        {slot}
      </Box>
    </SlotContext.Provider>
  );
};
