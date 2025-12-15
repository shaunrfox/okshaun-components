import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';
import { Box } from '../Box';
import { Text } from '../Text';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'small', 'large'],
      description: 'Size variant of the chip',
    },
    iconBefore: {
      control: 'select',
      options: ['file', 'calendar', 'user', 'plus', 'check'],
      description: 'Icon displayed before the label',
    },
    iconAfter: {
      control: 'select',
      options: ['x', 'chevron-down', 'external-link'],
      description: 'Icon displayed after the label',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the chip interaction',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading state with pulse animation',
    },
    deleted: {
      control: 'boolean',
      description: 'Shows deleted state with strikethrough',
    },
  },
  args: {
    children: 'Chip Label',
    size: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

// =============================================================================
// DEFAULT
// =============================================================================

export const Default: Story = {
  args: {
    children: 'Default Chip',
  },
};

// =============================================================================
// SIZES
// =============================================================================

export const Sizes: Story = {
  render: () => (
    <Box display="flex" gap="4" alignItems="center">
      <Chip size="small">Small</Chip>
      <Chip size="default">Default</Chip>
      <Chip size="large">Large</Chip>
    </Box>
  ),
};

// =============================================================================
// WITH ICONS
// =============================================================================

export const WithIconBefore: Story = {
  render: () => (
    <Box display="flex" gap="4" alignItems="center">
      <Chip size="small" iconBefore="file">
        Small
      </Chip>
      <Chip size="default" iconBefore="file">
        Default
      </Chip>
      <Chip size="large" iconBefore="file">
        Large
      </Chip>
    </Box>
  ),
};

export const WithIconAfter: Story = {
  render: () => (
    <Box display="flex" gap="4" alignItems="center">
      <Chip size="small" iconAfter="x">
        Small
      </Chip>
      <Chip size="default" iconAfter="x">
        Default
      </Chip>
      <Chip size="large" iconAfter="x">
        Large
      </Chip>
    </Box>
  ),
};

export const WithBothIcons: Story = {
  render: () => (
    <Box display="flex" gap="4" alignItems="center">
      <Chip size="small" iconBefore="user" iconAfter="x">
        Small
      </Chip>
      <Chip size="default" iconBefore="user" iconAfter="x">
        Default
      </Chip>
      <Chip size="large" iconBefore="user" iconAfter="x">
        Large
      </Chip>
    </Box>
  ),
};

// =============================================================================
// STATES
// =============================================================================

export const States: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="4">
      <Box display="flex" gap="2" alignItems="center">
        <Text fontWeight="500" w="100">
          Default:
        </Text>
        <Chip iconBefore="file">Interactive</Chip>
      </Box>
      <Box display="flex" gap="2" alignItems="center">
        <Text fontWeight="500" w="100">
          Disabled:
        </Text>
        <Chip disabled iconBefore="file">
          Disabled
        </Chip>
      </Box>
      <Box display="flex" gap="2" alignItems="center">
        <Text fontWeight="500" w="100">
          Loading:
        </Text>
        <Chip loading iconBefore="file">
          Loading...
        </Chip>
      </Box>
      <Box display="flex" gap="2" alignItems="center">
        <Text fontWeight="500" w="100">
          Deleted:
        </Text>
        <Chip deleted iconBefore="file">
          Deleted Item
        </Chip>
      </Box>
    </Box>
  ),
};

// =============================================================================
// INTERACTIVE
// =============================================================================

export const Interactive: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="4">
      <Text>Chips can be interactive buttons:</Text>
      <Box display="flex" gap="2">
        <Chip onClick={() => alert('Clicked!')}>Click Me</Chip>
        <Chip iconBefore="plus" onClick={() => alert('Add clicked!')}>
          Add Item
        </Chip>
        <Chip iconAfter="x" onClick={() => alert('Remove clicked!')}>
          Remove
        </Chip>
      </Box>
    </Box>
  ),
};

// =============================================================================
// ALL SIZES WITH ICONS MATRIX
// =============================================================================

export const SizesWithIconsMatrix: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="6">
      <Box display="flex" flexDir="column" gap="2">
        <Text fontWeight="600">No Icons</Text>
        <Box display="flex" gap="4" alignItems="center">
          <Chip size="small">Small</Chip>
          <Chip size="default">Default</Chip>
          <Chip size="large">Large</Chip>
        </Box>
      </Box>
      <Box display="flex" flexDir="column" gap="2">
        <Text fontWeight="600">Icon Before</Text>
        <Box display="flex" gap="4" alignItems="center">
          <Chip size="small" iconBefore="file">
            Small
          </Chip>
          <Chip size="default" iconBefore="file">
            Default
          </Chip>
          <Chip size="large" iconBefore="file">
            Large
          </Chip>
        </Box>
      </Box>
      <Box display="flex" flexDir="column" gap="2">
        <Text fontWeight="600">Icon After</Text>
        <Box display="flex" gap="4" alignItems="center">
          <Chip size="small" iconAfter="x">
            Small
          </Chip>
          <Chip size="default" iconAfter="x">
            Default
          </Chip>
          <Chip size="large" iconAfter="x">
            Large
          </Chip>
        </Box>
      </Box>
      <Box display="flex" flexDir="column" gap="2">
        <Text fontWeight="600">Both Icons</Text>
        <Box display="flex" gap="4" alignItems="center">
          <Chip size="small" iconBefore="user" iconAfter="x">
            Small
          </Chip>
          <Chip size="default" iconBefore="user" iconAfter="x">
            Default
          </Chip>
          <Chip size="large" iconBefore="user" iconAfter="x">
            Large
          </Chip>
        </Box>
      </Box>
    </Box>
  ),
};

// =============================================================================
// INLINE USAGE
// =============================================================================

export const InlineWithText: Story = {
  render: () => (
    <Box maxW="600">
      <Text>
        Chips can appear inline within text, like tagging{' '}
        <Chip iconBefore="user">John Doe</Chip> in a conversation or referencing{' '}
        <Chip iconBefore="file">Project Plan</Chip> in your notes.
      </Text>
    </Box>
  ),
};

// =============================================================================
// USE CASES
// =============================================================================

export const UseCases: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="6">
      <Box display="flex" flexDir="column" gap="2">
        <Text fontWeight="600">Filter Tags</Text>
        <Box display="flex" gap="2" flexWrap="wrap">
          <Chip iconAfter="x">React</Chip>
          <Chip iconAfter="x">TypeScript</Chip>
          <Chip iconAfter="x">Panda CSS</Chip>
          <Chip iconBefore="plus">Add Filter</Chip>
        </Box>
      </Box>
      <Box display="flex" flexDir="column" gap="2">
        <Text fontWeight="600">Categories</Text>
        <Box display="flex" gap="2" flexWrap="wrap">
          <Chip iconBefore="file">Documentation</Chip>
          <Chip iconBefore="calendar">Events</Chip>
          <Chip iconBefore="user">People</Chip>
        </Box>
      </Box>
      <Box display="flex" flexDir="column" gap="2">
        <Text fontWeight="600">Actions</Text>
        <Box display="flex" gap="2" flexWrap="wrap">
          <Chip iconBefore="plus">New Item</Chip>
          <Chip iconBefore="check">Approve</Chip>
          <Chip deleted>Archived</Chip>
        </Box>
      </Box>
    </Box>
  ),
};
