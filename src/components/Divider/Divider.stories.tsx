import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box';
import { Card } from '../Card';
import { Text } from '../Text';
import { Divider } from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    direction: 'horizontal',
    weight: 'thin',
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box display="grid" w="md">
      <Divider />
    </Box>
  ),
};

export const Weights: Story = {
  render: () => (
    <Box display="grid" gap="10" w="md">
      <Divider weight="thin" />
      <Divider weight="medium" />
      <Divider weight="thick" />
      <Divider weight="thicker" />
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const Vertical: Story = {
  render: () => (
    <Card p="16" display="flex" alignItems="center" gap="12" h="96">
      <Text>Left</Text>
      <Divider direction="vertical" />
      <Text>Right</Text>
    </Card>
  ),
  parameters: { controls: { disable: true } },
};

export const ExSectionBreak: Story = {
  name: 'Ex: Section Break in Card',
  render: () => (
    <Card p="16" display="grid" gap="12" maxW="sm">
      <Text fontWeight="bold">Account Summary</Text>
      <Text>Current balance: $2,403.18</Text>
      <Divider />
      <Text>Next invoice date: May 4, 2026</Text>
    </Card>
  ),
  parameters: { controls: { disable: true } },
};
