import {
  size as floatingSize,
  useDismiss,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import { autocomplete } from '@styled-system/recipes';
import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type UIEvent,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useFieldContext } from '~/system/context/FieldContext';
import { useLocale } from '~/system/context/useLocale';
import { useFloatingLayer } from '~/system/floating-ui/FloatingLayerContext';
import {
  createOverlayMiddleware,
  useOverlayFloating,
} from '~/system/floating-ui/floating';
import { splitProps } from '~/utils/splitProps';
import type {
  AutocompleteProps,
  MultipleAutocompleteProps,
  SingleAutocompleteProps,
} from './Autocomplete';
import type {
  AnyAutocompleteValue,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  AutocompleteOpenChangeReason,
  AutocompleteOptionData,
  AutocompleteValue,
} from './types';
import { useAutocompleteState } from './useAutocompleteState';
import {
  getAutocompleteValueArray,
  getFirstEnabledOptionIndex,
  isAutocompleteOptionMatch,
  normalizeAutocompleteOptions,
  resolveSelectedAutocompleteOption,
} from './utils';

const LOAD_MORE_THRESHOLD_PX = 32;

const chipSizeByAutocompleteSize = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
  xl: 'md',
} as const;

const resolveChipSize = (size: AutocompleteProps['size']): 'sm' | 'md' => {
  if (!size || typeof size === 'string') {
    return chipSizeByAutocompleteSize[size ?? 'md'];
  }

  const values = Array.isArray(size)
    ? (size as Array<string | null>)
    : Object.values(size as Record<string, unknown>);
  const firstSize = values.find(
    (value): value is keyof typeof chipSizeByAutocompleteSize =>
      typeof value === 'string' && value in chipSizeByAutocompleteSize,
  );

  return firstSize ? chipSizeByAutocompleteSize[firstSize] : 'sm';
};

const getDismissReason = (
  reason?: string,
): Extract<AutocompleteOpenChangeReason, 'escape' | 'outside-press'> => {
  return reason === 'escape-key' ? 'escape' : 'outside-press';
};

export const useAutocompleteController = (props: AutocompleteProps) => {
  const floatingLayer = useFloatingLayer();
  const fieldContext = useFieldContext();
  const { labels } = useLocale();
  const {
    value: controlledValue,
    defaultValue,
    onValueChange,
    onChange,
    inputValue: controlledInputValue,
    defaultInputValue,
    onInputValueChange,
    onInputChange,
    open: controlledOpen,
    defaultOpen,
    onOpenChange,
    multiple = false,
    allowCustomValue = false,
    isCustomValue,
    getCreateOptionLabel = labels.addOption,
    limitTags,
    placeholder = labels.selectPlaceholder,
    placement = 'bottom-start',
    offset = 4,
    children,
    id,
    name,
    disabled: disabledProp,
    readOnly = false,
    error: errorProp,
    valid = false,
    invalid: invalidProp,
    size: sizeProp,
    density = 'compact',
    loading = false,
    loadingMore = false,
    hasMore = false,
    onLoadMore,
    loadingText = labels.loadingOptions,
    noOptionsText = labels.noOptions,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    'aria-required': ariaRequired,
    ...rest
  } = props;
  const disabled = disabledProp ?? fieldContext?.disabled ?? false;
  const error = errorProp ?? fieldContext?.error ?? false;
  const invalid = invalidProp ?? fieldContext?.invalid ?? false;
  const size = sizeProp ?? fieldContext?.size ?? 'md';
  const [className, otherProps] = splitProps(rest);

  const generatedId = useId();
  const baseId = id ?? `autocomplete-${generatedId}`;
  const inputId = baseId;
  const listboxId = `${baseId}-listbox`;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const floatingElementRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const tokenRefs = useRef<Array<HTMLButtonElement | null>>([]);
  // Escape cancels a pending custom value; blur/outside-press must not commit
  // until the user types again.
  const suppressCreateCommitRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [focusedWithin, setFocusedWithin] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const baseOptions = useMemo(
    () => normalizeAutocompleteOptions(children),
    [children],
  );
  // Catalog only — session creates must not reappear as list rows (the live
  // create option is prepended separately). Chip styling uses `isCustomValue`.
  const options = baseOptions;
  const childOptionByValue = useMemo(
    () => new Map(baseOptions.map((option) => [option.value, option])),
    [baseOptions],
  );
  const optionByValue = childOptionByValue;
  const handleValueChange = useCallback(
    (
      nextValue: AutocompleteValue<boolean>,
      reason: AutocompleteChangeReason,
    ) => {
      if (multiple) {
        const multipleValue = nextValue as AutocompleteValue<true>;
        (onValueChange as MultipleAutocompleteProps['onValueChange'])?.(
          multipleValue,
          reason,
        );
        (onChange as MultipleAutocompleteProps['onChange'])?.(
          multipleValue,
          reason,
        );
        return;
      }

      const singleValue = nextValue as AutocompleteValue<false>;
      (onValueChange as SingleAutocompleteProps['onValueChange'])?.(
        singleValue,
        reason,
      );
      (onChange as SingleAutocompleteProps['onChange'])?.(singleValue, reason);
    },
    [multiple, onChange, onValueChange],
  );
  const handleInputValueChange = useCallback(
    (nextValue: string, reason: AutocompleteInputChangeReason) => {
      onInputValueChange?.(nextValue, reason);
      onInputChange?.(nextValue, reason);
    },
    [onInputChange, onInputValueChange],
  );

  const state = useAutocompleteState<boolean>({
    value: controlledValue,
    defaultValue,
    onValueChange: handleValueChange,
    inputValue: controlledInputValue,
    defaultInputValue,
    onInputValueChange: handleInputValueChange,
    open: controlledOpen,
    defaultOpen,
    onOpenChange,
    multiple,
    disabled,
    readOnly,
  });
  const currentValue = state.value as AnyAutocompleteValue;
  const isOpen = state.open;
  const currentInputValue = state.inputValue;
  const selectedValues = useMemo(
    () => getAutocompleteValueArray(currentValue, Boolean(multiple)),
    [currentValue, multiple],
  );
  const selectedOptions = useMemo(
    () =>
      selectedValues.map((selectedValue) =>
        resolveSelectedAutocompleteOption(
          selectedValue,
          childOptionByValue,
          optionByValue,
          allowCustomValue,
          multiple ? undefined : isCustomValue,
        ),
      ),
    [
      allowCustomValue,
      childOptionByValue,
      isCustomValue,
      multiple,
      optionByValue,
      selectedValues,
    ],
  );
  const selectionIsCreated = Boolean(!multiple && selectedOptions[0]?.created);
  const selectedLabels = useMemo(
    () =>
      selectedValues.map(
        (selectedValue, index) =>
          selectedOptions[index]?.label ?? selectedValue,
      ),
    [selectedOptions, selectedValues],
  );

  const visibleOptions = useMemo(() => {
    const query = currentInputValue.trim();

    if (!query) {
      return options;
    }

    return options.filter((option) => isAutocompleteOptionMatch(option, query));
  }, [currentInputValue, options]);
  const createOption = useMemo<AutocompleteOptionData | null>(() => {
    const query = currentInputValue.trim();

    // Create stays available even when an exact catalog match exists so users
    // can opt into contains/search behavior; exact pick requires click/Enter.
    if (!allowCustomValue || !query) {
      return null;
    }

    return {
      value: query,
      label: getCreateOptionLabel(query),
      created: true,
    };
  }, [allowCustomValue, currentInputValue, getCreateOptionLabel]);
  const navigationItems = useMemo(
    () => (createOption ? [createOption, ...visibleOptions] : visibleOptions),
    [createOption, visibleOptions],
  );
  const disabledIndices = useMemo(
    () =>
      navigationItems.flatMap((option, index) =>
        option.disabled ? index : [],
      ),
    [navigationItems],
  );
  const firstEnabledIndex = getFirstEnabledOptionIndex(navigationItems);
  const resolvedActiveIndex = isOpen
    ? (activeIndex ?? (firstEnabledIndex >= 0 ? firstEnabledIndex : null))
    : null;

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);
  const handleOptionSelect = useCallback(
    (
      option: AutocompleteOptionData,
      { restoreFocus = true }: { restoreFocus?: boolean } = {},
    ) => {
      if (option.disabled) {
        return;
      }

      if (option.created) {
        const createdOption = { ...option, label: option.value };
        state.selectOption(createdOption, 'create-option');
        setAnnouncement(labels.optionCreated(option.value));
      } else {
        state.selectOption(option);
        setAnnouncement(labels.optionSelected(option.label));
      }

      setActiveIndex(null);
      if (restoreFocus) {
        requestAnimationFrame(focusInput);
      }
    },
    [focusInput, labels, state],
  );
  const tryCommitCreateOption = useCallback(() => {
    if (
      !createOption ||
      disabled ||
      readOnly ||
      suppressCreateCommitRef.current
    ) {
      return false;
    }

    // Blur / outside-press must not steal focus back to the input.
    handleOptionSelect(createOption, { restoreFocus: false });
    return true;
  }, [createOption, disabled, handleOptionSelect, readOnly]);

  const handleFloatingOpenChange = useCallback(
    (nextOpen: boolean, _event?: Event, reason?: string) => {
      if (nextOpen) {
        state.openPopup('keyboard');
        return;
      }

      setActiveIndex(null);
      const dismissReason = getDismissReason(reason);

      if (dismissReason === 'escape') {
        // Cancel the draft: do not commit, and clear typed text so blur cannot
        // leave a ghost query in the field.
        suppressCreateCommitRef.current = true;
        if (allowCustomValue) {
          state.clearInputValue();
        }
        state.closePopup(dismissReason);
        return;
      }

      // Outside dismiss (click away) commits a pending custom value; Escape does not.
      if (dismissReason === 'outside-press') {
        const committed = tryCommitCreateOption();
        if (committed) {
          // Single-select create already closed via `selection`; multiple stays
          // open after create, so force-close on outside dismiss.
          if (multiple) {
            state.closePopup('outside-press');
          }
          return;
        }
      }

      state.closePopup(dismissReason);
    },
    [allowCustomValue, multiple, state, tryCommitCreateOption],
  );
  const floating = useOverlayFloating({
    open: isOpen,
    onOpenChange: handleFloatingOpenChange,
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
  const dismiss = useDismiss(floating.context, {
    enabled: !disabled,
  });
  const role = useRole(floating.context, { role: 'listbox' });
  const listNavigation = useListNavigation(floating.context, {
    listRef: itemRefs,
    activeIndex: resolvedActiveIndex,
    onNavigate: setActiveIndex,
    disabledIndices,
    loop: true,
    virtual: true,
    focusItemOnOpen: false,
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [dismiss, role, listNavigation],
  );

  const classes = autocomplete({ size, layer: floatingLayer });
  const chipSize = resolveChipSize(size);
  const shouldLimitTags =
    Boolean(multiple) &&
    typeof limitTags === 'number' &&
    limitTags >= 0 &&
    !focusedWithin;
  const visibleTagCount = shouldLimitTags ? limitTags : selectedValues.length;
  const visibleSelectedValues = selectedValues.slice(0, visibleTagCount);
  const hiddenTagCount = selectedValues.length - visibleSelectedValues.length;
  const focusToken = useCallback((index: number) => {
    tokenRefs.current[index]?.focus();
  }, []);

  const removeSelectedValue = useCallback(
    (selectedValue: string, label: string) => {
      state.removeOption(selectedValue);
      setAnnouncement(labels.optionRemoved(label));
    },
    [labels, state],
  );
  const handleTokenDismiss = useCallback(
    (selectedValue: string, label: string) => {
      removeSelectedValue(selectedValue, label);
      requestAnimationFrame(focusInput);
    },
    [focusInput, removeSelectedValue],
  );

  const handleTokenKeyDown = useCallback(
    (
      event: KeyboardEvent<HTMLButtonElement>,
      index: number,
      selectedValue: string,
      label: string,
    ) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        focusToken(index > 0 ? index - 1 : visibleSelectedValues.length - 1);
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (index < visibleSelectedValues.length - 1) {
          focusToken(index + 1);
        } else {
          focusInput();
        }
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        focusInput();
        return;
      }

      if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault();
        removeSelectedValue(selectedValue, label);
        requestAnimationFrame(() => {
          if (index > 0) {
            focusToken(index - 1);
          } else {
            focusInput();
          }
        });
      }
    },
    [focusInput, focusToken, removeSelectedValue, visibleSelectedValues.length],
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      suppressCreateCommitRef.current = false;
      setActiveIndex(null);
      state.setInputValue(event.target.value);
    },
    [state],
  );
  const handleInputFocus = useCallback(() => {
    setFocusedWithin(true);
    state.openPopup('focus');
  }, [state]);
  const handleInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) {
        return;
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        if (!isOpen) {
          event.preventDefault();
          state.openPopup('keyboard');
          const direction = event.key === 'ArrowDown' ? 1 : -1;
          const firstIndex =
            direction === 1
              ? getFirstEnabledOptionIndex(navigationItems)
              : navigationItems.findLastIndex((option) => !option.disabled);
          setActiveIndex(firstIndex >= 0 ? firstIndex : null);
        }
        return;
      }

      if (event.key === 'Enter' && resolvedActiveIndex !== null) {
        const activeOption = navigationItems[resolvedActiveIndex];
        if (activeOption) {
          event.preventDefault();
          handleOptionSelect(activeOption);
        }
        return;
      }

      if (
        (event.key === 'Backspace' || event.key === 'Delete') &&
        currentInputValue.length === 0 &&
        visibleSelectedValues.length > 0
      ) {
        event.preventDefault();
        focusToken(visibleSelectedValues.length - 1);
        return;
      }

      if (
        event.key === 'ArrowLeft' &&
        currentInputValue.length === 0 &&
        visibleSelectedValues.length > 0
      ) {
        event.preventDefault();
        focusToken(visibleSelectedValues.length - 1);
      }
    },
    [
      currentInputValue.length,
      disabled,
      focusToken,
      handleOptionSelect,
      isOpen,
      navigationItems,
      readOnly,
      resolvedActiveIndex,
      state,
      visibleSelectedValues.length,
    ],
  );

  const handleBlurCapture = useCallback(
    (event: FocusEvent<HTMLElement>) => {
      const nextTarget = event.relatedTarget as Node | null;

      requestAnimationFrame(() => {
        const activeElement = document.activeElement;
        const isInsideRoot =
          (nextTarget && rootRef.current?.contains(nextTarget)) ||
          (activeElement && rootRef.current?.contains(activeElement));
        const isInsideFloating =
          (nextTarget && floatingElementRef.current?.contains(nextTarget)) ||
          (activeElement &&
            floatingElementRef.current?.contains(activeElement));

        if (!isInsideRoot && !isInsideFloating) {
          setFocusedWithin(false);
          setActiveIndex(null);
          const committed = tryCommitCreateOption();
          if (committed && !multiple) {
            return;
          }
          state.closePopup('outside-press');
        }
      });
    },
    [multiple, state, tryCommitCreateOption],
  );
  const handleFocusCapture = useCallback(() => {
    setFocusedWithin(true);
  }, []);
  const handleControlMouseDown = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const target = event.target;

      if (
        target instanceof Element &&
        target.closest('button, input') !== null
      ) {
        return;
      }

      event.preventDefault();
      focusInput();
    },
    [focusInput],
  );
  const handleListScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      if (!hasMore || loading || loadingMore || disabled || !onLoadMore) {
        return;
      }

      const target = event.currentTarget;
      const distanceFromBottom =
        target.scrollHeight - target.scrollTop - target.clientHeight;

      if (distanceFromBottom <= LOAD_MORE_THRESHOLD_PX) {
        onLoadMore();
      }
    },
    [disabled, hasMore, loading, loadingMore, onLoadMore],
  );
  const setTokenRef = useCallback(
    (index: number, node: HTMLButtonElement | null) => {
      tokenRefs.current[index] = node;
    },
    [],
  );
  const setItemRef = useCallback((index: number, node: HTMLElement | null) => {
    itemRefs.current[index] = node;
  }, []);
  const setFloatingRef = useCallback(
    (node: HTMLDivElement | null) => {
      floatingElementRef.current = node;
      floating.refs.setFloating(node);
    },
    [floating.refs],
  );

  return {
    activeIndex: resolvedActiveIndex,
    announcement,
    ariaDescribedBy,
    ariaLabel,
    ariaLabelledBy,
    ariaRequired,
    baseId,
    chipSize,
    classes,
    className,
    currentInputValue,
    currentValue,
    density,
    disabled,
    error,
    floating,
    getFloatingProps,
    getItemProps,
    getReferenceProps,
    handleBlurCapture,
    handleControlMouseDown,
    handleFocusCapture,
    handleInputChange,
    handleInputFocus,
    handleInputKeyDown,
    handleListScroll,
    handleOptionSelect,
    handleTokenDismiss,
    handleTokenKeyDown,
    hiddenTagCount,
    inputId,
    inputRef,
    invalid,
    isOpen,
    listboxId,
    loading,
    loadingMore,
    loadingText,
    multiple,
    name,
    navigationItems,
    noOptionsText,
    otherProps,
    placeholder,
    readOnly,
    rootRef,
    selectedLabels,
    selectedOptions,
    selectedValues,
    selectionIsCreated,
    setFloatingRef,
    setItemRef,
    setTokenRef,
    valid,
    visibleSelectedValues,
  } as const;
};
