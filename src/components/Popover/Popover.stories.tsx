import type { Meta, StoryObj } from '@storybook/react-vite';
import { popover } from '@styled-system/recipes';
import { token } from '@styled-system/tokens';
import { useRef, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Box } from '../Box';
import { Button } from '../Button';
import { Link } from '../Link';
import { ModalBody } from '../Modal/ModalBody';
import { ModalHeader } from '../Modal/ModalHeader';
import { ModalWrapper } from '../Modal/ModalWrapper';
import { Text } from '../Text';
import { Popover, type PopoverProps } from './Popover';
import { PopoverAnchor } from './PopoverAnchor';
import { PopoverArrow } from './PopoverArrow';
import { PopoverBody } from './PopoverBody';
import { PopoverClose } from './PopoverClose';
import { PopoverContent } from './PopoverContent';
import { PopoverFooter } from './PopoverFooter';
import { PopoverHeader } from './PopoverHeader';
import { PopoverMedia } from './PopoverMedia';
import { PopoverTitle } from './PopoverTitle';
import { PopoverTrigger } from './PopoverTrigger';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
  args: {
    children: null,
    interaction: 'rich',
    size: 'md',
    showArrow: true,
    placement: 'bottom',
  },
  argTypes: {
    interaction: {
      control: 'select',
      options: ['definition', 'rich'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    tone: {
      control: 'select',
      options: ['note', 'tip', 'warning', 'important', 'caution'],
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
    },
    showArrow: { control: 'boolean' },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

// Literal recipe calls let Panda extract every swatch's styles.
const tonePanelClasses = {
  note: popover({ tone: 'note' }).content,
  tip: popover({ tone: 'tip' }).content,
  warning: popover({ tone: 'warning' }).content,
  important: popover({ tone: 'important' }).content,
  caution: popover({ tone: 'caution' }).content,
};
const sizePanelClasses = {
  sm: popover({ size: 'sm', tone: 'note' }).content,
  md: popover({ size: 'md', tone: 'note' }).content,
  lg: popover({ size: 'lg', tone: 'note' }).content,
};

/** Handbook definition note — hover or focus the dashed phrase. */
export const DefinitionNote: Story = {
  name: 'Ex: Definition note',
  args: {
    interaction: 'definition',
    tone: 'warning',
    size: 'md',
    showArrow: true,
    placement: 'bottom',
  },
  render: ({ children: _children, ...args }) => (
    <Box maxW="prose" p="32">
      <Text>
        Operators should track{' '}
        <Popover {...args}>
          <PopoverTrigger>cycle time</PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Warning</PopoverTitle>
            </PopoverHeader>
            <PopoverBody>
              Cycle time includes queue and wait, not only active work. Do not
              treat machine run time as the full cycle when estimating delivery
              commitments.
            </PopoverBody>
          </PopoverContent>
        </Popover>{' '}
        before promising a ship date.
      </Text>
    </Box>
  ),
};

type RichNoteExampleProps = Omit<PopoverProps, 'children'>;

const RichNoteExample = (props: RichNoteExampleProps) => (
  <Box maxW="prose" p="32">
    <Text>
      See the{' '}
      <Popover {...props}>
        <PopoverTrigger>setup checklist</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Tip</PopoverTitle>
            <PopoverClose />
          </PopoverHeader>
          <PopoverMedia>
            <Box
              as="img"
              src="https://placehold.co/320x120/png?text=Setup+diagram"
              alt="Setup diagram placeholder"
              w="full"
              display="block"
            />
          </PopoverMedia>
          <PopoverBody>
            Confirm tooling, material, and traveler notes before the first
            piece. Open the full checklist when onboarding a new operator.
          </PopoverBody>
          <PopoverFooter>
            <Link href="https://example.com/handbook/setup" external>
              Open handbook
            </Link>
            <Button size="sm">Got it</Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>{' '}
      before starting the job.
    </Text>
  </Box>
);

/** Handbook rich note — click the dashed phrase; focus is trapped. */
export const RichNote: Story = {
  name: 'Ex: Rich note',
  args: {
    interaction: 'rich',
    tone: 'tip',
    size: 'md',
    showArrow: true,
    placement: 'bottom',
  },
  render: ({ children: _children, ...args }) => <RichNoteExample {...args} />,
};

export const Tones: Story = {
  render: () => (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap="16"
      p="32"
    >
      {(['note', 'tip', 'warning', 'important', 'caution'] as const).map(
        (tone) => (
          <Popover key={tone} interaction="definition" tone={tone}>
            <Box className={tonePanelClasses[tone]}>
              <PopoverHeader>
                <PopoverTitle>
                  {tone.charAt(0).toUpperCase() + tone.slice(1)}
                </PopoverTitle>
              </PopoverHeader>
              <PopoverBody>
                Visual tone only — this never maps to role=&quot;alert&quot;.
              </PopoverBody>
            </Box>
          </Popover>
        ),
      )}
    </Box>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Box display="flex" flexWrap="wrap" gap="24" alignItems="flex-start" p="32">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Popover key={size} interaction="definition" tone="note" size={size}>
          <Box className={sizePanelClasses[size]}>
            <PopoverHeader>
              <PopoverTitle>Size {size}</PopoverTitle>
            </PopoverHeader>
            <PopoverBody>
              Popover panels are wider than Tooltip (max 240) so handbook notes
              can carry multi-line guidance.
            </PopoverBody>
          </Box>
        </Popover>
      ))}
    </Box>
  ),
};

/** A tall panel can use the space beside a trigger near the left edge. */
export const EdgePlacement: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Box h="4xl" display="flex" alignItems="center" p="16">
      <Popover placement="bottom">
        <PopoverTrigger>Setup notes</PopoverTrigger>
        <PopoverContent h="lg" w="280" data-testid="edge-panel">
          <PopoverHeader>
            <PopoverTitle>Room beside the trigger</PopoverTitle>
            <PopoverClose />
          </PopoverHeader>
          <PopoverBody>
            When this panel cannot fit above or below, it opens to the side.
            Resize the viewport to see the placement adapt.
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', { name: 'Setup notes' });
    await userEvent.click(trigger);
    const panel = await body.findByTestId('edge-panel');
    await waitFor(() => {
      const panelRect = panel.getBoundingClientRect();
      expect(panelRect.left).toBeGreaterThanOrEqual(
        trigger.getBoundingClientRect().right,
      );
      expect(panelRect.top).toBeGreaterThanOrEqual(0);
      expect(panelRect.bottom).toBeLessThanOrEqual(window.innerHeight);
    });
    // Keep the close control's focus tooltip out of the placement snapshot.
    // Wait for the panel's initial focus to land on the close control first,
    // or it can take focus back after the panel is focused.
    const close = within(panel).getByRole('button');
    await waitFor(() => expect(close).toHaveFocus());
    panel.focus();
    await waitFor(() => {
      expect(panel).toHaveFocus();
      expect(body.queryByRole('tooltip')).toBeNull();
    });
  },
};

export const A11yExplicitArrow: Story = {
  // Behavior-only coverage cycles through tones and an explicit fill override.
  tags: ['!dev', '!autodocs', '!snapshot'],
  render: () => (
    <Box display="flex" gap="16">
      {(['note', 'tip', 'warning', 'important', 'caution'] as const).map(
        (tone) => (
          <Popover key={tone} tone={tone} showArrow={false}>
            <PopoverTrigger>{tone}</PopoverTrigger>
            <PopoverContent>
              <PopoverTitle>{tone}</PopoverTitle>
              <PopoverClose />
              <PopoverArrow />
            </PopoverContent>
          </Popover>
        ),
      )}
      <Popover showArrow={false}>
        <PopoverTrigger>Custom fill</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Custom fill</PopoverTitle>
          <PopoverClose />
          <PopoverArrow fill={token.var('colors.bg.info')} />
        </PopoverContent>
      </Popover>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    for (const name of [
      'note',
      'tip',
      'warning',
      'important',
      'caution',
      'Custom fill',
    ]) {
      await userEvent.click(canvas.getByRole('button', { name }));
      const panel = await body.findByRole('dialog', { name });
      const arrow = panel.querySelector('svg[aria-hidden="true"]');
      expect(arrow).toHaveAttribute(
        'fill',
        token.var(
          name === 'Custom fill' ? 'colors.bg.info' : 'colors.surface.overlay',
        ),
      );
      await userEvent.click(
        within(panel).getByRole('button', { name: 'Close' }),
      );
      await waitFor(() => expect(panel).not.toBeInTheDocument());
    }
  },
};

// ============================================================================
// INTERACTION TESTS
// ============================================================================

/**
 * Rich mode: opens on click, traps Tab, closes on Escape with focus restored
 * to the trigger, and closes on outside press.
 */
export const A11yRichKeyboard: Story = {
  // Test-only: hidden from the sidebar and docs; open by URL or a test runner.
  tags: ['!dev', '!autodocs'],
  render: () => <RichNoteExample tone="tip" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', { name: 'setup checklist' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);
    const dialog = await body.findByRole('dialog', { name: 'Tip' });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-controls', dialog.id);
    await waitFor(() =>
      expect(dialog).toContainElement(document.activeElement as HTMLElement),
    );

    // Tab cycles through close, link, and button without leaving the panel.
    for (let i = 0; i < 5; i += 1) {
      await userEvent.tab();
      // Past the last control, focus lands on a Floating UI focus guard just
      // outside the panel, which sends it back to the first control a moment
      // later. Wait for it to settle.
      await waitFor(() =>
        expect(dialog).toContainElement(document.activeElement as HTMLElement),
      );
    }

    // The close button's tooltip takes the first Escape; start from a button
    // without one so a single Escape reaches the popover.
    within(dialog).getByRole('button', { name: 'Got it' }).focus();
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(body.queryByRole('dialog', { name: 'Tip' })).toBeNull(),
    );
    await waitFor(() => expect(trigger).toHaveFocus());

    // Outside press closes.
    await userEvent.click(trigger);
    await body.findByRole('dialog', { name: 'Tip' });
    await userEvent.click(canvasElement.ownerDocument.body);
    await waitFor(() =>
      expect(body.queryByRole('dialog', { name: 'Tip' })).toBeNull(),
    );
  },
};

/** Definition mode: opens on keyboard focus, describes the trigger, closes on Escape. */
export const A11yDefinitionFocus: Story = {
  // Test-only: hidden from the sidebar and docs; open by URL or a test runner.
  tags: ['!dev', '!autodocs'],
  render: () => (
    <Text>
      Track{' '}
      <Popover interaction="definition">
        <PopoverTrigger>cycle time</PopoverTrigger>
        <PopoverContent>
          <PopoverBody>Queue and wait time, not only active work.</PopoverBody>
        </PopoverContent>
      </Popover>{' '}
      daily.
    </Text>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByText('cycle time');

    await userEvent.tab();
    expect(trigger).toHaveFocus();
    const tooltip = await body.findByRole('tooltip');
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
    // No focus trap: focus stays on the trigger.
    expect(trigger).toHaveFocus();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByRole('tooltip')).toBeNull());
  },
};

const PopoverInModal = () => {
  const [open, setOpen] = useState(true);
  return (
    <ModalWrapper open={open} onOpenChange={setOpen} aria-label="Job notes">
      <ModalHeader title="Job notes" />
      <ModalBody>
        <Text>
          Review the{' '}
          <Popover>
            <PopoverTrigger>setup checklist</PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>Tip</PopoverTitle>
              </PopoverHeader>
              <PopoverBody>Confirm tooling before the first piece.</PopoverBody>
            </PopoverContent>
          </Popover>{' '}
          first.
        </Text>
      </ModalBody>
    </ModalWrapper>
  );
};

/** Content opened inside a modal paints above the modal and its scrim. */
export const A11yInsideModal: Story = {
  // Test-only: hidden from the sidebar and docs; open by URL or a test runner.
  tags: ['!dev', '!autodocs'],
  render: () => <PopoverInModal />,
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const modal = await body.findByRole('dialog', { name: 'Job notes' });

    await userEvent.click(
      within(modal).getByRole('button', { name: 'setup checklist' }),
    );
    const popover = await body.findByRole('dialog', { name: 'Tip' });
    await waitFor(() => {
      const rect = popover.getBoundingClientRect();
      const topmost = canvasElement.ownerDocument.elementFromPoint(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
      );
      expect(popover).toContainElement(topmost as HTMLElement);
    });
  },
};

const AnchorToggle = () => {
  const [showAnchor, setShowAnchor] = useState(true);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [anchorNode, setAnchorNode] = useState<HTMLElement | null>(null);
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" gap="48">
      <Button size="sm" onClick={() => setShowAnchor(false)}>
        Remove anchor
      </Button>
      <Popover interaction="definition" open onOpenChange={() => {}}>
        <PopoverTrigger>trigger</PopoverTrigger>
        {showAnchor && (
          <PopoverAnchor ref={setAnchorNode}>
            <Box p="8" mt="96" borderWidth="1" borderColor="border">
              anchor
            </Box>
          </PopoverAnchor>
        )}
        <PopoverContent ref={contentRef} data-testid="anchor-content">
          <PopoverBody>Positioned content</PopoverBody>
        </PopoverContent>
      </Popover>
      <Box data-testid="anchor-ref-attached">{String(anchorNode !== null)}</Box>
    </Box>
  );
};

/**
 * Content follows the anchor while it is mounted and returns to the trigger
 * when it unmounts. Consumer refs on both Anchor and Content do not break
 * positioning.
 */
export const A11yAnchorUnmount: Story = {
  // Test-only: hidden from the sidebar and docs; open by URL or a test runner.
  tags: ['!dev', '!autodocs'],
  render: () => <AnchorToggle />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const content = await body.findByTestId('anchor-content');
    const offset = 8;
    const tracksReference = (reference: Element) => {
      const panel = content.getBoundingClientRect();
      const target = reference.getBoundingClientRect();
      const verticalGap = Math.min(
        Math.abs(panel.top - target.bottom - offset),
        Math.abs(target.top - panel.bottom - offset),
      );
      const horizontalGap = Math.min(
        Math.abs(panel.left - target.right - offset),
        Math.abs(target.left - panel.right - offset),
      );
      const centeredBeside =
        Math.abs(
          panel.top + panel.height / 2 - target.top - target.height / 2,
        ) < 2;
      return verticalGap < 2 || (horizontalGap < 2 && centeredBeside);
    };

    // Consumer ref on PopoverAnchor still resolves to the anchor DOM node.
    expect(canvas.getByTestId('anchor-ref-attached')).toHaveTextContent('true');
    await waitFor(() =>
      expect(tracksReference(canvas.getByText('anchor'))).toBe(true),
    );

    await userEvent.click(
      canvas.getByRole('button', { name: 'Remove anchor' }),
    );
    expect(canvas.queryByText('anchor')).toBeNull();
    await waitFor(() =>
      expect(tracksReference(canvas.getByText('trigger'))).toBe(true),
    );
  },
};
