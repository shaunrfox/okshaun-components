import { splitProps } from '~/utils/splitProps';
import type { FC, ReactNode, ChangeEventHandler } from 'react';
import { cx } from '@styled-system/css';
import { type BoxProps } from '../Box';
import { Label } from '../Label';
import { Checkbox } from '../Checkbox';
import {
  checkboxInput,
  type CheckboxInputVariantProps,
} from '@styled-system/recipes';

export type CheckboxInputProps = BoxProps &
  CheckboxInputVariantProps & {
    name: string;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    id?: string;
    error?: boolean;
    children?: string | ReactNode;
    disabled?: boolean;
  };

export const CheckboxInput: FC<CheckboxInputProps> = ({
  name,
  checked,
  onChange,
  id,
  error,
  children,
  disabled,
  indeterminate,
  ...props
}: CheckboxInputProps) => {
  const [className, otherProps] = splitProps(props);
  return (
    <Label
      className={cx(checkboxInput(), className)}
      {...otherProps}
      htmlFor={id}
      disabled={disabled}
    >
      <Checkbox
        id={id}
        name={name}
        error={error}
        checked={checked}
        onChange={onChange}
        indeterminate={indeterminate}
        disabled={disabled}
        {...props}
      />
      {children}
    </Label>
  );
};

export default CheckboxInput;
