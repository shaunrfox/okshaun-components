import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useListNavigation,
  offset as floatingOffset,
  flip,
  shift,
  autoUpdate,
  FloatingPortal,
  FloatingFocusManager,
  size as floatingSize,
} from '@floating-ui/react';
import { TextInput } from '../TextInput';
import { MenuList, MenuListItem } from '../Menu';
import type { AutocompleteProps, AutocompleteOption } from './types';
import type { IconNamesList } from '../Icon';

const defaultFilter = (
  option: AutocompleteOption,
  inputValue: string,
): boolean => {
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};

export const Autocomplete: React.FC<AutocompleteProps> = ({
  name,
  value,
  onChange,
  options,
  onSelect,
  placeholder,
  placement = 'bottom-start',
  offset = 4,
  id,
  disabled = false,
  error = false,
  packing,
  size,
  indicatorPosition,
  filterFn = defaultFilter,
  noResultsMessage = 'No results found',
  inputProps,
}) => {
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
  const role = useRole(context, { role: 'listbox' });
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
      if (e.key === 'Enter' && open && filteredOptions.length > 0) {
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
      } else if (e.key === 'Escape') {
        setOpen(false);
      } else if (e.key === 'ArrowDown' && !open) {
        setOpen(true);
      }
    },
    [activeIndex, filteredOptions, onSelect, onChange, open],
  );

  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (
        e.key === 'Enter' &&
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
      if (e.key === 'Enter' || e.key === ' ') {
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
        } as any) as Record<string, unknown>)}
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
                      } as any) as Record<string, unknown>)}
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
