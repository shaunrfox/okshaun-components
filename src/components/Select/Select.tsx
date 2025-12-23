import React, { useState, useMemo, useCallback } from 'react';
import { Menu } from '../Menu';
import { MenuTrigger } from '../Menu/MenuTrigger';
import { MenuItem } from '../Menu/MenuItem';
import { Box } from '../Box';
import { Icon } from '../Icon';
import { SelectContext } from './SelectContext';
import type { SelectProps, SelectOptionProps } from './types';
import { select } from '@styled-system/recipes';

export const Select: React.FC<SelectProps> = ({
  value: controlledValue,
  onChange,
  multiple = false,
  placeholder = 'Select...',
  open: controlledOpen,
  onOpenChange,
  placement = 'bottom-start',
  offset = 4,
  children,
  id,
  disabled = false,
  error = false,
  size = 'default',
  indicatorPosition = 'left',
  ...props
}) => {
  // Internal state for uncontrolled component
  const [internalOpen, setInternalOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | string[] | null>(
    null,
  );

  // Determine if component is controlled or uncontrolled
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleOpenChange = (newOpen: boolean) => {
    if (isControlled) {
      onOpenChange?.(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
  };

  const handleValueChange = useCallback(
    (newValue: string | string[] | null) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [controlledValue, onChange],
  );

  // Context value
  const contextValue = useMemo(
    () => ({
      value,
      onChange: handleValueChange,
      multiple,
      placeholder,
    }),
    [value, handleValueChange, multiple, placeholder],
  );

  // Collect all options to build display text
  const options = React.Children.toArray(children).filter((child) => {
    return (
      React.isValidElement(child) &&
      typeof child.props === 'object' &&
      child.props !== null &&
      'value' in child.props
    );
  }) as React.ReactElement<SelectOptionProps>[];

  // Find selected option(s) for display
  const getDisplayText = () => {
    if (value === null || value === undefined || value === '') {
      return placeholder;
    }

    if (multiple) {
      const selectedValues = Array.isArray(value)
        ? value
        : [value].filter(Boolean);
      const selectedOptions = options.filter((option) =>
        selectedValues.includes(option.props.value),
      );
      return selectedOptions.length > 0
        ? selectedOptions
            .map((opt) => opt.props.label || opt.props.value)
            .join(', ')
        : placeholder;
    } else {
      const selectedOption = options.find(
        (option) => option.props.value === value,
      );
      return (
        selectedOption?.props?.label ||
        selectedOption?.props?.value ||
        placeholder
      );
    }
  };

  // Get slot classes from recipe
  const styles = select({ size });
  const hasValue = value !== null && value !== undefined && value !== '';

  return (
    <SelectContext.Provider value={contextValue}>
      <Menu
        open={open}
        onOpenChange={handleOpenChange}
        placement={placement}
        offset={offset}
        id={id}
        size={size}
        indicatorPosition={indicatorPosition}
        role="listbox"
        aria-orientation="vertical"
        {...(error && { 'data-error': true })}
        {...props}
      >
        <MenuTrigger disabled={disabled}>
          <Box
            className={styles.trigger}
            {...(disabled && { 'data-disabled': true })}
            {...(error && { 'data-error': true })}
          >
            <Box className={hasValue ? styles.value : styles.placeholder}>
              {getDisplayText()}
            </Box>
            <Icon
              name="caret-down"
              size="20"
              className={styles.icon}
              data-open={open}
            />
          </Box>
        </MenuTrigger>

        {/* Convert SelectOption children to MenuItem components */}
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child;

          // Check if this is a SelectOption by looking for the value prop
          if (
            typeof child.props === 'object' &&
            child.props !== null &&
            'value' in child.props
          ) {
            const childProps = child.props as SelectOptionProps;
            const {
              value: optionValue,
              label,
              description,
              disabled: optionDisabled,
              iconLeft,
              iconRight,
              ...optionProps
            } = childProps;

            const isSelected = multiple
              ? Array.isArray(value) && value.includes(optionValue)
              : value === optionValue;

            return (
              <MenuItem
                key={optionValue}
                index={index}
                type="single-select"
                selected={isSelected}
                disabled={optionDisabled}
                label={label}
                description={description}
                iconLeft={iconLeft}
                iconRight={iconRight}
                onSelect={() => {
                  if (multiple) {
                    const currentArray = Array.isArray(value)
                      ? value
                      : value
                        ? [value]
                        : [];
                    const newValue = isSelected
                      ? currentArray.filter((v) => v !== optionValue)
                      : [...currentArray, optionValue];
                    handleValueChange(newValue.length > 0 ? newValue : null);
                  } else {
                    handleValueChange(isSelected ? null : optionValue);
                    handleOpenChange(false);
                  }
                }}
                {...optionProps}
              />
            );
          }

          return child;
        })}
      </Menu>
    </SelectContext.Provider>
  );
};
