import { cloneElement, type ReactElement } from 'react';

import type { BoxProps } from '../Box';

export type SelectTriggerProps = Omit<BoxProps, 'children'> & {
  /** Trigger element (button, custom component, etc.) */
  children: ReactElement;
  /** Disable the trigger */
  disabled?: boolean;
};

export const SelectTrigger = (props: SelectTriggerProps) => {
  const { children, disabled = false, ...rest } = props;

  return cloneElement(children, {
    disabled,
    ...rest,
  } as Record<string, unknown>);
};
