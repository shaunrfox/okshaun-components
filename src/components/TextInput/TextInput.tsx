import { cx } from '@styled-system/css';
import { type TextinputVariantProps, textinput } from '@styled-system/recipes';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box/Box';

export type TextInputProps = Omit<BoxProps, keyof TextinputVariantProps> &
  TextinputVariantProps & {
    name: string;
    autoSize?: boolean;
    error?: boolean;
    disabled?: boolean;
    id?: string;
  };

export const TextInput = (props: TextInputProps) => {
  const { size, error, autoSize = false, id, name, disabled, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  return (
    <Box
      as="input"
      id={id}
      name={name}
      {...(error && { 'data-error': true })}
      aria-disabled={disabled}
      className={cx(textinput({ size, autoSize }), className)}
      {...otherProps}
    />
  );
};
