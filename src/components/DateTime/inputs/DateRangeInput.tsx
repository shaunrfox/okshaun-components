import { cx } from '@styled-system/css';
import {
  type SegmentedFieldsVariantProps,
  segmentedFields,
  segmentedInputs,
} from '@styled-system/recipes';
import { type ReactNode, useEffect, useRef, useState } from 'react';

import { Icon, type IconNamesList } from '~/components/Icon';
import { useFieldContext } from '~/system/context/FieldContext';
import { useLocale } from '~/system/context/useLocale';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../../Box';
import { SegmentedDate } from '../../SegmentedInputs/SegmentedDate';
import type { DateFormat, DateRangeValue, DateValue } from '../helpers/types';
import { getClearButton } from './ClearButton';
import { InputSlot } from './InputSlot';

/** Props for {@link DateRangeInput}, including range state and field slots. */
export type DateRangeInputProps = Omit<
  BoxProps,
  keyof SegmentedFieldsVariantProps | 'children'
> &
  Omit<SegmentedFieldsVariantProps, 'field' | 'range' | 'before' | 'after'> & {
    /** Identifier applied to the range container. */
    id?: string;
    /** Controlled start and end dates. Pair with `onChange`. */
    value?: DateRangeValue | null;
    /** Initial range when `value` is not provided. */
    defaultValue?: DateRangeValue | null;
    /** Runs whenever either endpoint becomes complete or is cleared. */
    onChange?: (value: DateRangeValue | null) => void;
    /** Segment order and separator convention shared by both endpoints. */
    dateFormat?: DateFormat;
    /** Accessible name for the start-date segments. */
    startLabel?: string;
    /** Accessible name for the end-date segments. */
    endLabel?: string;
    /** Content before the range. Takes precedence over `iconBefore`. */
    before?: ReactNode;
    /** Content after the range. Takes precedence over `iconAfter`. */
    after?: ReactNode;
    /** Legacy icon rendered before the range when `before` is absent. */
    iconBefore?: IconNamesList;
    /** Legacy icon rendered after the range when `after` is absent. */
    iconAfter?: IconNamesList;
    /** Shows a clear action in the `after` slot when it is otherwise unused and either endpoint has a value. @default true */
    clearable?: boolean;
    /** Accessible label for the clear action. @default 'Clear date range' */
    clearLabel?: string;
    /** Applies error styling. Overrides field context when provided. */
    error?: boolean;
    /** Prevents editing both endpoints. Overrides field context when provided. */
    disabled?: boolean;
    /** Applies invalid styling. Overrides field context when provided. */
    invalid?: boolean;
    /** Reflected through to the segmented fields — lets a wrapping Menu/Picker show "active anchor" styling */
    open?: boolean;
    /** Forwarded to both segmented fields — see SegmentedDate's onFocusWithin */
    onFocusWithin?: () => void;
    /** Forwarded to both segmented fields — see SegmentedDate's onBlurWithin */
    onBlurWithin?: (relatedTarget: Node | null) => void;
  };

const EMPTY_RANGE: DateRangeValue = { start: null, end: null };

/**
 * Renders start and end dates as two coordinated segmented fields.
 *
 * Each endpoint commits independently while the component preserves the other
 * endpoint. Use `DateRangePicker` when a calendar menu and Apply/Cancel flow
 * are also needed.
 *
 * @example
 * ```tsx
 * <DateRangeInput startLabel="Arrival" endLabel="Departure" />
 * ```
 */
export const DateRangeInput = (props: DateRangeInputProps) => {
  const fieldContext = useFieldContext();
  const { labels } = useLocale();
  const {
    id,
    value,
    defaultValue,
    onChange,
    dateFormat,
    startLabel = labels.startDate,
    endLabel = labels.endDate,
    before,
    after,
    iconBefore,
    iconAfter,
    clearable = true,
    clearLabel = labels.clearDateRange,
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
  const explicitAfter =
    after ?? (iconAfter ? <Icon name={iconAfter} aria-hidden /> : undefined);

  // Composed range is tracked internally so an uncontrolled DateRangeInput
  // doesn't lose whichever endpoint was filled in first — each SegmentedDate
  // only reports its own endpoint back via onChange.
  const [internalRange, setInternalRange] = useState<DateRangeValue>(
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
  const hasValue = range.start !== null || range.end !== null;

  const classes = segmentedFields({
    size,
    field: 'date',
    range: 'date',
    before: Boolean(resolvedBefore),
    after: Boolean(explicitAfter || (clearable && hasValue)),
  });
  const segmentClasses = segmentedInputs({ size });
  const [className, otherProps] = splitProps(rest);

  // Lets clicking the "–" separator focus into the end field, matching the
  // click-anywhere-focuses-a-segment behavior of the segments themselves.
  const endFieldRef = useRef<HTMLDivElement>(null);
  const focusEndField = () => {
    endFieldRef.current
      ?.querySelector<HTMLElement>('[role="spinbutton"]')
      ?.focus();
  };

  const emitChange = (
    nextStart: DateValue | null,
    nextEnd: DateValue | null,
  ) => {
    const next: DateRangeValue = { start: nextStart, end: nextEnd };
    setInternalRange(next);
    onChange?.(nextStart === null && nextEnd === null ? null : next);
  };
  const clearAction = getClearButton({
    clearable,
    hasValue,
    label: clearLabel,
    onClear: () => emitChange(null, null),
  });
  const resolvedAfter = explicitAfter ?? clearAction;

  return (
    <Box
      {...dsComponent('DateRangeInput')}
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
        owner="DateRangeInput"
        placement="before"
        slot={resolvedBefore}
        size={size}
        disabled={disabled}
        error={error}
        invalid={invalid}
        buttonSlotClassName={classes.buttonSlot}
        slotClassName={classes.slot}
      />
      <Box className={classes.content}>
        <SegmentedDate
          label={startLabel}
          value={range.start}
          onChange={(nextStart) => emitChange(nextStart, range.end)}
          format={dateFormat}
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
        <SegmentedDate
          ref={endFieldRef}
          label={endLabel}
          value={range.end}
          onChange={(nextEnd) => emitChange(range.start, nextEnd)}
          format={dateFormat}
          size={size}
          disabled={disabled}
          onFocusWithin={onFocusWithin}
          onBlurWithin={onBlurWithin}
        />
      </Box>
      <InputSlot
        owner="DateRangeInput"
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
