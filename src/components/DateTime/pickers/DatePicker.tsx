import type { Placement } from '@floating-ui/react';
import { useControllableState } from '~/system/hooks/useControllableState';
import type { DateValue } from '../helpers/types';
import { DateInput, type DateInputProps } from '../inputs/DateInput';
import { DateMenu } from '../menus/DateMenu';

type ViewDate = { year: number; month: number };

/** Props for {@link DatePicker}, combining a segmented input and calendar menu. */
export type DatePickerProps = Pick<
  DateInputProps,
  | 'id'
  | 'label'
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
  /** Controlled selected date. Pair with `onChange`. */
  value?: DateValue | null;
  /** Initial selected date when `value` is not provided. */
  defaultValue?: DateValue | null;
  /** Runs when typing or calendar selection commits a date. */
  onChange?: (value: DateValue | null) => void;
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

/**
 * Combines keyboard date entry with a calendar selection menu.
 *
 * Focusing the segmented input opens the menu. Typed dates and calendar
 * selections update the same controlled or uncontrolled value.
 *
 * @example
 * ```tsx
 * <DatePicker label="Due date" value={date} onChange={setDate} />
 * ```
 */
export const DatePicker = (props: DatePickerProps) => {
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
    dateFormat,
    size,
    value,
    defaultValue,
    onChange,
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

  // The picker owns the committed value so both the typed segmented field
  // and the calendar's day-click write to the same place — DateInput commits
  // immediately per keystroke, DateMenu commits immediately on day select.
  const [currentValue, emitChange] = useControllableState<DateValue | null>({
    value,
    defaultValue: defaultValue ?? null,
    onChange,
  });

  return (
    <DateMenu
      trigger={
        <DateInput
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
      value={currentValue}
      onChange={emitChange}
      minDate={minDate}
      maxDate={maxDate}
      viewDate={viewDate}
      defaultViewDate={defaultViewDate}
      onViewDateChange={onViewDateChange}
      disabled={disabled}
      label={label}
    />
  );
};
