import { cx } from '@styled-system/css';
import {
  type SegmentedFieldsVariantProps,
  segmentedFields,
} from '@styled-system/recipes';
import type { ReactNode } from 'react';

import { Icon, type IconNamesList } from '~/components/Icon';
import { useFieldContext } from '~/system/context/FieldContext';
import { useLocale } from '~/system/context/useLocale';
import { useControllableState } from '~/system/hooks/useControllableState';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../../Box';
import { SegmentedTime } from '../../SegmentedInputs/SegmentedTime';
import type { TimeFormat, TimeValue } from '../helpers/types';
import { getClearButton } from './ClearButton';
import { InputSlot } from './InputSlot';

/** Props for {@link TimeInput}, including segmented time state and field slots. */
export type TimeInputProps = Omit<
  BoxProps,
  keyof SegmentedFieldsVariantProps | 'children'
> &
  Omit<SegmentedFieldsVariantProps, 'field' | 'range' | 'before' | 'after'> & {
    /** Identifier forwarded to the segmented time group. */
    id?: string;
    /** Controlled 24-hour time value. Pair with `onChange`. */
    value?: TimeValue | null;
    /** Initial time when `value` is not provided. */
    defaultValue?: TimeValue | null;
    /** Runs when the time segments form a complete value. */
    onChange?: (value: TimeValue | null) => void;
    /** Display cycle; emitted values always use 24-hour hours. */
    timeFormat?: TimeFormat;
    /** Minute increment used by keyboard stepping. */
    minuteStep?: number;
    /** Accessible name for the segmented time group. */
    label?: string;
    /** Content before the time field. Takes precedence over `iconBefore`. */
    before?: ReactNode;
    /** Content after the time field. Takes precedence over `iconAfter`. */
    after?: ReactNode;
    /** Legacy icon rendered before the field when `before` is absent. */
    iconBefore?: IconNamesList;
    /** Legacy icon rendered after the field when `after` is absent. */
    iconAfter?: IconNamesList;
    /** Shows a clear action in the `after` slot when it is otherwise unused and the field has a value. @default true */
    clearable?: boolean;
    /** Accessible label for the clear action. @default 'Clear time' */
    clearLabel?: string;
    /** Applies error styling. Overrides field context when provided. */
    error?: boolean;
    /** Prevents editing. Overrides field context when provided. */
    disabled?: boolean;
    /** Applies invalid styling. Overrides field context when provided. */
    invalid?: boolean;
    /** Reflected through to the segmented field — lets a wrapping Menu/Picker show "active anchor" styling */
    open?: boolean;
    /** Forwarded to the segmented field — see SegmentedTime's onFocusWithin */
    onFocusWithin?: () => void;
    /** Forwarded to the segmented field — see SegmentedTime's onBlurWithin */
    onBlurWithin?: (relatedTarget: Node | null) => void;
  };

/**
 * Renders a segmented time field with optional leading and trailing content.
 *
 * Display can use 12- or 24-hour time while values remain normalized to
 * 24-hour hours. Use `TimePicker` when a time-selection menu is also needed.
 *
 * @example
 * ```tsx
 * <TimeInput label="Start time" defaultValue={{ hour: 9, minute: 30 }} />
 * ```
 */
export const TimeInput = (props: TimeInputProps) => {
  const fieldContext = useFieldContext();
  const { labels } = useLocale();
  const {
    id,
    value,
    defaultValue,
    onChange,
    timeFormat,
    minuteStep,
    label,
    before,
    after,
    iconBefore,
    iconAfter,
    clearable = true,
    clearLabel = labels.clearTime,
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

  const [currentValue, setCurrentValue] =
    useControllableState<TimeValue | null>({
      value,
      defaultValue: defaultValue ?? null,
      onChange,
    });
  const clearAction = getClearButton({
    clearable,
    hasValue: currentValue !== null,
    label: clearLabel,
    onClear: () => setCurrentValue(null),
  });
  const resolvedAfter = explicitAfter ?? clearAction;

  const classes = segmentedFields({
    size,
    field: 'time',
    before: Boolean(resolvedBefore),
    after: Boolean(resolvedAfter),
  });
  const [className, otherProps] = splitProps(rest);

  return (
    <Box
      {...dsComponent('TimeInput')}
      className={cx(classes.container, className)}
      aria-disabled={disabled}
      data-disabled={disabled || undefined}
      data-error={error || undefined}
      data-invalid={invalid || undefined}
      data-open={open || undefined}
      {...otherProps}
    >
      <InputSlot
        owner="TimeInput"
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
        <SegmentedTime
          flex="1"
          minW="0"
          id={id}
          label={label}
          value={currentValue}
          onChange={setCurrentValue}
          timeFormat={timeFormat}
          minuteStep={minuteStep}
          size={size}
          disabled={disabled}
          onFocusWithin={onFocusWithin}
          onBlurWithin={onBlurWithin}
        />
      </Box>
      <InputSlot
        owner="TimeInput"
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
