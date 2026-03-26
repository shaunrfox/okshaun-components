import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Box } from '../Box';
import { Text } from '../Text';

import type { TimeValue } from '../TimePicker/TimePicker';
import { TimeRangePicker } from './TimeRangePicker';

const meta: Meta<typeof TimeRangePicker> = {
  title: 'Components/TimeRangePicker',
  component: TimeRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TimeRangePicker>;

const ControlledTimeRangePickerExample = () => {
  const [start, setStart] = useState<TimeValue | null>(null);
  const [end, setEnd] = useState<TimeValue | null>(null);

  const formatTime = (value: TimeValue | null) =>
    value
      ? `${String(value.hour).padStart(2, '0')}:${String(value.minute).padStart(2, '0')}`
      : 'none';

  return (
    <Box display="flex" flexDirection="column" gap="16">
      <TimeRangePicker
        startValue={start}
        endValue={end}
        onStartChange={setStart}
        onEndChange={setEnd}
      />
      <Text size="14" color="text.subtle">
        Start: {formatTime(start)} - End: {formatTime(end)}
      </Text>
    </Box>
  );
};

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => <TimeRangePicker />,
};

export const With24h: Story = {
  name: 'With 24h clock',
  render: () => <TimeRangePicker hourCycle="24" />,
};

export const WithValues: Story = {
  name: 'With Values',
  render: () => (
    <TimeRangePicker
      startValue={{ hour: 9, minute: 0 }}
      endValue={{ hour: 17, minute: 30 }}
    />
  ),
};

export const MinuteStep30: Story = {
  name: 'Minute Step: 30',
  render: () => <TimeRangePicker minuteStep={30} />,
};

export const ExControlled: Story = {
  name: 'Ex: Controlled',
  render: () => <ControlledTimeRangePickerExample />,
};
