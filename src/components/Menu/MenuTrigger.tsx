import React from 'react';
import type { BoxProps } from '../Box';
import { useMenuContext } from './MenuContext';

export type MenuTriggerProps = Omit<BoxProps, 'children'> & {
  /** Trigger element (button, custom component, etc.) */
  children: React.ReactElement;
  /** Disable the trigger */
  disabled?: boolean;
};

export const MenuTrigger = (props: MenuTriggerProps) => {
  const { children, disabled = false } = props;
  const { refs, getReferenceProps, open } = useMenuContext();

  // Clone the child element and attach ref + interaction props
  return React.cloneElement(
    children as React.ReactElement<Record<string, unknown>>,
    {
      ref: refs.setReference,
      'aria-haspopup': 'menu' as const,
      'aria-expanded': open,
      disabled,
      ...(getReferenceProps() as Record<string, unknown>),
    },
  );
};
