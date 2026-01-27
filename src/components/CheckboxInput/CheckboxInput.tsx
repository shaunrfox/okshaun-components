import { splitProps } from '~/utils/splitProps';
import type { ReactNode, ChangeEventHandler } from 'react';
import { cx } from '@styled-system/css';
import { type BoxProps } from '../Box';
import { Label } from '../Label';
import { Checkbox } from '../Checkbox';
import {
  checkboxInput,
  type CheckboxInputVariantProps,
} from '@styled-system/recipes';

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
