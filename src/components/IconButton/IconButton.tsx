import * as React from 'react';
import { styled } from '@styled-system/jsx';
import { iconButton } from '@styled-system/recipes';

export const StyledIconButton = styled('button', iconButton);

export type StyledIconButtonProps = React.ComponentProps<
  typeof StyledIconButton
>;

interface IconButtonLoadingProps {
  loading?: boolean;
  loadingText?: React.ReactNode;
}

export interface IconButtonProps
  extends StyledIconButtonProps,
    IconButtonLoadingProps {
  variant?: 'standard' | 'primary' | 'danger' | 'hollow' | 'utility';
  size?: 'standard' | 'small' | 'large';
  to?: string;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
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
      <StyledIconButton
        ref={ref}
        variant={variant}
        size={size}
        disabled={trulyDisabled}
        className={className}
        {...rest}
      >
        {loading ? loadingText : children}
      </StyledIconButton>
    );
  },
);
