import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Box } from '../Box';
import { Text } from '../Text';
import { Breadcrumbs } from './Breadcrumbs';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    items: [
      { id: 'home', label: 'Home', href: '#' },
      { id: 'billing', label: 'Billing', href: '#' },
      { id: 'invoice-1242', label: 'Invoice #1242' },
    ],
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const ExDeepNavigation: Story = {
  name: 'Ex: Deep Navigation Path',
  render: () => (
    <Box maxW="prose">
      <Breadcrumbs
        items={[
          { id: 'dashboard', label: 'Dashboard', href: '#' },
          { id: 'customers', label: 'Customers', href: '#' },
          { id: 'acme', label: 'Acme Manufacturing', href: '#' },
          { id: 'contacts', label: 'Contacts', href: '#' },
          { id: 'primary', label: 'Primary Contact' },
        ]}
      />
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const ExSingleLevel: Story = {
  name: 'Ex: Single Level',
  render: () => <Breadcrumbs items={[{ id: 'settings', label: 'Settings' }]} />,
  parameters: { controls: { disable: true } },
};

export const ExHandledInApp: Story = {
  name: 'Ex: Navigation handled by the app',
  render: function ExHandledInAppRender() {
    const [view, setView] = useState('Ticket 1042');

    return (
      <Box display="grid" gap="12">
        <Breadcrumbs
          items={[
            {
              id: 'cases',
              label: 'Support tickets',
              href: '/cases',
              onClick: (event) => {
                // Keep the href for open-in-new-tab, but route in the app.
                event.preventDefault();
                setView('Ticket list');
              },
            },
            { id: 'case', label: '#1042' },
          ]}
        />
        <Text size="14" color="text.subtle">
          Showing: {view}
        </Text>
      </Box>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole('link', { name: 'Support tickets' }),
    );
    expect(canvas.getByText('Showing: Ticket list')).toBeInTheDocument();
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Give a linked segment `onClick` when the app handles the navigation, such as a client-side route or closing a drawer. Call `event.preventDefault()` to stop the browser from following `href`.',
      },
    },
  },
};
