import type { Meta, StoryObj } from '@storybook/react-vite';
import { HStack, VStack, Wrap } from '@styled-system/jsx';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { LocaleProvider } from '~/system/context';
import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import { FilterToken, type FilterTokenState } from './FilterToken';

const meta = {
  title: 'Components/FilterToken',
  component: FilterToken,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['applied', 'editing', 'pending', 'removing', 'armed'],
    },
    tone: {
      control: 'select',
      options: ['default', 'exclude'],
    },
    editor: { control: false },
  },
  args: {
    field: 'Stage',
    operator: 'is any of',
    value: 'Open, In progress',
    state: 'applied',
    tone: 'default',
    operatorLocked: false,
    disabled: false,
    onValueClick: fn(),
    onOperatorClick: fn(),
    onRemove: fn(),
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FilterToken>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByRole('group', { name: 'Stage is any of Open, In progress' }),
    ).toBeVisible();

    // The field has no handler of its own, so it opens the value menu too.
    await userEvent.click(canvas.getByRole('button', { name: 'Stage' }));
    await userEvent.click(
      canvas.getByRole('button', { name: 'Open, In progress' }),
    );
    expect(args.onValueClick).toHaveBeenCalledTimes(2);

    await userEvent.click(canvas.getByRole('button', { name: 'is any of' }));
    expect(args.onOperatorClick).toHaveBeenCalledOnce();

    await userEvent.click(
      canvas.getByRole('button', {
        name: 'Remove filter: Stage is any of Open, In progress',
      }),
    );
    expect(args.onRemove).toHaveBeenCalledOnce();
  },
};

const STATES: { state: FilterTokenState; note: string }[] = [
  { state: 'applied', note: 'The results include this filter.' },
  { state: 'editing', note: 'A menu for this token is open.' },
  { state: 'pending', note: 'Added or changed. Waits for Apply.' },
  { state: 'removing', note: 'Removed. Waits for Apply. Click to restore.' },
  { state: 'armed', note: 'The next Backspace removes it.' },
];

export const States: Story = {
  render: (args) => (
    <VStack alignItems="start" gap="12">
      {STATES.map(({ state, note }) => (
        <HStack key={state} gap="16">
          <Box w="96">
            <Text textStyle="body.sm" fontWeight="medium">
              {state}
            </Text>
          </Box>
          <FilterToken {...args} state={state} data-testid={state} />
          <Text textStyle="body.sm" color="text.subtlest">
            {note}
          </Text>
        </HStack>
      ))}
    </VStack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const removeButton = /^Remove filter/;

    for (const { state } of STATES) {
      const token = within(canvas.getByTestId(state));
      if (state === 'removing') {
        // A removed token cannot be removed again. Its parts restore it.
        expect(
          token.queryByRole('button', { name: removeButton }),
        ).not.toBeInTheDocument();
        expect(token.getByRole('button', { name: 'Stage' })).toBeEnabled();
      } else {
        expect(token.getByRole('button', { name: removeButton })).toBeVisible();
      }
    }
  },
};

export const ExcludeTone: Story = {
  args: {
    operator: 'is none of',
    tone: 'exclude',
  },
};

export const LockedOperator: Story = {
  args: {
    field: 'Case Type',
    operator: 'is',
    value: 'Warranty',
    operatorLocked: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // The locked operator is text in the sentence, not a control.
    expect(
      canvas.queryByRole('button', { name: 'is' }),
    ).not.toBeInTheDocument();
    await userEvent.click(canvas.getByText('is'));
    expect(args.onOperatorClick).not.toHaveBeenCalled();

    expect(canvas.getByRole('button', { name: 'Warranty' })).toBeVisible();
  },
};

export const Joined: Story = {
  args: {
    field: 'Part',
    operator: 'is any of',
    value: ['KIT-6001', 'KIT-6002'],
    joined: { operator: 'or contains', value: '“water damage”' },
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // The sentence reads both operators and both values.
    expect(canvas.getByRole('group')).toHaveAccessibleName(
      'Part is any of KIT-6001, KIT-6002 or contains “water damage”',
    );

    // The joined parts open the same menus as the first ones.
    await userEvent.click(canvas.getByRole('button', { name: 'or contains' }));
    expect(args.onOperatorClick).toHaveBeenCalledTimes(1);
    await userEvent.click(
      canvas.getByRole('button', { name: '“water damage”' }),
    );
    expect(args.onValueClick).toHaveBeenCalledTimes(1);
  },
};

export const JoinedStates: Story = {
  render: (args) => (
    <VStack alignItems="start" gap="12">
      <FilterToken
        {...args}
        field="Part"
        operator="contains"
        value={undefined}
        joined={{ operator: 'or contains', value: '“hinge”' }}
      />
      <FilterToken
        {...args}
        field="Description"
        operator="is"
        value="KIT-6001"
        joined={{
          operator: 'or contains',
          value:
            '“install kit for a base cabinet with water damage repair parts”',
        }}
      />
      <FilterToken
        {...args}
        field="Customer"
        operator="is"
        value="Acme"
        joined={{ operator: 'or contains', value: '“west”' }}
        state="editing"
        editor={
          <Box
            as="input"
            aria-label="Customer"
            size={8}
            h="22"
            p="0"
            bg="transparent"
            borderWidth="0"
            outline="none"
            fontFamily="sans"
            fontSize="14"
            color="text"
          />
        }
      />
    </VStack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The joined part shows even when the first value is not set.
    const part = canvas.getByRole('group', {
      name: 'Part contains or contains “hinge”',
    });
    expect(within(part).getByRole('button', { name: '“hinge”' })).toBeVisible();

    // A long joined value truncates and gets a tooltip, like the first value.
    const long =
      '“install kit for a base cabinet with water damage repair parts”';
    const joinedValue = canvas.getByRole('button', { name: long });
    await waitFor(() =>
      expect(joinedValue.getBoundingClientRect().width).toBeLessThan(260),
    );
    await userEvent.hover(joinedValue);
    const tooltip = await within(document.body).findByRole('tooltip');
    expect(tooltip).toHaveTextContent(long);
    await userEvent.unhover(joinedValue);

    // While the editor is open, the joined operator and value are text, like
    // the first value.
    const editing = canvas.getByRole('group', {
      name: 'Customer is Acme or contains “west”',
    });
    expect(
      within(editing).queryByRole('button', { name: 'or contains' }),
    ).not.toBeInTheDocument();
    expect(
      within(editing).queryByRole('button', { name: '“west”' }),
    ).not.toBeInTheDocument();
    expect(within(editing).getByText('“west”')).toBeVisible();
  },
};

export const ValueStates: Story = {
  render: (args) => (
    <VStack alignItems="start" gap="12">
      <FilterToken {...args} field="Customer" operator="is" value="" />
      <FilterToken
        {...args}
        field="Stage"
        operator="is any of"
        value={['Open', 'In progress']}
      />
      <FilterToken
        {...args}
        field="Entered On"
        operator="is between"
        value="Sep 1, 2026 – Sep 30, 2026"
      />
      <FilterToken
        {...args}
        field="Assigned To"
        operator="is any of"
        value={[
          'Ada Lovelace',
          'Katherine Johnson',
          'Grace Hopper',
          'Alan Turing',
        ]}
      />
    </VStack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fullList =
      'Ada Lovelace, Katherine Johnson, Grace Hopper, Alan Turing';

    // An empty value shows a placeholder.
    expect(canvas.getByRole('button', { name: '…' })).toBeVisible();

    // Two values fit, so no count shows.
    expect(
      canvas.getByRole('button', { name: 'Open, In progress' }),
    ).toBeVisible();

    // Four values show two names and +2. Screen readers get all four.
    const assigned = canvas.getByRole('group', {
      name: `Assigned To is any of ${fullList}`,
    });
    expect(within(assigned).getByText('+2')).toBeVisible();
    const value = within(assigned).getByRole('button', { name: fullList });

    // The tooltip lists every value.
    await userEvent.hover(value);
    const tooltip = await within(document.body).findByRole('tooltip');
    expect(tooltip).toHaveTextContent(fullList);
    await userEvent.unhover(value);
  },
};

export const EditingInPlace: Story = {
  render: (args) => (
    <FilterToken
      {...args}
      field="Case #"
      operator="is"
      value=""
      state="editing"
      operatorLocked
      editor={
        <Box
          as="input"
          aria-label="Case number"
          placeholder="type a number"
          size={14}
          h="22"
          p="0"
          bg="transparent"
          borderWidth="0"
          outline="none"
          fontFamily="sans"
          fontSize="14"
          color="text"
        />
      }
    />
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const button of canvas.getAllByRole('button')) {
      expect(button).toBeDisabled();
    }
  },
};

export const RetainFocus: Story = {
  args: {
    retainFocus: true,
  },
  render: (args) => (
    <VStack alignItems="start" gap="12">
      <Box
        as="input"
        aria-label="Filter or search"
        placeholder="Filter or search…"
        w="xs"
        h="28"
        px="8"
        borderWidth="1"
        borderColor="border"
        borderRadius="4"
        bg="surface"
        fontFamily="sans"
        fontSize="14"
        color="text"
      />
      <FilterToken {...args} />
    </VStack>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'Filter or search' });
    input.focus();
    await waitFor(() => expect(input).toHaveFocus());

    // A click on a part runs its handler, and focus stays in the input.
    await userEvent.click(
      canvas.getByRole('button', { name: 'Open, In progress' }),
    );
    expect(args.onValueClick).toHaveBeenCalledOnce();
    expect(input).toHaveFocus();

    await userEvent.click(
      canvas.getByRole('button', { name: /^Remove filter/ }),
    );
    expect(args.onRemove).toHaveBeenCalledOnce();
    expect(input).toHaveFocus();
  },
};

type DemoFilter = {
  id: string;
  field: string;
  operator: string;
  value: string;
  locked?: boolean;
};

const APPLIED: DemoFilter[] = [
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
    value: 'Open, In progress',
    locked: true,
  },
  {
    id: 'entered',
    field: 'Entered On',
    operator: 'is on or after',
    value: 'Sep 1, 2026',
  },
];

const StagedRemovalDemo = () => {
  const [applied, setApplied] = useState(APPLIED);
  const [removed, setRemoved] = useState<string[]>([]);
  const toggle = (id: string) =>
    setRemoved((r) =>
      r.includes(id) ? r.filter((x) => x !== id) : [...r, id],
    );
  return (
    <VStack alignItems="start" gap="12" w="xl">
      <Wrap gap="4">
        {applied.map((f) => {
          const removing = removed.includes(f.id);
          return (
            <FilterToken
              key={f.id}
              field={f.field}
              operator={f.operator}
              value={f.value}
              operatorLocked={f.locked}
              state={removing ? 'removing' : 'applied'}
              onValueClick={() => removing && toggle(f.id)}
              onOperatorClick={() => removing && toggle(f.id)}
              onRemove={() => toggle(f.id)}
            />
          );
        })}
      </Wrap>
      <HStack gap="8">
        <Button
          size="sm"
          variant="primary"
          disabled={removed.length === 0}
          onClick={() => {
            setApplied((a) => a.filter((f) => !removed.includes(f.id)));
            setRemoved([]);
          }}
        >
          {`Apply (${removed.length})`}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setApplied(APPLIED);
            setRemoved([]);
          }}
        >
          Reset
        </Button>
      </HStack>
    </VStack>
  );
};

export const TranslatedLabels: Story = {
  args: {
    field: 'Etapa',
    operator: 'es',
    value: 'Abierta',
  },
  render: (args) => (
    <LocaleProvider
      labels={{ removeFilter: (filter) => `Quitar filtro: ${filter}` }}
    >
      <HStack gap="8">
        <FilterToken {...args} />
        <FilterToken {...args} removeLabel="Quitar etapa" />
      </HStack>
    </LocaleProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The provider label names the remove button. A removeLabel prop wins.
    expect(
      canvas.getByRole('button', { name: 'Quitar filtro: Etapa es Abierta' }),
    ).toBeVisible();
    expect(canvas.getByRole('button', { name: 'Quitar etapa' })).toBeVisible();
  },
};

export const ExFilterRow: Story = {
  name: 'Ex: Staged removal',
  render: () => <StagedRemovalDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const stage = () =>
      canvas.getByRole('group', { name: 'Stage is any of Open, In progress' });
    const apply = (count: number) =>
      canvas.getByRole('button', { name: `Apply (${count})` });

    // Remove marks the token. It stays until Apply.
    await userEvent.click(
      within(stage()).getByRole('button', { name: /^Remove filter/ }),
    );
    await waitFor(() =>
      expect(stage()).toHaveAttribute('data-state', 'removing'),
    );
    expect(apply(1)).toBeEnabled();

    // A click on the removed token restores it.
    await userEvent.click(
      within(stage()).getByRole('button', { name: 'Stage' }),
    );
    await waitFor(() =>
      expect(stage()).toHaveAttribute('data-state', 'applied'),
    );
    expect(apply(0)).toBeDisabled();

    // Remove again, then Apply drops it.
    await userEvent.click(
      within(stage()).getByRole('button', { name: /^Remove filter/ }),
    );
    await userEvent.click(apply(1));
    await waitFor(() =>
      expect(
        canvas.queryByRole('group', { name: /^Stage/ }),
      ).not.toBeInTheDocument(),
    );

    // Reset puts the story back for the visual snapshot.
    await userEvent.click(canvas.getByRole('button', { name: 'Reset' }));
    await waitFor(() => expect(stage()).toBeVisible());
  },
};
