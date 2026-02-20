import type { Placement } from '@floating-ui/react';
import { cx } from '@styled-system/css';
import {
  type MenuVariantProps,
  type SelectVariantProps,
  select,
} from '@styled-system/recipes';
import {
  Children,
  type ReactElement,
  isValidElement,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
import { Icon } from '../Icon';
import { Menu } from '../Menu';
import { MenuItem } from '../Menu/MenuItem';
import { MenuTrigger } from '../Menu/MenuTrigger';
import { SelectContext } from './SelectContext';
import type { SelectOptionProps } from './SelectOption';

export type SelectProps = Omit<BoxProps, keyof SelectVariantProps> &
  Pick<MenuVariantProps, 'packing'> &
  SelectVariantProps & {
    /** Selected value(s) */
    value?: string | string[] | null;
    /** Callback when value changes */
    onChange?: (value: string | string[] | null) => void;
    /** Allow multiple selections */
    multiple?: boolean;
    /** Placeholder text when no selection */
    placeholder?: string;
    /** Controlled open state */
    open?: boolean;
    /** Callback when open state should change */
    onOpenChange?: (open: boolean) => void;
    /** Floating UI placement */
    placement?: Placement;
    /** Offset distance from trigger (in pixels) */
    offset?: number;
    /** Children (SelectTrigger, SelectOption) */
    children: React.ReactNode;
    /** Optional ID for ARIA attributes */
    id?: string;
    /** Disabled state */
    disabled?: boolean;
    /** Error state */
    error?: boolean;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /** Selection indicator position */
    indicatorPosition?: 'left' | 'right';
    packing?: 'default' | 'compact' | 'comfortable';
  };

export const Select = (props: SelectProps) => {
  const {
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
    size = 'md',
    indicatorPosition = 'left',
    packing = 'default',
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);

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
  const options = Children.toArray(children).filter((child) => {
    return (
      isValidElement(child) &&
      typeof child.props === 'object' &&
      child.props !== null &&
      'value' in child.props
    );
  }) as ReactElement<SelectOptionProps>[];

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
    }
    const selectedOption = options.find(
      (option) => option.props.value === value,
    );
    return (
      selectedOption?.props?.label ||
      selectedOption?.props?.value ||
      placeholder
    );
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
        packing={packing}
        indicatorPosition={indicatorPosition}
        // biome-ignore lint/a11y/useSemanticElements: custom select listbox must not use <select> — role="listbox" is correct ARIA for custom select
        role="listbox"
        aria-orientation="vertical"
        {...(error && { 'data-error': true })}
        {...otherProps}
      >
        <MenuTrigger disabled={disabled}>
          <Box
            className={cx(styles.trigger, className)}
            size={size}
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
        {Children.map(children, (child, index) => {
          if (!isValidElement(child)) return child;

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
