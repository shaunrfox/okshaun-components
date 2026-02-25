import {
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  flip,
  offset as floatingOffset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
} from '@floating-ui/react';
import { cx } from '@styled-system/css';
import { timePicker, type TimePickerVariantProps } from '@styled-system/recipes';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '~/components/Box';
import type { BoxProps } from '~/components/Box';
import { TimeList } from './TimeList';
import type { HourCycle, TimeValue } from './TimeList';

export type { TimeValue, HourCycle };

// ─── Segment definitions ───────────────────────────────────────────────────────

type NumericSegType = 'hour' | 'minute';
type AmpmSegType = 'ampm';
type SegmentType = NumericSegType | AmpmSegType;

interface NumericSegDef {
  kind: 'numeric';
  type: NumericSegType;
  placeholder: string;
  digits: number;
  min: number;
  max: number;
}

interface AmpmSegDef {
  kind: 'ampm';
  type: AmpmSegType;
  placeholder: string;
}

type SegmentDef = NumericSegDef | AmpmSegDef;

function getSegments(hourCycle: HourCycle): SegmentDef[] {
  const hourMax = hourCycle === '12' ? 12 : 23;
  const hourMin = hourCycle === '12' ? 1 : 0;
  const segs: SegmentDef[] = [
    { kind: 'numeric', type: 'hour', placeholder: 'HH', digits: 2, min: hourMin, max: hourMax },
    { kind: 'numeric', type: 'minute', placeholder: 'MM', digits: 2, min: 0, max: 59 },
  ];
  if (hourCycle === '12') {
    segs.push({ kind: 'ampm', type: 'ampm', placeholder: 'AM' });
  }
  return segs;
}

type NumericValues = Record<NumericSegType, number | null>;
type NumericRaw = Record<NumericSegType, string>;

// ─── 12h ↔ 24h conversion ─────────────────────────────────────────────────────

function to12hDisplay(hour24: number): { hour12: number; ampm: 'AM' | 'PM' } {
  if (hour24 === 0) return { hour12: 12, ampm: 'AM' };
  if (hour24 < 12) return { hour12: hour24, ampm: 'AM' };
  if (hour24 === 12) return { hour12: 12, ampm: 'PM' };
  return { hour12: hour24 - 12, ampm: 'PM' };
}

function from12hDisplay(hour12: number, ampm: 'AM' | 'PM'): number {
  if (ampm === 'AM') return hour12 === 12 ? 0 : hour12;
  return hour12 === 12 ? 12 : hour12 + 12;
}

// ─── Auto-advance logic ────────────────────────────────────────────────────────

function shouldAutoAdvance(digit: number, raw: string, max: number, digits: number): boolean {
  const next = raw + String(digit);
  if (next.length >= digits) return true;
  if (Number(next) * 10 > max) return true;
  return false;
}

// ─── Props ─────────────────────────────────────────────────────────────────────

export type TimePickerProps = Omit<BoxProps, keyof TimePickerVariantProps | 'children'> &
  TimePickerVariantProps & {
    /** Controlled value — hour is always 24h (0–23) internally */
    value?: TimeValue | null;
    /** Called when the time changes */
    onChange?: (value: TimeValue | null) => void;
    /** 12-hour or 24-hour display */
    hourCycle?: HourCycle;
    /** Minute snap interval (default 1 = any minute) */
    minuteStep?: number;
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

// ─── TimePicker ────────────────────────────────────────────────────────────────

export const TimePicker = (props: TimePickerProps) => {
  const {
    value,
    onChange,
    hourCycle = '12',
    minuteStep = 1,
    label = 'Time',
    disabled = false,
    error = false,
    size,
    open: controlledOpen,
    onOpenChange,
    className,
    ...rest
  } = props;

  const segments = getSegments(hourCycle);

  // ── Segment state ──────────────────────────────────────────────────────────
  const initNumericValues = (v: TimeValue | null | undefined): NumericValues => {
    if (!v) return { hour: null, minute: null };
    if (hourCycle === '12') {
      return { hour: to12hDisplay(v.hour).hour12, minute: v.minute };
    }
    return { hour: v.hour, minute: v.minute };
  };

  const initAmpm = (v: TimeValue | null | undefined): 'AM' | 'PM' | null => {
    if (!v || hourCycle !== '12') return null;
    return to12hDisplay(v.hour).ampm;
  };

  const [numericVals, setNumericVals] = useState<NumericValues>(() => initNumericValues(value));
  const [rawInput, setRawInput] = useState<NumericRaw>({ hour: '', minute: '' });
  const [ampm, setAmpm] = useState<'AM' | 'PM' | null>(() => initAmpm(value));
  const [_focusedSegment, setFocusedSegment] = useState<SegmentType | null>(null);

  // ── Popover state ──────────────────────────────────────────────────────────
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;

  const handleOpenChange = useCallback((next: boolean) => {
    setInternalOpen(next);
    onOpenChange?.(next);
  }, [onOpenChange]);

  // ── Sync external value ────────────────────────────────────────────────────
  // biome-ignore lint/correctness/useExhaustiveDependencies: initNumericValues and initAmpm are stable helpers that only depend on hourCycle, which is already in deps
  useEffect(() => {
    if (value !== undefined) {
      setNumericVals(initNumericValues(value));
      setAmpm(initAmpm(value));
    }
  }, [value, hourCycle]);

  // ── Floating UI ────────────────────────────────────────────────────────────
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: handleOpenChange,
    placement: 'bottom-start',
    middleware: [floatingOffset(4), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context, { bubbles: false });
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  // ── Segment refs ───────────────────────────────────────────────────────────
  const segmentRefs = useRef<(HTMLElement | null)[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const setContainerRef = useCallback((el: HTMLDivElement | null) => {
    containerRef.current = el;
    refs.setReference(el);
  }, [refs.setReference]);

  const focusSegment = useCallback((index: number) => {
    segmentRefs.current[index]?.focus();
  }, []);

  const handleSegmentBlur = useCallback((e: React.FocusEvent) => {
    setFocusedSegment(null);
    const related = e.relatedTarget as Node | null;
    if (
      !containerRef.current?.contains(related) &&
      !refs.floating.current?.contains(related)
    ) {
      handleOpenChange(false);
    }
  }, [refs.floating, handleOpenChange]);

  // ── Emit change ────────────────────────────────────────────────────────────
  const emitChange = useCallback((vals: NumericValues, meridiem: 'AM' | 'PM' | null) => {
    if (vals.hour === null || vals.minute === null) {
      // Don't emit null until all fields are cleared
      return;
    }
    const hour24 = hourCycle === '12'
      ? from12hDisplay(vals.hour, meridiem ?? 'AM')
      : vals.hour;
    onChange?.({ hour: hour24, minute: vals.minute });
  }, [hourCycle, onChange]);

  // ── Keyboard handler ───────────────────────────────────────────────────────
  const handleSegmentKeyDown = useCallback((
    e: React.KeyboardEvent,
    segIdx: number,
  ) => {
    const seg = segments[segIdx];
    if (!seg) return;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusSegment(Math.max(0, segIdx - 1));
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusSegment(Math.min(segments.length - 1, segIdx + 1));
      return;
    }

    if (e.key === 'Escape') {
      handleOpenChange(false);
      return;
    }

    // AM/PM segment
    if (seg.kind === 'ampm') {
      if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        setAmpm('AM');
        emitChange(numericVals, 'AM');
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        setAmpm('PM');
        emitChange(numericVals, 'PM');
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = ampm === 'AM' ? 'PM' : 'AM';
        setAmpm(next);
        emitChange(numericVals, next);
      }
      return;
    }

    // Numeric segment
    const { type, min, max, digits } = seg;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const step = type === 'minute' ? minuteStep : 1;
      const currentVal = numericVals[type];
      let next: number;
      if (currentVal === null) {
        next = Math.floor(max / step) * step;
      } else {
        const steppedDown = Math.ceil(currentVal / step) * step - step;
        next = steppedDown < min ? Math.floor(max / step) * step : steppedDown;
      }
      const newVals = { ...numericVals, [type]: next };
      setNumericVals(newVals);
      setRawInput(prev => ({ ...prev, [type]: '' }));
      emitChange(newVals, ampm);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const step = type === 'minute' ? minuteStep : 1;
      const currentVal = numericVals[type];
      let next: number;
      if (currentVal === null) {
        next = min;
      } else {
        const steppedUp = Math.floor(currentVal / step) * step + step;
        next = steppedUp > max ? min : steppedUp;
      }
      const newVals = { ...numericVals, [type]: next };
      setNumericVals(newVals);
      setRawInput(prev => ({ ...prev, [type]: '' }));
      emitChange(newVals, ampm);
      return;
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      const raw = rawInput[type];
      if (raw.length > 0) {
        setRawInput(prev => ({ ...prev, [type]: raw.slice(0, -1) }));
      } else {
        setNumericVals(prev => {
          const next = { ...prev, [type]: null };
          return next;
        });
      }
      return;
    }

    if (/^\d$/.test(e.key)) {
      e.preventDefault();
      const currentRaw = rawInput[type];
      const digit = Number(e.key);
      const newRaw = currentRaw + e.key;
      const newVal = Math.min(Math.max(Number(newRaw), min), max);

      if (shouldAutoAdvance(digit, currentRaw, max, digits)) {
        const newVals = { ...numericVals, [type]: newVal };
        setNumericVals(newVals);
        setRawInput(prev => ({ ...prev, [type]: '' }));
        emitChange(newVals, ampm);

        if (segIdx < segments.length - 1) {
          focusSegment(segIdx + 1);
        }
      } else {
        setRawInput(prev => ({ ...prev, [type]: newRaw }));
        setNumericVals(prev => {
          const next = { ...prev, [type]: newVal };
          emitChange(next, ampm);
          return next;
        });
      }
    }
  }, [segments, numericVals, rawInput, ampm, minuteStep, focusSegment, emitChange, handleOpenChange]);

  // ── TimeList selection ─────────────────────────────────────────────────────
  const handleTimeListSelect = useCallback((tv: TimeValue) => {
    const display = hourCycle === '12' ? to12hDisplay(tv.hour) : null;
    setNumericVals({
      hour: display ? display.hour12 : tv.hour,
      minute: tv.minute,
    });
    setRawInput({ hour: '', minute: '' });
    if (display) setAmpm(display.ampm);
    onChange?.(tv);
    handleOpenChange(false);
  }, [hourCycle, onChange, handleOpenChange]);

  // ── Recipe classes ─────────────────────────────────────────────────────────
  const classes = timePicker({ size });

  // ── Values passed directly to TimeList (display format) ──────────────────
  // numericVals.hour is already in display format (1–12 for 12h, 0–23 for 24h)
  const selectedDisplayHour = numericVals.hour;
  const selectedMinute = numericVals.minute;

  // ── Render segments ────────────────────────────────────────────────────────
  const renderSegments = () => {
    const items: React.ReactNode[] = [];

    segments.forEach((seg, idx) => {
      if (seg.kind === 'ampm') {
        const display = ampm ?? seg.placeholder;
        items.push(
          <Box
            key="ampm"
            as="span"
            role="spinbutton"
            tabIndex={disabled ? -1 : 0}
            aria-label="AM or PM"
            aria-valuetext={display}
            className={classes.segment}
            color={ampm === null ? (error ? 'text.danger' : 'text.placeholder') : undefined}
            ref={(el: HTMLElement | null) => {
              segmentRefs.current[idx] = el;
            }}
            onFocus={() => { setFocusedSegment('ampm'); if (!disabled) handleOpenChange(true); }}
            onBlur={handleSegmentBlur}
            onKeyDown={(e: React.KeyboardEvent) => handleSegmentKeyDown(e, idx)}
          >
            {display}
          </Box>,
        );
        return;
      }

      // Numeric segment
      const val = numericVals[seg.type];
      const raw = rawInput[seg.type];
      let display: string;
      if (raw.length > 0) {
        display = raw;
      } else if (val !== null) {
        display = String(val).padStart(2, '0');
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
          color={isPlaceholder ? (error ? 'text.danger' : 'text.placeholder') : undefined}
          ref={(el: HTMLElement | null) => {
            segmentRefs.current[idx] = el;
          }}
          onFocus={() => { setFocusedSegment(seg.type); if (!disabled) handleOpenChange(true); }}
          onBlur={handleSegmentBlur}
          onKeyDown={(e: React.KeyboardEvent) => handleSegmentKeyDown(e, idx)}
        >
          {display}
        </Box>,
      );

      // Add ":" separator after hour, before minute
      if (seg.type === 'hour') {
        items.push(
          <Box key="sep-hour-min" as="span" className={classes.separator} aria-hidden="true">
            :
          </Box>,
        );
      }
      // Add space separator before AM/PM
      if (seg.type === 'minute' && hourCycle === '12') {
        items.push(
          <Box key="sep-min-ampm" as="span" className={classes.separator} aria-hidden="true">
            {' '}
          </Box>,
        );
      }
    });

    return items;
  };

  return (
    <Box className={cx(classes.root, className)} {...rest}>
      {/* Segmented input */}
      <Box
        ref={setContainerRef}
        className={classes.input}
        role="group"
        aria-label={label}
        aria-disabled={disabled}
        data-error={error ? true : undefined}
        data-open={isOpen || undefined}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          if (e.target === e.currentTarget && !disabled) segmentRefs.current[0]?.focus();
        }}
        {...(getReferenceProps() as Record<string, unknown>)}
      >
        {renderSegments()}
      </Box>

      {/* Popover time list */}
      {isOpen && !disabled && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
            <Box
              ref={refs.setFloating}
              className={classes.popover}
              style={floatingStyles}
              {...(getFloatingProps() as Record<string, unknown>)}
              role="dialog"
              aria-label="Choose time"
              aria-modal={false}
            >
              <TimeList
                selectedHour={selectedDisplayHour}
                selectedMinute={selectedMinute}
                selectedMeridiem={ampm}
                onSelect={handleTimeListSelect}
                hourCycle={hourCycle}
                minuteStep={minuteStep}
                classes={classes}
              />
            </Box>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </Box>
  );
};
