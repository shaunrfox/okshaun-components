import {
  FloatingFocusManager,
  FloatingPortal,
  type Placement,
  autoUpdate,
  flip,
  offset as floatingOffset,
  size as floatingSize,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";
import type { MenuVariantProps } from "@styled-system/recipes";
import type React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import type { IconNamesList } from "../Icon";
import { MenuList, MenuListItem } from "../Menu";
import { TextInput, type TextInputProps } from "../TextInput";

export interface AutocompleteOption {
  /** Unique identifier for the option */
  id: string;
  /** Display label */
  label: string;
  /** Optional description */
  description?: string;
  /** Optional icon name */
  icon?: string;
  /** Whether this option is disabled */
  disabled?: boolean;
}

export type AutocompleteProps = MenuVariantProps & {
  /** Input name attribute */
  name: string;
  /** Current input value */
  value: string;
  /** Callback when input value changes */
  onChange: (value: string) => void;
  /** Size of the input */
  size?: "sm" | "md" | "lg" | "xl";
  /** Available options to filter and display */
  options: AutocompleteOption[];
  /** Callback when an option is selected */
  onSelect: (option: AutocompleteOption) => void;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Floating UI placement */
  placement?: Placement;
  /** Offset distance from input (in pixels) */
  offset?: number;
  /** Optional ID for ARIA attributes */
  id?: string;
  /** Disable the autocomplete */
  disabled?: boolean;
  /** Show error state */
  error?: boolean;
  /** Custom filter function (defaults to case-insensitive label match) */
  filterFn?: (option: AutocompleteOption, inputValue: string) => boolean;
  /** Message to show when no options match */
  noResultsMessage?: string;
  /** Props to pass to the TextInput */
  inputProps?: Omit<
    TextInputProps,
    "name" | "value" | "onChange" | "disabled" | "error" | "id"
  >;
};

const defaultFilter = (
  option: AutocompleteOption,
  inputValue: string,
): boolean => {
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};

export const Autocomplete = (props: AutocompleteProps) => {
  const {
    name,
    value,
    onChange,
    options,
    onSelect,
    placeholder,
    placement = "bottom-start",
    offset = 4,
    id,
    disabled = false,
    error = false,
    packing,
    size,
    indicatorPosition,
    filterFn = defaultFilter,
    noResultsMessage = "No results found",
    inputProps,
  } = props;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<(HTMLElement | null)[]>([]);

  // Filter options based on input value
  const filteredOptions = useMemo(() => {
    if (!value) return options;
    return options.filter((option) => filterFn(option, value));
  }, [options, value, filterFn]);

  // Floating UI setup
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [
      floatingOffset(offset),
      flip(),
      shift({ padding: 8 }),
      floatingSize({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  // Interaction hooks
  const click = useClick(context, { keyboardHandlers: false });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role, listNavigation],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
      if (!open) setOpen(true);
    },
    [onChange, open],
  );

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && open && filteredOptions.length > 0) {
        e.preventDefault();
        e.stopPropagation();

        // Use activeIndex if set, otherwise use first option
        const indexToSelect = activeIndex !== null ? activeIndex : 0;
        const option = filteredOptions[indexToSelect];

        if (option && !option.disabled) {
          onSelect(option);
          onChange(option.label);
          setOpen(false);
        }
      } else if (e.key === "Escape") {
        setOpen(false);
      } else if (e.key === "ArrowDown" && !open) {
        setOpen(true);
      }
    },
    [activeIndex, filteredOptions, onSelect, onChange, open],
  );

  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        activeIndex !== null &&
        filteredOptions[activeIndex]
      ) {
        e.preventDefault();
        const option = filteredOptions[activeIndex];
        if (!option.disabled) {
          onSelect(option);
          onChange(option.label);
          setOpen(false);
        }
      }
    },
    [activeIndex, filteredOptions, onSelect, onChange],
  );

  const handleOptionClick = useCallback(
    (option: AutocompleteOption) => {
      if (option.disabled) return;
      onSelect(option);
      onChange(option.label);
      setOpen(false);
    },
    [onSelect, onChange],
  );

  const handleOptionKeyDown = useCallback(
    (e: React.KeyboardEvent, option: AutocompleteOption) => {
      if (option.disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleOptionClick(option);
      }
    },
    [handleOptionClick],
  );

  const handleInputFocus = useCallback(() => {
    if (filteredOptions.length > 0) {
      setOpen(true);
    }
  }, [filteredOptions.length]);

  return (
    <>
      <TextInput
        ref={refs.setReference}
        name={name}
        id={id}
        value={value}
        size={size}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={open ? `${id ?? name}-listbox` : undefined}
        {...(getReferenceProps({
          onKeyDown: handleInputKeyDown,
        }) as Record<string, unknown>)}
        {...inputProps}
      />

      {open && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
          >
            <MenuList
              ref={refs.setFloating}
              style={floatingStyles}
              id={`${id ?? name}-listbox`}
              // biome-ignore lint/a11y/useSemanticElements: custom combobox listbox must not use <select> — role="listbox" is correct ARIA for custom autocomplete
              role="listbox"
              packing={packing}
              indicatorPosition={indicatorPosition}
              onKeyDown={handleMenuKeyDown}
              {...(getFloatingProps() as Record<string, unknown>)}
            >
              {filteredOptions.length === 0 ? (
                <MenuListItem
                  label={noResultsMessage}
                  disabled
                  indicatorPosition={indicatorPosition}
                />
              ) : (
                filteredOptions.map((option, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <MenuListItem
                      key={option.id}
                      ref={(node: HTMLElement | null) => {
                        listRef.current[index] = node;
                      }}
                      active={isActive}
                      aria-selected={isActive}
                      disabled={option.disabled}
                      label={option.label}
                      description={option.description}
                      iconLeft={option.icon as IconNamesList}
                      highlightMatch={value || undefined}
                      indicatorPosition={indicatorPosition}
                      {...(getItemProps({
                        index,
                        active: isActive,
                        onClick: () => handleOptionClick(option),
                        onKeyDown: (e: React.KeyboardEvent) =>
                          handleOptionKeyDown(e, option),
                      } as React.HTMLProps<HTMLElement> & {
                        index?: number;
                        active?: boolean;
                      }) as Record<string, unknown>)}
                    />
                  );
                })
              )}
            </MenuList>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};
