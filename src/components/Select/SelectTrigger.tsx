import { cloneElement, type ReactElement } from 'react';

import type { BoxProps } from '../Box';

/** Props accepted by {@link SelectTrigger}. */
export type SelectTriggerProps = Omit<BoxProps, 'children'> & {
  /** Trigger element (button, custom component, etc.) */
  children: ReactElement;
  /** Disable the trigger */
  disabled?: boolean;
};

/**
 * Marks a custom element as the control that opens its parent {@link Select}.
 *
 * The child is cloned rather than wrapped, so it keeps its own type and
 * styling while receiving the trigger's props.
 *
 * @example
 * ```tsx
 * <Select>
 *   <SelectTrigger>
 *     <Button>Choose a status</Button>
 *   </SelectTrigger>
 * </Select>
 * ```
 */
export const SelectTrigger = (props: SelectTriggerProps) => {
  const { children, disabled = false, ...rest } = props;

  return cloneElement(children, {
    disabled,
    ...rest,
  } as Record<string, unknown>);
};
