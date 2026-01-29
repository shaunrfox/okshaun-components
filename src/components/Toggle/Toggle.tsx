import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
import { toggle, type ToggleVariantProps } from '@styled-system/recipes';
import { Icon } from '../Icon';
import { ChangeEventHandler } from 'react';

export type ToggleProps = Omit<
  BoxProps,
  'checked' | 'onChange' | keyof ToggleVariantProps
> &
  ToggleVariantProps & {
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
  };

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
export const Toggle = (props: ToggleProps) => {
  const { name, id, checked, onChange, disabled, error, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const { container, input, indicator, background } = toggle({});

  return (
    <Box
      className={cx(container, className)}
      {...(disabled && { 'data-disabled': true })}
      {...(error && { 'data-error': true })}
      {...otherProps}
    >
      <Box
        as="input"
        type="checkbox"
        className={input}
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...(error && { 'data-error': true })}
      />
      <Box as="span" className={background} name={'toggle-bg'} />
      <Icon name={'circle'} className={indicator} />
      <Icon name={'circle-check'} className={indicator} />
    </Box>
  );
};
