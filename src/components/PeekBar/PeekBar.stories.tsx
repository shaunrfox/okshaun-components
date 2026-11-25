import type { Meta, StoryObj } from '@storybook/react-vite';
import { VStack } from '@styled-system/jsx';
import { useState } from 'react';
import {
  expect,
  fireEvent,
  fn,
  userEvent,
  waitFor,
  within,
} from 'storybook/test';
import { Box } from '../Box';
import { Button } from '../Button';
import { Drawer, DrawerBody } from '../Drawer';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { PeekBar } from './PeekBar';

/**
 * Drawer chrome for a record opened from a list.
 *
 * - Position text, such as "Case 3 of 40", announced when it changes
 * - Previous and next, disabled at the ends of the list
 * - "Open" to go to the full page, shown when `openHref` or `onOpen` is set
 * - Close, which defaults to the parent `Drawer`'s close
 * - Keyboard: "," opens the previous record and "." the next, while focus is
 *   in the bar or its drawer
 */
const meta = {
  title: 'Components/PeekBar',
  component: PeekBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    noun: 'Case',
    index: 3,
    total: 40,
    onPrevious: fn(),
    onNext: fn(),
    openHref: '#case-3',
    onClose: fn(),
  },
  decorators: [
    (Story) => (
      <Box w="md" borderWidth="1" borderColor="border" borderRadius="8">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof PeekBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Ends: Story = {
  name: 'First and Last Record',
  render: (args) => (
    <VStack gap="0" alignItems="stretch">
      <PeekBar {...args} index={1} total={40} />
      <PeekBar {...args} index={40} total={40} />
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

export const WithoutOpen: Story = {
  name: 'Without Open',
  args: { openHref: undefined },
};

const cases = [
  { id: 'C-1041', title: 'Label printer drops the last line' },
  { id: 'C-1042', title: 'Freight quote missing on the packing slip' },
  { id: 'C-1043', title: 'Lot numbers out of order on the receiving screen' },
];

/**
 * Use case: a case opened from a list in a non-modal drawer. The bar sits
 * above the record header. Close uses the drawer's own close.
 */
export const ExCaseDrawer: Story = {
  name: 'Ex: Case Drawer',
  decorators: [(Story) => <Story />],
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(1);
    const current = cases[index - 1] ?? { id: '', title: '' };

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open case drawer</Button>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          modal={false}
          aria-label={current.id}
        >
          <PeekBar
            noun="Case"
            index={index}
            total={cases.length}
            onPrevious={() => setIndex((i) => i - 1)}
            onNext={() => setIndex((i) => i + 1)}
            openHref={`#${current.id}`}
          />
          <DrawerBody>
            <Heading level="h2" textStyle="heading.md">
              {current.id}
            </Heading>
            <Text>{current.title}</Text>
          </DrawerBody>
        </Drawer>
      </>
    );
  },
  parameters: { controls: { disable: true } },
};

export const ButtonStates: Story = {
  name: 'Test: buttons and names',
  args: { index: 1, total: 2 },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Case 1 of 2')).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'Previous case' }),
    ).toBeDisabled();

    const next = canvas.getByRole('button', { name: 'Next case' });
    await expect(next).toBeEnabled();
    await userEvent.click(next);
    await expect(args.onNext).toHaveBeenCalledOnce();

    await expect(canvas.getByRole('link', { name: 'Open' })).toHaveAttribute(
      'href',
      '#case-3',
    );

    await userEvent.click(canvas.getByRole('button', { name: 'Close drawer' }));
    await expect(args.onClose).toHaveBeenCalledOnce();
  },
};

export const KeyboardShortcuts: Story = {
  name: 'Test: comma and period shortcuts',
  args: { index: 2, total: 3 },
  render: (args) => (
    <VStack gap="8" alignItems="stretch">
      <PeekBar {...args} />
      <Box px="16" pb="8">
        <TextInput name="notes" aria-label="Notes" />
      </Box>
      <Box px="16" pb="8">
        <Button variant="standard">Outside</Button>
      </Box>
    </VStack>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole('button', { name: 'Previous case' }),
    ).toHaveAttribute('aria-keyshortcuts', ',');
    await expect(
      canvas.getByRole('button', { name: 'Next case' }),
    ).toHaveAttribute('aria-keyshortcuts', '.');

    // Focus outside the bar: the keys do nothing.
    canvas.getByRole('button', { name: 'Outside' }).focus();
    await userEvent.keyboard(',.');
    await expect(args.onPrevious).not.toHaveBeenCalled();
    await expect(args.onNext).not.toHaveBeenCalled();

    // Focus in the bar: "," is previous and "." is next.
    canvas.getByRole('button', { name: 'Close drawer' }).focus();
    await userEvent.keyboard(',');
    await expect(args.onPrevious).toHaveBeenCalledOnce();
    await userEvent.keyboard('.');
    await expect(args.onNext).toHaveBeenCalledOnce();

    // Typing in a field does not move between records.
    await userEvent.click(canvas.getByRole('textbox', { name: 'Notes' }));
    await userEvent.keyboard(',.');
    await expect(args.onPrevious).toHaveBeenCalledOnce();
    await expect(args.onNext).toHaveBeenCalledOnce();
  },
};

export const ShortcutsStopAtEnds: Story = {
  name: 'Test: shortcuts stop at the ends',
  args: { index: 1, total: 1 },
  play: async ({ args, canvasElement }) => {
    within(canvasElement).getByRole('button', { name: 'Close drawer' }).focus();
    await userEvent.keyboard(',.');
    await expect(args.onPrevious).not.toHaveBeenCalled();
    await expect(args.onNext).not.toHaveBeenCalled();
  },
};

export const ShortcutsInDrawer: Story = {
  name: 'Test: shortcuts work anywhere in the drawer',
  // Behavior test only. The open drawer adds nothing to look at.
  tags: ['!snapshot'],
  args: { onClose: undefined },
  render: (args) => (
    <Drawer open onOpenChange={() => {}} modal={false} aria-label="Case 3">
      <PeekBar {...args} />
      <DrawerBody>
        <Button variant="standard">Assign</Button>
      </DrawerBody>
    </Drawer>
  ),
  play: async ({ args }) => {
    const page = within(document.body);

    (await page.findByRole('button', { name: 'Assign' })).focus();
    await userEvent.keyboard('.');
    await expect(args.onNext).toHaveBeenCalledOnce();
  },
};

export const ShortcutsInDrawerWithRole: Story = {
  name: 'Test: shortcuts work in a drawer with its own role',
  // Behavior test only. The open drawer adds nothing to look at.
  tags: ['!snapshot'],
  args: { onClose: undefined },
  render: (args) => (
    <Drawer
      open
      onOpenChange={() => {}}
      modal={false}
      role="alertdialog"
      aria-label="Case 3"
    >
      <PeekBar {...args} />
      <DrawerBody>
        <Button variant="standard">Assign</Button>
      </DrawerBody>
    </Drawer>
  ),
  play: async ({ args }) => {
    const page = within(document.body);

    await expect(
      await page.findByRole('alertdialog', { name: 'Case 3' }),
    ).toBeInTheDocument();
    (await page.findByRole('button', { name: 'Assign' })).focus();
    await userEvent.keyboard('.');
    await expect(args.onNext).toHaveBeenCalledOnce();
  },
};

export const ShortcutsSkipPlainTextEditor: Story = {
  name: 'Test: punctuation in a plain-text editor',
  // Behavior test only. The open drawer adds nothing to look at.
  tags: ['!snapshot'],
  args: { onClose: undefined },
  render: (args) => (
    <Drawer open onOpenChange={() => {}} modal={false} aria-label="Case 3">
      <PeekBar {...args} />
      <DrawerBody>
        <Box
          contentEditable="plaintext-only"
          suppressContentEditableWarning
          role="textbox"
          aria-label="Reply"
          aria-multiline
          minH="16"
          borderWidth="1"
          borderColor="border"
        />
      </DrawerBody>
    </Drawer>
  ),
  play: async ({ args }) => {
    const page = within(document.body);
    const editor = await page.findByRole('textbox', { name: 'Reply' });
    editor.focus();

    // fireEvent returns false when a handler cancels the key, which would
    // stop the browser from inserting the character.
    await expect(fireEvent.keyDown(editor, { key: ',' })).toBe(true);
    await expect(fireEvent.keyDown(editor, { key: '.' })).toBe(true);
    await expect(args.onPrevious).not.toHaveBeenCalled();
    await expect(args.onNext).not.toHaveBeenCalled();
  },
};

export const A11yModalDrawerKeyboard: Story = {
  name: 'A11y Modal Drawer Keyboard',
  // Behavior test only. The drawer is closed when the snapshot is taken.
  tags: ['!snapshot'],
  decorators: [(Story) => <Story />],
  render: function Render(args) {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open case drawer</Button>
        <Drawer open={open} onOpenChange={setOpen} aria-label="Case 3">
          <PeekBar {...args} onClose={undefined} />
          <DrawerBody>
            <Text>Label printer drops the last line</Text>
          </DrawerBody>
        </Drawer>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', { name: 'Open case drawer' });

    // Open by keyboard. The panel takes focus, not a bar button, so no
    // tooltip opens and one Escape closes the drawer.
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    const drawer = await body.findByRole('dialog', { name: 'Case 3' });
    await waitFor(() => expect(drawer).toHaveFocus());
    await expect(body.queryByRole('tooltip')).toBeNull();
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(body.queryByRole('dialog', { name: 'Case 3' })).toBeNull(),
    );
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

export const NoCloseWithoutAction: Story = {
  name: 'Test: no close button without a close action',
  args: { onClose: undefined, openHref: undefined },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.queryByRole('button', { name: 'Close drawer' }),
    ).toBeNull();
    await expect(canvas.queryByRole('link', { name: 'Open' })).toBeNull();
  },
};
