import { cx } from '@styled-system/css';
import {
  type CheckboxInputVariantProps,
  checkboxInput,
} from '@styled-system/recipes';
import type { ChangeEventHandler, ReactNode } from 'react';
import { splitProps } from '~/utils/splitProps';
import type { BoxProps } from '../Box';
import { Checkbox } from '../Checkbox';
import { Label } from '../Label';

export type CheckboxInputProps = Omit<
  BoxProps,
  keyof CheckboxInputVariantProps
> &
  CheckboxInputVariantProps & {
    name: string;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    id?: string;
    error?: boolean;
    children?: string | ReactNode;
    disabled?: boolean;
  };

export const CheckboxInput = (props: CheckboxInputProps) => {
  const {
    name,
    checked,
    onChange,
    id,
    error,
    children,
    disabled,
    indeterminate,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
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
      />
      {children}
    </Label>
  );
};
