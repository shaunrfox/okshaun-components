import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box';
import { Card } from '../Card';
import { Text } from '../Text';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'md',
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <Box display="flex" gap="16" alignItems="center">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const ExCenteredOverlay: Story = {
  name: 'Ex: Centered Overlay',
  render: () => (
    <Card position="relative" p="16" w="sm" h="120" overflow="hidden">
      <Text>Saving invoice updates...</Text>
      <Spinner centered size="md" />
    </Card>
  ),
  parameters: { controls: { disable: true } },
};

export const ExInverseOnDarkSurface: Story = {
  name: 'Ex: Inverse Spinner',
  render: () => (
    <Box p="16" borderRadius="8" bg="bg.neutral.boldest">
      <Spinner size="md" inverse />
    </Box>
  ),
  parameters: { controls: { disable: true } },
};
