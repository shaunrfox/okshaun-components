import { Box, type BoxProps } from '../Box';
import { Label } from '../Label';
import { checkbox, type CheckboxVariantProps } from '@styled-system/recipes';
import { Icon } from '../Icon';
import { type AriaAttributes } from 'react';

export type CheckboxProps = Omit<BoxProps, keyof CheckboxVariantProps> &
  CheckboxVariantProps & {
    name: string;
    indeterminate?: boolean;
    disabled?: boolean;
    error?: boolean;
    id?: string;
  } & AriaAttributes;

export const Checkbox: React.FC<CheckboxProps> = ({
  indeterminate,
  error,
  id,
  name,
  ...props
}) => {
  const { container, input, indicator } = checkbox({});

  return (
    <Label
      className={container}
      color={error ? 'red.50' : { base: 'gray.90', _dark: 'gray.0' }}
    >
      <Box
        as="input"
        type="checkbox"
        className={input}
        name={name}
        id={id}
        aria-label={name}
        {...props}
        {...(indeterminate && { 'data-indeterminate': true })}
        {...(error && { 'data-error': true })}
      />
      <Icon className={indicator} name={'checkbox'} />
      <Icon className={indicator} name={'checkbox-checked'} />
      <Icon className={indicator} name={'checkbox-indeterminate'} />
      <Icon className={indicator} name={'checkbox-focus'} />
    </Label>
  );
};
