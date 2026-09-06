import type {
  SegmentedInputItem,
  SegmentedInputValueMap,
  SegmentItem,
} from './types';

export const getSegments = (items: readonly SegmentedInputItem[]) =>
  items.filter((item): item is SegmentItem => item.type === 'segment');

export const getInitialValues = (
  items: readonly SegmentedInputItem[],
): SegmentedInputValueMap => {
  return getSegments(items).reduce<SegmentedInputValueMap>((acc, segment) => {
    acc[segment.id] = segment.value;
    return acc;
  }, {});
};

export const stepNumericValue = (
  current: number | null,
  segment: Extract<SegmentItem, { kind: 'numeric' }>,
  direction: 'increment' | 'decrement',
): number => {
  const step = segment.step ?? 1;
  const maxAligned =
    segment.min + Math.floor((segment.max - segment.min) / step) * step;

  if (direction === 'increment') {
    if (current === null) return segment.min;
    const next = current + step;
    return next > segment.max ? segment.min : next;
  }

  if (current === null) return maxAligned;
  const next = current - step;
  return next < segment.min ? maxAligned : next;
};

export const shouldAutoAdvanceSegment = (
  digit: number,
  rawSoFar: string,
  max: number,
  digits: number,
) => {
  const next = rawSoFar + String(digit);
  if (next.length >= digits) return true;
  return Number(next) * 10 > max;
};

export const getSegmentDisplay = (
  segment: SegmentItem,
  rawInput: string | undefined,
) => {
  if (segment.kind === 'choice') {
    return typeof segment.value === 'string'
      ? segment.value
      : segment.placeholder;
  }

  if (rawInput && rawInput.length > 0) {
    return rawInput;
  }

  if (typeof segment.value === 'number') {
    return segment.format
      ? segment.format(segment.value)
      : String(segment.value).padStart(segment.digits, '0');
  }

  return segment.placeholder;
};
