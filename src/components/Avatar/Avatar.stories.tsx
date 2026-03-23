import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size of the avatar',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'hexagon'],
      description:
        'Shape of the avatar (circle for users, square for projects, hexagon for an agent entity)',
    },
    presence: {
      control: 'select',
      options: [undefined, 'online', 'busy', 'offline', 'focus'],
      description: 'Presence indicator shown at bottom-right',
    },
    status: {
      control: 'select',
      options: [undefined, 'approved', 'declined', 'locked'],
      description: 'Status indicator shown at top-right',
    },
    name: {
      control: 'text',
      description: 'Name for generating initials fallback',
    },
    src: {
      control: 'text',
      description: 'Image source URL',
    },
  },
  args: {
    size: 'md',
    shape: 'circle',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Sample avatar images (using placeholder service)
const sampleImages = {
  user1: 'https://i.pravatar.cc/150?img=1',
  user2: 'https://i.pravatar.cc/150?img=2',
  user3: 'https://i.pravatar.cc/150?img=3',
  user4: 'https://i.pravatar.cc/150?img=4',
  user5: 'https://i.pravatar.cc/150?img=5',
};

// =============================================================================
// DEFAULT
// =============================================================================

export const Default: Story = {
  args: {
    src: sampleImages.user1,
    name: 'John Doe',
    alt: 'John Doe',
  },
};

// =============================================================================
// SIZES
// =============================================================================

export const Sizes: Story = {
  render: () => (
    <Box display="flex" gap="4" alignItems="center">
      <Avatar size="xs" src={sampleImages.user1} name="John Doe" />
      <Avatar size="sm" src={sampleImages.user1} name="John Doe" />
      <Avatar size="md" src={sampleImages.user1} name="John Doe" />
      <Avatar size="lg" src={sampleImages.user1} name="John Doe" />
      <Avatar size="xl" src={sampleImages.user1} name="John Doe" />
      <Avatar size="2xl" src={sampleImages.user1} name="John Doe" />
    </Box>
  ),
};

export const SizesWithLabels: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="4">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Box key={size} display="flex" gap="4" alignItems="center">
          <Text w="80" fontWeight="500">
            {size}:
          </Text>
          <Avatar size={size} src={sampleImages.user1} name="John Doe" />
        </Box>
      ))}
    </Box>
  ),
};

// =============================================================================
// SHAPES
// =============================================================================

export const Shapes: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="6">
      <Box display="flex" flexDir="column" gap="2">
        <Text fontWeight="600">Circle (for users)</Text>
        <Box display="flex" gap="4" alignItems="center">
          <Avatar shape="circle" size="sm" src={sampleImages.user1} />
          <Avatar shape="circle" size="md" src={sampleImages.user2} />
          <Avatar shape="circle" size="lg" src={sampleImages.user3} />
        </Box>
      </Box>
      <Box display="flex" flexDir="column" gap="2">
        <Text fontWeight="600">Square (for projects/entities)</Text>
        <Box display="flex" gap="4" alignItems="center">
          <Avatar shape="square" size="sm" src={sampleImages.user4} />
          <Avatar shape="square" size="md" src={sampleImages.user5} />
          <Avatar shape="square" size="lg" src={sampleImages.user1} />
        </Box>
      </Box>
      <Box display="flex" flexDir="column" gap="2">
        <Text fontWeight="600">Hexagon (for an agent entity)</Text>
        <Box display="flex" gap="4" alignItems="center">
          <Avatar shape="hexagon" size="sm" src={sampleImages.user4} />
          <Avatar shape="hexagon" size="md" src={sampleImages.user5} />
          <Avatar shape="hexagon" size="lg" src={sampleImages.user1} />
        </Box>
      </Box>
    </Box>
  ),
};

// =============================================================================
// FALLBACK CONTENT
// =============================================================================

export const WithInitials: Story = {
  render: () => (
    <Box display="flex" gap="4" alignItems="center">
      <Avatar size="sm" name="John Doe" />
      <Avatar size="md" name="Alice Smith" />
      <Avatar size="lg" name="Bob" />
      <Avatar size="xl" name="Charlie Brown" />
    </Box>
  ),
};

export const WithCustomFallback: Story = {
  render: () => (
    <Box display="flex" gap="4" alignItems="center">
      <Avatar size="md" fallback={<Icon name="user" />} />
      <Avatar size="md" fallback={<Icon name="user-group" />} />
      <Avatar size="md" fallback={<Icon name="Building" />} />
      <Avatar size="md" fallback="?" />
    </Box>
  ),
};

export const ImageLoadError: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="4">
      <Text>When image fails to load, fallback is shown:</Text>
      <Box display="flex" gap="4" alignItems="center">
        <Avatar size="md" src="invalid-url.jpg" name="John Doe" />
        <Avatar size="md" src="invalid-url.jpg" />
        <Avatar
          size="md"
          src="invalid-url.jpg"
          fallback={<Icon name="user" />}
        />
      </Box>
    </Box>
  ),
};

// =============================================================================
// PRESENCE INDICATORS
// =============================================================================

export const Presence: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="6">
      <Text fontWeight="600">
        Presence indicates availability (bottom-right)
      </Text>
      <Box display="flex" gap="6" alignItems="center">
        <Box display="flex" flexDir="column" gap="2" alignItems="center">
          <Avatar size="lg" src={sampleImages.user1} presence="online" />
          <Text fontSize="12">Online</Text>
        </Box>
        <Box display="flex" flexDir="column" gap="2" alignItems="center">
          <Avatar size="lg" src={sampleImages.user2} presence="busy" />
          <Text fontSize="12">Busy</Text>
        </Box>
        <Box display="flex" flexDir="column" gap="2" alignItems="center">
          <Avatar size="lg" src={sampleImages.user3} presence="offline" />
          <Text fontSize="12">Offline</Text>
        </Box>
        <Box display="flex" flexDir="column" gap="2" alignItems="center">
          <Avatar size="lg" src={sampleImages.user4} presence="focus" />
          <Text fontSize="12">Focus</Text>
        </Box>
      </Box>
    </Box>
  ),
};

export const PresenceAllSizes: Story = {
  render: () => (
    <Box display="flex" gap="4" alignItems="center">
      <Avatar size="xs" src={sampleImages.user1} presence="online" />
      <Avatar size="sm" src={sampleImages.user1} presence="online" />
      <Avatar size="md" src={sampleImages.user1} presence="online" />
      <Avatar size="lg" src={sampleImages.user1} presence="online" />
      <Avatar size="xl" src={sampleImages.user1} presence="online" />
      <Avatar size="2xl" src={sampleImages.user1} presence="online" />
    </Box>
  ),
};

// =============================================================================
// STATUS INDICATORS
// =============================================================================

export const Status: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="6">
      <Text fontWeight="600">
        Status shows contextual information (top-right)
      </Text>
      <Box display="flex" gap="6" alignItems="center">
        <Box display="flex" flexDir="column" gap="2" alignItems="center">
          <Avatar size="lg" src={sampleImages.user1} status="approved" />
          <Text fontSize="12">Approved</Text>
        </Box>
        <Box display="flex" flexDir="column" gap="2" alignItems="center">
          <Avatar size="lg" src={sampleImages.user2} status="declined" />
          <Text fontSize="12">Declined</Text>
        </Box>
        <Box display="flex" flexDir="column" gap="2" alignItems="center">
          <Avatar size="lg" src={sampleImages.user3} status="locked" />
          <Text fontSize="12">Locked</Text>
        </Box>
      </Box>
    </Box>
  ),
};

export const StatusAllSizes: Story = {
  render: () => (
    <Box display="flex" gap="4" alignItems="center">
      <Avatar size="xs" src={sampleImages.user1} status="approved" />
      <Avatar size="sm" src={sampleImages.user1} status="approved" />
      <Avatar size="md" src={sampleImages.user1} status="approved" />
      <Avatar size="lg" src={sampleImages.user1} status="approved" />
      <Avatar size="xl" src={sampleImages.user1} status="approved" />
      <Avatar size="2xl" src={sampleImages.user1} status="approved" />
    </Box>
  ),
};

// =============================================================================
// COMBINED PRESENCE AND STATUS
// =============================================================================

export const PresenceAndStatus: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="4">
      <Text>Both presence and status can be shown together:</Text>
      <Box display="flex" gap="4" alignItems="center">
        <Avatar
          size="lg"
          src={sampleImages.user1}
          presence="online"
          status="approved"
        />
        <Avatar
          size="lg"
          src={sampleImages.user2}
          presence="busy"
          status="declined"
        />
        <Avatar
          size="lg"
          src={sampleImages.user3}
          presence="offline"
          status="locked"
        />
      </Box>
    </Box>
  ),
};

// =============================================================================
// USE CASES
// =============================================================================

export const UserList: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="3">
      {[
        {
          name: 'Alice Johnson',
          presence: 'online' as const,
          img: sampleImages.user1,
        },
        {
          name: 'Bob Smith',
          presence: 'busy' as const,
          img: sampleImages.user2,
        },
        {
          name: 'Charlie Brown',
          presence: 'offline' as const,
          img: sampleImages.user3,
        },
        {
          name: 'Diana Prince',
          presence: 'focus' as const,
          img: sampleImages.user4,
        },
      ].map((user) => (
        <Box key={user.name} display="flex" gap="3" alignItems="center">
          <Avatar
            size="md"
            src={user.img}
            name={user.name}
            presence={user.presence}
          />
          <Box>
            <Text fontWeight="500">{user.name}</Text>
            <Text fontSize="12" color="text.subtle">
              {user.presence === 'online'
                ? 'Available'
                : user.presence === 'busy'
                  ? 'In a meeting'
                  : user.presence === 'focus'
                    ? 'Do not disturb'
                    : 'Away'}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  ),
};

export const ProjectAvatars: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="4">
      <Text fontWeight="600">Project/Entity Avatars (Square)</Text>
      <Box display="flex" gap="4">
        <Box display="flex" flexDir="column" gap="2" alignItems="center">
          <Avatar shape="square" size="lg" name="Design System" />
          <Text fontSize="12">Design System</Text>
        </Box>
        <Box display="flex" flexDir="column" gap="2" alignItems="center">
          <Avatar shape="square" size="lg" name="Marketing" />
          <Text fontSize="12">Marketing</Text>
        </Box>
        <Box display="flex" flexDir="column" gap="2" alignItems="center">
          <Avatar shape="square" size="lg" name="Engineering" />
          <Text fontSize="12">Engineering</Text>
        </Box>
      </Box>
    </Box>
  ),
};

// =============================================================================
// AVATAR GROUP (STACKED)
// =============================================================================

export const AvatarStack: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="4">
      <Text fontWeight="600">Stacked Avatars</Text>
      <Box display="flex">
        {[
          sampleImages.user1,
          sampleImages.user2,
          sampleImages.user3,
          sampleImages.user4,
        ].map((src, i) => (
          <Box
            key={src}
            style={{ marginLeft: i > 0 ? '-8px' : '0', zIndex: 4 - i }}
            position="relative"
          >
            <Avatar size="md" src={src} borderColor="var(--colors-bg)" />
          </Box>
        ))}
        <Box style={{ marginLeft: '-8px' }} position="relative" zIndex='base'>
          <Avatar size="md" fallback="+3" />
        </Box>
      </Box>
    </Box>
  ),
};
