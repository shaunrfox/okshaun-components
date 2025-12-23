import React from 'react';
import type { SelectOptionProps } from './types';

/**
 * SelectOption component used within Select
 * Note: This component doesn't render directly - the Select parent component
 * converts SelectOption instances to MenuItem components for actual rendering.
 */
export const SelectOption: React.FC<SelectOptionProps> = ({
  value: _value,
  label: _label,
  disabled: _disabled = false,
  description: _description,
  iconLeft: _iconLeft,
  iconRight: _iconRight,
  ..._props
}) => {
  // This component serves as a data container for the Select parent component.
  // Props are read by Select which converts SelectOption instances to MenuItem components.
  // The destructured props are intentionally unused (prefixed with _) as this returns null.
  return null;
};
