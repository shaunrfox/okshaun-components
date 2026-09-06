import { defineSlotRecipe } from '@pandacss/dev';

// Content-only slots for DateTimeMenu: a single Calendar + a 4px divider +
// the same scrollable time columns TimeMenu/TimeRangeMenu use (imported
// directly from `timeMenus` in the component — the column look lives in one
// place). The popover chrome itself (bg/radius/shadow) comes from `<Menu>`,
// not from a slot here. One fixed layout, not range-variant, per the Figma spec.
const dateTimeMenusBase = {
  // Row holding the Calendar + divider + time columns, above the footer.
  content: {
    display: 'flex',
    alignItems: 'stretch',
  },

  // 4px-wide vertical divider between the Calendar and the time columns.
  divider: {
    width: '4',
    alignSelf: 'stretch',
    bg: 'border',
  },

  // Right-aligned Cancel/Apply pair — always present per the Figma spec,
  // even though DateTimeMenu isn't itself a range variant.
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    w: 'full',
    gap: '8',
    borderTopWidth: '1',
    borderTopStyle: 'solid',
    borderColor: 'border',
    px: '16',
    py: '8',
  },
};

export const dateTimeMenusRecipe = defineSlotRecipe({
  className: 'dateTimeMenus',
  jsx: ['DateTimeMenus', 'DateTimeMenu'],
  slots: ['content', 'divider', 'footer'],
  base: dateTimeMenusBase,
});
