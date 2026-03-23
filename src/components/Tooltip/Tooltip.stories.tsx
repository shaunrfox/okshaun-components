// src/components/Tooltip/Tooltip.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  args: {
    text: 'This is a tooltip',
    placement: 'bottom',
    caret: true,
    size: 'md',
  },
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top', 'top-start', 'top-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end',
        'right', 'right-start', 'right-end',
      ],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    caret: { control: 'boolean' },
    delay: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover or focus me</Button>
    </Tooltip>
  ),
};

export const WithTitle: Story = {
  args: {
    title: 'Tooltip title',
    text: 'Supporting description text.',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export const NoCaret: Story = {
  args: { caret: false },
  render: (args) => (
    <Tooltip {...args}>
      <Button>No caret</Button>
    </Tooltip>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <Tooltip {...args} size="sm" text="Small tooltip">
        <Button size="sm">Small</Button>
      </Tooltip>
      <Tooltip {...args} size="md" text="Medium tooltip">
        <Button>Medium</Button>
      </Tooltip>
      <Tooltip {...args} size="lg" text="Large tooltip">
        <Button size="lg">Large</Button>
      </Tooltip>
    </div>
  ),
};

export const AllPlacements: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {(['top-start', 'top', 'top-end',
         'left', '', 'right',
         'bottom-start', 'bottom', 'bottom-end'] as const).map((p) =>
        p ? (
          <Tooltip key={p} {...args} placement={p} text={p}>
            <Button style={{ width: '100%' }}>{p}</Button>
          </Tooltip>
        ) : (
          <div key="empty" />
        )
      )}
    </div>
  ),
};

export const WithDelay: Story = {
  args: { delay: { open: 500, close: 200 }, text: 'Opens after 500ms delay' },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Delayed tooltip</Button>
    </Tooltip>
  ),
};

/** Demonstrates keyboard accessibility — Tab to the button to trigger the tooltip */
export const KeyboardFocus: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button>Tab past this</Button>
      <Tooltip {...args} text="Triggered by keyboard focus">
        <Button>Focus me with Tab</Button>
      </Tooltip>
    </div>
  ),
};
