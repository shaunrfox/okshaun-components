// biome-ignore-all lint/a11y/useSemanticElements: the calendar and time grids are built from Button and Box, not table markup, so the roles are applied explicitly
import { timeMenus } from '@styled-system/recipes';
import { type RefObject, useEffect, useRef } from 'react';

import { Box } from '~/components/Box';
import { List, ListItem } from '~/components/List';
import { Menu, type MenuProps } from '~/components/Menu';
import { useControllableState } from '~/system/hooks/useControllableState';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import { getMinuteValues, to12Hour, to24Hour } from '../helpers/dateTimeUtils';

import type { Meridiem, TimeFormat, TimeValue } from '../helpers/types';

/** Props for {@link TimeMenu}, including selected time and display cycle. */
export type TimeMenuProps = Omit<
  MenuProps,
  'children' | 'onChange' | 'value'
> & {
  /** Selected 24-hour time reflected in the menu columns. */
  value?: TimeValue | null;
  /** Runs immediately when an hour, minute, or meridiem choice is selected. */
  onChange?: (value: TimeValue | null) => void;
  /**
   * Display cycle; emitted values always use 24-hour hours.
   *
   * @default '12'
   */
  timeFormat?: TimeFormat;
  /**
   * Interval used to generate minute choices.
   *
   * @default 1
   */
  minuteStep?: number;
  /** Prevents opening or selection and returns only the trigger. */
  disabled?: boolean;
};

const range = (count: number, step = 1, offset = 0) =>
  Array.from({ length: count }, (_, i) => offset + i * step);

// Scrolls the currently-selected item in a column into view, centered below
// the sticky header, the moment the menu opens — matches the legacy
// TimePicker's TimeList behavior so long lists don't always open at the top.
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
 * Presents hour, minute, and optional meridiem selection columns in a Menu.
 *
 * Each selection commits immediately while the menu remains open. Supply a
 * `trigger`, or set inherited `inline` to render the columns in normal flow.
 *
 * @example
 * ```tsx
 * <TimeMenu trigger={<Button>Choose time</Button>} onChange={setTime} />
 * ```
 */
export const TimeMenu = (props: TimeMenuProps) => {
  const {
    trigger,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    placement = 'bottom-start',
    value,
    onChange,
    timeFormat = '12',
    minuteStep = 1,
    disabled = false,
    ...rest
  } = props;
  const isInline = rest.inline === true;
  const [className, otherProps] = splitProps(rest);

  // Tracked locally (even though TimeMenu itself never needs to force-close,
  // unlike the range/DateTime menus) so the scroll-into-view effect below can
  // detect "just opened" in the uncontrolled case too, where Menu manages its
  // own internal open state that isn't otherwise visible to this component.
  const [isOpen, setOpenState] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const menuOpen = isInline ? true : isOpen;

  const classes = timeMenus();
  const resolvedTimeFormat = timeFormat;

  const displayHour =
    value && resolvedTimeFormat === '12'
      ? to12Hour(value.hour).hour12
      : (value?.hour ?? null);
  const displayMeridiem =
    value && resolvedTimeFormat === '12' ? to12Hour(value.hour).meridiem : null;
  const displayMinute = value?.minute ?? null;

  // Commits immediately with sensible fallback defaults for whatever hasn't
  // been picked yet (hour → 12/0, minute → current or 0, meridiem → current
  // or AM), so a single click always produces a valid time instead of requiring
  // all three pieces to be set first.
  const emitHour = (hour: number) => {
    const hour24 =
      resolvedTimeFormat === '12'
        ? to24Hour(hour, displayMeridiem ?? 'AM')
        : hour;
    onChange?.({ hour: hour24, minute: displayMinute ?? 0 });
  };

  const emitMinute = (minute: number) => {
    const hour24 =
      resolvedTimeFormat === '12'
        ? to24Hour(displayHour ?? 12, displayMeridiem ?? 'AM')
        : (displayHour ?? 0);
    onChange?.({ hour: hour24, minute });
  };

  const emitMeridiem = (meridiem: Meridiem) => {
    const hour24 = to24Hour(displayHour ?? 12, meridiem);
    onChange?.({ hour: hour24, minute: displayMinute ?? 0 });
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
    // initialFocus=0, landing on the first column item) triggers the
    // browser's native scroll-into-view for the newly-focused element,
    // which lands *after* this effect and clobbers a synchronous scroll
    // here back to showing item 1. Running one frame later wins that race.
    const raf = requestAnimationFrame(() => {
      scrollSelectedIntoView(hourColRef);
      scrollSelectedIntoView(minuteColRef);
      if (resolvedTimeFormat === '12') scrollSelectedIntoView(meridiemColRef);
    });
    return () => cancelAnimationFrame(raf);
  }, [menuOpen, resolvedTimeFormat]);

  if (disabled) {
    return trigger;
  }

  return (
    <Menu
      {...dsComponent('TimeMenu')}
      className={className}
      {...otherProps}
      trigger={trigger}
      open={menuOpen}
      onOpenChange={setOpenState}
      placement={placement}
      closeOnSelect={false}
    >
      <Box className={classes.columns}>
        <Box
          ref={hourColRef}
          className={classes.column}
          role="listbox"
          aria-label="Hour"
        >
          <Box data-column-header className={classes.columnHeader}>
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
          className={classes.column}
          role="listbox"
          aria-label="Minute"
        >
          <Box data-column-header className={classes.columnHeader}>
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
            className={classes.column}
            role="listbox"
            aria-label="AM or PM"
          >
            <Box data-column-header className={classes.columnHeader}>
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
    </Menu>
  );
};
