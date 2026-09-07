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
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

/**
 * Props for {@link IconButton}. Extends {@link BoxProps} for layout and native
 * element attributes while reserving its visual recipe variants.
 */
export type IconButtonProps = Omit<BoxProps, keyof IconButtonVariantProps> &
  IconButtonVariantProps & {
    /** Icon symbol rendered for the action. */
    iconName: IconNamesList;
    /**
     * Required accessible label for the button and text used by its tooltip.
     * Describe the action, not the icon's shape.
     */
    altText: string;
    /** When provided, renders an anchor instead of a native button. */
    href?: string;
    /**
     * Shows a centered spinner, hides the icon, and sets `aria-busy`. Loading
     * does not disable the control; set `disabled` when the action is unavailable.
     *
     * @default false
     */
    loading?: boolean;
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
  };

/**
 * Performs an icon-only action or navigation with a required accessible label.
 *
 * Renders a native `button` by default, or an anchor when `href` is supplied.
 * Its explicit `size`, `error`, `invalid`, and `disabled` values take
 * precedence over slot context, which takes precedence over field context.
 * Its recipe defaults to the `standard` variant and `md` size.
 *
 * @example
 * ```tsx
 * <IconButton iconName="edit" altText="Edit invoice" onClick={editInvoice} />
 * ```
 */
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
        {...dsComponent('IconButton')}
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
