import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';
import { Box } from '../Box';
import { Text } from '../Text';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['resolved', 'placeholder', 'loading', 'deleted'],
    },
    hue: {
      control: 'select',
      options: ['blue', 'purple', 'orange', 'green', 'gray'],
    },
    iconName: {
      control: 'select',
      options: [undefined, 'file', 'calendar', 'user', 'plus'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: 'Project Planning',
    state: 'resolved',
    hue: 'blue',
    iconName: 'file',
  },
};

export const States: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="4">
      <Box display="flex" gap="2" alignItems="center">
        <Text fontWeight="500" w="100">Resolved:</Text>
        <Chip state="resolved" hue="blue" iconName="file">Project Planning</Chip>
      </Box>
      <Box display="flex" gap="2" alignItems="center">
        <Text fontWeight="500" w="100">Placeholder:</Text>
        <Chip state="placeholder" hue="blue" iconName="plus">New Page</Chip>
      </Box>
      <Box display="flex" gap="2" alignItems="center">
        <Text fontWeight="500" w="100">Loading:</Text>
        <Chip state="loading" hue="blue" iconName="file">Loading...</Chip>
      </Box>
      <Box display="flex" gap="2" alignItems="center">
        <Text fontWeight="500" w="100">Deleted:</Text>
        <Chip state="deleted" hue="blue" iconName="file">Deleted Page</Chip>
      </Box>
    </Box>
  ),
};

export const Hues: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="4">
      <Box display="flex" gap="2" alignItems="center">
        <Text fontWeight="500" w="100">Blue (page):</Text>
        <Chip hue="blue" iconName="file">Project Planning</Chip>
      </Box>
      <Box display="flex" gap="2" alignItems="center">
        <Text fontWeight="500" w="100">Purple (daily):</Text>
        <Chip hue="purple" iconName="calendar">2024-01-15</Chip>
      </Box>
      <Box display="flex" gap="2" alignItems="center">
        <Text fontWeight="500" w="100">Orange (event):</Text>
        <Chip hue="orange" iconName="calendar">Team Meeting</Chip>
      </Box>
      <Box display="flex" gap="2" alignItems="center">
        <Text fontWeight="500" w="100">Green (person):</Text>
        <Chip hue="green" iconName="user">John Doe</Chip>
      </Box>
      <Box display="flex" gap="2" alignItems="center">
        <Text fontWeight="500" w="100">Gray (default):</Text>
        <Chip hue="gray">Unknown Entity</Chip>
      </Box>
    </Box>
  ),
};

export const InlineWithText: Story = {
  render: () => (
    <Box maxW="600">
      <Text>
        As discussed in <Chip hue="blue" iconName="file">Project Planning</Chip> during
        the meeting with <Chip hue="green" iconName="user">Sarah</Chip>, we should follow
        up on <Chip hue="purple" iconName="calendar">2024-01-20</Chip> to review the
        progress. Don't forget to check the <Chip hue="orange" iconName="calendar">Sprint Review</Chip> event.
      </Text>
    </Box>
  ),
};

export const WithoutIcons: Story = {
  render: () => (
    <Box display="flex" gap="2">
      <Chip hue="blue">Page Link</Chip>
      <Chip hue="purple">Daily Note</Chip>
      <Chip hue="green">Person</Chip>
    </Box>
  ),
};

export const PlaceholderStates: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="4">
      <Text>Click placeholder chips to create new entities:</Text>
      <Box display="flex" gap="2">
        <Chip state="placeholder" hue="blue" iconName="plus">New Page</Chip>
        <Chip state="placeholder" hue="purple" iconName="plus">Future Note</Chip>
        <Chip state="placeholder" hue="green" iconName="plus">Add Person</Chip>
      </Box>
    </Box>
  ),
};

export const AllStatesAllHues: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="4">
      {(['blue', 'purple', 'orange', 'green', 'gray'] as const).map((hue) => (
        <Box key={hue} display="flex" gap="2" alignItems="center">
          <Text fontWeight="500" w="80" textTransform="capitalize">{hue}:</Text>
          <Chip state="resolved" hue={hue} iconName="file">Resolved</Chip>
          <Chip state="placeholder" hue={hue} iconName="plus">Placeholder</Chip>
          <Chip state="loading" hue={hue}>Loading</Chip>
          <Chip state="deleted" hue={hue}>Deleted</Chip>
        </Box>
      ))}
    </Box>
  ),
};
