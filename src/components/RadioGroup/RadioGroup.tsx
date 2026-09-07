import { cx } from '@styled-system/css';
import type { ReactNode } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { useControllableState } from '~/system/hooks';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';
import { RadioGroupContext } from './RadioGroupContext';

/** Props accepted by {@link RadioGroup}. */
export type RadioGroupProps = Omit<BoxProps, 'role'> & {
  /** Form field name shared by every radio in the group. */
  name: string;
  /** Selected value when the group is controlled. */
  value?: string | null;
  /** Initial selected value when the group is uncontrolled. */
  defaultValue?: string | null;
  /** Called with the newly selected value. */
  onChange?: (value: string) => void;
  /** Radio inputs belonging to the group. */
  children: ReactNode;
  /** Accessible name announced for the group. */
  label?: string;
  /** Identifier for the group element. */
  id?: string;
  /** Disables every radio in the group. */
  disabled?: boolean;
};

/**
 * Groups radio inputs so that only one may be selected at a time.
 *
 * The group owns the selected value and renders with `role="radiogroup"`, so
 * give it a `label` whenever no visible heading names it. Works controlled
 * through `value` or uncontrolled through `defaultValue`.
 *
 * @example
 * ```tsx
 * <RadioGroup name="plan" label="Plan" defaultValue="monthly">
 *   <RadioInput value="monthly" label="Monthly" />
 *   <RadioInput value="annual" label="Annual" />
 * </RadioGroup>
 * ```
 */
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
        {...dsComponent('RadioGroup')}
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
            border="[0]"
          >
            {label}
          </Box>
        )}
        {children}
      </Box>
    </RadioGroupContext.Provider>
  );
};
