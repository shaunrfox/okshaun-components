import { cx } from '@styled-system/css';
import { type TextInputVariantProps, textInput } from '@styled-system/recipes';

import { Icon, type IconNamesList } from '~/components/Icon';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box/Box';

export type TextInputProps = Omit<BoxProps, keyof TextInputVariantProps> &
  Omit<TextInputVariantProps, 'iconBefore' | 'iconAfter'> & {
    name: string;
    id?: string;
    iconBefore?: IconNamesList;
    iconAfter?: IconNamesList;
    error?: boolean;
    disabled?: boolean;
    type?:
      | 'text'
      | 'number'
      | 'email'
      | 'password'
      | 'search'
      | 'tel'
      | 'url'
      | 'date'
      | 'time'
      | 'datetime-local'
      | 'month'
      | 'week';
  };

export const TextInput = (props: TextInputProps) => {
  const {
    name,
    id,
    iconBefore,
    iconAfter,
    error,
    disabled,
    type = 'text',
    size,
    autoSize = false,
    autoComplete = 'off',
    ...rest
  } = props;
  const classes = textInput({
    size,
    iconBefore: Boolean(iconBefore),
    iconAfter: Boolean(iconAfter),
    autoSize,
  });
  const [className, otherProps] = splitProps(rest);
  return (
    <Box
      className={cx(classes.container, className)}
      aria-disabled={disabled}
      data-disabled={disabled || undefined}
      data-error={error}
    >
      {iconBefore && <Icon name={iconBefore} className={classes.icon} />}
      <Box
        as="input"
        id={id}
        name={name}
        type={type}
        disabled={disabled}
        data-error={error}
        className={cx(classes.input, className)}
        autoComplete={autoComplete}
        {...otherProps}
      />
      {iconBefore && iconAfter
        ? ''
        : iconAfter && <Icon name={iconAfter} className={classes.icon} />}
    </Box>
  );
};
