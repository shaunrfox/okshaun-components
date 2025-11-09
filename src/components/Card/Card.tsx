import { card, type CardVariantProps } from '@styled-system/recipes';
import { Box, type BoxProps } from '../Box';
import { type ReactNode } from 'react';
import { splitProps } from '~/utils/splitProps';
import { cx } from '@styled-system/css';

export type CardProps = Omit<BoxProps, keyof CardVariantProps> &
  CardVariantProps & {
    href?: string;
    children?: string | ReactNode;
    grabbed?: boolean;
    disabled?: boolean;
  };

export const Card: React.FC<CardProps> = ({
  variant,
  href,
  children,
  disabled,
  grabbed,
  ...props
}: CardProps) => {
  const [className, otherProps] = splitProps(props);

  return (
    <Box
      as={href ? 'a' : 'button'}
      disabled={disabled}
      aria-disabled={disabled}
      data-grabbed={grabbed}
      className={cx(card({ variant }), className)}
      {...(href ? { href } : { type: 'button' })}
      {...otherProps}
    >
      {children}
    </Box>
  );
};
