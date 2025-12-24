import { Box, type BoxProps } from '../Box';
import { toggle, type ToggleVariantProps } from '@styled-system/recipes';
import { Icon } from '../Icon';
import { ChangeEventHandler } from 'react';

export type ToggleProps = {
  /** Form field name */
  name: string;
  /** Controlled checked state (REQUIRED) */
  checked: boolean;
  /** Change handler (REQUIRED) */
  onChange: ChangeEventHandler<HTMLInputElement>;
  /** Unique identifier for the toggle */
  id?: string;
  /** Disable the toggle */
  disabled?: boolean;
  /** Display error state */
  error?: boolean;
} & Omit<BoxProps, 'checked' | 'onChange' | keyof ToggleVariantProps> &
  ToggleVariantProps;

/**
 * Helper type for toggle change events
 * @example
 * const handleChange: ToggleChangeHandler = (e) => setChecked(e.target.checked);
 */
export type ToggleChangeEvent = React.ChangeEvent<HTMLInputElement>;

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
 *   name="notifications"
 *   checked={checked}
 *   onChange={(e) => setChecked(e.target.checked)}
 * />
 */
export const Toggle: React.FC<ToggleProps> = ({
  name,
  id,
  checked,
  onChange,
  disabled,
  error,
  ...props
}) => {
  const { container, input, indicator, background } = toggle({});

  return (
    <Box
      className={container}
      {...(disabled && { 'data-disabled': true })}
      {...(error && { 'data-error': true })}
    >
      <Box
        as="input"
        type="checkbox"
        name={name}
        id={id}
        aria-label={name}
        className={input}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...(error && { 'data-error': true })}
        {...props}
      />
      <Box as="span" className={background} name={'toggle-bg'} />
      <Icon name={'circle'} className={indicator} />
      <Icon name={'circle-check'} className={indicator} />
    </Box>
  );
};
