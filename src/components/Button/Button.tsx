import { cx } from '@styled-system/css';
import { HStack } from '@styled-system/jsx';
import { type ButtonVariantProps, button } from '@styled-system/recipes';
import type { NumericSizeToken } from '@styled-system/tokens';
import type { MouseEvent, ReactNode } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { Icon, type IconNamesList } from '~/components/Icon';
import { Spinner } from '~/components/Spinner';
import { splitProps } from '~/utils/splitProps';

export type ButtonProps = Omit<BoxProps, keyof ButtonVariantProps> &
  Omit<ButtonVariantProps, 'iconBefore' | 'iconAfter'> & {
    iconBefore?: IconNamesList;
    iconAfter?: IconNamesList;
    href?: string;
    loading?: boolean;
    children: string | ReactNode; // include ReactNode so we can pass in components like <Badge/>
    disabled?: boolean;
    type?: 'submit' | 'reset' | 'button';
    gap?: NumericSizeToken;
  };

export const Button = (props: ButtonProps) => {
  const {
    variant,
    size,
    href,
    iconBefore,
    iconAfter,
    children,
    loading,
    disabled,
    type = 'button',
    gap,
    ...rest
  } = props;
  const classes = button({
    variant,
    size,
    iconBefore: Boolean(iconBefore),
    iconAfter: Boolean(iconAfter),
  });
  const [className, otherProps] = splitProps(rest);

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
        : ({
            as: 'button',
            type,
            disabled,
          } satisfies BoxProps<'button'>))}
      className={`${cx(classes.container, className)} group`}
      {...(loading && {
        'aria-busy': true,
        'aria-live': 'polite',
      })}
      aria-disabled={disabled}
      {...otherProps}
    >
      <HStack gap={gap ?? '4'} opacity={loading ? 0 : 1}>
        {iconBefore && <Icon name={iconBefore} className={classes.icon} />}
        {children}
        {iconAfter && <Icon name={iconAfter} className={classes.icon} />}
      </HStack>
      {loading && (
        <Spinner
          size="sm"
          inverse={
            variant === 'primary' ||
            variant === 'danger' ||
            variant === 'selectedBold'
          }
          centered
        />
      )}
    </Box>
  );
};
