import React, { useCallback, useEffect, useRef } from 'react';
import { Box } from '../Box';
import { Icon } from '../Icon';
import { Checkbox } from '../Checkbox';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { useMenuContext } from './MenuContext';
import type { MenuItemProps } from './types';

/**
 * Highlights matching text within a string by wrapping matches in <mark> tags
 */
const highlightText = (text: string, match?: string): React.ReactNode => {
  if (!match || typeof text !== 'string') return text;

  const regex = new RegExp(`(${match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? <mark key={i}>{part}</mark> : part
  );
};

export const MenuItem: React.FC<MenuItemProps> = ({
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
  className,
  ...props
}) => {
  const [cssClassName, otherProps] = splitProps(props);
  const { getItemProps, activeIndex, listRef, classes, setOpen } = useMenuContext();
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
    [disabled, handleClick]
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
        {selected && <Icon name="check" size="20" />}
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
      className={cx(classes.menuItem, cssClassName, className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...(getItemProps({ index, active: isActive }) as Record<string, unknown>)}
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
