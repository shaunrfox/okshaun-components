import { cx } from '@styled-system/css';
import {
  type SegmentedFieldsVariantProps,
  segmentedFields,
  segmentedInputs,
} from '@styled-system/recipes';
import { type ReactNode, useEffect, useRef, useState } from 'react';

import { Icon, type IconNamesList } from '~/components/Icon';
import { useFieldContext } from '~/system/context/FieldContext';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../../Box';
import { SegmentedDate } from '../../SegmentedInputs/SegmentedDate';
import { SegmentedTime } from '../../SegmentedInputs/SegmentedTime';
import type {
  DateFormat,
  DateTimeValue,
  DateValue,
  TimeFormat,
  TimeValue,
} from '../helpers/types';
import { InputSlot } from './InputSlot';

/** Props for {@link DateTimeInput}, including combined state and field slots. */
export type DateTimeInputProps = Omit<
  BoxProps,
  keyof SegmentedFieldsVariantProps | 'children'
> &
  Omit<SegmentedFieldsVariantProps, 'field' | 'range' | 'before' | 'after'> & {
    /** Identifier applied to the combined field container. */
    id?: string;
    /** Controlled date and time. Pair with `onChange`. */
    value?: DateTimeValue | null;
    /** Initial date and time when `value` is not provided. */
    defaultValue?: DateTimeValue | null;
    /** Runs whenever the date or time portion changes. */
    onChange?: (value: DateTimeValue | null) => void;
    /** Segment order and separator convention for the date portion. */
    dateFormat?: DateFormat;
    /** Display cycle for the time portion. */
    timeFormat?: TimeFormat;
    /** Minute increment used by keyboard stepping. */
    minuteStep?: number;
    /** Accessible name for the date segments. */
    dateLabel?: string;
    /** Accessible name for the time segments. */
    timeLabel?: string;
    /** Content before the combined field. Takes precedence over `iconBefore`. */
    before?: ReactNode;
    /** Content after the combined field. Takes precedence over `iconAfter`. */
    after?: ReactNode;
    /** Legacy icon rendered before the field when `before` is absent. */
    iconBefore?: IconNamesList;
    /** Legacy icon rendered after the field when `after` is absent. */
    iconAfter?: IconNamesList;
    /** Applies error styling. Overrides field context when provided. */
    error?: boolean;
    /** Prevents editing both portions. Overrides field context when provided. */
    disabled?: boolean;
    /** Applies invalid styling. Overrides field context when provided. */
    invalid?: boolean;
    /** Reflected through to the segmented fields — lets a wrapping Menu/Picker show "active anchor" styling */
    open?: boolean;
    /** Forwarded to both segmented fields — see SegmentedDate/SegmentedTime's onFocusWithin */
    onFocusWithin?: () => void;
    /** Forwarded to both segmented fields — see SegmentedDate/SegmentedTime's onBlurWithin */
    onBlurWithin?: (relatedTarget: Node | null) => void;
  };

/**
 * Renders coordinated segmented date and time fields in one control.
 *
 * Each complete portion is preserved while the other changes. Use
 * `DateTimePicker` when calendar and time-selection menus are also needed.
 *
 * @example
 * ```tsx
 * <DateTimeInput dateLabel="Due date" timeLabel="Due time" />
 * ```
 */
export const DateTimeInput = (props: DateTimeInputProps) => {
  const fieldContext = useFieldContext();
  const {
    id,
    value,
    defaultValue,
    onChange,
    dateFormat,
    timeFormat,
    minuteStep,
    dateLabel = 'Date',
    timeLabel = 'Time',
    before,
    after,
    iconBefore,
    iconAfter,
    error: errorProp,
    disabled: disabledProp,
    invalid: invalidProp,
    size: sizeProp,
    open,
    onFocusWithin,
    onBlurWithin,
    ...rest
  } = props;
  const size = sizeProp ?? fieldContext?.size;
  const error = errorProp ?? fieldContext?.error;
  const invalid = invalidProp ?? fieldContext?.invalid;
  const disabled = disabledProp ?? fieldContext?.disabled;
  const resolvedBefore =
    before ?? (iconBefore ? <Icon name={iconBefore} aria-hidden /> : undefined);
  const resolvedAfter =
    after ?? (iconAfter ? <Icon name={iconAfter} aria-hidden /> : undefined);

  const classes = segmentedFields({
    size,
    field: 'dateTime',
    before: Boolean(resolvedBefore),
    after: Boolean(resolvedAfter),
  });
  const segmentClasses = segmentedInputs({ size });
  const [className, otherProps] = splitProps(rest);

  // Composed date+time is tracked internally so an uncontrolled DateTimeInput
  // doesn't lose whichever half (date/time) was filled in first — SegmentedDate
  // and SegmentedTime each only report their own half back via onChange.
  const [internalDate, setInternalDate] = useState<DateValue | null>(
    value !== undefined ? (value?.date ?? null) : (defaultValue?.date ?? null),
  );
  const [internalTime, setInternalTime] = useState<TimeValue | null>(
    value !== undefined ? (value?.time ?? null) : (defaultValue?.time ?? null),
  );

  useEffect(() => {
    if (value !== undefined) {
      setInternalDate(value?.date ?? null);
      setInternalTime(value?.time ?? null);
    }
  }, [value]);

  const dateValue = value !== undefined ? (value?.date ?? null) : internalDate;
  const timeValue = value !== undefined ? (value?.time ?? null) : internalTime;

  // Lets clicking the separator between the date and time halves focus into
  // the time field, matching the click-anywhere-focuses-a-segment behavior
  // of the segments themselves.
  const timeFieldRef = useRef<HTMLDivElement>(null);
  const focusTimeField = () => {
    timeFieldRef.current
      ?.querySelector<HTMLElement>('[role="spinbutton"]')
      ?.focus();
  };

  const emitChange = (
    nextDate: DateValue | null,
    nextTime: TimeValue | null,
  ) => {
    setInternalDate(nextDate);
    setInternalTime(nextTime);
    if (nextDate === null && nextTime === null) {
      onChange?.(null);
      return;
    }
    onChange?.({ date: nextDate, time: nextTime });
  };

  return (
    <Box
      {...dsComponent('DateTimeInput')}
      id={id}
      className={cx(classes.container, className)}
      aria-disabled={disabled}
      data-disabled={disabled || undefined}
      data-error={error || undefined}
      data-invalid={invalid || undefined}
      data-open={open || undefined}
      {...otherProps}
    >
      <InputSlot
        owner="DateTimeInput"
        placement="before"
        slot={resolvedBefore}
        size={size}
        disabled={disabled}
        error={error}
        invalid={invalid}
        buttonSlotClassName={classes.buttonSlot}
        slotClassName={classes.slot}
      />
      <SegmentedDate
        label={dateLabel}
        value={dateValue}
        onChange={(nextDate) => emitChange(nextDate, timeValue)}
        format={dateFormat}
        size={size}
        disabled={disabled}
        onFocusWithin={onFocusWithin}
        onBlurWithin={onBlurWithin}
      />
      <Box
        as="span"
        className={segmentClasses.separator}
        aria-hidden="true"
        onClick={focusTimeField}
      >
        {' '}
      </Box>
      <SegmentedTime
        ref={timeFieldRef}
        label={timeLabel}
        value={timeValue}
        onChange={(nextTime) => emitChange(dateValue, nextTime)}
        timeFormat={timeFormat}
        minuteStep={minuteStep}
        size={size}
        disabled={disabled}
        onFocusWithin={onFocusWithin}
        onBlurWithin={onBlurWithin}
      />
      <InputSlot
        owner="DateTimeInput"
        placement="after"
        slot={resolvedAfter}
        size={size}
        disabled={disabled}
        error={error}
        invalid={invalid}
        buttonSlotClassName={classes.buttonSlot}
        slotClassName={classes.slot}
      />
    </Box>
  );
};
