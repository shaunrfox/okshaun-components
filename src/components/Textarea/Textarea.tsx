import { cx } from '@styled-system/css';
import { type TextareaVariantProps, textarea } from '@styled-system/recipes';
import { Box, type BoxProps } from '~/components/Box';
import { useFieldContext } from '~/system/context/FieldContext';
import { dsComponent } from '~/utils/dsComponent';
import { mergeAriaDescribedBy } from '~/utils/mergeAriaDescribedBy';
import { splitProps } from '~/utils/splitProps';

/** Props for {@link Textarea}, a multi-line native text input. */
export type TextareaProps = Omit<BoxProps, keyof TextareaVariantProps> &
  TextareaVariantProps & {
    /** Form field name submitted with the textarea value. */
    name: string;
    /**
     * Applies the recipe's content-sized visual treatment; it does not measure or resize the native element.
     * @default false
     */
    autoSize?: boolean;
    /** Applies error styling. The local value takes precedence over field context. */
    error?: boolean;
    /** Marks the native textarea invalid with `aria-invalid` and applies invalid styling. */
    invalid?: boolean;
    /** Disables the native textarea. The local value takes precedence over field context. */
    disabled?: boolean;
    /** Identifier used to associate a visible `Label` with this textarea. */
    id?: string;
  };

/**
 * Renders a multi-line native textarea.
 *
 * Use a `Label` or `FormField` to provide its accessible name. Local `size`,
 * error, invalid, and disabled values override matching field-context values.
 *
 * @example
 * ```tsx
 * <Textarea id="notes" name="notes" rows={4} />
 * ```
 */
export const Textarea = (props: TextareaProps) => {
  const fieldContext = useFieldContext();
  const {
    size,
    error,
    invalid,
    autoSize = false,
    id,
    name,
    disabled,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const { 'aria-describedby': ariaDescribedBy, ...textareaProps } =
    otherProps as typeof otherProps & { 'aria-describedby'?: string };
  const resolvedDisabled = disabled ?? fieldContext?.disabled;
  const resolvedError = error ?? fieldContext?.error;
  const resolvedInvalid = invalid ?? fieldContext?.invalid;
  const visualError = resolvedError || resolvedInvalid;
  const describedBy = mergeAriaDescribedBy(
    fieldContext?.describedBy,
    ariaDescribedBy,
  );
  return (
    <Box
      {...dsComponent('Textarea')}
      as="textarea"
      id={id}
      name={name}
      aria-invalid={visualError || undefined}
      data-error={visualError || undefined}
      data-invalid={resolvedInvalid || undefined}
      aria-describedby={describedBy}
      disabled={resolvedDisabled}
      className={cx(textarea({ size, autoSize }), className)}
      {...textareaProps}
    />
  );
};
