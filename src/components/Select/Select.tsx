import {
  FloatingFocusManager,
  FloatingPortal,
  size as floatingSize,
  type Placement,
  useClick,
  useDismiss,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from '@floating-ui/react';
import { cx } from '@styled-system/css';
import { menu, type SelectVariantProps, select } from '@styled-system/recipes';
import {
  Children,
  type HTMLProps,
  isValidElement,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { MenuDensity } from '~/components/Menu';
import { useFloatingLayer } from '~/system/floating-ui/FloatingLayerContext';
import {
  createOverlayMiddleware,
  useOverlayFloating,
} from '~/system/floating-ui/floating';
import { useControllableState } from '~/system/hooks';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
import { Chip } from '../Chip';
import { Icon } from '../Icon';
import { List, ListItem } from '../List';
import { SelectContext } from './SelectContext';
import type { SelectOptionProps } from './SelectOption';

type SelectValue = string | string[] | null;

const defaultDensity: MenuDensity = 'compact';

const isSelectOptionElement = (
  child: ReactNode,
): child is ReactElement<SelectOptionProps> => {
  return (
    isValidElement(child) &&
    typeof child.props === 'object' &&
    child.props !== null &&
    'value' in child.props
  );
};

const getOptionText = (option: ReactElement<SelectOptionProps>) => {
  return typeof option.props.label === 'string'
    ? option.props.label
    : option.props.value;
};

const getSelectedDisplay = (
  options: ReactElement<SelectOptionProps>[],
  value: SelectValue,
  multiple: boolean,
  placeholder: string,
) => {
  if (value === null || value === undefined || value === '') {
    return placeholder;
  }

  if (multiple) {
    const selectedValues = Array.isArray(value)
      ? value
      : ([value].filter(Boolean) as string[]);
    const selectedOptions = options.filter((option) =>
      selectedValues.includes(option.props.value),
    );

    if (selectedOptions.length === 0) {
      return placeholder;
    }

    return selectedOptions.map(getOptionText).join(', ');
  }

  const selectedOption = options.find((option) => option.props.value === value);
  return selectedOption ? getOptionText(selectedOption) : placeholder;
};

export type SelectProps = Omit<
  BoxProps<'button'>,
  keyof SelectVariantProps | 'children' | 'onChange' | 'type' | 'value'
> &
  SelectVariantProps & {
    value?: SelectValue;
    defaultValue?: SelectValue;
    onChange?: (value: SelectValue) => void;
    multiple?: boolean;
    placeholder?: string;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    placement?: Placement;
    offset?: number;
    children: ReactNode;
    id?: string;
    name?: string;
    disabled?: boolean;
    error?: boolean;
    density?: MenuDensity;
    autoSize?: boolean;
  };

export const Select = (props: SelectProps) => {
  const {
    value: controlledValue,
    defaultValue = null,
    onChange,
    multiple = false,
    placeholder = 'Select...',
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    placement = 'bottom-start',
    offset = 4,
    children,
    id,
    name,
    disabled = false,
    error = false,
    size = 'md',
    density = defaultDensity,
    autoSize = false,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);

  const generatedId = useId();
  const triggerId = id ?? `select-${generatedId}`;
  const listboxId = `${triggerId}-listbox`;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [value, setValue] = useControllableState<SelectValue>({
    value: controlledValue,
    defaultValue: defaultValue ?? (multiple ? ([] as string[]) : null),
    onChange,
  });
  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const options = useMemo(() => {
    return Children.toArray(children).filter(isSelectOptionElement);
  }, [children]);

  const selectedIndex = useMemo(() => {
    return options.findIndex((option) => {
      if (multiple) {
        return Array.isArray(value) && value.includes(option.props.value);
      }

      return option.props.value === value;
    });
  }, [multiple, options, value]);

  const firstEnabledIndex = useMemo(() => {
    return options.findIndex((option) => !option.props.disabled);
  }, [options]);

  const disabledIndices = useMemo(() => {
    return options.flatMap((option, index) =>
      option.props.disabled ? index : [],
    );
  }, [options]);

  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(null);
      return;
    }

    if (selectedIndex >= 0) {
      setActiveIndex(selectedIndex);
      return;
    }

    setActiveIndex(firstEnabledIndex >= 0 ? firstEnabledIndex : null);
  }, [firstEnabledIndex, isOpen, selectedIndex]);

  const setOpenState = (nextOpen: boolean) => {
    setIsOpen(nextOpen);
  };

  const handleValueChange = useCallback(
    (nextValue: SelectValue) => {
      setValue(nextValue);
    },
    [setValue],
  );

  const floating = useOverlayFloating({
    open: isOpen,
    onOpenChange: (nextOpen) => {
      if (!disabled) {
        setOpenState(nextOpen);
      }
    },
    placement,
    middleware: createOverlayMiddleware({
      offset,
      extras: [
        floatingSize({
          apply({ rects, elements }) {
            elements.floating.style.minWidth = `${rects.reference.width}px`;
          },
        }),
      ],
    }),
  });

  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  const click = useClick(floating.context, {
    enabled: !disabled,
  });
  const dismiss = useDismiss(floating.context, {
    enabled: !disabled,
  });
  const role = useRole(floating.context, { role: 'listbox' });
  const listNavigation = useListNavigation(floating.context, {
    listRef: itemRefs,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
    disabledIndices,
  });
  const typeahead = useTypeahead(floating.context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: setActiveIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role, listNavigation, typeahead],
  );

  const contextValue = useMemo(
    () => ({
      value,
      onChange: handleValueChange,
      multiple,
      placeholder,
    }),
    [handleValueChange, multiple, placeholder, value],
  );

  const displayValue = getSelectedDisplay(
    options,
    value,
    multiple,
    placeholder,
  );
  const styles = select({ size });
  const floatingLayer = useFloatingLayer();
  const menuStyles = menu({ density, layer: floatingLayer });
  const hasValue = value !== null && value !== undefined && value !== '';
  const selectedValues = multiple
    ? Array.isArray(value)
      ? value
      : value
        ? [value]
        : []
    : hasValue
      ? [String(value)]
      : [];
  const activeOption =
    isOpen && activeIndex !== null ? options[activeIndex] : undefined;
  const activeOptionId = activeOption
    ? `${triggerId}-option-${activeOption.props.value}`
    : undefined;

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }

    if (!isOpen && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
      event.preventDefault();
      setOpenState(true);
      return;
    }

    if (
      !isOpen &&
      !multiple &&
      hasValue &&
      (event.key === 'Backspace' || event.key === 'Delete')
    ) {
      event.preventDefault();
      handleValueChange(null);
    }
  };

  const handleOptionSelect = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : value ? [value] : [];
      const nextValues = currentValues.includes(optionValue)
        ? currentValues.filter((currentValue) => currentValue !== optionValue)
        : [...currentValues, optionValue];

      handleValueChange(nextValues.length > 0 ? nextValues : null);
      return;
    }

    handleValueChange(optionValue === value ? null : optionValue);
    setOpenState(false);
  };

  return (
    <SelectContext value={contextValue}>
      <Box as="span" display="inline-flex" flexDirection="column">
        <Box
          as="button"
          type="button"
          id={triggerId}
          ref={floating.refs.setReference}
          className={cx(styles.trigger, className)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          aria-activedescendant={activeOptionId}
          disabled={disabled}
          data-disabled={disabled || undefined}
          data-error={error || undefined}
          data-auto-size={autoSize || undefined}
          {...(getReferenceProps({
            onKeyDown: handleTriggerKeyDown,
          }) as Record<string, unknown>)}
          {...otherProps}
        >
          {multiple && selectedValues.length > 0 ? (
            <Box
              display="flex"
              flexWrap={autoSize ? 'wrap' : 'nowrap'}
              gap="2"
              overflowX={autoSize ? 'visible' : 'auto'}
              className={styles.chips}
            >
              {selectedValues.map((selectedValue) => {
                const option = options.find(
                  (entry) => entry.props.value === selectedValue,
                );
                const chipLabel = option
                  ? getOptionText(option)
                  : selectedValue;

                return (
                  <Chip
                    key={selectedValue}
                    size="sm"
                    dismissable
                    dismissLabel={`${chipLabel}, remove`}
                    onDismiss={() => {
                      handleValueChange(
                        selectedValues.filter(
                          (entry) => entry !== selectedValue,
                        ),
                      );
                    }}
                  >
                    {chipLabel}
                  </Chip>
                );
              })}
            </Box>
          ) : (
            <Box className={hasValue ? styles.value : styles.placeholder}>
              {displayValue}
            </Box>
          )}
          <Icon
            name="caret-down"
            size="20"
            className={styles.icon}
            data-open={isOpen}
          />
        </Box>

        {name &&
          selectedValues.map((hiddenValue, index) => (
            <input
              key={`${name}-${index}-${hiddenValue}`}
              type="hidden"
              name={name}
              value={hiddenValue}
            />
          ))}

        {isOpen && !disabled && (
          <FloatingPortal>
            <FloatingFocusManager
              context={floating.context}
              modal={false}
              initialFocus={-1}
            >
              {/* biome-ignore lint/a11y/useSemanticElements: custom select popup uses an ARIA listbox on a non-native container */}
              <List
                ref={floating.refs.setFloating}
                id={listboxId}
                role="listbox"
                aria-labelledby={triggerId}
                aria-multiselectable={multiple || undefined}
                density={density}
                className={menuStyles.wrapper}
                style={floating.floatingStyles}
                {...(getFloatingProps() as Record<string, unknown>)}
              >
                {options.map((option, index) => {
                  const optionLabel = getOptionText(option);
                  const isSelected = multiple
                    ? Array.isArray(value) && value.includes(option.props.value)
                    : value === option.props.value;
                  const optionId = `${triggerId}-option-${option.props.value}`;

                  return (
                    <ListItem
                      key={option.props.value}
                      id={optionId}
                      ref={(node: HTMLElement | null) => {
                        itemRefs.current[index] = node;
                        labelsRef.current[index] = optionLabel;
                      }}
                      disabled={option.props.disabled}
                      selected={isSelected}
                      variant={multiple ? 'checkbox' : 'default'}
                      label={optionLabel}
                      description={option.props.description}
                      iconBefore={option.props.iconLeft}
                      iconAfter={option.props.iconRight}
                      aria-selected={isSelected}
                      {...(getItemProps({
                        onClick: () => {
                          if (!option.props.disabled) {
                            handleOptionSelect(option.props.value);
                          }
                        },
                      } as HTMLProps<HTMLElement>) as Record<string, unknown>)}
                    />
                  );
                })}
              </List>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </Box>
    </SelectContext>
  );
};
