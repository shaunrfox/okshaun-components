import React from 'react';
import { useMenuContext } from '../Menu/MenuContext';
import type { SelectTriggerProps } from './types';

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
  children,
  disabled = false,
}) => {
  const { refs, getReferenceProps, open } = useMenuContext();

  // Clone the child element and attach ref + interaction props
  return React.cloneElement(
    children as React.ReactElement<Record<string, unknown>>,
    {
      ref: refs.setReference,
      'aria-haspopup': 'listbox' as const,
      'aria-expanded': open,
      disabled,
      ...(getReferenceProps() as Record<string, unknown>),
    },
  );
};
