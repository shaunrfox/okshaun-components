import {
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  flip,
  offset as floatingOffset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
} from '@floating-ui/react';
import { cx } from '@styled-system/css';
import { datePicker, type DatePickerVariantProps } from '@styled-system/recipes';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box } from '~/components/Box';
import type { BoxProps } from '~/components/Box';
import { Calendar } from './Calendar';
import type { DateValue } from './Calendar';

export type { DateValue };

// ─── Segment definitions ───────────────────────────────────────────────────────

type SegmentType = 'month' | 'day' | 'year';

interface SegmentDef {
  type: SegmentType;
  placeholder: string;
  digits: number;
  min: number;
  max: number;
}

const DATE_SEGMENTS: SegmentDef[] = [
  { type: 'month', placeholder: 'MM', digits: 2, min: 1, max: 12 },
  { type: 'day', placeholder: 'DD', digits: 2, min: 1, max: 31 },
  { type: 'year', placeholder: 'YYYY', digits: 4, min: 1900, max: 2100 },
];

type SegmentValues = Record<SegmentType, number | null>;
type SegmentRaw = Record<SegmentType, string>;

// ─── Auto-advance logic ────────────────────────────────────────────────────────

function shouldAutoAdvance(digit: number, raw: string, max: number, digits: number): boolean {
  const next = raw + String(digit);
  if (next.length >= digits) return true;
  if (Number(next) * 10 > max) return true;
  return false;
}

// ─── Segment → max day recalculation ──────────────────────────────────────────

function clampDay(day: number, month: number | null, year: number | null): number {
  const y = year ?? 2000; // use leap year if year unknown
  const m = month ?? 1;
  const max = new Date(y, m, 0).getDate();
  return Math.min(day, max);
}

// ─── Props ─────────────────────────────────────────────────────────────────────

export type DatePickerProps = Omit<BoxProps, keyof DatePickerVariantProps | 'children'> &
  DatePickerVariantProps & {
    /** Controlled value */
    value?: DateValue | null;
    /** Called when the date changes */
    onChange?: (value: DateValue | null) => void;
    /** Earliest selectable date */
    minDate?: DateValue;
    /** Latest selectable date */
    maxDate?: DateValue;
    /** Accessible label for the input group */
    label?: string;
    disabled?: boolean;
    error?: boolean;
    id?: string;
    name?: string;
    /** Controlled popover open state */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  };

// ─── DatePicker ────────────────────────────────────────────────────────────────

export const DatePicker = (props: DatePickerProps) => {
  const {
    value,
    onChange,
    minDate,
    maxDate,
    label = 'Date',
    disabled = false,
    error = false,
    id,
    size,
    open: controlledOpen,
    onOpenChange,
    className,
    ...rest
  } = props;

  // ── Segment state ──────────────────────────────────────────────────────────
  const [segments, setSegments] = useState<SegmentValues>(() => ({
    month: value?.month ?? null,
    day: value?.day ?? null,
    year: value?.year ?? null,
  }));
  const [rawInput, setRawInput] = useState<SegmentRaw>({ month: '', day: '', year: '' });
  const [focusedSegment, setFocusedSegment] = useState<SegmentType | null>(null);

  // ── Calendar view state ────────────────────────────────────────────────────
  const today = useMemo(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  }, []);
  const [viewYear, setViewYear] = useState(value?.year ?? today.year);
  const [viewMonth, setViewMonth] = useState(value?.month ?? today.month);

  // ── Popover state ──────────────────────────────────────────────────────────
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;

  const handleOpenChange = useCallback((next: boolean) => {
    setInternalOpen(next);
    onOpenChange?.(next);
  }, [onOpenChange]);

  // ── Sync external value → segment state ───────────────────────────────────
  useEffect(() => {
    if (value !== undefined) {
      setSegments({
        month: value?.month ?? null,
        day: value?.day ?? null,
        year: value?.year ?? null,
      });
      if (value) {
        setViewMonth(value.month);
        setViewYear(value.year);
      }
    }
  }, [value]);

  // ── Floating UI ────────────────────────────────────────────────────────────
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: handleOpenChange,
    placement: 'bottom-start',
    middleware: [floatingOffset(4), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const focus = useFocus(context);
  const dismiss = useDismiss(context, { bubbles: false });
  const { getReferenceProps, getFloatingProps } = useInteractions([focus, dismiss]);

  // ── Segment refs for programmatic focus ───────────────────────────────────
  const segmentRefs = useRef<(HTMLElement | null)[]>([]);

  const focusSegment = useCallback((index: number) => {
    segmentRefs.current[index]?.focus();
  }, []);

  // ── Segment → onChange emission ───────────────────────────────────────────
  const emitChange = useCallback((next: SegmentValues) => {
    if (next.month !== null && next.day !== null && next.year !== null) {
      onChange?.({ year: next.year, month: next.month, day: next.day });
    } else if (next.month === null && next.day === null && next.year === null) {
      onChange?.(null);
    }
  }, [onChange]);

  // ── Keyboard handler factory ───────────────────────────────────────────────
  const handleSegmentKeyDown = useCallback((
    e: React.KeyboardEvent,
    segIdx: number,
  ) => {
    const seg = DATE_SEGMENTS[segIdx];
    if (!seg) return;
    const { type } = seg;

    const updateSegment = (newVal: number | null, newRaw: string) => {
      const next = { ...segments, [type]: newVal };
      setSegments(next);
      setRawInput(prev => ({ ...prev, [type]: newRaw }));
      emitChange(next);
      return next;
    };

    if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        focusSegment(Math.max(0, segIdx - 1));
      }
      // Tab/Shift+Tab let through normally — browser handles Tab focus
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusSegment(Math.min(DATE_SEGMENTS.length - 1, segIdx + 1));
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const current = segments[type] ?? seg.min - 1;
      const next = current >= seg.max ? seg.min : current + 1;
      updateSegment(next, '');
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const current = segments[type] ?? seg.max + 1;
      const next = current <= seg.min ? seg.max : current - 1;
      updateSegment(next, '');
      return;
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      const raw = rawInput[type];
      if (raw.length > 0) {
        setRawInput(prev => ({ ...prev, [type]: raw.slice(0, -1) }));
      } else {
        updateSegment(null, '');
      }
      return;
    }

    if (e.key === 'Escape') {
      handleOpenChange(false);
      return;
    }

    // Digit input
    if (/^\d$/.test(e.key)) {
      e.preventDefault();
      const digit = Number(e.key);
      const currentRaw = rawInput[type];
      const newRaw = currentRaw + e.key;
      const newVal = Number(newRaw);

      // Clamp to valid range
      const clamped = Math.min(Math.max(newVal, seg.min), seg.max);

      if (shouldAutoAdvance(digit, currentRaw, seg.max, seg.digits)) {
        // Recalculate day max when month/year changes
        let finalVal = clamped;
        if (type === 'day') {
          finalVal = clampDay(clamped, segments.month, segments.year);
        }
        const next = updateSegment(finalVal, '');

        // Move to next segment
        if (segIdx < DATE_SEGMENTS.length - 1) {
          focusSegment(segIdx + 1);
        }

        // Sync calendar view to newly completed values
        if (type === 'month' && next.year) {
          setViewMonth(finalVal);
        } else if (type === 'year') {
          setViewYear(finalVal);
        }
      } else {
        setRawInput(prev => ({ ...prev, [type]: newRaw }));
        setSegments(prev => {
          const next = { ...prev, [type]: clamped };
          emitChange(next);
          return next;
        });
      }
    }
  }, [segments, rawInput, focusSegment, emitChange, handleOpenChange]);

  // ── Calendar date selection ────────────────────────────────────────────────
  const handleCalendarSelect = useCallback((date: DateValue) => {
    setSegments({ month: date.month, day: date.day, year: date.year });
    setRawInput({ month: '', day: '', year: '' });
    setViewMonth(date.month);
    setViewYear(date.year);
    onChange?.(date);
    handleOpenChange(false);
  }, [onChange, handleOpenChange]);

  const handleViewChange = useCallback((year: number, month: number) => {
    setViewYear(year);
    setViewMonth(month);
  }, []);

  // ── Recipe classes ─────────────────────────────────────────────────────────
  const classes = datePicker({ size });

  // ── Render segments ────────────────────────────────────────────────────────
  const renderSegments = () => {
    const items: React.ReactNode[] = [];

    DATE_SEGMENTS.forEach((seg, idx) => {
      const val = segments[seg.type];
      const raw = rawInput[seg.type];
      // Display: prefer current raw input (being typed), then committed value, then placeholder
      let display: string;
      if (raw.length > 0) {
        display = raw.padStart(seg.digits === 4 ? raw.length : 1, '');
      } else if (val !== null) {
        display = String(val).padStart(seg.digits === 4 ? seg.digits : 2, '0');
      } else {
        display = seg.placeholder;
      }

      const isPlaceholder = val === null && raw.length === 0;

      items.push(
        <Box
          key={seg.type}
          as="span"
          role="spinbutton"
          tabIndex={disabled ? -1 : 0}
          aria-label={seg.type.charAt(0).toUpperCase() + seg.type.slice(1)}
          aria-valuenow={val ?? undefined}
          aria-valuemin={seg.min}
          aria-valuemax={seg.max}
          aria-valuetext={display}
          className={classes.segment}
          color={isPlaceholder ? 'text.placeholder' : undefined}
          data-focused={focusedSegment === seg.type ? true : undefined}
          ref={(el: HTMLElement | null) => {
            segmentRefs.current[idx] = el;
          }}
          onFocus={() => setFocusedSegment(seg.type)}
          onBlur={() => setFocusedSegment(null)}
          onKeyDown={(e: React.KeyboardEvent) => handleSegmentKeyDown(e, idx)}
        >
          {display}
        </Box>,
      );

      if (idx < DATE_SEGMENTS.length - 1) {
        items.push(
          // biome-ignore lint/suspicious/noArrayIndexKey: separators are stable — fixed count, fixed positions between date segments
          <Box key={`sep-${idx}`} as="span" className={classes.separator} aria-hidden="true">
            /
          </Box>,
        );
      }
    });

    return items;
  };

  const dateValue: DateValue | null = segments.month !== null && segments.day !== null && segments.year !== null
    ? { month: segments.month, day: segments.day, year: segments.year }
    : null;

  return (
    <Box className={cx(classes.root, className)} {...rest}>
      {/* Segmented input container */}
      <Box
        ref={refs.setReference}
        className={classes.input}
        role="group"
        aria-label={label}
        aria-disabled={disabled}
        data-error={error ? true : undefined}
        {...(getReferenceProps() as Record<string, unknown>)}
      >
        {renderSegments()}
      </Box>

      {/* Popover calendar */}
      {isOpen && !disabled && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
            <Box
              ref={refs.setFloating}
              className={classes.popover}
              style={floatingStyles}
              {...(getFloatingProps() as Record<string, unknown>)}
              role="dialog"
              aria-label="Choose date"
              aria-modal={false}
            >
              <Calendar
                value={dateValue}
                onSelect={handleCalendarSelect}
                minDate={minDate}
                maxDate={maxDate}
                viewYear={viewYear}
                viewMonth={viewMonth}
                onViewChange={handleViewChange}
                classes={classes}
              />
            </Box>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </Box>
  );
};
