import type React from 'react';
import { Box } from '~/components/Box';
import { TimePicker } from '../TimePicker/TimePicker';
import type { HourCycle, TimePickerProps, TimeValue } from '../TimePicker/TimePicker';

export type TimeRangePickerProps = {
  /** Start time value (hour in 24h format, 0–23) */
  startValue?: TimeValue | null;
  /** End time value (hour in 24h format, 0–23) */
  endValue?: TimeValue | null;
  /** Called when start time changes */
  onStartChange?: (value: TimeValue | null) => void;
  /** Called when end time changes */
  onEndChange?: (value: TimeValue | null) => void;
  hourCycle?: HourCycle;
  minuteStep?: number;
  disabled?: boolean;
  error?: boolean;
  /** Size passed to both TimePickers */
  size?: TimePickerProps['size'];
  /** Accessible label prefix — used to build "Start time" and "End time" labels */
  label?: string;
};

export const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  hourCycle = '12',
  minuteStep = 1,
  disabled = false,
  error = false,
  size,
  label = 'Time',
}) => {
  return (
    <Box display="flex" alignItems="center" gap="8">
      <TimePicker
        value={startValue}
        onChange={onStartChange}
        hourCycle={hourCycle}
        minuteStep={minuteStep}
        label={`Start ${label}`}
        disabled={disabled}
        error={error}
        size={size}
      />
      <TimePicker
        value={endValue}
        onChange={onEndChange}
        hourCycle={hourCycle}
        minuteStep={minuteStep}
        label={`End ${label}`}
        disabled={disabled}
        error={error}
        size={size}
      />
    </Box>
  );
};
