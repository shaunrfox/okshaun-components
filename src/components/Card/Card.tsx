import { cx } from '@styled-system/css';
import { type CardVariantProps, card } from '@styled-system/recipes';
import type { MouseEvent, ReactNode } from 'react';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';

/** Props accepted by {@link Card}. */
export type CardProps = Omit<BoxProps, keyof CardVariantProps> &
  CardVariantProps & {
    /** Destination that makes the entire card render as a link. */
    href?: string;
    /** Card content. */
    children?: string | ReactNode;
    /** @default false */
    grabbed?: boolean;
    /** @default false */
    disabled?: boolean;
    /** @default false */
    interactive?: boolean;
  };

/**
 * Groups related content in a visual container that can optionally navigate or
 * act as a control.
 *
 * A card with `href` renders an anchor. A card that is otherwise interactive
 * renders a button; a non-interactive card renders a `div`. Avoid nesting other
 * interactive elements inside an interactive card.
 *
 * @example
 * ```tsx
 * <Card href="/orders/123">Order 123</Card>
 * ```
 */
export const Card = (props: CardProps) => {
  const {
    variant,
    href,
    onClick,
    children,
    disabled,
    grabbed,
    interactive,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);

  // Determine if card should be interactive based on props (used for styling)
  const isInteractive = interactive || Boolean(href) || Boolean(onClick);

  return (
    <Box
      {...dsComponent('Card')}
      {...(href
        ? ({
            as: 'a',
            href,
            ...(disabled && {
              onClick: (e: MouseEvent<HTMLAnchorElement>) => e.preventDefault(),
            }),
          } satisfies BoxProps<'a'>)
        : isInteractive
          ? ({
              as: 'button',
              type: 'button',
              disabled,
            } satisfies BoxProps<'button'>)
          : ({
              as: 'div',
            } satisfies BoxProps<'div'>))}
      data-grabbed={grabbed}
      className={cx(card({ variant, interactive: isInteractive }), className)}
      aria-disabled={disabled}
      {...otherProps}
    >
      {children}
    </Box>
  );
};
