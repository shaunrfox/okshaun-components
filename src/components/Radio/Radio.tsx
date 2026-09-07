import { cx } from '@styled-system/css';
import { type RadioVariantProps, radio } from '@styled-system/recipes';
import type { ChangeEvent } from 'react';
import { useFieldContext } from '~/system/context/FieldContext';
import { dsComponent } from '~/utils/dsComponent';
import { mergeAriaDescribedBy } from '~/utils/mergeAriaDescribedBy';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
import { Icon } from '../Icon';

export type RadioProps = Omit<
  BoxProps,
  'checked' | 'onChange' | keyof RadioVariantProps
> &
  RadioVariantProps & {
    name?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: RadioChangeHandler;
    id?: string;
    error?: boolean;
    invalid?: boolean;
    disabled?: boolean;
  };

/**
 * Helper type for radio change events
 * @example
 * const handleChange: RadioChangeHandler = (e) => setChecked(e.target.checked);
 */
export type RadioChangeEvent = ChangeEvent<HTMLInputElement>;

/**
 * Helper type for radio change handler functions
 * @example
 * const handleChange: RadioChangeHandler = (e) => setChecked(e.target.checked);
 */
export type RadioChangeHandler = (e: RadioChangeEvent) => void;

/**
 * Radio is a controlled component.
 * You must pass `checked` and `onChange` props.
 *
 * @example
 * const [checked, setChecked] = useState(false);
 * <Radio
 *   checked={checked}
 *   onChange={(e) => setChecked(e.target.checked)}
 * />
 */
export const Radio = (props: RadioProps) => {
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
    radioBg,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const resolvedDisabled = disabled ?? fieldContext?.disabled;
  const resolvedError = error ?? fieldContext?.error;
  const resolvedInvalid = invalid ?? fieldContext?.invalid;
  const visualError = resolvedError || resolvedInvalid;
  const classes = radio({
    container,
    input,
    indicator,
    radioBg,
  });
  const { 'aria-describedby': ariaDescribedBy, ...inputProps } =
    otherProps as typeof otherProps & { 'aria-describedby'?: string };
  const describedBy = mergeAriaDescribedBy(
    fieldContext?.describedBy,
    ariaDescribedBy,
  );
  const radioStateProps =
    checked !== undefined ? { checked } : { defaultChecked };

  return (
    <Box
      {...dsComponent('Radio')}
      className={cx(classes.container, className)}
      aria-invalid={visualError || undefined}
      data-error={visualError || undefined}
      data-invalid={resolvedInvalid || undefined}
    >
      <Box
        as="input"
        type="radio"
        className={classes.input}
        name={name}
        id={id}
        onChange={onChange}
        disabled={resolvedDisabled}
        aria-invalid={visualError || undefined}
        data-error={visualError || undefined}
        data-invalid={resolvedInvalid || undefined}
        aria-describedby={describedBy}
        {...radioStateProps}
        {...inputProps}
      />
      <Icon className={classes.radioBg} name="circle" />
      <Icon className={classes.indicator} name="radio" aria-hidden />
      <Icon className={classes.indicator} name="radio-checked" aria-hidden />
      <Icon className={classes.indicator} name="radio-focus" />
    </Box>
  );
};
