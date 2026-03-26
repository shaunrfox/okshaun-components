import { cx } from '@styled-system/css';
import type { datePicker } from '@styled-system/recipes';
import type { KeyboardEvent } from 'react';

import { Box } from '~/components/Box';
import { Button } from '~/components/Button';
import { IconButton } from '~/components/IconButton';
import { Text } from '~/components/Text';

export interface DateValue {
  year: number;
  month: number; // 1-indexed (1 = January)
  day: number;
}

export interface CalendarProps {
  value: DateValue | null;
  onSelect: (date: DateValue) => void;
  minDate?: DateValue;
  maxDate?: DateValue;
  viewYear: number;
  viewMonth: number; // 1-indexed
  onViewChange: (year: number, month: number) => void;
  classes: ReturnType<typeof datePicker>;
}

// ─── Date math utilities ───────────────────────────────────────────────────────

function daysInMonth(year: number, month: number): number {
  // new Date(year, month, 0) returns the last day of the prior month (month is 0-indexed)
  return new Date(year, month, 0).getDate();
}

function firstDayOfWeek(year: number, month: number): number {
  return new Date(year, month - 1, 1).getDay(); // 0 = Sunday
}

function prevMonth(year: number, month: number): [number, number] {
  return month === 1 ? [year - 1, 12] : [year, month - 1];
}

function nextMonth(year: number, month: number): [number, number] {
  return month === 12 ? [year + 1, 1] : [year, month + 1];
}

function compareDates(a: DateValue, b: DateValue): number {
  if (a.year !== b.year) return a.year - b.year;
  if (a.month !== b.month) return a.month - b.month;
  return a.day - b.day;
}

function isBeforeMin(date: DateValue, min: DateValue | undefined): boolean {
  if (!min) return false;
  return compareDates(date, min) < 0;
}

function isAfterMax(date: DateValue, max: DateValue | undefined): boolean {
  if (!max) return false;
  return compareDates(date, max) > 0;
}

function isSameDate(a: DateValue, b: DateValue): boolean {
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

function getTodayValue(): DateValue {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const WEEKDAY_FULL = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const CALENDAR_ROW_KEYS = [
  'week-1',
  'week-2',
  'week-3',
  'week-4',
  'week-5',
  'week-6',
] as const;

// ─── Calendar component ────────────────────────────────────────────────────────

export const Calendar = (props: CalendarProps) => {
  const {
    value,
    onSelect,
    minDate,
    maxDate,
    viewYear,
    viewMonth,
    onViewChange,
    classes,
  } = props;
  const today = getTodayValue();

  // Build 42-cell grid (6 rows × 7 cols)
  const firstDay = firstDayOfWeek(viewYear, viewMonth);
  const totalDays = daysInMonth(viewYear, viewMonth);
  const gridDays: Array<number | null> = [];

  for (let i = 0; i < firstDay; i++) gridDays.push(null);
  for (let d = 1; d <= totalDays; d++) gridDays.push(d);
  while (gridDays.length < 42) gridDays.push(null);

  const [prevYear, prevMonthNum] = prevMonth(viewYear, viewMonth);
  const [nextYear, nextMonthNum] = nextMonth(viewYear, viewMonth);

  const canGoPrev = minDate
    ? !(
        prevYear < minDate.year ||
        (prevYear === minDate.year && prevMonthNum < minDate.month)
      )
    : true;
  const canGoNext = maxDate
    ? !(
        nextYear > maxDate.year ||
        (nextYear === maxDate.year && nextMonthNum > maxDate.month)
      )
    : true;

  const handleDayClick = (day: number) => {
    const date: DateValue = { year: viewYear, month: viewMonth, day };
    if (!isBeforeMin(date, minDate) && !isAfterMax(date, maxDate)) {
      onSelect(date);
    }
  };

  const handleDayKeyDown = (e: KeyboardEvent, day: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDayClick(day);
    }
  };

  return (
    <>
      {/* Calendar header: prev / Month Year / next */}
      <Box className={classes.calendarHeader}>
        <IconButton
          altText="Previous month"
          disabled={!canGoPrev}
          onClick={() => onViewChange(prevYear, prevMonthNum)}
          iconName="caret-left"
          size="sm"
          variant="ghost"
        />

        <Box
          fontSize="14"
          fontWeight="medium"
          color="text"
          flex="1"
          textAlign="center"
          userSelect="none"
        >
          {MONTH_NAMES[viewMonth - 1]} {viewYear}
        </Box>

        <IconButton
          altText="Next month"
          disabled={!canGoNext}
          onClick={() => onViewChange(nextYear, nextMonthNum)}
          iconName="caret-right"
          size="sm"
          variant="ghost"
        />
      </Box>

      {/* Calendar grid */}
      <Box
        className={classes.calendarGrid}
        role="grid"
        aria-label={`${MONTH_NAMES[viewMonth - 1]} ${viewYear}`}
      >
        {/* Weekday headers */}
        {WEEKDAY_LABELS.map((label, i) => (
          <Text
            textStyle="mono.xs"
            allCaps
            key={label}
            className={classes.weekdayLabel}
            role="columnheader"
            aria-label={WEEKDAY_FULL[i]}
          >
            {label}
          </Text>
        ))}

        {/* Day cells — render in rows of 7 */}
        {CALENDAR_ROW_KEYS.map((rowKey, rowIdx) => {
          const rowDays = gridDays.slice(rowIdx * 7, rowIdx * 7 + 7);

          return (
            <Box key={rowKey} role="row" display="contents">
              {rowDays.map((day, colIdx) => {
                const weekday = WEEKDAY_FULL[colIdx];

                if (!day) {
                  return (
                    <Box
                      key={`empty-${rowKey}-${weekday}`}
                      role="gridcell"
                      aria-hidden="true"
                    />
                  );
                }

                const dateValue: DateValue = {
                  year: viewYear,
                  month: viewMonth,
                  day,
                };
                const isUnavailable =
                  isBeforeMin(dateValue, minDate) ||
                  isAfterMax(dateValue, maxDate);
                const isSelected = value ? isSameDate(value, dateValue) : false;
                const isToday = isSameDate(today, dateValue);

                const buttonVariant = isToday
                  ? 'selected'
                  : isSelected
                    ? 'selectedBold'
                    : 'ghost';

                return (
                  <Box
                    key={day}
                    role="gridcell"
                    aria-selected={isSelected}
                    aria-disabled={isUnavailable}
                  >
                    <Button
                      variant={buttonVariant}
                      size="sm"
                      className={cx(classes.day)}
                      data-today={isToday ? true : undefined}
                      disabled={isUnavailable}
                      data-unavailable={isUnavailable ? true : undefined}
                      aria-selected={isSelected}
                      aria-label={`${MONTH_NAMES[viewMonth - 1]} ${day}, ${viewYear}${isToday ? ', today' : ''}${isSelected ? ', selected' : ''}`}
                      tabIndex={isUnavailable ? -1 : 0}
                      onClick={() => !isUnavailable && handleDayClick(day)}
                      onKeyDown={(e: KeyboardEvent) =>
                        !isUnavailable && handleDayKeyDown(e, day)
                      }
                    >
                      {String(day)}
                    </Button>
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>
    </>
  );
};
