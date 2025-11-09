import type { FC, ReactNode } from 'react';
import { Box, type BoxProps } from '../Box';
import { Label } from '../Label';
import { Checkbox } from '../Checkbox/Checkbox';

export type CheckboxInputProps = BoxProps & {
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
  return (
    <Label htmlFor={id}>
      <Checkbox
        id={id}
        name={name}
        {...(error && { 'data-error': true })}
        {...(indeterminate && { 'data-indeterminate': true })}
        {...props}
      />
      {children && <Box as="span">{children}</Box>}
    </Label>
  );
};

export default CheckboxInput;
