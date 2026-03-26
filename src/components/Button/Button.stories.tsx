import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Grid, HStack, VStack, Wrap } from '@styled-system/jsx';

import { Divider } from '../Divider';
import { IconButton } from '../IconButton';
import { Text } from '../Text';
import { Button } from './Button';

const buttonVariants = [
  'default',
  'primary',
  'ghost',
  'subtle',
  'hollow',
  'danger',
  'selected',
  'selectedBold',
  'selectedSubtle',
] as const;

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: buttonVariants,
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Button size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    iconBefore: {
      control: 'select',
      options: [undefined, 'plus', 'check', 'arrow-left', 'edit', 'search'],
      description: 'Icon before label',
    },
    iconAfter: {
      control: 'select',
      options: [undefined, 'arrow-right', 'chevron-down', 'arrow-square-out'],
      description: 'Icon after label',
    },
    gap: {
      control: 'select',
      options: [undefined, '2', '4', '6', '8'],
      description: 'Gap between icon and label',
    },
    href: {
      control: 'text',
      description: 'Renders as an anchor when provided',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
  args: {
    children: 'Button',
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Wrap gap="12" alignItems="center">
      {buttonVariants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </Wrap>
  ),
  parameters: { controls: { disable: true } },
};

export const AllSizes: Story = {
  render: () => (
    <HStack gap="4" alignItems="center" flexWrap="wrap">
      <Button size="sm">Small</Button>
      <Button size="md">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

export const AllVariants: Story = {
  render: () => (
    <VStack gap="6" alignItems="flex-start">
      {buttonVariants.map((variant) => (
        <VStack key={variant} gap="3" alignItems="flex-start">
          <Text textStyle="mono.md">{variant}</Text>
          <HStack gap="4" flexWrap="wrap" alignItems="center">
            {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <Button
                key={`${variant}-${size}`}
                variant={variant}
                size={size}
                iconBefore="alarm"
              >
                {size}
              </Button>
            ))}
          </HStack>
        </VStack>
      ))}
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

export const InteractionStates: Story = {
  render: () => (
    <Grid
      gridTemplateColumns="auto 1fr"
      columnGap="12"
      rowGap="32"
      alignItems="center"
    >
      <Text textStyle="mono.md" mr="16">
        Disabled
      </Text>
      <Wrap gap="12" alignItems="center">
        {buttonVariants.map((variant) => (
          <Button key={`disabled-${variant}`} variant={variant} disabled>
            {variant}
          </Button>
        ))}
      </Wrap>

      <Text textStyle="mono.md" mr="16">
        Loading
      </Text>
      <Wrap gap="12" alignItems="center">
        {buttonVariants.map((variant) => (
          <Button key={`loading-${variant}`} variant={variant} loading>
            {variant}
          </Button>
        ))}
      </Wrap>
    </Grid>
  ),
  parameters: { controls: { disable: true } },
};

export const WithIcon: Story = {
  render: () => (
    <Grid
      gridTemplateColumns="auto 1fr"
      columnGap="12"
      rowGap="32"
      alignItems="center"
    >
      <Text textStyle="heading.sm" gridColumn="1 / -1">
        Button
      </Text>

      <Text textStyle="mono.md" mr="16">
        iconBefore
      </Text>
      <Wrap gap="12">
        <Button iconBefore="plus">Add</Button>
        <Button iconBefore="timer" variant="primary">
          Start Timer
        </Button>
        <Button iconBefore="calendar" variant="selectedBold">
          2026-01-12
        </Button>
        <Button iconBefore="info" variant="ghost">
          Learn More
        </Button>
        <Button iconBefore="trash" variant="danger">
          Delete
        </Button>
      </Wrap>

      <Text textStyle="mono.md" mr="16">
        iconAfter
      </Text>
      <Wrap gap="12">
        <Button iconAfter="send" variant="primary">
          Send Invoice
        </Button>
        <Button iconAfter="arrow-square-out">Logout</Button>
        <Button iconAfter="download" variant="primary">
          Download
        </Button>
        <Button iconAfter="scale" variant="hollow">
          Weigh
        </Button>
        <Button iconAfter="screwdriver" variant="selected">
          Tools
        </Button>
      </Wrap>

      <Divider gridColumn="1 / -1" />

      <Text textStyle="heading.sm" mr="16">
        IconButton
      </Text>
      <Wrap gap="56">
        <IconButton iconName="download" altText="Download" />
        <IconButton iconName="printer" variant="hollow" altText="Print" />
        <IconButton
          iconName="cloud-synced"
          variant="ghost"
          altText="Last sync: 3 hours ago"
        />
        <IconButton iconName="edit" variant="primary" altText="Edit" />
        <IconButton iconName="send" variant="selected" altText="Send" />
        <IconButton
          iconName="trash"
          variant="danger"
          altText="This cannot be undone"
        />
      </Wrap>
    </Grid>
  ),
  parameters: { controls: { disable: true } },
};

export const WithIconBefore: Story = {
  args: {
    iconBefore: 'plus',
    children: 'Add Item',
  },
};

export const WithIconAfter: Story = {
  args: {
    iconAfter: 'arrow-right',
    children: 'Next',
  },
};

export const WithBothIcons: Story = {
  args: {
    iconBefore: 'arrow-left',
    iconAfter: 'arrow-right',
    children: 'Navigate',
  },
};

export const AsLink: Story = {
  args: {
    href: 'https://example.com',
    children: 'Visit Website',
    iconAfter: 'arrow-square-out',
  },
};

export const LinkVariants: Story = {
  render: () => (
    <HStack gap="4" flexWrap="wrap">
      <Button href="#" variant="default">
        Default Link
      </Button>
      <Button href="#" variant="primary">
        Primary Link
      </Button>
      <Button href="#" variant="ghost">
        Ghost Link
      </Button>
      <Button href="#" variant="hollow" iconAfter="arrow-square-out">
        External
      </Button>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

export const ActionGroup: Story = {
  name: 'Ex: Action Group',
  render: () => (
    <HStack gap="8">
      <Button variant="hollow">Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

export const FormActions: Story = {
  name: 'Ex: Form Actions',
  render: () => (
    <HStack gap="4" justifyContent="flex-end">
      <Button variant="ghost">Reset</Button>
      <Button variant="hollow">Save Draft</Button>
      <Button variant="primary" iconAfter="arrow-right">
        Submit
      </Button>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

export const Pagination: Story = {
  name: 'Ex: Pagination',
  render: () => (
    <HStack gap="8" justifyContent="space-between" width="280">
      <Button variant="hollow" iconBefore="arrow-left">
        Back
      </Button>
      <Button variant="primary" iconAfter="arrow-right">
        Next
      </Button>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

export const CrudActions: Story = {
  name: 'Ex: CRUD Actions',
  render: () => (
    <HStack gap="8" flexWrap="wrap">
      <Button variant="primary" size="sm" iconBefore="plus">
        Create
      </Button>
      <Button variant="hollow" size="sm" iconBefore="edit">
        Edit
      </Button>
      <Button variant="ghost" size="sm" iconBefore="trash">
        Delete
      </Button>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

export const FormSubmitting: Story = {
  name: 'Ex: Form Submitting',
  render: () => (
    <HStack gap="8">
      <Button variant="hollow" disabled>
        Cancel
      </Button>
      <Button variant="primary" loading>
        Saving...
      </Button>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

export const LongText: Story = {
  args: {
    children:
      'This is a button with extremely long text content that might cause layout issues',
  },
};

export const VaryingContentLength: Story = {
  render: () => (
    <VStack gap="4" alignItems="flex-start">
      <Button>OK</Button>
      <Button>Save</Button>
      <Button>Continue</Button>
      <Button>Submit Application</Button>
      <Button>Download Full Report (PDF)</Button>
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

export const Interactive: Story = {
  args: {
    variant: 'default',
    size: 'md',
    children: 'Click Me',
    disabled: false,
    loading: false,
  },
};
