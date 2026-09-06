import { dateMenus } from '@styled-system/recipes';
import { useEffect, useState } from 'react';

import { Box } from '~/components/Box';
import { Button } from '~/components/Button';
import { Calendar } from '~/components/Calendar';
import { Divider } from '~/components/Divider';
import { Menu, type MenuProps } from '~/components/Menu';
import { useControllableState } from '~/system/hooks/useControllableState';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import {
  compareDates,
  getTodayDate,
  shiftMonth,
} from '../helpers/dateTimeUtils';

import type { DateRangeValue, DateValue } from '../helpers/types';

type ViewDate = { year: number; month: number };

/** Props for {@link DateRangeMenu}, including committed range and bounds. */
export type DateRangeMenuProps = Omit<
  MenuProps,
  'children' | 'onChange' | 'value'
> & {
  /** Committed start and end dates used to initialize the menu draft. */
  value?: DateRangeValue | null;
  /** Commits the complete draft when Apply is pressed; Cancel discards it. */
  onChange?: (value: DateRangeValue | null) => void;
  /** Earliest selectable date for both calendars. */
  minDate?: DateValue;
  /** Latest selectable date for both calendars. */
  maxDate?: DateValue;
  /** Prevents opening or selection and returns only the trigger. */
  disabled?: boolean;
  /** Accessible label for the first calendar. */
  startLabel?: string;
  /** Accessible label for the second calendar. */
  endLabel?: string;
};

const EMPTY_RANGE: DateRangeValue = { start: null, end: null };

const sameMonth = (a: ViewDate, b: ViewDate) =>
  a.year === b.year && a.month === b.month;

/**
 * Selects a date range from two independently navigable calendars.
 *
 * Selection is held as a draft until Apply is pressed. Cancel restores the
 * committed `value`. Apply is unavailable until both endpoints are selected.
 *
 * @example
 * ```tsx
 * <DateRangeMenu
 *   trigger={<Button>Choose dates</Button>}
 *   value={range}
 *   onChange={setRange}
 * />
 * ```
 */
export const DateRangeMenu = (props: DateRangeMenuProps) => {
  const {
    trigger,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    placement = 'bottom-start',
    value,
    onChange,
    minDate,
    maxDate,
    disabled = false,
    startLabel = 'Start date',
    endLabel = 'End date',
    ...rest
  } = props;
  const isInline = rest.inline === true;
  const [className, otherProps] = splitProps(rest);

  const [isOpen, setOpenState] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const menuOpen = isInline ? true : isOpen;

  const classes = dateMenus();

  // Pending selection, separate from the committed `value` — only Apply
  // commits it via onChange; Cancel discards it.
  const [draft, setDraft] = useState<DateRangeValue>(value ?? EMPTY_RANGE);

  // Reset the draft from the committed value each time the menu opens, so a
  // previous Cancel doesn't leak into the next open.
  useEffect(() => {
    if (menuOpen) {
      setDraft(value ?? EMPTY_RANGE);
    }
  }, [menuOpen, value]);

  // The two calendars navigate fully independently (so a user can pick dates
  // months apart), but must never both show the same month — if a navigation
  // would cause that, the *other* calendar is nudged out of the way rather
  // than blocking the navigation.
  const [startViewDate, setStartViewDate] = useState<ViewDate>(() => {
    const anchor = value?.start ?? getTodayDate();
    return { year: anchor.year, month: anchor.month };
  });
  const [endViewDate, setEndViewDate] = useState<ViewDate>(() => {
    const anchor =
      value?.end ?? shiftMonth(startViewDate.year, startViewDate.month, 1);
    return { year: anchor.year, month: anchor.month };
  });

  const handleStartViewDateChange = (next: ViewDate) => {
    setStartViewDate(next);
    if (sameMonth(next, endViewDate)) {
      setEndViewDate(shiftMonth(next.year, next.month, 1));
    }
  };

  const handleEndViewDateChange = (next: ViewDate) => {
    setEndViewDate(next);
    if (sameMonth(next, startViewDate)) {
      setStartViewDate(shiftMonth(next.year, next.month, -1));
    }
  };

  const handleDaySelect = (date: DateValue) => {
    setDraft((current) => {
      if (current.start && !current.end) {
        return compareDates(date, current.start) >= 0
          ? { start: current.start, end: date }
          : { start: date, end: null };
      }
      return { start: date, end: null };
    });
  };

  const handleApply = () => {
    onChange?.(draft.start && draft.end ? draft : null);
    setOpenState(false);
  };

  const handleCancel = () => {
    setDraft(value ?? EMPTY_RANGE);
    setOpenState(false);
  };

  if (disabled) {
    return trigger;
  }

  return (
    <Menu
      {...dsComponent('DateRangeMenu')}
      className={className}
      {...otherProps}
      trigger={trigger}
      open={menuOpen}
      onOpenChange={setOpenState}
      placement={placement}
      closeOnSelect={false}
    >
      <Box>
        <Box className={classes.calendars}>
          <Calendar
            label={startLabel}
            rangeStart={draft.start}
            rangeEnd={draft.end}
            onChange={handleDaySelect}
            minDate={minDate}
            maxDate={maxDate}
            viewDate={startViewDate}
            onViewDateChange={handleStartViewDateChange}
            disabled={disabled}
          />
          <Divider direction="vertical" weight="thick" aria-hidden="true" />
          <Calendar
            label={endLabel}
            rangeStart={draft.start}
            rangeEnd={draft.end}
            onChange={handleDaySelect}
            minDate={minDate}
            maxDate={maxDate}
            viewDate={endViewDate}
            onViewDateChange={handleEndViewDateChange}
            disabled={disabled}
          />
        </Box>
        <Box className={classes.footer}>
          <Button variant="standard" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!draft.start || !draft.end}
            onClick={handleApply}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Menu>
  );
};
