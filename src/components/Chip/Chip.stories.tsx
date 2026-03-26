import type { Meta, StoryObj } from '@storybook/react';

import { Flex, Grid } from '@styled-system/jsx';
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
      description: 'Size variants of chip',
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
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

// =============================================================================
// DEFAULT
// =============================================================================

export const Default: Story = {
  render: () => <Chip>Default</Chip>,
};

// =============================================================================
// SIZES
// =============================================================================

export const Sizes: Story = {
  render: () => (
    <Flex gap="4" alignItems="center">
      <Chip size="sm">Small</Chip>
      <Chip>Medium (default)</Chip>
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
        <Chip before={<Badge count={30} variant="neutral" />}>Medium</Chip>
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
          before={<Avatar size="sm" src={sampleImages.user1} name="John Doe" />}
        >
          Medium
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
        <Chip before={<Icon name="file" size="20" />}>Medium</Chip>
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
      <Chip after={<Icon name="x" size="20" />}>Medium</Chip>
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
        before={<Icon name="user" size="20" />}
        after={<Icon name="x" size="20" />}
      >
        Medium
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
    <Grid gridTemplateColumns="auto auto" gap="24">
      <Text textStyle="mono.xs">Default:</Text>
      <Chip before={<Icon name="file" size="20" />}>Interactive</Chip>
      <Text textStyle="mono.xs">Disabled:</Text>
      <Chip disabled before={<Icon name="file" size="20" />}>
        Disabled
      </Chip>
      <Text textStyle="mono.xs">Loading:</Text>
      <Chip loading before={<Icon name="file" size="20" />}>
        Loading...
      </Chip>
      <Text textStyle="mono.xs">Deleted:</Text>
      <Chip deleted before={<Icon name="file" size="20" />}>
        Deleted Item
      </Chip>
    </Grid>
  ),
};

// =============================================================================
// INTERACTIVE
// =============================================================================

export const Interactive: Story = {
  render: () => (
    <Flex flexDir="column" gap="12">
      <Text textStyle="mono.xs">Chips can be interactive buttons:</Text>
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
    <Flex flexDir="column" gap="12">
      <Flex flexDir="column" gap="2">
        <Text textStyle="mono.xs">No Content Before/After</Text>
        <Flex gap="4" alignItems="center">
          <Chip size="sm">Small</Chip>
          <Chip>Medium</Chip>
          <Chip size="lg">Large</Chip>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="2">
        <Text textStyle="mono.xs">With Before</Text>
        <Flex gap="4" alignItems="center">
          <Chip size="sm" before={<Icon name="file" size="20" />}>
            Small
          </Chip>
          <Chip before={<Icon name="file" size="20" />}>Medium</Chip>
          <Chip size="lg" before={<Icon name="file" size="24" />}>
            Large
          </Chip>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="2">
        <Text textStyle="mono.xs">With After</Text>
        <Flex gap="4" alignItems="center">
          <Chip size="sm" after={<Icon name="x" size="20" />}>
            Small
          </Chip>
          <Chip after={<Icon name="x" size="20" />}>Medium</Chip>
          <Chip size="lg" after={<Icon name="x" size="24" />}>
            Large
          </Chip>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="2">
        <Text textStyle="mono.xs">With Before and After</Text>
        <Flex gap="4" alignItems="center">
          <Chip
            size="sm"
            before={<Icon name="user" size="20" />}
            after={<Icon name="x" size="20" />}
          >
            Small
          </Chip>
          <Chip
            before={<Icon name="user" size="20" />}
            after={<Icon name="x" size="20" />}
          >
            Medium
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
    <Flex flexDir="column" gap="20">
      <Flex flexDir="column" gap="2">
        <Text textStyle="mono.xs">Filter Tags</Text>
        <Flex gap="4" flexWrap="wrap">
          <Chip after={<Icon name="x" size="20" />}>React</Chip>
          <Chip after={<Icon name="x" size="20" />}>TypeScript</Chip>
          <Chip after={<Icon name="x" size="20" />}>Panda CSS</Chip>
          <Chip before={<Icon name="plus" size="20" />}>Add Filter</Chip>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="2">
        <Text textStyle="mono.xs">Categories</Text>
        <Flex gap="4" flexWrap="wrap">
          <Chip before={<Icon name="file" size="20" />}>Documentation</Chip>
          <Chip before={<Icon name="calendar" size="20" />}>Events</Chip>
          <Chip before={<Icon name="user" size="20" />}>People</Chip>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="2">
        <Text textStyle="mono.xs">Actions</Text>
        <Flex gap="4" flexWrap="wrap">
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

export const Dismissable = () => {
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
    <Flex flexDir="column" gap="12">
      <Text textStyle="mono.xs">Click the X to dismiss tags:</Text>
      <Flex gap="4" flexWrap="wrap">
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

export const DismissableWithBefore: Story = {
  render: () => (
    <Flex gap="4">
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

export const SingleSelect = () => {
  const [selected, setSelected] = useState('');

  return (
    <Flex flexDir="column" gap="12">
      <Text textStyle="mono.md">Select one size:</Text>
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
      <Text textStyle="mono.xs">Selected: {selected}</Text>
    </Flex>
  );
};

export const SingleSelectWithBefore = () => {
  const [selected, setSelected] = useState('grid');

  return (
    <Flex flexDir="column" gap="12">
      <Text textStyle="mono.md">Select a view:</Text>
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
      <Text textStyle="mono.xs">Selected: {selected}</Text>
    </Flex>
  );
};

// =============================================================================
// MULTI SELECT (ChipGroup)
// =============================================================================

export const MultiSelect = () => {
  const [selected, setSelected] = useState<string[]>(['react', 'typescript']);

  return (
    <Flex flexDir="column" gap="12">
      <Text textStyle="mono.md">
        Select your skills (check icon appears when selected):
      </Text>
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
      <Text textStyle="mono.xs">Selected: {selected.join(', ') || 'None'}</Text>
    </Flex>
  );
};

export const MultiSelectWithBefore = () => {
  const [selected, setSelected] = useState<string[]>(['docs']);

  return (
    <Flex flexDir="column" gap="12">
      <Text textStyle="mono.md">Filter by category:</Text>
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
      <Text textStyle="mono.xs">Selected: {selected.join(', ') || 'None'}</Text>
    </Flex>
  );
};

const SingleSelectExample = () => {
  const [selected, setSelected] = useState('list');

  return (
    <ChipGroup
      type="single"
      value={selected}
      onChange={(value) => setSelected(value as string)}
      label="Keyboard navigation single select example"
    >
      <Chip value="list">List</Chip>
      <Chip value="grid">Grid</Chip>
      <Chip value="calendar">Calendar</Chip>
    </ChipGroup>
  );
};

const MultiSelectExample = () => {
  const [selected, setSelected] = useState<string[]>(['docs']);

  return (
    <ChipGroup
      type="multi"
      value={selected}
      onChange={(value) => setSelected(value as string[])}
      label="Keyboard navigation multi select example"
    >
      <Chip value="docs">Docs</Chip>
      <Chip value="images">Images</Chip>
      <Chip value="video">Video</Chip>
    </ChipGroup>
  );
};

// =============================================================================
// KEYBOARD NAVIGATION
// =============================================================================

export const KeyboardNavigation: Story = {
  render: () => (
    <Flex flexDir="column" gap="40">
      <Flex flexDir="column" gap="2">
        <Text textStyle="mono.md" color="text" fontWeight="bold">
          Single Select (arrow keys navigate & select):
        </Text>
        <SingleSelectExample />
      </Flex>
      <Flex flexDir="column" gap="2">
        <Text textStyle="mono.md" color="text" fontWeight="bold">
          Multi Select (tab between, space/enter toggles):
        </Text>
        <MultiSelectExample />
      </Flex>
    </Flex>
  ),
};

// =============================================================================
// CHIP GROUP — SIZES
// =============================================================================

export const ChipGroupSizes = () => {
  const [smValue, setSmValue] = useState('option-a');
  const [mdValue, setMdValue] = useState('option-a');
  const [lgValue, setLgValue] = useState('option-a');

  return (
    <Flex flexDir="column" gap="24">
      <Flex flexDir="column" gap="2">
        <Text textStyle="mono.xs">Small</Text>
        <ChipGroup
          type="single"
          value={smValue}
          onChange={(v) => setSmValue(v as string)}
          label="Small chip group"
        >
          <Chip value="option-a" size="sm">
            Option A
          </Chip>
          <Chip value="option-b" size="sm">
            Option B
          </Chip>
          <Chip value="option-c" size="sm">
            Option C
          </Chip>
        </ChipGroup>
      </Flex>
      <Flex flexDir="column" gap="2">
        <Text textStyle="mono.xs">Medium</Text>
        <ChipGroup
          type="single"
          value={mdValue}
          onChange={(v) => setMdValue(v as string)}
          label="Medium chip group"
        >
          <Chip value="option-a">Option A</Chip>
          <Chip value="option-b">Option B</Chip>
          <Chip value="option-c">Option C</Chip>
        </ChipGroup>
      </Flex>
      <Flex flexDir="column" gap="2">
        <Text textStyle="mono.xs">Large</Text>
        <ChipGroup
          type="single"
          value={lgValue}
          onChange={(v) => setLgValue(v as string)}
          label="Large chip group"
        >
          <Chip value="option-a" size="lg">
            Option A
          </Chip>
          <Chip value="option-b" size="lg">
            Option B
          </Chip>
          <Chip value="option-c" size="lg">
            Option C
          </Chip>
        </ChipGroup>
      </Flex>
    </Flex>
  );
};

// =============================================================================
// CHIP GROUP — DISABLED CHIPS
// =============================================================================

export const ChipGroupWithDisabled = () => {
  const [selected, setSelected] = useState('active');

  return (
    <Flex flexDir="column" gap="12">
      <Text textStyle="mono.md">
        Individual chips can be disabled within a group:
      </Text>
      <ChipGroup
        type="single"
        value={selected}
        onChange={(v) => setSelected(v as string)}
        label="Options with disabled"
      >
        <Chip value="active">Active</Chip>
        <Chip value="pending">Pending</Chip>
        <Chip value="unavailable" disabled>
          Unavailable
        </Chip>
        <Chip value="archived">Archived</Chip>
      </ChipGroup>
      <Text textStyle="mono.xs">Selected: {selected}</Text>
    </Flex>
  );
};

// =============================================================================
// CHIP GROUP — WRAPPING
// =============================================================================

export const ChipGroupWrapping = () => {
  const [selected, setSelected] = useState<string[]>(['react', 'typescript']);

  const skills = [
    'React',
    'TypeScript',
    'JavaScript',
    'Vue',
    'Angular',
    'Svelte',
    'Next.js',
    'Remix',
    'Astro',
    'Node.js',
    'Python',
    'Go',
    'Rust',
    'GraphQL',
    'REST',
    'Docker',
  ];

  return (
    <Flex flexDir="column" gap="12" maxW="md">
      <Text textStyle="mono.md">
        ChipGroup wraps when chips exceed container width:
      </Text>
      <ChipGroup
        type="multi"
        value={selected}
        onChange={(v) => setSelected(v as string[])}
        label="Skills selection"
      >
        {skills.map((skill) => (
          <Chip key={skill.toLowerCase()} value={skill.toLowerCase()}>
            {skill}
          </Chip>
        ))}
      </ChipGroup>
      <Text textStyle="mono.xs">Selected: {selected.join(', ') || 'None'}</Text>
    </Flex>
  );
};
