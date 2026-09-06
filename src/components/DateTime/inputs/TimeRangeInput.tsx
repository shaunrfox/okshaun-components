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
import { SegmentedTime } from '../../SegmentedInputs/SegmentedTime';
import type { TimeFormat, TimeRangeValue, TimeValue } from '../helpers/types';
import { InputSlot } from './InputSlot';

/** Props for {@link TimeRangeInput}, including range state and field slots. */
export type TimeRangeInputProps = Omit<
  BoxProps,
  keyof SegmentedFieldsVariantProps | 'children'
> &
  Omit<SegmentedFieldsVariantProps, 'field' | 'range' | 'before' | 'after'> & {
    /** Identifier applied to the range container. */
    id?: string;
    /** Controlled start and end times. Pair with `onChange`. */
    value?: TimeRangeValue | null;
    /** Initial time range when `value` is not provided. */
    defaultValue?: TimeRangeValue | null;
    /** Runs whenever either endpoint becomes complete or is cleared. */
    onChange?: (value: TimeRangeValue | null) => void;
    /** Display cycle shared by both endpoints. */
    timeFormat?: TimeFormat;
    /** Minute increment used by keyboard stepping. */
    minuteStep?: number;
    /** Accessible name for the start-time segments. */
    startLabel?: string;
    /** Accessible name for the end-time segments. */
    endLabel?: string;
    /** Content before the range. Takes precedence over `iconBefore`. */
    before?: ReactNode;
    /** Content after the range. Takes precedence over `iconAfter`. */
    after?: ReactNode;
    /** Legacy icon rendered before the range when `before` is absent. */
    iconBefore?: IconNamesList;
    /** Legacy icon rendered after the range when `after` is absent. */
    iconAfter?: IconNamesList;
    /** Applies error styling. Overrides field context when provided. */
    error?: boolean;
    /** Prevents editing both endpoints. Overrides field context when provided. */
    disabled?: boolean;
    /** Applies invalid styling. Overrides field context when provided. */
    invalid?: boolean;
    /** Reflected through to the segmented fields — lets a wrapping Menu/Picker show "active anchor" styling */
    open?: boolean;
    /** Forwarded to both segmented fields — see SegmentedTime's onFocusWithin */
    onFocusWithin?: () => void;
    /** Forwarded to both segmented fields — see SegmentedTime's onBlurWithin */
    onBlurWithin?: (relatedTarget: Node | null) => void;
  };

const EMPTY_RANGE: TimeRangeValue = { start: null, end: null };

/**
 * Renders start and end times as two coordinated segmented fields.
 *
 * Values remain normalized to 24-hour time regardless of display cycle. Use
 * `TimeRangePicker` when a menu and Apply/Cancel flow are also needed.
 *
 * @example
 * ```tsx
 * <TimeRangeInput startLabel="Opens" endLabel="Closes" />
 * ```
 */
export const TimeRangeInput = (props: TimeRangeInputProps) => {
  const fieldContext = useFieldContext();
  const {
    id,
    value,
    defaultValue,
    onChange,
    timeFormat,
    minuteStep,
    startLabel = 'Start time',
    endLabel = 'End time',
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
    field: 'time',
    range: 'time',
    before: Boolean(resolvedBefore),
    after: Boolean(resolvedAfter),
  });
  const segmentClasses = segmentedInputs({ size });
  const [className, otherProps] = splitProps(rest);

  // Composed range is tracked internally so an uncontrolled TimeRangeInput
  // doesn't lose whichever endpoint was filled in first — each SegmentedTime
  // only reports its own endpoint back via onChange.
  const [internalRange, setInternalRange] = useState<TimeRangeValue>(
    value !== undefined
      ? (value ?? EMPTY_RANGE)
      : (defaultValue ?? EMPTY_RANGE),
  );

  useEffect(() => {
    if (value !== undefined) {
      setInternalRange(value ?? EMPTY_RANGE);
    }
  }, [value]);

  const range = value !== undefined ? (value ?? EMPTY_RANGE) : internalRange;

  // Lets clicking the "–" separator focus into the end field, matching the
  // click-anywhere-focuses-a-segment behavior of the segments themselves.
  const endFieldRef = useRef<HTMLDivElement>(null);
  const focusEndField = () => {
    endFieldRef.current
      ?.querySelector<HTMLElement>('[role="spinbutton"]')
      ?.focus();
  };

  const emitChange = (
    nextStart: TimeValue | null,
    nextEnd: TimeValue | null,
  ) => {
    const next: TimeRangeValue = { start: nextStart, end: nextEnd };
    setInternalRange(next);
    onChange?.(nextStart === null && nextEnd === null ? null : next);
  };

  return (
    <Box
      {...dsComponent('TimeRangeInput')}
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
        owner="TimeRangeInput"
        placement="before"
        slot={resolvedBefore}
        size={size}
        disabled={disabled}
        error={error}
        invalid={invalid}
        buttonSlotClassName={classes.buttonSlot}
        slotClassName={classes.slot}
      />
      <SegmentedTime
        label={startLabel}
        value={range.start}
        onChange={(nextStart) => emitChange(nextStart, range.end)}
        timeFormat={timeFormat}
        minuteStep={minuteStep}
        size={size}
        disabled={disabled}
        onFocusWithin={onFocusWithin}
        onBlurWithin={onBlurWithin}
      />
      <Box
        as="span"
        className={segmentClasses.separator}
        data-gap="loose"
        aria-hidden="true"
        onClick={focusEndField}
      >
        –
      </Box>
      <SegmentedTime
        ref={endFieldRef}
        label={endLabel}
        value={range.end}
        onChange={(nextEnd) => emitChange(range.start, nextEnd)}
        timeFormat={timeFormat}
        minuteStep={minuteStep}
        size={size}
        disabled={disabled}
        onFocusWithin={onFocusWithin}
        onBlurWithin={onBlurWithin}
      />
      <InputSlot
        owner="TimeRangeInput"
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
