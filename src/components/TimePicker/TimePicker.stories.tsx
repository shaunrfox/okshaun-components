import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HStack } from '~/styled-system/jsx';
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

const ControlledTimePickerExample = () => {
  const [value12, set12Value] = useState<TimeValue | null>(null);
  const [value24, set24Value] = useState<TimeValue | null>(null);

  const formatTime = (timeValue: TimeValue) => {
    const hour = String(timeValue.hour).padStart(2, '0');
    const minute = String(timeValue.minute).padStart(2, '0');
    return `${hour}:${minute}`;
  };

  return (
    <HStack gap="32">
      <Box display="flex" flexDirection="column" gap="4" width="184">
        <TimePicker hourCycle="12" value={value12} onChange={set12Value} />
        <Text size="14" color="text.subtle">
          Selected (12h): {value12 ? formatTime(value12) : 'none'}
        </Text>
      </Box>
      <Box display="flex" flexDirection="column" gap="4" width="184">
        <TimePicker hourCycle="24" value={value24} onChange={set24Value} />
        <Text size="14" color="text.subtle">
          Selected (24h): {value24 ? formatTime(value24) : 'none'}
        </Text>
      </Box>
    </HStack>
  );
};

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
      <Text size="14" color="text.subtle">
        Only 0, 15, 30, 45 available
      </Text>
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
    <Box width="224">
      <FormField label="Meeting time" labelFor="meeting-time" required>
        <TimePicker id="meeting-time" hourCycle="12" />
      </FormField>
    </Box>
  ),
};

export const ExControlled: Story = {
  name: 'Ex: Controlled',
  render: () => <ControlledTimePickerExample />,
};
