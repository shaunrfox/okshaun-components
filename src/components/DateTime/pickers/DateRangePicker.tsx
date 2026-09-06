import type { Placement } from '@floating-ui/react';
import { useControllableState } from '~/system/hooks/useControllableState';
import type { DateRangeValue, DateValue } from '../helpers/types';
import {
  DateRangeInput,
  type DateRangeInputProps,
} from '../inputs/DateRangeInput';
import { DateRangeMenu } from '../menus/DateRangeMenu';

/** Props for {@link DateRangePicker}, combining range input and calendar menu. */
export type DateRangePickerProps = Pick<
  DateRangeInputProps,
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
  | 'dateFormat'
  | 'size'
> & {
  /** Controlled start and end dates. Pair with `onChange`. */
  value?: DateRangeValue | null;
  /** Initial range when `value` is not provided. */
  defaultValue?: DateRangeValue | null;
  /** Runs for typed endpoint changes and applied calendar drafts. */
  onChange?: (value: DateRangeValue | null) => void;
  /** Earliest selectable date for both calendars. */
  minDate?: DateValue;
  /** Latest selectable date for both calendars. */
  maxDate?: DateValue;
  /** Floating UI placement of the calendar menu. */
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

const EMPTY_RANGE: DateRangeValue = { start: null, end: null };

/**
 * Combines segmented range entry with a two-calendar selection menu.
 *
 * Typed endpoints commit immediately. Calendar choices remain a draft until
 * Apply is pressed; Cancel restores the currently committed range.
 *
 * @example
 * ```tsx
 * <DateRangePicker startLabel="Arrival" endLabel="Departure" />
 * ```
 */
export const DateRangePicker = (props: DateRangePickerProps) => {
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
    dateFormat,
    size,
    value,
    defaultValue,
    onChange,
    minDate,
    maxDate,
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

  // The picker owns the committed range — DateRangeInput commits immediately
  // per typed endpoint, DateRangeMenu only commits (via its own Cancel/Apply
  // draft) when Apply is pressed. Both write to the same place.
  const [currentValue, emitChange] =
    useControllableState<DateRangeValue | null>({
      value,
      defaultValue: defaultValue ?? null,
      onChange,
    });
  const resolvedValue = currentValue ?? EMPTY_RANGE;

  return (
    <DateRangeMenu
      trigger={
        <DateRangeInput
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
          dateFormat={dateFormat}
          size={size}
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
      disabled={disabled}
      startLabel={startLabel}
      endLabel={endLabel}
    />
  );
};
