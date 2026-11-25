// biome-ignore-all lint/a11y/useSemanticElements: the listbox, groups, and status rows are composed from List and Box rather than native select markup, so the roles are applied explicitly
import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import { cx } from '@styled-system/css';
import { filterMenu } from '@styled-system/recipes';
import {
  type MouseEvent,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { DsChainPortalRoot } from '~/components/DsChainScope/DsChainPortalRoot';
import { Icon } from '~/components/Icon';
import { List, ListItem, ListItemGroup } from '~/components/List';
import { useFloatingLayer } from '~/system/floating-ui/FloatingLayerContext';
import {
  availableHeightMiddleware,
  createOverlayMiddleware,
  useOverlayFloating,
} from '~/system/floating-ui/floating';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';
import type { FilterMenuItemRow, FilterMenuRow } from './types';
import { getFilterMenuOptionId } from './useFilterMenu';

type FilterMenuOwnProps = {
  /** Shows the menu. The owner of the input decides when it opens and closes. */
  open: boolean;
  /**
   * Element the menu opens under, such as the filter input or a token.
   * The menu does not render while this is `null`.
   */
  anchor: Element | null;
  /** Rows to show, in order. */
  rows: FilterMenuRow[];
  /** Listbox id. The input points to it with `aria-controls`. */
  id: string;
  /** Accessible name of the listbox, such as "Fields" or "Stage values". */
  'aria-label': string;
  /** Key of the highlighted row. Enter in the input picks this row. */
  activeKey?: string | null;
  /** Runs when the pointer moves over a pickable row. */
  onActiveKeyChange?: (key: string) => void;
  /** Runs when a pickable row is clicked. Focus stays where it was. */
  onSelect: (key: string) => void;
  /** Typed text. Matches in row labels and descriptions are highlighted. */
  query?: string;
  /** Hint line under the list, such as "Enter picks · Esc cancels". */
  footer?: ReactNode;
};

/** Props for {@link FilterMenu}. Includes `Box` style props for the popup. */
export type FilterMenuProps = Omit<
  BoxProps,
  keyof FilterMenuOwnProps | 'children'
> &
  FilterMenuOwnProps;

type Section = { label?: string; rows: FilterMenuRow[] };

// Item rows after a heading belong to that heading's group.
const toSections = (rows: FilterMenuRow[]): Section[] => {
  const sections: Section[] = [{ rows: [] }];
  for (const row of rows) {
    if (row.type === 'group') sections.push({ label: row.label, rows: [] });
    else sections[sections.length - 1]!.rows.push(row);
  }
  return sections.filter((s) => s.label !== undefined || s.rows.length > 0);
};

/**
 * The popup list of a filter field: grouped rows, checkboxes for multi-pick
 * lists, end-of-row detail, an empty line and a hint footer.
 *
 * Focus stays in the owner's input, as in a combobox, so the menu never
 * takes focus. Pair it with {@link useFilterMenu}, which adds the input's
 * ARIA attributes and the arrow, Enter, Space and Esc keys. Use `Menu` for
 * an action menu that takes focus, and `Autocomplete` for a form field.
 *
 * Renders a `listbox` in a portal, positioned under `anchor`.
 *
 * @example
 * ```tsx
 * const menu = useFilterMenu({ rows, open, onSelect: pick, onClose: close });
 * <input ref={setInput} {...menu.inputProps} aria-label="Filter" />
 * <FilterMenu {...menu.menuProps} anchor={input} aria-label="Fields" />
 * ```
 */
export const FilterMenu = (props: FilterMenuProps) => {
  const {
    open,
    anchor,
    rows,
    id,
    'aria-label': ariaLabel,
    activeKey,
    onActiveKeyChange,
    onSelect,
    query,
    footer,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const layer = useFloatingLayer();
  const classes = filterMenu({ layer });
  const listRef = useRef<HTMLDivElement>(null);

  const floating = useOverlayFloating({
    open,
    // The input's owner controls `open`. Floating UI requests are ignored.
    onOpenChange: () => undefined,
    middleware: createOverlayMiddleware({
      extras: [availableHeightMiddleware()],
    }),
  });

  useLayoutEffect(() => {
    floating.refs.setReference(anchor);
  }, [anchor, floating.refs]);

  // Keep the active row in view as the arrow keys move it.
  useEffect(() => {
    if (!open || activeKey == null) return;
    const node = listRef.current?.querySelector(
      `#${CSS.escape(getFilterMenuOptionId(id, activeKey))}`,
    );
    node?.scrollIntoView?.({ block: 'nearest' });
  }, [open, activeKey, id]);

  if (!open || !anchor) return null;

  const renderBefore = (row: FilterMenuItemRow) => {
    const checkbox = row.checked !== undefined && (
      <Icon
        name={row.checked ? 'checkbox-checked' : 'checkbox'}
        fill={row.checked ? 'icon' : 'icon.subtlest'}
        className={classes.checkbox}
        aria-hidden
      />
    );
    if (!checkbox) return row.before;
    if (row.before === undefined) return checkbox;
    return (
      <Box as="span" className={classes.before}>
        {checkbox}
        {row.before}
      </Box>
    );
  };

  const renderItem = (row: FilterMenuItemRow) => (
    <ListItem
      key={row.key}
      id={getFilterMenuOptionId(id, row.key)}
      label={row.label}
      description={row.description}
      before={renderBefore(row)}
      after={row.detail}
      selected={row.checked ?? row.selected ?? false}
      disabled={row.disabled}
      tabIndex={-1}
      // As in Autocomplete: the active row shows the hover fill, also over
      // the selected fill, because Enter picks it.
      bg={row.key === activeKey ? 'bg.neutral.hovered' : undefined}
      data-active={row.key === activeKey || undefined}
      onMouseDown={(event: MouseEvent) => event.preventDefault()}
      onMouseMove={() => {
        if (!row.disabled && row.key !== activeKey)
          onActiveKeyChange?.(row.key);
      }}
      onClick={() => {
        if (!row.disabled) onSelect(row.key);
      }}
    />
  );

  const renderRows = (sectionRows: FilterMenuRow[]) =>
    sectionRows.map((row, index) =>
      row.type === 'item' ? (
        renderItem(row)
      ) : (
        // biome-ignore lint/suspicious/noArrayIndexKey: empty-state rows have no key of their own and never reorder
        <Box key={`empty-${index}`} role="status" className={classes.empty}>
          {row.label}
        </Box>
      ),
    );

  return (
    <FloatingPortal>
      <DsChainPortalRoot reference={floating.elements.domReference}>
        <FloatingFocusManager
          context={floating.context}
          modal={false}
          initialFocus={-1}
          returnFocus={false}
        >
          <Box
            {...dsComponent('FilterMenu')}
            ref={floating.refs.setFloating}
            style={floating.floatingStyles}
            className={cx(classes.root, className)}
            onMouseDown={(event) => event.preventDefault()}
            {...otherProps}
          >
            <List
              ref={listRef}
              id={id}
              role="listbox"
              aria-label={ariaLabel}
              aria-multiselectable={
                rows.some(
                  (r) => r.type === 'item' && r.checked !== undefined,
                ) || undefined
              }
              density="compact"
              query={query}
              highlightMatches={Boolean(query)}
              className={classes.listbox}
            >
              {toSections(rows).map((section, index) =>
                section.label === undefined ? (
                  renderRows(section.rows)
                ) : (
                  <ListItemGroup
                    key={`${section.label}-${index}`}
                    label={section.label}
                    role="group"
                    aria-label={section.label}
                  >
                    {renderRows(section.rows)}
                  </ListItemGroup>
                ),
              )}
            </List>
            {footer && <Box className={classes.footer}>{footer}</Box>}
          </Box>
        </FloatingFocusManager>
      </DsChainPortalRoot>
    </FloatingPortal>
  );
};
