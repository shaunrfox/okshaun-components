/** @jsxImportSource @emotion/react */
import type { Meta, StoryObj } from '@storybook/react';
import { Icon, IconNames } from '.';
import { IconGallery, IconItem } from '@storybook/blocks';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'aa-placeholder', // or any default icon name
  },
  render: () => (
    <IconGallery>
      {Object.entries(IconNames).map(([key, name]) => (
        <IconItem key={key} name={name}>
          <Icon name={name} />
        </IconItem>
      ))}
    </IconGallery>
  ),
};
