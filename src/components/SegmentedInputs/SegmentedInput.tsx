// biome-ignore-all lint/a11y/useSemanticElements: the calendar and time grids are built from Button and Box, not table markup, so the roles are applied explicitly
import { cx } from '@styled-system/css';
import {
  type SegmentedInputsVariantProps,
  segmentedInputs,
} from '@styled-system/recipes';
import {
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type Ref,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Box, type BoxProps } from '~/components/Box';
import { useFieldContext } from '~/system/context/FieldContext';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import {
  getInitialValues,
  getSegmentDisplay,
  getSegments,
  shouldAutoAdvanceSegment,
  stepNumericValue,
} from './segmentedInputUtils';

import type {
  SegmentedInputChange,
  SegmentedInputItem,
  SegmentedInputValueMap,
  SegmentItem,
} from './types';

type SegmentedInputVariantProps = Omit<SegmentedInputsVariantProps, 'bare'>;

/** Props for the low-level {@link SegmentedInput} composition primitive. */
export type SegmentedInputProps = Omit<
  BoxProps,
  keyof SegmentedInputsVariantProps | 'children' | 'onChange' | 'value'
> &
  SegmentedInputVariantProps & {
    /** Ref attached to the segment group container. */
    ref?: Ref<HTMLDivElement>;
    /** Ordered editable segments and visual separators. */
    items: readonly SegmentedInputItem[];
    /** Accessible name announced for the complete group. */
    label: string;
    /** Prevents editing and keyboard interaction. Overrides field context. */
    disabled?: boolean;
    /** Controlled values keyed by segment identifier. */
    value?: SegmentedInputValueMap;
    /** Runs after a segment changes with the complete next value map. */
    onChange?: (change: SegmentedInputChange) => void;
    /** Runs when focus enters any editable segment. */
    onFocusWithin?: () => void;
    /** Runs when focus leaves a segment and provides the next focused node. */
    onBlurWithin?: (relatedTarget: Node | null) => void;
  };

/**
 * Renders a keyboard-editable group of numeric and choice segments.
 *
 * This is the low-level primitive used by `SegmentedDate` and
 * `SegmentedTime`. Each segment uses spinbutton semantics; arrow keys step
 * values, number or choice keys enter values, and focus advances between
 * completed numeric segments.
 *
 * @example
 * ```tsx
 * <SegmentedInput
 *   label="Quantity"
 *   items={[{
 *     type: 'segment', kind: 'numeric', id: 'quantity',
 *     label: 'Quantity', placeholder: '0', value: null,
 *     min: 0, max: 99, digits: 2,
 *   }]}
 * />
 * ```
 */
export const SegmentedInput = (props: SegmentedInputProps) => {
  const fieldContext = useFieldContext();
  const {
    ref,
    items,
    label,
    disabled: disabledProp,
    size: sizeProp,
    value,
    onChange,
    onFocusWithin,
    onBlurWithin,
    ...rest
  } = props;
  const disabled = disabledProp ?? fieldContext?.disabled ?? false;
  const size = sizeProp ?? fieldContext?.size;

  const [className, otherProps] = splitProps(rest);
  const [values, setValues] = useState<SegmentedInputValueMap>(
    () => value ?? getInitialValues(items),
  );
  const [rawInput, setRawInput] = useState<Record<string, string>>({});
  const [focusedSegmentId, setFocusedSegmentId] = useState<string | null>(null);
  const segmentRefs = useRef<(HTMLElement | null)[]>([]);

  const segments = useMemo(() => getSegments(items), [items]);
  const segmentIndexById = useMemo(() => {
    return segments.reduce<Record<string, number>>((acc, segment, index) => {
      acc[segment.id] = index;
      return acc;
    }, {});
  }, [segments]);

  useEffect(() => {
    if (value !== undefined) {
      setValues(value);
    }
  }, [value]);

  const focusSegment = useCallback((index: number) => {
    segmentRefs.current[index]?.focus();
  }, []);

  const updateSegment = useCallback(
    (segment: SegmentItem, nextValue: number | string | null, nextRaw = '') => {
      const nextValues = { ...values, [segment.id]: nextValue };
      setValues(nextValues);
      setRawInput((prevRaw) => ({ ...prevRaw, [segment.id]: nextRaw }));
      onChange?.({
        values: nextValues,
        changedSegmentId: segment.id,
      });
    },
    [onChange, values],
  );

  const handleBlur = useCallback(
    (event: FocusEvent) => {
      setFocusedSegmentId(null);
      onBlurWithin?.(event.relatedTarget as Node | null);
    },
    [onBlurWithin],
  );

  const handleChoiceKeyDown = useCallback(
    (
      event: KeyboardEvent,
      segment: Extract<SegmentItem, { kind: 'choice' }>,
    ) => {
      const current = values[segment.id];
      const currentIndex =
        typeof current === 'string' ? segment.choices.indexOf(current) : -1;

      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        const direction = event.key === 'ArrowUp' ? 1 : -1;
        const fallback = direction === 1 ? 0 : segment.choices.length - 1;
        const nextIndex =
          currentIndex < 0
            ? fallback
            : (currentIndex + direction + segment.choices.length) %
              segment.choices.length;
        updateSegment(segment, segment.choices[nextIndex] ?? null);
        return;
      }

      const matchingValue = segment.inputKeys?.[event.key.toLowerCase()];
      if (matchingValue && segment.choices.includes(matchingValue)) {
        event.preventDefault();
        updateSegment(segment, matchingValue);
      }
    },
    [updateSegment, values],
  );

  const handleNumericKeyDown = useCallback(
    (
      event: KeyboardEvent,
      segment: Extract<SegmentItem, { kind: 'numeric' }>,
      segmentIndex: number,
    ) => {
      const currentValue = values[segment.id];

      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        const next = stepNumericValue(
          typeof currentValue === 'number' ? currentValue : null,
          segment,
          event.key === 'ArrowUp' ? 'increment' : 'decrement',
        );
        updateSegment(segment, segment.clampValue?.(next, values) ?? next);
        return;
      }

      if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault();
        const raw = rawInput[segment.id] ?? '';
        if (raw.length > 0) {
          setRawInput((prev) => ({
            ...prev,
            [segment.id]: raw.slice(0, -1),
          }));
        } else {
          updateSegment(segment, null);
        }
        return;
      }

      if (/^\d$/.test(event.key)) {
        event.preventDefault();
        const digit = Number(event.key);
        const currentRaw = rawInput[segment.id] ?? '';
        const nextRaw = currentRaw + event.key;
        const parsed = Number(nextRaw);
        const bounded = Math.min(Math.max(parsed, segment.min), segment.max);
        const nextValue = segment.clampValue?.(bounded, values) ?? bounded;

        if (
          shouldAutoAdvanceSegment(
            digit,
            currentRaw,
            segment.max,
            segment.digits,
          )
        ) {
          updateSegment(segment, nextValue);
          if (segmentIndex < segments.length - 1) {
            focusSegment(segmentIndex + 1);
          }
        } else {
          updateSegment(segment, nextValue, nextRaw);
        }
      }
    },
    [focusSegment, rawInput, segments.length, updateSegment, values],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent, segment: SegmentItem, segmentIndex: number) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        focusSegment(Math.max(0, segmentIndex - 1));
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        focusSegment(Math.min(segments.length - 1, segmentIndex + 1));
        return;
      }

      if (segment.kind === 'choice') {
        handleChoiceKeyDown(event, segment);
        return;
      }

      handleNumericKeyDown(event, segment, segmentIndex);
    },
    [focusSegment, handleChoiceKeyDown, handleNumericKeyDown, segments.length],
  );

  const classes = segmentedInputs({ size });

  return (
    <Box
      {...dsComponent('SegmentedInput')}
      ref={ref}
      className={cx(classes.root, className)}
      role="group"
      aria-label={label}
      aria-disabled={disabled}
      data-disabled={disabled || undefined}
      onClick={(event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (event.target === event.currentTarget && !disabled) {
          segmentRefs.current[0]?.focus();
        }
      }}
      {...otherProps}
    >
      {items.map((item) => {
        if (item.type === 'separator') {
          return (
            <Box
              key={item.id}
              as="span"
              className={classes.separator}
              data-gap={item.gap}
              aria-hidden="true"
              onClick={() => {
                if (disabled) return;
                const ownIndex = items.indexOf(item);
                const nextSegment = items
                  .slice(ownIndex + 1)
                  .find((nextItem): nextItem is SegmentItem => {
                    return nextItem.type === 'segment';
                  });
                if (!nextSegment) return;
                focusSegment(segmentIndexById[nextSegment.id] ?? 0);
              }}
            >
              {item.content}
            </Box>
          );
        }

        const value = values[item.id] ?? null;
        const segment = { ...item, value } as SegmentItem;
        const segmentIndex = segmentIndexById[item.id] ?? 0;
        const display = getSegmentDisplay(segment, rawInput[item.id]);
        const isPlaceholder =
          value == null && !((rawInput[item.id]?.length ?? 0) > 0);
        const segmentDisabled = disabled || item.disabled;

        return (
          <Box
            key={item.id}
            as="span"
            role="spinbutton"
            tabIndex={segmentDisabled ? -1 : 0}
            aria-label={item.label}
            aria-valuenow={typeof value === 'number' ? value : undefined}
            aria-valuemin={item.kind === 'numeric' ? item.min : undefined}
            aria-valuemax={item.kind === 'numeric' ? item.max : undefined}
            aria-valuetext={display}
            className={classes.segment}
            color={
              isPlaceholder
                ? segmentDisabled
                  ? 'text.disabled'
                  : 'text.placeholder'
                : undefined
            }
            data-focused={focusedSegmentId === item.id ? true : undefined}
            ref={(element: HTMLElement | null) => {
              segmentRefs.current[segmentIndex] = element;
            }}
            onFocus={() => {
              setFocusedSegmentId(item.id);
              onFocusWithin?.();
            }}
            onBlur={handleBlur}
            onKeyDown={(event: KeyboardEvent) => {
              if (segmentDisabled) return;
              handleKeyDown(event, segment, segmentIndex);
            }}
          >
            {display}
          </Box>
        );
      })}
    </Box>
  );
};
