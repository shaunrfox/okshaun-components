import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { DateRangePicker } from './DateRangePicker';
import type { DateValue } from '../DatePicker/DatePicker';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => <DateRangePicker />,
};

export const WithValues: Story = {
  name: 'With Values',
  render: () => (
    <DateRangePicker
      startValue={{ year: 2026, month: 2, day: 1 }}
      endValue={{ year: 2026, month: 2, day: 28 }}
    />
  ),
};

export const StartConstrainsEnd: Story = {
  name: 'Ex: Start Constrains End',
  render: () => {
    const [start, setStart] = useState<DateValue | null>(null);
    const [end, setEnd] = useState<DateValue | null>(null);

    const fmt = (v: DateValue | null) =>
      v
        ? `${v.year}-${String(v.month).padStart(2, '0')}-${String(v.day).padStart(2, '0')}`
        : 'none';

    return (
      <Box display="flex" flexDirection="column" gap="16">
        <DateRangePicker
          startValue={start}
          endValue={end}
          onStartChange={setStart}
          onEndChange={setEnd}
        />
        <Text size="14" color="text.subtle">
          Start: {fmt(start)} — End: {fmt(end)}
        </Text>
        <Text size="12" color="text.subtlest">
          Select a start date, then open the end picker — dates before the start are disabled.
        </Text>
      </Box>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <DateRangePicker
      disabled
      startValue={{ year: 2026, month: 1, day: 1 }}
      endValue={{ year: 2026, month: 12, day: 31 }}
    />
  ),
};
