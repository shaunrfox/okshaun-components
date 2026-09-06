import { cx } from '@styled-system/css';
import {
  type RadioInputVariantProps,
  radioInput,
} from '@styled-system/recipes';
import { type ReactNode, useId } from 'react';

import { useRadioGroup } from '~/components/RadioGroup';
import { splitProps } from '~/utils/splitProps';

import type { BoxProps } from '../Box';
import { Label } from '../Label';
import type { RadioChangeHandler } from '../Radio';
import { Radio } from '../Radio';

export type RadioInputProps = Omit<BoxProps, keyof RadioInputVariantProps> &
  RadioInputVariantProps & {
    name?: string;
    value?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: RadioChangeHandler;
    id?: string;
    error?: boolean;
    invalid?: boolean;
    children?: string | ReactNode;
    disabled?: boolean;
  };

export const RadioInput = (props: RadioInputProps) => {
  const groupContext = useRadioGroup();
  const {
    name,
    value,
    checked,
    defaultChecked,
    onChange,
    id,
    children,
    error,
    invalid,
    disabled,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const generatedId = useId();
  const resolvedId = id ?? generatedId;
  const isGrouped = Boolean(groupContext && value !== undefined);
  const resolvedName = isGrouped ? groupContext.name : name;
  const resolvedChecked = isGrouped ? groupContext.value === value : checked;
  const resolvedDisabled = disabled ?? groupContext?.disabled;
  const handleChange: RadioChangeHandler | undefined = isGrouped
    ? (event) => {
        onChange?.(event);
        if (value !== undefined) {
          groupContext.onChange(value);
        }
      }
    : onChange;
  return (
    <Label
      className={cx(radioInput(), className)}
      htmlFor={resolvedId}
      disabled={resolvedDisabled}
      {...otherProps}
    >
      <Radio
        name={resolvedName}
        checked={resolvedChecked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        id={resolvedId}
        error={error}
        invalid={invalid}
        disabled={resolvedDisabled}
      />
      {children}
    </Label>
  );
};
