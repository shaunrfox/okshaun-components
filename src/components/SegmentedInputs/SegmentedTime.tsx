import type { SegmentedInputsVariantProps } from '@styled-system/recipes';
import { type Ref, useMemo } from 'react';

import type { BoxProps } from '~/components/Box';
import { normalizeMinuteStep } from '~/components/DateTime/helpers';
import type {
  Meridiem,
  TimeFormat,
  TimeValue,
} from '~/components/DateTime/helpers/types';
import { dsComponent } from '~/utils/dsComponent';

import { SegmentedInput } from './SegmentedInput';

import type {
  SegmentedInputItem,
  SeparatorConfig,
  SeparatorGap,
} from './types';

type SegmentedInputVariantProps = Omit<SegmentedInputsVariantProps, 'bare'>;

/** Props for {@link SegmentedTime}, a keyboard-editable time field. */
export type SegmentedTimeProps = Omit<
  BoxProps,
  keyof SegmentedInputsVariantProps | 'children' | 'onChange' | 'value'
> &
  SegmentedInputVariantProps & {
    /** Ref attached to the segmented group container. */
    ref?: Ref<HTMLDivElement>;
    /** Controlled 24-hour time value. Pair with `onChange`. */
    value?: TimeValue | null;
    /** Initial time when `value` is not provided. */
    defaultValue?: TimeValue | null;
    /** Runs when the hour and minute segments form a complete time. */
    onChange?: (value: TimeValue | null) => void;
    /**
     * Display cycle; emitted values always use 24-hour hours.
     *
     * @default '12'
     */
    timeFormat?: TimeFormat;
    /**
     * Minute increment used by keyboard stepping. Unsupported values are normalized.
     *
     * @default 1
     */
    minuteStep?: number;
    /** Overrides content or spacing around time and meridiem separators. */
    separators?: {
      time?: SeparatorConfig;
      meridiem?: SeparatorConfig;
    };
    /**
     * Accessible name for the segmented group.
     *
     * @default 'Time'
     */
    label?: string;
    /** Prevents editing and keyboard interaction. */
    disabled?: boolean;
    /** Runs when focus enters any time segment. */
    onFocusWithin?: () => void;
    /** Runs when focus leaves a time segment and provides the next focused node. */
    onBlurWithin?: (relatedTarget: Node | null) => void;
  };

const to12Hour = (hour24: number) => {
  if (hour24 === 0) return { hour: 12, meridiem: 'AM' as Meridiem };
  if (hour24 < 12) return { hour: hour24, meridiem: 'AM' as Meridiem };
  if (hour24 === 12) return { hour: 12, meridiem: 'PM' as Meridiem };
  return { hour: hour24 - 12, meridiem: 'PM' as Meridiem };
};

const to24Hour = (hour12: number, meridiem: string) => {
  if (meridiem === 'AM') return hour12 === 12 ? 0 : hour12;
  return hour12 === 12 ? 12 : hour12 + 12;
};

/**
 * Edits a time as separate hour, minute, and optional meridiem segments.
 *
 * Display may use 12- or 24-hour time, but values always store hours from 0
 * through 23. Use `TimeInput` when leading or trailing slots and field
 * validation styling are needed.
 *
 * @example
 * ```tsx
 * <SegmentedTime defaultValue={{ hour: 13, minute: 30 }} timeFormat="12" />
 * ```
 */
export const SegmentedTime = (props: SegmentedTimeProps) => {
  const {
    value,
    defaultValue = null,
    onChange,
    timeFormat,
    minuteStep = 1,
    separators,
    label = 'Time',
    disabled,
    onFocusWithin,
    onBlurWithin,
    ...rest
  } = props;
  const resolvedTimeFormat = timeFormat ?? '12';
  const resolvedMinuteStep = normalizeMinuteStep(minuteStep);
  const resolvedValue = value !== undefined ? value : defaultValue;
  const valueMap =
    value !== undefined
      ? {
          hour:
            value && resolvedTimeFormat === '12'
              ? to12Hour(value.hour).hour
              : (value?.hour ?? null),
          minute: value?.minute ?? null,
          meridiem:
            value && resolvedTimeFormat === '12'
              ? to12Hour(value.hour).meridiem
              : null,
        }
      : undefined;

  const items = useMemo<SegmentedInputItem[]>(() => {
    const displayHour =
      resolvedValue && resolvedTimeFormat === '12'
        ? to12Hour(resolvedValue.hour).hour
        : (resolvedValue?.hour ?? null);
    const meridiem =
      resolvedValue && resolvedTimeFormat === '12'
        ? to12Hour(resolvedValue.hour).meridiem
        : null;
    const timeGap: SeparatorGap = separators?.time?.gap ?? 'tight';
    const meridiemGap: SeparatorGap = separators?.meridiem?.gap ?? 'tight';

    const nextItems: SegmentedInputItem[] = [
      {
        type: 'segment',
        kind: 'numeric',
        id: 'hour',
        label: 'Hour',
        placeholder: 'HH',
        value: displayHour,
        digits: 2,
        min: resolvedTimeFormat === '12' ? 1 : 0,
        max: resolvedTimeFormat === '12' ? 12 : 23,
      },
      {
        type: 'separator',
        id: 'hour-minute',
        content: separators?.time?.content ?? ':',
        gap: timeGap,
      },
      {
        type: 'segment',
        kind: 'numeric',
        id: 'minute',
        label: 'Minute',
        placeholder: 'MM',
        value: resolvedValue?.minute ?? null,
        digits: 2,
        min: 0,
        max: 59,
        step: resolvedMinuteStep,
      },
    ];

    if (resolvedTimeFormat === '12') {
      nextItems.push(
        {
          type: 'separator',
          id: 'minute-meridiem',
          content: separators?.meridiem?.content ?? ' ',
          gap: meridiemGap,
        },
        {
          type: 'segment',
          kind: 'choice',
          id: 'meridiem',
          label: 'AM or PM',
          placeholder: 'AM',
          value: meridiem,
          choices: ['AM', 'PM'],
          inputKeys: {
            a: 'AM',
            p: 'PM',
          },
        },
      );
    }

    return nextItems;
  }, [resolvedMinuteStep, resolvedTimeFormat, resolvedValue, separators]);

  return (
    <SegmentedInput
      {...dsComponent('SegmentedTime')}
      {...rest}
      items={items}
      label={label}
      disabled={disabled}
      value={valueMap}
      onFocusWithin={onFocusWithin}
      onBlurWithin={onBlurWithin}
      onChange={({ values }) => {
        const hour = values.hour;
        const minute = values.minute;
        if (typeof hour !== 'number' || typeof minute !== 'number') return;

        if (resolvedTimeFormat === '12') {
          onChange?.({
            hour: to24Hour(hour, (values.meridiem as string | null) ?? 'AM'),
            minute,
          });
          return;
        }

        onChange?.({ hour, minute });
      }}
    />
  );
};
