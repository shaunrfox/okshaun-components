import type { Meta, StoryObj } from '@storybook/react';

import { VStack } from '@styled-system/jsx';
import { useState } from 'react';
import type { DateValue } from '~/components/DateTime/helpers';
import { Text } from '~/components/Text';
import { Calendar } from './Calendar';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Standalone Days/Months/Years calendar grid. No popover, no input field, no picker — this is the pure selection surface that DateMenu/DateTimeMenu and eventually the pickers compose on top of.',
      },
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

const formatDate = (value: DateValue | null) =>
  value
    ? `${value.year}-${String(value.month).padStart(2, '0')}-${String(value.day).padStart(2, '0')}`
    : 'none';

// =============================================================================
// DEFAULT
// =============================================================================

const DefaultDemo = () => {
  const [value, setValue] = useState<DateValue | null>(null);
  return (
    <VStack gap="8" alignItems="flex-start">
      <Calendar value={value} onChange={setValue} />
      <Text textStyle="mono.xs" color="text.subtlest">
        Selected: {formatDate(value)}
      </Text>
    </VStack>
  );
};

export const Default: Story = {
  render: () => <DefaultDemo />,
};

// =============================================================================
// WITH INITIAL SELECTION
// =============================================================================

const WithSelectionDemo = () => {
  const [value, setValue] = useState<DateValue | null>({
    year: 2026,
    month: 7,
    day: 13,
  });
  return <Calendar value={value} onChange={setValue} />;
};

export const WithSelection: Story = {
  render: () => <WithSelectionDemo />,
};

// =============================================================================
// MIN / MAX BOUNDS
// =============================================================================

const BoundedDemo = () => {
  const [value, setValue] = useState<DateValue | null>(null);
  return (
    <VStack gap="8" alignItems="flex-start">
      <Text textStyle="mono.xs" color="text.subtlest">
        Bounded to 2026-07-01 through 2026-07-24 — everything outside that
        window is disabled at the day, month, and year level.
      </Text>
      <Calendar
        value={value}
        onChange={setValue}
        minDate={{ year: 2026, month: 7, day: 1 }}
        maxDate={{ year: 2026, month: 7, day: 24 }}
        defaultViewDate={{ year: 2026, month: 7 }}
      />
    </VStack>
  );
};

export const MinMaxBounds: Story = {
  render: () => <BoundedDemo />,
};

// =============================================================================
// DISABLED
// =============================================================================

export const Disabled: Story = {
  render: () => (
    <Calendar
      disabled
      value={{ year: 2026, month: 7, day: 13 }}
      defaultViewDate={{ year: 2026, month: 7 }}
    />
  ),
};

// =============================================================================
// Ex: Months/Years drill-down
// =============================================================================

const DrillDownDemo = () => {
  const [value, setValue] = useState<DateValue | null>(null);
  return (
    <VStack gap="8" alignItems="flex-start">
      <Text textStyle="mono.xs" color="text.subtlest">
        Click the "Month Year" header label to jump to the Months view, then the
        year label to jump to Years — the standard fast-navigation drill-down
        for picking a date far from today.
      </Text>
      <Calendar
        value={value}
        onChange={setValue}
        defaultViewDate={{ year: 2026, month: 7 }}
      />
    </VStack>
  );
};

export const ExDrillDownNavigation: Story = {
  name: 'Ex: Drill-Down Navigation',
  render: () => <DrillDownDemo />,
};
