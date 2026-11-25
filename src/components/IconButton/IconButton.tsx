import { cx } from '@styled-system/css';
import {
  type IconButtonVariantProps,
  iconButton,
} from '@styled-system/recipes';
import { type MouseEvent, useId } from 'react';

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
     * Disables a native button. For links, marks the anchor `aria-disabled`,
     * removes its `href` so it can't navigate, and keeps it focusable.
     */
    disabled?: boolean;
    /**
     * Disables the action and explains why. The control stays focusable and
     * is marked `aria-disabled`, clicks are blocked, the tooltip shows
     * `altText` as its title with the reason below, and the reason is linked
     * with `aria-describedby`. `altText` stays the accessible name.
     */
    disabledReason?: string;
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
 * Its recipe defaults to the `standard` variant and `md` size. Set
 * `disabledReason` instead of `disabled` when the user needs to know why the
 * action is unavailable.
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
    disabledReason,
    type = 'button',
    onClick,
    'aria-describedby': ariaDescribedBy,
    ...rest
  } = props;
  const reasonId = useId();
  const hasReason = Boolean(disabledReason);
  const size =
    sizeProp ??
    (slotContext?.size as IconButtonVariantProps['size'] | undefined) ??
    fieldContext?.size;
  const error = errorProp ?? slotContext?.error ?? fieldContext?.error;
  const invalid = invalidProp ?? slotContext?.invalid ?? fieldContext?.invalid;
  const disabled = hasReason
    ? true
    : (disabledProp ?? slotContext?.disabled ?? fieldContext?.disabled);
  const classes = iconButton({ variant, size });
  const [className, otherProps] = splitProps(rest);
  // A menu trigger gets `aria-expanded` from Menu. While its menu is open,
  // the tooltip would sit over the menu, so it stays closed.
  const expanded =
    rest['aria-expanded'] === true || rest['aria-expanded'] === 'true';

  return (
    <Tooltip
      disabled={expanded}
      // With a reason, the label stays visible as the title above it.
      title={hasReason ? altText : undefined}
      text={hasReason ? (disabledReason ?? '') : altText}
    >
      <Box
        {...dsComponent('IconButton')}
        {...(href
          ? ({
              as: 'a',
              // A live href still opens on middle-click or from the context
              // menu, so a disabled link drops it and keeps its role and focus.
              ...(disabled ? { role: 'link', tabIndex: 0 } : { href }),
            } satisfies BoxProps<'a'>)
          : ({
              as: 'button',
              type,
              // A reason keeps the button focusable, so it can show the reason.
              disabled: hasReason ? undefined : disabled,
            } satisfies BoxProps<'button'>))}
        onClick={
          disabled && (href || hasReason)
            ? (e: MouseEvent<HTMLElement>) => e.preventDefault()
            : onClick
        }
        // The global disabled style turns off pointer events. With a reason,
        // the button takes them back, as Button does, so it shows the
        // not-allowed cursor and receives pointer events itself. The onClick
        // guard above still blocks clicks.
        pointerEvents={hasReason ? 'auto' : undefined}
        className={`${cx(classes.container, className)} group`}
        {...(loading && {
          'aria-busy': true,
          'aria-live': 'polite',
        })}
        aria-disabled={disabled}
        aria-describedby={
          [hasReason ? reasonId : undefined, ariaDescribedBy]
            .filter(Boolean)
            .join(' ') || undefined
        }
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
      {hasReason && (
        <Box as="span" id={reasonId} hidden>
          {disabledReason}
        </Box>
      )}
    </Tooltip>
  );
};
