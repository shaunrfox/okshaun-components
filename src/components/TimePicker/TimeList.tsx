import type { timePicker } from '@styled-system/recipes';
import { type RefObject, useEffect, useRef } from 'react';

import { Box } from '~/components/Box';
import { List, ListItem } from '~/components/List';

export interface TimeValue {
  hour: number; // always 24h (0–23)
  minute: number;
}

export type HourCycle = '12' | '24';

export interface TimeListProps {
  selectedHour: number | null; // display hour: 1–12 for 12h, 0–23 for 24h
  selectedMinute: number | null;
  selectedMeridiem: 'AM' | 'PM' | null;
  onSelect: (time: TimeValue) => void;
  hourCycle: HourCycle;
  minuteStep: number;
  classes: ReturnType<typeof timePicker>;
}

type TimeListColumnProps<T extends string | number> = {
  colRef: RefObject<HTMLDivElement | null>;
  label: string;
  items: T[];
  selectedItem: T | null;
  onItemSelect: (item: T) => void;
  formatItem: (item: T) => string;
  ariaLabel: string;
  classes: ReturnType<typeof timePicker>;
};

const TimeListColumn = <T extends string | number>({
  colRef,
  label,
  items,
  selectedItem,
  onItemSelect,
  formatItem,
  ariaLabel,
  classes,
}: TimeListColumnProps<T>) => {
  return (
    <Box
      ref={colRef}
      className={classes.column}
      role="listbox"
      aria-label={ariaLabel}
      aria-orientation="vertical"
    >
      <Box className={classes.columnLabel} data-time-list-label="true">
        {label}
      </Box>
      <List>
        {items.map((item) => (
          <ListItem
            key={String(item)}
            selected={item === selectedItem}
            onClick={() => onItemSelect(item)}
            label={formatItem(item)}
            justifyContent="center"
          />
        ))}
      </List>
    </Box>
  );
};

// ─── 12h conversion ────────────────────────────────────────────────────────────

function from12h(displayHour: number, meridiem: 'AM' | 'PM'): number {
  if (meridiem === 'AM') return displayHour === 12 ? 0 : displayHour;
  return displayHour === 12 ? 12 : displayHour + 12;
}

// ─── TimeList ──────────────────────────────────────────────────────────────────

export const TimeList = (props: TimeListProps) => {
  const {
    selectedHour,
    selectedMinute,
    selectedMeridiem,
    onSelect,
    hourCycle,
    minuteStep,
    classes,
  } = props;

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
  useEffect(() => {
    const scrollToSelected = (
      colRef: RefObject<HTMLDivElement | null>,
      selector: string,
    ) => {
      const col = colRef.current;
      const el = col?.querySelector(selector) as HTMLElement | null;
      if (!col || !el) return;

      const label = col.querySelector(
        '[data-time-list-label="true"]',
      ) as HTMLElement | null;
      const labelHeight = label?.offsetHeight ?? 0;
      col.style.scrollPaddingTop = `${labelHeight}px`;
      const viewportHeight = Math.max(col.clientHeight - labelHeight, 0);

      const colRect = col.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      // el's offset from col's top in the scrollable content
      const elRelativeTop = elRect.top - colRect.top + col.scrollTop;

      // Center the selected item within the scrollable area below the sticky label
      const targetScrollTop =
        elRelativeTop - labelHeight - viewportHeight / 2 + el.clientHeight / 2;
      const maxScrollTop = col.scrollHeight - col.clientHeight;
      col.scrollTop = Math.min(Math.max(targetScrollTop, 0), maxScrollTop);
    };
    scrollToSelected(hourColRef, '[aria-selected="true"]');
    scrollToSelected(minuteColRef, '[aria-selected="true"]');
    if (is12h) scrollToSelected(meridiemColRef, '[aria-selected="true"]');
  }, [is12h]); // run once on mount (popover just opened)

  // ── Selection handlers ────────────────────────────────────────────────────

  const handleHourSelect = (displayHour: number) => {
    const hour = is12h
      ? from12h(displayHour, selectedMeridiem ?? 'AM')
      : displayHour;
    onSelect({ hour, minute: selectedMinute ?? 0 });
  };

  const handleMinuteSelect = (minute: number) => {
    const hour = is12h
      ? from12h(selectedHour ?? 12, selectedMeridiem ?? 'AM')
      : (selectedHour ?? 0);
    onSelect({ hour, minute });
  };

  const handleMeridiemSelect = (meridiem: 'AM' | 'PM') => {
    const hour = from12h(selectedHour ?? 12, meridiem);
    onSelect({ hour, minute: selectedMinute ?? 0 });
  };

  const pad2 = (n: number) => String(n).padStart(2, '0');

  return (
    <>
      <TimeListColumn
        colRef={hourColRef}
        label="Hr"
        items={hours}
        selectedItem={selectedHour}
        onItemSelect={handleHourSelect}
        formatItem={pad2}
        ariaLabel="Hour"
        classes={classes}
      />
      <TimeListColumn
        colRef={minuteColRef}
        label="Min"
        items={minutes}
        selectedItem={selectedMinute}
        onItemSelect={handleMinuteSelect}
        formatItem={pad2}
        ariaLabel="Minute"
        classes={classes}
      />
      {is12h && (
        <TimeListColumn
          colRef={meridiemColRef}
          label="AM/PM"
          items={meridiems}
          selectedItem={selectedMeridiem}
          onItemSelect={handleMeridiemSelect}
          formatItem={(meridiem) => meridiem}
          ariaLabel="AM or PM"
          classes={classes}
        />
      )}
    </>
  );
};
