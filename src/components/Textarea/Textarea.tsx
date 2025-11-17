import { Box, type BoxProps } from '~/components/Box';
import { textarea, type TextareaVariantProps } from '@styled-system/recipes';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';

export type TextareaProps = Omit<BoxProps, keyof TextareaVariantProps> &
  TextareaVariantProps & {
    name: string;
    autoSize?: boolean;
    error?: boolean;
    disabled?: boolean;
    id?: string;
  };

export const Textarea: React.FC<TextareaProps> = ({
  error,
  autoSize = false,
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
      className={cx(textarea({ autoGrow: autoSize }), className)}
      {...otherProps}
    ></Box>
  );
};

Textarea.displayName = 'Textarea';
