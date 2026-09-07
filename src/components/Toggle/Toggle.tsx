import { cx } from '@styled-system/css';
import { type ToggleVariantProps, toggle } from '@styled-system/recipes';
import type { ChangeEvent } from 'react';
import { useFieldContext } from '~/system/context/FieldContext';
import { dsComponent } from '~/utils/dsComponent';
import { mergeAriaDescribedBy } from '~/utils/mergeAriaDescribedBy';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
import { Icon } from '../Icon';

export type ToggleProps = Omit<
  BoxProps,
  'checked' | 'onChange' | keyof ToggleVariantProps
> &
  ToggleVariantProps & {
    name: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: ToggleChangeHandler;
    id?: string;
    error?: boolean;
    invalid?: boolean;
    disabled?: boolean;
  };

/**
 * Helper type for toggle change events
 * @example
 * const handleChange: ToggleChangeHandler = (e) => setChecked(e.target.checked);
 */
export type ToggleChangeEvent = ChangeEvent<HTMLInputElement>;

/**
 * Helper type for toggle change handler functions
 * @example
 * const handleChange: ToggleChangeHandler = (e) => setChecked(e.target.checked);
 */
export type ToggleChangeHandler = (e: ToggleChangeEvent) => void;

/**
 * Toggle is a controlled component.
 * You must pass `checked` and `onChange` props.
 *
 * @example
 * const [checked, setChecked] = useState(false);
 * <Toggle
 *   checked={checked}
 *   onChange={(e) => setChecked(e.target.checked)}
 * />
 */

export const Toggle = (props: ToggleProps) => {
  const fieldContext = useFieldContext();
  const {
    name,
    checked,
    defaultChecked,
    onChange,
    id,
    error,
    invalid,
    disabled,
    container,
    input,
    indicator,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const resolvedDisabled = disabled ?? fieldContext?.disabled;
  const resolvedError = error ?? fieldContext?.error;
  const resolvedInvalid = invalid ?? fieldContext?.invalid;
  const visualError = resolvedError || resolvedInvalid;
  const classes = toggle({
    container,
    input,
    indicator,
  });
  const { 'aria-describedby': ariaDescribedBy, ...inputProps } =
    otherProps as typeof otherProps & { 'aria-describedby'?: string };
  const describedBy = mergeAriaDescribedBy(
    fieldContext?.describedBy,
    ariaDescribedBy,
  );
  const toggleStateProps =
    checked !== undefined ? { checked } : { defaultChecked };

  return (
    <Box
      {...dsComponent('Toggle')}
      className={cx(classes.container, className)}
      aria-invalid={visualError || undefined}
      data-error={visualError || undefined}
      data-invalid={resolvedInvalid || undefined}
    >
      <Box
        as="input"
        type="checkbox"
        className={classes.input}
        name={name}
        id={id}
        onChange={onChange}
        disabled={resolvedDisabled}
        aria-invalid={visualError || undefined}
        data-error={visualError || undefined}
        data-invalid={resolvedInvalid || undefined}
        aria-describedby={describedBy}
        {...toggleStateProps}
        {...inputProps}
      />
      <Icon className={classes.indicator} name="circle" aria-hidden />
      <Icon className={classes.indicator} name="circle-check" aria-hidden />
    </Box>
  );
};
