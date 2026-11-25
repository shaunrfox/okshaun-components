import type { Meta, StoryObj } from '@storybook/react-vite';

import { VStack } from '@styled-system/jsx';
import { expect, within } from 'storybook/test';
import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import { PageBanner } from './PageBanner';

const description = `
\`PageBanner\` is the page-width placement in the notification set. It reports a
**system** condition — degraded service, a read-only window, a required
migration — and therefore has **no dismiss control**: the banner goes away when
the condition is resolved, not when the reader is tired of it.

| Category | Placement | Tone | Dismiss |
| --- | --- | --- | --- |
| System | \`PageBanner\` | danger / warning / info | No — until resolved |
| Feedback, blocking | \`Alert\` | danger | Yes |
| Feedback, non-blocking | \`Toast\` | success / danger | Auto |
| Awareness, section | \`Alert\` | info / warning / neutral | Optional |
| Awareness, field | \`InlineNote\` | info / warning / danger | No |

**Emphasis.** \`subtle\` tints the page edge and is the default. \`bold\` fills
the banner with the tone color and inverts text and icon; reserve it for a
condition that must not be scrolled past.

**Actions.** Same API as \`Alert\` and \`Toast\`: \`primaryAction\` and
\`secondaryAction\`, each a \`Button\`, both optional.

**Accessibility.** \`role="alert"\` when \`tone\` is \`danger\`,
\`role="status"\` otherwise. \`tone="neutral"\` uses the info icon.
`;

const meta = {
  title: 'Components/PageBanner',
  component: PageBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: description } },
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger', 'neutral'],
    },
    emphasis: { control: 'inline-radio', options: ['subtle', 'bold'] },
  },
  args: {
    tone: 'info',
    emphasis: 'subtle',
    children: 'Scheduled maintenance begins tonight at 22:00 UTC.',
  },
} satisfies Meta<typeof PageBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SubtleTones: Story = {
  name: 'Every tone, subtle',
  render: () => (
    <VStack alignItems="stretch" gap="0">
      <PageBanner tone="info">A new release is available.</PageBanner>
      <PageBanner tone="success">
        All services are operating normally.
      </PageBanner>
      <PageBanner tone="warning">
        Scheduled maintenance begins tonight at 22:00 UTC.
      </PageBanner>
      <PageBanner tone="danger">
        Order sync is failing. New orders are not reaching the warehouse.
      </PageBanner>
      <PageBanner tone="neutral">
        This environment is a sandbox. Neutral uses the info icon.
      </PageBanner>
    </VStack>
  ),
};

export const BoldTones: Story = {
  name: 'Every tone, bold',
  render: () => (
    <VStack alignItems="stretch" gap="0">
      <PageBanner tone="info" emphasis="bold">
        A new release is available.
      </PageBanner>
      <PageBanner tone="success" emphasis="bold">
        All services are operating normally.
      </PageBanner>
      <PageBanner tone="warning" emphasis="bold">
        Scheduled maintenance begins tonight at 22:00 UTC.
      </PageBanner>
      <PageBanner tone="danger" emphasis="bold">
        Order sync is failing. New orders are not reaching the warehouse.
      </PageBanner>
      <PageBanner tone="neutral" emphasis="bold">
        This environment is a sandbox. Neutral uses the info icon.
      </PageBanner>
    </VStack>
  ),
};

export const Actions: Story = {
  name: 'Zero, one, and two actions',
  render: () => (
    <VStack alignItems="stretch" gap="0">
      <PageBanner tone="warning">
        No actions: the message stands alone.
      </PageBanner>
      <PageBanner
        tone="warning"
        primaryAction={<Button size="sm">View schedule</Button>}
      >
        One action.
      </PageBanner>
      <PageBanner
        tone="danger"
        emphasis="bold"
        primaryAction={
          <Button size="sm" variant="primary">
            Open status page
          </Button>
        }
        secondaryAction={
          <Button size="sm" variant="ghost">
            Dismiss for this session
          </Button>
        }
      >
        Two actions. A banner has no built-in dismiss, so anything of that kind
        is an explicit, application-owned action.
      </PageBanner>
    </VStack>
  ),
};

export const ExDegradedService: Story = {
  name: 'Ex: degraded service above the app shell',
  render: () => (
    <VStack alignItems="stretch" gap="0">
      <PageBanner
        tone="danger"
        emphasis="bold"
        primaryAction={
          <Button size="sm" variant="primary">
            Open status page
          </Button>
        }
      >
        Order sync has been failing since 14:20. New orders are queued and will
        send automatically once the connection recovers.
      </PageBanner>
      <Box p="24">
        <Text textStyle="body.md">
          Application content sits below the banner.
        </Text>
      </Box>
    </VStack>
  ),
};

export const RoleByTone: Story = {
  name: 'Test: role by tone',
  render: () => (
    <VStack alignItems="stretch" gap="0">
      <PageBanner tone="danger">Danger banners interrupt.</PageBanner>
      <PageBanner tone="info">Every other tone announces politely.</PageBanner>
    </VStack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await expect(canvas.getByRole('status')).toBeInTheDocument();
  },
};
