import type { IconNamesList } from '../Icon';

/** Selected value shape for single- or multiple-selection `Autocomplete`. */
export type AutocompleteValue<Multiple extends boolean = false> =
  Multiple extends true
    ? string[]
    : Multiple extends false
      ? string | null
      : string | string[] | null;

export type AnyAutocompleteValue = string | string[] | null;

/** User actions that can change the selected Autocomplete value. */
export type AutocompleteChangeReason =
  | 'select-option'
  | 'remove-option'
  | 'clear'
  | 'create-option';

/** Actions that can change the text displayed in the Autocomplete input. */
export type AutocompleteInputChangeReason = 'input' | 'selection' | 'clear';

/** Interactions that can request an Autocomplete listbox visibility change. */
export type AutocompleteOpenChangeReason =
  | 'input'
  | 'focus'
  | 'keyboard'
  | 'selection'
  | 'escape'
  | 'outside-press';

export type AutocompleteOptionData = {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
  iconLeft?: IconNamesList;
  iconRight?: IconNamesList;
  created?: boolean;
};

export type AutocompleteStateProps<Multiple extends boolean = false> = {
  value?: AutocompleteValue<Multiple>;
  defaultValue?: AutocompleteValue<Multiple>;
  onValueChange?: (
    value: AutocompleteValue<Multiple>,
    reason: AutocompleteChangeReason,
  ) => void;
  inputValue?: string;
  defaultInputValue?: string;
  onInputValueChange?: (
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, reason: AutocompleteOpenChangeReason) => void;
  multiple?: Multiple;
  disabled?: boolean;
  readOnly?: boolean;
};

export type AutocompleteSelectionIntent = Pick<
  AutocompleteOptionData,
  'value' | 'label' | 'disabled'
>;
