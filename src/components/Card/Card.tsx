import * as React from 'react';
import { card, type CardVariantProps } from '@styled-system/recipes';
import { Box } from '../Box';
import { cx } from '@styled-system/css';

/**
 * CardProps is generic and manages its own polymorphism.
 * Default element is 'div' for non-interactive cards.
 * Automatically renders as 'a' when href is provided, or 'button' when interactive without href.
 */
export type CardProps<E extends React.ElementType = 'div'> =
  React.ComponentPropsWithoutRef<E> &
    Omit<CardVariantProps, 'interactive'> & {
      as?: E;
      href?: string;
      children?: React.ReactNode;
      className?: string;
      disabled?: boolean;
      /**
       * When true, the card becomes interactive (button or link).
       * Automatically true when href or onClick is provided.
       */
      interactive?: boolean;
    };

/**
 * Define a polymorphic CardComponent type.
 */
type CardComponent = <E extends React.ElementType = 'div'>(
  props: CardProps<E> & { ref?: React.ForwardedRef<Element> },
) => React.ReactElement;

/**
 * Card component that supports both static (content container) and interactive (button/link) modes.
 *
 * By default, renders as a div for semantic correctness.
 * - With `href`: renders as an anchor element
 * - With `interactive` or `onClick`: renders as a button element
 * - Use `as` prop for custom elements like 'article' or 'section'
 */
export const Card = React.forwardRef(
  <E extends React.ElementType = 'div'>(
    {
      as,
      appearance,
      href,
      className,
      children,
      disabled,
      interactive,
      onClick,
      ...props
    }: CardProps<E>,
    ref: React.ForwardedRef<Element>,
  ) => {
    // Determine if card should be interactive based on props
    const isInteractive = interactive || Boolean(href) || Boolean(onClick);

    // Determine the element to render
    let asComponent: React.ElementType = as || 'div';
    if (!as) {
      if (href) {
        asComponent = 'a';
      } else if (isInteractive) {
        asComponent = 'button';
      }
    }

    const isButton = asComponent === 'button';
    const isLink = asComponent === 'a';

    return (
      <Box
        as={asComponent as E}
        ref={ref as React.ForwardedRef<any>}
        className={cx(card({ appearance, interactive: isInteractive }), className)}
        {...(href && { href })}
        {...(isButton && { type: 'button' })}
        {...(isInteractive && disabled && {
          disabled: true,
          'aria-disabled': true,
          ...(isLink && { tabIndex: -1 }),
        })}
        {...(!isInteractive && disabled && { 'aria-disabled': true })}
        onClick={onClick}
        {...props}
      >
        {children}
      </Box>
    );
  },
) as CardComponent;
