import type { ReactNode } from 'react';
import type { BoxProps } from '../Box';
import type { IconNamesList } from '../Icon';

export type SelectOptionProps = Omit<BoxProps, 'children'> & {
  /** Option value */
  value: string;
  /** Option label (required) */
  label: string | ReactNode;
  /** Disable the option */
  disabled?: boolean;
  /** Secondary description text */
  description?: string;
  /** Icon on the left side */
  iconLeft?: IconNamesList;
  /** Icon on the right side */
  iconRight?: IconNamesList;
  /** Index for keyboard navigation (managed internally) */
  index?: number;
};

/**
 * SelectOption component used within Select
 * Note: This component doesn't render directly - the Select parent component
 * converts SelectOption instances to MenuItem components for actual rendering.
 */
export const SelectOption = (props: SelectOptionProps) => {
  const {
    value: _value,
    label: _label,
    disabled: _disabled = false,
    description: _description,
    iconLeft: _iconLeft,
    iconRight: _iconRight,
  } = props;
  // This component serves as a data container for the Select parent component.
  // Props are read by Select which converts SelectOption instances to MenuItem components.
  // The destructured props are intentionally unused (prefixed with _) as this returns null.
  return null;
};
