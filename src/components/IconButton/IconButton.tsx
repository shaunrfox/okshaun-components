import { cx } from '@styled-system/css';
import {
  type IconButtonVariantProps,
  iconButton,
} from '@styled-system/recipes';
import type { MouseEvent } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { Icon, type IconNamesList } from '~/components/Icon';
import { Spinner } from '~/components/Spinner';
import { Tooltip } from '~/components/Tooltip';
import { splitProps } from '~/utils/splitProps';

export type IconButtonProps = Omit<BoxProps, keyof IconButtonVariantProps> &
  IconButtonVariantProps & {
    iconName: IconNamesList;
    altText: string;
    href?: string;
    loading?: boolean;
    disabled?: boolean;
    type?: 'submit' | 'reset' | 'button';
  };

export const IconButton = (props: IconButtonProps) => {
  const {
    iconName,
    altText,
    variant,
    size,
    href,
    loading,
    disabled,
    type = 'button',
    ...rest
  } = props;
  const classes = iconButton({ variant, size });
  const [className, otherProps] = splitProps(rest);

  return (
    <Tooltip text={altText}>
      <Box
        {...(href
          ? ({
              as: 'a',
              href,
              ...(disabled && {
                onClick: (e: MouseEvent<HTMLAnchorElement>) =>
                  e.preventDefault(),
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
        aria-label={altText}
        {...otherProps}
      >
        <Icon
          name={iconName}
          className={classes.icon}
          opacity={loading ? 0 : 1}
        />
        {loading && (
          <Spinner
            size="sm"
            inverse={variant === 'primary' || variant === 'danger'}
            centered
          />
        )}
      </Box>
    </Tooltip>
  );
};
