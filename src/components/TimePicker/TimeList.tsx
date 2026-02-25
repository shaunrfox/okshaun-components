import type { timePicker } from '@styled-system/recipes';
import type React from 'react';
import { useEffect, useRef } from 'react';
import { Box } from '~/components/Box';
import { MenuListItem } from '~/components/Menu';

export interface TimeValue {
  hour: number; // always 24h (0–23)
  minute: number;
}

export type HourCycle = '12' | '24';

export interface TimeListProps {
  selectedHour: number | null;     // display hour: 1–12 for 12h, 0–23 for 24h
  selectedMinute: number | null;
  selectedMeridiem: 'AM' | 'PM' | null;
  onSelect: (time: TimeValue) => void;
  hourCycle: HourCycle;
  minuteStep: number;
  classes: ReturnType<typeof timePicker>;
}

// ─── 12h conversion ────────────────────────────────────────────────────────────

function from12h(displayHour: number, meridiem: 'AM' | 'PM'): number {
  if (meridiem === 'AM') return displayHour === 12 ? 0 : displayHour;
  return displayHour === 12 ? 12 : displayHour + 12;
}

// ─── TimeList ──────────────────────────────────────────────────────────────────

export const TimeList: React.FC<TimeListProps> = ({
  selectedHour,
  selectedMinute,
  selectedMeridiem,
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

  // Refs for scroll-into-view
  const hourColRef = useRef<HTMLDivElement>(null);
  const minuteColRef = useRef<HTMLDivElement>(null);
  const meridiemColRef = useRef<HTMLDivElement>(null);

  // Scroll selected items into view when popover opens
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional empty deps — scroll once on mount when popover opens
  useEffect(() => {
    const scrollToSelected = (colRef: React.RefObject<HTMLDivElement | null>, selector: string) => {
      const col = colRef.current;
      const el = col?.querySelector(selector) as HTMLElement | null;
      if (!col || !el) return;
      const colRect = col.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      // el's offset from col's top in the scrollable content
      const elRelativeTop = elRect.top - colRect.top + col.scrollTop;
      // Center the selected item vertically in the column
      col.scrollTop = elRelativeTop - col.clientHeight / 2 + el.clientHeight / 2;
    };
    scrollToSelected(hourColRef, '[aria-selected="true"]');
    scrollToSelected(minuteColRef, '[aria-selected="true"]');
    if (is12h) scrollToSelected(meridiemColRef, '[aria-selected="true"]');
  }, []); // run once on mount (popover just opened)

  // ── Selection handlers ────────────────────────────────────────────────────

  const handleHourSelect = (displayHour: number) => {
    const hour = is12h ? from12h(displayHour, selectedMeridiem ?? 'AM') : displayHour;
    onSelect({ hour, minute: selectedMinute ?? 0 });
  };

  const handleMinuteSelect = (minute: number) => {
    const hour = is12h
      ? from12h(selectedHour ?? 12, selectedMeridiem ?? 'AM')
      : selectedHour ?? 0;
    onSelect({ hour, minute });
  };

  const handleMeridiemSelect = (meridiem: 'AM' | 'PM') => {
    const hour = from12h(selectedHour ?? 12, meridiem);
    onSelect({ hour, minute: selectedMinute ?? 0 });
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
      {items.map(item => (
        <MenuListItem
          key={String(item)}
          label={formatItem(item)}
          selected={item === selectedItem}
          type="action"
          justifyContent="center"
          onClick={() => onItemSelect(item)}
        />
      ))}
    </Box>
  );

  const pad2 = (n: number) => String(n).padStart(2, '0');

  return (
    <>
      {renderColumn(
        hourColRef,
        'Hr',
        hours,
        selectedHour,
        handleHourSelect,
        pad2,
        'Hour',
      )}
      {renderColumn(
        minuteColRef,
        'Min',
        minutes,
        selectedMinute,
        handleMinuteSelect,
        pad2,
        'Minute',
      )}
      {is12h &&
        renderColumn(
          meridiemColRef,
          '',
          meridiems,
          selectedMeridiem,
          handleMeridiemSelect,
          (m: string) => m,
          'AM or PM',
        )}
    </>
  );
};
