import { cx } from '@styled-system/css';
import { HStack } from '@styled-system/jsx';
import { type ButtonVariantProps, button } from '@styled-system/recipes';
import type { NumericSizeToken } from '@styled-system/tokens';
import type { MouseEvent, ReactNode } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { Icon, type IconNamesList } from '~/components/Icon';
import { Spinner } from '~/components/Spinner';
import { useFieldContext } from '~/system/context/FieldContext';
import {
  SlotContext,
  type SlotPlacement,
  useSlotContext,
} from '~/system/context/SlotContext';
import { splitProps } from '~/utils/splitProps';

export type ButtonProps = Omit<
  BoxProps,
  keyof ButtonVariantProps | 'children'
> &
  Omit<ButtonVariantProps, 'before' | 'after'> & {
    before?: ReactNode;
    after?: ReactNode;
    iconBefore?: IconNamesList;
    iconAfter?: IconNamesList;
    href?: string;
    loading?: boolean;
    children: string | ReactNode;
    error?: boolean;
    invalid?: boolean;
    disabled?: boolean;
    type?: 'submit' | 'reset' | 'button';
    gap?: NumericSizeToken;
  };

export const Button = (props: ButtonProps) => {
  const fieldContext = useFieldContext();
  const slotContext = useSlotContext();
  const {
    variant,
    size: sizeProp,
    href,
    before,
    after,
    iconBefore,
    iconAfter,
    children,
    loading,
    error: errorProp,
    invalid: invalidProp,
    disabled,
    type = 'button',
    gap,
    ...rest
  } = props;
  const size =
    sizeProp ??
    (slotContext?.size as ButtonVariantProps['size'] | undefined) ??
    fieldContext?.size;
  const error = errorProp ?? slotContext?.error ?? fieldContext?.error;
  const invalid = invalidProp ?? slotContext?.invalid ?? fieldContext?.invalid;
  const resolvedDisabled =
    disabled ?? slotContext?.disabled ?? fieldContext?.disabled;
  const classes = button({
    variant,
    size,
    before: Boolean(before || iconBefore),
    after: Boolean(after || iconAfter),
  });
  const [className, otherProps] = splitProps(rest);

  if (import.meta.env.DEV) {
    if (before && iconBefore) {
      console.warn(
        'Button received both "before" and "iconBefore". "before" takes precedence.',
      );
    }

    if (after && iconAfter) {
      console.warn(
        'Button received both "after" and "iconAfter". "after" takes precedence.',
      );
    }
  }

  const renderSlot = (slot: ReactNode, placement: SlotPlacement) => {
    if (!slot) {
      return null;
    }

    return (
      <SlotContext.Provider
        value={{
          owner: 'Button',
          placement,
          size,
          disabled: resolvedDisabled,
          error,
          invalid,
        }}
      >
        <Box className={classes.slot}>{slot}</Box>
      </SlotContext.Provider>
    );
  };

  const renderIcon = (name: IconNamesList) => {
    return (
      <Box className={classes.slot}>
        <Icon name={name} aria-hidden />
      </Box>
    );
  };

  return (
    <Box
      {...(href
        ? ({
            as: 'a',
            href,
            ...(resolvedDisabled && {
              onClick: (e: MouseEvent<HTMLAnchorElement>) => e.preventDefault(),
            }),
          } satisfies BoxProps<'a'>)
        : ({
            as: 'button',
            type,
            disabled: resolvedDisabled,
          } satisfies BoxProps<'button'>))}
      className={`${cx(classes.container, className)} group`}
      {...(loading && {
        'aria-busy': true,
        'aria-live': 'polite',
      })}
      aria-disabled={resolvedDisabled}
      data-disabled={resolvedDisabled || undefined}
      aria-invalid={invalid || undefined}
      data-error={error || undefined}
      data-invalid={invalid || undefined}
      {...otherProps}
    >
      <HStack gap={gap ?? '4'} opacity={loading ? 0 : 1}>
        {before
          ? renderSlot(before, 'before')
          : iconBefore
            ? renderIcon(iconBefore)
            : null}
        <Box className={classes.mainContent}>{children}</Box>
        {after
          ? renderSlot(after, 'after')
          : iconAfter
            ? renderIcon(iconAfter)
            : null}
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
