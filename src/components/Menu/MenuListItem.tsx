import React, { useCallback, useId } from 'react';
import { Box } from '../Box';
import { Icon } from '../Icon';
import { Checkbox } from '../Checkbox';
import { cx } from '@styled-system/css';
import { menu as menuRecipe } from '@styled-system/recipes';
import { splitProps } from '~/utils/splitProps';
import type { MenuListItemProps } from './types';

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

  return parts.map((part, i) =>
    regex.test(part) ? <mark key={i}>{part}</mark> : part,
  );
};

export const MenuListItem = React.forwardRef<HTMLDivElement, MenuListItemProps>(
  (
    {
      type = 'action',
      selected = false,
      active = false,
      onClick,
      disabled = false,
      label,
      description,
      iconLeft,
      iconRight,
      highlightMatch,
      selectionIndicator = 'checkmark',
      size,
      indicatorPosition,
      role = 'option',
      className,
      ...props
    },
    ref,
  ) => {
    const [cssClassName, otherProps] = splitProps(props);
    const classes = menuRecipe({ size, indicatorPosition });
    const checkboxId = useId();

    const isSelectable = type === 'single-select' || type === 'multi-select';
    const showIndicator = isSelectable;

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return;
        onClick?.(event);
      },
      [disabled, onClick],
    );

    // Render selection indicator
    const renderIndicator = () => {
      if (!showIndicator) return null;

      if (selectionIndicator === 'checkbox') {
        return (
          <Box className={classes.menuItemIndicator}>
            <Checkbox
              name={`menu-list-item-checkbox-${checkboxId}`}
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
        ref={ref}
        role={role}
        aria-disabled={disabled}
        aria-selected={selected}
        data-selected={selected}
        data-active={active}
        className={cx(classes.menuItem, cssClassName, className)}
        onClick={handleClick}
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
  },
);

MenuListItem.displayName = 'MenuListItem';
