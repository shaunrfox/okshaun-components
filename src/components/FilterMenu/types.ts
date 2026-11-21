import type { ReactNode } from 'react';

/** A row the user can pick in a {@link FilterMenu}. */
export type FilterMenuItemRow = {
  type: 'item';
  /** Stable key, unique in the menu. Passed to `onSelect`. */
  key: string;
  /** Visible row text. Matches of the menu's `query` are highlighted. */
  label: string;
  /**
   * Content before the label, such as an avatar or a status dot. It comes
   * after the checkbox when the row has one.
   */
  before?: ReactNode;
  /** Second line of text under the label, such as a customer name. */
  description?: string;
  /**
   * Short text at the end of the row, such as "current", a count or a date
   * range. It does not wrap.
   */
  detail?: string;
  /**
   * Shows a checkbox for a multi-pick list. `true` checks it. Leave it
   * undefined for a single-pick row, which shows no checkbox.
   */
  checked?: boolean;
  /** Marks the current value of a single-pick list. Sets `aria-selected`. */
  selected?: boolean;
  /** Skips the row in keyboard moves and ignores clicks. */
  disabled?: boolean;
};

/**
 * One row of a {@link FilterMenu}.
 *
 * - `group`: a heading. The item rows after it, up to the next heading, form
 *   one labeled group.
 * - `item`: a row the user can pick.
 * - `empty`: a status line, such as "No field matches".
 */
export type FilterMenuRow =
  | { type: 'group'; label: string }
  | FilterMenuItemRow
  | { type: 'empty'; label: string };
