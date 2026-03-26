import { cx } from '@styled-system/css';
import {
  type ToggleInputVariantProps,
  toggleInput,
} from '@styled-system/recipes';
import { type ReactNode, useId } from 'react';

import { splitProps } from '~/utils/splitProps';

import type { BoxProps } from '../Box';
import { Label } from '../Label';
import type { ToggleChangeHandler } from '../Toggle';
import { Toggle } from '../Toggle';

export type ToggleInputProps = Omit<BoxProps, keyof ToggleInputVariantProps> &
  ToggleInputVariantProps & {
    name: string;
    checked: boolean;
    onChange: ToggleChangeHandler;
    id?: string;
    error?: boolean;
    disabled?: boolean;
    children?: string | ReactNode;
  };

export const ToggleInput = (props: ToggleInputProps) => {
  const { name, checked, onChange, id, children, error, disabled, ...rest } =
    props;
  const [className, otherProps] = splitProps(rest);
  const generatedId = useId();
  const resolvedId = id ?? generatedId;
  return (
    <Label
      className={cx(toggleInput({}), className)}
      htmlFor={resolvedId}
      error={error}
      disabled={disabled}
      {...otherProps}
    >
      <Toggle
        name={name}
        checked={checked}
        onChange={onChange}
        id={resolvedId}
        error={error}
        disabled={disabled}
      />
      {children}
    </Label>
  );
};
