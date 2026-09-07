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
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

/**
 * Props for {@link Button}. Extends {@link BoxProps} for layout and native
 * element attributes while reserving the button recipe's visual variants.
 */
export type ButtonProps = Omit<
  BoxProps,
  keyof ButtonVariantProps | 'children'
> &
  Omit<ButtonVariantProps, 'before' | 'after'> & {
    /** Content rendered before the button label. Takes precedence over `iconBefore`. */
    before?: ReactNode;
    /** Content rendered after the button label. Takes precedence over `iconAfter`. */
    after?: ReactNode;
    /**
     * Legacy icon name rendered before the label when `before` is not provided.
     *
     * @deprecated Use `before={<Icon name="..." aria-hidden />}`. This alias
     * will be removed in a future major release.
     */
    iconBefore?: IconNamesList;
    /**
     * Legacy icon name rendered after the label when `after` is not provided.
     *
     * @deprecated Use `after={<Icon name="..." aria-hidden />}`. This alias
     * will be removed in a future major release.
     */
    iconAfter?: IconNamesList;
    /** When provided, renders an anchor instead of a native button. */
    href?: string;
    /**
     * Shows a centered spinner, hides the visible content, and sets
     * `aria-busy`. Loading does not disable the control; set `disabled` when
     * the action must not be available.
     *
     * @default false
     */
    loading?: boolean;
    /** Visible label and optional inline content for the action. */
    children: string | ReactNode;
    /** Marks the control as having an error for styling and descendant slots. */
    error?: boolean;
    /** Sets `aria-invalid` and marks the control invalid for styling and slots. */
    invalid?: boolean;
    /**
     * Disables a native button. For links, marks the anchor `aria-disabled` and
     * prevents its default click navigation.
     */
    disabled?: boolean;
    /**
     * Native button type; ignored when `href` causes the component to render an
     * anchor.
     *
     * @default 'button'
     */
    type?: 'submit' | 'reset' | 'button';
    gap?: NumericSizeToken;
  };

/**
 * Performs an action or navigates to a location.
 *
 * Renders a native `button` by default, or an anchor when `href` is supplied.
 * Use {@link IconButton} for actions represented only by an icon. In a
 * `FormField` or slot context, explicitly supplied `size`, `error`, `invalid`,
 * and `disabled` values take precedence over slot context, which takes
 * precedence over field context. Its recipe defaults to the `standard` variant
 * and `md` size.
 *
 * @example
 * ```tsx
 * <Button onClick={saveInvoice}>Save invoice</Button>
 * ```
 */
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
      {...dsComponent('Button')}
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
