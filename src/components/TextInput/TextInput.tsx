import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box/Box';
import { textinput, type TextinputVariantProps } from '@styled-system/recipes';

export type TextInputProps = Omit<BoxProps, keyof TextinputVariantProps> &
  TextinputVariantProps & {
    name: string;
    error?: boolean;
    id?: string;
  };

export const TextInput: React.FC<TextInputProps> = ({
  size,
  error,
  id,
  name,
  disabled,
  ...props
}: TextInputProps) => {
  const [className, otherProps] = splitProps(props);
  return (
    <Box
      as="input"
      id={id}
      name={name}
      {...(error && { 'data-error': true })}
      aria-disabled={disabled}
      className={cx(textinput({ size }), className)}
      {...otherProps}
    />
  );
};
