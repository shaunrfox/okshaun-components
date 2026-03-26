import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box';
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
