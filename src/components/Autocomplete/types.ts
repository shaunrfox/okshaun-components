import type { Placement } from '@floating-ui/react';
import type { MenuVariantProps } from '@styled-system/recipes';
import type { TextInputProps } from '../TextInput';

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
  inputProps?: Omit<TextInputProps, 'name' | 'value' | 'onChange' | 'disabled' | 'error' | 'id'>;
};
