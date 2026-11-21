import type { Meta, StoryObj } from '@storybook/react-vite';

import { Flex, Grid, VStack } from '@styled-system/jsx';
import { type ReactNode, useState } from 'react';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
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
      options: ['sm', 'md', 'lg', 'xl'],
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
    items: {
      control: 'object',
      description:
        'List label used instead of children. More than two items show the first two plus +N and a tooltip with every item',
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
      <Chip size="xl">X-Large</Chip>
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
          <Chip size="xl">X-Large</Chip>
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
          <Chip size="xl" before={<Icon name="file" size="24" />}>
            X-Large
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
          <Chip size="xl" after={<Icon name="x" size="24" />}>
            X-Large
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
          <Chip
            size="xl"
            before={<Icon name="user" size="24" />}
            after={<Icon name="x" size="24" />}
          >
            X-Large
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
    <VStack maxW="lg" alignItems="stretch" gap="8">
      <Text>
        Chips can appear inline within text, like tagging{' '}
        <Chip before={<Icon name="user" size="20" />}>John Doe</Chip> in a
        conversation or referencing{' '}
        <Chip before={<Icon name="file" size="20" />}>Project Plan</Chip> in
        your notes.
      </Text>
      <Text>
        Chips with more than two items collapse to a count and should stay on
        the same baseline as plain chips: <Chip>Design</Chip>{' '}
        <Chip items={['Design', 'Engineering', 'Product']} /> and{' '}
        <Chip
          before={<Icon name="user" size="20" />}
          items={['Ann', 'Bob', 'Cy', 'Di']}
        />{' '}
        <Chip>Design, Engineering</Chip> sit in one line of text.
      </Text>
    </VStack>
  ),
};

// =============================================================================
// ITEMS (LIST LABEL WITH OVERFLOW)
// =============================================================================

export const MultipleItems: Story = {
  render: () => (
    <Flex gap="4" alignItems="center">
      <Chip items={['Design', 'Engineering']} />
      <Chip items={['Design', 'Engineering', 'Product']} />
      <Chip
        dismissable
        onDismiss={() => {}}
        items={['Design', 'Engineering', 'Product', 'Support', 'Sales']}
      />
    </Flex>
  ),
};

export const EmptyItems: Story = {
  render: () => (
    <VStack gap="8" alignItems="flex-start">
      <Text textStyle="mono.xs">
        An empty `items` list renders nothing: the chip between the two labels
        below is absent, with no empty pill or dismiss button.
      </Text>
      <Flex gap="4" alignItems="center">
        <Chip>Before</Chip>
        <Chip items={[]} dismissable onDismiss={() => {}} />
        <Chip>After</Chip>
      </Flex>
    </VStack>
  ),
};

const overflowItems = ['Design', 'Engineering', 'Product', 'Support', 'Sales'];

const OverflowExample = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <VStack gap="4" alignItems="flex-start">
    <Text textStyle="mono.xs">{label}</Text>
    {children}
  </VStack>
);

export const OverflowStates: Story = {
  render: () => (
    <VStack gap="12" alignItems="flex-start">
      <Text textStyle="mono.xs">
        Overflow is by item count, not width. Hover or focus each chip to see
        the full list. Disabled and loading chips do not open the tooltip or
        take focus. Static chips have no visual styling for deleted, error or
        invalid, so those look like a plain chip.
      </Text>
      <Flex gap="12" alignItems="flex-end" flexWrap="wrap">
        <OverflowExample label="size sm">
          <Chip size="sm" items={overflowItems} />
        </OverflowExample>
        <OverflowExample label="size md">
          <Chip size="md" items={overflowItems} />
        </OverflowExample>
        <OverflowExample label="size lg">
          <Chip size="lg" items={overflowItems} />
        </OverflowExample>
      </Flex>
      <Flex gap="12" alignItems="flex-end" flexWrap="wrap">
        <OverflowExample label="before">
          <Chip before={<Icon name="user" />} items={overflowItems} />
        </OverflowExample>
        <OverflowExample label="after">
          <Chip after={<Icon name="file" />} items={overflowItems} />
        </OverflowExample>
        <OverflowExample label="before + dismissable">
          <Chip
            before={<Icon name="user" />}
            dismissable
            onDismiss={() => {}}
            items={overflowItems}
          />
        </OverflowExample>
      </Flex>
      <Flex gap="12" alignItems="flex-end" flexWrap="wrap">
        <OverflowExample label="disabled (no tooltip, not focusable)">
          <Chip disabled items={overflowItems} />
        </OverflowExample>
        <OverflowExample label="loading (no tooltip, not focusable)">
          <Chip loading items={overflowItems} />
        </OverflowExample>
        <OverflowExample label="deleted (no static styling)">
          <Chip deleted items={overflowItems} />
        </OverflowExample>
        <OverflowExample label="error (no static styling)">
          <Chip error items={overflowItems} />
        </OverflowExample>
        <OverflowExample label="invalid (no static styling)">
          <Chip invalid items={overflowItems} />
        </OverflowExample>
      </Flex>
      <Flex gap="12" alignItems="flex-end" flexWrap="wrap">
        <OverflowExample label="onClick (focus via button)">
          <Chip onClick={() => {}} items={overflowItems} />
        </OverflowExample>
        <OverflowExample label="dismissable + custom dismissLabel">
          <Chip
            dismissLabel="Clear all teams"
            dismissable
            onDismiss={() => {}}
            items={overflowItems}
          />
        </OverflowExample>
      </Flex>
    </VStack>
  ),
};

const EmptyItemsInGroupExample = () => {
  const [empty, setEmpty] = useState(true);

  return (
    <VStack gap="12" alignItems="flex-start">
      <Text textStyle="mono.xs">
        The first chip has an empty `items` list, so it renders nothing and must
        not register with the group. Tab into the group: the first visible chip
        (Open) should be the tab stop, and arrow keys should move focus and
        selection only between visible chips. Toggle the button to switch the
        first chip between empty and populated; registration should follow.
      </Text>
      <ChipGroup type="single" label="Status">
        <Chip value="hidden" items={empty ? [] : ['Draft', 'Review']} />
        <Chip value="open">Open</Chip>
        <Chip value="closed">Closed</Chip>
      </ChipGroup>
      <Button onClick={() => setEmpty((current) => !current)}>
        {empty ? 'Populate first chip' : 'Empty first chip'}
      </Button>
    </VStack>
  );
};

export const EmptyItemsInChipGroup: Story = {
  render: () => <EmptyItemsInGroupExample />,
};

export const OverflowInChipGroup: Story = {
  render: () => (
    <VStack gap="12" alignItems="flex-start">
      <Text textStyle="mono.xs">
        Arrow keys still move between selectable chips, and the tooltip opens on
        focus for overflowing ones.
      </Text>
      <ChipGroup type="single" defaultValue="all" label="Team filter">
        <Chip value="all">All</Chip>
        <Chip value="core" items={['Design', 'Engineering', 'Product']} />
        <Chip value="go" items={['Support', 'Sales']} />
      </ChipGroup>
      <ChipGroup type="multi" defaultValue={['core']} label="Team filter">
        <Chip value="core" items={['Design', 'Engineering', 'Product']} />
        <Chip value="go" items={['Support', 'Sales', 'Success', 'Ops']} />
      </ChipGroup>
    </VStack>
  ),
};

const allTags = ['Design', 'Engineering', 'Product', 'Support', 'Sales'];

const OverflowFocusExample = () => {
  const [count, setCount] = useState(2);
  const tags = allTags.slice(0, count);

  return (
    <VStack gap="12" alignItems="flex-start">
      <Text>
        Tab to each chip: static and dismiss-only chips become focusable at
        three or more items, show a visible focus ring, and open the tooltip.
        Escape closes it while the ring stays. For the clickable chip, change
        the count with the buttons (Shift+Tab back to the chip); focus should
        stay on it when crossing three items.
      </Text>
      <Flex gap="8" alignItems="center">
        <Chip onClick={() => {}} items={tags} />
        <Chip items={tags} />
        <Chip dismissable onDismiss={() => {}} items={tags} />
      </Flex>
      <Flex gap="8">
        <Button
          onClick={() => setCount((c) => Math.max(1, c - 1))}
          disabled={count <= 1}
        >
          Remove item
        </Button>
        <Button
          onClick={() => setCount((c) => Math.min(allTags.length, c + 1))}
          disabled={count >= allTags.length}
        >
          Add item
        </Button>
      </Flex>
    </VStack>
  );
};

export const OverflowKeyboardAndFocus: Story = {
  render: () => <OverflowFocusExample />,
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
      {tags.length === 0 && (
        <Text color="text.subtle">All tags dismissed!</Text>
      )}
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

export const DismissableWithLabel: Story = {
  render: () => (
    <Flex gap="4">
      <Chip
        dismissable
        dismissLabel="Remove technology filter"
        before={<Icon name="broadcast" size="20" />}
        onDismiss={() => {}}
      >
        Technology
      </Chip>
      <Chip
        dismissable
        dismissLabel="Remove document filter"
        before={<Icon name="file" size="20" />}
        onDismiss={() => {}}
      >
        Documents
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

export const SingleSelectUncontrolled: Story = {
  render: () => (
    <Flex flexDir="column" gap="12">
      <Text textStyle="mono.md">Uncontrolled single-select group:</Text>
      <ChipGroup
        type="single"
        defaultValue="md"
        label="Uncontrolled size selection"
      >
        <Chip value="sm">Small</Chip>
        <Chip value="md">Medium</Chip>
        <Chip value="lg">Large</Chip>
        <Chip value="xl">X-Large</Chip>
      </ChipGroup>
    </Flex>
  ),
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

export const MultiSelectUncontrolled: Story = {
  render: () => (
    <Flex flexDir="column" gap="12">
      <Text textStyle="mono.md">Uncontrolled multi-select group:</Text>
      <ChipGroup
        type="multi"
        defaultValue={['react', 'typescript']}
        label="Uncontrolled skill selection"
      >
        <Chip value="react">React</Chip>
        <Chip value="typescript">TypeScript</Chip>
        <Chip value="vue">Vue</Chip>
        <Chip value="svelte">Svelte</Chip>
      </ChipGroup>
    </Flex>
  ),
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
