import * as React from 'react';
import { cx } from '@styled-system/css';
import { Box, type BoxProps } from '../Box/Box';
import { spinnerStyle } from './spinnerStyles';

/**
 * SpinnerProps is generic over an element type E (defaulting to 'div'),
 * and it extends BoxProps so that all style props and intrinsic element props
 * (like onClick, etc.) are automatically included.
 */
export interface SpinnerProps<E extends React.ElementType = 'div'>
  // @ts-ignore
  extends BoxProps<E> {
  size?: 'standard' | 'small' | 'large';
  className?: string;
}

/**
 * The Spinner component is built on top of Box.
 * It forwards all props (including style props and event handlers) and ref to Box.
 */
export const Spinner = React.forwardRef(function Spinner<
  E extends React.ElementType = 'div',
>(
  { size = 'standard', className, ...props }: SpinnerProps<E>,
  ref: React.ForwardedRef<Element>,
) {
  return (
    <Box
      as="div"
      ref={ref}
      className={cx(spinnerStyle({ size }), className)}
      {...props}
    />
  );
}) as <E extends React.ElementType = 'div'>(
  props: SpinnerProps<E> & { ref?: React.ForwardedRef<Element> },
) => JSX.Element;
