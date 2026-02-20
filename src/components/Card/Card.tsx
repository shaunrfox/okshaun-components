import { cx } from '@styled-system/css';
import { type CardVariantProps, card } from '@styled-system/recipes';
import type { ReactNode } from 'react';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';

export type CardProps = BoxProps &
  CardVariantProps & {
    href?: string;
    children?: string | ReactNode;
    grabbed?: boolean;
    disabled?: boolean;
    interactive?: boolean;
  };

export const Card = (props: CardProps) => {
  const {
    as,
    variant,
    href,
    children,
    disabled,
    grabbed,
    interactive,
    onClick,
    ref,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);

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

  const isLink = asComponent === 'a';

  return (
    <Box
      as={asComponent}
      data-grabbed={grabbed}
      ref={ref}
      className={cx(card({ variant, interactive: isInteractive }), className)}
      {...(href ? { href } : { type: 'button' })}
      {...(disabled && {
        disabled: true,
        'aria-disabled': true,
        ...(isLink && { tabIndex: -1 }),
      })}
      {...otherProps}
    >
      {children}
    </Box>
  );
};
