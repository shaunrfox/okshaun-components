import React from 'react';
import { useMenuContext } from './MenuContext';
import type { MenuTriggerProps } from './types';

export const MenuTrigger: React.FC<MenuTriggerProps> = ({
  children,
  disabled = false,
}) => {
  const { refs, getReferenceProps, open } = useMenuContext();

  // Clone the child element and attach ref + interaction props
  return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
    ref: refs.setReference,
    'aria-haspopup': 'menu' as const,
    'aria-expanded': open,
    disabled,
    ...(getReferenceProps() as Record<string, unknown>),
  });
};
