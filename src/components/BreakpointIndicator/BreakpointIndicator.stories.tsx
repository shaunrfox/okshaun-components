import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../Box';
import { BreakpointIndicator } from './BreakpointIndicator';

const meta = {
  title: 'Components/BreakpointIndicator',
  component: BreakpointIndicator,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Development aid that shows the largest matching breakpoint and forwards Box-compatible props.',
      },
    },
  },
} satisfies Meta<typeof BreakpointIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box p="24">
      <BreakpointIndicator />
    </Box>
  ),
  parameters: {
    controls: { disable: true },
  },
};
