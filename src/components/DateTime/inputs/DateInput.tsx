import { cx } from '@styled-system/css';
import {
  type SegmentedFieldsVariantProps,
  segmentedFields,
} from '@styled-system/recipes';
import type { ReactNode } from 'react';

import { Icon, type IconNamesList } from '~/components/Icon';
import { useFieldContext } from '~/system/context/FieldContext';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../../Box';
import { SegmentedDate } from '../../SegmentedInputs/SegmentedDate';
import type { DateFormat, DateValue } from '../helpers/types';
import { InputSlot } from './InputSlot';

/** Props for {@link DateInput}, including segmented date state and field slots. */
export type DateInputProps = Omit<
  BoxProps,
  keyof SegmentedFieldsVariantProps | 'children'
> &
  Omit<SegmentedFieldsVariantProps, 'field' | 'range' | 'before' | 'after'> & {
    /** Identifier forwarded to the segmented date group. */
    id?: string;
    /** Controlled date. Pair with `onChange`. */
    value?: DateValue | null;
    /** Initial date when `value` is not provided. */
    defaultValue?: DateValue | null;
    /** Runs when the segmented date becomes complete or is cleared. */
    onChange?: (value: DateValue | null) => void;
    /** Segment order and separator convention. */
    dateFormat?: DateFormat;
    /** Accessible name for the segmented date group. */
    label?: string;
    /** Content before the date field. Takes precedence over `iconBefore`. */
    before?: ReactNode;
    /** Content after the date field. Takes precedence over `iconAfter`. */
    after?: ReactNode;
    /** Legacy icon rendered before the field when `before` is absent. */
    iconBefore?: IconNamesList;
    /** Legacy icon rendered after the field when `after` is absent. */
    iconAfter?: IconNamesList;
    /** Applies error styling. Overrides field context when provided. */
    error?: boolean;
    /** Prevents editing. Overrides field context when provided. */
    disabled?: boolean;
    /** Applies invalid styling. Overrides field context when provided. */
    invalid?: boolean;
    /** Reflected through to the segmented field — lets a wrapping Menu/Picker show "active anchor" styling */
    open?: boolean;
    /** Forwarded to the segmented field — see SegmentedDate's onFocusWithin */
    onFocusWithin?: () => void;
    /** Forwarded to the segmented field — see SegmentedDate's onBlurWithin */
    onBlurWithin?: (relatedTarget: Node | null) => void;
  };

/**
 * Renders a segmented date field with optional leading and trailing content.
 *
 * The field accepts keyboard entry and stepping through year, month, and day
 * segments. Use `DatePicker` when a calendar menu is also needed.
 *
 * @example
 * ```tsx
 * <DateInput label="Invoice date" defaultValue={{ year: 2026, month: 8, day: 3 }} />
 * ```
 */
export const DateInput = (props: DateInputProps) => {
  const fieldContext = useFieldContext();
  const {
    id,
    value,
    defaultValue,
    onChange,
    dateFormat,
    label,
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
    field: 'date',
    before: Boolean(resolvedBefore),
    after: Boolean(resolvedAfter),
  });
  const [className, otherProps] = splitProps(rest);

  return (
    <Box
      {...dsComponent('DateInput')}
      className={cx(classes.container, className)}
      aria-disabled={disabled}
      data-disabled={disabled || undefined}
      data-error={error || undefined}
      data-invalid={invalid || undefined}
      data-open={open || undefined}
      {...otherProps}
    >
      <InputSlot
        owner="DateInput"
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
        id={id}
        label={label}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        format={dateFormat}
        size={size}
        disabled={disabled}
        onFocusWithin={onFocusWithin}
        onBlurWithin={onBlurWithin}
      />
      <InputSlot
        owner="DateInput"
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
