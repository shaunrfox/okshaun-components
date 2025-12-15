import { type ReactNode, useRef, useEffect, type KeyboardEvent } from 'react';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { HStack, Grid } from '@styled-system/jsx';
import { chip, type ChipVariantProps } from '@styled-system/recipes';
import { Box, type BoxProps } from '~/components/Box';
import { Icon, type AllowedIconSizes } from '~/components/Icon';
import { Spinner } from '~/components/Spinner';
import { useChipGroup } from './ChipGroupContext';
import { NumericSizeToken } from '@styled-system/tokens';

// Map chip sizes to icon sizes (for internal icons like check/x)
const chipSizeToIconSize: Record<string, AllowedIconSizes> = {
  small: '20',
  default: '20',
  large: '24',
};

export type ChipProps = BoxProps &
  Omit<ChipVariantProps, 'before' | 'after'> & {
    children: string | ReactNode;
    /** Content to render before the label (e.g., Icon, Avatar) */
    before?: ReactNode;
    /** Content to render after the label (e.g., Badge, Icon) */
    after?: ReactNode;
    disabled?: boolean;
    loading?: boolean;
    deleted?: boolean;
    dismissable?: boolean;
    onDismiss?: () => void;
    value?: string;
    gap?: NumericSizeToken;
  };

export const Chip: React.FC<ChipProps> = ({
  size = 'default',
  children,
  loading,
  disabled,
  deleted,
  before,
  after,
  dismissable,
  onDismiss,
  value,
  gap,
  onClick,
  ...props
}) => {
  const [className, otherProps] = splitProps(props);
  const groupContext = useChipGroup();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Determine if this chip is selectable (has value and is inside ChipGroup)
  const isSelectable = value !== undefined && groupContext !== null;

  // Register/unregister with ChipGroup for keyboard navigation
  useEffect(() => {
    if (isSelectable && value && groupContext) {
      groupContext.registerChip(value, buttonRef);
      return () => groupContext.unregisterChip(value);
    }
  }, [isSelectable, value, groupContext]);

  // Determine if selected
  const isSelected = isSelectable
    ? groupContext.type === 'single'
      ? groupContext.value === value
      : Array.isArray(groupContext.value) && groupContext.value.includes(value)
    : false;

  // MultiSelect shows check icon when selected
  const isMultiSelected =
    isSelectable && groupContext.type === 'multi' && isSelected;

  // Determine if there's content before/after for padding adjustments
  const hasBefore = Boolean(before) || isMultiSelected;
  const hasAfter = Boolean(after) || dismissable;

  const classes = chip({
    size,
    before: hasBefore,
    after: hasAfter,
  });
  const iconSize = chipSizeToIconSize[size];

  // Handle click based on chip type
  const handleClick = () => {
    if (dismissable && onDismiss) {
      onDismiss();
    } else if (isSelectable && groupContext) {
      if (groupContext.type === 'single') {
        groupContext.onChange(value);
      } else {
        // Multi-select: toggle value in array
        const currentValues = Array.isArray(groupContext.value)
          ? groupContext.value
          : [];
        const newValues = currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value];
        groupContext.onChange(newValues);
      }
    } else if (onClick) {
      onClick();
    }
  };

  // Handle keyboard navigation for selectable chips
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!isSelectable || !groupContext || !value) return;

    // Single select: arrow keys navigate and select
    if (groupContext.type === 'single') {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        groupContext.focusChip('next', value);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        groupContext.focusChip('prev', value);
      }
    }
    // Space/Enter handled by native button click
  };

  // Build aria-label for dismissable chips
  const childText = typeof children === 'string' ? children : undefined;
  const ariaLabel =
    dismissable && childText ? `${childText}, dismiss` : undefined;

  // Determine role for selectable chips
  const role = isSelectable
    ? groupContext.type === 'single'
      ? 'radio'
      : 'checkbox'
    : undefined;

  // Roving tabindex for single select (only selected or first is tabbable)
  const getTabIndex = () => {
    if (!isSelectable || !groupContext) return undefined;
    if (groupContext.type === 'single') {
      // If this chip is selected, it's tabbable
      if (isSelected) return 0;
      // If nothing is selected and this is the first chip, it's tabbable
      const hasSelection =
        groupContext.value !== undefined && groupContext.value !== '';
      if (!hasSelection && groupContext.chipValues[0] === value) return 0;
      // Otherwise not tabbable
      return -1;
    }
    // Multi-select: all chips are tabbable
    return 0;
  };

  return (
    <Box
      as="button"
      ref={buttonRef}
      className={cx(classes.container, className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={getTabIndex()}
      disabled={disabled ? true : undefined}
      aria-disabled={disabled ? true : undefined}
      aria-label={ariaLabel}
      role={role}
      aria-checked={isSelectable ? isSelected : undefined}
      data-selected={isSelected ? true : undefined}
      data-loading={loading ? true : undefined}
      aria-busy={loading ? true : undefined}
      type="button"
      data-deleted={deleted ? true : undefined}
      {...otherProps}
    >
      <HStack gap={gap || '4'} opacity={loading ? 0 : 1}>
        {isMultiSelected && (
          <Icon
            name="check"
            size={iconSize}
            className={classes.icon}
            aria-hidden
          />
        )}
        {before}
        {children}
        {dismissable ? (
          <Icon name="x" size={iconSize} className={classes.icon} aria-hidden />
        ) : (
          after
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
