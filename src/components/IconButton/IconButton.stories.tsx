import type { Meta, StoryObj } from '@storybook/react-vite';
import { Wrap } from '@styled-system/jsx';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { Box } from '../Box';
import { FormField } from '../FormField';
import { Menu, MenuItem } from '../Menu';
import { IconButton } from './IconButton';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    iconName: 'edit',
    altText: 'Edit item',
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Wrap gap="14">
      <IconButton iconName="edit" altText="Edit" variant="standard" />
      <IconButton iconName="download" altText="Download" variant="primary" />
      <IconButton iconName="printer" altText="Print" variant="hollow" />
      <IconButton iconName="info" altText="Info" variant="ghost" />
      <IconButton iconName="trash" altText="Delete" variant="danger" />
      <IconButton iconName="alarm" altText="Alarms" variant="selected" />
      <IconButton iconName="barcode" altText="Barcode" variant="selectedBold" />
    </Wrap>
  ),
  parameters: { controls: { disable: true } },
};

export const Sizes: Story = {
  render: () => (
    <Wrap gap="14" alignItems="center">
      <IconButton iconName="calendar" altText="Calendar" size="sm" />
      <IconButton iconName="calendar" altText="Calendar" size="md" />
      <IconButton iconName="calendar" altText="Calendar" size="lg" />
      <IconButton iconName="calendar" altText="Calendar" size="xl" />
    </Wrap>
  ),
  parameters: { controls: { disable: true } },
};

export const ExLoadingAndDisabled: Story = {
  name: 'Ex: Loading and Disabled',
  render: () => (
    <Wrap gap="14">
      <IconButton iconName="cloud-synced" altText="Syncing" loading />
      <IconButton iconName="trash" altText="Delete" variant="danger" disabled />
    </Wrap>
  ),
  parameters: { controls: { disable: true } },
};

export const WithFormFieldInheritance: Story = {
  name: 'With FormField Inheritance',
  render: () => (
    <FormField label="Refresh" labelFor="refresh-action" error>
      <IconButton
        id="refresh-action"
        iconName="refresh"
        altText="Refresh data"
      />
    </FormField>
  ),
  parameters: { controls: { disable: true } },
};

export const ExDisabledWithReason: Story = {
  name: 'Ex: Disabled With Reason',
  render: () => (
    <Wrap gap="14">
      <IconButton
        iconName="edit"
        altText="Edit order"
        disabledReason="Closed orders can't be edited."
      />
      <IconButton
        iconName="trash"
        altText="Delete order"
        variant="danger"
        disabledReason="Orders with shipments can't be deleted."
      />
    </Wrap>
  ),
  parameters: { controls: { disable: true } },
};

export const DisabledReasonBehavior: Story = {
  name: 'Test: disabledReason',
  args: {
    iconName: 'trash',
    altText: 'Delete order',
    disabledReason: "Orders with shipments can't be deleted.",
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    // altText stays the accessible name; the reason is the description.
    const button = canvas.getByRole('button', { name: 'Delete order' });

    await expect(button).toHaveAttribute('aria-disabled', 'true');
    await expect(button).not.toHaveAttribute('disabled');
    await expect(button).toHaveAccessibleDescription(
      "Orders with shipments can't be deleted.",
    );

    // The button takes pointer events, as Button does, so it shows the
    // not-allowed cursor and a pointer reaches it. Hover shows the reason,
    // and a click does nothing.
    await expect(getComputedStyle(button).pointerEvents).toBe('auto');
    await expect(getComputedStyle(button).cursor).toBe('not-allowed');
    await userEvent.hover(button);
    await expect(
      await within(document.body).findByRole('tooltip'),
    ).toHaveTextContent("Orders with shipments can't be deleted.");
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
    await userEvent.unhover(button);
    button.blur();
    await waitFor(() =>
      expect(within(document.body).queryByRole('tooltip')).toBeNull(),
    );

    // Keyboard activation does nothing.
    button.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await expect(args.onClick).not.toHaveBeenCalled();

    // Keyboard focus shows the label as the title, with the reason below.
    button.blur();
    await userEvent.tab();
    await expect(button).toHaveFocus();
    const tooltip = await within(document.body).findByRole('tooltip');
    await expect(tooltip).toHaveTextContent('Delete order');
    await expect(tooltip).toHaveTextContent(
      "Orders with shipments can't be deleted.",
    );
  },
};

export const DisabledReasonLink: Story = {
  name: 'Test: disabled link has no href',
  // Behavior test only. It looks the same as "Test: disabledReason".
  tags: ['!snapshot'],
  args: {
    iconName: 'edit',
    altText: 'Edit order',
    href: 'https://example.com/orders/1042/edit',
    disabledReason: "Closed orders can't be edited.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // No live href, so the context menu can't open it in a new tab.
    const link = canvas.getByRole('link', { name: 'Edit order' });

    await expect(link).not.toHaveAttribute('href');
    await expect(link).toHaveAttribute('aria-disabled', 'true');
    await userEvent.tab();
    await expect(link).toHaveFocus();
  },
};

export const MenuTriggerTooltip: Story = {
  name: 'Test: no tooltip while its menu is open',
  // Test-only: hidden from the sidebar and docs; open by URL or a test runner.
  // Behavior test only. The menu is closed at the end, so it looks the same
  // as Default.
  tags: ['!dev', '!autodocs', '!snapshot'],
  render: () => (
    <Box pb="96">
      <Menu
        placement="bottom-end"
        trigger={
          <IconButton
            iconName="caret-down"
            altText="More actions"
            aria-haspopup="menu"
          />
        }
      >
        <MenuItem label="Choose location…" />
        <MenuItem label="Partial move…" />
      </Menu>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', { name: 'More actions' });

    // Hover shows the label.
    await userEvent.hover(trigger);
    await expect(await body.findByRole('tooltip')).toHaveTextContent(
      'More actions',
    );

    // While the menu is open, the label stays hidden, even when the pointer
    // comes back onto the trigger, so it does not cover the menu. (Browsers
    // differ on whether the click itself closes it.)
    await userEvent.click(trigger);
    await body.findByRole('menu');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await userEvent.unhover(trigger);
    await userEvent.hover(trigger);
    // Give a tooltip time to open, so its absence means something.
    await new Promise((resolve) => setTimeout(resolve, 500));
    await expect(body.queryByRole('tooltip')).toBeNull();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByRole('menu')).toBeNull());
    await userEvent.unhover(trigger);
    trigger.blur();
    await waitFor(() => expect(body.queryByRole('tooltip')).toBeNull());
  },
};
