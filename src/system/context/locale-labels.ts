import type { Theme } from './theme-context';

/**
 * Built-in text that design-system components render or announce.
 *
 * Every entry has an English default in {@link defaultLocaleLabels}. Pass a
 * partial set to {@link LocaleProvider} to translate them in one place. A
 * label prop on a component still overrides the provider.
 *
 * Entries that include a value are functions, so the app can pass them to
 * its own translation function with plural and interpolation support.
 */
export interface LocaleLabels {
  // ─── Actions ──────────────────────────────────────────────────────────────
  /** Default cancel button text in modals and date and time menus. */
  cancel: string;
  /** Default submit button text in `Modal`. */
  submit: string;
  /** Accessible name and tooltip of the save button in `KeyFact`. */
  save: string;
  /** Apply button text in range and date-time menus. */
  apply: string;
  /** Accessible name of the dismiss button in `Alert` and `Toast`. */
  dismiss: string;
  /** Accessible name of the close button in `ModalHeader`. */
  closeDialog: string;
  /** Accessible name of the close button in `DrawerHeader`. */
  closeDrawer: string;
  /** Accessible name and tooltip of the close button in `PopoverClose`. */
  closePopover: string;
  /** Accessible name of the remove button on a dismissible `Chip`. */
  removeItem: (item: string) => string;
  /** Accessible name of the remove button on a `FilterToken`, given the filter as a sentence. */
  removeFilter: (filter: string) => string;
  /** Accessible name of `ThemeSwitcher`, given the theme it switches to. */
  switchToTheme: (nextTheme: Theme) => string;

  // ─── Key facts ────────────────────────────────────────────────────────────
  /** Label of a horizontal `KeyFact`, written before its value ("Owner:"). */
  keyFactLabel: (label: string) => string;

  // ─── Peek bar ─────────────────────────────────────────────────────────────
  /** Position text in `PeekBar`, such as "Case 3 of 40". */
  peekPosition: (position: {
    noun: string;
    index: number;
    total: number;
  }) => string;
  /** Accessible name of the previous button in `PeekBar`, given the noun. */
  previousItem: (noun: string) => string;
  /** Accessible name of the next button in `PeekBar`, given the noun. */
  nextItem: (noun: string) => string;
  /** Text of the open-full-page button in `PeekBar`. */
  openFullPage: string;

  // ─── Selection lists ──────────────────────────────────────────────────────
  /** Default placeholder for `Select` and `Autocomplete`. */
  selectPlaceholder: string;
  /** Empty-state text in a filtered `Menu`. */
  noResults: string;
  /** Accessible name of the `Autocomplete` listbox. */
  suggestions: string;
  /** Default `Autocomplete` text while options load. */
  loadingOptions: string;
  /** Default `Autocomplete` text when no option matches. */
  noOptions: string;
  /** Default text of the `Autocomplete` option that creates a custom value. */
  addOption: (value: string) => string;
  /** Screen-reader announcement after an `Autocomplete` option is selected. */
  optionSelected: (label: string) => string;
  /** Screen-reader announcement after a custom `Autocomplete` value is created. */
  optionCreated: (value: string) => string;
  /** Screen-reader announcement after an `Autocomplete` value is removed. */
  optionRemoved: (label: string) => string;
  /** Accessible name of the `Autocomplete` hidden-tag count. */
  moreSelected: (count: number) => string;

  // ─── Filter field ─────────────────────────────────────────────────────────
  /** Default accessible name of the `FilterField` input. */
  filterOrSearch: string;
  /** Default accessible name of the `FilterField` clear button. */
  clearFilters: string;
  /** Text of the `FilterField` button that lists the tokens that do not fit. */
  moreFilters: (count: number) => string;

  // ─── Code blocks ──────────────────────────────────────────────────────────
  /** Default accessible name and tooltip of the `CodeBlock` copy button. */
  copyCode: string;
  /** Tooltip and announcement after `CodeBlock` copies its code. */
  copied: string;
  /** Announcement when `CodeBlock` cannot copy its code. */
  copyFailed: string;
  /** Text of the `CodeBlock` button that expands a collapsed block. */
  showAllLines: (count: number) => string;
  /** Text of the `CodeBlock` button that collapses an expanded block. */
  showLess: string;

  // ─── Tabs ─────────────────────────────────────────────────────────────────
  /** Accessible name of the `Tabs` overflow menu button. */
  moreTabs: string;

  // ─── Calendar ─────────────────────────────────────────────────────────────
  /** Default accessible name of `Calendar`. */
  chooseDate: string;
  /** Accessible name of the previous-month button. */
  previousMonth: string;
  /** Accessible name of the next-month button. */
  nextMonth: string;
  /** Accessible name of the previous-year button. */
  previousYear: string;
  /** Accessible name of the next-year button. */
  nextYear: string;
  /** Accessible name of the previous-years button. */
  previousYears: string;
  /** Accessible name of the next-years button. */
  nextYears: string;
  /** Accessible name of the month grid. */
  chooseMonthIn: (year: number) => string;
  /** Accessible name of the year grid. */
  chooseYear: string;
  /** Added to a day's accessible name when it is today. */
  today: string;
  /** Added to a day's accessible name when it is selected. */
  selected: string;
  /** Added to a day's accessible name when it starts a range. */
  rangeStart: string;
  /** Added to a day's accessible name when it ends a range. */
  rangeEnd: string;

  // ─── Date and time fields ─────────────────────────────────────────────────
  /** Default accessible name of a date field. */
  date: string;
  /** Default accessible name of a time field. */
  time: string;
  /** Default accessible name of a range's start date. */
  startDate: string;
  /** Default accessible name of a range's end date. */
  endDate: string;
  /** Default accessible name of a range's start time. */
  startTime: string;
  /** Default accessible name of a range's end time. */
  endTime: string;
  /** Accessible name of the month segment. */
  month: string;
  /** Accessible name of the day segment. */
  day: string;
  /** Accessible name of the year segment. */
  year: string;
  /** Accessible name of the hour segment and hour column. */
  hour: string;
  /** Accessible name of the minute segment and minute column. */
  minute: string;
  /** Accessible name of the AM/PM segment and column. */
  meridiem: string;
  /** Accessible name of a named field's hour column, such as "Start time hour". */
  fieldHour: (field: string) => string;
  /** Accessible name of a named field's minute column. */
  fieldMinute: (field: string) => string;
  /** Accessible name of a named field's AM/PM column. */
  fieldMeridiem: (field: string) => string;
  /** Placeholder of the month segment. */
  monthPlaceholder: string;
  /** Placeholder of the day segment. */
  dayPlaceholder: string;
  /** Placeholder of the year segment. */
  yearPlaceholder: string;
  /** Placeholder of the hour segment. */
  hourPlaceholder: string;
  /** Placeholder of the minute segment. */
  minutePlaceholder: string;
  /** Header of the hour column in time menus. */
  hourColumn: string;
  /** Header of the minute column in time menus. */
  minuteColumn: string;
  /** Header of the AM/PM column in time menus. */
  meridiemColumn: string;
  /** Default accessible name of the clear button in `DateInput`. */
  clearDate: string;
  /** Default accessible name of the clear button in `DateRangeInput`. */
  clearDateRange: string;
  /** Default accessible name of the clear button in `TimeInput`. */
  clearTime: string;
  /** Default accessible name of the clear button in `TimeRangeInput`. */
  clearTimeRange: string;
  /** Default accessible name of the clear button in `DateTimeInput`. */
  clearDateTime: string;
  /** Default accessible name of the start clear button in `DateTimeRangePicker`. */
  clearStartDateTime: string;
  /** Default accessible name of the end clear button in `DateTimeRangePicker`. */
  clearEndDateTime: string;
}

/** English defaults for every {@link LocaleLabels} entry. */
export const defaultLocaleLabels: LocaleLabels = {
  cancel: 'Cancel',
  submit: 'Submit',
  save: 'Save',
  apply: 'Apply',
  dismiss: 'Dismiss',
  closeDialog: 'Close dialog',
  closeDrawer: 'Close drawer',
  closePopover: 'Close',
  removeItem: (item) => `Remove ${item}`,
  removeFilter: (filter) => `Remove filter: ${filter}`,
  switchToTheme: (nextTheme) => `Switch to ${nextTheme} theme`,

  keyFactLabel: (label) => `${label}:`,
  peekPosition: ({ noun, index, total }) => `${noun} ${index} of ${total}`,
  previousItem: (noun) => `Previous ${noun.toLowerCase()}`,
  nextItem: (noun) => `Next ${noun.toLowerCase()}`,
  openFullPage: 'Open',

  selectPlaceholder: 'Select...',
  noResults: 'No results found',
  suggestions: 'Suggestions',
  loadingOptions: 'Loading options…',
  noOptions: 'No options',
  addOption: (value) => `Add “${value}”`,
  optionSelected: (label) => `${label} selected.`,
  optionCreated: (value) => `${value} created and selected.`,
  optionRemoved: (label) => `${label} removed.`,
  moreSelected: (count) => `${count} more selected`,

  filterOrSearch: 'Filter or search',
  clearFilters: 'Clear all filters',
  moreFilters: (count) => `+${count} more`,

  copyCode: 'Copy code',
  copied: 'Copied',
  copyFailed: 'Copy failed',
  showAllLines: (count) => `Show all ${count} lines`,
  showLess: 'Show less',

  moreTabs: 'More tabs',

  chooseDate: 'Choose date',
  previousMonth: 'Previous month',
  nextMonth: 'Next month',
  previousYear: 'Previous year',
  nextYear: 'Next year',
  previousYears: 'Previous years',
  nextYears: 'Next years',
  chooseMonthIn: (year) => `Choose a month in ${year}`,
  chooseYear: 'Choose a year',
  today: 'today',
  selected: 'selected',
  rangeStart: 'range start',
  rangeEnd: 'range end',

  date: 'Date',
  time: 'Time',
  startDate: 'Start date',
  endDate: 'End date',
  startTime: 'Start time',
  endTime: 'End time',
  month: 'Month',
  day: 'Day',
  year: 'Year',
  hour: 'Hour',
  minute: 'Minute',
  meridiem: 'AM or PM',
  fieldHour: (field) => `${field} hour`,
  fieldMinute: (field) => `${field} minute`,
  fieldMeridiem: (field) => `${field} AM or PM`,
  monthPlaceholder: 'MM',
  dayPlaceholder: 'DD',
  yearPlaceholder: 'YYYY',
  hourPlaceholder: 'HH',
  minutePlaceholder: 'MM',
  hourColumn: 'HR',
  minuteColumn: 'MIN',
  meridiemColumn: 'AM/PM',
  clearDate: 'Clear date',
  clearDateRange: 'Clear date range',
  clearTime: 'Clear time',
  clearTimeRange: 'Clear time range',
  clearDateTime: 'Clear date and time',
  clearStartDateTime: 'Clear start date and time',
  clearEndDateTime: 'Clear end date and time',
};
