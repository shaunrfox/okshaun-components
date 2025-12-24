import { splitProps } from '~/utils/splitProps';
import type { FC, ReactNode, ChangeEventHandler } from 'react';
import { cx } from '@styled-system/css';
import { type BoxProps } from '../Box';
import { Label } from '../Label';
import { Toggle } from '../Toggle';
import {
  toggleInput,
  type ToggleInputVariantProps,
} from '@styled-system/recipes';

export type ToggleInputProps = BoxProps &
  ToggleInputVariantProps & {
    name: string;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    id?: string;
    error?: boolean;
    children?: string | ReactNode;
    disabled?: boolean;
  };

export const ToggleInput: FC<ToggleInputProps> = ({
  name,
  checked,
  onChange,
  id,
  error,
  children,
  disabled,
  ...props
}: ToggleInputProps) => {
  const [className, otherProps] = splitProps(props);
  return (
    <Label
      className={cx(toggleInput({}), className)}
      {...otherProps}
      htmlFor={id}
      disabled={disabled}
    >
      <Toggle
        id={id}
        name={name}
        error={error}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {children}
    </Label>
  );
};

export default ToggleInput;
