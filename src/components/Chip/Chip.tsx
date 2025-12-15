import { type ReactNode } from 'react';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { HStack, Grid } from '@styled-system/jsx';
import { chip, type ChipVariantProps } from '@styled-system/recipes';
import { Box, type BoxProps } from '~/components/Box';
import { Icon, type IconNames, type AllowedIconSizes } from '~/components/Icon';
import { Spinner } from '~/components/Spinner';

// Map chip sizes to icon sizes
const chipSizeToIconSize: Record<string, AllowedIconSizes> = {
  small: '20',
  default: '20',
  large: '24',
};

export type ChipProps = BoxProps &
  ChipVariantProps & {
    children: string | ReactNode;
    iconBefore?: keyof typeof IconNames;
    iconAfter?: keyof typeof IconNames;
    disabled?: boolean;
    loading?: boolean;
    deleted?: boolean;
  };

export const Chip: React.FC<ChipProps> = ({
  size = 'default',
  children,
  loading,
  disabled,
  deleted,
  iconBefore,
  iconAfter,
  onClick,
  ...props
}) => {
  const [className, otherProps] = splitProps(props);
  const classes = chip({
    size,
    iconBefore: Boolean(iconBefore),
    iconAfter: Boolean(iconAfter),
  });
  const iconSize = chipSizeToIconSize[size];

  return (
    <Box
      as="button"
      className={cx(classes.container, className)}
      onClick={onClick || undefined}
      disabled={disabled ? true : undefined}
      aria-disabled={disabled ? true : undefined}
      data-loading={loading ? true : undefined}
      aria-busy={loading ? true : undefined}
      type="button"
      data-deleted={deleted ? true : undefined}
      {...otherProps}
    >
      <HStack gap="4" opacity={loading ? 0 : 1}>
        {iconBefore && (
          <Icon name={iconBefore} size={iconSize} className={classes.icon} />
        )}
        {children}
        {iconAfter && (
          <Icon name={iconAfter} size={iconSize} className={classes.icon} />
        )}
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
          <Spinner />
        </Grid>
      )}
    </Box>
  );
};
