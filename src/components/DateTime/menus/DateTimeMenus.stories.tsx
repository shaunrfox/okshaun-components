import type { Meta, StoryObj } from '@storybook/react';

import { Grid, VStack } from '@styled-system/jsx';
import { useState } from 'react';
import { Text } from '~/components/Text';
import type {
  DateRangeValue,
  DateTimeValue,
  DateValue,
  TimeRangeValue,
  TimeValue,
} from '../helpers/types';
import { DateMenu } from './DateMenu';
import { DateRangeMenu } from './DateRangeMenu';
import { DateTimeMenu } from './DateTimeMenu';
import { TimeMenu } from './TimeMenu';
import { TimeRangeMenu } from './TimeRangeMenu';

/**
 * Menus for the Date/Time family — DateMenu, DateRangeMenu, TimeMenu,
 * TimeRangeMenu, and DateTimeMenu. These stories render the menus inline so
 * their panels are visible without first opening a trigger popover. Range
 * menus and DateTimeMenu hold a pending/draft selection with Cancel/Apply
 * footer actions; DateMenu/TimeMenu commit immediately on selection.
 *
 * `timeFormat` is a real prop, not a toggle — each 12h/24h story just passes
 * a different fixed value.
 */
const meta = {
  title: 'Components/DateTime/Menus',
  component: DateMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DateMenu>;

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
// DEFAULT — DateMenu, standalone, immediate commit
// =============================================================================

export const DateMenus: Story = {
  name: 'DateMenu',
  render: function DateMenuRender() {
    const [value, setValue] = useState<DateValue | null>(null);

    return (
      <VStack gap="8" alignItems="flex-start">
        <Text textStyle="mono.xs" color="text.subtlest">
          Selected: {formatDate(value)}
        </Text>
        <DateMenu inline value={value} onChange={setValue} />
      </VStack>
    );
  },
};

// =============================================================================
// Ex: Expense date range
// =============================================================================

export const DateRange: Story = {
  name: 'DateRangeMenu',
  render: function ExExpenseDateRangeRender() {
    const [range, setRange] = useState<DateRangeValue | null>(null);

    return (
      <VStack gap="4" alignItems="flex-start">
        <Text textStyle="body.sm" fontWeight="medium">
          Selected: {formatDate(range?.start)} – {formatDate(range?.end)}
        </Text>
        <DateRangeMenu
          inline
          value={range}
          onChange={setRange}
          startLabel="Expense start"
          endLabel="Expense end"
        />
      </VStack>
    );
  },
};

// =============================================================================
// TimeMenu — standalone, scrollable HR/MIN/AM-PM columns
// =============================================================================

export const TimeMenus: Story = {
  name: 'TimeMenu',
  render: function TimeMenu12hRender() {
    const [value, setValue] = useState<TimeValue | null>(null);

    return (
      <Grid columns={2} gap="56">
        <VStack gap="8" alignItems="flex-start">
          <VStack gap="0" alignItems="flex-start">
            <Text color="text">12hr</Text>
            <Text textStyle="mono.xs" color="text.subtlest">
              Selected: {formatTime(value)}
            </Text>
          </VStack>
          <TimeMenu inline value={value} onChange={setValue} timeFormat="12" />
        </VStack>
        <VStack gap="8" alignItems="flex-start">
          <VStack gap="0" alignItems="flex-start">
            <Text color="text">24hr</Text>
            <Text textStyle="mono.xs" color="text.subtlest">
              Selected: {formatTime(value)}
            </Text>
          </VStack>
          <TimeMenu inline value={value} onChange={setValue} timeFormat="24" />
        </VStack>
      </Grid>
    );
  },
};

// =============================================================================
// TimeRangeMenu — doubled columns, Cancel/Apply
// =============================================================================

export const TimeRangeMenus: Story = {
  name: 'TimeRangeMenu',
  render: function TimeRangeMenu12hRender() {
    const [value, setValue] = useState<TimeRangeValue | null>(null);

    return (
      <Grid columns={2} gap="56">
        <VStack gap="8" alignItems="flex-start">
          <VStack gap="0" alignItems="flex-start">
            <Text color="text">12hr</Text>
            <Text textStyle="mono.xs" color="text.subtlest">
              Selected: {formatTime(value?.start)} – {formatTime(value?.end)}
            </Text>
          </VStack>
          <TimeRangeMenu
            inline
            value={value}
            onChange={setValue}
            timeFormat="12"
          />
        </VStack>
        <VStack gap="8" alignItems="flex-start">
          <VStack gap="0" alignItems="flex-start">
            <Text color="text">24hr</Text>
            <Text textStyle="mono.xs" color="text.subtlest">
              Selected: {formatTime(value?.start)} – {formatTime(value?.end)}
            </Text>
          </VStack>
          <TimeRangeMenu
            inline
            value={value}
            onChange={setValue}
            timeFormat="24"
          />
        </VStack>
      </Grid>
    );
  },
};

// =============================================================================
// DateTimeMenu — Calendar + time columns, always has Cancel/Apply
// =============================================================================

export const DateTimeMenus: Story = {
  name: 'DateTimeMenu',
  render: function DateTimeMenu12hRender() {
    const [value, setValue] = useState<DateTimeValue | null>(null);

    return (
      <Grid columns={2} gap="56">
        <VStack gap="8" alignItems="flex-start">
          <VStack gap="0" alignItems="flex-start">
            <Text color="text">12hr</Text>
            <Text textStyle="mono.xs" color="text.subtlest">
              Selected: {formatDate(value?.date)} {formatTime(value?.time)}
            </Text>
          </VStack>
          <DateTimeMenu
            inline
            value={value}
            onChange={setValue}
            timeFormat="12"
          />
        </VStack>
        <VStack gap="8" alignItems="flex-start">
          <VStack gap="0" alignItems="flex-start">
            <Text color="text">24hr</Text>
            <Text textStyle="mono.xs" color="text.subtlest">
              Selected: {formatDate(value?.date)} {formatTime(value?.time)}
            </Text>
          </VStack>
          <DateTimeMenu
            inline
            value={value}
            onChange={setValue}
            timeFormat="24"
          />
        </VStack>
      </Grid>
    );
  },
};
