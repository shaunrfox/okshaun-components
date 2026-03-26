import { cx } from '@styled-system/css';
import { Flex } from '@styled-system/jsx';
import { type FormFieldVariantProps, formField } from '@styled-system/recipes';
import type { ReactElement, ReactNode } from 'react';
import { Children, cloneElement, isValidElement } from 'react';

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
    errorText?: string;
    disabled?: boolean;
    tooltipTitle?: string;
    tooltipText?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
  };

type FormFieldChildProps = {
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
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
    errorText,
    disabled,
    tooltipTitle,
    tooltipText,
    size,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);

  // container, inputs, labelWrapper, headLabel
  const classes = formField({
    layout: layout === 'inline' ? 'inline' : 'default',
    size,
  });

  const enhancedChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      const c = child as ReactElement<FormFieldChildProps>;
      return cloneElement(c, {
        error: error ?? c.props.error,
        disabled: disabled ?? c.props.disabled,
        required: required ?? c.props.required,
        size: size ?? c.props.size,
      });
    }
    return child;
  });

  return (
    <Box
      className={`${cx(classes.container, className)} group`}
      aria-disabled={disabled}
      data-disabled={disabled || undefined}
      data-error={error}
      data-size={size}
      {...otherProps}
    >
      <Flex className={classes.labelWrapper}>
        <Label htmlFor={labelFor}>
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
        <Text textStyle="body.xs" lineHeight="tight" color="text.subtlest">
          {helpText}
        </Text>
      )}

      <Box className={classes.inputs}>{enhancedChildren}</Box>
      {layout === 'inline' && helpText && (
        <Text
          textStyle="body.xs"
          lineHeight="tight"
          color="text.subtlest"
          gridColumn="2 / 3"
        >
          {helpText}
        </Text>
      )}
      {error && (
        <Text
          textStyle="body.xs"
          lineHeight="tight"
          color="text.danger"
          gridColumn="2 / 3"
        >
          {errorText}
        </Text>
      )}
    </Box>
  );
};
