import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../Box';
import { Kbd } from './Kbd';

const meta = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  args: {
    keys: ['command', 'shift', 'p'],
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleKey: Story = {
  args: {
    keys: ['escape'],
  },
};

export const MultiKey: Story = {
  args: {
    keys: ['command', 'k'],
  },
};

export const SymbolShortcut: Story = {
  args: {
    keys: ['command', 'shift', 'p'],
  },
};

export const ArrowKeys: Story = {
  args: {
    keys: ['arrow-left', 'arrow-right'],
  },
};

export const UnknownValue: Story = {
  args: {
    keys: ['meta', 'k'],
  },
};

export const DarkSurface: Story = {
  name: 'Dark Theme Surface',
  render: () => (
    <Box p="16" bg="bg.neutral.boldest" borderRadius="8">
      <Kbd keys={['command', 'shift', 'p']} />
    </Box>
  ),
  parameters: { controls: { disable: true } },
};
