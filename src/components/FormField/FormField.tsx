import { cx } from '@styled-system/css';
import { type FormFieldVariantProps, formField } from '@styled-system/recipes';
import {
  Children,
  type ReactElement,
  type ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';

export type FormFieldProps = Omit<BoxProps, keyof FormFieldVariantProps> &
  FormFieldVariantProps & {
    label?: string;
    helpText?: string;
    required?: boolean;
    error?: boolean;
    errorText?: string;
    disabled?: boolean;
    tooltip?: boolean;
    tooltipCaret?: boolean;
    tooltipTitle?: string;
    tooltipDescription?: string;
    children?: ReactNode;
  };

export const FormField = (props: FormFieldProps) => {
  const {
    layout = 'default',
    label,
    helpText,
    required,
    error,
    errorText,
    disabled,
    tooltip,
    tooltipTitle,
    tooltipDescription,
    tooltipCaret,
    children,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const { formFieldContainer, contentWrapper, labelWrapper, headLabel } =
    formField({
      layout: layout === 'inline' ? 'inline' : 'default',
    });
  const enhancedChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      const c = child as ReactElement<{ error?: boolean }>;
      return cloneElement(c, {
        error: error ?? c.props.error,
        // disabled: disabled ?? c.props.disabled,
      });
    }
    return child;
  });
  return (
    <Box
      className={cx(formFieldContainer, className)}
      {...otherProps}
      disabled={disabled}
    >
      <Box className={labelWrapper}>
        <Box className={headLabel}>
          <Text textStyle="body.md">{label} </Text>
          {required && (
            <Text as="span" color="text.error">
              *
            </Text>
          )}
          {tooltip && (
            <Tooltip
              title={tooltipTitle}
              text={`${tooltipDescription}`}
              caret={tooltipCaret}
            >
              <Icon name="info" fill="icon.decorative" />
            </Tooltip>
          )}
        </Box>
        {layout === 'default' && helpText && (
          <Text as="span" textStyle="body.sm">
            {helpText}
          </Text>
        )}
      </Box>
      <Box className={contentWrapper}>
        {enhancedChildren}
        {layout === 'inline' && <Text textStyle="body.sm">{helpText}</Text>}
        {error && (
          <Text as="span" textStyle={'body.xs'} color="text.error">
            {errorText}
          </Text>
        )}
      </Box>
    </Box>
  );
};
