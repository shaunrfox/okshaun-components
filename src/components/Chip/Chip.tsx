import { cx } from '@styled-system/css';
import { HStack } from '@styled-system/jsx';
import { type ChipVariantProps, chip } from '@styled-system/recipes';
import type { NumericSizeToken } from '@styled-system/tokens';
import {
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useRef,
} from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { Icon } from '~/components/Icon';
import { Spinner } from '~/components/Spinner';
import { useFieldContext } from '~/system/context/FieldContext';
import { SlotContext } from '~/system/context/SlotContext';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';
import { useChipGroup } from './ChipGroupContext';

const getChipLabel = (children: ReactNode) => {
  if (typeof children === 'string') {
    return children;
  }

  return undefined;
};

export type ChipProps = Omit<BoxProps, keyof ChipVariantProps | 'children'> &
  Omit<ChipVariantProps, 'before' | 'after'> & {
    children: ReactNode;
    before?: ReactNode;
    after?: ReactNode;
    disabled?: boolean;
    loading?: boolean;
    deleted?: boolean;
    dismissable?: boolean;
    dismissLabel?: string;
    onDismiss?: () => void;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    value?: string;
    type?: 'button' | 'submit' | 'reset';
    error?: boolean;
    invalid?: boolean;
    gap?: NumericSizeToken;
  };

export const Chip = (props: ChipProps) => {
  const fieldContext = useFieldContext();
  const groupContext = useChipGroup();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {
    size: sizeProp,
    children,
    loading,
    disabled,
    deleted,
    before,
    after,
    dismissable,
    dismissLabel,
    onDismiss,
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
  const canRegister = Boolean(isInGroup && !resolvedDisabled && !loading);
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
  const label = getChipLabel(children);
  const dismissAriaLabel =
    dismissLabel ?? (label ? `${label}, dismiss` : undefined);

  useEffect(() => {
    if (!canRegister || !groupContext || value === undefined) {
      return undefined;
    }

    groupContext.registerChip(value, buttonRef);
    return () => groupContext.unregisterChip(value);
  }, [canRegister, groupContext, value]);

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

      return groupContext.chipValues[0] === value ? 0 : -1;
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
      tabIndex={renderButtonBody ? getTabIndex() : undefined}
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
        {isMultiSelected && <Icon name="check" aria-hidden />}
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
        <Box as="span">{children}</Box>
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
      {body}
      {dismissable && (
        <Box
          as="button"
          type="button"
          className={classes.dismissButton}
          aria-label={dismissAriaLabel}
          onClick={handleDismiss}
          disabled={resolvedDisabled || loading}
          data-selected={isSelected || undefined}
        >
          <Icon name="x" aria-hidden />
        </Box>
      )}
    </Box>
  );
};
