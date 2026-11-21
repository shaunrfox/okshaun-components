import type { Meta, StoryObj } from '@storybook/react-vite';
import { HStack, VStack } from '@styled-system/jsx';
import { type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { LocaleProvider } from '~/system/context';
import { Box } from '../Box';
import { Button } from '../Button';
import { FilterMenu, type FilterMenuRow } from '../FilterMenu';
import { useFilterMenu } from '../FilterMenu/useFilterMenu';
import type { FilterTokenState } from '../FilterToken';
import { Text } from '../Text';
import {
  FilterField,
  type FilterFieldProps,
  type FilterFieldToken,
} from './FilterField';

type DemoFilter = {
  id: string;
  field: string;
  operator: string;
  value: string | string[];
  state?: FilterTokenState;
  locked?: boolean;
};

const CASE_FILTERS: DemoFilter[] = [
  {
    id: 'resolution',
    field: 'Resolution',
    operator: 'is',
    value: 'All open',
    locked: true,
  },
  {
    id: 'stage',
    field: 'Stage',
    operator: 'is any of',
    value: ['Open', 'In progress'],
  },
  {
    id: 'entered',
    field: 'Entered On',
    operator: 'is on or after',
    value: 'Sep 1, 2026',
  },
];

const MANY_FILTERS: DemoFilter[] = [
  ...CASE_FILTERS,
  {
    id: 'assigned',
    field: 'Assigned To',
    operator: 'is any of',
    value: ['Ada Lovelace', 'Katherine Johnson'],
    state: 'pending',
  },
  { id: 'type', field: 'Case Type', operator: 'is', value: 'Warranty' },
  { id: 'customer', field: 'Customer', operator: 'is', value: 'Acme Corp' },
];

type DemoProps = Partial<FilterFieldProps> & {
  initial?: DemoFilter[];
  width?: FilterFieldProps['w'];
};

/** Holds the filters and the typed text, as the app does. */
const FieldDemo = ({
  initial = CASE_FILTERS,
  width = 'full',
  shortcut = '/',
  ...fieldProps
}: DemoProps) => {
  const [filters, setFilters] = useState(initial);
  const [text, setText] = useState('');
  const remove = (id: string) =>
    setFilters((current) => current.filter((f) => f.id !== id));

  return (
    <VStack alignItems="start" gap="12">
      <FilterField
        w={width}
        tokens={filters.map((f) => ({
          key: f.id,
          field: f.field,
          operator: f.operator,
          value: f.value,
          state: f.state,
          operatorLocked: f.locked,
          onRemove: () => remove(f.id),
        }))}
        inputValue={text}
        onInputChange={setText}
        placeholder="Filter or search…"
        shortcut={shortcut}
        onClearAll={() => {
          setFilters([]);
          setText('');
        }}
        {...fieldProps}
      />
      <Button size="sm" variant="ghost" onClick={() => setFilters(initial)}>
        Reset
      </Button>
    </VStack>
  );
};

const meta = {
  title: 'Components/FilterField',
  component: FilterField,
  parameters: {
    layout: 'padded',
  },
  args: {
    tokens: [],
    inputValue: '',
    onInputChange: fn(),
    onClearAll: fn(),
    onMoreClick: fn(),
    shortcut: '/',
  },
  render: (args) => (
    <FieldDemo
      shortcut={args.shortcut}
      disabled={args.disabled}
      onMoreClick={args.onMoreClick}
    />
  ),
} satisfies Meta<typeof FilterField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'Filter or search' });

    expect(
      canvas.getByRole('group', { name: 'Stage is any of Open, In progress' }),
    ).toBeVisible();
    expect(input).toHaveAttribute('aria-keyshortcuts', '/');

    // Typed text stays in the input.
    await userEvent.click(input);
    await userEvent.type(input, 'acme');
    expect(input).toHaveValue('acme');

    // The clear button removes every token and the text.
    await userEvent.click(
      canvas.getByRole('button', { name: 'Clear all filters' }),
    );
    await waitFor(() => expect(canvas.queryAllByRole('group')).toHaveLength(0));
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();

    await userEvent.click(canvas.getByRole('button', { name: 'Reset' }));
    await waitFor(() => expect(canvas.getAllByRole('group')).toHaveLength(3));
  },
};

export const Empty: Story = {
  render: (args) => <FieldDemo initial={[]} shortcut={args.shortcut} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // With no token and no text, there is nothing to clear.
    expect(
      canvas.queryByRole('button', { name: 'Clear all filters' }),
    ).not.toBeInTheDocument();
    expect(canvas.getByText('/')).toBeVisible();
    expect(
      canvas.getByRole('textbox', { name: 'Filter or search' }),
    ).toHaveAttribute('placeholder', 'Filter or search…');
  },
};

// The first call's arguments of a story `fn()` spy.
const firstCall = (spy: unknown) =>
  (spy as { mock: { calls: unknown[][] } }).mock.calls[0] as [
    string[],
    HTMLElement,
  ];

export const Overflow: Story = {
  render: (args) => (
    <FieldDemo
      initial={MANY_FILTERS}
      width="2xl"
      onMoreClick={args.onMoreClick}
    />
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Tokens that do not fit go behind "+N more". The button has a dashed
    // border when a hidden token is pending.
    const more = await canvas.findByRole('button', { name: /^\+\d more$/ });
    expect(more).toHaveAttribute('data-pending');
    expect(
      canvas.getByRole('group', { name: 'Resolution is All open' }),
    ).toBeVisible();
    expect(
      canvas.queryByRole('group', { name: 'Customer is Acme Corp' }),
    ).not.toBeInTheDocument();

    // A click gives the app the hidden keys and the button, for a menu.
    await userEvent.click(more);
    expect(args.onMoreClick).toHaveBeenCalledOnce();
    const [hiddenKeys, anchor] = firstCall(args.onMoreClick);
    expect(hiddenKeys).toContain('customer');
    expect(hiddenKeys).not.toContain('resolution');
    expect(anchor).toBe(more);

    // The click focused the input. Leave the field so the hint shows.
    canvas.getByRole('textbox', { name: 'Filter or search' }).blur();
    await waitFor(() => expect(canvas.getByText('/')).toBeVisible());
  },
};

export const Focused: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'Filter or search' });

    expect(canvas.getByText('/')).toBeVisible();
    await userEvent.click(input);
    await waitFor(() => expect(input).toHaveFocus());

    // The shortcut hint hides while the field has focus.
    expect(canvas.queryByText('/')).not.toBeInTheDocument();

    // It comes back on blur, also when the input has text.
    await userEvent.type(input, 'acme');
    input.blur();
    await waitFor(() => expect(canvas.getByText('/')).toBeVisible());
    await userEvent.clear(input);
    input.blur();
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByRole('textbox', { name: 'Filter or search' }),
    ).toBeDisabled();
    expect(
      canvas.getByRole('button', { name: /^Remove filter: Stage/ }),
    ).toBeDisabled();
    expect(
      canvas.queryByRole('button', { name: 'Clear all filters' }),
    ).not.toBeInTheDocument();
    expect(canvas.queryByText('/')).not.toBeInTheDocument();
  },
};

export const Shortcut: Story = {
  render: (args) => (
    <VStack alignItems="start" gap="12">
      <Box
        as="input"
        aria-label="Notes"
        w="xs"
        h="32"
        px="8"
        borderWidth="1"
        borderStyle="solid"
        borderColor="border"
        borderRadius="4"
        bg="surface"
        color="text"
      />
      <FieldDemo shortcut={args.shortcut} />
    </VStack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'Filter or search' });
    const notes = canvas.getByRole('textbox', { name: 'Notes' });

    // "/" typed in another text field stays there.
    await userEvent.type(notes, 'a/b');
    expect(notes).toHaveValue('a/b');
    expect(input).not.toHaveFocus();

    // Anywhere else, "/" focuses the field and is not typed.
    notes.blur();
    await userEvent.keyboard('/');
    await waitFor(() => expect(input).toHaveFocus());
    expect(input).toHaveValue('');

    // Leave the field so the hint shows again.
    input.blur();
    await waitFor(() => expect(canvas.getByText('/')).toBeVisible());
  },
};

export const BackspaceRemoves: Story = {
  name: 'Backspace removes',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'Filter or search' });
    const entered = () =>
      canvas.queryByRole('group', {
        name: 'Entered On is on or after Sep 1, 2026',
      });

    await userEvent.click(input);

    // Backspace in text deletes text and arms nothing.
    await userEvent.type(input, 'a{Backspace}');
    expect(entered()).toHaveAttribute('data-state', 'applied');

    // The first Backspace arms the last token. Another key disarms it.
    await userEvent.keyboard('{Backspace}');
    await waitFor(() =>
      expect(entered()).toHaveAttribute('data-state', 'armed'),
    );
    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(() =>
      expect(entered()).toHaveAttribute('data-state', 'applied'),
    );

    // Two Backspaces in a row remove it.
    await userEvent.keyboard('{Backspace}{Backspace}');
    await waitFor(() => expect(entered()).not.toBeInTheDocument());
    expect(input).toHaveFocus();

    await userEvent.click(canvas.getByRole('button', { name: 'Reset' }));
    await waitFor(() => expect(entered()).toBeVisible());
  },
};

const EditingDemo = () => {
  const [editing, setEditing] = useState<string | null>(null);
  const [text, setText] = useState('');
  return (
    <VStack alignItems="start" gap="12">
      <FilterField
        w="full"
        tokens={CASE_FILTERS.map((f) => ({
          key: f.id,
          field: f.field,
          operator: f.operator,
          value: f.value,
          state: f.id === editing ? 'editing' : 'applied',
          operatorLocked: f.locked,
          onValueClick: () => setEditing(f.id),
        }))}
        inputValue={text}
        onInputChange={setText}
        inputProps={{
          onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Escape') setEditing(null);
          },
        }}
        placeholder="Filter or search…"
        editingKey={editing}
        shortcut="/"
      />
      <Text textStyle="body.sm" color="text.subtlest">
        Click a value to edit it in place. Esc ends the edit.
      </Text>
    </VStack>
  );
};

export const EditingInPlace: Story = {
  render: () => <EditingDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const stage = () =>
      canvas.getByRole('group', { name: 'Stage is any of Open, In progress' });

    // A click on a value moves the input into that token, with focus.
    await userEvent.click(
      canvas.getByRole('button', { name: 'Open, In progress' }),
    );
    await waitFor(() =>
      expect(stage()).toHaveAttribute('data-state', 'editing'),
    );
    const inline = within(stage()).getByRole('textbox', {
      name: 'Filter or search',
    });
    await waitFor(() => expect(inline).toHaveFocus());

    await userEvent.type(inline, 'Wai');
    expect(inline).toHaveValue('Wai');

    // Esc moves the input back to the end, and focus stays in it.
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(stage()).toHaveAttribute('data-state', 'applied'),
    );
    const input = canvas.getByRole('textbox', { name: 'Filter or search' });
    expect(within(stage()).queryByRole('textbox')).not.toBeInTheDocument();
    await waitFor(() => expect(input).toHaveFocus());

    // Leave the story at rest for the visual snapshot.
    await userEvent.clear(input);
    await userEvent.click(
      canvas.getByRole('button', { name: 'Open, In progress' }),
    );
    await waitFor(() =>
      expect(stage()).toHaveAttribute('data-state', 'editing'),
    );
  },
};

export const TranslatedLabels: Story = {
  render: () => (
    <LocaleProvider
      labels={{
        filterOrSearch: 'Filtrar o buscar',
        clearFilters: 'Quitar todos los filtros',
        moreFilters: (count) => `+${count} más`,
      }}
    >
      <FieldDemo initial={MANY_FILTERS} width="2xl" />
    </LocaleProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByRole('textbox', { name: 'Filtrar o buscar' }),
    ).toBeVisible();
    expect(
      canvas.getByRole('button', { name: 'Quitar todos los filtros' }),
    ).toBeVisible();
    expect(
      await canvas.findByRole('button', { name: /^\+\d más$/ }),
    ).toBeVisible();
  },
};

/* ---------- Ex: Add a filter ---------- */

const FIELD_VALUES: Record<string, string[]> = {
  Stage: ['Open', 'In progress', 'Waiting on customer', 'Closed'],
  'Case Type': ['Warranty', 'Repair', 'Question'],
  Priority: ['High', 'Medium', 'Low'],
};

type Mode = { type: 'closed' } | { type: 'fields' } | { type: 'values' };

const AddFilterDemo = () => {
  const [filters, setFilters] = useState<DemoFilter[]>([]);
  const [text, setText] = useState('');
  const [mode, setMode] = useState<Mode>({ type: 'closed' });
  const [editing, setEditing] = useState<string | null>(null);
  const [input, setInput] = useState<HTMLInputElement | null>(null);

  const edited = filters.find((f) => f.id === editing);
  const picked = edited && Array.isArray(edited.value) ? edited.value : [];
  const q = text.trim().toLowerCase();

  const rows: FilterMenuRow[] = [];
  if (mode.type === 'fields') {
    rows.push({ type: 'group', label: 'Fields' });
    for (const field of Object.keys(FIELD_VALUES)) {
      if (field.toLowerCase().includes(q)) {
        rows.push({ type: 'item', key: field, label: field, detail: 'list' });
      }
    }
  } else if (mode.type === 'values' && edited) {
    rows.push({ type: 'group', label: `${edited.field} is any of` });
    for (const value of FIELD_VALUES[edited.field] ?? []) {
      if (value.toLowerCase().includes(q)) {
        rows.push({
          type: 'item',
          key: value,
          label: value,
          checked: picked.includes(value),
        });
      }
    }
  }
  if (q && !rows.some((row) => row.type === 'item')) {
    rows.push({ type: 'empty', label: `No match for “${text}”` });
  }

  // Ends the edit. A filter with no value is dropped.
  const finish = () => {
    setFilters((current) =>
      current.filter((f) => f.id !== editing || f.value.length > 0),
    );
    setEditing(null);
    setMode({ type: 'closed' });
    setText('');
  };

  const editValues = (id: string) => {
    setEditing(id);
    setMode({ type: 'values' });
    setText('');
  };

  const onSelect = (key: string) => {
    if (mode.type === 'fields') {
      const id = `${key}-${filters.length}`;
      setFilters((current) => [
        ...current,
        { id, field: key, operator: 'is any of', value: [] },
      ]);
      editValues(id);
      return;
    }
    setFilters((current) =>
      current.map((f) =>
        f.id === editing
          ? {
              ...f,
              value: picked.includes(key)
                ? picked.filter((v) => v !== key)
                : [...picked, key],
            }
          : f,
      ),
    );
    setText('');
  };

  const menu = useFilterMenu({
    rows,
    open: mode.type !== 'closed',
    onSelect,
    onClose: finish,
    spaceSelects: mode.type === 'values' && text === '',
  });

  return (
    <VStack alignItems="start" gap="12" minH="sm">
      <FilterField
        w="full"
        tokens={filters.map((f) => ({
          key: f.id,
          field: f.field,
          operator: f.operator,
          value: f.value,
          state: f.id === editing ? 'editing' : 'applied',
          onValueClick: () => editValues(f.id),
          onRemove: () => {
            if (f.id === editing) finish();
            setFilters((current) => current.filter((x) => x.id !== f.id));
          },
        }))}
        inputValue={text}
        onInputChange={(value) => {
          setText(value);
          menu.setActiveKey(null);
          if (mode.type === 'closed') setMode({ type: 'fields' });
        }}
        inputRef={setInput}
        inputProps={{
          ...menu.inputProps,
          onFocus: () => {
            if (mode.type === 'closed') setMode({ type: 'fields' });
          },
          onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
            // Enter on an empty input ends a multi-pick edit.
            if (event.key === 'Enter' && mode.type === 'values' && !text) {
              event.preventDefault();
              finish();
              return;
            }
            menu.inputProps.onKeyDown(event);
          },
        }}
        placeholder="Filter or search…"
        editingKey={editing}
        shortcut="/"
        onClearAll={() => {
          setFilters([]);
          finish();
        }}
      />
      <FilterMenu
        {...menu.menuProps}
        anchor={input}
        aria-label={mode.type === 'values' ? 'Values' : 'Fields'}
        query={text}
        footer={
          mode.type === 'values'
            ? 'Space toggles · Enter done · Esc done'
            : 'Type a field · Enter picks'
        }
      />
    </VStack>
  );
};

export const ExAddAFilter: Story = {
  name: 'Ex: Add a filter',
  render: () => <AddFilterDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const input = () =>
      canvas.getByRole('combobox', { name: 'Filter or search' });

    // Typing narrows the fields. Enter starts a Stage token, and the input
    // moves into it.
    await userEvent.click(input());
    await userEvent.type(input(), 'sta');
    await body.findByRole('option', { name: /^Stage/ });
    await userEvent.keyboard('{Enter}');
    // While a combobox menu is open, Floating UI hides the rest of the page
    // from screen readers, tokens included. So token queries allow hidden.
    const stage = () =>
      canvas.getByRole('group', { name: /^Stage/, hidden: true });
    await waitFor(() =>
      expect(stage()).toHaveAttribute('data-state', 'editing'),
    );
    await waitFor(() =>
      expect(
        within(stage()).getByRole('combobox', { hidden: true }),
      ).toHaveFocus(),
    );

    // Space toggles the active value. Arrow keys move.
    await body.findByRole('option', { name: /^Open/ });
    await userEvent.keyboard(' {ArrowDown} ');
    await waitFor(() =>
      expect(stage()).toHaveAccessibleName('Stage is any of Open, In progress'),
    );

    // Enter on the empty input ends the edit. The input goes back to the end.
    await userEvent.keyboard('{Enter}');
    await waitFor(() =>
      expect(stage()).toHaveAttribute('data-state', 'applied'),
    );
    await waitFor(() => expect(input()).toHaveFocus());

    // Leave the menu open for the visual snapshot.
    await userEvent.type(input(), 'p');
    await body.findByRole('option', { name: /^Priority/ });
  },
};

/* ---------- Ex: Filter bar with Apply ---------- */

/*
 * The Phase 1 filter bar on a list backend as it is today. Each token maps to
 * one backend filter, so each field has at most one token, and only dates
 * have more than one operator. There is no "is not" or "is empty" yet.
 */

type BarKind = 'many' | 'one' | 'lookup' | 'date' | 'text';
type BarOp = 'in' | 'between' | 'onOrAfter' | 'onOrBefore' | 'contains';

type BarRecord = { name: string; description: string };

type BarField = {
  kind: BarKind;
  /** Operators. The first is the default. */
  ops: BarOp[];
  /** Values of a `many` or `one` field, in order. */
  options?: string[];
  /** Values that stand for a set, listed above the single values. */
  groups?: { value: string; label: string }[];
  /** Records of a `lookup` field. Too many to list until the person types. */
  records?: BarRecord[];
  /** A `lookup` field that takes several records and typed text. */
  multiple?: boolean;
  /** Hint in an empty `lookup` menu. */
  prompt?: string;
};

const BAR_CUSTOMERS: BarRecord[] = [
  { name: 'Acme Corp', description: 'Austin, TX' },
  { name: 'Apex Machining', description: 'Dallas, TX' },
  { name: 'Bluebird Labs', description: 'Denver, CO' },
  { name: 'Cobalt Motors', description: 'Detroit, MI' },
  { name: 'Delta Fabrication', description: 'Tulsa, OK' },
  { name: 'Evergreen Plastics', description: 'Portland, OR' },
  { name: 'Granite Controls', description: 'Austin, TX' },
  { name: 'Harbor Instruments', description: 'Seattle, WA' },
  { name: 'Ironwood Tooling', description: 'Akron, OH' },
  { name: 'Juniper Medical', description: 'Boise, ID' },
];

const BAR_PARTS: BarRecord[] = [
  { name: 'HNG-1001', description: 'Hinge, 110°, full overlay' },
  { name: 'HNG-1002', description: 'Hinge, 110°, half overlay' },
  { name: 'HNG-1010', description: 'Hinge, soft close, clip-on' },
  { name: 'PLT-2001', description: 'Mounting plate, steel' },
  { name: 'SLD-3018', description: 'Drawer slide, full extension, 18 in' },
  { name: 'SLD-3021', description: 'Drawer slide, full extension, 21 in' },
  { name: 'LEV-4001', description: 'Cabinet leveler, adjustable' },
  { name: 'SCR-5005', description: 'Screw, euro, 5 x 13 mm' },
  { name: 'KIT-6001', description: 'Install kit, base cabinet' },
  { name: 'KIT-6002', description: 'Install kit, water damage repair' },
];

const BAR_FIELDS: Record<string, BarField> = {
  Resolution: {
    kind: 'one',
    ops: ['in'],
    groups: [
      { value: '@open', label: 'All open' },
      { value: '@closed', label: 'All closed' },
    ],
    options: ['Fixed', 'Duplicate', 'Will not fix'],
  },
  Stage: {
    kind: 'many',
    ops: ['in'],
    options: ['Open', 'In progress', 'Waiting on customer', 'Closed'],
  },
  Priority: { kind: 'one', ops: ['in'], options: ['High', 'Medium', 'Low'] },
  Customer: {
    kind: 'lookup',
    ops: ['in'],
    records: BAR_CUSTOMERS,
    prompt: 'Type a customer name',
  },
  Part: {
    kind: 'lookup',
    ops: ['in'],
    records: BAR_PARTS,
    multiple: true,
    prompt: 'Type a part number or text',
  },
  Intercompany: { kind: 'one', ops: ['in'], options: ['Yes', 'No'] },
  'Entered On': { kind: 'date', ops: ['between', 'onOrAfter', 'onOrBefore'] },
  'Cust PO': { kind: 'text', ops: ['contains'] },
  Search: { kind: 'text', ops: ['contains'] },
};

/** Fields a person can pick. "Search" comes from typed text only. */
const BAR_PICKABLE = Object.keys(BAR_FIELDS).filter((f) => f !== 'Search');

const KIND_DETAIL: Record<BarKind, string> = {
  many: 'pick many',
  one: 'pick one',
  lookup: 'search',
  date: 'date',
  text: 'text',
};

const OP_TEXT: Record<Exclude<BarOp, 'in'>, string> = {
  between: 'is between',
  onOrAfter: 'is on or after',
  onOrBefore: 'is on or before',
  contains: 'contains',
};

/** Matches a lookup menu lists before "keep typing". */
const LOOKUP_LIMIT = 8;

/** "Today" for the demo, so the presets and the snapshots never change. */
const TODAY = '2026-10-20';
const THIS_YEAR = Number(TODAY.slice(0, 4));

const DATE_PRESETS = [
  { label: 'Start of this month', value: '2026-10-01' },
  { label: 'Start of last month', value: '2026-09-01' },
  { label: 'Start of the year', value: '2026-01-01' },
];

const RANGE_PRESETS: { label: string; values: [string, string] }[] = [
  { label: 'Last 7 days', values: ['2026-10-14', TODAY] },
  { label: 'Last 30 days', values: ['2026-09-21', TODAY] },
  { label: 'This month', values: ['2026-10-01', TODAY] },
  { label: 'Last month', values: ['2026-09-01', '2026-09-30'] },
  { label: 'Last quarter', values: ['2026-07-01', '2026-09-30'] },
];

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const isoParts = (iso: string) => iso.split('-').map(Number) as number[];

const formatDate = (iso: string) => {
  const [y, m, d] = isoParts(iso);
  return `${MONTHS[(m ?? 1) - 1]} ${d}, ${y}`;
};

/** "Sep 1 – 30, 2026", "Sep 14 – Oct 13, 2026", or full dates across years. */
const formatRange = (from: string, to: string) => {
  const [fy, fm, fd] = isoParts(from);
  const [ty, tm, td] = isoParts(to);
  if (fy !== ty) return `${formatDate(from)} – ${formatDate(to)}`;
  if (fm === tm) return `${MONTHS[(fm ?? 1) - 1]} ${fd} – ${td}, ${ty}`;
  return `${MONTHS[(fm ?? 1) - 1]} ${fd} – ${MONTHS[(tm ?? 1) - 1]} ${td}, ${ty}`;
};

const toIso = (y: number, m: number, d: number) =>
  m < 1 || m > 12 || d < 1 || d > 31
    ? null
    : `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

/**
 * Reads "2026-10-15", "10/15", "10/15/2026" or "Oct 15". A date with no year
 * is in this year.
 */
const parseDate = (text: string) => {
  const t = text.trim().toLowerCase();
  let m = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) return toIso(Number(m[1]), Number(m[2]), Number(m[3]));
  m = t.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?$/);
  if (m) {
    return toIso(m[3] ? Number(m[3]) : THIS_YEAR, Number(m[1]), Number(m[2]));
  }
  m = t.match(/^([a-z]{3})[a-z]*\.? (\d{1,2})(?:,? (\d{4}))?$/);
  if (m) {
    const month = MONTHS.findIndex((x) => x.toLowerCase() === m?.[1]);
    if (month >= 0) {
      return toIso(m[3] ? Number(m[3]) : THIS_YEAR, month + 1, Number(m[2]));
    }
  }
  return null;
};

/** Reads "10/1 - 10/15" or "Oct 1 to Oct 15" as a range, earliest first. */
const parseDateRange = (text: string): [string, string] | null => {
  const parts = text.trim().split(/\s+(?:-|to)\s+|\s*–\s*/i);
  if (parts.length !== 2) return null;
  const a = parseDate(parts[0] ?? '');
  const b = parseDate(parts[1] ?? '');
  if (!a || !b) return null;
  return a <= b ? [a, b] : [b, a];
};

type BarFilter = { id: string; field: string; op: BarOp; values: string[] };

/** A Part entry that matches typed text instead of one part number. */
const TEXT_PREFIX = '*';
const isTextEntry = (v: string) => v.startsWith(TEXT_PREFIX);
const quoted = (v: string) =>
  `“${isTextEntry(v) ? v.slice(TEXT_PREFIX.length) : v}”`;

const groupLabel = (field: string, v: string) =>
  BAR_FIELDS[field]?.groups?.find((g) => g.value === v)?.label ?? v;

/** Values an operator needs before the filter can apply. */
const valuesNeeded = (op: BarOp) => (op === 'between' ? 2 : 1);

const isComplete = (f: BarFilter) => f.values.length >= valuesNeeded(f.op);

type TokenWords = {
  operator: string;
  value: string | string[];
  joined?: { operator: string; value: string };
};

/**
 * The operator and value a token shows. A list reads "is" for one value and
 * "is any of" for more. Typed Part text joins as "or contains".
 */
const tokenWords = (f: BarFilter): TokenWords => {
  const def = BAR_FIELDS[f.field];
  if (f.op === 'between') {
    const [from, to] = f.values;
    return {
      operator: OP_TEXT.between,
      value:
        from && to
          ? formatRange(from, to)
          : from
            ? `${formatDate(from)} –`
            : '',
    };
  }
  if (f.op !== 'in') {
    const v = f.values[0];
    return {
      operator: OP_TEXT[f.op],
      value: !v ? '' : def?.kind === 'date' ? formatDate(v) : quoted(v),
    };
  }
  const exact = f.values.filter((v) => !isTextEntry(v));
  const texts = f.values.filter(isTextEntry).map(quoted).join(' or ');
  const listOp = exact.length > 1 ? 'is any of' : 'is';
  const labels = exact.map((v) => groupLabel(f.field, v));
  const value =
    def?.kind === 'many' || def?.multiple ? labels : (labels[0] ?? '');
  if (!texts) return { operator: listOp, value };
  if (exact.length === 0) return { operator: 'contains', value: texts };
  return {
    operator: listOp,
    value,
    joined: { operator: 'or contains', value: texts },
  };
};

const describeFilter = (f: BarFilter) => {
  const w = tokenWords(f);
  const value = Array.isArray(w.value) ? w.value.join(', ') : w.value;
  const joined = w.joined ? ` ${w.joined.operator} ${w.joined.value}` : '';
  return `${f.field} ${w.operator} ${value}${joined}`;
};

const sameFilter = (a: BarFilter, b: BarFilter) =>
  a.field === b.field &&
  a.op === b.op &&
  a.values.join('\n') === b.values.join('\n');

/** Pending changes: added or changed filters in the draft. */
const countPending = (draft: BarFilter[], applied: BarFilter[]) =>
  draft.filter((f) => {
    const before = applied.find((a) => a.id === f.id);
    return !before || !sameFilter(before, f);
  }).length;

const BAR_APPLIED: BarFilter[] = [
  { id: 'resolution', field: 'Resolution', op: 'in', values: ['@open'] },
  { id: 'stage', field: 'Stage', op: 'in', values: ['Open', 'In progress'] },
  {
    id: 'entered',
    field: 'Entered On',
    op: 'between',
    values: ['2026-09-01', '2026-09-30'],
  },
];

type BarMode =
  | { type: 'closed' }
  | { type: 'root' }
  | { type: 'values'; id: string }
  | { type: 'op'; id: string }
  | { type: 'more'; keys: string[] };

type BarToken = {
  filter: BarFilter;
  state: 'applied' | 'editing' | 'pending';
};

/**
 * A filter bar with staged changes: added and edited filters wait for Apply.
 * A removed filter applies at once, so it never waits. The app owns the
 * applied set, the draft, the edited token and the menu mode. The field and
 * the menu only show them.
 */
const StagedFilterBarDemo = () => {
  const [applied, setApplied] = useState(BAR_APPLIED);
  const [draft, setDraft] = useState(BAR_APPLIED);
  // A copy of the token being edited. Esc throws it away.
  const [edit, setEdit] = useState<BarFilter | null>(null);
  const [mode, setMode] = useState<BarMode>({ type: 'closed' });
  const [text, setText] = useState('');
  const [input, setInput] = useState<HTMLInputElement | null>(null);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  // The results load for a moment after Apply.
  const [loading, setLoading] = useState(false);
  // The last discarded draft, which Undo brings back for a few seconds.
  const [discarded, setDiscarded] = useState<BarFilter[] | null>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  // The input moves back out of a token when an edit ends, and gets focus
  // again. That focus must not open the menu.
  const quietFocus = useRef(false);

  useEffect(() => {
    if (!loading) return;
    const timer = window.setTimeout(() => setLoading(false), 800);
    return () => window.clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (!discarded) return;
    const timer = window.setTimeout(() => setDiscarded(null), 6000);
    return () => window.clearTimeout(timer);
  }, [discarded]);

  /* What the field shows */

  const isPending = (f: BarFilter) => {
    const before = applied.find((a) => a.id === f.id);
    return !before || !sameFilter(before, f);
  };
  const pending = countPending(draft, applied);

  const shown: BarToken[] = [
    ...draft.map(
      (f): BarToken =>
        edit?.id === f.id
          ? { filter: edit, state: 'editing' }
          : { filter: f, state: isPending(f) ? 'pending' : 'applied' },
    ),
    ...(edit && !draft.some((f) => f.id === edit.id)
      ? [{ filter: edit, state: 'editing' } as BarToken]
      : []),
  ];

  /* Open, keep, cancel */

  const reset = () => {
    if (mode.type === 'values') {
      quietFocus.current = true;
      requestAnimationFrame(() => {
        quietFocus.current = false;
      });
    }
    setEdit(null);
    setMode({ type: 'closed' });
    setText('');
    setAnchor(null);
    // The next menu starts on its first row, not the last row used.
    menu.setActiveKey(null);
  };

  // Keeps the edit in the draft. A filter without the values it needs is
  // dropped. An applied filter emptied this way is a removal, so it applies
  // at once, like the × button.
  const commit = (next: BarFilter | null = edit) => {
    if (next && !isComplete(next) && applied.some((f) => f.id === next.id)) {
      remove(next.id);
    } else if (next) {
      setDraft((current) => {
        if (!isComplete(next)) {
          return current.filter((f) => f.id !== next.id);
        }
        return current.some((f) => f.id === next.id)
          ? current.map((f) => (f.id === next.id ? next : f))
          : [...current, next];
      });
    }
    reset();
  };

  const open = (
    f: BarFilter,
    type: 'values' | 'op',
    from: HTMLElement | null,
  ) => {
    if (edit && edit.id !== f.id) commit(edit);
    setEdit({ ...f, values: [...f.values] });
    setMode({ type, id: f.id });
    setText('');
    setAnchor(from);
    menu.setActiveKey(null);
  };

  // A field maps to one backend filter, so picking a field that has a token
  // opens that token instead of adding a second one.
  const startField = (field: string) => {
    const existing = draft.find((f) => f.field === field);
    if (existing) {
      open(existing, 'values', null);
      return;
    }
    const f: BarFilter = {
      id: `new-${nextId.current++}`,
      field,
      op: BAR_FIELDS[field]!.ops[0]!,
      values: [],
    };
    setEdit(f);
    setMode({ type: 'values', id: f.id });
    setText('');
    menu.setActiveKey(null);
  };

  // Typed text becomes a search. A second search replaces the first.
  const search = (query: string) => {
    setDraft((current) => {
      const same = current.find((f) => f.field === 'Search');
      if (same) {
        return current.map((f) =>
          f.id === same.id ? { ...f, values: [query] } : f,
        );
      }
      return [
        ...current,
        {
          id: `new-${nextId.current++}`,
          field: 'Search',
          op: 'contains',
          values: [query],
        },
      ];
    });
    reset();
  };

  // A removal applies at once. Other pending changes still wait.
  const remove = (id: string) => {
    if (edit?.id === id) reset();
    setDraft((current) => current.filter((f) => f.id !== id));
    setApplied((current) => current.filter((f) => f.id !== id));
    setLoading(true);
  };

  const apply = () => {
    setApplied(draft);
    setDiscarded(null);
    setLoading(true);
    reset();
  };

  const discard = () => {
    setDiscarded(draft);
    setDraft(applied);
    reset();
  };

  const undoDiscard = () => {
    if (discarded) setDraft(discarded);
    setDiscarded(null);
  };

  // A click outside the field and the menu keeps the edit and closes.
  useEffect(() => {
    if (mode.type === 'closed') return;
    const onMouseDown = (event: globalThis.MouseEvent) => {
      const target = event.target as Element;
      if (
        fieldRef.current?.contains(target) ||
        target.closest('[data-filter-bar-menu]')
      ) {
        return;
      }
      commit();
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  });

  /* Menu rows */

  const rows: FilterMenuRow[] = [];
  const actions = new Map<string, () => void>();
  const addRow = (
    row: Omit<Extract<FilterMenuRow, { type: 'item' }>, 'type'>,
    action: () => void,
  ) => {
    rows.push({ type: 'item', ...row });
    actions.set(row.key, action);
  };
  const query = text.trim();
  const q = query.toLowerCase();
  const editField = edit ? BAR_FIELDS[edit.field] : undefined;
  const editingMany =
    mode.type === 'values' &&
    (editField?.kind === 'many' ||
      (editField?.kind === 'lookup' && Boolean(editField.multiple)));
  let footer = 'Enter picks · Esc cancels';

  if (mode.type === 'root') {
    // Fields already in use go last.
    const used = new Set(draft.map((f) => f.field));
    const fields = BAR_PICKABLE.filter((f) => f.toLowerCase().includes(q)).sort(
      (a, b) => Number(used.has(a)) - Number(used.has(b)),
    );
    if (fields.length > 0) rows.push({ type: 'group', label: 'Fields' });
    for (const field of fields) {
      addRow(
        {
          key: `field:${field}`,
          label: field,
          detail: KIND_DETAIL[BAR_FIELDS[field]!.kind],
        },
        () => startField(field),
      );
    }
    if (q) {
      rows.push({ type: 'group', label: 'Search' });
      addRow(
        { key: 'search', label: `Search contains “${query}”`, detail: 'Tab' },
        () => search(query),
      );
      footer = 'Enter picks · Tab searches the text';
    } else {
      footer =
        pending > 0
          ? 'Type a field or text · Enter applies'
          : 'Type a field or text · Enter picks';
    }
  }

  if (mode.type === 'op' && edit && editField) {
    rows.push({ type: 'group', label: `${edit.field} operator` });
    for (const op of editField.ops) {
      if (op === 'in') continue;
      addRow(
        {
          key: `op:${op}`,
          label: OP_TEXT[op],
          selected: op === edit.op,
          detail: op === edit.op ? 'current' : undefined,
        },
        () => {
          // Keep the dates that still fit: a range keeps two, one date keeps one.
          const values =
            op === 'between'
              ? edit.values.slice(0, 2)
              : edit.values.slice(0, 1);
          const next = { ...edit, op, values };
          if (isComplete(next)) {
            commit(next);
          } else {
            setEdit(next);
            setMode({ type: 'values', id: next.id });
            setAnchor(null);
          }
        },
      );
    }
  }

  if (mode.type === 'values' && edit && editField) {
    const words = tokenWords(edit);
    rows.push({ type: 'group', label: `${edit.field} ${words.operator}` });

    // A pick-many field toggles. A pick-one field picks and closes.
    const toggle = (value: string) => {
      setEdit({
        ...edit,
        values: edit.values.includes(value)
          ? edit.values.filter((v) => v !== value)
          : [...edit.values, value],
      });
      setText('');
    };
    const pickOne = (value: string) => commit({ ...edit, values: [value] });
    const current = (value: string) =>
      edit.values.includes(value)
        ? { selected: true, detail: 'current' }
        : { selected: false };

    if (editField.kind === 'many') {
      for (const value of editField.options ?? []) {
        if (!value.toLowerCase().includes(q)) continue;
        addRow(
          { key: value, label: value, checked: edit.values.includes(value) },
          () => toggle(value),
        );
      }
      footer = 'Space toggles · Enter done · Esc cancels';
    } else if (editField.kind === 'one') {
      const groups = (editField.groups ?? []).filter((g) =>
        g.label.toLowerCase().includes(q),
      );
      const options = (editField.options ?? []).filter((v) =>
        v.toLowerCase().includes(q),
      );
      for (const g of groups) {
        addRow({ key: g.value, label: g.label, ...current(g.value) }, () =>
          pickOne(g.value),
        );
      }
      if (groups.length > 0 && options.length > 0) {
        rows.push({ type: 'group', label: `Each ${edit.field.toLowerCase()}` });
      }
      for (const value of options) {
        addRow({ key: value, label: value, ...current(value) }, () =>
          pickOne(value),
        );
      }
    } else if (editField.kind === 'lookup') {
      const records = editField.records ?? [];
      const describe = (name: string) =>
        records.find((r) => r.name === name)?.description;
      const pick = editField.multiple ? toggle : pickOne;
      if (!q) {
        // Nothing lists until the person types, except what is picked.
        for (const value of edit.values) {
          addRow(
            {
              key: `picked:${value}`,
              label: isTextEntry(value) ? `contains ${quoted(value)}` : value,
              description: describe(value),
              ...(editField.multiple ? { checked: true } : current(value)),
            },
            () => pick(value),
          );
        }
        if (edit.values.length === 0) {
          rows.push({
            type: 'empty',
            label: editField.prompt ?? 'Type to find',
          });
        }
      } else {
        const matched = records.filter(
          (r) =>
            r.name.toLowerCase().includes(q) ||
            r.description.toLowerCase().includes(q),
        );
        for (const r of matched.slice(0, LOOKUP_LIMIT)) {
          addRow(
            {
              key: r.name,
              label: r.name,
              description: r.description,
              ...(editField.multiple
                ? { checked: edit.values.includes(r.name) }
                : current(r.name)),
            },
            () => pick(r.name),
          );
        }
        if (matched.length > LOOKUP_LIMIT) {
          rows.push({
            type: 'empty',
            label: `${matched.length - LOOKUP_LIMIT} more · keep typing to narrow`,
          });
        }
        if (editField.multiple) {
          // Typed text can also match: "or contains “water”".
          const entry = `${TEXT_PREFIX}${query}`;
          rows.push({ type: 'group', label: 'Or match the text' });
          addRow(
            {
              key: `text:${query}`,
              label: `contains “${query}”`,
              checked: edit.values.includes(entry),
            },
            () => toggle(entry),
          );
        }
      }
      footer = editField.multiple
        ? 'Type to find · Space toggles · Enter done · Esc cancels'
        : 'Type to find · Enter picks · Esc cancels';
    } else if (editField.kind === 'date') {
      // "is between" takes two picks: a start date, then an end date. A
      // range preset or a typed range fills both at once.
      const range = edit.op === 'between';
      // A full range being edited starts over, so its start can change too.
      const from =
        range && edit.values.length === 1 ? edit.values[0] : undefined;
      const pickDate = (iso: string) => {
        if (!range) return pickOne(iso);
        if (!from) {
          setEdit({ ...edit, values: [iso] });
          setText('');
          menu.setActiveKey(null);
          return;
        }
        commit({ ...edit, values: from <= iso ? [from, iso] : [iso, from] });
      };
      if (range && from) {
        rows[rows.length - 1] = {
          type: 'group',
          label: `${edit.field} is between ${formatDate(from)} and …`,
        };
      }
      const typedRange = range && !from && q ? parseDateRange(query) : null;
      if (typedRange) {
        addRow(
          {
            key: 'typed-range',
            label: formatRange(...typedRange),
            detail: 'typed',
          },
          () => commit({ ...edit, values: typedRange }),
        );
      }
      const typed = q && !typedRange ? parseDate(query) : null;
      if (typed) {
        addRow(
          {
            key: 'typed',
            label: formatDate(typed),
            detail: range ? (from ? 'end date' : 'start date') : 'typed',
          },
          () => pickDate(typed),
        );
      }
      if (range && !from && !q) {
        for (const p of RANGE_PRESETS) {
          addRow(
            {
              key: `range:${p.label}`,
              label: p.label,
              detail: formatRange(...p.values),
            },
            () => commit({ ...edit, values: p.values }),
          );
        }
        rows.push({ type: 'group', label: 'Or pick a start date' });
      }
      if (!q) {
        for (const p of DATE_PRESETS) {
          addRow(
            {
              key: p.value,
              label: p.label,
              detail: formatDate(p.value),
              selected: !range && edit.values[0] === p.value,
            },
            () => pickDate(p.value),
          );
        }
      }
      footer = range
        ? from
          ? 'Type or pick the end date · Esc cancels'
          : 'Type a range, such as 10/1 - 10/15 · Esc cancels'
        : 'Type a date, such as 10/15 · Esc cancels';
    } else {
      if (q) {
        addRow({ key: 'typed', label: `“${query}”` }, () => pickOne(query));
      } else {
        rows.push({ type: 'empty', label: 'Type the text to match' });
      }
      footer = 'Enter adds the text · Esc cancels';
    }
    if (q && !rows.some((row) => row.type === 'item')) {
      rows.push({
        type: 'empty',
        label: `No ${edit.field.toLowerCase()} matches “${query}”`,
      });
    }
  }

  if (mode.type === 'more') {
    const hidden = shown.filter((t) => mode.keys.includes(t.filter.id));
    rows.push({ type: 'group', label: `${hidden.length} more filters` });
    for (const { filter, state } of hidden) {
      addRow(
        {
          key: filter.id,
          label: describeFilter(filter),
          detail: state === 'pending' ? state : undefined,
        },
        () => open(filter, 'values', null),
      );
    }
    footer = 'Pick a filter to edit it';
  }

  const menu = useFilterMenu({
    rows,
    open: mode.type !== 'closed',
    onSelect: (key) => actions.get(key)?.(),
    onClose: reset,
    spaceSelects: editingMany && text === '',
  });

  const openRoot = () => {
    if (mode.type === 'closed') setMode({ type: 'root' });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const empty = text.trim() === '';
    const atRoot = mode.type === 'closed' || mode.type === 'root';
    // Enter on an empty input applies the pending changes.
    if (event.key === 'Enter' && empty && atRoot && pending > 0) {
      event.preventDefault();
      apply();
      return;
    }
    // Enter on an empty input ends a pick-many edit.
    if (event.key === 'Enter' && empty && editingMany) {
      event.preventDefault();
      commit();
      return;
    }
    // Backspace on an empty input takes back the last value picked.
    if (
      event.key === 'Backspace' &&
      text === '' &&
      editingMany &&
      edit &&
      edit.values.length > 0
    ) {
      event.preventDefault();
      setEdit({ ...edit, values: edit.values.slice(0, -1) });
      return;
    }
    // Tab turns typed text into a search.
    if (event.key === 'Tab' && mode.type === 'root' && !empty) {
      event.preventDefault();
      search(text.trim());
      return;
    }
    // Esc with no menu open throws away the pending changes.
    if (event.key === 'Escape' && mode.type === 'closed' && pending > 0) {
      event.preventDefault();
      discard();
      return;
    }
    if (event.key === 'ArrowDown' && mode.type === 'closed') {
      event.preventDefault();
      openRoot();
      return;
    }
    menu.inputProps.onKeyDown(event);
  };

  const tokens = shown.map(({ filter, state }): FilterFieldToken => {
    const field = BAR_FIELDS[filter.field]!;
    const words = tokenWords(filter);
    return {
      key: filter.id,
      field: filter.field,
      operator: words.operator,
      value: words.value,
      joined: words.joined,
      state,
      operatorLocked: field.ops.length === 1,
      onValueClick: () => open(filter, 'values', null),
      onOperatorClick: (event) => open(filter, 'op', event.currentTarget),
      onRemove: () => remove(filter.id),
    };
  });

  const menuAnchor =
    mode.type === 'op' || mode.type === 'more' ? anchor : input;
  const discardedCount = discarded ? countPending(discarded, applied) : 0;

  return (
    <VStack alignItems="stretch" gap="12" w="full" minH="md">
      <HStack gap="8" alignItems="start">
        <Box ref={fieldRef} flex="1" minW="0">
          <FilterField
            w="full"
            tokens={tokens}
            inputValue={text}
            onInputChange={(value) => {
              setText(value);
              menu.setActiveKey(null);
              if (mode.type === 'closed' || mode.type === 'more') {
                setMode({ type: 'root' });
              }
            }}
            inputRef={setInput}
            inputProps={{
              ...menu.inputProps,
              onFocus: () => {
                if (!quietFocus.current) openRoot();
              },
              onMouseDown: openRoot,
              onKeyDown,
            }}
            placeholder="Filter or search…"
            editingKey={mode.type === 'values' ? (edit?.id ?? null) : null}
            onMoreClick={(keys, from) => {
              if (mode.type === 'more') return reset();
              commit();
              setMode({ type: 'more', keys });
              setAnchor(from);
            }}
            moreOpen={mode.type === 'more'}
            shortcut="/"
            onClearAll={() => {
              setDraft([]);
              setApplied([]);
              setLoading(true);
              reset();
            }}
          />
        </Box>
        {pending > 0 && (
          <>
            <Button variant="ghost" onClick={discard}>
              Discard
            </Button>
            <Button variant="primary" disabled={loading} onClick={apply}>
              {`Apply (${pending})`}
            </Button>
          </>
        )}
      </HStack>
      <HStack gap="8">
        <Text textStyle="body.sm" color="text.subtle">
          {loading
            ? 'Updating the results…'
            : pending > 0
              ? `These results do not include ${pending} pending ${pending === 1 ? 'change' : 'changes'}. Press Enter or Apply to update them. Press Esc or Discard to undo.`
              : discarded && discardedCount > 0
                ? `Discarded ${discardedCount} ${discardedCount === 1 ? 'change' : 'changes'}.`
                : 'The results match the applied filters.'}
        </Text>
        {!loading && pending === 0 && discarded && discardedCount > 0 && (
          <Button size="sm" variant="ghost" onClick={undoDiscard}>
            Undo
          </Button>
        )}
      </HStack>
      <Text textStyle="body.sm" color="text.subtlest" data-testid="applied">
        {`Applied: ${applied.map(describeFilter).join(' · ') || 'none'}`}
      </Text>
      <FilterMenu
        {...menu.menuProps}
        anchor={menuAnchor}
        aria-label={
          mode.type === 'values'
            ? `${edit?.field ?? ''} values`
            : mode.type === 'op'
              ? 'Operators'
              : mode.type === 'more'
                ? 'More filters'
                : 'Fields'
        }
        query={mode.type === 'op' || mode.type === 'more' ? undefined : text}
        footer={footer}
        data-filter-bar-menu
      />
    </VStack>
  );
};

export const ExFilterBarWithApply: Story = {
  name: 'Ex: Filter bar with Apply',
  render: () => <StagedFilterBarDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    // While a combobox menu is open, Floating UI hides the rest of the page
    // from screen readers. So queries in the field allow hidden elements.
    // Menu groups have names too, so a token is found among the tokens only.
    const tokens = () =>
      Array.from(
        canvasElement.querySelectorAll<HTMLElement>(
          '[data-ds-component="FilterToken"]',
        ),
      );
    const token = (name: RegExp) => {
      const found = tokens().find((node) =>
        name.test(node.getAttribute('aria-label') ?? ''),
      );
      if (!found) throw new Error(`No filter token named ${name}`);
      return found;
    };
    // While a menu is open, the token parts are hidden from screen readers
    // and have no accessible name, so a part is found by its text.
    const part = (name: RegExp, text: string) => {
      const found = Array.from(token(name).querySelectorAll('button')).find(
        (node) => node.textContent === text,
      );
      if (!found) throw new Error(`No part "${text}" in ${name}`);
      return found;
    };
    const applyButton = () =>
      canvas.queryByRole('button', { name: /^Apply/, hidden: true });
    // The input remounts when it moves into a token, so find it each time.
    const input = () =>
      canvas.getByRole('combobox', { name: 'Filter or search', hidden: true });
    const applied = () => canvas.getByTestId('applied');
    // A token behind "+N more" is inert, so role queries skip it. Its
    // accessible name still says what the draft holds.
    const hasToken = (sentence: string) =>
      tokens().some((node) => node.getAttribute('aria-label') === sentence);

    // A pick-many value menu checks the picked values. A new pick waits for
    // Apply, and the token reads "is any of" once it has two or more.
    await userEvent.click(part(/^Stage/, 'Open, In progress'));
    await waitFor(() =>
      expect(token(/^Stage/)).toHaveAttribute('data-state', 'editing'),
    );
    await userEvent.click(
      await body.findByRole('option', { name: /^Waiting on customer/ }),
    );
    // Backspace takes back the last value picked.
    await userEvent.keyboard('{Backspace}');
    await waitFor(() =>
      expect(hasToken('Stage is any of Open, In progress')).toBe(true),
    );
    await userEvent.click(await body.findByRole('option', { name: /^Closed/ }));
    await userEvent.keyboard('{Enter}');
    await waitFor(() =>
      expect(token(/^Stage/)).toHaveAttribute('data-state', 'pending'),
    );
    expect(applyButton()).toHaveTextContent('Apply (1)');

    // Esc cancels an edit and puts the token back as it was.
    await userEvent.click(part(/^Stage/, 'Stage'));
    await body.findByRole('option', { name: /^Open/ });
    await userEvent.keyboard(' ');
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(hasToken('Stage is any of Open, In progress, Closed')).toBe(true),
    );

    // Picking a field that has a token opens that token. It never adds a
    // second one.
    const openEnteredOn = async () => {
      await userEvent.click(input());
      await userEvent.type(input(), 'entered');
      await userEvent.keyboard('{Enter}');
      await waitFor(() =>
        expect(token(/^Entered On/)).toHaveAttribute('data-state', 'editing'),
      );
    };
    await openEnteredOn();
    expect(
      tokens().filter((node) =>
        node.getAttribute('aria-label')?.startsWith('Entered On'),
      ),
    ).toHaveLength(1);

    // A range switched to one date keeps its start date.
    await userEvent.click(part(/^Entered On/, 'is between'));
    await userEvent.click(
      await body.findByRole('option', { name: /^is on or after/ }),
    );
    await waitFor(() =>
      expect(hasToken('Entered On is on or after Sep 1, 2026')).toBe(true),
    );

    // A typed date with no year is in this year.
    await openEnteredOn();
    await userEvent.keyboard('9/15');
    await body.findByRole('option', { name: /^Sep 15, 2026/ });
    await userEvent.keyboard('{Enter}');
    await waitFor(() =>
      expect(hasToken('Entered On is on or after Sep 15, 2026')).toBe(true),
    );

    // A pick-one field reads "is", picks once and closes.
    await userEvent.click(input());
    await userEvent.type(input(), 'prio');
    await userEvent.keyboard('{Enter}');
    await body.findByRole('option', { name: /^High/ });
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(hasToken('Priority is High')).toBe(true));
    expect(applyButton()).toHaveTextContent('Apply (3)');

    // Apply makes the draft the applied set.
    await userEvent.click(applyButton()!);
    await waitFor(() => expect(applyButton()).toBeNull());
    expect(applied()).toHaveTextContent('Priority is High');

    // Backspace twice removes the last filter. A removal applies at once
    // and does not wait for Apply.
    await userEvent.click(input());
    await userEvent.keyboard('{Escape}{Backspace}{Backspace}');
    await waitFor(() => expect(applied()).not.toHaveTextContent('Priority'));
    expect(applyButton()).toBeNull();

    // Esc with no menu open throws the pending changes away. Undo brings
    // them back.
    await userEvent.click(part(/^Stage/, 'Stage'));
    await userEvent.click(
      await body.findByRole('option', { name: /^Waiting on customer/ }),
    );
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(applyButton()).toHaveTextContent('Apply (1)'));
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(applyButton()).toBeNull());
    await userEvent.click(
      await canvas.findByRole('button', { name: 'Undo', hidden: true }),
    );
    await waitFor(() => expect(applyButton()).toHaveTextContent('Apply (1)'));

    // Tab turns typed text into a search.
    await userEvent.click(input());
    await userEvent.type(input(), 'hinge');
    await userEvent.keyboard('{Tab}');
    await waitFor(() => expect(hasToken('Search contains “hinge”')).toBe(true));

    // A lookup lists nothing until the person types. Picked parts and typed
    // text mix in one token: "Part is KIT-6001 or contains “water damage”".
    await userEvent.click(input());
    await userEvent.type(input(), 'part');
    await userEvent.keyboard('{Enter}');
    await body.findByText('Type a part number or text');
    await userEvent.keyboard('kit-6001');
    await userEvent.click(
      await body.findByRole('option', { name: /^KIT-6001/ }),
    );
    await userEvent.keyboard('water damage');
    await userEvent.click(
      await body.findByRole('option', { name: /^contains “water damage”/ }),
    );
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard('{Enter}');
    await waitFor(() =>
      expect(applied()).toHaveTextContent(
        'Part is KIT-6001 or contains “water damage”',
      ),
    );

    // Unchecking every value of an applied filter removes it, like ×. The
    // removal applies at once, so no Apply button waits for it.
    await userEvent.click(part(/^Stage/, 'Stage'));
    for (const value of [
      'Open',
      'In progress',
      'Waiting on customer',
      'Closed',
    ]) {
      await userEvent.click(
        await body.findByRole('option', { name: new RegExp(`^${value}`) }),
      );
    }
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(applied()).not.toHaveTextContent('Stage'));
    expect(
      tokens().some((node) =>
        node.getAttribute('aria-label')?.startsWith('Stage'),
      ),
    ).toBe(false);
    expect(applyButton()).toBeNull();

    // The results finish loading before the snapshot, so it never catches
    // "Updating the results…".
    await canvas.findByText(
      'The results match the applied filters.',
      {},
      { timeout: 3000 },
    );

    // Leave a lookup menu open for the visual snapshot.
    await userEvent.click(input());
    await userEvent.type(input(), 'part');
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard('hng');
    await body.findByRole('option', { name: /HNG-1001/ });
  },
};
