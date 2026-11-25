import type { Meta, StoryObj } from '@storybook/react-vite';
import { HStack, VStack } from '@styled-system/jsx';
import { sampleAvatars } from '~/storybook/fixtures/avatars';
import { Avatar } from '../Avatar';
import { Text } from '../Text';
import { AvatarStack } from './AvatarStack';

const people = [
  { name: 'Shaun Fox', src: sampleAvatars.user1 },
  { name: 'Bob Barker', src: sampleAvatars.user2 },
  { name: 'Kim Sanders', src: sampleAvatars.user3 },
  { name: 'Diana Prince', src: sampleAvatars.user4 },
  { name: 'Ellis Grey', src: undefined },
];

const meta = {
  title: 'Components/AvatarStack',
  component: AvatarStack,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Size applied to every avatar that does not set its own',
    },
    max: {
      control: 'number',
      description: 'Largest number of avatars to show before "+N"',
    },
  },
  args: {
    size: 'md',
    max: 3,
    'aria-label': '5 people',
    children: people.map((person) => (
      <Avatar key={person.name} src={person.src} name={person.name} />
    )),
  },
} satisfies Meta<typeof AvatarStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Initials: Story = {
  render: () => (
    <VStack gap="16" alignItems="start">
      <AvatarStack max={3} aria-label="5 people">
        {people.map((person) => (
          <Avatar key={person.name} name={person.name} />
        ))}
      </AvatarStack>
      <AvatarStack aria-label="3 people">
        {people.slice(0, 3).map((person) => (
          <Avatar key={person.name} name={person.name} />
        ))}
      </AvatarStack>
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

export const Sizes: Story = {
  render: () => (
    <VStack gap="16" alignItems="start">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <HStack key={size} gap="16">
          <Text textStyle="mono.sm" w="32">
            {size}
          </Text>
          <AvatarStack size={size} max={3} aria-label="5 people">
            {people.map((person) => (
              <Avatar key={person.name} name={person.name} />
            ))}
          </AvatarStack>
        </HStack>
      ))}
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

export const ExRecordHeader: Story = {
  name: 'Ex: Record header',
  render: () => (
    <HStack gap="8">
      <Text fontSize="12" color="text.subtle">
        Assigned to
      </Text>
      <AvatarStack max={3} aria-label="Assigned to 5 people">
        {people.map((person) => (
          <Avatar key={person.name} src={person.src} name={person.name} />
        ))}
      </AvatarStack>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};
