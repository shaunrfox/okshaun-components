import type { SegmentedInputsVariantProps } from '@styled-system/recipes';
import { type Ref, useMemo } from 'react';

import type { BoxProps } from '~/components/Box';
import type {
  DateFormat,
  DateValue,
} from '~/components/DateTime/helpers/types';
import { dsComponent } from '~/utils/dsComponent';

import { SegmentedInput } from './SegmentedInput';

import type {
  SegmentedInputItem,
  SeparatorConfig,
  SeparatorGap,
} from './types';

export type SegmentedDateFormat = DateFormat;
type SegmentedInputVariantProps = Omit<SegmentedInputsVariantProps, 'bare'>;

/** Props for {@link SegmentedDate}, a keyboard-editable date field. */
export type SegmentedDateProps = Omit<
  BoxProps,
  keyof SegmentedInputsVariantProps | 'children' | 'onChange' | 'value'
> &
  SegmentedInputVariantProps & {
    /** Ref attached to the segmented group container. */
    ref?: Ref<HTMLDivElement>;
    /** Controlled date. Pair with `onChange`; `null` clears every segment. */
    value?: DateValue | null;
    /** Initial date when `value` is not provided. */
    defaultValue?: DateValue | null;
    /** Runs after all date segments form a date, or after every segment is cleared. */
    onChange?: (value: DateValue | null) => void;
    /**
     * Segment order and default separator.
     *
     * @default 'YYYY-MM-DD'
     */
    format?: SegmentedDateFormat;
    /** Overrides separator content or spacing between date segments. */
    separators?: SeparatorConfig;
    /**
     * Accessible name for the segmented group.
     *
     * @default 'Date'
     */
    label?: string;
    /** Prevents editing and keyboard interaction. */
    disabled?: boolean;
    /** Runs when focus enters any date segment. */
    onFocusWithin?: () => void;
    /** Runs when focus leaves a date segment and provides the next focused node. */
    onBlurWithin?: (relatedTarget: Node | null) => void;
  };

const daysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

const clampDayToMonth = (
  day: number,
  month: number | null,
  year: number | null,
) => {
  return Math.min(day, daysInMonth(year ?? 2000, month ?? 1));
};

const getSeparatorContent = (
  format: SegmentedDateFormat,
  separator?: SeparatorConfig,
) => {
  if (separator?.content !== undefined) return separator.content;
  return format === 'YYYY-MM-DD' ? '-' : '/';
};

/**
 * Edits a date as separate year, month, and day spinbutton segments.
 *
 * The component clamps days to the selected month and emits only complete
 * dates or a fully cleared `null` value. Use `DateInput` when leading or
 * trailing slots and field validation styling are needed.
 *
 * @example
 * ```tsx
 * <SegmentedDate defaultValue={{ year: 2026, month: 8, day: 3 }} />
 * ```
 */
export const SegmentedDate = (props: SegmentedDateProps) => {
  const {
    value,
    defaultValue = null,
    onChange,
    format = 'YYYY-MM-DD',
    separators,
    label = 'Date',
    disabled,
    onFocusWithin,
    onBlurWithin,
    ...rest
  } = props;
  const resolvedValue = value !== undefined ? value : defaultValue;
  const valueMap =
    value !== undefined
      ? {
          month: value?.month ?? null,
          day: value?.day ?? null,
          year: value?.year ?? null,
        }
      : undefined;
  const separatorGap: SeparatorGap = separators?.gap ?? 'normal';

  const items = useMemo<SegmentedInputItem[]>(() => {
    const values = {
      month: resolvedValue?.month ?? null,
      day: resolvedValue?.day ?? null,
      year: resolvedValue?.year ?? null,
    };
    const separatorContent = getSeparatorContent(format, separators);

    const monthSegment: SegmentedInputItem = {
      type: 'segment',
      kind: 'numeric',
      id: 'month',
      label: 'Month',
      placeholder: 'MM',
      value: values.month,
      digits: 2,
      min: 1,
      max: 12,
    };
    const daySegment: SegmentedInputItem = {
      type: 'segment',
      kind: 'numeric',
      id: 'day',
      label: 'Day',
      placeholder: 'DD',
      value: values.day,
      digits: 2,
      min: 1,
      max: 31,
      clampValue: (day, nextValues) => {
        return clampDayToMonth(
          day,
          nextValues.month as number | null,
          nextValues.year as number | null,
        );
      },
    };
    const yearSegment: SegmentedInputItem = {
      type: 'segment',
      kind: 'numeric',
      id: 'year',
      label: 'Year',
      placeholder: 'YYYY',
      value: values.year,
      digits: 4,
      min: 1900,
      max: 2100,
    };
    const separator = (id: string): SegmentedInputItem => ({
      type: 'separator',
      id,
      content: separatorContent,
      gap: separatorGap,
    });

    if (format === 'YYYY-MM-DD') {
      return [
        yearSegment,
        separator('year-month'),
        monthSegment,
        separator('month-day'),
        daySegment,
      ];
    }

    return [
      monthSegment,
      separator('month-day'),
      daySegment,
      separator('day-year'),
      yearSegment,
    ];
  }, [format, resolvedValue, separatorGap, separators]);

  return (
    <SegmentedInput
      {...dsComponent('SegmentedDate')}
      {...rest}
      items={items}
      label={label}
      disabled={disabled}
      value={valueMap}
      onFocusWithin={onFocusWithin}
      onBlurWithin={onBlurWithin}
      onChange={({ values }) => {
        const { month, day, year } = values;
        if (
          typeof month === 'number' &&
          typeof day === 'number' &&
          typeof year === 'number'
        ) {
          onChange?.({ month, day, year });
        } else if (month === null && day === null && year === null) {
          onChange?.(null);
        }
      }}
    />
  );
};
