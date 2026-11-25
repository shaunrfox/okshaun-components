import type { Meta, StoryObj } from '@storybook/react-vite';
import { VStack } from '@styled-system/jsx';
import { useState } from 'react';
import { expect, within } from 'storybook/test';
import { Button } from '../Button';
import { Text } from '../Text';
import { Alert } from './Alert';

const decisionTable = `
Four components cover notification, chosen on three axes: **category** (why the
message exists), **placement** (where it belongs), and **tone** (what kind of
state it reports).

| Category | Placement | Tone | Dismiss |
| --- | --- | --- | --- |
| System | \`PageBanner\` | danger / warning / info | No — until resolved |
| Feedback, blocking | \`Alert\` | danger | Yes |
| Feedback, non-blocking | \`Toast\` | success / danger | Auto |
| Awareness, section | \`Alert\` | info / warning / neutral | Optional |
| Awareness, field | \`InlineNote\` | info / warning / danger | No |

\`Alert\` is the inline banner: it sits in the flow of the section it concerns.

**Actions.** \`Alert\`, \`PageBanner\`, and \`Toast\` share one action API: the
explicit \`primaryAction\` and \`secondaryAction\` props, each taking a
\`Button\`. Zero, one, or two actions are supported; there is no third slot.
\`InlineNote\` takes no actions.

**Tone icons.** Every tone renders its tone icon. \`tone="neutral"\` borrows
the info icon: it marks the message as informational without claiming a state.

**Accessibility.** All four components use \`role="alert"\` (assertive) when
\`tone\` is \`danger\` and \`role="status"\` (polite) otherwise.
`;

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: decisionTable },
    },
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger', 'neutral'],
      description: 'Semantic tone.',
    },
    title: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
  args: {
    tone: 'info',
    title: 'Heads up',
    children: 'Your subscription renews on the first of next month.',
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  name: 'Every tone',
  render: () => (
    <VStack alignItems="stretch" gap="12">
      <Alert tone="info" title="Info">
        A scheduled export finished and is ready to download.
      </Alert>
      <Alert tone="success" title="Success">
        Your changes were published to production.
      </Alert>
      <Alert tone="warning" title="Warning">
        Two line items are missing a unit cost.
      </Alert>
      <Alert tone="danger" title="Danger">
        The purchase order could not be submitted.
      </Alert>
      <Alert tone="neutral" title="Neutral">
        Neutral uses the info icon on a neutral surface.
      </Alert>
    </VStack>
  ),
};

export const WithoutTitle: Story = {
  name: 'Title omitted',
  render: () => (
    <VStack alignItems="stretch" gap="12">
      <Alert tone="info" title="With a title">
        The title is optional and is hidden entirely when absent.
      </Alert>
      <Alert tone="info">
        Without a title, the message carries the whole alert.
      </Alert>
    </VStack>
  ),
};

export const Actions: Story = {
  name: 'Zero, one, and two actions',
  render: () => (
    <VStack alignItems="stretch" gap="12">
      <Alert tone="warning" title="No actions">
        Nothing to do here; the message stands on its own.
      </Alert>
      <Alert
        tone="warning"
        title="One action"
        primaryAction={<Button size="sm">Review items</Button>}
      >
        Two line items are missing a unit cost.
      </Alert>
      <Alert
        tone="danger"
        title="Two actions"
        primaryAction={
          <Button size="sm" variant="danger">
            Retry
          </Button>
        }
        secondaryAction={
          <Button size="sm" variant="ghost">
            View log
          </Button>
        }
      >
        The purchase order could not be submitted.
      </Alert>
    </VStack>
  ),
};

export const Dismissible: Story = {
  name: 'Dismissible and non-dismissible',
  render: function DismissibleStory() {
    const [visible, setVisible] = useState(true);

    return (
      <VStack alignItems="stretch" gap="12">
        <Alert tone="info" title="Not dismissible">
          Awareness messages can stay until the underlying state changes.
        </Alert>
        {visible ? (
          <Alert
            tone="info"
            title="Dismissible"
            dismissible
            onDismiss={() => setVisible(false)}
          >
            The alert does not remove itself; `onDismiss` does.
          </Alert>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => setVisible(true)}>
            Bring the alert back
          </Button>
        )}
      </VStack>
    );
  },
};

export const ExFormSubmissionFailed: Story = {
  name: 'Ex: blocking feedback on a form',
  render: () => (
    <VStack alignItems="stretch" gap="12" maxW="lg">
      <Alert
        tone="danger"
        title="Could not save this work order"
        primaryAction={
          <Button size="sm" variant="danger">
            Try again
          </Button>
        }
        secondaryAction={
          <Button size="sm" variant="ghost">
            Contact support
          </Button>
        }
      >
        The server rejected the request because the work order was edited by
        someone else while this form was open.
      </Alert>
      <Text textStyle="body.sm">Form fields would follow here.</Text>
    </VStack>
  ),
};

export const RoleByTone: Story = {
  name: 'Test: role by tone',
  render: () => (
    <VStack alignItems="stretch" gap="12">
      <Alert tone="danger" title="Assertive">
        Danger alerts interrupt.
      </Alert>
      <Alert tone="info" title="Polite">
        Every other tone announces politely.
      </Alert>
    </VStack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await expect(canvas.getByRole('status')).toBeInTheDocument();
  },
};
