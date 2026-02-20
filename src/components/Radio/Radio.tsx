import { cx } from '@styled-system/css';
import { type RadioVariantProps, radio } from '@styled-system/recipes';
import type { ChangeEventHandler } from 'react';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
import { Icon } from '../Icon';

export type RadioProps = Omit<BoxProps, keyof RadioVariantProps> &
  RadioVariantProps & {
    name: string;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    id?: string;
    disabled?: boolean;
    error?: boolean;
  };

/**
 * Helper type for radio change events
 * @example
 * const handleChange: RadioChangeHandler = (e) => setChecked(e.target.checked);
 */
export type RadioChangeEvent = React.ChangeEvent<HTMLInputElement>;

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
  const { name, checked, onChange, id, disabled, error, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const { container, input, indicator } = radio({});

  // Determine which icon to render based on state
  const iconName = checked ? 'radio-checked' : 'radio';

  return (
    <Box
      className={cx(container, className)}
      {...(error && { 'data-error': true })}
      {...otherProps}
    >
      <Box
        as="input"
        type="radio"
        className={input}
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...(error && { 'data-error': true })}
      />
      <Icon className={indicator} name={iconName} />
      <Icon className={indicator} name={'radio-focus'} />
    </Box>
  );
};
