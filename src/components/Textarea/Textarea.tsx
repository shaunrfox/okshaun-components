import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '~/components/Box';
import { textarea, type TextareaVariantProps } from '@styled-system/recipes';

export type TextareaProps = Omit<BoxProps, keyof TextareaVariantProps> &
  TextareaVariantProps & {
    name: string;
    autoSize?: boolean;
    error?: boolean;
    disabled?: boolean;
    id?: string;
  };

export const Textarea = (props: TextareaProps) => {
  const { size, error, autoSize = false, id, name, disabled, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  return (
    <Box
      as="textarea"
      id={id}
      name={name}
      {...(error && { 'data-error': true })}
      aria-disabled={disabled}
      className={cx(textarea({ size, autoSize }), className)}
      {...otherProps}
    />
  );
};
