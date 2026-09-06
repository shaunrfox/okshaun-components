import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../Box';
import { Card } from '../Card';
import { Text } from '../Text';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: {
    variant: 'text',
    animation: 'pulse',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextLine: Story = {
  args: {
    children: 'Loading invoice number',
  },
};

export const Shapes: Story = {
  render: () => (
    <Box display="flex" gap="12" alignItems="center">
      <Skeleton variant="circular" width="10" height="10" />
      <Skeleton variant="rounded" width="32" height="10" />
      <Skeleton variant="rectangular" width="24" height="10" />
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const Animations: Story = {
  render: () => (
    <Box display="grid" gap="12">
      <Skeleton width="48" height="4" />
      <Skeleton animation="wave" width="48" height="4" />
      <Skeleton animation={false} width="48" height="4" />
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const ChildContentLayout: Story = {
  name: 'Child Content Layout',
  render: () => (
    <Card p="16" w="sm">
      <Skeleton>
        <Text>Order #2048</Text>
      </Skeleton>
    </Card>
  ),
  parameters: { controls: { disable: true } },
};

export const MultiLine: Story = {
  render: () => (
    <Box display="grid" gap="4" w="sm">
      <Skeleton height="4" />
      <Skeleton height="4" width="80%" />
      <Skeleton height="4" width="60%" />
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const ReducedMotion: Story = {
  render: () => (
    <Box display="flex" gap="12">
      <Skeleton animation="wave" width="40" height="4" />
      <Skeleton animation="pulse" width="40" height="4" />
    </Box>
  ),
  parameters: {
    controls: { disable: true },
    viewport: { defaultViewport: 'responsive' },
  },
};
