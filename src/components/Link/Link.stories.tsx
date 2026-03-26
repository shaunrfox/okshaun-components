import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box';
import { Link } from './Link';

const meta = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    href: '#',
    children: 'Read more',
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Box display="grid" gap="12">
      <Link href="#" family="body" size="16">
        Standard internal link
      </Link>
      <Link href="#" family="mono" size="14">
        Monospace link
      </Link>
      <Link href="https://cetecerp.com" external>
        External link with icon
      </Link>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const ExInParagraph: Story = {
  name: 'Ex: In Paragraph Copy',
  render: () => (
    <Box maxW="prose">
      To learn about API credentials, visit the{' '}
      <Link href="#">account settings guide</Link> before connecting your ERP
      integration.
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const ExDisabled: Story = {
  name: 'Ex: Disabled State',
  render: () => (
    <Box display="grid" gap="8">
      <Link href="#" disabled>
        Disabled action while saving
      </Link>
      <Link href="#">Enabled action</Link>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};
