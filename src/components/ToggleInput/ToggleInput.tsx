import { FC, ReactNode } from 'react';
import { type BoxProps } from '../Box';
import {
  toggleInput,
  type ToggleInputVariantProps,
} from '@styled-system/recipes';
import { splitProps } from '~/utils/splitProps';
import { Label } from '../Label';
import { cx } from '@styled-system/css';
import { Toggle } from '../Toggle';

export type ToggleInputProps = BoxProps &
  ToggleInputVariantProps & {
    name: string;
    id?: string;
    error?: boolean;
    children?: string | ReactNode;
  };

export const ToggleInput: FC<ToggleInputProps> = ({
  name,
  id,
  children,
  error,
  ...props
}: ToggleInputProps) => {
  const [className, otherProps] = splitProps(props);
  return (
    <Label
      className={cx(toggleInput({}), className)}
      {...otherProps}
      htmlFor={id}
    >
      <Toggle
        id={id}
        name={name}
        {...(error && { 'data-error': true })}
        {...props}
      />
      {children && <div>{children}</div>}
    </Label>
  );
};

// export default ToggleInput;
