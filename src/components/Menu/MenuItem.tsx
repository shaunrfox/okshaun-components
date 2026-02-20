import { cx } from '@styled-system/css';
import type React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
import { Checkbox } from '../Checkbox';
import { Icon, type IconNamesList } from '../Icon';
import { useMenuContext } from './MenuContext';

export type MenuItemType = 'action' | 'single-select' | 'multi-select';
export type SelectionIndicator = 'checkmark' | 'checkbox';

export type MenuItemProps = Omit<BoxProps, 'children'> & {
  /** Item behavior type */
  type?: MenuItemType;
  /** Selected state (for single-select and multi-select) */
  selected?: boolean;
  /** Callback when item is selected/activated */
  onSelect?: () => void;
  /** Disable the item */
  disabled?: boolean;
  /** Primary label (required) */
  label: string | React.ReactNode;
  /** Secondary description text */
  description?: string;
  /** Icon on the left side */
  iconLeft?: IconNamesList;
  /** Icon on the right side */
  iconRight?: IconNamesList;
  /** Text to highlight (for autocomplete/search scenarios) */
  highlightMatch?: string;
  /** Selection indicator style (only for select types) */
  selectionIndicator?: SelectionIndicator;
  /** Index for keyboard navigation (managed internally via context) */
  index?: number;
};

/**
 * Highlights matching text within a string by wrapping matches in <mark> tags
 */
const highlightText = (text: string, match?: string): React.ReactNode => {
  if (!match || typeof text !== 'string') return text;

  const regex = new RegExp(
    `(${match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi',
  );
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (regex.test(part)) {
      // biome-ignore lint/suspicious/noArrayIndexKey: parts from stable regex text split — order never changes
      return <mark key={i}>{part}</mark>;
    }
    return part;
  });
};

export const MenuItem = (props: MenuItemProps) => {
  const {
    type = 'action',
    selected = false,
    onSelect,
    disabled = false,
    label,
    description,
    iconLeft,
    iconRight,
    highlightMatch,
    selectionIndicator = 'checkmark',
    index,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const { getItemProps, activeIndex, listRef, classes, setOpen } =
    useMenuContext();
  const itemRef = useRef<HTMLDivElement>(null);

  // Register this item in the list for keyboard navigation
  useEffect(() => {
    if (index !== undefined && itemRef.current) {
      listRef.current[index] = itemRef.current;
    }
  }, [index, listRef]);

  const isActive = index !== undefined && activeIndex === index;
  const isSelectable = type === 'single-select' || type === 'multi-select';
  const showIndicator = isSelectable;

  const handleClick = useCallback(() => {
    if (disabled) return;

    onSelect?.();

    // Close menu after action or single-select
    if (type === 'action' || type === 'single-select') {
      setOpen(false);
    }
  }, [disabled, onSelect, type, setOpen]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (disabled) return;

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    },
    [disabled, handleClick],
  );

  // Render selection indicator
  const renderIndicator = () => {
    if (!showIndicator) return null;

    if (selectionIndicator === 'checkbox') {
      return (
        <Box className={classes.menuItemIndicator}>
          <Checkbox
            name={`menu-item-checkbox-${index ?? 'unknown'}`}
            checked={selected}
            onChange={() => {}}
            tabIndex={-1}
            aria-hidden
          />
        </Box>
      );
    }

    // Checkmark indicator
    return (
      <Box className={classes.menuItemIndicator}>
        {selected && <Icon name="check" size="24" />}
      </Box>
    );
  };

  // Render label with optional highlighting
  const renderLabel = () => {
    const labelContent =
      typeof label === 'string' && highlightMatch
        ? highlightText(label, highlightMatch)
        : label;

    return <Box className={classes.menuItemLabel}>{labelContent}</Box>;
  };

  return (
    <Box
      ref={itemRef}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      data-selected={selected}
      data-active={isActive}
      className={cx(classes.menuItem, className)}
      {...(getItemProps({
        index,
        active: isActive,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
      }) as Record<string, unknown>)}
      {...otherProps}
    >
      {/* Selection indicator (left position by default) */}
      {renderIndicator()}

      {/* Left icon */}
      {iconLeft && (
        <Box className={classes.menuItemIconLeft}>
          <Icon name={iconLeft} size="24" />
        </Box>
      )}

      {/* Content (label + description) */}
      <Box className={classes.menuItemContent}>
        {renderLabel()}
        {description && (
          <Box className={classes.menuItemDescription}>{description}</Box>
        )}
      </Box>

      {/* Right icon */}
      {iconRight && (
        <Box className={classes.menuItemIconRight}>
          <Icon name={iconRight} size="24" />
        </Box>
      )}
    </Box>
  );
};
