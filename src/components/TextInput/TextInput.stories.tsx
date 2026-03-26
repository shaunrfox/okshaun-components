import type { Meta, StoryObj } from '@storybook/react';
import { Grid, HStack, VStack, Wrap } from '@styled-system/jsx';
import { FormField } from '../FormField';
import { Text } from '../Text';
import { TextInput } from './TextInput';

/**
 * TextInput component for single-line text entry.
 *
 * Features:
 * - Four sizes (sm, md, lg, xl)
 * - Optional leading/trailing icons
 * - Error and disabled states
 * - Auto-sizing via `fieldSizing: content`
 * - Explicit input type support (text, email, password, search, etc.)
 * - Pairs with FormField for labels, help text, and error messages
 */
const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  args: {
    name: 'text-input',
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Input size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Error state — sets aria-invalid and error styling',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    autoSize: {
      control: 'boolean',
      description: 'Auto-size width to content',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    iconBefore: {
      control: 'select',
      options: [undefined, 'search', 'user', 'mail', 'lock'],
      description: 'Icon name to display before input',
    },
    iconAfter: {
      control: 'select',
      options: [undefined, 'check', 'x', 'eye', 'chevron-down'],
      description: 'Icon name to display after input',
    },
    type: {
      control: 'select',
      options: [
        'text',
        'number',
        'email',
        'password',
        'search',
        'tel',
        'url',
        'date',
        'time',
        'datetime-local',
        'month',
        'week',
      ],
      description: 'HTML input type',
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    name: {
      control: 'text',
      description: 'Input name attribute',
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Sizes
// ============================================================================

export const Sizes: Story = {
  render: () => (
    <VStack gap="12" alignItems="flex-start">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <TextInput
          key={size}
          size={size}
          name={size}
          placeholder={`Size: ${size}`}
        />
      ))}
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// States
// ============================================================================

export const States: Story = {
  render: () => (
    <Grid
      gridTemplateColumns="auto 1fr"
      columnGap="12"
      rowGap="32"
      alignItems="center"
    >
      <Text textStyle="mono.md" mr="16">
        default
      </Text>
      <TextInput name="default" placeholder="Default" />
      <Text textStyle="mono.md" mr="16">
        disabled
      </Text>
      <TextInput name="disabled" placeholder="Disabled" disabled />
      <Text textStyle="mono.md" mr="16">
        error
      </Text>
      <TextInput name="error" placeholder="Error" error />
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
      <VStack gap="8" alignItems="flex-start">
        <TextInput name="search" iconBefore="search" placeholder="Search..." />
        <TextInput name="user" iconBefore="user" placeholder="Username" />
        <TextInput
          name="email"
          iconBefore="envelope"
          placeholder="Email"
          type="email"
        />
        <TextInput
          name="password"
          iconBefore="lock"
          placeholder="Password"
          type="password"
        />
      </VStack>
      <Text textStyle="mono.md" mr="16">
        iconAfter
      </Text>
      <VStack gap="8" alignItems="flex-start">
        <TextInput name="valid" iconAfter="check" placeholder="Validated" />
        <HStack>
          <TextInput name="clear" iconAfter="at" placeholder="Username" />
          cetecerp.com
        </HStack>
      </VStack>
    </Grid>
  ),
  parameters: { controls: { disable: true } },
};

export const IconSizes: Story = {
  render: () => (
    <VStack gap="12" alignItems="flex-start">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <TextInput
          key={size}
          size={size}
          name={size}
          iconBefore="search"
          placeholder={`Size: ${size}`}
        />
      ))}
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Auto Size
// ============================================================================

export const AutoSize: Story = {
  render: () => (
    <VStack gap="12" alignItems="flex-start" maxW="3xl">
      <TextInput name="auto-sm" size="sm" autoSize placeholder="Auto size sm" />
      <TextInput name="auto-md" size="md" autoSize placeholder="Auto size md" />
      <TextInput name="auto-lg" size="lg" autoSize placeholder="Auto size lg" />
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Common Use Cases
// ============================================================================

export const WithFormField: Story = {
  name: 'Ex: With FormField',
  render: () => (
    <VStack gap="24" alignItems="stretch" w="xs">
      <FormField label="Full Name" labelFor="fullName" required>
        <TextInput
          name="fullName"
          id="fullName"
          iconBefore="user"
          placeholder="John Doe"
        />
      </FormField>
      <FormField
        label="Email"
        labelFor="email"
        helpText="We'll never share your email."
        tooltipText="For real. We won't share it with anyone"
      >
        <TextInput
          name="email"
          id="email"
          iconBefore="envelope"
          placeholder="john@example.com"
          type="email"
        />
      </FormField>
      <FormField
        label="Username"
        labelFor="username"
        error
        errorText="Username is already taken."
      >
        <TextInput name="username" id="username" defaultValue="johndoe" error />
      </FormField>
      <FormField label="Company" labelFor="company" disabled>
        <TextInput
          name="company"
          id="company"
          placeholder="Cetec ERP"
          disabled
        />
      </FormField>
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

export const InlineFormField: Story = {
  name: 'Ex: Inline FormField',
  render: () => (
    <VStack gap="16" alignItems="stretch" w="md">
      <FormField layout="inline" labelFor="fullName" label="Full Name" required>
        <TextInput
          name="fullName"
          id="fullName"
          iconBefore="user"
          placeholder="John Doe"
        />
      </FormField>
      <FormField
        layout="inline"
        label="Email"
        labelFor="email2"
        helpText="We'll never share your email."
        tooltipText="For real. We won't share it with anyone"
      >
        <TextInput
          name="email2"
          id="email2"
          iconBefore="envelope"
          placeholder="john@example.com"
          type="email"
        />
      </FormField>
      <FormField
        layout="inline"
        label="Username"
        labelFor="username"
        error
        errorText="Username is already taken."
      >
        <TextInput name="username" id="username" defaultValue="johndoe" />
      </FormField>
      <FormField layout="inline" label="Company" labelFor="company2" disabled>
        <TextInput
          name="company"
          id="company2"
          placeholder="Cetec ERP"
          disabled
        />
      </FormField>
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

export const SearchInput: Story = {
  name: 'Ex: Search Input',
  render: () => (
    <Wrap gap="12" alignItems="center" w="xs">
      <TextInput
        name="search-sm"
        size="sm"
        iconBefore="search"
        placeholder="Search..."
      />
      <TextInput
        name="search-md"
        size="md"
        iconBefore="search"
        placeholder="Search..."
      />
      <TextInput
        name="search-lg"
        size="lg"
        iconBefore="search"
        placeholder="Search..."
      />
      <TextInput
        name="search-xl"
        size="xl"
        iconBefore="search"
        placeholder="Search..."
      />
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
    name: 'demo',
    size: 'md',
    type: 'text',
    placeholder: 'Type something...',
    error: false,
    disabled: false,
    autoSize: false,
  },
};
