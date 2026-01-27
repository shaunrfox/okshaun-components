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
 * - Multiple visual variants (default, primary, subtle, hollow)
 * - Four sizes (sm, mf, lg, xl)
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
    variant: {
      control: 'select',
      options: ['default', 'primary', 'subtle', 'hollow'],
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
// Basic variants
// ============================================================================

/**
 * Default button variant - neutral styling
 */
export const Default: Story = {
  args: {
    children: 'Default Button',
    variant: 'default',
  },
};

/**
 * Primary variant - bold brand styling for primary actions
 */
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

/**
 * Subtle variant - minimal styling for secondary actions
 */
export const Subtle: Story = {
  args: {
    children: 'Subtle Button',
    variant: 'subtle',
  },
};

/**
 * Hollow variant - bordered with transparent background
 */
export const Hollow: Story = {
  args: {
    children: 'Hollow Button',
    variant: 'hollow',
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
    size: 'sm',
  },
};

/**
 * Default size button (medium)
 */
export const DefaultSize: Story = {
  args: {
    children: 'Default',
    size: 'md',
  },
};

/**
 * Large size button
 */
export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
  },
};

/**
 * Extra large size button
 */
export const XLarge: Story = {
  args: {
    children: 'Extra Large',
    size: 'xl',
  },
};

/**
 * All sizes comparison
 */
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

// ============================================================================
// variant × Size Matrix
// ============================================================================

/**
 * Complete matrix showing all variant and size combinations
 */
export const AllVariants: Story = {
  render: () => (
    <VStack gap="6" alignItems="flex-start">
      {(['default', 'primary', 'subtle', 'hollow'] as const).map((variant) => (
        <div key={variant}>
          <div
            className={css({
              mb: '2',
              fontSize: '14',
              fontWeight: 'bold',
              textTransform: 'capitalize',
            })}
          >
            {variant}
          </div>
          <HStack gap="4" flexWrap="wrap" alignItems="center">
            {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <Button key={size} variant={variant} size={size}>
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
 * Disabled state across all variants
 */
export const DisabledVariants: Story = {
  render: () => (
    <HStack gap="4" flexWrap="wrap">
      <Button variant="default" disabled>
        Default Disabled
      </Button>
      <Button variant="primary" disabled>
        Primary Disabled
      </Button>
      <Button variant="subtle" disabled>
        Subtle Disabled
      </Button>
      <Button variant="hollow" disabled>
        Hollow Disabled
      </Button>
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
 * Loading state across all variants
 */
export const LoadingVariants: Story = {
  render: () => (
    <HStack gap="4" flexWrap="wrap">
      <Button variant="default" loading>
        Default
      </Button>
      <Button variant="primary" loading>
        Primary
      </Button>
      <Button variant="subtle" loading>
        Subtle
      </Button>
      <Button variant="hollow" loading>
        Hollow
      </Button>
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
 * Icon buttons across all variants
 */
export const IconVariants: Story = {
  render: () => (
    <HStack gap="4" flexWrap="wrap">
      <Button variant="default" iconBefore="plus">
        Add
      </Button>
      <Button variant="primary" iconBefore="check">
        Confirm
      </Button>
      <Button variant="subtle" iconBefore="edit">
        Edit
      </Button>
      <Button variant="hollow" iconAfter="arrow-square-out">
        Open
      </Button>
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
      <Button size="sm" iconBefore="plus">
        Small
      </Button>
      <Button size="md" iconBefore="plus">
        Default
      </Button>
      <Button size="lg" iconBefore="plus">
        Large
      </Button>
      <Button size="xl" iconBefore="plus">
        XLarge
      </Button>
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
      <Button iconBefore="plus" gap="2">
        Gap 2
      </Button>
      <Button iconBefore="plus" gap="4">
        Gap 4 (default)
      </Button>
      <Button iconBefore="plus" gap="6">
        Gap 6
      </Button>
      <Button iconBefore="plus" gap="8">
        Gap 8
      </Button>
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
 * Link buttons with different variants
 */
export const LinkVariants: Story = {
  render: () => (
    <HStack gap="4" flexWrap="wrap">
      <Button href="#" variant="default">
        Default Link
      </Button>
      <Button href="#" variant="primary">
        Primary Link
      </Button>
      <Button href="#" variant="subtle">
        Subtle Link
      </Button>
      <Button href="#" variant="hollow" iconAfter="arrow-square-out">
        External
      </Button>
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
        <div className={css({ mb: '2', fontSize: '14', fontWeight: 'bold' })}>
          IconButton variants
        </div>
        <HStack gap="4">
          <IconButton variant="default" aria-label="Add">
            <Icon name="plus" />
          </IconButton>
          <IconButton variant="primary" aria-label="Confirm">
            <Icon name="check" />
          </IconButton>
          <IconButton variant="subtle" aria-label="Settings">
            <Icon name="settings" />
          </IconButton>
          <IconButton variant="hollow" aria-label="Delete">
            <Icon name="trash" />
          </IconButton>
        </HStack>
      </div>
      <div>
        <div className={css({ mb: '2', fontSize: '14', fontWeight: 'bold' })}>
          IconButton Sizes
        </div>
        <HStack gap="4" alignItems="center">
          <IconButton size="sm" aria-label="Add">
            <Icon name="plus" />
          </IconButton>
          <IconButton size="md" aria-label="Add">
            <Icon name="plus" />
          </IconButton>
          <IconButton size="lg" aria-label="Add">
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
      <Button variant="primary" iconBefore="check">
        Confirm
      </Button>
      <Button variant="hollow">Cancel</Button>
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
      <Button variant="subtle">Reset</Button>
      <Button variant="hollow">Save Draft</Button>
      <Button variant="primary" iconAfter="arrow-right">
        Submit
      </Button>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

/**
 * Navigation buttons
 */
export const Navigation: Story = {
  render: () => (
    <HStack gap="4" justifyContent="space-between" width="xs">
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

/**
 * CRUD operation buttons
 */
export const CrudActions: Story = {
  render: () => (
    <HStack gap="3" flexWrap="wrap">
      <Button variant="primary" size="sm" iconBefore="plus">
        Create
      </Button>
      <Button variant="hollow" size="sm" iconBefore="edit">
        Edit
      </Button>
      <Button variant="subtle" size="sm" iconBefore="trash">
        Delete
      </Button>
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

// ============================================================================
// Edge Cases
// ============================================================================

/**
 * Button with very long text
 */
export const LongText: Story = {
  args: {
    children:
      'This is a button with extremely long text content that might cause layout issues',
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
    variant: 'default',
    size: 'md',
    children: 'Click Me',
    disabled: false,
    loading: false,
  },
};
