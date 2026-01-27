import { cx } from '@styled-system/css';
import { Grid, HStack } from '@styled-system/jsx';
import { Box, type BoxProps } from '~/components/Box';
import { splitProps } from '~/utils/splitProps';
import { Spinner } from '~/components/Spinner';
import {
  iconButton,
  type IconButtonVariantProps,
} from '@styled-system/recipes';
import { Icon, type IconNamesList } from '~/components/Icon';

export type IconButtonProps = Omit<BoxProps, keyof IconButtonVariantProps> &
  IconButtonVariantProps & {
    href?: string;
    loading?: boolean;
    disabled?: boolean;
    iconName?: IconNamesList;
    type?: 'submit' | 'reset' | 'button';
  };

export const IconButton = (props: IconButtonProps) => {
  const {
    variant,
    size,
    href,
    loading,
    disabled,
    iconName,
    type = 'button',
    ref,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const trulyDisabled = loading || disabled;
  const classes = iconButton({ variant, size });

  return (
    <Box
      as={href ? 'a' : 'button'}
      ref={ref}
      disabled={trulyDisabled}
      aria-disabled={trulyDisabled}
      className={cx(classes.container, className)}
      {...(href ? { href } : { type })}
      {...otherProps}
      {...(trulyDisabled &&
        href && {
          onClick: (e: React.MouseEvent<HTMLAnchorElement>) =>
            e.preventDefault(),
        })}
    >
      <>
        <HStack gap="2" opacity={loading ? 0 : 1}>
          <Icon name={iconName || 'menu'} className={classes.icon} />
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
              {...(variant === 'primary' ? { inverse: true } : {})}
            />
          </Grid>
        )}
      </>
    </Box>
  );
};
