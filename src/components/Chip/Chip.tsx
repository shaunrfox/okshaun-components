import { cx } from '@styled-system/css';
import { HStack } from '@styled-system/jsx';
import { type ChipVariantProps, chip } from '@styled-system/recipes';
import type { NumericSizeToken } from '@styled-system/tokens';
import {
  type KeyboardEvent,
  type KeyboardEventHandler,
  type MouseEvent,
  type ReactNode,
  type Ref,
  useEffect,
  useRef,
} from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { Icon } from '~/components/Icon';
import { Spinner } from '~/components/Spinner';
import { Tooltip } from '~/components/Tooltip';
import { useFieldContext } from '~/system/context/FieldContext';
import { SlotContext } from '~/system/context/SlotContext';
import { useLocale } from '~/system/context/useLocale';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';
import { useChipGroup } from './ChipGroupContext';

const getChipLabel = (children: ReactNode) => {
  if (typeof children === 'string') {
    return children;
  }

  return undefined;
};

/** Number of `items` shown before the rest collapse into `+N`. */
const MAX_VISIBLE_ITEMS = 2;

/** The chip label: either `children` or an `items` list, never both. */
type ChipLabelProps =
  | {
      /** Visible chip label. A string label is also used in the default dismissal label. */
      children: ReactNode;
      items?: never;
    }
  | {
      children?: never;
      /**
       * Label list rendered comma-joined. With more than two items only the
       * first two are shown, followed by `+N` for the rest, and a tooltip
       * lists every item. Overflow is decided by item count, not available
       * width. An empty list renders nothing and the chip does not register
       * with a parent `ChipGroup`. If the emptied chip was the group's selected
       * value, clear that value; otherwise no visible chip is the tab stop.
       */
      items: string[];
    };

/** Props for {@link Chip}, a compact label that can be static, actionable, selectable, or dismissible. */
export type ChipProps = Omit<BoxProps, keyof ChipVariantProps | 'children'> &
  Omit<ChipVariantProps, 'before' | 'after'> &
  ChipLabelProps & {
    /** Content displayed before the chip label. */
    before?: ReactNode;
    /** Content displayed after the chip label and before the dismiss control. */
    after?: ReactNode;
    /** Disables the primary action and dismiss button. The local value takes precedence over slot and field context. */
    disabled?: boolean;
    /** Shows a spinner and disables chip interaction. */
    loading?: boolean;
    /** Applies deleted styling without removing the chip from the DOM. */
    deleted?: boolean;
    /** Adds a dismiss button after the chip content. */
    dismissable?: boolean;
    /**
     * Accessible name for the dismiss button.
     * @default `labels.removeItem` (English: `Remove ${children}`, or `Remove` plus the comma-joined `items`)
     */
    dismissLabel?: string;
    /** Ref forwarded to the dismiss button. */
    dismissButtonRef?: Ref<HTMLButtonElement>;
    /** Tab order override for the dismiss button. */
    dismissButtonTabIndex?: number;
    /** Called when the dismiss button is activated. The button is disabled when this callback is absent. */
    onDismiss?: () => void;
    /** Keyboard handler composed onto the dismiss button. */
    onDismissKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    /** Value used by a parent `ChipGroup` to identify and select this chip. */
    value?: string;
    /**
     * Native type for the chip's primary button when it is selectable or has `onClick`.
     * @default 'button'
     */
    type?: 'button' | 'submit' | 'reset';
    /** Applies error styling. The local value takes precedence over slot and field context. */
    error?: boolean;
    /** Marks the chip invalid with `aria-invalid`. The local value takes precedence over slot and field context. */
    invalid?: boolean;
    gap?: NumericSizeToken;
  };

/**
 * Renders a compact label, optionally with an action or dismissal control.
 *
 * A chip is static unless it has `onClick` or both a `value` and a parent
 * `ChipGroup`. Grouped single-select chips use radio behavior and arrow-key
 * roving focus; grouped multi-select chips use checkbox behavior. `before` and
 * `after` slots inherit state through slot context.
 *
 * Pass `items` instead of `children` to show a list. Lists with more than two
 * items show the first two plus a `+N` count (by item count, not width) and
 * reveal the full list in a tooltip. A static overflowing chip becomes
 * keyboard-focusable so the tooltip can be opened without a pointer, and its
 * full list is also exposed to screen readers.
 *
 * @example
 * ```tsx
 * <Chip dismissable onDismiss={() => remove('design')}>Design</Chip>
 * ```
 */
export const Chip = (props: ChipProps) => {
  const fieldContext = useFieldContext();
  const groupContext = useChipGroup();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { labels } = useLocale();
  const {
    size: sizeProp,
    children,
    items,
    loading,
    disabled,
    deleted,
    before,
    after,
    dismissable,
    dismissLabel,
    dismissButtonRef,
    dismissButtonTabIndex,
    onDismiss,
    onDismissKeyDown,
    value,
    gap,
    onClick,
    type = 'button',
    error: errorProp,
    invalid: invalidProp,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const resolvedSize =
    sizeProp ??
    (groupContext?.size as ChipVariantProps['size'] | undefined) ??
    fieldContext?.size ??
    'md';
  const resolvedError = errorProp ?? fieldContext?.error;
  const resolvedInvalid = invalidProp ?? fieldContext?.invalid;
  const visualError = Boolean(resolvedError || resolvedInvalid);
  const resolvedDisabled = disabled ?? fieldContext?.disabled;
  const hasGroupValue = value !== undefined;
  const isInGroup = groupContext !== null && hasGroupValue;
  // An empty list renders nothing, so the chip must not register with its group.
  const isEmpty = items?.length === 0;
  const canRegister = Boolean(
    isInGroup && !resolvedDisabled && !loading && !isEmpty,
  );
  const isSelectable = isInGroup;
  const isSelected =
    groupContext !== null && value !== undefined
      ? groupContext.type === 'single'
        ? groupContext.value === value
        : Array.isArray(groupContext.value) &&
          groupContext.value.includes(value)
      : false;
  const isMultiSelected =
    isSelectable && groupContext?.type === 'multi' && isSelected;
  const hasBefore = Boolean(before) || isMultiSelected;
  const hasAfter = Boolean(after);
  // The chip recipe still has compoundVariants, so Panda types its variants as
  // non-responsive. Cast until okshaun-components-ecl.11 removes them.
  const classes = chip({
    size: resolvedSize as ChipVariantProps['size'],
    before: hasBefore,
    after: hasAfter,
    dismissable,
  });
  const isOverflowing = items !== undefined && items.length > MAX_VISIBLE_ITEMS;
  const itemsLabel = items
    ? isOverflowing
      ? `${items.slice(0, MAX_VISIBLE_ITEMS).join(', ')} +${items.length - MAX_VISIBLE_ITEMS}`
      : items.join(', ')
    : undefined;
  const label = items ? items.join(', ') : getChipLabel(children);
  const dismissAriaLabel =
    dismissLabel ?? (label ? labels.removeItem(label) : undefined);

  // Depend on the stable callbacks, not the whole context: the context changes
  // on every registration, so depending on it would re-register forever.
  const registerChip = groupContext?.registerChip;
  const unregisterChip = groupContext?.unregisterChip;

  useEffect(() => {
    if (
      !canRegister ||
      !registerChip ||
      !unregisterChip ||
      value === undefined
    ) {
      return undefined;
    }

    registerChip(value, buttonRef);
    return () => unregisterChip(value);
  }, [canRegister, registerChip, unregisterChip, value]);

  const handleSelect = (event: MouseEvent<HTMLButtonElement>) => {
    if (!isSelectable || !groupContext || value === undefined) {
      return;
    }

    if (groupContext.type === 'single') {
      groupContext.onChange(value);
    } else {
      const currentValues = Array.isArray(groupContext.value)
        ? groupContext.value
        : [];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((current) => current !== value)
        : [...currentValues, value];
      groupContext.onChange(nextValues);
    }

    onClick?.(event);
  };

  const handleBodyClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isSelectable) {
      handleSelect(event);
      return;
    }

    onClick?.(event);
  };

  const handleDismiss = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onDismiss?.();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (
      !isSelectable ||
      !groupContext ||
      value === undefined ||
      groupContext.type !== 'single'
    ) {
      return;
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      groupContext.focusChip('next', value);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      groupContext.focusChip('prev', value);
    }
  };

  const getTabIndex = () => {
    if (!isSelectable || !groupContext || !canRegister || value === undefined) {
      return undefined;
    }

    if (groupContext.type === 'single') {
      if (isSelected) {
        return 0;
      }

      // The first chip is the tab stop only when nothing is selected.
      const hasSelection =
        groupContext.value !== undefined && groupContext.value !== '';
      return !hasSelection && groupContext.chipValues[0] === value ? 0 : -1;
    }

    return 0;
  };

  const bodyRole = isSelectable
    ? groupContext?.type === 'single'
      ? 'radio'
      : 'checkbox'
    : undefined;
  const renderButtonBody = Boolean(onClick || isSelectable);
  const body = (
    <Box
      {...dsComponent('Chip')}
      ref={renderButtonBody ? buttonRef : undefined}
      as={renderButtonBody ? 'button' : 'span'}
      className={classes.body}
      onClick={renderButtonBody ? handleBodyClick : undefined}
      onKeyDown={renderButtonBody ? handleKeyDown : undefined}
      tabIndex={
        renderButtonBody
          ? getTabIndex()
          : isOverflowing && !resolvedDisabled && !loading
            ? 0
            : undefined
      }
      {...(renderButtonBody
        ? { type, disabled: resolvedDisabled || loading }
        : {})}
      aria-busy={loading || undefined}
      aria-checked={isSelectable ? isSelected : undefined}
      aria-invalid={visualError || undefined}
      aria-disabled={resolvedDisabled || loading || undefined}
      data-selected={isSelected || undefined}
      data-loading={loading || undefined}
      data-deleted={deleted || undefined}
      data-error={visualError || undefined}
      data-invalid={resolvedInvalid || undefined}
      role={bodyRole}
    >
      <HStack
        gap={gap ?? '4'}
        opacity={loading ? 0 : 1}
        className={classes.mainContent}
      >
        {isMultiSelected && (
          <Icon name="check" fill="icon.inverse" aria-hidden />
        )}
        {before && (
          <SlotContext.Provider
            value={{
              owner: 'Chip',
              placement: 'before',
              size: resolvedSize,
              disabled: resolvedDisabled,
              error: resolvedError,
              invalid: resolvedInvalid,
            }}
          >
            <Box className={classes.slot}>{before}</Box>
          </SlotContext.Provider>
        )}
        {items ? (
          <Box as="span">
            <span aria-hidden={isOverflowing || undefined}>{itemsLabel}</span>
            {isOverflowing && (
              <Box as="span" srOnly>
                {label}
              </Box>
            )}
          </Box>
        ) : (
          <Box as="span">{children}</Box>
        )}
        {after && (
          <SlotContext.Provider
            value={{
              owner: 'Chip',
              placement: 'after',
              size: resolvedSize,
              disabled: resolvedDisabled,
              error: resolvedError,
              invalid: resolvedInvalid,
            }}
          >
            <Box className={classes.slot}>{after}</Box>
          </SlotContext.Provider>
        )}
      </HStack>
      {loading && <Spinner size="xs" centered />}
    </Box>
  );

  if (import.meta.env.DEV && dismissable && !dismissAriaLabel) {
    console.warn(
      'Dismissable Chip requires dismissLabel or string children for an accessible dismiss action.',
    );
  }

  if (isEmpty) {
    return null;
  }

  // The container is always rendered and is the root. It paints the pill, so
  // the dismiss button sits inside it rather than alongside it, and it carries
  // the state attributes the recipe reads.
  return (
    <Box
      className={`${cx(classes.container, className)} group`}
      data-selected={isSelected || undefined}
      data-loading={loading || undefined}
      data-deleted={deleted || undefined}
      data-disabled={resolvedDisabled || undefined}
      aria-busy={loading || undefined}
      {...otherProps}
    >
      {items ? (
        <Tooltip text={items.join(', ')} disabled={!isOverflowing || loading}>
          {body}
        </Tooltip>
      ) : (
        body
      )}
      {dismissable && (
        <Box
          as="button"
          ref={dismissButtonRef}
          type="button"
          className={classes.dismissButton}
          aria-label={dismissAriaLabel}
          tabIndex={dismissButtonTabIndex}
          onClick={handleDismiss}
          onKeyDown={onDismissKeyDown}
          disabled={resolvedDisabled || loading || !onDismiss}
          data-selected={isSelected || undefined}
        >
          <Icon name="x" aria-hidden />
        </Box>
      )}
    </Box>
  );
};
