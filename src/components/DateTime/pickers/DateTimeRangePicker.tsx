import type { Placement } from '@floating-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Box } from '~/components/Box';
import { useControllableState } from '~/system/hooks/useControllableState';

import type {
  DateTimeRangeValue,
  DateTimeValue,
  DateValue,
} from '../helpers/types';
import type { DateTimeInputProps } from '../inputs/DateTimeInput';
import { DateTimePicker } from './DateTimePicker';

// Per the recommended file shape there is no unified DateTimeRangeInput —
// this composes two independent DateTimePicker instances + a separator,
// matching the Figma wrapping-behavior frame (296-6020): full width shows
// both fields side by side with a dash between them; below that they stack
// vertically with no separator; each field's own minW (216px, from
// segmentedFields.ts) is what makes the narrowest stacked state work.
const WRAP_BREAKPOINT = 458;

/** Props for {@link DateTimeRangePicker}, which coordinates two pickers. */
export type DateTimeRangePickerProps = Pick<
  DateTimeInputProps,
  | 'before'
  | 'after'
  | 'iconBefore'
  | 'iconAfter'
  | 'error'
  | 'disabled'
  | 'invalid'
  | 'dateFormat'
  | 'timeFormat'
  | 'size'
> & {
  /** Controlled start and end date-times. Pair with `onChange`. */
  value?: DateTimeRangeValue | null;
  /** Initial range when `value` is not provided. */
  defaultValue?: DateTimeRangeValue | null;
  /** Runs whenever either endpoint commits a new value. */
  onChange?: (value: DateTimeRangeValue | null) => void;
  /** Minute interval shared by both endpoint pickers. */
  minuteStep?: number;
  /** Earliest selectable date for both endpoints. */
  minDate?: DateValue;
  /** Latest selectable date for both endpoints. */
  maxDate?: DateValue;
  /** Accessible date label for the start picker. */
  startDateLabel?: string;
  /** Accessible time label for the start picker. */
  startTimeLabel?: string;
  /** Accessible date label for the end picker. */
  endDateLabel?: string;
  /** Accessible time label for the end picker. */
  endTimeLabel?: string;
  /** Floating UI placement shared by both endpoint menus. */
  placement?: Placement;
};

const EMPTY_RANGE: DateTimeRangeValue = { start: null, end: null };

/**
 * Coordinates independent start and end `DateTimePicker` controls.
 *
 * The controls render side by side when space allows and stack at narrow
 * widths. Each endpoint has its own menu and commits independently.
 *
 * @example
 * ```tsx
 * <DateTimeRangePicker
 *   startDateLabel="Starts on"
 *   startTimeLabel="Starts at"
 *   endDateLabel="Ends on"
 *   endTimeLabel="Ends at"
 * />
 * ```
 */
export const DateTimeRangePicker = (props: DateTimeRangePickerProps) => {
  const {
    before,
    after,
    iconBefore,
    iconAfter,
    error,
    disabled,
    invalid,
    dateFormat,
    size,
    value,
    defaultValue,
    onChange,
    timeFormat,
    minuteStep,
    minDate,
    maxDate,
    startDateLabel = 'Start date',
    startTimeLabel = 'Start time',
    endDateLabel = 'End date',
    endTimeLabel = 'End time',
    placement,
  } = props;

  const [currentValue, setCurrentValue] =
    useControllableState<DateTimeRangeValue | null>({
      value,
      defaultValue: defaultValue ?? null,
      onChange,
    });
  const resolvedValue = currentValue ?? EMPTY_RANGE;

  const emitChange = (
    nextStart: DateTimeValue | null,
    nextEnd: DateTimeValue | null,
  ) => {
    const next =
      nextStart === null && nextEnd === null
        ? null
        : { start: nextStart, end: nextEnd };
    setCurrentValue(next);
  };

  // Measures the container so the separator can be hidden below the full
  // side-by-side width rather than leaving a dangling dash on its own
  // wrapped row — the 458px breakpoint itself is inferred from Figma, not
  // explicitly confirmed (see Cetec-DateTime-Picker-Refactor.md).
  const containerRef = useRef<HTMLDivElement>(null);
  const [isStacked, setIsStacked] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setIsStacked(entry.contentRect.width < WRAP_BREAKPOINT);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={containerRef}
      display="flex"
      flexDirection={isStacked ? 'column' : 'row'}
      alignItems={isStacked ? 'stretch' : 'center'}
      gap="8"
      width="full"
    >
      <Box flex="1" minW="216">
        <DateTimePicker
          dateLabel={startDateLabel}
          timeLabel={startTimeLabel}
          before={before}
          after={after}
          iconBefore={iconBefore}
          iconAfter={iconAfter}
          error={error}
          disabled={disabled}
          invalid={invalid}
          size={size}
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          minuteStep={minuteStep}
          minDate={minDate}
          maxDate={maxDate}
          value={resolvedValue.start}
          onChange={(next) => emitChange(next, resolvedValue.end)}
          placement={placement}
        />
      </Box>
      {!isStacked && (
        <Box as="span" aria-hidden="true" color="text.placeholder" flex="none">
          –
        </Box>
      )}
      <Box flex="1" minW="216">
        <DateTimePicker
          dateLabel={endDateLabel}
          timeLabel={endTimeLabel}
          before={before}
          after={after}
          iconBefore={iconBefore}
          iconAfter={iconAfter}
          error={error}
          disabled={disabled}
          invalid={invalid}
          size={size}
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          minuteStep={minuteStep}
          minDate={minDate}
          maxDate={maxDate}
          value={resolvedValue.end}
          onChange={(next) => emitChange(resolvedValue.start, next)}
          placement={placement}
        />
      </Box>
    </Box>
  );
};
