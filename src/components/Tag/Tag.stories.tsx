import type { Meta, StoryObj } from '@storybook/react';
import { Grid, Wrap } from '@styled-system/jsx';
import { Text } from '../Text';
import { Tag } from './Tag';

/**
 * Tag component for labeling, categorizing, and organizing items.
 *
 * Features:
 * - Two visual variants (default, bold)
 * - 12 recipe-defined hues
 * - Optional leading/trailing icons
 */
const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Tag',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bold'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    hue: {
      control: 'select',
      options: [
        'gray',
        'tan',
        'red',
        'orange',
        'yellow',
        'lime',
        'green',
        'teal',
        'blue',
        'indigo',
        'purple',
        'magenta',
      ],
      description: 'Color hue',
      table: {
        defaultValue: { summary: 'gray' },
      },
    },
    iconBefore: {
      control: 'select',
      options: [undefined, 'check', 'info', 'warning'],
      description: 'Icon name to display before text',
    },
    iconAfter: {
      control: 'select',
      options: [undefined, 'star', 'tag'],
      description: 'Icon name to display after text',
    },
    children: {
      control: 'text',
      description: 'Tag text content',
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

const hues = [
  'gray',
  'tan',
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'teal',
  'blue',
  'indigo',
  'purple',
  'magenta',
] as const;

// ============================================================================
// Variants
// ============================================================================

export const Default: Story = {
  render: () => (
    <Wrap gap="8" maxW="xs" justify="center">
      {hues.map((hue) => (
        <Tag key={hue} hue={hue}>
          {hue}
        </Tag>
      ))}
    </Wrap>
  ),
  parameters: { controls: { disable: true } },
};

export const Bold: Story = {
  render: () => (
    <Wrap gap="8" maxW="xs" justify="center">
      {hues.map((hue) => (
        <Tag key={hue} hue={hue} variant="bold">
          {hue}
        </Tag>
      ))}
    </Wrap>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Side-by-Side Comparison
// ============================================================================

export const VariantComparison: Story = {
  render: () => (
    <Grid
      gridTemplateColumns="auto 1fr"
      columnGap="12"
      rowGap="32"
      // alignItems="center"
    >
      <Text textStyle="mono.md" mr="16">
        default
      </Text>
      <Wrap gap="8" maxW="xs">
        {hues.map((hue) => (
          <Tag key={hue} hue={hue}>
            {hue}
          </Tag>
        ))}
      </Wrap>
      <Text textStyle="mono.md" mr="16">
        bold
      </Text>
      <Wrap gap="8" maxW="xs">
        {hues.map((hue) => (
          <Tag key={hue} hue={hue} variant="bold">
            {hue}
          </Tag>
        ))}
      </Wrap>
    </Grid>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Icons
// ============================================================================

export const WithIcons: Story = {
  render: () => (
    <Grid
      gridTemplateColumns="auto 1fr"
      columnGap="12"
      rowGap="32"
      alignItems="center"
    >
      <Text textStyle="mono.md" mr="16">
        iconBefore
      </Text>
      <Wrap gap="8">
        <Tag hue="green" iconBefore="check">
          Approved
        </Tag>
        <Tag hue="red" iconBefore="warning">
          Error
        </Tag>
        <Tag hue="blue" iconBefore="info">
          Info
        </Tag>
      </Wrap>
      <Text textStyle="mono.md" mr="16">
        iconAfter
      </Text>
      <Wrap gap="8">
        <Tag hue="yellow" iconAfter="star">
          Featured
        </Tag>
        <Tag hue="magenta" iconAfter="tag">
          Sale
        </Tag>
        <Tag hue="indigo" iconAfter="flag">
          Flagged
        </Tag>
      </Wrap>
    </Grid>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Common Use Cases
// ============================================================================

export const StatusTags: Story = {
  name: 'Ex: Status Tags',
  render: () => (
    <Wrap gap="8">
      <Tag hue="green" variant="bold" iconBefore="check">
        Complete
      </Tag>
      <Tag hue="yellow" variant="bold" iconBefore="warning">
        Pending
      </Tag>
      <Tag hue="red" variant="bold" iconBefore="error">
        Failed
      </Tag>
      <Tag hue="blue" variant="bold" iconBefore="info">
        In Progress
      </Tag>
    </Wrap>
  ),
  parameters: { controls: { disable: true } },
};

export const CategoryTags: Story = {
  name: 'Ex: Category Tags',
  render: () => (
    <Wrap gap="8">
      <Tag hue="purple">Design</Tag>
      <Tag hue="teal">Engineering</Tag>
      <Tag hue="orange">Marketing</Tag>
      <Tag hue="green">Sales</Tag>
      <Tag hue="magenta">Support</Tag>
    </Wrap>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Interactive Playground
// ============================================================================

/**
 * Interactive playground to test all props
 */
export const Interactive: Story = {
  args: {
    variant: 'default',
    hue: 'gray',
    children: 'Tag Label',
  },
};
