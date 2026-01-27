import { ReactElement, cloneElement } from 'react';
import { type BoxProps } from '../Box';
import { useMenuContext } from '../Menu/MenuContext';

export type SelectTriggerProps = Omit<BoxProps, 'children'> & {
  /** Trigger element (button, custom component, etc.) */
  children: React.ReactElement;
  /** Disable the trigger */
  disabled?: boolean;
};

export const SelectTrigger = (props: SelectTriggerProps) => {
  const { children, disabled = false, ...rest } = props;
  const { refs, getReferenceProps, open } = useMenuContext();

  // Clone the child element and attach ref + interaction props
  return cloneElement(children as ReactElement<Record<string, unknown>>, {
    ref: refs.setReference,
    'aria-haspopup': 'listbox' as const,
    'aria-expanded': open,
    disabled,
    ...rest,
    ...(getReferenceProps() as Record<string, unknown>),
  });
};
