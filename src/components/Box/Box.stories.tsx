import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../Card';
import { Link } from '../Link';
import { Text } from '../Text';
import { Box } from './Box';

const meta = {
  title: 'Components/Box',
  component: Box,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box p="16" borderWidth="1" borderColor="border" borderRadius="8">
      Basic Box container
    </Box>
  ),
};

export const ExPolymorphicAs: Story = {
  name: 'Ex: Polymorphic as Prop',
  render: () => (
    <Box display="grid" gap="10" maxW="prose">
      <Box as="section" p="12" bg="bg.neutral.subtle" borderRadius="8">
        Section with Box
      </Box>
      <Box
        as="button"
        type="button"
        p="12"
        borderWidth="1"
        borderColor="border"
        borderRadius="8"
      >
        Button rendered with Box
      </Box>
      <Box as="a" href="#" color="link" textDecoration="underline">
        Link rendered with Box
      </Box>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const ExLayoutComposition: Story = {
  name: 'Ex: Layout Composition',
  render: () => (
    <Card p="16" display="grid" gap="8" maxW="sm">
      <Text as="strong">Invoice Summary</Text>
      <Box display="flex" justifyContent="space-between">
        <Text>Subtotal</Text>
        <Text>$120.00</Text>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Text>Tax</Text>
        <Text>$9.60</Text>
      </Box>
      <Box display="flex" justifyContent="space-between" fontWeight="bold">
        <Text>Total</Text>
        <Text>$129.60</Text>
      </Box>
    </Card>
  ),
  parameters: { controls: { disable: true } },
};

export const ExPatternsReference: Story = {
  name: 'Ex: Pattern Docs Reference',
  render: () => (
    <Box maxW="prose" display="grid" gap="8">
      <Text>
        Use Box for custom structure and composition, then reach for Panda
        Patterns for repeatable layout helpers.
      </Text>
      <Link href="/?path=/docs/docs-panda-patterns--documentation">
        Open Panda Patterns docs
      </Link>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};
