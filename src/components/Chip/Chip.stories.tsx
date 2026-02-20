import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '@styled-system/jsx';
import { useState } from 'react';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Box } from '../Box';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { Chip } from './Chip';
import { ChipGroup } from './ChipGroup';

// Sample avatar images (using placeholder service)
const sampleImages = {
  user1: 'https://i.pravatar.cc/150?img=1',
  user2: 'https://i.pravatar.cc/150?img=2',
  user3: 'https://i.pravatar.cc/150?img=3',
  user4: 'https://i.pravatar.cc/150?img=4',
  user5: 'https://i.pravatar.cc/150?img=5',
};

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'sm', 'lg'],
      description: 'Size variant of the chip',
    },
    before: {
      control: false,
      description: 'Content to render before the label (e.g., Icon, Avatar)',
    },
    after: {
      control: false,
      description: 'Content to render after the label (e.g., Badge, Icon)',
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
    size: 'md',
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
    <Flex gap="4" alignItems="center">
      <Chip size="sm">Small</Chip>
      <Chip size="md">Default</Chip>
      <Chip size="lg">Large</Chip>
    </Flex>
  ),
};

// =============================================================================
// WITH ICONS
// =============================================================================

export const WithBefore: Story = {
  render: () => (
    <Flex gap="4" flexDir="column" alignItems="center">
      <Flex gap="4" alignItems="center">
        <Chip
          size="sm"
          before={<Badge count={2} size="sm" variant="success" />}
        >
          Small
        </Chip>
        <Chip size="md" before={<Badge count={30} variant="neutral" />}>
          Default
        </Chip>
        <Chip size="lg" before={<Badge count={100} size="lg" />}>
          Large
        </Chip>
      </Flex>
      <Flex gap="4" alignItems="center">
        <Chip
          size="sm"
          before={<Avatar size="xs" src={sampleImages.user1} name="John Doe" />}
        >
          Small
        </Chip>
        <Chip
          size="md"
          before={<Avatar size="sm" src={sampleImages.user1} name="John Doe" />}
        >
          Default
        </Chip>
        <Chip
          size="lg"
          before={<Avatar src={sampleImages.user1} name="John Doe" />}
        >
          Large
        </Chip>
      </Flex>
      <Flex gap="4" alignItems="center">
        <Chip size="sm" before={<Icon name="file" size="20" />}>
          Small
        </Chip>
        <Chip size="md" before={<Icon name="file" size="20" />}>
          Default
        </Chip>
        <Chip size="lg" before={<Icon name="file" size="24" />}>
          Large
        </Chip>
      </Flex>
    </Flex>
  ),
};

export const WithAfter: Story = {
  render: () => (
    <Flex gap="4" alignItems="center">
      <Chip size="sm" after={<Icon name="x" size="20" />}>
        Small
      </Chip>
      <Chip size="md" after={<Icon name="x" size="20" />}>
        Default
      </Chip>
      <Chip size="lg" after={<Icon name="x" size="24" />}>
        Large
      </Chip>
    </Flex>
  ),
};

export const WithBeforeAndAfter: Story = {
  render: () => (
    <Flex gap="4" alignItems="center">
      <Chip
        size="sm"
        before={<Icon name="user" size="20" />}
        after={<Icon name="x" size="20" />}
      >
        Small
      </Chip>
      <Chip
        size="md"
        before={<Icon name="user" size="20" />}
        after={<Icon name="x" size="20" />}
      >
        Default
      </Chip>
      <Chip
        size="lg"
        before={<Icon name="user" size="24" />}
        after={<Icon name="x" size="24" />}
      >
        Large
      </Chip>
    </Flex>
  ),
};

// =============================================================================
// STATES
// =============================================================================

export const States: Story = {
  render: () => (
    <Flex flexDir="column" gap="4">
      <Flex gap="2" alignItems="center">
        <Text fontWeight="500" w="100">
          Default:
        </Text>
        <Chip before={<Icon name="file" size="20" />}>Interactive</Chip>
      </Flex>
      <Flex gap="2" alignItems="center">
        <Text fontWeight="500" w="100">
          Disabled:
        </Text>
        <Chip disabled before={<Icon name="file" size="20" />}>
          Disabled
        </Chip>
      </Flex>
      <Flex gap="2" alignItems="center">
        <Text fontWeight="500" w="100">
          Loading:
        </Text>
        <Chip loading before={<Icon name="file" size="20" />}>
          Loading...
        </Chip>
      </Flex>
      <Flex gap="2" alignItems="center">
        <Text fontWeight="500" w="100">
          Deleted:
        </Text>
        <Chip deleted before={<Icon name="file" size="20" />}>
          Deleted Item
        </Chip>
      </Flex>
    </Flex>
  ),
};

// =============================================================================
// INTERACTIVE
// =============================================================================

export const Interactive: Story = {
  render: () => (
    <Flex flexDir="column" gap="4">
      <Text>Chips can be interactive buttons:</Text>
      <Flex gap="2">
        <Chip onClick={() => alert('Clicked!')}>Click Me</Chip>
        <Chip
          before={<Icon name="plus" size="20" />}
          onClick={() => alert('Add clicked!')}
        >
          Add Item
        </Chip>
        <Chip
          after={<Icon name="x" size="20" />}
          onClick={() => alert('Remove clicked!')}
        >
          Remove
        </Chip>
      </Flex>
    </Flex>
  ),
};

// =============================================================================
// ALL SIZES WITH ICONS MATRIX
// =============================================================================

export const SizesMatrix: Story = {
  render: () => (
    <Flex flexDir="column" gap="6">
      <Flex flexDir="column" gap="2">
        <Text fontWeight="600">No Content Before/After</Text>
        <Flex gap="4" alignItems="center">
          <Chip size="sm">Small</Chip>
          <Chip size="md">Default</Chip>
          <Chip size="lg">Large</Chip>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="2">
        <Text fontWeight="600">With Before</Text>
        <Flex gap="4" alignItems="center">
          <Chip size="sm" before={<Icon name="file" size="20" />}>
            Small
          </Chip>
          <Chip size="md" before={<Icon name="file" size="20" />}>
            Default
          </Chip>
          <Chip size="lg" before={<Icon name="file" size="24" />}>
            Large
          </Chip>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="2">
        <Text fontWeight="600">With After</Text>
        <Flex gap="4" alignItems="center">
          <Chip size="sm" after={<Icon name="x" size="20" />}>
            Small
          </Chip>
          <Chip size="md" after={<Icon name="x" size="20" />}>
            Default
          </Chip>
          <Chip size="lg" after={<Icon name="x" size="24" />}>
            Large
          </Chip>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="2">
        <Text fontWeight="600">With Before and After</Text>
        <Flex gap="4" alignItems="center">
          <Chip
            size="sm"
            before={<Icon name="user" size="20" />}
            after={<Icon name="x" size="20" />}
          >
            Small
          </Chip>
          <Chip
            size="md"
            before={<Icon name="user" size="20" />}
            after={<Icon name="x" size="20" />}
          >
            Default
          </Chip>
          <Chip
            size="lg"
            before={<Icon name="user" size="24" />}
            after={<Icon name="x" size="24" />}
          >
            Large
          </Chip>
        </Flex>
      </Flex>
    </Flex>
  ),
};

// =============================================================================
// INLINE USAGE
// =============================================================================

export const InlineWithText: Story = {
  render: () => (
    <Box maxW="lg">
      <Text>
        Chips can appear inline within text, like tagging{' '}
        <Chip before={<Icon name="user" size="20" />}>John Doe</Chip> in a
        conversation or referencing{' '}
        <Chip before={<Icon name="file" size="20" />}>Project Plan</Chip> in
        your notes.
      </Text>
    </Box>
  ),
};

// =============================================================================
// USE CASES
// =============================================================================

export const UseCases: Story = {
  render: () => (
    <Flex flexDir="column" gap="6">
      <Flex flexDir="column" gap="2">
        <Text fontWeight="600">Filter Tags</Text>
        <Flex gap="2" flexWrap="wrap">
          <Chip after={<Icon name="x" size="20" />}>React</Chip>
          <Chip after={<Icon name="x" size="20" />}>TypeScript</Chip>
          <Chip after={<Icon name="x" size="20" />}>Panda CSS</Chip>
          <Chip before={<Icon name="plus" size="20" />}>Add Filter</Chip>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="2">
        <Text fontWeight="600">Categories</Text>
        <Flex gap="2" flexWrap="wrap">
          <Chip before={<Icon name="file" size="20" />}>Documentation</Chip>
          <Chip before={<Icon name="calendar" size="20" />}>Events</Chip>
          <Chip before={<Icon name="user" size="20" />}>People</Chip>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="2">
        <Text fontWeight="600">Actions</Text>
        <Flex gap="2" flexWrap="wrap">
          <Chip before={<Icon name="plus" size="20" />}>New Item</Chip>
          <Chip before={<Icon name="check" size="20" />}>Approve</Chip>
          <Chip deleted>Archived</Chip>
        </Flex>
      </Flex>
    </Flex>
  ),
};

// =============================================================================
// DISMISSABLE
// =============================================================================

const DismissableExample = () => {
  const [tags, setTags] = useState([
    'React',
    'TypeScript',
    'Panda CSS',
    'Vite',
  ]);

  const handleDismiss = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  return (
    <Flex flexDir="column" gap="4">
      <Text>Click the X to dismiss tags:</Text>
      <Flex gap="2" flexWrap="wrap">
        {tags.map((tag) => (
          <Chip key={tag} dismissable onDismiss={() => handleDismiss(tag)}>
            {tag}
          </Chip>
        ))}
      </Flex>
      {tags.length === 0 && <Text color="text.muted">All tags dismissed!</Text>}
    </Flex>
  );
};

export const Dismissable: Story = {
  render: () => <DismissableExample />,
};

export const DismissableWithBefore: Story = {
  render: () => (
    <Flex gap="2">
      <Chip
        dismissable
        before={<Icon name="file" size="20" />}
        onDismiss={() => {}}
      >
        Document
      </Chip>
      <Chip
        dismissable
        before={<Icon name="user" size="20" />}
        onDismiss={() => {}}
      >
        Person
      </Chip>
      <Chip
        dismissable
        before={<Icon name="calendar" size="20" />}
        onDismiss={() => {}}
      >
        Event
      </Chip>
    </Flex>
  ),
};

// =============================================================================
// SINGLE SELECT (ChipGroup)
// =============================================================================

const SingleSelectExample = () => {
  const [selected, setSelected] = useState('medium');

  return (
    <Flex flexDir="column" gap="4">
      <Text>Select one size:</Text>
      <ChipGroup
        type="single"
        value={selected}
        onChange={(value) => setSelected(value as string)}
        label="Size selection"
      >
        <Chip value="sm">Small</Chip>
        <Chip value="md">Medium</Chip>
        <Chip value="lg">Large</Chip>
        <Chip value="xl">X-Large</Chip>
      </ChipGroup>
      <Text color="text.muted">Selected: {selected}</Text>
    </Flex>
  );
};

export const SingleSelect: Story = {
  render: () => <SingleSelectExample />,
};

const SingleSelectWithBeforeExample = () => {
  const [selected, setSelected] = useState('grid');

  return (
    <Flex flexDir="column" gap="4">
      <Text>Select a view:</Text>
      <ChipGroup
        type="single"
        value={selected}
        onChange={(value) => setSelected(value as string)}
        label="View selection"
      >
        <Chip value="list" before={<Icon name="menu" size="20" />}>
          List
        </Chip>
        <Chip value="grid" before={<Icon name="view-grid" size="20" />}>
          Grid
        </Chip>
        <Chip value="calendar" before={<Icon name="calendar" size="20" />}>
          Calendar
        </Chip>
      </ChipGroup>
      <Text color="text.muted">Selected: {selected}</Text>
    </Flex>
  );
};

export const SingleSelectWithBefore: Story = {
  render: () => <SingleSelectWithBeforeExample />,
};

// =============================================================================
// MULTI SELECT (ChipGroup)
// =============================================================================

const MultiSelectExample = () => {
  const [selected, setSelected] = useState<string[]>(['react', 'typescript']);

  return (
    <Flex flexDir="column" gap="4">
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
    </Flex>
  );
};

export const MultiSelect: Story = {
  render: () => <MultiSelectExample />,
};

const MultiSelectWithBeforeExample = () => {
  const [selected, setSelected] = useState<string[]>(['docs']);

  return (
    <Flex flexDir="column" gap="4">
      <Text>Filter by category:</Text>
      <ChipGroup
        type="multi"
        value={selected}
        onChange={(value) => setSelected(value as string[])}
        label="Category filter"
      >
        <Chip value="docs" before={<Icon name="file" size="20" />}>
          Documents
        </Chip>
        <Chip value="images" before={<Icon name="image" size="20" />}>
          Images
        </Chip>
        <Chip value="videos" before={<Icon name="video" size="20" />}>
          Videos
        </Chip>
        <Chip value="audio" before={<Icon name="broadcast" size="20" />}>
          Audio
        </Chip>
      </ChipGroup>
      <Text color="text.muted">Selected: {selected.join(', ') || 'None'}</Text>
    </Flex>
  );
};

export const MultiSelectWithBefore: Story = {
  render: () => <MultiSelectWithBeforeExample />,
};

// =============================================================================
// KEYBOARD NAVIGATION
// =============================================================================

export const KeyboardNavigation: Story = {
  render: () => (
    <Flex flexDir="column" gap="6">
      <Flex flexDir="column" gap="2">
        <Text fontWeight="600">
          Single Select (arrow keys navigate & select):
        </Text>
        <SingleSelectExample />
      </Flex>
      <Flex flexDir="column" gap="2">
        <Text fontWeight="600">
          Multi Select (tab between, space/enter toggles):
        </Text>
        <MultiSelectExample />
      </Flex>
    </Flex>
  ),
};
