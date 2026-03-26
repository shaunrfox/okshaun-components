import type { Meta, StoryObj } from '@storybook/react';
import { Flex, VStack } from '@styled-system/jsx';
import { Text } from '../Text';
import { Heading } from './Heading';

const meta = {
  title: 'Components/Heading',
  component: Heading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    level: 'h2',
    children: 'Quarterly Revenue',
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Levels: Story = {
  render: () => (
    <VStack gap="8">
      <Heading level="h1">Heading 1</Heading>
      <Heading level="h2">Heading 2</Heading>
      <Heading level="h3">Heading 3</Heading>
      <Heading level="h4">Heading 4</Heading>
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

export const ExContentHierarchy: Story = {
  name: 'Ex: Content Hierarchy',
  render: () => (
    <VStack alignItems="start" gap="24">
      <Flex direction="column">
        <Heading level="h2">Billing Settings</Heading>
        <Text>Manage your payment methods and invoice preferences.</Text>
      </Flex>

      <Flex direction="column">
        <Heading level="h3">Default Payment Method</Heading>
        <Text>Visa ending in 0091 is used for recurring charges.</Text>
      </Flex>

      <Flex direction="column">
        <Heading level="h3">Invoice Delivery</Heading>
        <Text>Invoices are emailed to accounting@company.com.</Text>
      </Flex>
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

export const ExAllCaps: Story = {
  name: 'Ex: All Caps Variant',
  render: () => (
    <Flex direction="column" gap="4">
      <Heading level="h4" allCaps>
        Section label
      </Heading>
      <Text>
        Use all caps sparingly for short section labels, not for long headings.
      </Text>
    </Flex>
  ),
  parameters: { controls: { disable: true } },
};
