import { cx } from '@styled-system/css';
import {
  type RadioInputVariantProps,
  radioInput,
} from '@styled-system/recipes';
import type { ChangeEventHandler, ReactNode } from 'react';
import { splitProps } from '~/utils/splitProps';
import type { BoxProps } from '../Box';
import { Label } from '../Label';
import { Radio } from '../Radio/Radio';

export type RadioInputProps = Omit<BoxProps, keyof RadioInputVariantProps> &
  RadioInputVariantProps & {
    name: string;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    id?: string;
    error?: boolean;
    children?: string | ReactNode;
    disabled?: boolean;
  };

export const RadioInput = (props: RadioInputProps) => {
  const { name, checked, onChange, id, error, children, disabled, ...rest } =
    props;
  const [className, otherProps] = splitProps(rest);
  return (
    <Label
      className={cx(radioInput(), className)}
      {...otherProps}
      htmlFor={id}
      disabled={disabled}
    >
      <Radio
        id={id}
        name={name}
        error={error}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {children}
    </Label>
  );
};
