import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { css } from '@styled-system/css';
import { Flex, Grid, HStack, VStack, Wrap } from '@styled-system/jsx';
import { Box } from '../Box';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { Card } from './Card';

/**
 * Card component for containing content with optional interactivity.
 *
 * Features:
 * - Non-interactive by default (renders as div)
 * - Five visual variants: default, flat, sunken, ghost, overlay
 * - Polymorphic `as` prop for semantic elements (article, section, etc.)
 * - Interactive mode for clickable cards
 * - Auto-interactive when href or onClick is provided
 * - Accessible focus and disabled states
 */
const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'flat', 'ghost', 'sunken', 'overlay'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    interactive: {
      control: 'boolean',
      description:
        'Makes card interactive (clickable). Auto-set when href or onClick provided.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state for interactive cards',
    },
    href: {
      control: 'text',
      description:
        'When provided, card renders as anchor and becomes interactive',
    },
    as: {
      control: 'select',
      options: ['div', 'article', 'section', 'aside', 'button', 'a'],
      description: 'Semantic element to render as',
      table: {
        defaultValue: { summary: 'div' },
      },
    },
    children: {
      control: false,
      description: 'Card content',
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

// Helper component for card content
const CardContent = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <VStack p="16" gap="8" alignItems="flex-start">
    <Heading level="h3">{title}</Heading>
    <Text>{description}</Text>
  </VStack>
);

export const Default: Story = {
  name: 'Static',
  render: () => (
    <Wrap justifyContent="center" gap="24" p="40">
      <Card>
        <Flex flexDir="column" p={'16'}>
          <Heading level="h3">Default Card</Heading>
          <Text>Static card with shadow</Text>
        </Flex>
      </Card>
      <Card variant="flat">
        <Flex flexDir="column" p={'16'}>
          <Heading level="h3">Flat Card</Heading>
          <Text>Static card with flat style</Text>
        </Flex>
      </Card>
      <Card variant="sunken">
        <Flex flexDir="column" p={'16'}>
          <Heading level="h3">Sunken Card</Heading>
          <Text>Static with sunken background</Text>
        </Flex>
      </Card>
      <Card variant="ghost">
        <Flex flexDir="column" p={'16'}>
          <Heading level="h3">Ghost Card</Heading>
          <Text>Static with transparent background</Text>
        </Flex>
      </Card>
      <Card variant="overlay">
        <Flex flexDir="column" p={'16'}>
          <Heading level="h3">Overlay Card</Heading>
          <Text>Static card with shadow</Text>
        </Flex>
      </Card>
    </Wrap>
  ),
};

export const Interactive: Story = {
  name: 'Interactive',
  render: () => (
    <Wrap justifyContent="center" gap="24" p="40">
      <Card onClick={() => alert('Default clicked')}>
        <Flex flexDir="column" p={'16'}>
          <Heading level="h3">Default Card</Heading>
          <Text>Static card with shadow</Text>
        </Flex>
      </Card>
      <Card variant="flat" onClick={() => alert('Flat clicked')}>
        <Flex flexDir="column" p={'16'}>
          <Heading level="h3">Flat Card</Heading>
          <Text>Static card with flat style</Text>
        </Flex>
      </Card>
      <Card variant="sunken" onClick={() => alert('Sunken clicked')}>
        <Flex flexDir="column" p={'16'}>
          <Heading level="h3">Sunken Card</Heading>
          <Text>Static with sunken background</Text>
        </Flex>
      </Card>
      <Card variant="ghost" onClick={() => alert('Ghost clicked')}>
        <Flex flexDir="column" p={'16'}>
          <Heading level="h3">Ghost Card</Heading>
          <Text>Static with transparent background</Text>
        </Flex>
      </Card>
    </Wrap>
  ),
};

export const LinkCard: Story = {
  name: 'Link Card',
  render: () => (
    <Card href="#link-target">
      <Flex flexDir="column" p={'16'}>
        <Heading level="h3">Link Card</Heading>
        <Text>Renders as anchor element automatically.</Text>
      </Flex>
    </Card>
  ),
};

export const Disabled: Story = {
  name: 'Disabled states',
  render: () => (
    <Wrap justifyContent="center" gap="24" p="40">
      <Card disabled>
        <Flex flexDir="column" p={'16'}>
          <Heading level="h3">Default Card</Heading>
          <Text>Static card with shadow</Text>
        </Flex>
      </Card>
      <Card variant="flat" disabled>
        <Flex flexDir="column" p={'16'}>
          <Heading level="h3">Flat Card</Heading>
          <Text>Static card with flat style</Text>
        </Flex>
      </Card>
      <Card variant="sunken" disabled>
        <Flex flexDir="column" p={'16'}>
          <Heading level="h3">Sunken Card</Heading>
          <Text>Static with sunken background</Text>
        </Flex>
      </Card>
      <Card variant="ghost" disabled>
        <Flex flexDir="column" p={'16'}>
          <Heading level="h3">Ghost Card</Heading>
          <Text>Static with transparent background</Text>
        </Flex>
      </Card>
      <Card variant="overlay" disabled>
        <Flex flexDir="column" p={'16'}>
          <Heading level="h3">Overlay Card</Heading>
          <Text>Static card with shadow</Text>
        </Flex>
      </Card>
    </Wrap>
  ),
};

export const SemanticElements: Story = {
  render: () => (
    <Grid gridTemplateColumns="repeat(3, 1fr)" gap="16">
      <Card as="article">
        <VStack p="12" gap="4" alignItems="flex-start">
          <code className={css({ fontSize: '12', color: 'blue.50' })}>
            article
          </code>
          <Text>For blog posts, news</Text>
        </VStack>
      </Card>
      <Card as="section" variant="flat">
        <VStack p="12" gap="4" alignItems="flex-start">
          <code className={css({ fontSize: '12', color: 'blue.50' })}>
            section
          </code>
          <Text>For grouped content</Text>
        </VStack>
      </Card>
      <Card as="aside" variant="ghost">
        <VStack p="12" gap="4" alignItems="flex-start">
          <code className={css({ fontSize: '12', color: 'blue.50' })}>
            aside
          </code>
          <Text>For supplementary content</Text>
        </VStack>
      </Card>
    </Grid>
  ),
  parameters: { controls: { disable: true } },
};

export const ProductCard: Story = {
  name: 'Product Card',
  render: () => (
    <Card overflow="hidden">
      <VStack gap="0">
        <Box bg="blue.50" aspectRatio="wide" w="280" />
        <Flex flexDir="column" p="16" gap="8" alignItems="flex-start" w="full">
          <Heading level="h4">Product Name</Heading>
          <Text>$99.99</Text>
          <Button variant="primary" onClick={() => alert('View product')}>
            Add to Cart
          </Button>
        </Flex>
      </VStack>
    </Card>
  ),
  parameters: { controls: { disable: true } },
};

/**
 * Profile card
 */
export const ProfileCard: Story = {
  name: 'Profile',
  render: () => (
    <Card variant="flat">
      <HStack p="16" gap="16">
        <Box
          bg="blue.60"
          w="64"
          h="64"
          rounded="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink="0"
        >
          <Icon name="user" size="32" fill="icon.inverse" />
        </Box>
        <Flex flexDir="column" alignItems="flex-start" w="full">
          <Heading level="h4">Jane Doe</Heading>
          <Text color="text.muted">Product Designer</Text>
          <Button size="sm" mt="12">
            View Profile
          </Button>
        </Flex>
      </HStack>
    </Card>
  ),
  parameters: { controls: { disable: true } },
};

/**
 * Stats card
 */
export const StatsCard: Story = {
  name: 'Stats Card',
  render: () => (
    <HStack gap="16">
      <Card variant="overlay">
        <VStack p="16" gap="4" alignItems="flex-start">
          <Text color="text.subtlest" fontSize="14">
            Total Users
          </Text>
          <Heading level="h2">12,345</Heading>
          <Text color="text.subtlest" fontSize="14">
            +12% from last month
          </Text>
        </VStack>
      </Card>
      <Card variant="overlay">
        <VStack p="16" gap="4" alignItems="flex-start">
          <Text color="text.subtlest" fontSize="14">
            Revenue
          </Text>
          <Heading level="h2">$54,321</Heading>
          <Text color="text.subtlest" fontSize="14">
            +8% from last month
          </Text>
        </VStack>
      </Card>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

/**
 * Card grid layout
 */
export const CardGrid: Story = {
  render: () => (
    <Grid gridTemplateColumns="repeat(3, 1fr)" gap="16" w="4xl" p="40">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} variant="flat" interactive>
          <VStack p="16" gap="8" alignItems="flex-start">
            <Heading level="h4">Card {i}</Heading>
            <Text>Card content goes here.</Text>
          </VStack>
        </Card>
      ))}
    </Grid>
  ),
  parameters: { controls: { disable: true } },
};

/**
 * Interactive vs Non-interactive comparison
 */
export const InteractiveComparison: Story = {
  name: 'Interactive vs Non-interactive',
  render: () => (
    <VStack gap="24" alignItems="flex-start">
      <div>
        <div className={css({ mb: '8', fontSize: '14', fontWeight: 'bold' })}>
          Non-Interactive (Content Container)
        </div>
        <Card>
          <VStack p="16" gap="0" alignItems="flex-start">
            <Heading level="h4">Static Card</Heading>
            <Text>This is a content container. No hover effects.</Text>
            <Button
              variant="primary"
              mt="16"
              onClick={() => alert('Button clicked!')}
            >
              Action Inside
            </Button>
          </VStack>
        </Card>
      </div>
      <div>
        <div className={css({ mb: '8', fontSize: '14', fontWeight: 'bold' })}>
          Interactive (Clickable Card)
        </div>
        <Card onClick={() => alert('Card clicked!')}>
          <VStack p="16" gap="8" alignItems="flex-start">
            <Heading level="h4">Clickable Card</Heading>
            <Text>The entire card is clickable. Hover to see effects.</Text>
          </VStack>
        </Card>
      </div>
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Interactive Playground
// ============================================================================

/**
 * Interactive playground to test all props
 */
export const Playground: Story = {
  args: {
    interactive: false,
    disabled: false,
    children: (
      <CardContent
        title="Playground Card"
        description="Adjust the controls to see different variations."
      />
    ),
  },
};
