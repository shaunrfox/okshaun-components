import { cx } from '@styled-system/css';
import { type CheckboxVariantProps, checkbox } from '@styled-system/recipes';
import type { ChangeEvent } from 'react';
import { useEffect, useRef } from 'react';

import { useFieldContext } from '~/system/context/FieldContext';
import { mergeAriaDescribedBy } from '~/utils/mergeAriaDescribedBy';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';
import { Icon } from '../Icon';

export type CheckboxProps = Omit<
  BoxProps,
  'checked' | 'onChange' | keyof CheckboxVariantProps
> &
  CheckboxVariantProps & {
    name: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: CheckboxChangeHandler;
    id?: string;
    error?: boolean;
    invalid?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
  };

/**
 * Helper type for checkbox change events
 * @example
 * const handleChange: CheckboxChangeHandler = (e) => setChecked(e.target.checked);
 */
export type CheckboxChangeEvent = ChangeEvent<HTMLInputElement>;

/**
 * Helper type for checkbox change handler functions
 * @example
 * const handleChange: CheckboxChangeHandler = (e) => setChecked(e.target.checked);
 */
export type CheckboxChangeHandler = (e: CheckboxChangeEvent) => void;

/**
 * Checkbox is a controlled component.
 * You must pass `checked` and `onChange` props.
 *
 * @example
 * const [checked, setChecked] = useState(false);
 * <Checkbox
 *   checked={checked}
 *   onChange={(e) => setChecked(e.target.checked)}
 * />
 */

export const Checkbox = (props: CheckboxProps) => {
  const fieldContext = useFieldContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    name,
    checked,
    defaultChecked,
    onChange,
    id,
    indeterminate,
    disabled,
    error,
    invalid,
    container,
    input,
    indicator,
    checkBg,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const resolvedDisabled = disabled ?? fieldContext?.disabled;
  const resolvedError = error ?? fieldContext?.error;
  const resolvedInvalid = invalid ?? fieldContext?.invalid;
  const visualError = resolvedError || resolvedInvalid;
  const classes = checkbox({
    container,
    input,
    indicator,
    checkBg,
  });
  const { 'aria-describedby': ariaDescribedBy, ...inputProps } =
    otherProps as typeof otherProps & { 'aria-describedby'?: string };
  const describedBy = mergeAriaDescribedBy(
    fieldContext?.describedBy,
    ariaDescribedBy,
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  const checkboxStateProps =
    checked !== undefined ? { checked } : { defaultChecked };

  return (
    <Box
      className={cx(classes.container, className)}
      aria-invalid={visualError || undefined}
      data-error={visualError || undefined}
      data-invalid={resolvedInvalid || undefined}
    >
      <Box
        as="input"
        ref={inputRef}
        type="checkbox"
        className={classes.input}
        name={name}
        id={id}
        onChange={onChange}
        disabled={resolvedDisabled}
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-invalid={visualError || undefined}
        data-indeterminate={indeterminate || undefined}
        data-error={visualError || undefined}
        data-invalid={resolvedInvalid || undefined}
        aria-describedby={describedBy}
        {...checkboxStateProps}
        {...inputProps}
      />
      <Icon className={classes.checkBg} name="square" />
      <Icon className={classes.indicator} name="checkbox" aria-hidden />
      <Icon className={classes.indicator} name="checkbox-checked" aria-hidden />
      <Icon
        className={classes.indicator}
        name="checkbox-indeterminate"
        aria-hidden
      />
      <Icon className={classes.indicator} name="checkbox-focus" />
    </Box>
  );
};
