import * as React from 'react';
import { styled } from '@styled-system/jsx';
import { button } from '@styled-system/recipes';

export const StyledButton = styled('button', button);

export interface StyledButtonProps
  extends React.ComponentProps<typeof StyledButton> {}

interface ButtonLoadingProps {
  loading?: boolean;
  loadingText?: React.ReactNode;
}

export interface ButtonProps extends StyledButtonProps, ButtonLoadingProps {
  variant?: 'primary' | 'danger' | 'hollow' | 'utility' | 'standard';
  size?: 'standard' | 'small' | 'large';
  to?: string;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'standard',
      size = 'standard',
      className,
      loading,
      disabled,
      loadingText,
      children,
      ...rest
    },
    ref,
  ) => {
    const trulyDisabled = loading || disabled;
    return (
      <StyledButton
        ref={ref}
        variant={variant}
        size={size}
        disabled={trulyDisabled}
        className={className}
        {...rest}
      >
        {loading ? loadingText : children}
      </StyledButton>
    );
  },
);
