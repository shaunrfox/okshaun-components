import { cx } from '@styled-system/css';
import type { ReactNode } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { useControllableState } from '~/system/hooks';
import { splitProps } from '~/utils/splitProps';

import { RadioGroupContext } from './RadioGroupContext';

export type RadioGroupProps = Omit<BoxProps, 'role'> & {
  name: string;
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string) => void;
  children: ReactNode;
  label?: string;
  id?: string;
  disabled?: boolean;
};

export const RadioGroup = (props: RadioGroupProps) => {
  const {
    name,
    value,
    defaultValue = null,
    onChange,
    children,
    label,
    id,
    disabled,
    className,
    ...rest
  } = props;
  const [stylesClassName, otherProps] = splitProps(rest);
  const [resolvedValue, setResolvedValue] = useControllableState({
    value,
    defaultValue,
    onChange: (nextValue) => {
      if (nextValue !== null) {
        onChange?.(nextValue);
      }
    },
  });

  return (
    <RadioGroupContext.Provider
      value={{
        name,
        value: resolvedValue,
        disabled,
        onChange: setResolvedValue,
      }}
    >
      <Box
        className={cx(stylesClassName, className)}
        role="radiogroup"
        aria-label={label && !id ? label : undefined}
        aria-labelledby={id && label ? `${id}-label` : undefined}
        id={id}
        aria-disabled={disabled || undefined}
        data-disabled={disabled || undefined}
        {...otherProps}
      >
        {id && label && (
          <Box
            as="span"
            id={`${id}-label`}
            position="absolute"
            width="0"
            height="0"
            padding="0"
            margin="0"
            overflow="hidden"
            clipPath="inset(50%)"
            whiteSpace="nowrap"
            border="0"
          >
            {label}
          </Box>
        )}
        {children}
      </Box>
    </RadioGroupContext.Provider>
  );
};
