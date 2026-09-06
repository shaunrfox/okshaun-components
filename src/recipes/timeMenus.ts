import { defineSlotRecipe } from '@pandacss/dev';

// Content-only slots for TimeMenu/TimeRangeMenu's scrollable HR/MIN[/AM-PM]
// column picker — the popover chrome itself (bg/radius/shadow) comes from
// `<Menu>`, not from a slot here, so it isn't duplicated. Reused directly by
// DateTimeMenu for its own time columns (see `dateTimeMenus.ts`) so the
// column look only lives in one place. Structure/sizing preserves the
// established picker column treatment (maxHeight, border separators instead
// of a standalone divider element, hidden scrollbar).
const timeMenusBase = {
  // Row of columns (HR | MIN | AM-PM), doubled with its own divider for range.
  // minH: '0' overrides the flexbox default of min-height:auto on a flex
  // item, which otherwise floors this box at its content's natural height
  // and defeats stretching it down to match a shorter sibling (DateTimeMenu's
  // Calendar) — see the `column` slot below for the full explanation.
  columns: {
    display: 'flex',
    alignItems: 'stretch',
    minH: '0',
  },

  // A single scrollable HR/MIN/AM-PM column. `maxHeight` (not `h: 'full'`)
  // matters here — Menu's own internal wrapper chain (levelsViewport >
  // levelsTrack > level > list) doesn't propagate a concrete height down to
  // this element, so `h: 'full'` resolves to "as tall as my content" and
  // `overflowY: auto` never actually engages; an explicit cap makes the
  // column bound itself regardless of what any ancestor does. `200` keeps
  // the existing picker column cap exactly.
  column: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    minW: '56',
    // minH: '0' is the load-bearing part, not maxHeight — a flex item's
    // default min-height:auto floors it at its content's natural height no
    // matter what cross-axis stretch or maxHeight say, which silently
    // defeats overflowY:auto (nothing to scroll if the box just grows to
    // fit everything). Zeroing it lets maxHeight (standalone) or the
    // stretch variant's parent-driven height (DateTimeMenu) actually apply.
    minH: '0',
    maxHeight: '200',
    overflowY: 'auto',
    textAlign: 'center',
    borderRightWidth: '1',
    borderRightStyle: 'solid',
    borderColor: 'border',
    _last: {
      borderRight: 'none',
    },
    // Hide the scrollbar visually but keep it functional — matches legacy.
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
  },

  // "HR" / "MIN" / "AM/PM" column label.
  columnHeader: {
    position: 'sticky',
    top: '0',
    textAlign: 'center',
    fontSize: '12',
    fontWeight: 'semibold',
    color: 'text.subtlest',
    bg: 'surface',
    py: '4',
    borderBottomWidth: '1',
    borderBottomStyle: 'solid',
    borderColor: 'border',
    zIndex: '1',
  },

  // Right-aligned Cancel/Apply pair — TimeRangeMenu only (TimeMenu commits
  // immediately per value, same as DateMenu's non-range case).
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '8',
    borderTopWidth: '1',
    borderTopStyle: 'solid',
    borderColor: 'border',
    px: '16',
    py: '8',
  },
};

const timeMenusVariants = {
  // DateTimeMenu pairs the columns with a Calendar sibling inside a
  // stretch-aligned flex row, so the columns can size to match the
  // Calendar's real rendered height instead of the standalone 200px cap —
  // without this, the columns clip well short of the taller Calendar next to
  // them. TimeMenu/TimeRangeMenu have no such sibling to stretch against, so
  // they keep the fixed cap as their own default.
  stretch: {
    true: {
      column: {
        maxHeight: 'none',
      },
    },
  },
};

export const timeMenusRecipe = defineSlotRecipe({
  className: 'timeMenus',
  jsx: ['TimeMenus', 'TimeMenu', 'TimeRangeMenu'],
  slots: ['columns', 'column', 'columnHeader', 'footer'],
  base: timeMenusBase,
  variants: timeMenusVariants,
});
