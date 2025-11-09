import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box/Box';
import { textinput, type TextinputVariantProps } from '@styled-system/recipes';
import { cx } from '@styled-system/css';
import { AriaAttributes } from 'react';

export type TextInputProps = Omit<BoxProps, keyof TextinputVariantProps> &
  TextinputVariantProps & {
    name: string;
    error?: boolean;
    id?: string;
    'aria-describedby'?: string;
  } & AriaAttributes;

export const TextInput: React.FC<TextInputProps> = ({
  size,
  error,
  autoSize = false,
  id,
  name,
  'aria-describedby': ariaDescribedBy,
  ...props
}: TextInputProps) => {
  const [className, otherProps] = splitProps(props);
  return (
    <Box
      as="input"
      id={id}
      aria-label={name}
      aria-invalid={error || undefined}
      aria-describedby={ariaDescribedBy}
      {...(error && { 'data-error': true })}
      className={cx(textinput({ size, autoSize }), className)}
      {...otherProps}
    />
  );
};
