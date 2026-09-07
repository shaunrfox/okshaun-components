import { cx } from '@styled-system/css';
import {
  type CheckboxInputVariantProps,
  checkboxInput,
} from '@styled-system/recipes';
import { type ReactNode, useId } from 'react';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';
import type { BoxProps } from '../Box';
import type { CheckboxChangeHandler } from '../Checkbox';
import { Checkbox } from '../Checkbox';
import { Label } from '../Label';

export type CheckboxInputProps = Omit<
  BoxProps,
  keyof CheckboxInputVariantProps
> &
  CheckboxInputVariantProps & {
    name: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: CheckboxChangeHandler;
    id?: string;
    error?: boolean;
    invalid?: boolean;
    children?: string | ReactNode;
    disabled?: boolean;
  };

export const CheckboxInput = (props: CheckboxInputProps) => {
  const {
    name,
    checked,
    defaultChecked,
    onChange,
    id,
    children,
    error,
    invalid,
    disabled,
    indeterminate,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const generatedId = useId();
  const resolvedId = id ?? generatedId;
  return (
    <Label
      {...dsComponent('CheckboxInput')}
      className={cx(checkboxInput(), className)}
      htmlFor={resolvedId}
      disabled={disabled}
      {...otherProps}
    >
      <Checkbox
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        id={resolvedId}
        error={error}
        invalid={invalid}
        disabled={disabled}
        indeterminate={indeterminate}
      />
      {children}
    </Label>
  );
};
