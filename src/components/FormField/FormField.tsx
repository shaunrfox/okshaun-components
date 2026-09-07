import { cx } from '@styled-system/css';
import { Flex } from '@styled-system/jsx';
import { type FormFieldVariantProps, formField } from '@styled-system/recipes';
import type { NumericSizeToken } from '@styled-system/tokens';
import type { ReactNode } from 'react';
import { FieldContext } from '~/system/context/FieldContext';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';

/**
 * Props for {@link FormField}. It supplies field state to compatible
 * descendants through `FieldContext`.
 */
export type FormFieldProps = Omit<BoxProps, keyof FormFieldVariantProps> &
  FormFieldVariantProps & {
    /** Visible label text for the field. */
    label: string;
    /**
     * The `id` of the labeled input. The child input must use this exact `id`
     * for the rendered label's `htmlFor` relationship to work.
     */
    labelFor: string;
    /** Input or control content associated with this field. */
    children: ReactNode;
    /** Supporting guidance displayed near the input. */
    helpText?: string;
    /**
     * Displays a visual required indicator. Also set `required` on the native
     * input when browser validation or required semantics are needed.
     */
    required?: boolean;
    /** Marks the field and compatible descendants as having an error. */
    error?: boolean;
    /** Marks the field invalid and supplies invalid state to compatible descendants. */
    invalid?: boolean;
    /** Message displayed when `error` or `invalid` is true and `success` is false. */
    errorText?: string;
    /** Marks the field successful. Success text takes precedence over error text. */
    success?: boolean;
    /** Message displayed when `success` is true, including when error state is also set. */
    successText?: string;
    /**
     * Marks the field `aria-disabled`, applies disabled styling, and supplies
     * disabled state to compatible descendants. Native child controls must
     * still receive `disabled` themselves.
     */
    disabled?: boolean;
    /** Optional title shown by the label-help tooltip when `tooltipText` is provided. */
    tooltipTitle?: string;
    /**
     * Help text that enables the informational tooltip beside the label. The
     * tooltip is not rendered without this value.
     */
    tooltipText?: string;
    /**
     * Field size passed to compatible descendants and used by the field recipe.
     *
     * @default 'md'
     */
    size?: FormFieldVariantProps['size'];
    layout?: 'default' | 'inline';
    gap?: NumericSizeToken;
  };

export const Required = () => {
  return <Text color="text.danger">*</Text>;
};

/**
 * Groups a label, control, help text, and validation message into one field.
 *
 * `labelFor` must match the `id` of the nested input. The component provides
 * `size`, `error`, `invalid`, and `disabled` through field context to
 * compatible descendants, but it does not add native input attributes for
 * them. If `success` and an error state are both true, success messaging wins.
 *
 * @example
 * ```tsx
 * <FormField label="Email" labelFor="email" required>
 *   <TextInput id="email" type="email" required />
 * </FormField>
 * ```
 */
export const FormField = (props: FormFieldProps) => {
  const {
    layout = 'default',
    label,
    labelFor,
    children,
    helpText,
    required,
    error,
    invalid,
    errorText,
    success,
    successText,
    disabled,
    tooltipTitle,
    tooltipText,
    size,
    gap = '2',
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);

  // container, inputs, labelWrapper, headLabel
  const classes = formField({
    layout: layout === 'inline' ? 'inline' : 'default',
    size,
  });
  const labelId = `${labelFor}-label`;
  const helpTextId = helpText ? `${labelFor}-help` : undefined;
  const errorTextId =
    (error || invalid) && errorText ? `${labelFor}-error` : undefined;
  const successTextId =
    success && !(error || invalid) && successText
      ? `${labelFor}-success`
      : undefined;
  const describedBy = [helpTextId, errorTextId, successTextId]
    .filter(Boolean)
    .join(' ');
  const showError = error || invalid;
  const showSuccess = success && !showError;

  return (
    <FieldContext.Provider
      value={{
        size,
        disabled,
        error: error ?? invalid,
        invalid: invalid ?? error,
        describedBy,
      }}
    >
      <Box
        {...dsComponent('FormField')}
        className={`${cx(classes.container, className)} group`}
        aria-disabled={disabled}
        data-disabled={disabled || undefined}
        data-error={showError || undefined}
        data-invalid={showError || undefined}
        data-success={showSuccess || undefined}
        data-size={typeof size === 'string' ? size : undefined}
        {...otherProps}
      >
        <Flex className={classes.labelWrapper}>
          <Label id={labelId} htmlFor={labelFor}>
            {label} {required && <Required />}
          </Label>

          {tooltipText && (
            <Tooltip
              {...(tooltipTitle && { title: tooltipTitle })}
              text={tooltipText}
            >
              <Icon name="info" fill="icon.decorative.subtle" size="20" />
            </Tooltip>
          )}
        </Flex>

        {layout === 'default' && helpText && (
          <Text
            id={helpTextId}
            textStyle="body.xs"
            lineHeight="tight"
            color="text.subtlest"
          >
            {helpText}
          </Text>
        )}

        <Box className={classes.inputs} gap={gap}>
          {children}
        </Box>
        {layout === 'inline' && helpText && (
          <Text
            id={helpTextId}
            textStyle="body.xs"
            lineHeight="tight"
            color="text.subtlest"
            gridColumn="2 / 3"
          >
            {helpText}
          </Text>
        )}
        {showError && errorText && (
          <Text
            id={errorTextId}
            textStyle="body.xs"
            lineHeight="tight"
            color="text.danger"
            gridColumn="2 / 3"
          >
            {errorText}
          </Text>
        )}
        {showSuccess && successText && (
          <Text
            id={successTextId}
            textStyle="body.xs"
            lineHeight="tight"
            color="text.success"
            gridColumn="2 / 3"
          >
            {successText}
          </Text>
        )}
      </Box>
    </FieldContext.Provider>
  );
};
