import * as React from 'react';
import { cx } from '@styled-system/css';
import { Box, type BoxProps } from '~/components/Box';
import { button, type ButtonVariantProps } from '@styled-system/recipes';
import { ButtonContent } from './ButtonContent';

/**
 * ButtonProps is now generic.
 * It extends BoxProps for the element type E (default "button") and ButtonVariantProps.
 * This means that any prop accepted by the underlying element (e.g. onClick) is automatically allowed.
 */
export type ButtonProps<E extends React.ElementType = 'button'> = BoxProps<E> &
  ButtonVariantProps & {
    href?: string;
    loading?: boolean;
    className?: string;
    children?: React.ReactNode;
    disabled?: boolean;
  };

/**
 * Define a polymorphic ButtonComponent type.
 * The ref type will be inferred from the element type E.
 */
type ButtonComponent = <E extends React.ElementType = 'button'>(
  props: ButtonProps<E> & { ref?: React.ForwardedRef<Element> },
) => JSX.Element;

/**
 * The Button component uses the polymorphic Box as its base.
 * It automatically renders as an <a> if href is provided.
 * Since ButtonProps extends BoxProps, any extra props (like onClick) are automatically allowed.
 */
export const Button = React.forwardRef(
  <E extends React.ElementType = 'button'>(
    {
      variant,
      size,
      href,
      className,
      children,
      loading,
      disabled,
      ...props
    }: ButtonProps<E>,
    ref: React.ForwardedRef<Element>,
  ) => {
    const trulyDisabled = loading || disabled;
    // Decide which element to render based on whether href is provided.
    const asComponent = href ? 'a' : 'button';

    return (
      // @ts-ignore
      <Box
        as={asComponent as E}
        ref={ref as React.ForwardedRef<any>}
        href={href}
        disabled={trulyDisabled}
        aria-disabled={trulyDisabled}
        // Merge the classes from:
        // 1. The button recipe (for variant and size)
        // 2. The result of css(props) (for any extra style props)
        // 3. Any extra className passed in
        className={cx(button({ variant, size }), className)}
        // Add "type" attribute when rendering a button
        type={asComponent === 'button' ? 'button' : undefined}
        {...props}
      >
        <>
          <ButtonContent loading={!!loading}>{children}</ButtonContent>
        </>
      </Box>
    );
  },
) as ButtonComponent;
