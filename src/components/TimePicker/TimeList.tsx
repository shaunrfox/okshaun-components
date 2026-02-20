import type { timePicker } from '@styled-system/recipes';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { Box } from '~/components/Box';

export interface TimeValue {
  hour: number; // always 24h (0–23)
  minute: number;
}

export type HourCycle = '12' | '24';

export interface TimeListProps {
  value: TimeValue | null;
  onSelect: (time: TimeValue) => void;
  hourCycle: HourCycle;
  minuteStep: number;
  classes: ReturnType<typeof timePicker>;
}

// ─── 12h conversion ────────────────────────────────────────────────────────────

function to12h(hour: number): { displayHour: number; meridiem: 'AM' | 'PM' } {
  if (hour === 0) return { displayHour: 12, meridiem: 'AM' };
  if (hour < 12) return { displayHour: hour, meridiem: 'AM' };
  if (hour === 12) return { displayHour: 12, meridiem: 'PM' };
  return { displayHour: hour - 12, meridiem: 'PM' };
}

function from12h(displayHour: number, meridiem: 'AM' | 'PM'): number {
  if (meridiem === 'AM') return displayHour === 12 ? 0 : displayHour;
  return displayHour === 12 ? 12 : displayHour + 12;
}

// ─── TimeList ──────────────────────────────────────────────────────────────────

export const TimeList: React.FC<TimeListProps> = ({
  value,
  onSelect,
  hourCycle,
  minuteStep,
  classes,
}) => {
  const is12h = hourCycle === '12';

  // Generate hour options
  const hours = is12h
    ? Array.from({ length: 12 }, (_, i) => i + 1) // 1–12
    : Array.from({ length: 24 }, (_, i) => i); // 0–23

  // Generate minute options
  const minutes: number[] = [];
  for (let m = 0; m < 60; m += minuteStep) minutes.push(m);

  const meridiems: Array<'AM' | 'PM'> = ['AM', 'PM'];

  // Determine currently selected display values
  const currentMeridiem = value ? to12h(value.hour).meridiem : null;
  const currentDisplayHour = value
    ? is12h
      ? to12h(value.hour).displayHour
      : value.hour
    : null;
  const currentMinute = value?.minute ?? null;

  // Refs for scroll-into-view
  const hourColRef = useRef<HTMLDivElement>(null);
  const minuteColRef = useRef<HTMLDivElement>(null);
  const meridiemColRef = useRef<HTMLDivElement>(null);

  // Scroll selected items into view when popover opens
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional empty deps — scroll once on mount when popover opens
  useEffect(() => {
    const scrollToSelected = (colRef: React.RefObject<HTMLDivElement | null>, selector: string) => {
      const el = colRef.current?.querySelector(selector) as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    };
    scrollToSelected(hourColRef, '[aria-selected="true"]');
    scrollToSelected(minuteColRef, '[aria-selected="true"]');
    if (is12h) scrollToSelected(meridiemColRef, '[aria-selected="true"]');
  }, []); // run once on mount (popover just opened)

  // ── Selection handlers ────────────────────────────────────────────────────

  const handleHourSelect = (displayHour: number) => {
    const hour = is12h
      ? from12h(displayHour, currentMeridiem ?? 'AM')
      : displayHour;
    onSelect({ hour, minute: currentMinute ?? 0 });
  };

  const handleMinuteSelect = (minute: number) => {
    const hour = is12h
      ? from12h(currentDisplayHour ?? 12, currentMeridiem ?? 'AM')
      : currentDisplayHour ?? 0;
    onSelect({ hour, minute });
  };

  const handleMeridiemSelect = (meridiem: 'AM' | 'PM') => {
    const hour = from12h(currentDisplayHour ?? 12, meridiem);
    onSelect({ hour, minute: currentMinute ?? 0 });
  };

  // ── Column renderer ────────────────────────────────────────────────────────

  const renderColumn = <T extends string | number>(
    colRef: React.RefObject<HTMLDivElement | null>,
    label: string,
    items: T[],
    selectedItem: T | null,
    onItemSelect: (item: T) => void,
    formatItem: (item: T) => string,
    ariaLabel: string,
  ) => (
    <Box
      ref={colRef}
      className={classes.column}
      role="listbox"
      aria-label={ariaLabel}
      aria-orientation="vertical"
    >
      <Box className={classes.columnLabel}>{label}</Box>
      {items.map(item => {
        const isSelected = item === selectedItem;
        return (
          <Box
            key={String(item)}
            as="button"
            type="button"
            role="option"
            aria-selected={isSelected}
            tabIndex={isSelected ? 0 : -1}
            className={classes.listItem}
            onClick={() => onItemSelect(item)}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onItemSelect(item);
              }
            }}
          >
            {formatItem(item)}
          </Box>
        );
      })}
    </Box>
  );

  const pad2 = (n: number) => String(n).padStart(2, '0');

  return (
    <>
      {renderColumn(
        hourColRef,
        is12h ? 'Hr' : 'Hr',
        hours,
        currentDisplayHour,
        handleHourSelect,
        pad2,
        'Hour',
      )}
      {renderColumn(
        minuteColRef,
        'Min',
        minutes,
        currentMinute,
        handleMinuteSelect,
        pad2,
        'Minute',
      )}
      {is12h &&
        renderColumn(
          meridiemColRef,
          '',
          meridiems,
          currentMeridiem,
          handleMeridiemSelect,
          (m: string) => m,
          'AM or PM',
        )}
    </>
  );
};
