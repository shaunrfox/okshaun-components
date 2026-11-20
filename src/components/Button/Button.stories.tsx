import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid, HStack, VStack, Wrap } from '@styled-system/jsx';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Divider } from '../Divider';
import { IconButton } from '../IconButton';
import { Spinner } from '../Spinner';
import { Text } from '../Text';
import { Button } from './Button';

const buttonVariants = [
  'standard',
  'primary',
  'ghost',
  'hollow',
  'danger',
  'selected',
  'selectedBold',
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
        defaultValue: { summary: 'standard' },
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

export const WithSlots: Story = {
  name: 'With Slots',
  render: () => (
    <Wrap gap="12" alignItems="center">
      <Button before={<Avatar name="Ava" />} after={<Badge count={3} />}>
        Team
      </Button>
      <Button before={<Spinner />} after={<Badge variant="info" />}>
        Syncing
      </Button>
    </Wrap>
  ),
  parameters: { controls: { disable: true } },
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
      <Button href="#" variant="standard">
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
    variant: 'standard',
    size: 'md',
    children: 'Click Me',
    disabled: false,
    loading: false,
  },
};

/**
 * Use case: an action the user can't take right now, with the reason. The
 * button stays focusable, so keyboard and screen-reader users get the reason.
 */
export const DisabledWithReason: Story = {
  name: 'Ex: Disabled With Reason',
  render: () => (
    <HStack gap="8">
      <Button
        variant="primary"
        disabledReason="Closed orders can't be edited. Reopen the order first."
      >
        Edit order
      </Button>
      <Button disabledReason="You need the Purchasing role to approve.">
        Approve
      </Button>
      <IconButton
        iconName="trash"
        altText="Delete order"
        variant="danger"
        disabledReason="Orders with shipments can't be deleted."
      />
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

export const DisabledReasonBehavior: Story = {
  name: 'Test: disabledReason',
  args: {
    children: 'Edit order',
    disabledReason: "Closed orders can't be edited.",
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Edit order' });

    // Disabled for assistive tech and styling, but still in the tab order.
    await expect(button).toHaveAttribute('aria-disabled', 'true');
    await expect(button).not.toHaveAttribute('disabled');
    await expect(button).toHaveAccessibleDescription(
      "Closed orders can't be edited.",
    );

    // Clicks and keyboard activation do nothing.
    button.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await expect(args.onClick).not.toHaveBeenCalled();

    // Keyboard focus shows the reason.
    button.blur();
    await userEvent.tab();
    await expect(button).toHaveFocus();
    const tooltip = await within(document.body).findByRole('tooltip');
    await expect(tooltip).toHaveTextContent("Closed orders can't be edited.");
    // The open tooltip does not add the reason a second time.
    await expect(button).toHaveAccessibleDescription(
      "Closed orders can't be edited.",
    );

    button.blur();
    await waitFor(() =>
      expect(within(document.body).queryByRole('tooltip')).toBeNull(),
    );

    // Hover shows the reason without a hover style, and a click does nothing.
    const restingBg = getComputedStyle(button).backgroundColor;
    await userEvent.hover(button);
    await expect(
      await within(document.body).findByRole('tooltip'),
    ).toHaveTextContent("Closed orders can't be edited.");
    // Simulated hover does not set :hover, so use the hover data attribute.
    // With no transition, the computed color is final right away.
    button.style.transition = 'none';
    button.setAttribute('data-hover', 'true');
    try {
      await expect(getComputedStyle(button).backgroundColor).toBe(restingBg);
    } finally {
      button.removeAttribute('data-hover');
      button.style.transition = '';
    }
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
    await userEvent.unhover(button);
    button.blur();
    await waitFor(() =>
      expect(within(document.body).queryByRole('tooltip')).toBeNull(),
    );
  },
};

export const DisabledReasonLink: Story = {
  name: 'Test: disabled link has no href',
  // Behavior test only. It looks the same as "Test: disabledReason".
  tags: ['!snapshot'],
  args: {
    href: 'https://example.com/orders/1042',
    children: 'View order',
    disabledReason: 'You need the Sales role to view orders.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // No live href, so middle-click and "Open in new tab" can't navigate.
    const link = canvas.getByRole('link', { name: 'View order' });

    await expect(link).not.toHaveAttribute('href');
    await expect(link).toHaveAttribute('aria-disabled', 'true');
    await expect(link).toHaveAccessibleDescription(
      'You need the Sales role to view orders.',
    );

    await userEvent.tab();
    await expect(link).toHaveFocus();
    await expect(
      await within(document.body).findByRole('tooltip'),
    ).toHaveTextContent('You need the Sales role to view orders.');
    link.blur();
    await waitFor(() =>
      expect(within(document.body).queryByRole('tooltip')).toBeNull(),
    );
  },
};

export const DisabledReasonKeepsFocus: Story = {
  name: 'Test: focus stays when a reason appears',
  // Behavior test only. It ends in the same state as "Test: disabledReason".
  tags: ['!snapshot'],
  render: function Render() {
    const [reason, setReason] = useState<string>();
    return (
      <Button
        disabledReason={reason}
        onClick={() => setReason('This case is already closed.')}
      >
        Close case
      </Button>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Close case' });

    await userEvent.click(button);

    await waitFor(() =>
      expect(button).toHaveAttribute('aria-disabled', 'true'),
    );
    await expect(canvas.getByRole('button', { name: 'Close case' })).toBe(
      button,
    );
    await expect(button).toHaveFocus();

    // The button kept focus, so the reason shows without leaving and returning.
    await expect(
      await within(document.body).findByRole('tooltip'),
    ).toHaveTextContent('This case is already closed.');
  },
};
