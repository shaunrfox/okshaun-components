// biome-ignore-all lint/a11y/useSemanticElements: the calendar and time grids are built from Button and Box, not table markup, so the roles are applied explicitly
// biome-ignore-all lint/suspicious/noArrayIndexKey: weekday and week positions are fixed, so the index is the stable identity

import { cx } from '@styled-system/css';
import { type CalendarVariantProps, calendar } from '@styled-system/recipes';
import { type KeyboardEvent, useCallback, useMemo, useState } from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { Button } from '~/components/Button';
import {
  compareDates,
  type DateValue,
  daysInMonth,
  firstWeekdayOfMonth,
  getTodayDate,
  isDateInRange,
  isSameDate,
  shiftMonth,
} from '~/components/DateTime/helpers';
import { IconButton } from '~/components/IconButton';
import { Text } from '~/components/Text';
import type { LocaleLabels } from '~/system/context/locale-labels';
import { useLocale } from '~/system/context/useLocale';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import { type CalendarNames, getCalendarNames } from './calendarNames';

// ─── Static data ────────────────────────────────────────────────────────────────

const YEAR_WINDOW_SIZE = 12;

type ViewLevel = 'days' | 'months' | 'years';
type ViewDate = { year: number; month: number };
type HeaderConfig = {
  previousLabel: string;
  nextLabel: string;
  title: string;
  titleDisabled?: boolean;
  onTitleClick?: () => void;
  previousDisabled: boolean;
  nextDisabled: boolean;
  onPrevious: () => void;
  onNext: () => void;
};
type CellState = {
  isSelected: boolean;
  isUnavailable: boolean;
  isToday?: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isInRange?: boolean;
};

// ─── Bounds helpers (month/year granularity, not just day) ────────────────────

function monthInRange(
  year: number,
  month: number,
  min?: DateValue,
  max?: DateValue,
): boolean {
  if (min && (year < min.year || (year === min.year && month < min.month)))
    return false;
  if (max && (year > max.year || (year === max.year && month > max.month)))
    return false;
  return true;
}

function yearInRange(year: number, min?: DateValue, max?: DateValue): boolean {
  if (min && year < min.year) return false;
  if (max && year > max.year) return false;
  return true;
}

function getYearWindowStart(year: number): number {
  return Math.floor(year / YEAR_WINDOW_SIZE) * YEAR_WINDOW_SIZE;
}

function getCellVariant(state: CellState) {
  if (state.isSelected || state.isRangeStart || state.isRangeEnd) {
    return 'selectedBold';
  }
  return state.isInRange ? 'selected' : 'ghost';
}

function getDayAriaLabel(
  date: DateValue,
  state: CellState,
  labels: LocaleLabels,
  names: CalendarNames,
): string {
  const parts = [names.formatDate(date)];
  if (state.isToday) parts.push(labels.today);
  if (state.isSelected) parts.push(labels.selected);
  if (state.isRangeStart) parts.push(labels.rangeStart);
  if (state.isRangeEnd) parts.push(labels.rangeEnd);
  return parts.join(', ');
}

type CalendarClasses = ReturnType<typeof calendar>;

type CalendarCellProps = {
  ariaLabel: string;
  classes: CalendarClasses;
  disabled: boolean;
  label: string | number;
  onClick: () => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  state: CellState;
};

const CalendarCell = ({
  ariaLabel,
  classes,
  disabled,
  label,
  onClick,
  onKeyDown,
  state,
}: CalendarCellProps) => (
  <Button
    role="gridcell"
    variant={getCellVariant(state)}
    className={classes.day}
    fontSize="14"
    fontFamily="mono"
    data-today={state.isToday || undefined}
    data-range-start={state.isRangeStart || undefined}
    data-range-end={state.isRangeEnd || undefined}
    data-in-range={state.isInRange || undefined}
    disabled={disabled || state.isUnavailable}
    data-unavailable={state.isUnavailable || undefined}
    aria-selected={state.isSelected || state.isRangeStart || state.isRangeEnd}
    aria-label={ariaLabel}
    tabIndex={state.isUnavailable ? -1 : 0}
    onClick={onClick}
    onKeyDown={onKeyDown}
  >
    {label}
  </Button>
);

type DayGridContentProps = {
  classes: CalendarClasses;
  dayCells: Array<number | null>;
  disabled: boolean;
  getDayState: (date: DateValue) => CellState;
  handleDaySelect: (date: DateValue) => void;
  labels: LocaleLabels;
  names: CalendarNames;
  viewDate: ViewDate;
};

const DayGridContent = ({
  classes,
  dayCells,
  disabled,
  getDayState,
  handleDaySelect,
  labels,
  names,
  viewDate,
}: DayGridContentProps) => (
  <>
    {names.weekdaysShort.map((weekday, index) => (
      <Text
        key={index}
        textStyle="mono.xs"
        allCaps
        className={classes.weekdayLabel}
        role="columnheader"
        aria-label={names.weekdays[index] ?? weekday}
      >
        {weekday}
      </Text>
    ))}

    {Array.from({ length: dayCells.length / 7 }, (_, rowIndex) => (
      <Box key={rowIndex} role="row" display="contents">
        {dayCells
          .slice(rowIndex * 7, rowIndex * 7 + 7)
          .map((day, columnIndex) => {
            if (day === null) {
              return (
                <Box
                  key={`empty-${rowIndex}-${columnIndex}`}
                  role="gridcell"
                  aria-hidden="true"
                />
              );
            }

            const date = {
              year: viewDate.year,
              month: viewDate.month,
              day,
            };
            const state = getDayState(date);

            return (
              <CalendarCell
                key={day}
                classes={classes}
                disabled={disabled}
                label={day}
                ariaLabel={getDayAriaLabel(date, state, labels, names)}
                state={state}
                onClick={() => handleDaySelect(date)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleDaySelect(date);
                  }
                }}
              />
            );
          })}
      </Box>
    ))}
  </>
);

type MonthGridContentProps = {
  classes: CalendarClasses;
  disabled: boolean;
  getMonthState: (month: number) => CellState;
  handleMonthSelect: (month: number) => void;
  names: CalendarNames;
  year: number;
};

const MonthGridContent = ({
  classes,
  disabled,
  getMonthState,
  handleMonthSelect,
  names,
  year,
}: MonthGridContentProps) => (
  <>
    {names.monthsShort.map((label, index) => {
      const month = index + 1;
      return (
        <CalendarCell
          key={month}
          classes={classes}
          disabled={disabled}
          label={label}
          ariaLabel={names.formatMonthYear(year, month)}
          state={getMonthState(month)}
          onClick={() => handleMonthSelect(month)}
        />
      );
    })}
  </>
);

type YearGridContentProps = {
  classes: CalendarClasses;
  disabled: boolean;
  getYearState: (year: number) => CellState;
  handleYearSelect: (year: number) => void;
  years: number[];
};

const YearGridContent = ({
  classes,
  disabled,
  getYearState,
  handleYearSelect,
  years,
}: YearGridContentProps) => (
  <>
    {years.map((year) => (
      <CalendarCell
        key={year}
        classes={classes}
        disabled={disabled}
        label={year}
        ariaLabel={String(year)}
        state={getYearState(year)}
        onClick={() => handleYearSelect(year)}
      />
    ))}
  </>
);

// ─── Props ─────────────────────────────────────────────────────────────────────

/** Props for {@link Calendar}, including selection, bounds, and visible-month state. */
export type CalendarProps = Omit<
  BoxProps,
  keyof CalendarVariantProps | 'children'
> &
  Omit<CalendarVariantProps, 'type'> & {
    /** Controlled selected date. */
    value?: DateValue | null;
    /** Runs when a selectable day is chosen. Calendar never clears its own value. */
    onChange?: (value: DateValue) => void;
    /**
     * Range-selection endpoints, for DateRangeMenu. Independent of `value` —
     * a Calendar can show a range highlight (start/end fill + in-between
     * tint) regardless of which month it's currently displaying, since a
     * range's two endpoints may fall in months neither calendar is showing.
     */
    rangeStart?: DateValue | null;
    /** End of the optional visual range highlight. */
    rangeEnd?: DateValue | null;
    /** Earliest selectable date. */
    minDate?: DateValue;
    /** Latest selectable date. */
    maxDate?: DateValue;
    /** Controlled visible month and year. */
    viewDate?: ViewDate;
    /** Initial visible month and year when `viewDate` is not provided. Defaults to `value`, then today. */
    defaultViewDate?: ViewDate;
    /** Runs when month or year navigation requests a new visible month. */
    onViewDateChange?: (viewDate: ViewDate) => void;
    /** Prevents navigation and date selection. */
    disabled?: boolean;
    /** Accessible label prefix for the calendar grid. */
    label?: string;
  };

// ─── Calendar ──────────────────────────────────────────────────────────────────

/**
 * Displays an accessible day, month, and year selection grid.
 *
 * Use `value` and `onChange` for date selection. `viewDate` separately controls
 * the visible month; omit it to let Calendar manage navigation internally.
 * Dates outside `minDate` and `maxDate` remain visible but unavailable.
 *
 * @example
 * ```tsx
 * <Calendar value={date} onChange={setDate} label="Choose invoice date" />
 * ```
 */
export const Calendar = (props: CalendarProps) => {
  const { labels, locale } = useLocale();
  const names = useMemo(() => getCalendarNames(locale), [locale]);
  const {
    value = null,
    onChange,
    rangeStart = null,
    rangeEnd = null,
    minDate,
    maxDate,
    viewDate: viewDateProp,
    defaultViewDate,
    onViewDateChange,
    disabled = false,
    label = labels.chooseDate,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);

  const today = useMemo(() => getTodayDate(), []);

  const [internalViewDate, setInternalViewDate] = useState<ViewDate>(
    () =>
      defaultViewDate ??
      (value
        ? { year: value.year, month: value.month }
        : { year: today.year, month: today.month }),
  );
  const viewDate = viewDateProp ?? internalViewDate;

  const setViewDate = useCallback(
    (next: ViewDate) => {
      setInternalViewDate(next);
      onViewDateChange?.(next);
    },
    [onViewDateChange],
  );

  const [viewLevel, setViewLevel] = useState<ViewLevel>('days');
  const [yearWindowStart, setYearWindowStart] = useState(() =>
    getYearWindowStart(viewDate.year),
  );

  const classes = calendar({ type: viewLevel });
  const monthLabel = names.formatMonthYear(viewDate.year, viewDate.month);
  const yearWindowEnd = yearWindowStart + YEAR_WINDOW_SIZE - 1;

  const dayCells = useMemo(() => {
    const leadingDays =
      (firstWeekdayOfMonth(viewDate.year, viewDate.month) -
        names.firstDayOfWeek +
        7) %
      7;
    const totalDays = daysInMonth(viewDate.year, viewDate.month);
    const cells: Array<number | null> = [];
    for (let i = 0; i < leadingDays; i += 1) cells.push(null);
    for (let day = 1; day <= totalDays; day += 1) cells.push(day);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [names.firstDayOfWeek, viewDate.month, viewDate.year]);

  const windowYears = useMemo(
    () =>
      Array.from({ length: YEAR_WINDOW_SIZE }, (_, i) => yearWindowStart + i),
    [yearWindowStart],
  );

  const handleDaySelect = useCallback(
    (date: DateValue) => {
      if (disabled || !isDateInRange(date, minDate, maxDate)) return;
      onChange?.(date);
    },
    [disabled, minDate, maxDate, onChange],
  );

  const handleMonthSelect = useCallback(
    (month: number) => {
      if (disabled) return;
      setViewDate({ year: viewDate.year, month });
      setViewLevel('days');
    },
    [disabled, viewDate.year, setViewDate],
  );

  const handleYearSelect = useCallback(
    (year: number) => {
      if (disabled) return;
      setViewDate({ year, month: viewDate.month });
      setViewLevel('months');
    },
    [disabled, viewDate.month, setViewDate],
  );

  const getDayState = (date: DateValue): CellState => {
    const isRangeStart = rangeStart ? isSameDate(rangeStart, date) : false;
    const isRangeEnd = rangeEnd ? isSameDate(rangeEnd, date) : false;
    return {
      isSelected: value ? isSameDate(value, date) : false,
      isUnavailable: !isDateInRange(date, minDate, maxDate),
      isToday: isSameDate(today, date),
      isRangeStart,
      isRangeEnd,
      isInRange:
        rangeStart && rangeEnd
          ? compareDates(date, rangeStart) > 0 &&
            compareDates(date, rangeEnd) < 0
          : false,
    };
  };

  const getMonthState = (month: number): CellState => ({
    isSelected: month === viewDate.month,
    isUnavailable: !monthInRange(viewDate.year, month, minDate, maxDate),
    isToday: today.year === viewDate.year && today.month === month,
  });

  const getYearState = (year: number): CellState => ({
    isSelected: year === viewDate.year,
    isUnavailable: !yearInRange(year, minDate, maxDate),
    isToday: year === today.year,
  });

  const previousMonth = shiftMonth(viewDate.year, viewDate.month, -1);
  const nextMonth = shiftMonth(viewDate.year, viewDate.month, 1);

  const getHeaderConfig = (): HeaderConfig => {
    switch (viewLevel) {
      case 'days':
        return {
          previousLabel: labels.previousMonth,
          nextLabel: labels.nextMonth,
          title: monthLabel,
          onTitleClick: () => setViewLevel('months'),
          previousDisabled:
            disabled ||
            !monthInRange(
              previousMonth.year,
              previousMonth.month,
              minDate,
              maxDate,
            ),
          nextDisabled:
            disabled ||
            !monthInRange(nextMonth.year, nextMonth.month, minDate, maxDate),
          onPrevious: () => setViewDate(previousMonth),
          onNext: () => setViewDate(nextMonth),
        };
      case 'months':
        return {
          previousLabel: labels.previousYear,
          nextLabel: labels.nextYear,
          title: String(viewDate.year),
          onTitleClick: () => {
            // Recenter the year window on the current view before showing it.
            setYearWindowStart(getYearWindowStart(viewDate.year));
            setViewLevel('years');
          },
          previousDisabled:
            disabled || !yearInRange(viewDate.year - 1, minDate, maxDate),
          nextDisabled:
            disabled || !yearInRange(viewDate.year + 1, minDate, maxDate),
          onPrevious: () =>
            setViewDate({ ...viewDate, year: viewDate.year - 1 }),
          onNext: () => setViewDate({ ...viewDate, year: viewDate.year + 1 }),
        };
      case 'years':
        return {
          previousLabel: labels.previousYears,
          nextLabel: labels.nextYears,
          title: `${yearWindowStart}-${yearWindowEnd}`,
          titleDisabled: true,
          previousDisabled:
            disabled || !yearInRange(yearWindowStart - 1, minDate, maxDate),
          nextDisabled:
            disabled ||
            !yearInRange(yearWindowStart + YEAR_WINDOW_SIZE, minDate, maxDate),
          onPrevious: () =>
            setYearWindowStart((year) => year - YEAR_WINDOW_SIZE),
          onNext: () => setYearWindowStart((year) => year + YEAR_WINDOW_SIZE),
        };
    }
  };
  const headerConfig = getHeaderConfig();

  const gridAriaLabel =
    viewLevel === 'days'
      ? monthLabel
      : viewLevel === 'months'
        ? labels.chooseMonthIn(viewDate.year)
        : labels.chooseYear;

  return (
    <Box
      {...dsComponent('Calendar')}
      className={cx(classes.root, className)}
      role="group"
      aria-label={label}
      {...otherProps}
    >
      <Box className={classes.header}>
        <IconButton
          altText={headerConfig.previousLabel}
          disabled={headerConfig.previousDisabled}
          onClick={headerConfig.onPrevious}
          iconName="caret-left"
          variant="ghost"
        />
        <Button
          variant="ghost"
          disabled={disabled || headerConfig.titleDisabled}
          fontFamily="mono"
          onClick={headerConfig.onTitleClick}
        >
          {headerConfig.title}
        </Button>
        <IconButton
          altText={headerConfig.nextLabel}
          disabled={headerConfig.nextDisabled}
          onClick={headerConfig.onNext}
          iconName="caret-right"
          variant="ghost"
        />
      </Box>

      <Box
        className={viewLevel === 'days' ? classes.grid : classes.monthYearGrid}
        role="grid"
        aria-label={gridAriaLabel}
      >
        {viewLevel === 'days' ? (
          <DayGridContent
            classes={classes}
            dayCells={dayCells}
            disabled={disabled}
            getDayState={getDayState}
            handleDaySelect={handleDaySelect}
            labels={labels}
            names={names}
            viewDate={viewDate}
          />
        ) : viewLevel === 'months' ? (
          <MonthGridContent
            classes={classes}
            disabled={disabled}
            getMonthState={getMonthState}
            handleMonthSelect={handleMonthSelect}
            names={names}
            year={viewDate.year}
          />
        ) : (
          <YearGridContent
            classes={classes}
            disabled={disabled}
            getYearState={getYearState}
            handleYearSelect={handleYearSelect}
            years={windowYears}
          />
        )}
      </Box>
    </Box>
  );
};
