import { splitProps } from '~/utils/splitProps';
import type { FC, ReactNode, ChangeEventHandler } from 'react';
import { cx } from '@styled-system/css';
import { type BoxProps } from '../Box';
import { Label } from '../Label';
import { Checkbox } from '../Checkox';
import {
  checkboxInput,
  type CheckboxInputVariantProps,
} from '@styled-system/recipes';

export type CheckboxInputProps = BoxProps &
  CheckboxInputVariantProps & {
    name: string;
    id?: string;
    error?: boolean;
    children?: string | ReactNode;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
  };

export const CheckboxInput: FC<CheckboxInputProps> = ({
  id,
  name,
  children,
  error,
  indeterminate,
  checked,
  onChange,
  ...props
}: CheckboxInputProps) => {
  const [className, otherProps] = splitProps(props);
  return (
    <Label
      className={cx(checkboxInput(), className)}
      {...otherProps}
      htmlFor={id}
    >
      <Checkbox
        id={id}
        name={name}
        error={error}
        checked={checked}
        onChange={onChange}
        indeterminate={indeterminate}
        {...props}
      />
      {children}
    </Label>
  );
};

export default CheckboxInput;
