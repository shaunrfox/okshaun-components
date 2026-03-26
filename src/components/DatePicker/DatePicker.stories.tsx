import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { VStack } from '~/styled-system/jsx';
import { Box } from '../Box';
import { FormField } from '../FormField';
import { Text } from '../Text';
import { DatePicker, type DateValue } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

const ControlledDatePickerExample = () => {
  const [value, setValue] = useState<DateValue | null>(null);

  return (
    <Box display="flex" flexDirection="column" gap="16" w="xs">
      <DatePicker value={value} onChange={setValue} />
      <Text size="14" color="text.subtle">
        Selected:{' '}
        {value
          ? `${value.year}-${String(value.month).padStart(2, '0')}-${String(value.day).padStart(2, '0')}`
          : 'none'}
      </Text>
    </Box>
  );
};

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {},
  render: () => <DatePicker />,
};

export const WithValue: Story = {
  name: 'With Value',
  render: () => <DatePicker value={{ year: 2026, month: 2, day: 19 }} />,
};

export const WithMinMax: Story = {
  name: 'With Min/Max',
  render: () => (
    <VStack>
      <Text>Within: 2026-02-10 – 2026-03-20</Text>
      <DatePicker
        value={{ year: 2026, month: 2, day: 19 }}
        minDate={{ year: 2026, month: 2, day: 10 }}
        maxDate={{ year: 2026, month: 3, day: 20 }}
      />
    </VStack>
  ),
};

export const ErrorState: Story = {
  name: 'Error State',
  render: () => <DatePicker error />,
};

export const Disabled: Story = {
  render: () => (
    <DatePicker disabled value={{ year: 2026, month: 2, day: 19 }} />
  ),
};

export const SizeSm: Story = {
  name: 'Size: sm',
  render: () => <DatePicker size="sm" />,
};

export const SizeLg: Story = {
  name: 'Size: lg',
  render: () => <DatePicker size="lg" />,
};

export const InFormField: Story = {
  name: 'In FormField',
  render: () => (
    <Box w="xs">
      <FormField label="Birth date" labelFor="birth-date" required>
        <DatePicker id="birth-date" />
      </FormField>
    </Box>
  ),
};

export const ExControlled: Story = {
  name: 'Ex: Controlled',
  render: () => <ControlledDatePickerExample />,
};
