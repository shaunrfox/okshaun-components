import { cx } from '@styled-system/css';
import { Flex } from '@styled-system/jsx';
import { type FormFieldVariantProps, formField } from '@styled-system/recipes';
import type { NumericSizeToken } from '@styled-system/tokens';
import type { ReactNode } from 'react';
import { FieldContext } from '~/system/context/FieldContext';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';

export type FormFieldProps = Omit<BoxProps, keyof FormFieldVariantProps> &
  FormFieldVariantProps & {
    label: string;
    labelFor: string;
    children: ReactNode;
    helpText?: string;
    required?: boolean;
    error?: boolean;
    invalid?: boolean;
    errorText?: string;
    success?: boolean;
    successText?: string;
    disabled?: boolean;
    tooltipTitle?: string;
    tooltipText?: string;
    size?: FormFieldVariantProps['size'];
    layout?: 'default' | 'inline';
    gap?: NumericSizeToken;
  };

export const Required = () => {
  return <Text color="text.danger">*</Text>;
};

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
