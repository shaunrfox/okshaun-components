import { Box } from '~/components/Box';
import { Text } from '~/components/Text';

import {
  DatePicker,
  type DatePickerProps,
  type DateValue,
} from '../DatePicker/DatePicker';

export type DateRangePickerProps = {
  /** Start date value */
  startValue?: DateValue | null;
  /** End date value */
  endValue?: DateValue | null;
  /** Called when start date changes */
  onStartChange?: (value: DateValue | null) => void;
  /** Called when end date changes */
  onEndChange?: (value: DateValue | null) => void;
  /** Earliest selectable date (applies to both pickers) */
  minDate?: DateValue;
  /** Latest selectable date (applies to both pickers) */
  maxDate?: DateValue;
  disabled?: boolean;
  error?: boolean;
  /** Size passed to both DatePickers */
  size?: DatePickerProps['size'];
  /** Accessible label prefix — used to build "Start date" and "End date" labels */
  label?: string;
};

export const DateRangePicker = (props: DateRangePickerProps) => {
  const {
    startValue,
    endValue,
    onStartChange,
    onEndChange,
    minDate,
    maxDate,
    disabled = false,
    error = false,
    size,
    label = 'Date',
  } = props;
  return (
    <Box display="flex" alignItems="center" gap="8">
      <DatePicker
        value={startValue}
        onChange={onStartChange}
        // Start can't be after end
        minDate={minDate}
        maxDate={endValue ?? maxDate}
        label={`Start ${label}`}
        disabled={disabled}
        error={error}
        size={size}
      />
      <Text color={disabled ? 'text.disabled' : 'text.subtlest'}>&ndash;</Text>
      <DatePicker
        value={endValue}
        onChange={onEndChange}
        // End can't be before start
        minDate={startValue ?? minDate}
        maxDate={maxDate}
        label={`End ${label}`}
        disabled={disabled}
        error={error}
        size={size}
      />
    </Box>
  );
};
