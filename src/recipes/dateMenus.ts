import { defineSlotRecipe } from '@pandacss/dev';

// Content-only slots shared by DateMenu (single Calendar) and DateRangeMenu
// (two Calendars + a middle divider + a Cancel/Apply footer for the pending
// selection). The popover chrome itself (bg/radius/shadow) comes from
// `<Menu>`, not from a slot here, so it isn't duplicated.
const dateMenusBase = {
  // Row wrapper for DateRangeMenu's two Calendar instances.
  calendars: {
    display: 'flex',
    alignItems: 'stretch',
  },

  // Vertical rule between the two calendars.
  calendarsDivider: {
    width: '1',
    alignSelf: 'stretch',
    bg: 'border',
  },

  // Right-aligned Cancel/Apply pair for the pending range selection.
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

export const dateMenusRecipe = defineSlotRecipe({
  className: 'dateMenus',
  jsx: ['DateMenus', 'DateMenu', 'DateRangeMenu'],
  slots: ['calendars', 'calendarsDivider', 'footer'],
  base: dateMenusBase,
});
