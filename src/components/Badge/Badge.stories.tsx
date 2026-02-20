import type { Meta, StoryObj } from '@storybook/react';
import { Flex, Grid, VStack } from '@styled-system/jsx';
import { useState } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Text } from '../Text';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: 'number',
      description:
        'Number to show in badge. If provided, switches to count mode.',
    },
    showZero: {
      control: 'boolean',
      description: 'Show badge when count is zero',
    },
    overflowCount: {
      control: 'number',
      description: 'Max count to show before displaying "99+"',
    },
    variant: {
      control: 'select',
      options: [
        'neutral',
        'inverted',
        'subtle',
        'subtle-inverted',
        'success',
        'danger',
        'warning',
        'info',
      ],
      description: 'Color scheme of the badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
    },
  },
  args: {
    size: 'md',
    variant: 'danger',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// =============================================================================
// DOT MODE
// =============================================================================

export const DotStandalone: Story = {
  name: 'Dot (Standalone)',
  render: () => (
    <Box display="flex" gap="16" alignItems="center">
      <Badge size="sm" />
      <Badge size="md" />
      <Badge size="lg" />
    </Box>
  ),
};

export const DotWithChildren: Story = {
  name: 'Dot (With Children)',
  render: () => (
    <Box display="flex" gap="16" alignItems="center">
      <Badge>
        <Icon name="envelope" size="24" />
      </Badge>
      <Badge>
        <Icon name="bell" size="24" />
      </Badge>
      <Badge>
        <Icon name="message" size="24" />
      </Badge>
    </Box>
  ),
};

// =============================================================================
// COUNT MODE
// =============================================================================

export const CountStandalone: Story = {
  name: 'Count (Standalone)',
  render: () => (
    <VStack gap="24">
      <Flex gap="16">
        <Badge count={5} size="sm" />
        <Badge count={12} size="md" />
        <Badge count={99} size="lg" />
      </Flex>
      <Flex gap="16">
        <Button>
          Button <Badge count={5} />
        </Button>
        <Button size="lg" variant="primary" gap="8">
          Button <Badge count={12} />
        </Button>
        <Button size="sm" variant="subtle">
          Button <Badge count={99} size="sm" />
        </Button>
      </Flex>
    </VStack>
  ),
};

export const CountWithChildren: Story = {
  name: 'Count (With Children)',
  render: () => (
    <VStack w="fit" gap="16">
      <Box display="flex" gap="16" alignItems="center">
        <Badge count={5}>
          <Icon name="envelope" size="24" />
        </Badge>
        <Badge count={12}>
          <Icon name="bell" size="24" />
        </Badge>
        <Badge count={99}>
          <Icon name="message" size="24" />
        </Badge>
      </Box>
      <Box display="flex" gap="16" alignItems="center">
        <Badge count={5}>
          <Button>Button</Button>
        </Badge>
        <Badge count={12}>
          <Button size="lg" variant="primary">
            Button
          </Button>
        </Badge>
        <Badge count={99} size="sm">
          <Button size="sm" variant="subtle">
            Button
          </Button>
        </Badge>
      </Box>
    </VStack>
  ),
};

// =============================================================================
// SIZES
// =============================================================================

export const Sizes: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="6">
      <Box display="flex" flexDir="column" gap="2">
        <Text fontWeight="600">Dot Mode:</Text>
        <Box display="flex" gap="16" alignItems="center">
          <Badge size="sm">
            <Icon name="envelope" size="20" />
          </Badge>
          <Badge size="md">
            <Icon name="envelope" size="24" />
          </Badge>
          <Badge size="lg">
            <Icon name="envelope" size="32" />
          </Badge>
        </Box>
      </Box>
      <Box display="flex" flexDir="column" gap="2">
        <Text fontWeight="600">Count Mode:</Text>
        <Box display="flex" gap="16" alignItems="center">
          <Badge count={5} size="sm">
            <Icon name="envelope" size="20" />
          </Badge>
          <Badge count={12} size="md">
            <Icon name="envelope" size="24" />
          </Badge>
          <Badge count={99} size="lg">
            <Icon name="envelope" size="32" />
          </Badge>
        </Box>
      </Box>
    </Box>
  ),
};

// =============================================================================
// variantS
// =============================================================================

export const variants: Story = {
  render: () => (
    <Flex flexDir="column" gap="16">
      <Flex flexDir="column" gap="12">
        <Text fontWeight="600">Dot Mode:</Text>
        <Flex gap="16" alignItems="center" flexWrap="wrap">
          <Flex flexDir="column" alignItems="center" gap="1">
            <Badge variant="danger">
              <Icon name="envelope" size="24" />
            </Badge>
            <Text fontSize="12" color="text.muted">
              danger
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center" gap="1">
            <Badge variant="success">
              <Icon name="envelope" size="24" />
            </Badge>
            <Text fontSize="12" color="text.muted">
              success
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center" gap="1">
            <Badge variant="warning">
              <Icon name="envelope" size="24" />
            </Badge>
            <Text fontSize="12" color="text.muted">
              warning
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center" gap="1">
            <Badge variant="info">
              <Icon name="envelope" size="24" />
            </Badge>
            <Text fontSize="12" color="text.muted">
              info
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center" gap="1">
            <Badge variant="neutral">
              <Icon name="envelope" size="24" />
            </Badge>
            <Text fontSize="12" color="text.muted">
              neutral
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center" gap="1">
            <Badge variant="subtle">
              <Icon name="envelope" size="24" />
            </Badge>
            <Text fontSize="12" color="text.muted">
              subtle
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center" gap="1">
            <Badge variant="inverted">
              <Icon name="envelope" size="24" />
            </Badge>
            <Text fontSize="12" color="text.muted">
              inverted
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center" gap="1">
            <Badge variant="subtle-inverted">
              <Icon name="envelope" size="24" />
            </Badge>
            <Text fontSize="12" color="text.muted">
              subtle-inverted
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="12">
        <Text fontWeight="600">Count Mode:</Text>
        <Flex gap="16" alignItems="center" flexWrap="wrap">
          <Flex flexDir="column" alignItems="center" gap="1">
            <Badge count={5} variant="danger">
              <Icon name="envelope" size="24" />
            </Badge>
            <Text fontSize="12" color="text.muted">
              danger
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center" gap="1">
            <Badge count={3} variant="success">
              <Icon name="envelope" size="24" />
            </Badge>
            <Text fontSize="12" color="text.muted">
              success
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center" gap="1">
            <Badge count={7} variant="warning">
              <Icon name="envelope" size="24" />
            </Badge>
            <Text fontSize="12" color="text.muted">
              warning
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center" gap="1">
            <Badge count={2} variant="info">
              <Icon name="envelope" size="24" />
            </Badge>
            <Text fontSize="12" color="text.muted">
              info
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center" gap="1">
            <Badge count={9} variant="neutral">
              <Icon name="envelope" size="24" />
            </Badge>
            <Text fontSize="12" color="text.muted">
              neutral
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center" gap="1">
            <Badge count={6} variant="subtle">
              <Icon name="envelope" size="24" />
            </Badge>
            <Text fontSize="12" color="text.muted">
              subtle
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center" gap="1">
            <Badge count={4} variant="inverted">
              <Icon name="envelope" size="24" />
            </Badge>
            <Text fontSize="12" color="text.muted">
              inverted
            </Text>
          </Flex>
          <Flex flexDir="column" alignItems="center" gap="1">
            <Badge count={8} variant="subtle-inverted">
              <Icon name="envelope" size="24" />
            </Badge>
            <Text fontSize="12" color="text.muted">
              subtle-inverted
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  ),
};

// =============================================================================
// OVERFLOW COUNT
// =============================================================================

export const OverflowCount: Story = {
  render: () => (
    <Flex flexDir="column" gap="12">
      <Text>Default overflow at 99:</Text>
      <Flex gap="16" alignItems="center">
        <Badge count={99}>
          <Icon name="envelope" size="24" />
        </Badge>
        <Badge count={100}>
          <Icon name="envelope" size="24" />
        </Badge>
        <Badge count={999}>
          <Icon name="envelope" size="24" />
        </Badge>
      </Flex>
      <Text>Custom overflow at 10:</Text>
      <Flex gap="16" alignItems="center">
        <Badge count={10} overflowCount={10}>
          <Icon name="envelope" size="24" />
        </Badge>
        <Badge count={11} overflowCount={10}>
          <Icon name="envelope" size="24" />
        </Badge>
        <Badge count={100} overflowCount={10}>
          <Icon name="envelope" size="24" />
        </Badge>
      </Flex>
    </Flex>
  ),
};

// =============================================================================
// SHOW ZERO
// =============================================================================

export const ShowZero: Story = {
  render: () => (
    <Grid gridTemplateColumns="auto auto auto" gap="16" w="fit">
      <Text>showZero=false:</Text>
      <Badge count={0}>
        <Icon name="envelope" size="24" />
      </Badge>
      <Text textStyle="mono.xs" color="text.muted">
        (badge hidden)
      </Text>

      <Text>showZero=true:</Text>
      <Badge count={0} showZero>
        <Icon name="envelope" size="24" />
      </Badge>
      <Text textStyle="mono.xs" color="text.muted">
        (badge visible)
      </Text>
    </Grid>
  ),
};

// =============================================================================
// ANIMATION DEMO
// =============================================================================

const AnimationDemo = () => {
  const [count, setCount] = useState(5);

  return (
    <Box display="flex" flexDir="column" gap="12">
      <Text>Click buttons to see animation on count change:</Text>
      <Box display="flex" gap="4" alignItems="center">
        <Badge count={count} mx="16">
          <Icon name="envelope" size="32" />
        </Badge>
        <IconButton
          variant="hollow"
          size="sm"
          iconName="minus"
          onClick={() => setCount((c) => Math.max(0, c - 1))}
        />
        <IconButton
          variant="hollow"
          size="sm"
          iconName="plus"
          onClick={() => setCount((c) => c + 1)}
        />
      </Box>
      <Text color="text.muted">Current count: {count}</Text>
    </Box>
  );
};

export const Animation: Story = {
  render: () => <AnimationDemo />,
};

// =============================================================================
// USE CASES
// =============================================================================

export const UseCases: Story = {
  render: () => (
    <Box display="flex" flexDir="column" gap="12">
      <Box display="flex" flexDir="column" gap="12">
        <Text fontWeight="600">Notifications</Text>
        <Box display="flex" gap="16" alignItems="center">
          <Badge count={3}>
            <Icon name="bell" size="24" />
          </Badge>
          <Badge count={12}>
            <Icon name="envelope" size="24" />
          </Badge>
          <Badge count={99}>
            <Icon name="message" size="24" />
          </Badge>
        </Box>
      </Box>
      <Box display="flex" flexDir="column" gap="8">
        <Text fontWeight="600">Status Indicators</Text>
        <Box display="flex" gap="16" alignItems="center">
          <Badge variant="success">
            <Icon name="user" size="24" />
          </Badge>
          <Badge variant="warning">
            <Icon name="user" size="24" />
          </Badge>
          <Badge variant="neutral">
            <Icon name="user" size="24" />
          </Badge>
        </Box>
      </Box>
      <Box display="flex" flexDir="column" gap="8">
        <Text fontWeight="600">Standalone Badges</Text>
        <Box display="flex" gap="8" alignItems="center">
          <Badge variant="danger" />
          <Badge variant="success" />
          <Badge variant="info" />
          <Badge count={5} variant="danger" />
          <Badge count={42} variant="info" />
        </Box>
      </Box>
    </Box>
  ),
};
