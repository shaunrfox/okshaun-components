import type { MouseEvent } from 'react';

import { IconButton } from '~/components/IconButton';

type ClearButtonProps = {
  clearable: boolean;
  hasValue: boolean;
  label: string;
  onClear: () => void;
};

export const getClearButton = ({
  clearable,
  hasValue,
  label,
  onClear,
}: ClearButtonProps) => {
  if (!clearable || !hasValue) {
    return undefined;
  }

  return (
    <IconButton
      variant="ghost"
      iconName="x"
      altText={label}
      onMouseDown={(event: MouseEvent<HTMLElement>) => {
        // Keep pointer interaction from focusing a picker trigger and opening
        // its menu immediately before the value is cleared.
        event.preventDefault();
      }}
      onClick={(event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        onClear();
      }}
    />
  );
};
