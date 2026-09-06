import type { DateValue, Meridiem, TimeValue } from './types';

// ─── Date math ──────────────────────────────────────────────────────────────

/** Number of days in the given month (1-indexed). */
export function daysInMonth(year: number, month: number): number {
  // Day 0 of the *next* month is the last day of `month`.
  return new Date(year, month, 0).getDate();
}

/** Day-of-week (0 = Sunday) for the 1st of the given month. */
export function firstWeekdayOfMonth(year: number, month: number): number {
  return new Date(year, month - 1, 1).getDay();
}

/** Shifts a (year, month) pair by `delta` months, rolling over the year as needed. */
export function shiftMonth(
  year: number,
  month: number,
  delta: number,
): { year: number; month: number } {
  const zeroBased = month - 1 + delta;
  const rolledYear = year + Math.floor(zeroBased / 12);
  const rolledMonth = ((zeroBased % 12) + 12) % 12; // 0-indexed, always positive
  return { year: rolledYear, month: rolledMonth + 1 };
}

/** Clamps `day` so it can't exceed the number of days in (month, year). Falls back to a leap year when year is unknown, so Feb 29 stays selectable while typing. */
export function clampDayToMonth(
  day: number,
  month: number | null,
  year: number | null,
): number {
  const y = year ?? 2000;
  const m = month ?? 1;
  return Math.min(day, daysInMonth(y, m));
}

export function compareDates(a: DateValue, b: DateValue): number {
  if (a.year !== b.year) return a.year - b.year;
  if (a.month !== b.month) return a.month - b.month;
  return a.day - b.day;
}

export function isSameDate(a: DateValue, b: DateValue): boolean {
  return compareDates(a, b) === 0;
}

export function isDateBefore(
  date: DateValue,
  bound: DateValue | undefined,
): boolean {
  return bound !== undefined && compareDates(date, bound) < 0;
}

export function isDateAfter(
  date: DateValue,
  bound: DateValue | undefined,
): boolean {
  return bound !== undefined && compareDates(date, bound) > 0;
}

export function isDateInRange(
  date: DateValue,
  min?: DateValue,
  max?: DateValue,
): boolean {
  return !isDateBefore(date, min) && !isDateAfter(date, max);
}

export function getTodayDate(): DateValue {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };
}

// ─── Time math ──────────────────────────────────────────────────────────────

export function to12Hour(hour24: number): {
  hour12: number;
  meridiem: Meridiem;
} {
  if (hour24 === 0) return { hour12: 12, meridiem: 'AM' };
  if (hour24 < 12) return { hour12: hour24, meridiem: 'AM' };
  if (hour24 === 12) return { hour12: 12, meridiem: 'PM' };
  return { hour12: hour24 - 12, meridiem: 'PM' };
}

export function to24Hour(hour12: number, meridiem: Meridiem): number {
  if (meridiem === 'AM') return hour12 === 12 ? 0 : hour12;
  return hour12 === 12 ? 12 : hour12 + 12;
}

export function getTodayTime(): TimeValue {
  const now = new Date();
  return { hour: now.getHours(), minute: now.getMinutes() };
}

/** Clamps an arbitrary `minuteStep` to a safe divisor of 60 (1-60) so menu generation can't hang or emit out-of-range minutes. */
export function normalizeMinuteStep(minuteStep: number): number {
  const step = Math.floor(minuteStep);
  if (!Number.isFinite(step) || step < 1) return 1;
  return Math.min(step, 60);
}

/** Minute options for a time menu, always within [0, 59] regardless of `minuteStep`. */
export function getMinuteValues(minuteStep: number): number[] {
  const step = normalizeMinuteStep(minuteStep);
  const values: number[] = [];
  for (let minute = 0; minute < 60; minute += step) {
    values.push(minute);
  }
  return values;
}
