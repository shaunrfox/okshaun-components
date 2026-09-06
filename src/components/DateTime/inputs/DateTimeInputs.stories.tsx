import type { Meta, StoryObj } from '@storybook/react';

import { Grid, HStack, VStack } from '@styled-system/jsx';
import { useState } from 'react';
import { Icon } from '~/components/Icon';
import { IconButton } from '~/components/IconButton';
import { Text } from '~/components/Text';
import type {
  DateRangeValue,
  DateTimeValue,
  DateValue,
  TimeRangeValue,
  TimeValue,
} from '../helpers/types';
import { DateInput } from './DateInput';
import { DateRangeInput } from './DateRangeInput';
import { DateTimeInput } from './DateTimeInput';
import { TimeInput } from './TimeInput';
import { TimeRangeInput } from './TimeRangeInput';

/**
 * Segmented Date/Time input fields — DateInput, DateRangeInput, TimeInput,
 * TimeRangeInput, and DateTimeInput. Each wraps SegmentedDate/SegmentedTime
 * in a bordered field with the same before/after slot mechanics as TextInput.
 * These are standalone fields — no popover/calendar/menu attached yet
 * (that's the Menus phase); typing and arrow-key stepping work on their own.
 */
const meta = {
  title: 'Components/DateTime/Inputs',
  component: DateInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DateInput>;

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

// =============================================================================
// DEFAULT — one of each field
// =============================================================================

const DefaultDemo = () => {
  const [date, setDate] = useState<DateValue | null>(null);
  const [time, setTime] = useState<TimeValue | null>(null);
  const [dateRange, setDateRange] = useState<DateRangeValue | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRangeValue | null>(null);
  const [dateTime, setDateTime] = useState<DateTimeValue | null>(null);

  return (
    <VStack gap="16" alignItems="flex-start">
      <VStack gap="4" alignItems="flex-start">
        <Text textStyle="mono.xs" color="text.subtlest">
          DateInput — {formatDate(date)}
        </Text>
        <DateInput value={date} onChange={setDate} />
      </VStack>
      <VStack gap="4" alignItems="flex-start">
        <Text textStyle="mono.xs" color="text.subtlest">
          TimeInput — {formatTime(time)}
        </Text>
        <TimeInput value={time} onChange={setTime} />
      </VStack>
      <VStack gap="4" alignItems="flex-start">
        <Text textStyle="mono.xs" color="text.subtlest">
          DateRangeInput — {formatDate(dateRange?.start)} –{' '}
          {formatDate(dateRange?.end)}
        </Text>
        <DateRangeInput value={dateRange} onChange={setDateRange} />
      </VStack>
      <VStack gap="4" alignItems="flex-start">
        <Text textStyle="mono.xs" color="text.subtlest">
          TimeRangeInput — {formatTime(timeRange?.start)} –{' '}
          {formatTime(timeRange?.end)}
        </Text>
        <TimeRangeInput value={timeRange} onChange={setTimeRange} />
      </VStack>
      <VStack gap="4" alignItems="flex-start">
        <Text textStyle="mono.xs" color="text.subtlest">
          DateTimeInput — {formatDate(dateTime?.date)}{' '}
          {formatTime(dateTime?.time)}
        </Text>
        <DateTimeInput value={dateTime} onChange={setDateTime} />
      </VStack>
    </VStack>
  );
};

export const Default: Story = {
  render: () => <DefaultDemo />,
};

// =============================================================================
// SIZES
// =============================================================================

export const Sizes: Story = {
  render: () => (
    <VStack gap="8" alignItems="flex-start">
      <DateInput size="sm" label="Small" />
      <DateInput size="md" label="Medium" />
      <DateInput size="lg" label="Large" />
      <DateInput size="xl" label="Extra large" />
    </VStack>
  ),
};

// =============================================================================
// BEFORE / AFTER SLOTS
// =============================================================================

export const BeforeAfterSlots: Story = {
  render: () => (
    <VStack gap="8" alignItems="flex-start">
      <DateInput before={<Icon name="calendar" aria-hidden />} />
      <DateInput
        after={
          <IconButton
            variant="ghost"
            altText="Open calendar"
            iconName="calendar"
          />
        }
      />
      <TimeInput before={<Icon name="clock" aria-hidden />} />
    </VStack>
  ),
};

// =============================================================================
// STATES
// =============================================================================

export const States: Story = {
  render: () => (
    <Grid columns={2} gap="8" alignItems="center">
      <Text>default</Text>
      <DateInput label="Default" />
      <Text>disabled</Text>
      <DateInput
        label="Disabled"
        disabled
        value={{ year: 2026, month: 7, day: 13 }}
      />
      <Text>error</Text>
      <DateInput
        label="Error"
        error
        value={{ year: 2026, month: 7, day: 13 }}
      />
    </Grid>
  ),
};

// =============================================================================
// Ex: Expense date range with a trigger icon
// =============================================================================

const ExpenseDateRangeDemo = () => {
  const [range, setRange] = useState<DateRangeValue | null>({
    start: { year: 2026, month: 5, day: 1 },
    end: { year: 2026, month: 6, day: 9 },
  });

  return (
    <VStack gap="4" alignItems="flex-start">
      <Text textStyle="body.sm" fontWeight="medium">
        Expense date range
      </Text>
      <HStack gap="8">
        <DateRangeInput
          value={range}
          onChange={setRange}
          before={<Icon name="calendar" aria-hidden />}
        />
      </HStack>
    </VStack>
  );
};

export const ExExpenseDateRange: Story = {
  name: 'Ex: Expense Date Range',
  render: () => <ExpenseDateRangeDemo />,
};
