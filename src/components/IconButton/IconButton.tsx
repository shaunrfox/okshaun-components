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
import { useFieldContext } from '~/system/context/FieldContext';
import { useSlotContext } from '~/system/context/SlotContext';
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
  const fieldContext = useFieldContext();
  const slotContext = useSlotContext();
  const {
    iconName,
    altText,
    variant,
    size: sizeProp,
    href,
    loading,
    error: errorProp,
    invalid: invalidProp,
    disabled: disabledProp,
    type = 'button',
    ...rest
  } = props;
  const size =
    sizeProp ??
    (slotContext?.size as IconButtonVariantProps['size'] | undefined) ??
    fieldContext?.size;
  const error = errorProp ?? slotContext?.error ?? fieldContext?.error;
  const invalid = invalidProp ?? slotContext?.invalid ?? fieldContext?.invalid;
  const disabled =
    disabledProp ?? slotContext?.disabled ?? fieldContext?.disabled;
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
        data-disabled={disabled || undefined}
        aria-label={altText}
        aria-invalid={invalid || undefined}
        data-error={error || undefined}
        data-invalid={invalid || undefined}
        {...otherProps}
      >
        <Box className={classes.mainContent}>
          <Icon
            name={iconName}
            className={classes.slot}
            opacity={loading ? 0 : 1}
          />
        </Box>
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
