import * as React from 'react';
import { cx } from '@styled-system/css';
import { Box, type BoxProps } from '~/components/Box';
import {
  iconButton,
  type IconButtonVariantProps,
} from '@styled-system/recipes';
import { ButtonContent } from '~/components/Button/ButtonContent';
import { Icon, type IconNamesList } from '~/components/Icon';
import { type SizeToken } from '@styled-system/tokens';

/**
 * IconButtonProps is generic over an element type E (defaulting to 'button').
 * It extends BoxProps<E> (which already includes all intrinsic props, like onClick)
 * and the recipe variant props.
 *
 * We've added a new optional prop 'iconName'. When provided (and if no children
 * are passed), IconButton will render the corresponding Icon automatically.
 */
export type IconButtonProps<E extends React.ElementType = 'button'> =
  BoxProps<E> &
    IconButtonVariantProps & {
      href?: string;
      loading?: boolean;
      loadingText?: React.ReactNode;
      children?: React.ReactNode;
      disabled?: boolean;
      className?: string;
      iconName?: IconNamesList;
    };

/**
 * Define the polymorphic component type for IconButton.
 */
type IconButtonComponent = <E extends React.ElementType = 'button'>(
  props: IconButtonProps<E> & { ref?: React.ForwardedRef<Element> },
) => JSX.Element;

/**
 * The IconButton component builds on Box.
 * It automatically renders as a "button" (or an "a" if an href is provided)
 * and applies the iconButton recipe styles.
 *
 * If the caller does not pass children but does provide an 'iconName',
 * the component renders the corresponding Icon automatically.
 */
export const IconButton = React.forwardRef(
  <E extends React.ElementType = 'button'>(
    {
      variant,
      size,
      href,
      className,
      children,
      loading,
      disabled,
      iconName,
      ...props
    }: IconButtonProps<E>,
    ref: React.ForwardedRef<Element>,
  ) => {
    const trulyDisabled = loading || disabled;
    // Determine which element to render: if href exists, render an anchor; otherwise, a button.
    const asComponent = href ? 'a' : 'button';

    // Correctly infer the size for the Icon based on the size prop
    const iconSize: SizeToken = size === 'small' ? '22' : '24';

    // If no children are provided and an iconName is specified, render the Icon automatically.
    const content =
      children ?? (iconName ? <Icon name={iconName} size={iconSize} /> : null);

    return (
      // @ts-ignore
      <Box
        as={asComponent as E}
        ref={ref as React.ForwardedRef<any>}
        href={href}
        disabled={trulyDisabled}
        aria-disabled={trulyDisabled}
        className={cx(iconButton({ variant, size }), className)}
        // Add "type" attribute when rendering a button
        type={asComponent === 'button' ? 'button' : undefined}
        {...props}
      >
        <ButtonContent loading={!!loading}>{content}</ButtonContent>
      </Box>
    );
  },
) as IconButtonComponent;
