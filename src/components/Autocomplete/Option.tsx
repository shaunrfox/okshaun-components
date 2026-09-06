import type { IconNamesList } from '../Icon';

/** Metadata accepted by an {@link Option} inside `Autocomplete`. */
export type OptionProps = {
  /** Stable value reported when this option is selected. */
  value: string;
  /** Visible option text and selected-value label. */
  label: string;
  /** Prevents the option from receiving navigation or selection. */
  disabled?: boolean;
  /** Secondary text included when filtering options. */
  description?: string;
  /** Icon rendered before the option label. */
  iconLeft?: IconNamesList;
  /** Icon rendered after the option label. */
  iconRight?: IconNamesList;
};

/**
 * Declares selectable metadata for a parent `Autocomplete`.
 *
 * `Option` renders no DOM by itself. Place it directly inside `Autocomplete`;
 * the parent builds the visible listbox and selection behavior.
 *
 * @example
 * ```tsx
 * <Autocomplete aria-label="Assignee">
 *   <Option value="ada" label="Ada Lovelace" />
 * </Autocomplete>
 * ```
 */
export const Option = (_props: OptionProps) => {
  return null;
};

(
  Option as typeof Option & {
    __autocompleteComponentType?: string;
  }
).__autocompleteComponentType = 'Option';
