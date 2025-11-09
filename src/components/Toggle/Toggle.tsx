import { Box, type BoxProps } from '../Box';
import { toggle, type ToggleVariantProps } from '@styled-system/recipes';
import { Icon } from '../Icon';
import { Label } from '../Label';
import React from 'react';

export type ToggleProps = Omit<BoxProps, keyof ToggleVariantProps> &
  ToggleVariantProps & {
    name: string;
    id?: string;
    error?: boolean;
    disabled?: boolean;
  };

export const Toggle: React.FC<ToggleProps> = ({
  name,
  id,
  error,
  disabled,
  checked,
  ...props
}: ToggleProps) => {
  const { container, input, indicator, background } = toggle({});
  return (
    <Label
      className={container}
      {...(disabled && { 'data-disabled': true })}
      color={{ base: 'gray.90', _dark: 'gray.0' }}
    >
      <Box
        as="input"
        type="checkbox"
        name={name}
        id={id}
        aria-label={name}
        className={input}
        {...(checked ? { 'data-checked': true } : {})}
        {...(error ? { 'data-error': true } : {})}
        {...props}
      />
      <Box as="span" className={background} name={'toggle-bg'} />
      <Icon name={'circle'} className={indicator} />
      <Icon
        name={'circle-check'}
        className={indicator}
        fill={{ _dark: 'gray.90' }}
      />
    </Label>
  );
};
