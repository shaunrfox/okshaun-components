import { cx } from '@styled-system/css';
import { type CardVariantProps, card } from '@styled-system/recipes';
import type { MouseEvent, ReactNode } from 'react';

import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';

export type CardProps = Omit<BoxProps, keyof CardVariantProps> &
  CardVariantProps & {
    href?: string;
    children?: string | ReactNode;
    grabbed?: boolean;
    disabled?: boolean;
    interactive?: boolean;
  };

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
