import { cx } from '@styled-system/css';
import { type RadioVariantProps, radio } from '@styled-system/recipes';
import type { ChangeEvent } from 'react';

import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';
import { Icon } from '../Icon';

export type RadioProps = Omit<
  BoxProps,
  'checked' | 'onChange' | keyof RadioVariantProps
> &
  RadioVariantProps & {
    name: string;
    checked: boolean;
    onChange: RadioChangeHandler;
    id?: string;
    error?: boolean;
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
  const {
    name,
    checked,
    onChange,
    id,
    error,
    disabled,
    container,
    input,
    indicator,
    radioBg,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = radio({
    container,
    input,
    indicator,
    radioBg,
  });

  // Determine which icon to render based on state
  const iconName = checked ? 'radio-checked' : 'radio';

  return (
    <Box
      className={cx(classes.container, className)}
      {...(error && { 'data-error': true })}
    >
      <Box
        as="input"
        type="radio"
        className={classes.input}
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...(error && { 'data-error': true })}
        {...otherProps}
      />
      <Icon className={classes.radioBg} name="circle" />
      <Icon className={classes.indicator} name={iconName} />
      <Icon className={classes.indicator} name="radio-focus" />
    </Box>
  );
};
