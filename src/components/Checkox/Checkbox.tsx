import { Box, type BoxProps } from '../Box';
import { checkbox, type CheckboxVariantProps } from '@styled-system/recipes';
import { Icon } from '../Icon';
import { ChangeEventHandler } from 'react';

export type CheckboxProps = {
  /** Form field name */
  name: string;
  /** Controlled checked state (REQUIRED) */
  checked: boolean;
  /** Change handler (REQUIRED) */
  onChange: ChangeEventHandler<HTMLInputElement>;
  /** Unique identifier for the checkbox */
  id?: string;
  /** Display indeterminate state (partially checked) */
  indeterminate?: boolean;
  /** Disable the checkbox */
  disabled?: boolean;
  /** Display error state */
  error?: boolean;
} & Omit<BoxProps, 'checked' | 'onChange' | keyof CheckboxVariantProps> &
  CheckboxVariantProps;

/**
 * Helper type for checkbox change events
 * @example
 * const handleChange: CheckboxChangeHandler = (e) => setChecked(e.target.checked);
 */
export type CheckboxChangeEvent = React.ChangeEvent<HTMLInputElement>;

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

export const Checkbox: React.FC<CheckboxProps> = ({
  indeterminate,
  error,
  id,
  name,
  checked,
  onChange,
  ...props
}) => {
  const { container, input, indicator } = checkbox({});

  // Determine which icon to render based on state
  const iconName = indeterminate
    ? 'checkbox-indeterminate'
    : checked
      ? 'checkbox-checked'
      : 'checkbox';

  return (
    <Box className={container} {...(error && { 'data-error': true })}>
      <Box
        as="input"
        type="checkbox"
        className={input}
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
        {...(indeterminate && { 'data-indeterminate': true })}
        {...(error && { 'data-error': true })}
        {...props}
      />
      <Icon className={indicator} name={iconName} />
      <Icon className={indicator} name="checkbox-focus" />
    </Box>
  );
};
