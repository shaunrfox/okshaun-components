import { ReactNode, forwardRef } from 'react';
import { cx } from '@styled-system/css';
import { Grid, HStack } from '@styled-system/jsx';
import { Spinner } from '~/components/Spinner';
import { Box, type BoxProps } from '~/components/Box';
import { button, type ButtonVariantProps } from '@styled-system/recipes';
import { Icon, type IconNamesList } from '~/components/Icon';
import { NumericSizeToken } from '@styled-system/tokens';
import { splitProps } from '~/utils/splitProps';

export type ButtonProps = BoxProps &
  Omit<ButtonVariantProps, 'iconBefore' | 'iconAfter'> & {
    href?: string;
    onClick?: () => void;
    loading?: boolean;
    className?: string;
    children?: string | ReactNode;
    disabled?: boolean;
    iconBefore?: IconNamesList;
    iconAfter?: IconNamesList;
    gap?: NumericSizeToken;
    type?: 'submit' | 'reset' | 'button';
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      appearance,
      size,
      href,
      onClick,
      className,
      children,
      loading,
      disabled,
      type = 'button',
      iconBefore,
      iconAfter,
      gap,
      ...rest
    } = props;
    const classes = button({
      appearance,
      size,
      iconBefore: Boolean(iconBefore),
      iconAfter: Boolean(iconAfter),
    });
    const [styleClassName, otherProps] = splitProps(rest);
    const trulyDisabled = loading || disabled;

    return (
      <Box
        as={href ? 'a' : 'button'}
        ref={ref}
        {...(href ? { href } : { type })}
        onClick={onClick}
        disabled={trulyDisabled}
        aria-disabled={trulyDisabled}
        aria-label={children}
        className={cx(classes.container, styleClassName, className)}
        {...otherProps}
        {...(trulyDisabled &&
          href && {
            onClick: (e: React.MouseEvent<HTMLAnchorElement>) =>
              e.preventDefault(),
          })}
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
                size="sm"
                {...(appearance === 'primary' ? { inverse: true } : {})}
              />
            </Grid>
          )}
        </>
      </Box>
    );
  },
);

export default Button;
