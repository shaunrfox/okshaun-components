import type { Placement } from '@floating-ui/react';
import { useControllableState } from '~/system/hooks/useControllableState';
import type { TimeValue } from '../helpers/types';
import { TimeInput, type TimeInputProps } from '../inputs/TimeInput';
import { TimeMenu } from '../menus/TimeMenu';

/** Props for {@link TimePicker}, combining segmented entry and a time menu. */
export type TimePickerProps = Pick<
  TimeInputProps,
  | 'id'
  | 'label'
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
  /** Controlled 24-hour time value. Pair with `onChange`. */
  value?: TimeValue | null;
  /** Initial time when `value` is not provided. */
  defaultValue?: TimeValue | null;
  /** Runs when typing or menu selection commits a time. */
  onChange?: (value: TimeValue | null) => void;
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

/**
 * Combines keyboard time entry with hour and minute selection columns.
 *
 * Focusing the segmented input opens the menu. Input and menu interactions
 * update the same value, normalized to 24-hour hours.
 *
 * @example
 * ```tsx
 * <TimePicker label="Start time" value={time} onChange={setTime} />
 * ```
 */
export const TimePicker = (props: TimePickerProps) => {
  const {
    id,
    label,
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

  const [currentValue, emitChange] = useControllableState<TimeValue | null>({
    value,
    defaultValue: defaultValue ?? null,
    onChange,
  });

  return (
    <TimeMenu
      trigger={
        <TimeInput
          id={id}
          value={currentValue}
          onChange={emitChange}
          label={label}
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
      value={currentValue}
      onChange={emitChange}
      timeFormat={timeFormat}
      minuteStep={minuteStep}
      disabled={disabled}
    />
  );
};
