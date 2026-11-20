import type { ReactNode } from 'react';

import type { BoxProps } from '../Box';
import type { IconNamesList } from '../Icon';

/** Metadata consumed by {@link Select}; `SelectOption` does not render an element itself. */
export type SelectOptionProps = Omit<BoxProps, 'children'> & {
  /** Stable value emitted by the parent `Select`. */
  value: string;
  /** Visible option text and the value used for keyboard typeahead. */
  label: string;
  /** Excludes the option from pointer and keyboard selection. */
  disabled?: boolean;
  /** Supporting text displayed below the label in the popup. */
  description?: string;
  /** Icon displayed before the option label. */
  iconLeft?: IconNamesList;
  /** Icon displayed after the option label. */
  iconRight?: IconNamesList;
  /**
   * Decorative content, such as an `Avatar` or a colored `Icon`, displayed
   * before the option label. It takes precedence over `iconLeft`. In a single
   * select, the selection check moves to the end of the row in place of
   * `iconRight`, and the selected option's `before` is also shown in the
   * trigger unless the `Select` has its own `before`.
   */
  before?: ReactNode;
};

/**
 * Declares an option for a parent {@link Select}.
 *
 * This component returns `null`; place it directly inside `Select` so the
 * parent can interpret its metadata.
 *
 * @example
 * ```tsx
 * <SelectOption value="medium" label="Medium" />
 * ```
 */
export const SelectOption = (_props: SelectOptionProps) => {
  return null;
};
