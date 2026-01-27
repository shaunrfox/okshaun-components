import type { ReactNode, ChangeEventHandler } from 'react';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { type BoxProps } from '../Box';
import { Label } from '../Label';
import { Toggle } from '../Toggle';
import {
  toggleInput,
  type ToggleInputVariantProps,
} from '@styled-system/recipes';

export type ToggleInputProps = Omit<BoxProps, keyof ToggleInputVariantProps> &
  ToggleInputVariantProps & {
    name: string;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    id?: string;
    error?: boolean;
    children?: string | ReactNode;
    disabled?: boolean;
  };

export const ToggleInput = (props: ToggleInputProps) => {
  const { name, checked, onChange, id, error, children, disabled, ...rest } =
    props;
  const [className, otherProps] = splitProps(rest);
  return (
    <Label
      className={cx(toggleInput(), className)}
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
      />
      {children}
    </Label>
  );
};
