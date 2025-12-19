import * as React from 'react';
import { cx } from '@styled-system/css';
import { Grid, HStack } from '@styled-system/jsx';
import { Spinner } from '~/components/Spinner';
import { Box } from '~/components/Box';
import { button, type ButtonVariantProps } from '@styled-system/recipes';
import { Icon, type IconNamesList } from '~/components/Icon';
import { NumericSizeToken } from '@styled-system/tokens';

/**
 * ButtonProps is generic and manages its own polymorphism.
 * It includes props for the element type E (default "button") and ButtonVariantProps.
 * This means that any prop accepted by the underlying element (e.g. onClick) is automatically allowed.
 */
export type ButtonProps<E extends React.ElementType = 'button'> =
  React.ComponentPropsWithoutRef<E> &
    Omit<ButtonVariantProps, 'iconBefore' | 'iconAfter'> & {
      as?: E;
      href?: string;
      loading?: boolean;
      className?: string;
      children?: React.ReactNode;
      disabled?: boolean;
      iconBefore?: IconNamesList;
      iconAfter?: IconNamesList;
      gap?: NumericSizeToken;
    };

/**
 * Define a polymorphic ButtonComponent type.
 * The ref type will be inferred from the element type E.
 */
type ButtonComponent = <E extends React.ElementType = 'button'>(
  props: ButtonProps<E> & { ref?: React.ForwardedRef<Element> },
) => React.ReactElement;

/**
 * The Button component uses the polymorphic Box as its base.
 * It automatically renders as an <a> if href is provided.
 * Since ButtonProps extends BoxProps, any extra props (like onClick) are automatically allowed.
 */
export const Button = React.forwardRef(
  <E extends React.ElementType = 'button'>(
    {
      appearance,
      size,
      href,
      className,
      children,
      loading,
      disabled,
      iconBefore,
      iconAfter,
      gap,
      ...props
    }: ButtonProps<E>,
    ref: React.ForwardedRef<Element>,
  ) => {
    const trulyDisabled = loading || disabled;
    const asComponent = href ? 'a' : 'button';
    const classes = button({
      appearance,
      size,
      iconBefore: Boolean(iconBefore),
      iconAfter: Boolean(iconAfter),
    });

    return (
      <Box
        as={asComponent as E}
        ref={ref as React.ForwardedRef<any>}
        href={href}
        disabled={trulyDisabled}
        aria-disabled={trulyDisabled}
        className={cx(classes.container, className)}
        type={asComponent === 'button' ? 'button' : undefined}
        {...props}
      >
        <>
          <HStack gap={gap || '4'} opacity={loading ? 0 : 1}>
            {iconBefore && <Icon name={iconBefore} className={classes.icon} />}
            {children}
            {iconAfter && <Icon name={iconAfter} className={classes.icon} />}
          </HStack>
          {loading && (
            <Grid
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              placeItems="center"
            >
              <Spinner
                {...(appearance === 'primary' ? { inverse: true } : {})}
              />
            </Grid>
          )}
        </>
      </Box>
    );
  },
) as ButtonComponent;
