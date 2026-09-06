import type { Placement } from '@floating-ui/react';
import { useControllableState } from '~/system/hooks/useControllableState';
import type { TimeRangeValue } from '../helpers/types';
import {
  TimeRangeInput,
  type TimeRangeInputProps,
} from '../inputs/TimeRangeInput';
import { TimeRangeMenu } from '../menus/TimeRangeMenu';

/** Props for {@link TimeRangePicker}, combining range input and time menu. */
export type TimeRangePickerProps = Pick<
  TimeRangeInputProps,
  | 'id'
  | 'startLabel'
  | 'endLabel'
  | 'before'
  | 'after'
  | 'iconBefore'
  | 'iconAfter'
  | 'error'
  | 'disabled'
  | 'invalid'
  | 'timeFormat'
  | 'size'
> & {
  /** Controlled start and end times. Pair with `onChange`. */
  value?: TimeRangeValue | null;
  /** Initial time range when `value` is not provided. */
  defaultValue?: TimeRangeValue | null;
  /** Runs for typed endpoint changes and applied menu drafts. */
  onChange?: (value: TimeRangeValue | null) => void;
  /** Minute interval used by segmented stepping and menu choices. */
  minuteStep?: number;
  /** Floating UI placement of the time menu. */
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

const EMPTY_RANGE: TimeRangeValue = { start: null, end: null };

/**
 * Combines segmented range entry with start and end time-selection columns.
 *
 * Typed endpoints commit immediately. Menu choices remain a draft until Apply
 * is pressed; Cancel restores the currently committed range.
 *
 * @example
 * ```tsx
 * <TimeRangePicker startLabel="Opens" endLabel="Closes" />
 * ```
 */
export const TimeRangePicker = (props: TimeRangePickerProps) => {
  const {
    id,
    startLabel,
    endLabel,
    before,
    after,
    iconBefore,
    iconAfter,
    error,
    disabled,
    invalid,
    size,
    value,
    defaultValue,
    onChange,
    timeFormat,
    minuteStep,
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

  const [currentValue, emitChange] =
    useControllableState<TimeRangeValue | null>({
      value,
      defaultValue: defaultValue ?? null,
      onChange,
    });
  const resolvedValue = currentValue ?? EMPTY_RANGE;

  return (
    <TimeRangeMenu
      trigger={
        <TimeRangeInput
          id={id}
          value={resolvedValue}
          onChange={emitChange}
          startLabel={startLabel}
          endLabel={endLabel}
          before={before}
          after={after}
          iconBefore={iconBefore}
          iconAfter={iconAfter}
          error={error}
          disabled={disabled}
          invalid={invalid}
          size={size}
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
      timeFormat={timeFormat}
      minuteStep={minuteStep}
      disabled={disabled}
      startLabel={startLabel}
      endLabel={endLabel}
    />
  );
};
