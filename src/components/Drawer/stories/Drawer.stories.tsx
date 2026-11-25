import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex, HStack, VStack } from '@styled-system/jsx';
import { useId, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Box } from '../../Box';
import { Button } from '../../Button';
import { FormField } from '../../FormField';
import { Heading } from '../../Heading';
import { IconButton } from '../../IconButton';
import { ModalBody } from '../../Modal/ModalBody';
import { ModalFooter } from '../../Modal/ModalFooter';
import { ModalHeader } from '../../Modal/ModalHeader';
import { ModalWrapper } from '../../Modal/ModalWrapper';
import { Select, SelectOption } from '../../Select';
import { Text } from '../../Text';
import { TextInput } from '../../TextInput';
import { Drawer, type DrawerProps } from '../Drawer';
import { DrawerBody } from '../DrawerBody';
import { useDrawerContext } from '../DrawerContext';
import { DrawerFooter } from '../DrawerFooter';
import { DrawerHeader } from '../DrawerHeader';

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    modal: {
      control: 'boolean',
      description:
        'Scrim, focus trap, scroll lock and outside-press close. Set false for a panel beside a list.',
      table: { defaultValue: { summary: 'true' } },
    },
    side: {
      control: 'select',
      options: ['right', 'left'],
      table: { defaultValue: { summary: 'right' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      table: { defaultValue: { summary: 'md' } },
    },
    preventOutsideClose: {
      control: 'boolean',
      description: 'Modal only: an outside press does not close the drawer',
    },
  },
  args: {
    open: false,
    onOpenChange: () => {},
    children: null,
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

type DemoArgs = Pick<
  DrawerProps,
  'modal' | 'side' | 'size' | 'preventOutsideClose'
>;

const FiltersDrawer = (props: DemoArgs & { label?: string }) => {
  const { label = 'Open drawer', ...drawerArgs } = props;
  const [open, setOpen] = useState(false);
  const titleId = useId();

  return (
    <Box p="24">
      <Button onClick={() => setOpen(true)}>{label}</Button>
      <Drawer
        {...drawerArgs}
        open={open}
        onOpenChange={setOpen}
        aria-labelledby={titleId}
      >
        <DrawerHeader title="Filters" titleId={titleId} />
        <DrawerBody>
          <FormField label="Customer" labelFor="drawer-customer">
            <TextInput
              id="drawer-customer"
              name="customer"
              placeholder="Any customer"
            />
          </FormField>
          <FormField label="Stage" labelFor="drawer-stage">
            <Select id="drawer-stage" name="stage" placeholder="Any stage">
              <SelectOption value="new" label="New" />
              <SelectOption value="assigned" label="Assigned" />
              <SelectOption value="resolved" label="Resolved" />
            </Select>
          </FormField>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Apply
          </Button>
        </DrawerFooter>
      </Drawer>
    </Box>
  );
};

// ============================================================================
// DEFAULT — modal
// ============================================================================

export const Default: Story = {
  render: (args) => (
    <FiltersDrawer
      modal={args.modal}
      side={args.side}
      size={args.size}
      preventOutsideClose={args.preventOutsideClose}
    />
  ),
};

/** Modal keyboard and focus behavior. Kept out of `Default` so the demo does not animate on load. */
export const A11yModalKeyboard: Story = {
  // Test-only: hidden from the sidebar and docs; open by URL or a test runner.
  tags: ['!dev', '!autodocs'],
  render: () => <FiltersDrawer />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', { name: 'Open drawer' });

    // Open by keyboard: the close button's tooltip opens on keyboard focus.
    // The panel takes focus instead, so no tooltip opens and one Escape closes
    // the drawer. Focus returns to the trigger.
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    const drawer = await body.findByRole('dialog', { name: 'Filters' });
    expect(drawer).toHaveAttribute('aria-modal', 'true');
    await waitFor(() => expect(drawer).toHaveFocus());
    expect(body.queryByRole('tooltip')).toBeNull();
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(body.queryByRole('dialog', { name: 'Filters' })).toBeNull(),
    );
    await waitFor(() => expect(trigger).toHaveFocus());

    // Tab stays inside a modal drawer.
    await userEvent.click(trigger);
    const reopened = await body.findByRole('dialog', { name: 'Filters' });
    // Focus moves in a tick after the drawer mounts; tab only once it has.
    await waitFor(() =>
      expect(reopened).toContainElement(document.activeElement as HTMLElement),
    );
    for (let i = 0; i < 8; i += 1) {
      await userEvent.tab();
      // Past the last control, focus lands on a Floating UI focus guard just
      // outside the panel, which sends it back to the first control a moment
      // later. Wait for it to settle.
      await waitFor(() =>
        expect(reopened).toContainElement(
          document.activeElement as HTMLElement,
        ),
      );
    }
    await userEvent.click(body.getByRole('button', { name: 'Cancel' }));
    await waitFor(() =>
      expect(body.queryByRole('dialog', { name: 'Filters' })).toBeNull(),
    );
  },
};

// ============================================================================
// SIDES AND SIZES
// ============================================================================

export const Sides: Story = {
  render: () => (
    <HStack gap="12">
      <FiltersDrawer side="left" label="Open left" />
      <FiltersDrawer side="right" label="Open right" />
    </HStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="12" flexWrap="wrap">
      <FiltersDrawer size="sm" label="Small" />
      <FiltersDrawer size="md" label="Medium" />
      <FiltersDrawer size="lg" label="Large" />
      <FiltersDrawer size="xl" label="Extra large" />
      <FiltersDrawer size="full" label="Full width" />
    </Flex>
  ),
};

export const PreventOutsideClose: Story = {
  render: () => <FiltersDrawer preventOutsideClose />,
};

const CloseRequestCounter = () => {
  const [open, setOpen] = useState(false);
  const [closeRequests, setCloseRequests] = useState(0);
  const titleId = useId();

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setCloseRequests((count) => count + 1);
    }
    setOpen(next);
  };

  return (
    <Box p="24">
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Text>{`Close requests: ${closeRequests}`}</Text>
      <Drawer
        open={open}
        onOpenChange={handleOpenChange}
        aria-labelledby={titleId}
      >
        <DrawerHeader title="Close requests" titleId={titleId} />
        <DrawerBody>
          <Text>Click the scrim or the close button.</Text>
        </DrawerBody>
      </Drawer>
    </Box>
  );
};

/**
 * One scrim click or close-button click calls `onOpenChange(false)` once. The
 * panel and scrim stay mounted for the exit animation, so a repeat press
 * during it must not request close again.
 */
export const A11ySingleCloseRequest: Story = {
  // Test-only: hidden from the sidebar and docs; open by URL or a test runner.
  tags: ['!dev', '!autodocs'],
  render: () => <CloseRequestCounter />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', { name: 'Open drawer' });

    // Scrim: pointerdown and click arrive from one press.
    await userEvent.click(trigger);
    const drawer = await body.findByRole('dialog', { name: 'Close requests' });
    const scrim = drawer.parentElement?.querySelector<HTMLElement>(
      '[class*="drawer__overlay"]',
    );
    expect(scrim).toBeTruthy();
    await userEvent.click(scrim as HTMLElement);
    // A second press while the scrim is still fading out.
    if (scrim?.isConnected) {
      await userEvent.click(scrim);
    }
    await waitFor(() =>
      expect(body.queryByRole('dialog', { name: 'Close requests' })).toBeNull(),
    );
    expect(canvas.getByText('Close requests: 1')).toBeVisible();

    // Close button: a second click lands during the exit animation.
    await userEvent.click(trigger);
    const reopened = await body.findByRole('dialog', {
      name: 'Close requests',
    });
    const closeButton = within(reopened).getByRole('button', {
      name: 'Close drawer',
    });
    await userEvent.click(closeButton);
    if (closeButton.isConnected) {
      await userEvent.click(closeButton);
    }
    await waitFor(() =>
      expect(body.queryByRole('dialog', { name: 'Close requests' })).toBeNull(),
    );
    expect(canvas.getByText('Close requests: 2')).toBeVisible();
  },
};

// ============================================================================
// SCROLLING
// ============================================================================

const paragraphs = Array.from({ length: 30 }, (_, i) => i + 1);

export const LongContent: Story = {
  render: () => {
    const Component = () => {
      const [open, setOpen] = useState(false);
      return (
        <Box p="24">
          <Button onClick={() => setOpen(true)}>Open long drawer</Button>
          <Drawer open={open} onOpenChange={setOpen} aria-label="Release notes">
            <DrawerHeader title="Release notes" />
            <DrawerBody>
              {paragraphs.map((n) => (
                <Text key={n}>
                  Note {n}. The header and footer stay fixed while this body
                  scrolls.
                </Text>
              ))}
            </DrawerBody>
            <DrawerFooter>
              <Button onClick={() => setOpen(false)}>Done</Button>
            </DrawerFooter>
          </Drawer>
        </Box>
      );
    };
    return <Component />;
  },
};

export const SeparateScrollRegions: Story = {
  render: () => {
    const Component = () => {
      const [open, setOpen] = useState(false);
      return (
        <Box p="24">
          <Button onClick={() => setOpen(true)}>Open two-region drawer</Button>
          <Drawer
            open={open}
            onOpenChange={setOpen}
            size="xl"
            aria-label="Case detail"
          >
            <DrawerHeader title="Case detail" />
            <DrawerBody scrollable={false} p="0" gap="0">
              <Flex flex="1" minH="0">
                <VStack
                  flex="1"
                  minW="0"
                  overflowY="auto"
                  alignItems="stretch"
                  gap="12"
                  p="20"
                >
                  {paragraphs.map((n) => (
                    <Text key={n}>Thread message {n}</Text>
                  ))}
                </VStack>
                <VStack
                  w="xs"
                  flexShrink="0"
                  overflowY="auto"
                  alignItems="stretch"
                  gap="12"
                  p="20"
                  borderLeft="default"
                  bg="surface.sunken"
                >
                  {paragraphs.map((n) => (
                    <Text key={n}>Rail item {n}</Text>
                  ))}
                </VStack>
              </Flex>
            </DrawerBody>
          </Drawer>
        </Box>
      );
    };
    return <Component />;
  },
};

// ============================================================================
// STACKING
// ============================================================================

const renderModalFromDrawer: Story['render'] = () => {
  const Component = () => {
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    return (
      <Box p="24">
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer open={open} onOpenChange={setOpen} aria-label="Case actions">
          <DrawerHeader title="Case actions" />
          <DrawerBody>
            <Button variant="danger" onClick={() => setConfirmOpen(true)}>
              Delete case
            </Button>
          </DrawerBody>
        </Drawer>
        <ModalWrapper
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          size="sm"
          aria-label="Delete case"
        >
          <ModalHeader title="Delete case?" />
          <ModalBody>
            <Text>This cannot be undone.</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setConfirmOpen(false)}>
              Delete
            </Button>
          </ModalFooter>
        </ModalWrapper>
      </Box>
    );
  };
  return <Component />;
};

export const ModalFromDrawer: Story = {
  render: renderModalFromDrawer,
};

/** A modal opened from a drawer paints above it. */
export const A11yModalFromDrawerStacking: Story = {
  // Test-only: hidden from the sidebar and docs; open by URL or a test runner.
  tags: ['!dev', '!autodocs'],
  render: renderModalFromDrawer,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByRole('button', { name: 'Open drawer' }));
    await userEvent.click(
      await body.findByRole('button', { name: 'Delete case' }),
    );
    const modal = await body.findByRole('dialog', { name: 'Delete case' });
    // The modal hides everything behind it from assistive tech, the drawer too.
    const drawer = body.getByRole('dialog', {
      name: 'Case actions',
      hidden: true,
    });

    // The modal paints above the drawer. Check what is actually on top where
    // the two overlap, not DOM order: z-index decides before DOM order does.
    const m = modal.getBoundingClientRect();
    const d = drawer.getBoundingClientRect();
    const left = Math.max(m.left, d.left);
    const right = Math.min(m.right, d.right);
    const x = left < right ? (left + right) / 2 : m.left + m.width / 2;
    const y = m.top + m.height / 2;
    const topmost = canvasElement.ownerDocument.elementFromPoint(x, y);
    expect(modal).toContainElement(topmost as HTMLElement);

    await userEvent.click(
      within(modal).getByRole('button', { name: 'Cancel' }),
    );
    await waitFor(() =>
      expect(body.queryByRole('dialog', { name: 'Delete case' })).toBeNull(),
    );
    expect(body.getByRole('dialog', { name: 'Case actions' })).toBeVisible();
  },
};

/** Returns the z-index of the nearest ancestor that sets one. */
const stackingZIndex = (element: HTMLElement) => {
  let node: HTMLElement | null = element;
  while (node) {
    const { zIndex } = getComputedStyle(node);
    if (zIndex !== 'auto') return Number(zIndex);
    node = node.parentElement;
  }
  return 0;
};

/** A select inside a drawer opens above it, and Escape closes the select first. */
export const A11ySelectInsideDrawer: Story = {
  // Test-only: hidden from the sidebar and docs; open by URL or a test runner.
  tags: ['!dev', '!autodocs'],
  render: () => <FiltersDrawer />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByRole('button', { name: 'Open drawer' }));
    const drawer = await body.findByRole('dialog', { name: 'Filters' });
    await userEvent.click(
      within(drawer).getByRole('combobox', { name: 'Stage' }),
    );
    const listbox = await body.findByRole('listbox');

    expect(stackingZIndex(listbox)).toBeGreaterThan(
      Number(getComputedStyle(drawer).zIndex),
    );

    // Escape closes the listbox first; the drawer stays open.
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByRole('listbox')).toBeNull());
    expect(body.getByRole('dialog', { name: 'Filters' })).toBeVisible();
  },
};

// ============================================================================
// EX: CASE LIST — non-modal drawer beside a list
// ============================================================================

const cases = [
  { id: 42101, title: 'Invoice totals do not match the PDF' },
  { id: 42102, title: 'Cannot receive a partial purchase order' },
  { id: 42103, title: 'Label printer skips every other label' },
  { id: 42104, title: 'Work order status stuck on Released' },
  { id: 42105, title: 'Customer portal login loops' },
];

const CaseDrawerHeader = (props: {
  index: number;
  total: number;
  onMove: (delta: number) => void;
}) => {
  const { index, total, onMove } = props;
  const { onClose } = useDrawerContext();

  return (
    <DrawerHeader>
      <Text mr="auto">
        Case {index + 1} of {total}
      </Text>
      <HStack gap="4">
        <IconButton
          variant="ghost"
          iconName="arrow-left"
          altText="Previous case"
          aria-label="Previous case"
          disabled={index === 0}
          onClick={() => onMove(-1)}
        />
        <IconButton
          variant="ghost"
          iconName="arrow-right"
          altText="Next case"
          aria-label="Next case"
          disabled={index === total - 1}
          onClick={() => onMove(1)}
        />
        <IconButton
          variant="ghost"
          iconName="x"
          altText="Close drawer"
          aria-label="Close drawer"
          onClick={onClose}
        />
      </HStack>
    </DrawerHeader>
  );
};

const renderCaseList: Story['render'] = () => {
  const Component = () => {
    const [selected, setSelected] = useState<number | null>(null);
    const current = selected === null ? null : cases[selected];

    return (
      <Box p="24">
        <Heading level="h2" mb="12">
          Cases
        </Heading>
        <VStack alignItems="stretch" gap="4" maxW="xl">
          {cases.map((c, i) => (
            <Button
              key={c.id}
              variant={i === selected ? 'primary' : 'ghost'}
              onClick={() => setSelected(i)}
            >
              {c.id} · {c.title}
            </Button>
          ))}
        </VStack>
        <Drawer
          open={selected !== null}
          onOpenChange={(open) => {
            if (!open) setSelected(null);
          }}
          modal={false}
          size="lg"
          aria-label="Case detail"
        >
          {current && selected !== null && (
            <>
              <CaseDrawerHeader
                index={selected}
                total={cases.length}
                onMove={(delta) => setSelected(selected + delta)}
              />
              <DrawerBody>
                <Heading level="h3">{current.title}</Heading>
                <Text>Case {current.id}</Text>
              </DrawerBody>
            </>
          )}
        </Drawer>
      </Box>
    );
  };
  return <Component />;
};

export const ExCaseList: Story = {
  name: 'Ex: Case list (non-modal)',
  render: renderCaseList,
};

/** Non-modal behavior on the case list. Kept out of the example so it does not animate on load. */
export const A11yNonModalCaseList: Story = {
  // Test-only: hidden from the sidebar and docs; open by URL or a test runner.
  tags: ['!dev', '!autodocs'],
  render: renderCaseList,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const firstRow = canvas.getByRole('button', { name: /42101/ });

    await userEvent.click(firstRow);
    const drawer = await body.findByRole('dialog', { name: 'Case detail' });
    expect(drawer).not.toHaveAttribute('aria-modal');
    expect(within(drawer).getByText('Case 1 of 5')).toBeVisible();
    // A non-modal drawer focuses its own panel, not the close button.
    await waitFor(() => expect(drawer).toHaveFocus());

    // No scrim: a click on another row swaps the case and keeps the drawer open.
    await userEvent.click(canvas.getByRole('button', { name: /42103/ }));
    await waitFor(() =>
      expect(within(drawer).getByText('Case 3 of 5')).toBeVisible(),
    );
    expect(body.getByRole('dialog', { name: 'Case detail' })).toBe(drawer);
    expect(drawer).toHaveAttribute('data-state', 'open');

    // Escape with focus outside the drawer does nothing.
    canvas.getByRole('button', { name: /42103/ }).focus();
    await userEvent.keyboard('{Escape}');
    expect(body.getByRole('dialog', { name: 'Case detail' })).toBeVisible();

    // Next inside the drawer, then Escape with focus inside closes it.
    await userEvent.click(
      within(drawer).getByRole('button', { name: 'Next case' }),
    );
    await waitFor(() =>
      expect(within(drawer).getByText('Case 4 of 5')).toBeVisible(),
    );
    // The focused Next button shows a tooltip; the first Escape closes only
    // the tooltip, the second closes the drawer.
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByRole('tooltip')).toBeNull());
    expect(body.getByRole('dialog', { name: 'Case detail' })).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(body.queryByRole('dialog', { name: 'Case detail' })).toBeNull(),
    );
  },
};

const ConsumerHandlersDrawer = () => {
  const [open, setOpen] = useState(false);
  const [keyDowns, setKeyDowns] = useState(0);
  const [refTarget, setRefTarget] = useState('none');

  return (
    <Box p="24">
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Text>{`Consumer key downs: ${keyDowns}`}</Text>
      <Text>{`Consumer ref: ${refTarget}`}</Text>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        modal={false}
        aria-label="Consumer handlers"
        ref={(node: HTMLDivElement | null) => {
          if (node) setRefTarget(node.getAttribute('role') ?? 'unknown');
        }}
        onKeyDown={() => setKeyDowns((count) => count + 1)}
      >
        <DrawerBody>
          <Text>Press Escape to close.</Text>
        </DrawerBody>
      </Drawer>
    </Box>
  );
};

/**
 * A consumer `ref` and `onKeyDown` add to the drawer's own wiring instead of
 * replacing it: the panel still takes initial focus and Escape still closes a
 * non-modal drawer.
 */
export const A11yConsumerRefAndKeyDown: Story = {
  // Test-only: hidden from the sidebar and docs; open by URL or a test runner.
  tags: ['!dev', '!autodocs'],
  render: () => <ConsumerHandlersDrawer />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByRole('button', { name: 'Open drawer' }));
    const drawer = await body.findByRole('dialog', {
      name: 'Consumer handlers',
    });
    expect(canvas.getByText('Consumer ref: dialog')).toBeVisible();
    // Initial focus needs the internal panel ref.
    await waitFor(() => expect(drawer).toHaveFocus());

    await userEvent.keyboard('{Escape}');
    expect(canvas.getByText('Consumer key downs: 1')).toBeVisible();
    await waitFor(() =>
      expect(
        body.queryByRole('dialog', { name: 'Consumer handlers' }),
      ).toBeNull(),
    );
  },
};
