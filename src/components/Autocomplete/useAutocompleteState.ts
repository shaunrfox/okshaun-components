import { useCallback, useState } from 'react';

import type {
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  AutocompleteOpenChangeReason,
  AutocompleteSelectionIntent,
  AutocompleteStateProps,
  AutocompleteValue,
} from './types';

const getDefaultValue = <Multiple extends boolean>(
  multiple: Multiple,
): AutocompleteValue<Multiple> => {
  return (multiple ? [] : null) as AutocompleteValue<Multiple>;
};

export const useAutocompleteState = <Multiple extends boolean = false>({
  value: controlledValue,
  defaultValue,
  onValueChange,
  inputValue: controlledInputValue,
  defaultInputValue = '',
  onInputValueChange,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  multiple = false as Multiple,
  disabled = false,
  readOnly = false,
}: AutocompleteStateProps<Multiple>) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<
    AutocompleteValue<Multiple>
  >(() =>
    defaultValue !== undefined ? defaultValue : getDefaultValue(multiple),
  );
  const [uncontrolledInputValue, setUncontrolledInputValue] =
    useState(defaultInputValue);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const value =
    controlledValue !== undefined ? controlledValue : uncontrolledValue;
  const inputValue =
    controlledInputValue !== undefined
      ? controlledInputValue
      : uncontrolledInputValue;
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const isInteractionBlocked = disabled || readOnly;

  const commitValue = useCallback(
    (
      nextValue: AutocompleteValue<Multiple>,
      reason: AutocompleteChangeReason,
    ) => {
      if (controlledValue === undefined) {
        setUncontrolledValue(nextValue);
      }

      onValueChange?.(nextValue, reason);
    },
    [controlledValue, onValueChange],
  );

  const commitInputValue = useCallback(
    (nextValue: string, reason: AutocompleteInputChangeReason) => {
      if (controlledInputValue === undefined) {
        setUncontrolledInputValue(nextValue);
      }

      onInputValueChange?.(nextValue, reason);
    },
    [controlledInputValue, onInputValueChange],
  );

  const commitOpen = useCallback(
    (nextOpen: boolean, reason: AutocompleteOpenChangeReason) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(nextOpen);
      }

      onOpenChange?.(nextOpen, reason);
    },
    [controlledOpen, onOpenChange],
  );

  const setInputValue = useCallback(
    (nextValue: string) => {
      if (isInteractionBlocked) {
        return;
      }

      commitInputValue(nextValue, 'input');

      if (!multiple && typeof value === 'string') {
        commitValue(null as AutocompleteValue<Multiple>, 'clear');
      }

      commitOpen(true, 'input');
    },
    [
      commitInputValue,
      commitOpen,
      commitValue,
      isInteractionBlocked,
      multiple,
      value,
    ],
  );

  const selectOption = useCallback(
    (
      option: AutocompleteSelectionIntent,
      reason: Extract<
        AutocompleteChangeReason,
        'select-option' | 'create-option'
      > = 'select-option',
    ) => {
      if (isInteractionBlocked || option.disabled) {
        return;
      }

      if (multiple) {
        const selectedValues: string[] = Array.isArray(value) ? value : [];

        if (selectedValues.includes(option.value)) {
          return;
        }

        commitValue(
          [...selectedValues, option.value] as AutocompleteValue<Multiple>,
          reason,
        );
        commitInputValue('', 'selection');
        commitOpen(true, 'selection');
        return;
      }

      if (value === option.value) {
        return;
      }

      commitValue(option.value as AutocompleteValue<Multiple>, reason);
      commitInputValue('', 'selection');
      commitOpen(false, 'selection');
    },
    [
      commitInputValue,
      commitOpen,
      commitValue,
      isInteractionBlocked,
      multiple,
      value,
    ],
  );

  const createOption = useCallback(
    (rawValue: string) => {
      const nextValue = rawValue.trim();

      if (!nextValue) {
        return;
      }

      selectOption({ value: nextValue, label: nextValue }, 'create-option');
    },
    [selectOption],
  );

  const removeOption = useCallback(
    (optionValue: string) => {
      if (isInteractionBlocked) {
        return;
      }

      if (multiple) {
        const selectedValues: string[] = Array.isArray(value) ? value : [];

        if (!selectedValues.includes(optionValue)) {
          return;
        }

        commitValue(
          selectedValues.filter(
            (selectedValue) => selectedValue !== optionValue,
          ) as AutocompleteValue<Multiple>,
          'remove-option',
        );
        return;
      }

      if (value !== optionValue) {
        return;
      }

      commitValue(null as AutocompleteValue<Multiple>, 'remove-option');
      commitInputValue('', 'clear');
    },
    [commitInputValue, commitValue, isInteractionBlocked, multiple, value],
  );

  const openPopup = useCallback(
    (reason: Extract<AutocompleteOpenChangeReason, 'focus' | 'keyboard'>) => {
      if (!isInteractionBlocked) {
        commitOpen(true, reason);
      }
    },
    [commitOpen, isInteractionBlocked],
  );

  const closePopup = useCallback(
    (
      reason: Extract<
        AutocompleteOpenChangeReason,
        'escape' | 'outside-press' | 'selection'
      >,
    ) => {
      commitOpen(false, reason);
    },
    [commitOpen],
  );

  return {
    value,
    inputValue,
    open,
    setInputValue,
    selectOption,
    createOption,
    removeOption,
    openPopup,
    closePopup,
  } as const;
};
