import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Card } from './Card';
import { css } from '@styled-system/css';
import { HStack, VStack, Grid } from '@styled-system/jsx';
import { Text } from '../Text';
import { Heading } from '../Heading';
import { Button } from '../Button';
import { Icon } from '../Icon';

/**
 * Card component for containing content with optional interactivity.
 *
 * Features:
 * - Non-interactive by default (renders as div)
 * - Three visual appearances: elevated, flat, ghost
 * - Polymorphic `as` prop for semantic elements (article, section, etc.)
 * - Interactive mode for clickable cards
 * - Auto-interactive when href or onClick is provided
 * - Accessible focus and disabled states
 */
const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      control: 'select',
      options: ['elevated', 'flat', 'ghost'],
      description: 'Visual style appearance',
      table: {
        defaultValue: { summary: 'elevated' },
      },
    },
    interactive: {
      control: 'boolean',
      description: 'Makes card interactive (clickable). Auto-set when href or onClick provided.',
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
      description: 'When provided, card renders as anchor and becomes interactive',
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
type Story = StoryObj<typeof meta>;

// Helper component for card content
const CardContent = ({ title, description }: { title: string; description: string }) => (
  <VStack p="16" gap="8" alignItems="flex-start">
    <Heading level="h3">{title}</Heading>
    <Text>{description}</Text>
  </VStack>
);

// ============================================================================
// Basic Appearances
// ============================================================================

/**
 * Elevated appearance - shadow for depth (default)
 */
export const Elevated: Story = {
  args: {
    appearance: 'elevated',
    children: <CardContent title="Elevated Card" description="Uses box-shadow for visual depth. Great for important content." />,
  },
};

/**
 * Flat appearance - border instead of shadow
 */
export const Flat: Story = {
  args: {
    appearance: 'flat',
    children: <CardContent title="Flat Card" description="Uses border for definition. More subtle than elevated." />,
  },
};

/**
 * Ghost appearance - transparent background
 */
export const Ghost: Story = {
  args: {
    appearance: 'ghost',
    children: <CardContent title="Ghost Card" description="No background or border. Content-focused presentation." />,
  },
};

/**
 * All appearances comparison
 */
export const AllAppearances: Story = {
  render: () => (
    <HStack gap="16" alignItems="flex-start">
      <Card appearance="elevated">
        <CardContent title="Elevated" description="Shadow for depth" />
      </Card>
      <Card appearance="flat">
        <CardContent title="Flat" description="Border for definition" />
      </Card>
      <Card appearance="ghost">
        <CardContent title="Ghost" description="Minimal styling" />
      </Card>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Interactive Cards
// ============================================================================

/**
 * Interactive card (button) - explicitly set interactive prop
 */
export const Interactive: Story = {
  args: {
    appearance: 'elevated',
    interactive: true,
    children: <CardContent title="Interactive Card" description="Click me! Renders as button with hover/focus states." />,
  },
};

/**
 * Link card - auto-interactive when href provided
 */
export const LinkCard: Story = {
  args: {
    appearance: 'elevated',
    href: '#link-target',
    children: <CardContent title="Link Card" description="Renders as anchor element automatically." />,
  },
};

/**
 * Interactive states across all appearances
 */
export const InteractiveAppearances: Story = {
  render: () => (
    <HStack gap="16" alignItems="flex-start">
      <Card appearance="elevated" interactive onClick={() => alert('Elevated clicked')}>
        <CardContent title="Elevated" description="Click to interact" />
      </Card>
      <Card appearance="flat" interactive onClick={() => alert('Flat clicked')}>
        <CardContent title="Flat" description="Click to interact" />
      </Card>
      <Card appearance="ghost" interactive onClick={() => alert('Ghost clicked')}>
        <CardContent title="Ghost" description="Click to interact" />
      </Card>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Disabled State
// ============================================================================

/**
 * Disabled interactive card
 */
export const Disabled: Story = {
  args: {
    appearance: 'elevated',
    interactive: true,
    disabled: true,
    children: <CardContent title="Disabled Card" description="Cannot be clicked or focused." />,
  },
};

/**
 * Disabled cards across appearances
 */
export const DisabledVariants: Story = {
  render: () => (
    <HStack gap="16" alignItems="flex-start">
      <Card appearance="elevated" interactive disabled>
        <CardContent title="Elevated Disabled" description="Non-interactive" />
      </Card>
      <Card appearance="flat" interactive disabled>
        <CardContent title="Flat Disabled" description="Non-interactive" />
      </Card>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Semantic Elements (Polymorphic)
// ============================================================================

/**
 * Card as article element - for blog posts, news items
 */
export const AsArticle: Story = {
  args: {
    as: 'article',
    appearance: 'elevated',
    children: (
      <VStack p="16" gap="8" alignItems="flex-start">
        <Heading level="h3">Blog Post Title</Heading>
        <Text color="text.muted">Published on Dec 20, 2025</Text>
        <Text>This card renders as an article element for semantic correctness.</Text>
      </VStack>
    ),
  },
};

/**
 * Card as section element - for grouped content
 */
export const AsSection: Story = {
  args: {
    as: 'section',
    appearance: 'flat',
    children: (
      <VStack p="16" gap="8" alignItems="flex-start">
        <Heading level="h3">Settings Section</Heading>
        <Text>This card renders as a section element.</Text>
      </VStack>
    ),
  },
};

/**
 * Card as aside element - for sidebar content
 */
export const AsAside: Story = {
  args: {
    as: 'aside',
    appearance: 'ghost',
    children: (
      <VStack p="16" gap="8" alignItems="flex-start">
        <Heading level="h4">Related Links</Heading>
        <Text>This card renders as an aside element for supplementary content.</Text>
      </VStack>
    ),
  },
};

/**
 * Various semantic elements
 */
export const SemanticElements: Story = {
  render: () => (
    <Grid gridTemplateColumns="repeat(3, 1fr)" gap="16">
      <Card as="article" appearance="elevated">
        <VStack p="12" gap="4" alignItems="flex-start">
          <code className={css({ fontSize: 'xs', color: 'blue.50' })}>article</code>
          <Text>For blog posts, news</Text>
        </VStack>
      </Card>
      <Card as="section" appearance="flat">
        <VStack p="12" gap="4" alignItems="flex-start">
          <code className={css({ fontSize: 'xs', color: 'blue.50' })}>section</code>
          <Text>For grouped content</Text>
        </VStack>
      </Card>
      <Card as="aside" appearance="ghost">
        <VStack p="12" gap="4" alignItems="flex-start">
          <code className={css({ fontSize: 'xs', color: 'blue.50' })}>aside</code>
          <Text>For supplementary content</Text>
        </VStack>
      </Card>
    </Grid>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Common Use Cases
// ============================================================================

/**
 * Product card with image area
 */
export const ProductCard: Story = {
  render: () => (
    <Card appearance="elevated" interactive onClick={() => alert('View product')}>
      <VStack gap="0">
        <div className={css({ bg: 'gray.20', h: '120', w: 'full', borderTopRadius: '4' })} />
        <VStack p="16" gap="8" alignItems="flex-start">
          <Heading level="h4">Product Name</Heading>
          <Text>$99.99</Text>
          <Button size="small" appearance="primary">Add to Cart</Button>
        </VStack>
      </VStack>
    </Card>
  ),
  parameters: { controls: { disable: true } },
};

/**
 * Profile card
 */
export const ProfileCard: Story = {
  render: () => (
    <Card appearance="flat">
      <HStack p="16" gap="16">
        <div className={css({
          bg: 'blue.40',
          w: '64',
          h: '64',
          borderRadius: 'full',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        })}>
          <Icon name="user" size={32} />
        </div>
        <VStack gap="4" alignItems="flex-start">
          <Heading level="h4">Jane Doe</Heading>
          <Text color="text.muted">Product Designer</Text>
          <Button size="small" appearance="subtle">View Profile</Button>
        </VStack>
      </HStack>
    </Card>
  ),
  parameters: { controls: { disable: true } },
};

/**
 * Stats card
 */
export const StatsCard: Story = {
  render: () => (
    <HStack gap="16">
      <Card appearance="elevated">
        <VStack p="16" gap="4" alignItems="flex-start">
          <Text color="text.muted" fontSize="14">Total Users</Text>
          <Heading level="h2">12,345</Heading>
          <Text color="green.50" fontSize="14">+12% from last month</Text>
        </VStack>
      </Card>
      <Card appearance="elevated">
        <VStack p="16" gap="4" alignItems="flex-start">
          <Text color="text.muted" fontSize="14">Revenue</Text>
          <Heading level="h2">$54,321</Heading>
          <Text color="green.50" fontSize="14">+8% from last month</Text>
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
    <Grid gridTemplateColumns="repeat(3, 1fr)" gap="16" w="600">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} appearance="flat" interactive>
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
  render: () => (
    <VStack gap="24" alignItems="flex-start">
      <div>
        <div className={css({ mb: '8', fontSize: 'sm', fontWeight: 'semibold' })}>
          Non-Interactive (Content Container)
        </div>
        <Card appearance="elevated">
          <VStack p="16" gap="8" alignItems="flex-start">
            <Heading level="h4">Static Card</Heading>
            <Text>This is a content container. No hover effects.</Text>
            <Button size="small">Action Inside</Button>
          </VStack>
        </Card>
      </div>
      <div>
        <div className={css({ mb: '8', fontSize: 'sm', fontWeight: 'semibold' })}>
          Interactive (Clickable Card)
        </div>
        <Card appearance="elevated" interactive onClick={() => alert('Card clicked!')}>
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
    appearance: 'elevated',
    interactive: false,
    disabled: false,
    children: <CardContent title="Playground Card" description="Adjust the controls to see different variations." />,
  },
};
