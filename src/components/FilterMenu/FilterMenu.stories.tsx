import type { Meta, StoryObj } from '@storybook/react-vite';
import { VStack } from '@styled-system/jsx';
import { type ReactNode, useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { Avatar } from '../Avatar';
import { Box } from '../Box';
import { Text } from '../Text';
import { FilterMenu } from './FilterMenu';

import type { FilterMenuRow } from './types';
import { useFilterMenu } from './useFilterMenu';

type DemoProps = {
  /** Rows before the demo applies its own checked or selected marks. */
  rows: FilterMenuRow[];
  label: string;
  footer?: ReactNode;
  /** Multi-pick: a pick toggles a checkbox and the menu stays open. */
  multi?: boolean;
  onSelect?: (key: string) => void;
};

const MenuDemo = ({
  rows,
  label,
  footer,
  multi = false,
  onSelect,
}: DemoProps) => {
  const [input, setInput] = useState<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(true);
  const [query, setQuery] = useState('');
  const [picked, setPicked] = useState<string[]>([]);

  // The menu shows the rows it gets. Its owner narrows them by the typed
  // text: here by label and description, in the app often on the server.
  const q = query.trim().toLowerCase();
  const matches = (row: FilterMenuRow) =>
    row.type !== 'item' ||
    `${row.label} ${row.description ?? ''}`.toLowerCase().includes(q);
  const shown: FilterMenuRow[] = rows
    .filter(matches)
    .map((row) =>
      row.type !== 'item'
        ? row
        : multi
          ? { ...row, checked: picked.includes(row.key) }
          : { ...row, selected: picked.includes(row.key) },
    );
  if (q && !shown.some((row) => row.type === 'item')) {
    shown.push({ type: 'empty', label: `No match for “${query}”` });
  }

  const pick = (key: string) => {
    onSelect?.(key);
    if (multi) {
      setPicked((p) =>
        p.includes(key) ? p.filter((k) => k !== key) : [...p, key],
      );
    } else {
      setPicked([key]);
      setOpen(false);
    }
  };

  const menu = useFilterMenu({
    rows: shown,
    open,
    onSelect: pick,
    onClose: () => setOpen(false),
    spaceSelects: multi && query === '',
  });

  return (
    <VStack alignItems="start" gap="8" minH="sm">
      <Box
        as="input"
        ref={setInput}
        {...menu.inputProps}
        aria-label="Filter or search"
        placeholder="Filter or search…"
        value={query}
        onChange={(event: { target: { value: string } }) => {
          setQuery(event.target.value);
          menu.setActiveKey(null);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        w="xs"
        h="32"
        px="8"
        borderWidth="1"
        borderStyle="solid"
        borderColor="border"
        borderRadius="4"
        bg="surface"
        color="text"
        fontFamily="sans"
        fontSize="14"
      />
      <Text textStyle="body.sm" color="text.subtlest" data-testid="picked">
        {`Picked: ${picked.join(', ') || 'none'}`}
      </Text>
      <FilterMenu
        {...menu.menuProps}
        anchor={input}
        aria-label={label}
        query={query}
        footer={footer}
      />
    </VStack>
  );
};

const FIELDS: FilterMenuRow[] = [
  { type: 'group', label: 'Fields' },
  { type: 'item', key: 'caseNo', label: 'Case #', detail: 'number' },
  { type: 'item', key: 'caseType', label: 'Case Type', detail: 'list' },
  { type: 'item', key: 'customer', label: 'Customer', detail: 'lookup' },
  { type: 'item', key: 'stage', label: 'Stage', detail: 'list' },
  { type: 'item', key: 'assignedTo', label: 'Assigned To', detail: 'person' },
  { type: 'item', key: 'enteredOn', label: 'Entered On', detail: 'date' },
];

const STAGES: FilterMenuRow[] = [
  { type: 'group', label: 'Stage is any of' },
  { type: 'item', key: 'open', label: 'Open' },
  { type: 'item', key: 'inProgress', label: 'In progress' },
  { type: 'item', key: 'waiting', label: 'Waiting on customer' },
  { type: 'item', key: 'archived', label: 'Archived', disabled: true },
  { type: 'item', key: 'closed', label: 'Closed' },
];

const RESOLUTIONS: FilterMenuRow[] = [
  { type: 'group', label: 'Resolution is' },
  { type: 'item', key: '@open', label: 'All open', detail: 'current' },
  { type: 'item', key: '@closed', label: 'All closed' },
  { type: 'group', label: 'Each resolution' },
  { type: 'item', key: 'unresolved', label: 'Unresolved' },
  { type: 'item', key: 'fixed', label: 'Fixed' },
  { type: 'item', key: 'wontFix', label: 'Will not fix' },
];

const CUSTOMERS: FilterMenuRow[] = [
  { type: 'group', label: 'Customer is' },
  {
    type: 'item',
    key: 'c-1042',
    label: '1042',
    description: 'Northwind Traders',
    detail: 'Austin, TX',
  },
  {
    type: 'item',
    key: 'c-2210',
    label: '2210',
    description: 'Contoso Fabrication',
    detail: 'Dallas, TX',
  },
  {
    type: 'item',
    key: 'c-3307',
    label: '3307',
    description: 'Northwind Fabrication and Assembly Services',
    detail: 'Reno, NV',
  },
];

const DATES: FilterMenuRow[] = [
  { type: 'group', label: 'Entered On is between' },
  {
    type: 'item',
    key: 'last7',
    label: 'Last 7 days',
    detail: 'Jan 8 – Jan 14',
  },
  {
    type: 'item',
    key: 'thisMonth',
    label: 'This month',
    detail: 'Jan 1 – Jan 31',
  },
  {
    type: 'item',
    key: 'lastMonth',
    label: 'Last month',
    detail: 'Dec 1 – Dec 31',
  },
];

const meta = {
  title: 'Components/FilterMenu',
  component: MenuDemo,
  tags: ['autodocs'],
  argTypes: {
    rows: { control: false },
  },
  args: {
    rows: FIELDS,
    label: 'Fields',
    footer: 'Enter picks · Esc cancels',
    onSelect: fn(),
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof MenuDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(document.body);
    const input = canvas.getByRole('combobox', { name: 'Filter or search' });
    const option = (name: string) => screen.getByRole('option', { name });
    const active = () =>
      document.getElementById(
        input.getAttribute('aria-activedescendant') ?? '',
      );

    const listbox = await screen.findByRole('listbox', { name: 'Fields' });
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(input).toHaveAttribute('aria-controls', listbox.id);
    expect(screen.getByRole('group', { name: 'Fields' })).toBeVisible();

    // The first row starts active. The arrows move, and wrap at the ends.
    input.focus();
    await waitFor(() => expect(input).toHaveFocus());
    expect(active()).toBe(option('Case # number'));
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => expect(active()).toBe(option('Case Type list')));
    await userEvent.keyboard('{ArrowUp}{ArrowUp}');
    await waitFor(() => expect(active()).toBe(option('Entered On date')));

    // The pointer moves the same highlight.
    await userEvent.hover(option('Stage list'));
    await waitFor(() => expect(active()).toBe(option('Stage list')));

    // Enter picks the active row and closes the single-pick menu.
    await userEvent.keyboard('{Enter}');
    expect(args.onSelect).toHaveBeenCalledWith('stage');
    await waitFor(() =>
      expect(input).toHaveAttribute('aria-expanded', 'false'),
    );
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(input).toHaveFocus();

    // Focus again reopens the menu for the visual snapshot.
    input.blur();
    input.focus();
    await screen.findByRole('listbox');
  },
};

export const MultiPick: Story = {
  args: {
    rows: STAGES,
    label: 'Stage values',
    multi: true,
    footer: 'Space or Enter toggles · Esc closes',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(document.body);
    const input = canvas.getByRole('combobox', { name: 'Filter or search' });
    const option = (name: string) => screen.getByRole('option', { name });

    const listbox = await screen.findByRole('listbox', {
      name: 'Stage values',
    });
    expect(listbox).toHaveAttribute('aria-multiselectable', 'true');

    // Space toggles the active row. The menu stays open.
    input.focus();
    await waitFor(() => expect(input).toHaveFocus());
    await userEvent.keyboard(' ');
    await waitFor(() =>
      expect(option('Open')).toHaveAttribute('aria-selected', 'true'),
    );
    expect(input).toHaveValue('');

    // A click toggles too, and focus stays in the input.
    await userEvent.click(option('In progress'));
    await waitFor(() =>
      expect(option('In progress')).toHaveAttribute('aria-selected', 'true'),
    );
    expect(input).toHaveFocus();

    // The arrows skip a disabled row.
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard(' ');
    await waitFor(() =>
      expect(option('Closed')).toHaveAttribute('aria-selected', 'true'),
    );
    expect(args.onSelect).not.toHaveBeenCalledWith('archived');
    expect(canvas.getByTestId('picked')).toHaveTextContent(
      'Picked: open, inProgress, closed',
    );

    // Esc closes the menu.
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument(),
    );

    // Focus again reopens the menu for the visual snapshot.
    input.blur();
    input.focus();
    await screen.findByRole('listbox');
  },
};

export const SinglePickWithGroups: Story = {
  args: {
    rows: RESOLUTIONS,
    label: 'Resolution values',
  },
  play: async () => {
    const screen = within(document.body);
    await screen.findByRole('listbox', { name: 'Resolution values' });
    expect(screen.getByRole('group', { name: 'Resolution is' })).toBeVisible();
    expect(
      screen.getByRole('group', { name: 'Each resolution' }),
    ).toBeVisible();
    // Single-pick rows have no checkboxes.
    expect(screen.queryByRole('listbox')).not.toHaveAttribute(
      'aria-multiselectable',
    );
  },
};

export const Descriptions: Story = {
  args: {
    rows: CUSTOMERS,
    label: 'Customers',
    footer: 'Type to find · Enter picks · Esc cancels',
  },
};

export const DateRanges: Story = {
  args: {
    rows: DATES,
    label: 'Date ranges',
  },
};

const PEOPLE: FilterMenuRow[] = [
  { type: 'group', label: 'Assigned To is any of' },
  ...['Ada Lovelace', 'Katherine Johnson', 'Grace Hopper', 'Alan Turing'].map(
    (name): FilterMenuRow => ({
      type: 'item',
      key: name,
      label: name,
      before: <Avatar name={name} size="md" />,
    }),
  ),
];

export const BeforeContent: Story = {
  args: {
    rows: PEOPLE,
    label: 'People',
    multi: true,
    footer: 'Space or Enter toggles · Esc closes',
  },
  play: async () => {
    const screen = within(document.body);
    const option = await screen.findByRole('option', { name: /Ada Lovelace/ });
    // The checkbox and the avatar both sit before the label.
    expect(option.querySelector('[data-ds-component="Avatar"]')).not.toBeNull();
    expect(option).toHaveAttribute('aria-selected', 'false');
  },
};

export const ExTypeToNarrow: Story = {
  name: 'Ex: Type to narrow',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(document.body);
    const input = canvas.getByRole('combobox', { name: 'Filter or search' });

    await userEvent.type(input, 'ent');
    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(1));
    expect(
      screen.getByRole('option', { name: 'Entered On date' }),
    ).toBeVisible();

    await userEvent.type(input, 'xyz');
    expect(await screen.findByText('No match for “entxyz”')).toBeVisible();

    // Clear the text for the visual snapshot.
    await userEvent.clear(input);
    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(6));
  },
};
