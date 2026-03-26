import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box';
import { Card } from '../Card';
import { Divider } from '../Divider';
import { Heading } from '../Heading';
import { Link } from '../Link';
import { Text } from './Text';

const meta = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      description: 'Primitive text size token',
    },
    family: {
      control: 'select',
      options: ['body', 'heading', 'mono'],
      description: 'Font family',
    },
    weight: {
      control: 'select',
      description: 'Font weight token',
    },
    truncate: { control: 'boolean' },
    allCaps: { control: 'boolean' },
    italic: { control: 'boolean' },
    underline: { control: 'boolean' },
    bold: { control: 'boolean' },
    as: { control: 'text' },
  },
  args: {
    children: 'Text content',
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Box maxW="prose" display="grid" gap="10">
      <Text {...args}>
        A single text primitive for app copy, labels, and metadata.
      </Text>
      <Text>
        Start with default `Text`, then adjust `size`, `weight`, or `family`
        only when hierarchy needs it.
      </Text>
    </Box>
  ),
};

export const Hierarchy: Story = {
  render: () => (
    <Box display="grid" gap="8" maxW="prose">
      <Text size="24" weight="bold">
        Primary paragraph intro
      </Text>
      <Text size="16">
        Body copy for the main content area. This is the most common setting.
      </Text>
      <Text size="14" color="text.subtle">
        Secondary support text for caveats and implementation details.
      </Text>
      <Text size="12" family="mono" color="text.subtlest">
        Metadata: Updated 2026-02-27
      </Text>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const SemanticUsage: Story = {
  render: () => (
    <Card p="16" display="grid" gap="10" maxW="prose">
      <Heading level="h3">Payment Details</Heading>
      <Text as="p">
        Your default card is charged on the first business day of each month.
      </Text>
      <Text as="small" size="12" color="text.subtlest">
        Last verified 2 hours ago.
      </Text>
      <Text as="span" size="14">
        Need help? <Link href="#">Contact billing support</Link>
      </Text>
    </Card>
  ),
  parameters: { controls: { disable: true } },
};

export const ExDashboardSummary: Story = {
  name: 'Ex: Dashboard Summary',
  render: () => (
    <Card p="16" display="grid" gap="8" maxW="sm">
      <Text size="14" color="text.subtle">
        Open invoices
      </Text>
      <Text size="32" weight="black" color="text">
        18
      </Text>
      <Text size="14" color="success.default">
        Up 12% from last week
      </Text>
    </Card>
  ),
  parameters: { controls: { disable: true } },
};

export const ExDoAndDont: Story = {
  name: 'Ex: Common Mistakes',
  render: () => (
    <Box display="grid" gap="12" maxW="prose">
      <Box display="grid" gap="6">
        <Text size="14" weight="bold" color="success.default">
          Do
        </Text>
        <Text>
          Use Text for body copy and labels with semantic color tokens.
        </Text>
      </Box>
      <Divider />
      <Box display="grid" gap="6">
        <Text size="14" weight="bold" color="error.default">
          Avoid
        </Text>
        <Text>
          Using heading sizes for long paragraphs or low-contrast text for
          critical information.
        </Text>
      </Box>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const A11yReadableParagraph: Story = {
  name: 'A11y: Readable Paragraph',
  render: () => (
    <Box maxW="prose" display="grid" gap="10">
      <Text as="p" lineHeight="default">
        Keep long-form text in readable widths, use sufficient color contrast,
        and choose semantic HTML tags with the `as` prop when needed.
      </Text>
      <Text as="p" size="14" color="text.subtle">
        This paragraph demonstrates supporting content with a calmer visual
        weight while staying legible.
      </Text>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};
