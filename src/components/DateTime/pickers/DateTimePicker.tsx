import type { Placement } from '@floating-ui/react';
import { useControllableState } from '~/system/hooks/useControllableState';
import type { DateTimeValue, DateValue } from '../helpers/types';
import {
  DateTimeInput,
  type DateTimeInputProps,
} from '../inputs/DateTimeInput';
import { DateTimeMenu } from '../menus/DateTimeMenu';

type ViewDate = { year: number; month: number };

/** Props for {@link DateTimePicker}, combining segmented entry and menu. */
export type DateTimePickerProps = Pick<
  DateTimeInputProps,
  | 'id'
  | 'dateLabel'
  | 'timeLabel'
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
  /** Controlled combined date and time. Pair with `onChange`. */
  value?: DateTimeValue | null;
  /** Initial combined value when `value` is not provided. */
  defaultValue?: DateTimeValue | null;
  /** Runs for typed changes and applied menu drafts. */
  onChange?: (value: DateTimeValue | null) => void;
  /** Minute interval used by segmented stepping and menu choices. */
  minuteStep?: number;
  /** Earliest selectable calendar date. */
  minDate?: DateValue;
  /** Latest selectable calendar date. */
  maxDate?: DateValue;
  /** Controlled visible calendar month. */
  viewDate?: ViewDate;
  /** Initial visible month when `viewDate` is not provided. */
  defaultViewDate?: ViewDate;
  /** Runs when calendar navigation requests a new visible month. */
  onViewDateChange?: (viewDate: ViewDate) => void;
  /** Floating UI placement of the date-time menu. */
  placement?: Placement;
  /** Controlled menu visibility. Pair with `onOpenChange`. */
  open?: boolean;
  /**
   * Initial menu visibility when `open` is not provided.
   *
   * @default false
   */
  defaultOpen?: boolean;
  /** Runs when interaction requests that the menu open or close. */
  onOpenChange?: (open: boolean) => void;
};

const EMPTY_VALUE: DateTimeValue = { date: null, time: null };

/**
 * Combines segmented date-time entry with a calendar and time menu.
 *
 * Typed portions commit immediately. Menu choices remain a draft until Apply
 * is pressed; Cancel restores the currently committed value.
 *
 * @example
 * ```tsx
 * <DateTimePicker dateLabel="Due date" timeLabel="Due time" />
 * ```
 */
export const DateTimePicker = (props: DateTimePickerProps) => {
  const {
    id,
    dateLabel,
    timeLabel,
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
    viewDate,
    defaultViewDate,
    onViewDateChange,
    placement,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
  } = props;

  const [isOpen, setOpenState] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const openMenu = () => {
    if (!isOpen) {
      setOpenState(true);
    }
  };

  // DateTimeInput commits immediately per typed segment; DateTimeMenu only
  // commits (via its own Cancel/Apply draft) when Apply is pressed. Both
  // write to the same place.
  const [currentValue, emitChange] = useControllableState<DateTimeValue | null>(
    {
      value,
      defaultValue: defaultValue ?? null,
      onChange,
    },
  );
  const resolvedValue = currentValue ?? EMPTY_VALUE;

  return (
    <DateTimeMenu
      trigger={
        <DateTimeInput
          id={id}
          value={resolvedValue}
          onChange={emitChange}
          dateLabel={dateLabel}
          timeLabel={timeLabel}
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
          open={isOpen}
          onFocusWithin={openMenu}
        />
      }
      open={isOpen}
      onOpenChange={setOpenState}
      triggerInteraction="focus"
      placement={placement}
      value={resolvedValue}
      onChange={emitChange}
      minDate={minDate}
      maxDate={maxDate}
      viewDate={viewDate}
      defaultViewDate={defaultViewDate}
      onViewDateChange={onViewDateChange}
      timeFormat={timeFormat}
      minuteStep={minuteStep}
      disabled={disabled}
      dateLabel={dateLabel}
    />
  );
};
