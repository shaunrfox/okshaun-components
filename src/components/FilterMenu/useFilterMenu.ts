import { type KeyboardEvent, useId, useState } from 'react';

import type { FilterMenuItemRow, FilterMenuRow } from './types';

/**
 * Returns the DOM id of one option in a {@link FilterMenu}. The input uses
 * it in `aria-activedescendant`. The key is percent-encoded, so two different
 * keys always give two different ids, and the id never holds whitespace.
 */
export const getFilterMenuOptionId = (menuId: string, key: string) =>
  `${menuId}-option-${encodeURIComponent(key)}`;

const isPickable = (row: FilterMenuRow): row is FilterMenuItemRow =>
  row.type === 'item' && !row.disabled;

/** Options for {@link useFilterMenu}. */
export type UseFilterMenuOptions = {
  /** Rows shown in the menu. */
  rows: FilterMenuRow[];
  /** Whether the menu is open. Keys do nothing while it is closed. */
  open: boolean;
  /** Runs when Enter (or Space, with `spaceSelects`) picks the active row. */
  onSelect: (key: string) => void;
  /** Runs when Esc is pressed while the menu is open. */
  onClose: () => void;
  /**
   * Makes Space pick the active row. Set it for a multi-pick list when the
   * input is empty, so Space toggles a checkbox instead of typing a space.
   */
  spaceSelects?: boolean;
  /** Listbox id. A generated id is used when absent. */
  id?: string;
};

/** Value returned by {@link useFilterMenu}. */
export type UseFilterMenuResult = {
  /** Key of the active row. It falls back to the first pickable row. */
  activeKey: string | null;
  /**
   * Sets the active row. Pass `null` to go back to the first pickable row,
   * for example after the typed text changes.
   */
  setActiveKey: (key: string | null) => void;
  /** Spread onto the text input that owns the menu. */
  inputProps: {
    role: 'combobox';
    'aria-expanded': boolean;
    'aria-controls': string | undefined;
    'aria-autocomplete': 'list';
    'aria-activedescendant': string | undefined;
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  };
  /** Spread onto the {@link FilterMenu}, with `anchor` and `aria-label`. */
  menuProps: {
    id: string;
    open: boolean;
    rows: FilterMenuRow[];
    activeKey: string | null;
    onActiveKeyChange: (key: string) => void;
    onSelect: (key: string) => void;
  };
};

/**
 * Wires a text input to a {@link FilterMenu} as a combobox. Focus stays in
 * the input. Arrow keys move the active row, Enter picks it, and Esc calls
 * `onClose`.
 *
 * A handled key calls `preventDefault`. Check `event.defaultPrevented` in your
 * own `onKeyDown` to skip keys the hook already handled.
 *
 * @example
 * ```tsx
 * const menu = useFilterMenu({ rows, open, onSelect: pick, onClose: close });
 * <input {...menu.inputProps} aria-label="Filter" />
 * <FilterMenu {...menu.menuProps} anchor={input} aria-label="Fields" />
 * ```
 */
export const useFilterMenu = (
  options: UseFilterMenuOptions,
): UseFilterMenuResult => {
  const { rows, open, onSelect, onClose, spaceSelects = false, id } = options;
  const generatedId = useId();
  const menuId = id ?? `filter-menu-${generatedId.replace(/:/g, '')}`;
  const [storedKey, setStoredKey] = useState<string | null>(null);

  const pickable = rows.filter(isPickable);
  const activeKey = pickable.some((row) => row.key === storedKey)
    ? storedKey
    : (pickable[0]?.key ?? null);

  const move = (delta: number) => {
    if (pickable.length === 0) return;
    const index = pickable.findIndex((row) => row.key === activeKey);
    const next = (index + delta + pickable.length) % pickable.length;
    setStoredKey(pickable[next]!.key);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;
    // Keys that confirm an IME candidate belong to the input, not the menu.
    // Safari reports them with keyCode 229 and isComposing false.
    if (event.nativeEvent.isComposing || event.keyCode === 229) return;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        move(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        move(-1);
        break;
      case 'Enter':
        if (activeKey === null) return;
        event.preventDefault();
        onSelect(activeKey);
        break;
      case ' ':
        if (!spaceSelects || activeKey === null) return;
        event.preventDefault();
        onSelect(activeKey);
        break;
      case 'Escape':
        event.preventDefault();
        onClose();
        break;
    }
  };

  return {
    activeKey,
    setActiveKey: setStoredKey,
    inputProps: {
      role: 'combobox',
      'aria-expanded': open,
      'aria-controls': open ? menuId : undefined,
      'aria-autocomplete': 'list',
      'aria-activedescendant':
        open && activeKey !== null
          ? getFilterMenuOptionId(menuId, activeKey)
          : undefined,
      onKeyDown,
    },
    menuProps: {
      id: menuId,
      open,
      rows,
      activeKey,
      onActiveKeyChange: setStoredKey,
      onSelect,
    },
  };
};
