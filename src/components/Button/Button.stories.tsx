import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button, IconButton } from './Button';
import { Icon } from '../Icon';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'danger', 'hollow', 'utility'],
    },
    size: {
      control: 'select',
      options: ['default', 'small', 'medium'],
    },
    iconButton: {
      control: 'boolean',
    },
    isActive: {
      control: 'boolean',
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const Default: Story = {
//   args: {
//     children: "Default Button",
//     variant: "default",
//     size: "default",
//   },
// };

// export const Primary: Story = {
//   args: {
//     children: "Primary Button",
//     variant: "primary",
//   },
// };

// export const Danger: Story = {
//   args: {
//     children: "Danger Button",
//     variant: "danger",
//   },
// };

// export const Hollow: Story = {
//   args: {
//     children: "Hollow Button",
//     variant: "hollow",
//   },
// };

// export const Utility: Story = {
//   args: {
//     children: "Utility Button",
//     variant: "utility",
//   },
// };

// export const Small: Story = {
//   args: {
//     children: "Small Button",
//     size: "small",
//   },
// };

// export const Medium: Story = {
//   args: {
//     children: "Medium Button",
//     size: "medium",
//   },
// };

// export const Active: Story = {
//   args: {
//     children: "Active Button",
//     isActive: true,
//   },
// };

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button variant="default">Default</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="hollow">Hollow</Button>
        <Button variant="utility">Utility</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <IconButton variant="default">
          <Icon name="add" />
        </IconButton>
        <IconButton variant="primary">
          <Icon name="add" />
        </IconButton>
        <IconButton variant="danger">
          <Icon name="add" />
        </IconButton>
        <IconButton variant="hollow">
          <Icon name="add" />
        </IconButton>
        <IconButton variant="utility">
          <Icon name="add" />
        </IconButton>
      </div>
    </div>
  ),
};
