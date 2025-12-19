import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { css } from '@styled-system/css';
import { HStack, VStack } from '@styled-system/jsx';

/**
 * Button component with comprehensive variant support.
 *
 * Features:
 * - Multiple visual appearances (default, primary, subtle, hollow)
 * - Four sizes (small, default, large, xlarge)
 * - Icon support via string names (iconBefore, iconAfter)
 * - Loading and disabled states
 * - Auto-renders as anchor when href is provided
 * - Customizable gap between icon and text
 */
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      control: 'select',
      options: ['default', 'primary', 'subtle', 'hollow'],
      description: 'Visual style appearance',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large', 'xlarge'],
      description: 'Button size',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state - non-interactive',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state - shows spinner and disables interaction',
    },
    iconBefore: {
      control: 'select',
      options: [undefined, 'plus', 'check', 'arrow-left', 'edit', 'search'],
      description: 'Icon name to display before text',
    },
    iconAfter: {
      control: 'select',
      options: [undefined, 'arrow-right', 'chevron-down', 'arrow-square-out'],
      description: 'Icon name to display after text',
    },
    gap: {
      control: 'select',
      options: [undefined, '2', '4', '6', '8'],
      description: 'Gap between icon and text (NumericSizeToken)',
    },
    href: {
      control: 'text',
      description: 'When provided, button renders as anchor element',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Basic Appearances
// ============================================================================

/**
 * Default button appearance - neutral styling
 */
export const Default: Story = {
  args: {
    children: 'Default Button',
    appearance: 'default',
  },
};

/**
 * Primary appearance - bold brand styling for primary actions
 */
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    appearance: 'primary',
  },
};

/**
 * Subtle appearance - minimal styling for secondary actions
 */
export const Subtle: Story = {
  args: {
    children: 'Subtle Button',
    appearance: 'subtle',
  },
};

/**
 * Hollow appearance - bordered with transparent background
 */
export const Hollow: Story = {
  args: {
    children: 'Hollow Button',
    appearance: 'hollow',
  },
};

// ============================================================================
// Size Variants
// ============================================================================

/**
 * Small size button
 */
export const Small: Story = {
  args: {
    children: 'Small',
    size: 'small',
  },
};

/**
 * Default size button (medium)
 */
export const DefaultSize: Story = {
  args: {
    children: 'Default',
    size: 'default',
  },
};

/**
 * Large size button
 */
export const Large: Story = {
  args: {
    children: 'Large',
    size: 'large',
  },
};

/**
 * Extra large size button
 */
export const XLarge: Story = {
  args: {
    children: 'Extra Large',
    size: 'xlarge',
  },
};

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => (
    <HStack gap="4" alignItems="center" flexWrap="wrap">
      <Button size="small">Small</Button>
      <Button size="default">Default</Button>
      <Button size="large">Large</Button>
      <Button size="xlarge">Extra Large</Button>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Appearance × Size Matrix
// ============================================================================

/**
 * Complete matrix showing all appearance and size combinations
 */
export const AllVariants: Story = {
  render: () => (
    <VStack gap="6" alignItems="flex-start">
      {(['default', 'primary', 'subtle', 'hollow'] as const).map((appearance) => (
        <div key={appearance}>
          <div className={css({ mb: '2', fontSize: 'sm', fontWeight: 'semibold', textTransform: 'capitalize' })}>
            {appearance}
          </div>
          <HStack gap="4" flexWrap="wrap" alignItems="center">
            {(['small', 'default', 'large', 'xlarge'] as const).map((size) => (
              <Button key={size} appearance={appearance} size={size}>
                {size}
              </Button>
            ))}
          </HStack>
        </div>
      ))}
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// States
// ============================================================================

/**
 * Disabled state - non-interactive with reduced styling
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

/**
 * Disabled state across all appearances
 */
export const DisabledVariants: Story = {
  render: () => (
    <HStack gap="4" flexWrap="wrap">
      <Button appearance="default" disabled>Default Disabled</Button>
      <Button appearance="primary" disabled>Primary Disabled</Button>
      <Button appearance="subtle" disabled>Subtle Disabled</Button>
      <Button appearance="hollow" disabled>Hollow Disabled</Button>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

/**
 * Loading state - shows spinner and disables interaction
 */
export const Loading: Story = {
  args: {
    children: 'Loading',
    loading: true,
  },
};

/**
 * Loading state across all appearances
 */
export const LoadingVariants: Story = {
  render: () => (
    <HStack gap="4" flexWrap="wrap">
      <Button appearance="default" loading>Default</Button>
      <Button appearance="primary" loading>Primary</Button>
      <Button appearance="subtle" loading>Subtle</Button>
      <Button appearance="hollow" loading>Hollow</Button>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Icon Support
// ============================================================================

/**
 * Button with icon before text (pass icon name as string)
 */
export const WithIconBefore: Story = {
  args: {
    iconBefore: 'plus',
    children: 'Add Item',
  },
};

/**
 * Button with icon after text
 */
export const WithIconAfter: Story = {
  args: {
    iconAfter: 'arrow-right',
    children: 'Next',
  },
};

/**
 * Button with icons on both sides
 */
export const WithBothIcons: Story = {
  args: {
    iconBefore: 'arrow-left',
    iconAfter: 'arrow-right',
    children: 'Navigate',
  },
};

/**
 * Icon buttons across all appearances
 */
export const IconVariants: Story = {
  render: () => (
    <HStack gap="4" flexWrap="wrap">
      <Button appearance="default" iconBefore="plus">Add</Button>
      <Button appearance="primary" iconBefore="check">Confirm</Button>
      <Button appearance="subtle" iconBefore="edit">Edit</Button>
      <Button appearance="hollow" iconAfter="arrow-square-out">Open</Button>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

/**
 * Icon buttons with different sizes
 */
export const IconSizes: Story = {
  render: () => (
    <HStack gap="4" alignItems="center" flexWrap="wrap">
      <Button size="small" iconBefore="plus">Small</Button>
      <Button size="default" iconBefore="plus">Default</Button>
      <Button size="large" iconBefore="plus">Large</Button>
      <Button size="xlarge" iconBefore="plus">XLarge</Button>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Gap Customization
// ============================================================================

/**
 * Custom gap between icon and text
 */
export const CustomGap: Story = {
  render: () => (
    <VStack gap="4" alignItems="flex-start">
      <Button iconBefore="plus" gap="2">Gap 2</Button>
      <Button iconBefore="plus" gap="4">Gap 4 (default)</Button>
      <Button iconBefore="plus" gap="6">Gap 6</Button>
      <Button iconBefore="plus" gap="8">Gap 8</Button>
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Link Buttons (href)
// ============================================================================

/**
 * Button with href automatically renders as anchor element
 */
export const AsLink: Story = {
  args: {
    href: 'https://example.com',
    children: 'Visit Website',
    iconAfter: 'arrow-square-out',
  },
};

/**
 * Link buttons with different appearances
 */
export const LinkVariants: Story = {
  render: () => (
    <HStack gap="4" flexWrap="wrap">
      <Button href="#" appearance="default">Default Link</Button>
      <Button href="#" appearance="primary">Primary Link</Button>
      <Button href="#" appearance="subtle">Subtle Link</Button>
      <Button href="#" appearance="hollow" iconAfter="arrow-square-out">External</Button>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// IconButton Companion
// ============================================================================

/**
 * IconButton component for icon-only buttons
 */
export const IconButtons: Story = {
  render: () => (
    <VStack gap="6" alignItems="flex-start">
      <div>
        <div className={css({ mb: '2', fontSize: 'sm', fontWeight: 'semibold' })}>
          IconButton Appearances
        </div>
        <HStack gap="4">
          <IconButton appearance="default" aria-label="Add">
            <Icon name="plus" />
          </IconButton>
          <IconButton appearance="primary" aria-label="Confirm">
            <Icon name="check" />
          </IconButton>
          <IconButton appearance="subtle" aria-label="Settings">
            <Icon name="settings" />
          </IconButton>
          <IconButton appearance="hollow" aria-label="Delete">
            <Icon name="trash" />
          </IconButton>
        </HStack>
      </div>
      <div>
        <div className={css({ mb: '2', fontSize: 'sm', fontWeight: 'semibold' })}>
          IconButton Sizes
        </div>
        <HStack gap="4" alignItems="center">
          <IconButton size="small" aria-label="Add">
            <Icon name="plus" />
          </IconButton>
          <IconButton size="default" aria-label="Add">
            <Icon name="plus" />
          </IconButton>
          <IconButton size="large" aria-label="Add">
            <Icon name="plus" />
          </IconButton>
        </HStack>
      </div>
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Common Use Cases
// ============================================================================

/**
 * Primary action button group (e.g., form submission)
 */
export const ActionGroup: Story = {
  render: () => (
    <HStack gap="4">
      <Button appearance="primary" iconBefore="check">Confirm</Button>
      <Button appearance="hollow">Cancel</Button>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

/**
 * Form actions with multiple options
 */
export const FormActions: Story = {
  render: () => (
    <HStack gap="4" justifyContent="flex-end">
      <Button appearance="subtle">Reset</Button>
      <Button appearance="hollow">Save Draft</Button>
      <Button appearance="primary" iconAfter="arrow-right">Submit</Button>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

/**
 * Navigation buttons
 */
export const Navigation: Story = {
  render: () => (
    <HStack gap="4" justifyContent="space-between" width="300px">
      <Button appearance="hollow" iconBefore="arrow-left">Back</Button>
      <Button appearance="primary" iconAfter="arrow-right">Next</Button>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

/**
 * CRUD operation buttons
 */
export const CrudActions: Story = {
  render: () => (
    <HStack gap="3" flexWrap="wrap">
      <Button appearance="primary" size="small" iconBefore="plus">Create</Button>
      <Button appearance="hollow" size="small" iconBefore="edit">Edit</Button>
      <Button appearance="subtle" size="small" iconBefore="trash">Delete</Button>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

/**
 * Form submitting state
 */
export const FormSubmitting: Story = {
  render: () => (
    <HStack gap="4">
      <Button appearance="hollow" disabled>Cancel</Button>
      <Button appearance="primary" loading>Saving...</Button>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

// ============================================================================
// Edge Cases
// ============================================================================

/**
 * Button with very long text
 */
export const LongText: Story = {
  args: {
    children: 'This is a button with extremely long text content that might cause layout issues',
  },
};

/**
 * Buttons with varying content lengths
 */
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

// ============================================================================
// Interactive Playground
// ============================================================================

/**
 * Interactive playground to test all props
 */
export const Playground: Story = {
  args: {
    appearance: 'default',
    size: 'default',
    children: 'Click Me',
    disabled: false,
    loading: false,
  },
};
