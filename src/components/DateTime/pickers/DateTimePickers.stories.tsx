import type { Meta, StoryObj } from '@storybook/react';

import { Grid, VStack } from '@styled-system/jsx';
import { useState } from 'react';
import { Text } from '~/components/Text';
import type {
  DateRangeValue,
  DateTimeRangeValue,
  DateTimeValue,
  DateValue,
  TimeRangeValue,
  TimeValue,
} from '../helpers/types';
import { DatePicker } from './DatePicker';
import { DateRangePicker } from './DateRangePicker';
import { DateTimePicker } from './DateTimePicker';
import { DateTimeRangePicker } from './DateTimeRangePicker';
import { TimePicker } from './TimePicker';
import { TimeRangePicker } from './TimeRangePicker';

/**
 * The six Date/Time pickers — each composes an Input (typed segmented entry)
 * with a Menu (calendar/column popover) sharing the same trigger, matching
 * the multi-part-composition standard: the picker owns the committed value
 * and open state, and passes both down to its Input and Menu halves so they
 * always agree. `timeFormat` is a real prop, not a toggle — each 12h/24h story
 * passes a different fixed value.
 */
const meta = {
  title: 'Components/DateTime/Pickers',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <VStack width="full" alignItems="center" pt="16" pb="16">
        <Story />
      </VStack>
    ),
  ],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const formatDate = (value: DateValue | null | undefined) =>
  value
    ? `${value.year}-${String(value.month).padStart(2, '0')}-${String(value.day).padStart(2, '0')}`
    : 'none';

const formatTime = (value: TimeValue | null | undefined) =>
  value
    ? `${String(value.hour).padStart(2, '0')}:${String(value.minute).padStart(2, '0')}`
    : 'none';

const formatDateTime = (value: DateTimeValue | null | undefined) =>
  `${formatDate(value?.date)} ${formatTime(value?.time)}`;

// =============================================================================
// DatePicker
// =============================================================================

export const DatePickers: Story = {
  name: 'DatePicker',
  render: function DatePickerRender() {
    const [value, setValue] = useState<DateValue | null>(null);
    const [value2, setValue2] = useState<DateValue | null>(null);

    return (
      <Grid columns={2} gap="56">
        <VStack gap="8" alignItems="flex-start">
          <Text color="text">Format: YYYY-MM-DD</Text>
          <DatePicker label="Date" value={value} onChange={setValue} />
          <Text textStyle="mono.xs" color="text.subtlest">
            Value: {formatDate(value)}
          </Text>
        </VStack>
        <VStack gap="8" alignItems="flex-start">
          <Text color="text">Format: MM/DD/YYYY</Text>
          <DatePicker
            dateFormat="MM/DD/YYYY"
            label="Date"
            value={value2}
            onChange={setValue2}
          />
          <Text textStyle="mono.xs" color="text.subtlest">
            Value: {formatDate(value2)}
          </Text>
        </VStack>
      </Grid>
    );
  },
};

// =============================================================================
// DateRangePicker
// =============================================================================

export const DateRange: Story = {
  name: 'DateRangePicker',
  render: function DateRangePickerRender() {
    const [value, setValue] = useState<DateRangeValue | null>(null);
    const [value2, setValue2] = useState<DateRangeValue | null>(null);

    return (
      <Grid columns={2} gap="56">
        <VStack gap="8" alignItems="flex-start">
          <Text color="text">Format: YYYY-MM-DD</Text>
          <DateRangePicker
            startLabel="Start date"
            endLabel="End date"
            value={value}
            onChange={setValue}
          />
          <Text textStyle="mono.xs" color="text.subtlest">
            Value: {formatDate(value?.start)} – {formatDate(value?.end)}
          </Text>
        </VStack>
        <VStack gap="8" alignItems="flex-start">
          <Text color="text">Format: MM/DD/YYYY</Text>
          <DateRangePicker
            dateFormat="MM/DD/YYYY"
            startLabel="Start date"
            endLabel="End date"
            value={value2}
            onChange={setValue2}
          />
          <Text textStyle="mono.xs" color="text.subtlest">
            Value: {formatDate(value2?.start)} – {formatDate(value2?.end)}
          </Text>
        </VStack>
      </Grid>
    );
  },
};

// =============================================================================
// TimePicker
// =============================================================================

export const TimePickers: Story = {
  name: 'TimePicker',
  render: function TimePickerRender() {
    const [value, setValue] = useState<TimeValue | null>(null);
    const [value2, setValue2] = useState<TimeValue | null>(null);

    return (
      <Grid columns={2} gap="56">
        <VStack gap="8" alignItems="flex-start">
          <Text color="text">12hr</Text>
          <TimePicker
            label="Time"
            value={value}
            onChange={setValue}
            timeFormat="12"
          />
          <Text textStyle="mono.xs" color="text.subtlest">
            Value: {formatTime(value)}
          </Text>
        </VStack>
        <VStack gap="8" alignItems="flex-start">
          <Text color="text">24hr</Text>
          <TimePicker
            label="Time"
            value={value2}
            onChange={setValue2}
            timeFormat="24"
          />
          <Text textStyle="mono.xs" color="text.subtlest">
            Value: {formatTime(value2)}
          </Text>
        </VStack>
      </Grid>
    );
  },
};

// =============================================================================
// TimeRangePicker
// =============================================================================

export const TimeRangePickers: Story = {
  name: 'TimeRangePicker',
  render: function TimeRangePickerRender() {
    const [value, setValue] = useState<TimeRangeValue | null>(null);
    const [value2, setValue2] = useState<TimeRangeValue | null>(null);

    return (
      <Grid columns={2} gap="56">
        <VStack gap="8" alignItems="flex-start">
          <Text color="text">12hr</Text>
          <TimeRangePicker
            startLabel="Start time"
            endLabel="End time"
            value={value}
            onChange={setValue}
            timeFormat="12"
          />
          <Text textStyle="mono.xs" color="text.subtlest">
            Value: {formatTime(value?.start)} – {formatTime(value?.end)}
          </Text>
        </VStack>
        <VStack gap="8" alignItems="flex-start">
          <Text color="text">24hr</Text>
          <TimeRangePicker
            startLabel="Start time"
            endLabel="End time"
            value={value2}
            onChange={setValue2}
            timeFormat="24"
          />
          <Text textStyle="mono.xs" color="text.subtlest">
            Value: {formatTime(value2?.start)} – {formatTime(value2?.end)}
          </Text>
        </VStack>
      </Grid>
    );
  },
};

// =============================================================================
// DateTimePicker
// =============================================================================

export const DateTimePickers: Story = {
  name: 'DateTimePicker',
  render: function DateTimePickerRender() {
    const [value, setValue] = useState<DateTimeValue | null>(null);
    const [value2, setValue2] = useState<DateTimeValue | null>(null);

    return (
      <Grid columns={2} gap="56">
        <VStack gap="8" alignItems="flex-start">
          <Text color="text">Format: YYYY-MM-DD, 12hr</Text>
          <DateTimePicker
            dateLabel="Date"
            timeLabel="Time"
            value={value}
            onChange={setValue}
            timeFormat="12"
          />
          <Text textStyle="mono.xs" color="text.subtlest">
            Selected: {formatDateTime(value)}
          </Text>
        </VStack>
        <VStack gap="8" alignItems="flex-start">
          <Text color="text">Format: MM/DD/YYYY, 24hr</Text>
          <DateTimePicker
            dateLabel="Date"
            timeLabel="Time"
            value={value2}
            onChange={setValue2}
            dateFormat="MM/DD/YYYY"
            timeFormat="24"
          />
          <Text textStyle="mono.xs" color="text.subtlest">
            Selected: {formatDateTime(value2)}
          </Text>
        </VStack>
      </Grid>
    );
  },
};

// =============================================================================
// DateTimeRangePicker — composes two DateTimePickers; reflows via ResizeObserver
// =============================================================================

export const DateTimeRangePickers: Story = {
  name: 'DateTimeRangePicker',
  render: function DateTimeRangePickerRender() {
    const [value, setValue] = useState<DateTimeRangeValue | null>(null);

    return (
      <VStack gap="8" alignItems="flex-start" width="lg">
        <DateTimeRangePicker
          value={value}
          onChange={setValue}
          timeFormat="12"
        />
        <Text textStyle="mono.xs" color="text.subtlest">
          Value: {formatDateTime(value?.start)} – {formatDateTime(value?.end)}
        </Text>
      </VStack>
    );
  },
};
