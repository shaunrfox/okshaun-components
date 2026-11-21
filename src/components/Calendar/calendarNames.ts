import type { DateValue } from '~/components/DateTime/helpers';
import { DEFAULT_LOCALE } from '~/system/context/locale-context';

/** Locale-specific names and formatters used by {@link Calendar}. */
export interface CalendarNames {
  /** Full month names, January first. */
  months: string[];
  /** Abbreviated month names, January first. */
  monthsShort: string[];
  /** First day of the week for the locale, 0 = Sunday through 6 = Saturday. */
  firstDayOfWeek: number;
  /** Full weekday names, starting on {@link CalendarNames.firstDayOfWeek}. */
  weekdays: string[];
  /** Abbreviated weekday names without a trailing period, starting on {@link CalendarNames.firstDayOfWeek}. */
  weekdaysShort: string[];
  /** Formats a month and year, such as "October 2026". */
  formatMonthYear: (year: number, month: number) => string;
  /** Formats a full date, such as "October 5, 2026". */
  formatDate: (date: DateValue) => string;
}

// 2017-01-01 is a Sunday, so day offsets 0-6 map to Sunday-Saturday.
const WEEK_START_UTC = Date.UTC(2017, 0, 1);
const DAY_MS = 24 * 60 * 60 * 1000;

// Date.UTC maps years 0-99 to 1900-1999; setUTCFullYear does not.
function utcDate(year: number, month: number, day: number): Date {
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  return date;
}

function resolveLocale(locale: string): string {
  try {
    return Intl.DateTimeFormat.supportedLocalesOf(locale).length > 0
      ? locale
      : DEFAULT_LOCALE;
  } catch {
    // An invalid tag throws a RangeError.
    return DEFAULT_LOCALE;
  }
}

type WeekInfo = { firstDay: number };
type LocaleWithWeekInfo = Intl.Locale & {
  getWeekInfo?: () => WeekInfo;
  weekInfo?: WeekInfo;
};

/**
 * Returns the locale's first day of the week, 0 = Sunday through 6 = Saturday.
 * `Intl.Locale` week info numbers days 1 = Monday through 7 = Sunday. Falls
 * back to Sunday when the browser has no week info.
 */
function getFirstDayOfWeek(locale: string): number {
  try {
    const intlLocale = new Intl.Locale(locale) as LocaleWithWeekInfo;
    const weekInfo = intlLocale.getWeekInfo?.() ?? intlLocale.weekInfo;
    return weekInfo ? weekInfo.firstDay % 7 : 0;
  } catch {
    return 0;
  }
}

/**
 * Builds month and weekday names, the first day of the week, and date
 * formatters for a locale with `Intl`. Falls back to `en-US` when the locale is invalid or
 * unsupported. All dates use the Gregorian calendar and UTC, so a locale's
 * default calendar or the user's time zone cannot change a name or shift a day.
 */
export function getCalendarNames(locale: string): CalendarNames {
  const resolved = resolveLocale(locale);
  // Calendar's grid is Gregorian, so its names must be too. Some locales
  // default to another calendar, such as th-TH (Buddhist) or fa-IR (Persian).
  const format = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(resolved, {
      ...options,
      calendar: 'gregory',
      timeZone: 'UTC',
    });

  const monthLong = format({ month: 'long' });
  const monthShort = format({ month: 'short' });
  const weekdayLong = format({ weekday: 'long' });
  const weekdayShort = format({ weekday: 'short' });
  const monthYear = format({ month: 'long', year: 'numeric' });
  const fullDate = format({ month: 'long', day: 'numeric', year: 'numeric' });

  const monthDates = Array.from({ length: 12 }, (_, index) =>
    utcDate(2000, index + 1, 1),
  );
  const firstDayOfWeek = getFirstDayOfWeek(resolved);
  const weekDates = Array.from(
    { length: 7 },
    (_, index) =>
      new Date(WEEK_START_UTC + ((firstDayOfWeek + index) % 7) * DAY_MS),
  );

  return {
    firstDayOfWeek,
    months: monthDates.map((date) => monthLong.format(date)),
    monthsShort: monthDates.map((date) => monthShort.format(date)),
    weekdays: weekDates.map((date) => weekdayLong.format(date)),
    weekdaysShort: weekDates.map((date) =>
      weekdayShort.format(date).replace(/\.$/, ''),
    ),
    formatMonthYear: (year, month) => monthYear.format(utcDate(year, month, 1)),
    formatDate: ({ year, month, day }) =>
      fullDate.format(utcDate(year, month, day)),
  };
}
