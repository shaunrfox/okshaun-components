import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '~/components/Box';
import { textarea, type TextareaVariantProps } from '@styled-system/recipes';

export type TextareaProps = Omit<BoxProps, keyof TextareaVariantProps> &
  TextareaVariantProps & {
    name: string;
    error?: boolean;
    id?: string;
  };

export const Textarea: React.FC<TextareaProps> = ({
  size,
  error,
  id,
  name,
  disabled,
  ...props
}: TextareaProps) => {
  const [className, otherProps] = splitProps(props);
  return (
    <Box
      as="textarea"
      id={id}
      name={name}
      {...(error && { 'data-error': true })}
      aria-disabled={disabled}
      className={cx(textarea({ size }), className)}
      {...otherProps}
    />
  );
};
