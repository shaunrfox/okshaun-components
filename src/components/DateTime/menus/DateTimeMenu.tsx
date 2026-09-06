// biome-ignore-all lint/a11y/useSemanticElements: the calendar and time grids are built from Button and Box, not table markup, so the roles are applied explicitly
import { dateTimeMenus, timeMenus } from '@styled-system/recipes';
import {
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { Box } from '~/components/Box';
import { Button } from '~/components/Button';
import { Calendar } from '~/components/Calendar';
import { Divider } from '~/components/Divider';
import { List, ListItem } from '~/components/List';
import { Menu, type MenuProps } from '~/components/Menu';
import { useControllableState } from '~/system/hooks/useControllableState';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import { getMinuteValues, to12Hour, to24Hour } from '../helpers/dateTimeUtils';

import type {
  DateTimeValue,
  DateValue,
  Meridiem,
  TimeFormat,
  TimeValue,
} from '../helpers/types';

type ViewDate = { year: number; month: number };

/** Props for {@link DateTimeMenu}, including committed value and constraints. */
export type DateTimeMenuProps = Omit<
  MenuProps,
  'children' | 'onChange' | 'value'
> & {
  /** Committed date and time used to initialize the menu draft. */
  value?: DateTimeValue | null;
  /** Commits the complete draft when Apply is pressed; Cancel discards it. */
  onChange?: (value: DateTimeValue | null) => void;
  /** Earliest selectable calendar date. */
  minDate?: DateValue;
  /** Latest selectable calendar date. */
  maxDate?: DateValue;
  /** Controlled visible calendar month. */
  viewDate?: ViewDate;
  /** Initial visible calendar month when `viewDate` is not provided. */
  defaultViewDate?: ViewDate;
  /** Runs when calendar navigation requests a new visible month. */
  onViewDateChange?: (viewDate: ViewDate) => void;
  /** Display cycle for the time columns. */
  timeFormat?: TimeFormat;
  /** Interval used to generate minute choices. */
  minuteStep?: number;
  /** Prevents opening or selection and returns only the trigger. */
  disabled?: boolean;
  /** Accessible label passed to the calendar grid. */
  dateLabel?: string;
};

const range = (count: number, step = 1, offset = 0) =>
  Array.from({ length: count }, (_, i) => offset + i * step);

// Scrolls the currently-selected item in a column into view, centered below
// the sticky header.
const scrollSelectedIntoView = (colRef: RefObject<HTMLDivElement | null>) => {
  const col = colRef.current;
  const el = col?.querySelector('[aria-selected="true"]') as HTMLElement | null;
  if (!col || !el) return;

  const header = col.querySelector(
    '[data-column-header]',
  ) as HTMLElement | null;
  const headerHeight = header?.offsetHeight ?? 0;
  const viewportHeight = Math.max(col.clientHeight - headerHeight, 0);

  const colRect = col.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  const elRelativeTop = elRect.top - colRect.top + col.scrollTop;

  const targetScrollTop =
    elRelativeTop - headerHeight - viewportHeight / 2 + el.clientHeight / 2;
  const maxScrollTop = col.scrollHeight - col.clientHeight;
  col.scrollTop = Math.min(Math.max(targetScrollTop, 0), maxScrollTop);
};

/**
 * Selects a date and time from a calendar and aligned time columns.
 *
 * Changes remain a draft until Apply is pressed. Cancel restores `value`, and
 * Apply is unavailable until both the date and time portions are complete.
 *
 * @example
 * ```tsx
 * <DateTimeMenu
 *   trigger={<Button>Schedule</Button>}
 *   value={scheduledAt}
 *   onChange={setScheduledAt}
 * />
 * ```
 */
export const DateTimeMenu = (props: DateTimeMenuProps) => {
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
    viewDate,
    defaultViewDate,
    onViewDateChange,
    timeFormat = '12',
    minuteStep = 1,
    disabled = false,
    dateLabel,
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

  const classes = dateTimeMenus();
  const columnClasses = timeMenus({ stretch: true });
  const resolvedTimeFormat = timeFormat;

  // Pending selection, separate from the committed `value` — only Apply
  // commits it via onChange; Cancel discards it.
  const [draftDate, setDraftDate] = useState<DateValue | null>(
    value?.date ?? null,
  );
  const [draftTime, setDraftTime] = useState<TimeValue | null>(
    value?.time ?? null,
  );

  useEffect(() => {
    if (menuOpen) {
      setDraftDate(value?.date ?? null);
      setDraftTime(value?.time ?? null);
    }
  }, [menuOpen, value]);

  const handleApply = () => {
    onChange?.(
      draftDate && draftTime ? { date: draftDate, time: draftTime } : null,
    );
    setOpenState(false);
  };

  const handleCancel = () => {
    setDraftDate(value?.date ?? null);
    setDraftTime(value?.time ?? null);
    setOpenState(false);
  };

  const displayHour =
    draftTime && resolvedTimeFormat === '12'
      ? to12Hour(draftTime.hour).hour12
      : (draftTime?.hour ?? null);
  const displayMeridiem =
    draftTime && resolvedTimeFormat === '12'
      ? to12Hour(draftTime.hour).meridiem
      : null;
  const displayMinute = draftTime?.minute ?? null;

  // Commits immediately with sensible fallback defaults for whatever hasn't
  // been picked yet, same as TimeMenu/TimeRangeMenu — matches the legacy
  // TimePicker's TimeList selection handlers.
  const emitHour = (hour: number) => {
    const hour24 =
      resolvedTimeFormat === '12'
        ? to24Hour(hour, displayMeridiem ?? 'AM')
        : hour;
    setDraftTime({ hour: hour24, minute: displayMinute ?? 0 });
  };

  const emitMinute = (minute: number) => {
    const hour24 =
      resolvedTimeFormat === '12'
        ? to24Hour(displayHour ?? 12, displayMeridiem ?? 'AM')
        : (displayHour ?? 0);
    setDraftTime({ hour: hour24, minute });
  };

  const emitMeridiem = (meridiem: Meridiem) => {
    const hour24 = to24Hour(displayHour ?? 12, meridiem);
    setDraftTime({ hour: hour24, minute: displayMinute ?? 0 });
  };

  const hourValues =
    resolvedTimeFormat === '12' ? range(12, 1, 1) : range(24, 1, 0);
  const minuteValues = getMinuteValues(minuteStep);

  const hourColRef = useRef<HTMLDivElement>(null);
  const minuteColRef = useRef<HTMLDivElement>(null);
  const meridiemColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    // Deferred a frame — FloatingFocusManager's initial focus (default
    // initialFocus=0) triggers the browser's native scroll-into-view for the
    // newly-focused first item, landing *after* this effect and clobbering a
    // synchronous scroll here. Running one frame later wins that race.
    const raf = requestAnimationFrame(() => {
      scrollSelectedIntoView(hourColRef);
      scrollSelectedIntoView(minuteColRef);
      if (resolvedTimeFormat === '12') scrollSelectedIntoView(meridiemColRef);
    });
    return () => cancelAnimationFrame(raf);
  }, [menuOpen, resolvedTimeFormat]);

  // Time columns need to match the Calendar's real rendered height, not
  // just stretch to it — a flex item's own content height still wins a
  // stretch-aligned row's auto-sizing calculation (that's the CSS flexbox
  // "hypothetical cross size" rule) regardless of min-height:0, so the
  // 60-row minute list was silently forcing the whole row (Calendar
  // included) up to its own full content height instead of the other way
  // around. Measuring the Calendar directly and applying that height
  // explicitly sidesteps the auto-sizing ambiguity entirely.
  //
  // Track the actual node rather than `isOpen`: Menu's FloatingPortal mounts
  // its content after the open state changes, so an effect keyed only on open
  // can run before Calendar exists. Updating this state from the callback ref
  // makes the observer effect run when the portal node actually attaches.
  const [calendarElement, setCalendarElement] = useState<HTMLDivElement | null>(
    null,
  );
  const timeColumnsRef = useRef<HTMLDivElement>(null);

  const setTimeColumnsHeight = useCallback((height: number) => {
    if (timeColumnsRef.current) {
      timeColumnsRef.current.style.height = `${height}px`;
    }
  }, []);

  useLayoutEffect(() => {
    if (!calendarElement) {
      setTimeColumnsHeight(0);
      return;
    }

    setTimeColumnsHeight(calendarElement.getBoundingClientRect().height);
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setTimeColumnsHeight(entry.contentRect.height);
    });
    observer.observe(calendarElement);
    return () => observer.disconnect();
  }, [calendarElement, setTimeColumnsHeight]);

  if (disabled) {
    return trigger;
  }

  return (
    <Menu
      {...dsComponent('DateTimeMenu')}
      className={className}
      {...otherProps}
      trigger={trigger}
      open={menuOpen}
      onOpenChange={setOpenState}
      placement={placement}
      closeOnSelect={false}
    >
      <Box>
        <Box className={classes.content}>
          <Calendar
            ref={setCalendarElement}
            label={dateLabel}
            value={draftDate}
            onChange={setDraftDate}
            minDate={minDate}
            maxDate={maxDate}
            viewDate={viewDate}
            defaultViewDate={defaultViewDate}
            onViewDateChange={onViewDateChange}
            disabled={disabled}
          />
          <Divider direction="vertical" weight="thick" aria-hidden="true" />
          <Box
            ref={timeColumnsRef}
            className={columnClasses.columns}
            // Starts pinned to 0 (rather than left auto/undefined) so the
            // very first, pre-measurement layout pass can't let the columns'
            // own oversized content dictate the row's height — see the
            // effect above for why that matters. Swaps to the real measured
            // value in the same pre-paint layout pass once known.
            h="0"
          >
            <Box
              ref={hourColRef}
              className={columnClasses.column}
              role="listbox"
              aria-label="Hour"
            >
              <Box data-column-header className={columnClasses.columnHeader}>
                HR
              </Box>
              <List>
                {hourValues.map((hour) => (
                  <ListItem
                    key={hour}
                    selected={displayHour === hour}
                    label={String(hour).padStart(2, '0')}
                    justifyContent="center"
                    onClick={() => emitHour(hour)}
                  />
                ))}
              </List>
            </Box>
            <Box
              ref={minuteColRef}
              className={columnClasses.column}
              role="listbox"
              aria-label="Minute"
            >
              <Box data-column-header className={columnClasses.columnHeader}>
                MIN
              </Box>
              <List>
                {minuteValues.map((minute) => (
                  <ListItem
                    key={minute}
                    selected={displayMinute === minute}
                    label={String(minute).padStart(2, '0')}
                    justifyContent="center"
                    onClick={() => emitMinute(minute)}
                  />
                ))}
              </List>
            </Box>
            {resolvedTimeFormat === '12' && (
              <Box
                ref={meridiemColRef}
                className={columnClasses.column}
                role="listbox"
                aria-label="AM or PM"
              >
                <Box data-column-header className={columnClasses.columnHeader}>
                  AM/PM
                </Box>
                <List>
                  {(['AM', 'PM'] as Meridiem[]).map((meridiem) => (
                    <ListItem
                      key={meridiem}
                      selected={displayMeridiem === meridiem}
                      label={meridiem}
                      justifyContent="center"
                      onClick={() => emitMeridiem(meridiem)}
                    />
                  ))}
                </List>
              </Box>
            )}
          </Box>
        </Box>
        <Box className={classes.footer}>
          <Button variant="standard" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!draftDate || !draftTime}
            onClick={handleApply}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Menu>
  );
};
