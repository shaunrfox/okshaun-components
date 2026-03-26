import {
  FloatingFocusManager,
  FloatingPortal,
  size as floatingSize,
  type Placement,
  useDismiss,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import { menu } from '@styled-system/recipes';
import type { ChangeEvent, HTMLProps, KeyboardEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { MenuDensity } from '~/components/Menu';
import {
  createOverlayMiddleware,
  useOverlayFloating,
} from '~/system/floating-ui/floating';

import type { IconNamesList } from '../Icon';
import { List, ListItem } from '../List';
import { TextInput, type TextInputProps } from '../TextInput';

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

export type AutocompleteProps = {
  /** Input name attribute */
  name: string;
  /** Current input value */
  value: string;
  /** Callback when input value changes */
  onChange: (value: string) => void;
  /** Popup density */
  density?: MenuDensity;
  /** Deprecated alias for density */
  packing?: MenuDensity;
  /** Size of the input */
  size?: 'sm' | 'md' | 'lg' | 'xl';
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
    'name' | 'value' | 'onChange' | 'disabled' | 'error' | 'id'
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
    density,
    placeholder,
    placement = 'bottom-start',
    offset = 4,
    id,
    disabled,
    error,
    size,
    filterFn = defaultFilter,
    noResultsMessage = 'No results found',
    inputProps,
    packing,
  } = props;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<(HTMLElement | null)[]>([]);
  const resolvedDensity = density ?? packing ?? 'compact';

  const filteredOptions = useMemo(() => {
    if (!value) {
      return options;
    }

    return options.filter((option) => filterFn(option, value));
  }, [filterFn, options, value]);
  const disabledIndices = useMemo(() => {
    return filteredOptions.flatMap((option, index) =>
      option.disabled ? index : [],
    );
  }, [filteredOptions]);
  const selectedOptionIndex = useMemo(() => {
    return filteredOptions.findIndex(
      (option) => !option.disabled && option.label === value,
    );
  }, [filteredOptions, value]);

  const floating = useOverlayFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: createOverlayMiddleware({
      offset,
      extras: [
        floatingSize({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              minWidth: `${rects.reference.width}px`,
            });
          },
        }),
      ],
    }),
  });
  const dismiss = useDismiss(floating.context);
  const role = useRole(floating.context, { role: 'listbox' });
  const listNavigation = useListNavigation(floating.context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
    disabledIndices,
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [dismiss, role, listNavigation],
  );
  const popupClasses = menu({ density: resolvedDensity });

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
      setActiveIndex(null);
      if (!open) {
        setOpen(true);
      }
    },
    [onChange, open],
  );

  const handleInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }

      if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && !open) {
        event.preventDefault();
        setOpen(true);
        return;
      }

      if (event.key !== 'Enter' || !open || filteredOptions.length === 0) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const indexToSelect = activeIndex !== null ? activeIndex : 0;
      const option = filteredOptions[indexToSelect];

      if (!option || option.disabled) {
        return;
      }

      onSelect(option);
      onChange(option.label);
      setOpen(false);
    },
    [activeIndex, filteredOptions, onChange, onSelect, open],
  );

  const handleOptionClick = useCallback(
    (option: AutocompleteOption) => {
      if (option.disabled) {
        return;
      }

      onSelect(option);
      onChange(option.label);
      setOpen(false);
    },
    [onChange, onSelect],
  );

  useEffect(() => {
    if (!open) {
      setActiveIndex(null);
      return;
    }

    if (selectedOptionIndex >= 0) {
      setActiveIndex(selectedOptionIndex);
      return;
    }

    const firstEnabledIndex = filteredOptions.findIndex(
      (option) => !option.disabled,
    );
    setActiveIndex(firstEnabledIndex >= 0 ? firstEnabledIndex : null);
  }, [filteredOptions, open, selectedOptionIndex]);

  const activeOption =
    activeIndex !== null ? filteredOptions[activeIndex] : null;
  const activeOptionId = activeOption
    ? `${id ?? name}-option-${activeOption.id}`
    : undefined;
  const listboxId = `${id ?? name}-listbox`;

  return (
    <>
      <TextInput
        ref={floating.refs.setReference}
        name={name}
        id={id}
        value={value}
        size={size}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        autoComplete="off"
        aria-autocomplete="list"
        aria-controls={open ? listboxId : undefined}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-activedescendant={activeOptionId}
        {...(getReferenceProps({
          ...(inputProps as Record<string, unknown>),
          onKeyDown: handleInputKeyDown,
          onFocus: () => setOpen(true),
          role: 'combobox',
        }) as Record<string, unknown>)}
      />

      {open && (
        <FloatingPortal>
          <FloatingFocusManager
            context={floating.context}
            modal={false}
            initialFocus={-1}
          >
            {/* biome-ignore lint/a11y/useSemanticElements: custom combobox popup uses an ARIA listbox on a non-native container */}
            <List
              ref={floating.refs.setFloating}
              className={popupClasses.wrapper}
              style={floating.floatingStyles}
              id={listboxId}
              role="listbox"
              density={resolvedDensity}
              query={value}
              highlightMatches
              {...(getFloatingProps() as Record<string, unknown>)}
            >
              {filteredOptions.length === 0 ? (
                <ListItem label={noResultsMessage} disabled />
              ) : (
                filteredOptions.map((option, index) => {
                  const isActive = activeIndex === index;
                  const isSelected = option.label === value;

                  return (
                    <ListItem
                      key={option.id}
                      id={`${id ?? name}-option-${option.id}`}
                      ref={(node: HTMLElement | null) => {
                        listRef.current[index] = node;
                      }}
                      active={isActive}
                      selected={isSelected}
                      disabled={option.disabled}
                      label={option.label}
                      description={option.description}
                      iconBefore={option.icon as IconNamesList}
                      {...(getItemProps({
                        index,
                        active: isActive,
                        onClick: () => handleOptionClick(option),
                      } as HTMLProps<HTMLElement> & {
                        index?: number;
                        active?: boolean;
                      }) as Record<string, unknown>)}
                    />
                  );
                })
              )}
            </List>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
};
