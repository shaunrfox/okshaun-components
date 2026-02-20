import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Box } from '../Box';
import { FormField } from '../FormField';
import { Text } from '../Text';
import { TimePicker, type TimeValue } from './TimePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default12h: Story = {
  name: 'Default (12h)',
  render: () => <TimePicker hourCycle="12" />,
};

export const Default24h: Story = {
  name: 'Default (24h)',
  render: () => <TimePicker hourCycle="24" />,
};

export const WithValue: Story = {
  name: 'With Value',
  render: () => (
    // 14:30 = 2:30 PM
    <TimePicker hourCycle="12" value={{ hour: 14, minute: 30 }} />
  ),
};

export const MinuteStep15: Story = {
  name: 'Minute Step: 15',
  render: () => (
    <Box display="flex" flexDirection="column" gap="8">
      <Text size="14" color="text.subtle">Only 0, 15, 30, 45 available</Text>
      <TimePicker hourCycle="12" minuteStep={15} />
    </Box>
  ),
};

export const ErrorState: Story = {
  name: 'Error State',
  render: () => <TimePicker error />,
};

export const Disabled: Story = {
  render: () => <TimePicker disabled value={{ hour: 9, minute: 0 }} />,
};

export const InFormField: Story = {
  name: 'In FormField',
  render: () => (
    <Box style={{ width: '220px' }}>
      <FormField label="Meeting time" required>
        <TimePicker hourCycle="12" />
      </FormField>
    </Box>
  ),
};

export const ExControlled: Story = {
  name: 'Ex: Controlled',
  render: () => {
    const [value, setValue] = useState<TimeValue | null>(null);
    const formatTime = (v: TimeValue) => {
      const h = String(v.hour).padStart(2, '0');
      const m = String(v.minute).padStart(2, '0');
      return `${h}:${m}`;
    };
    return (
      <Box display="flex" flexDirection="column" gap="16" style={{ width: '220px' }}>
        <TimePicker hourCycle="12" value={value} onChange={setValue} />
        <Text size="14" color="text.subtle">
          Selected (24h): {value ? formatTime(value) : 'none'}
        </Text>
      </Box>
    );
  },
};
