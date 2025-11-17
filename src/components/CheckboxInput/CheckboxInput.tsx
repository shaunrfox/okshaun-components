import { splitProps } from '~/utils/splitProps';
import type { FC, ReactNode } from 'react';
import { cx } from '@styled-system/css';
import { type BoxProps } from '../Box';
import { Label } from '../Label';
import { Checkbox } from '../Checkbox/Checkbox';
import {
  checkboxInput,
  type CheckboxInputVariantProps,
} from '@styled-system/recipes';
import { Text } from '../Text';

export type CheckboxInputProps = BoxProps &
  CheckboxInputVariantProps & {
    name: string;
    id?: string;
    error?: boolean;
    children?: string | ReactNode;
  };

export const CheckboxInput: FC<CheckboxInputProps> = ({
  id,
  name,
  children,
  error,
  indeterminate,
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
        labelledby={id ? `${id}-description` : undefined}
        {...(error && { 'data-error': true })}
        {...(indeterminate && { 'data-indeterminate': true })}
        {...props}
      />
      {children && (
        <Text as="span" id={`${id}-description`}>
          {children}
        </Text>
      )}
    </Label>
  );
};

export default CheckboxInput;
