import { cx } from '@styled-system/css';
import {
  type CheckboxInputVariantProps,
  checkboxInput,
} from '@styled-system/recipes';
import { type ReactNode, useId } from 'react';

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
    checked: boolean;
    onChange: CheckboxChangeHandler;
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
    children,
    error,
    disabled,
    indeterminate,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const generatedId = useId();
  const resolvedId = id ?? generatedId;
  return (
    <Label
      className={cx(checkboxInput(), className)}
      htmlFor={resolvedId}
      disabled={disabled}
      {...otherProps}
    >
      <Checkbox
        name={name}
        checked={checked}
        onChange={onChange}
        id={resolvedId}
        error={error}
        disabled={disabled}
        indeterminate={indeterminate}
      />
      {children}
    </Label>
  );
};
