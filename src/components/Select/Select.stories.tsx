import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Box } from '../Box';
import { Select } from './Select';
import { SelectOption } from './SelectOption';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Selected value',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when value changes',
    },
    placeholder: {
      control: 'text',
      defaultValue: 'Select...',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    error: {
      control: 'boolean',
      defaultValue: false,
    },
    multiple: {
      control: 'boolean',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    placeholder: 'Choose an option...',
  },
  render: (args) => (
    <Select {...args}>
      <SelectOption value="option1" label="Option 1" />
      <SelectOption value="option2" label="Option 2" />
      <SelectOption value="option3" label="Option 3" />
    </Select>
  ),
};

export const WithValue: Story = {
  args: {
    value: 'option2',
    placeholder: 'Choose an option...',
  },
  render: (args) => (
    <Select {...args}>
      <SelectOption value="option1" label="Option 1" />
      <SelectOption value="option2" label="Option 2" />
      <SelectOption value="option3" label="Option 3" />
    </Select>
  ),
};

export const Multiple: Story = {
  args: {
    multiple: true,
    placeholder: 'Choose options...',
  },
  render: (args) => (
    <Select {...args}>
      <SelectOption value="option1" label="Option 1" />
      <SelectOption value="option2" label="Option 2" />
      <SelectOption value="option3" label="Option 3" />
    </Select>
  ),
};

export const MultipleWithValue: Story = {
  args: {
    multiple: true,
    value: ['option1', 'option3'],
    placeholder: 'Choose options...',
  },
  render: (args) => (
    <Select {...args}>
      <SelectOption value="option1" label="Option 1" />
      <SelectOption value="option2" label="Option 2" />
      <SelectOption value="option3" label="Option 3" />
    </Select>
  ),
};

export const WithDescriptions: Story = {
  args: {
    placeholder: 'Choose a plan...',
  },
  render: (args) => (
    <Select {...args}>
      <SelectOption value="email" label="Email" iconLeft="envelope" />
      <SelectOption value="phone" label="Phone" iconLeft="at" />
      <SelectOption value="chat" label="Live Chat" iconLeft="message" />
      <SelectOption value="email" label="Email" iconLeft="envelope" />
      <SelectOption value="phone" label="Phone" iconLeft="at" />
      <SelectOption value="chat" label="Live Chat" iconLeft="message" />
      <SelectOption
        value="enterprise"
        label="Enterprise"
        description="For large teams"
      />
    </Select>
  ),
};

export const WithIcons: Story = {
  args: {
    placeholder: 'Choose a method...',
  },
  render: (args) => (
    <Select {...args}>
      <SelectOption value="email" label="Email" iconLeft="envelope" />
      <SelectOption value="phone" label="Phone" iconLeft="at" />
      <SelectOption value="chat" label="Live Chat" iconLeft="message" />
    </Select>
  ),
};

export const WithDisabledOptions: Story = {
  args: {
    placeholder: 'Choose a feature...',
  },
  render: (args) => (
    <Select {...args}>
      <SelectOption value="feature1" label="Available Feature 1" />
      <SelectOption value="feature2" label="Available Feature 2" />
      <SelectOption value="feature3" label="Coming Soon" disabled />
    </Select>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'option1',
    placeholder: 'Choose an option...',
  },
  render: (args) => (
    <Select {...args}>
      <SelectOption value="option1" label="Option 1" />
      <SelectOption value="option2" label="Option 2" />
      <SelectOption value="option3" label="Option 3" />
    </Select>
  ),
};

export const ErrorStory: Story = {
  name: 'Error',
  args: {
    error: true,
    placeholder: 'Choose an option...',
  },
  render: (args) => (
    <Box display="flex" flexDirection="column" gap="2">
      <Select {...args}>
        <SelectOption value="option1" label="Option 1" />
        <SelectOption value="option2" label="Option 2" />
        <SelectOption value="option3" label="Option 3" />
      </Select>
      <Box fontSize="14" color="text.error">
        Please select an option
      </Box>
    </Box>
  ),
};

export const Controlled: Story = {
  render: () => {
    const ControlledSelect = () => {
      const [value, setValue] = React.useState<string | null>(null);

      return (
        <Box display="flex" flexDirection="column" gap="4" width="xs">
          <Select
            value={value}
            onChange={setValue}
            placeholder="Choose an option..."
          >
            <SelectOption value="option1" label="Option 1" />
            <SelectOption value="option2" label="Option 2" />
            <SelectOption value="option3" label="Option 3" />
          </Select>
          <Box fontSize="14" color="text.subtlest">
            Selected value: {value || 'None'}
          </Box>
        </Box>
      );
    };

    return <ControlledSelect />;
  },
};
