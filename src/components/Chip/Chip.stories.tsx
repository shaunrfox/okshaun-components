import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';
import { ChipGroup } from './ChipGroup';
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

// =============================================================================
// DISMISSABLE
// =============================================================================

const DismissableExample = () => {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Panda CSS', 'Vite']);

  const handleDismiss = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <Box display="flex" flexDir="column" gap="4">
      <Text>Click the X to dismiss tags:</Text>
      <Box display="flex" gap="2" flexWrap="wrap">
        {tags.map((tag) => (
          <Chip key={tag} dismissable onDismiss={() => handleDismiss(tag)}>
            {tag}
          </Chip>
        ))}
      </Box>
      {tags.length === 0 && <Text color="text.muted">All tags dismissed!</Text>}
    </Box>
  );
};

export const Dismissable: Story = {
  render: () => <DismissableExample />,
};

export const DismissableWithIcons: Story = {
  render: () => (
    <Box display="flex" gap="2">
      <Chip dismissable iconBefore="file" onDismiss={() => {}}>
        Document
      </Chip>
      <Chip dismissable iconBefore="user" onDismiss={() => {}}>
        Person
      </Chip>
      <Chip dismissable iconBefore="calendar" onDismiss={() => {}}>
        Event
      </Chip>
    </Box>
  ),
};

// =============================================================================
// SINGLE SELECT (ChipGroup)
// =============================================================================

const SingleSelectExample = () => {
  const [selected, setSelected] = useState('medium');

  return (
    <Box display="flex" flexDir="column" gap="4">
      <Text>Select one size:</Text>
      <ChipGroup
        type="single"
        value={selected}
        onChange={(value) => setSelected(value as string)}
        label="Size selection"
      >
        <Chip value="small">Small</Chip>
        <Chip value="medium">Medium</Chip>
        <Chip value="large">Large</Chip>
        <Chip value="xlarge">X-Large</Chip>
      </ChipGroup>
      <Text color="text.muted">Selected: {selected}</Text>
    </Box>
  );
};

export const SingleSelect: Story = {
  render: () => <SingleSelectExample />,
};

const SingleSelectWithIconsExample = () => {
  const [selected, setSelected] = useState('grid');

  return (
    <Box display="flex" flexDir="column" gap="4">
      <Text>Select a view:</Text>
      <ChipGroup
        type="single"
        value={selected}
        onChange={(value) => setSelected(value as string)}
        label="View selection"
      >
        <Chip value="list" iconBefore="menu">
          List
        </Chip>
        <Chip value="grid" iconBefore="grid">
          Grid
        </Chip>
        <Chip value="calendar" iconBefore="calendar">
          Calendar
        </Chip>
      </ChipGroup>
      <Text color="text.muted">Selected: {selected}</Text>
    </Box>
  );
};

export const SingleSelectWithIcons: Story = {
  render: () => <SingleSelectWithIconsExample />,
};

// =============================================================================
// MULTI SELECT (ChipGroup)
// =============================================================================

const MultiSelectExample = () => {
  const [selected, setSelected] = useState<string[]>(['react', 'typescript']);

  return (
    <Box display="flex" flexDir="column" gap="4">
      <Text>Select your skills (check icon appears when selected):</Text>
      <ChipGroup
        type="multi"
        value={selected}
        onChange={(value) => setSelected(value as string[])}
        label="Skills selection"
      >
        <Chip value="react">React</Chip>
        <Chip value="typescript">TypeScript</Chip>
        <Chip value="vue">Vue</Chip>
        <Chip value="angular">Angular</Chip>
        <Chip value="svelte">Svelte</Chip>
      </ChipGroup>
      <Text color="text.muted">Selected: {selected.join(', ') || 'None'}</Text>
    </Box>
  );
};

export const MultiSelect: Story = {
  render: () => <MultiSelectExample />,
};

const MultiSelectWithIconsExample = () => {
  const [selected, setSelected] = useState<string[]>(['docs']);

  return (
    <Box display="flex" flexDir="column" gap="4">
      <Text>Filter by category:</Text>
      <ChipGroup
        type="multi"
        value={selected}
        onChange={(value) => setSelected(value as string[])}
        label="Category filter"
      >
        <Chip value="docs" iconBefore="file">
          Documents
        </Chip>
        <Chip value="images" iconBefore="image">
          Images
        </Chip>
        <Chip value="videos" iconBefore="video">
          Videos
        </Chip>
        <Chip value="audio" iconBefore="volume-2">
          Audio
        </Chip>
      </ChipGroup>
      <Text color="text.muted">Selected: {selected.join(', ') || 'None'}</Text>
    </Box>
  );
};

export const MultiSelectWithIcons: Story = {
  render: () => <MultiSelectWithIconsExample />,
};

// =============================================================================
// KEYBOARD NAVIGATION
// =============================================================================

export const KeyboardNavigation: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="6">
      <Box display="flex" flexDir="column" gap="2">
        <Text fontWeight="600">Single Select (arrow keys navigate & select):</Text>
        <SingleSelectExample />
      </Box>
      <Box display="flex" flexDir="column" gap="2">
        <Text fontWeight="600">Multi Select (tab between, space/enter toggles):</Text>
        <MultiSelectExample />
      </Box>
    </Box>
  ),
};
