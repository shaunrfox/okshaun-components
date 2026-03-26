import type { Meta, StoryObj } from '@storybook/react';
import { Grid, VStack } from '@styled-system/jsx';
import { FormField } from '../FormField';
import { Text } from '../Text';
import { Textarea } from './Textarea';

/**
 * Textarea component for multi-line text entry.
 *
 * Features:
 * - Four sizes (sm, md, lg, xl)
 * - Error and disabled states
 * - Auto-sizing via `fieldSizing: content`
 * - Resizable by default
 * - Pairs with FormField for labels, help text, and error messages
 */
const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    name: 'textarea',
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Textarea size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Error state — sets data-error and error styling',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    autoSize: {
      control: 'boolean',
      description: 'Auto-size height to content',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    name: {
      control: 'text',
      description: 'Textarea name attribute',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Sizes
// ============================================================================

export const Sizes: Story = {
  render: () => (
    <VStack gap="12" alignItems="flex-start">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Textarea
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
      <Textarea name="default" placeholder="Default" />
      <Text textStyle="mono.md" mr="16">
        disabled
      </Text>
      <Textarea name="disabled" placeholder="Disabled" disabled />
      <Text textStyle="mono.md" mr="16">
        error
      </Text>
      <Textarea name="error" placeholder="Error" error />
    </Grid>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Auto Size
// ============================================================================

export const AutoSize: Story = {
  render: () => (
    <VStack gap="12" alignItems="flex-start" maxW="3xl">
      <Textarea
        name="auto-sm"
        size="sm"
        autoSize
        placeholder="Auto size sm — type to grow"
      />
      <Textarea
        name="auto-md"
        size="md"
        autoSize
        placeholder="Auto size md — type to grow"
      />
      <Textarea
        name="auto-lg"
        size="lg"
        autoSize
        placeholder="Auto size lg — type to grow"
      />
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
      <FormField label="Description" labelFor="description" required>
        <Textarea
          name="description"
          id="description"
          placeholder="Enter a description..."
        />
      </FormField>
      <FormField
        label="Notes"
        labelFor="notes"
        helpText="Add any additional context."
        tooltipText="Optional notes for the team"
      >
        <Textarea name="notes" id="notes" placeholder="Additional notes..." />
      </FormField>
      <FormField
        label="Comments"
        labelFor="comments"
        error
        errorText="Comments are required."
      >
        <Textarea name="comments" id="comments" error />
      </FormField>
      <FormField label="Remarks" labelFor="remarks" disabled>
        <Textarea
          name="remarks"
          id="remarks"
          placeholder="Read-only remarks"
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
      <FormField
        layout="inline"
        labelFor="description2"
        label="Description"
        required
      >
        <Textarea
          name="description2"
          id="description2"
          placeholder="Enter a description..."
        />
      </FormField>
      <FormField
        layout="inline"
        label="Notes"
        labelFor="notes2"
        helpText="Add any additional context."
        tooltipText="Optional notes for the team"
      >
        <Textarea name="notes2" id="notes2" placeholder="Additional notes..." />
      </FormField>
      <FormField
        layout="inline"
        label="Comments"
        labelFor="comments2"
        error
        errorText="Comments are required."
      >
        <Textarea name="comments2" id="comments2" error />
      </FormField>
      <FormField layout="inline" label="Remarks" labelFor="remarks2" disabled>
        <Textarea
          name="remarks2"
          id="remarks2"
          placeholder="Read-only remarks"
          disabled
        />
      </FormField>
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
export const Interactive: Story = {
  args: {
    name: 'demo',
    size: 'md',
    placeholder: 'Type something...',
    error: false,
    disabled: false,
    autoSize: false,
  },
};
