import { cx } from '@styled-system/css';
import {
  type ToggleInputVariantProps,
  toggleInput,
} from '@styled-system/recipes';
import { type ReactNode, useId } from 'react';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';
import type { BoxProps } from '../Box';
import { Label } from '../Label';
import type { ToggleChangeHandler } from '../Toggle';
import { Toggle } from '../Toggle';

/** Props for {@link ToggleInput}, a labelled {@link Toggle}. */
export type ToggleInputProps = Omit<BoxProps, keyof ToggleInputVariantProps> &
  ToggleInputVariantProps & {
    name: string;
    checked?: boolean;
    /** @default false */
    defaultChecked?: boolean;
    onChange?: ToggleChangeHandler;
    id?: string;
    error?: boolean;
    invalid?: boolean;
    disabled?: boolean;
    children?: string | ReactNode;
  };

/**
 * A toggle paired with a clickable label.
 *
 * Use it for binary settings with a visible text label. It generates an ID when
 * needed and associates that ID with the label. Its state and field-context
 * precedence match {@link Toggle}.
 *
 * @example
 * ```tsx
 * <ToggleInput name="emailUpdates" defaultChecked>
 *   Email updates
 * </ToggleInput>
 * ```
 */
export const ToggleInput = (props: ToggleInputProps) => {
  const {
    name,
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
  return (
    <Label
      {...dsComponent('ToggleInput')}
      className={cx(toggleInput({}), className)}
      htmlFor={resolvedId}
      error={error}
      disabled={disabled}
      {...otherProps}
    >
      <Toggle
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        id={resolvedId}
        error={error}
        invalid={invalid}
        disabled={disabled}
      />
      {children}
    </Label>
  );
};
