import type { Meta, StoryObj } from '@storybook/react-vite';
import { HStack, VStack, Wrap } from '@styled-system/jsx';
import { useState } from 'react';
import {
  expect,
  fireEvent,
  fn,
  spyOn,
  userEvent,
  waitFor,
  within,
} from 'storybook/test';
import { Box } from '../Box';
import { Button } from '../Button';
import { Divider } from '../Divider';
import { IconButton } from '../IconButton';
import { KeyFact } from './KeyFact';

/**
 * One short fact about a record, as a label and a value.
 *
 * - `horizontal` ("Label: Value") for up to three facts in a page header aside
 * - `vertical` for a strip of facts under the title
 * - `href` makes the value a link
 * - A long value truncates and shows the full value in a tooltip
 * - `editing` replaces the value with a text input
 */
const meta = {
  title: 'Components/KeyFact',
  component: KeyFact,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Customer',
    value: 'Acme Corp',
  },
  argTypes: {
    layout: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof KeyFact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Layouts: Story = {
  render: () => (
    <VStack gap="24" alignItems="flex-start">
      <KeyFact label="Customer" value="Acme Corp" layout="horizontal" />
      <KeyFact label="Customer" value="Acme Corp" layout="vertical" />
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

// The `xs` and `md` breakpoints from src/styles/utilities/breakpoints.ts.
const xsBreakpoint = '(min-width: 30rem)';
const mdBreakpoint = '(min-width: 48rem)';

const expectLayout = (fact: HTMLElement, layout: 'horizontal' | 'vertical') => {
  const shown = (text: string) =>
    getComputedStyle(within(fact).getByText(text)).display !== 'none';
  const link = fact.querySelector('a');

  expect(shown('Customer:')).toBe(layout === 'horizontal');
  expect(shown('Customer')).toBe(layout === 'vertical');
  expect(link && getComputedStyle(link).fontSize).toBe(
    layout === 'horizontal' ? '14px' : '20px',
  );
};

const responsiveLayoutStory: Story = {
  render: () => (
    <VStack gap="24" alignItems="flex-start">
      <KeyFact
        label="Customer"
        value="Acme Corp"
        href="#customer"
        layout={{ base: 'horizontal' }}
        data-testid="horizontal-base-only"
      />
      <KeyFact
        label="Customer"
        value="Acme Corp"
        href="#customer"
        layout={{ base: 'vertical', md: 'horizontal' }}
        data-testid="vertical-then-horizontal"
      />
      <KeyFact
        label="Customer"
        value="Acme Corp"
        href="#customer"
        layout={{ md: 'vertical' }}
        data-testid="horizontal-then-vertical"
      />
      <KeyFact
        label="Customer"
        value="Acme Corp"
        href="#customer"
        layout={{ base: undefined, md: 'vertical' }}
        data-testid="undefined-base-then-vertical"
      />
      <KeyFact
        label="Customer"
        value="Acme Corp"
        href="#customer"
        layout={[null, 'vertical']}
        data-testid="array-without-base"
      />
    </VStack>
  ),
  parameters: { controls: { disable: true } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const aboveMd = window.matchMedia(mdBreakpoint).matches;

    expectLayout(canvas.getByTestId('horizontal-base-only'), 'horizontal');
    expectLayout(
      canvas.getByTestId('vertical-then-horizontal'),
      aboveMd ? 'horizontal' : 'vertical',
    );
    // With no `base`, or an undefined one, the layout starts as `horizontal`.
    expectLayout(
      canvas.getByTestId('horizontal-then-vertical'),
      aboveMd ? 'vertical' : 'horizontal',
    );
    expectLayout(
      canvas.getByTestId('undefined-base-then-vertical'),
      aboveMd ? 'vertical' : 'horizontal',
    );
    // The same for an array whose first entry is null.
    expectLayout(
      canvas.getByTestId('array-without-base'),
      window.matchMedia(xsBreakpoint).matches ? 'vertical' : 'horizontal',
    );
  },
};

/**
 * `layout` accepts conditional values. Resize the viewport across the `md`
 * breakpoint (768px) to see the label and the value switch together. The
 * array example switches at the `xs` breakpoint (480px).
 */
export const ResponsiveLayout: Story = {
  ...responsiveLayoutStory,
  name: 'Responsive Layout',
};

/** The same facts below the `md` breakpoint. */
export const ResponsiveLayoutNarrow: Story = {
  ...responsiveLayoutStory,
  name: 'Responsive Layout Narrow',
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  play: async (context) => {
    // Fail loudly if the viewport global stops applying, rather than
    // repeating the wide-viewport checks. Below `xs`, the array fact also
    // checks its `horizontal` fallback.
    expect(window.matchMedia(xsBreakpoint).matches).toBe(false);
    await responsiveLayoutStory.play?.(context);
  },
};

export const AsLink: Story = {
  name: 'As Link',
  render: () => (
    <VStack gap="24" alignItems="flex-start">
      <KeyFact label="Customer" value="Acme Corp" href="#customer" />
      <KeyFact
        label="Customer"
        value="Acme Corp"
        href="#customer"
        layout="vertical"
      />
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

export const Editing: Story = {
  render: () => (
    <VStack gap="24" alignItems="flex-start">
      <KeyFact
        label="PO number"
        value="PO-88213"
        editing
        inputProps={{ name: 'poNumber' }}
      />
      <KeyFact
        label="PO number"
        value="PO-88213"
        layout="vertical"
        editing
        inputProps={{ name: 'poNumberVertical' }}
      />
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

/**
 * `editMode="confirm"` adds save and cancel buttons, for a fact saved on its
 * own. Enter saves and Escape cancels.
 */
export const EditingWithSaveAndCancel: Story = {
  name: 'Editing With Save and Cancel',
  render: () => (
    <VStack gap="24" alignItems="flex-start">
      <KeyFact
        label="PO number"
        value="PO-88213"
        editing
        editMode="confirm"
        onSave={fn()}
        onCancel={fn()}
        inputProps={{ name: 'poNumberConfirm' }}
      />
      <KeyFact
        label="PO number"
        value="PO-88213"
        layout="vertical"
        editing
        editMode="confirm"
        onSave={fn()}
        onCancel={fn()}
        inputProps={{ name: 'poNumberConfirmVertical' }}
      />
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

/**
 * Use case: a fact that switches to edit in place and saves on its own.
 */
export const ExEditInPlace: Story = {
  name: 'Ex: Edit in Place',
  render: function Render() {
    const [value, setValue] = useState('PO-88213');
    const [editing, setEditing] = useState(false);

    return (
      <HStack gap="8">
        <KeyFact
          label="PO number"
          value={value}
          editing={editing}
          editMode="confirm"
          onSave={(next) => {
            setValue(next);
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
          inputProps={{ name: 'poNumberInPlace' }}
        />
        {!editing && (
          <IconButton
            variant="ghost"
            size="sm"
            iconName="edit"
            altText="Edit PO number"
            onClick={() => setEditing(true)}
          />
        )}
      </HStack>
    );
  },
  parameters: { controls: { disable: true } },
};

export const Truncated: Story = {
  render: () => (
    <Box w="224">
      <KeyFact
        label="Ship to"
        value="Acme Corp, Receiving Dock 4, 1200 Industrial Parkway"
      />
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

/**
 * Use case: three facts in a record page header aside, with thin dividers.
 */
export const ExPageHeaderAside: Story = {
  name: 'Ex: Page Header Aside',
  render: () => (
    <HStack gap="12">
      <KeyFact label="Customer" value="Acme Corp" href="#customer" />
      <Divider direction="vertical" h="16" />
      <KeyFact label="Owner" value="Dana Ortiz" />
      <Divider direction="vertical" h="16" />
      <KeyFact label="Due" value="Nov 14, 2026" />
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

/**
 * Use case: a strip of facts under a record title, for records with more
 * than three facts.
 */
export const ExFactsStrip: Story = {
  name: 'Ex: Facts Strip',
  render: () => (
    <Wrap gap="32">
      <KeyFact layout="vertical" label="Order total" value="$18,240.00" />
      <KeyFact layout="vertical" label="Lines" value="12" />
      <KeyFact layout="vertical" label="Ship date" value="Nov 14, 2026" />
      <KeyFact
        layout="vertical"
        label="Customer"
        value="Acme Corp"
        href="#customer"
      />
    </Wrap>
  ),
  parameters: { controls: { disable: true } },
};

export const EditingLabelsInput: Story = {
  name: 'Test: editing labels the input',
  args: {
    label: 'PO number',
    value: 'PO-88213',
    editing: true,
    inputProps: { name: 'poNumber' },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'PO number:' });

    await expect(input).toHaveValue('PO-88213');
    await expect(input).toHaveAttribute('name', 'poNumber');
  },
};

export const ConfirmSavesAndCancels: Story = {
  name: 'Test: confirm mode saves and cancels',
  args: {
    label: 'PO number',
    value: 'PO-88213',
    editing: true,
    editMode: 'confirm',
    onSave: fn(),
    onCancel: fn(),
    inputProps: { name: 'poNumber' },
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'PO number:' });

    // The save button sends the edited value.
    await userEvent.clear(input);
    await userEvent.type(input, 'PO-90001');
    await userEvent.click(canvas.getByRole('button', { name: 'Save' }));
    await expect(args.onSave).toHaveBeenLastCalledWith('PO-90001');

    // Enter saves too.
    await userEvent.type(input, '{Enter}');
    await expect(args.onSave).toHaveBeenCalledTimes(2);

    // Escape cancels and puts the value back.
    await userEvent.type(input, '-X{Escape}');
    await expect(args.onCancel).toHaveBeenCalledOnce();
    await expect(input).toHaveValue('PO-88213');

    // The cancel button cancels too.
    await userEvent.click(canvas.getByRole('button', { name: 'Cancel' }));
    await expect(args.onCancel).toHaveBeenCalledTimes(2);
  },
};

export const TruncatedShowsTooltip: Story = {
  name: 'Test: truncated value shows a tooltip',
  render: () => (
    <VStack gap="12" alignItems="flex-start">
      <Box w="160">
        <KeyFact label="Ship to" value="Acme Corp, Receiving Dock 4" />
      </Box>
      <KeyFact label="Owner" value="Dana Ortiz" />
    </VStack>
  ),
  parameters: { controls: { disable: true } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    // A truncated value shows the full value on hover.
    await userEvent.hover(canvas.getByText('Acme Corp, Receiving Dock 4'));
    await expect(await body.findByRole('tooltip')).toHaveTextContent(
      'Acme Corp, Receiving Dock 4',
    );
    await userEvent.unhover(canvas.getByText('Acme Corp, Receiving Dock 4'));
    await waitFor(() => expect(body.queryByRole('tooltip')).toBeNull());

    // Keyboard focus reaches a truncated value and shows the full value.
    await userEvent.tab();
    await expect(canvas.getByText('Acme Corp, Receiving Dock 4')).toHaveFocus();
    await expect(await body.findByRole('tooltip')).toHaveTextContent(
      'Acme Corp, Receiving Dock 4',
    );
    await expect(canvas.getByText('Dana Ortiz')).not.toHaveAttribute(
      'tabindex',
    );
    (document.activeElement as HTMLElement).blur();
    await waitFor(() => expect(body.queryByRole('tooltip')).toBeNull());

    // A value that fits shows no tooltip.
    await userEvent.hover(canvas.getByText('Dana Ortiz'));
    await new Promise((resolve) => setTimeout(resolve, 200));
    await expect(body.queryByRole('tooltip')).toBeNull();
    await userEvent.unhover(canvas.getByText('Dana Ortiz'));
  },
};

export const TooltipAfterBecomingLink: Story = {
  name: 'Test: tooltip after the value becomes a link',
  // Behavior test only. It looks the same as "Truncated".
  tags: ['!snapshot'],
  render: function Render() {
    const [isLink, setIsLink] = useState(false);
    const [narrow, setNarrow] = useState(false);

    return (
      <VStack gap="12" alignItems="flex-start">
        <HStack gap="8">
          <Button onClick={() => setIsLink(true)}>Make link</Button>
          <Button onClick={() => setNarrow(true)}>Narrow</Button>
        </HStack>
        <Box w={narrow ? '160' : 'auto'}>
          <KeyFact
            label="Ship to"
            value="Acme Corp, Receiving Dock 4"
            href={isLink ? '#ship-to' : undefined}
          />
        </Box>
      </VStack>
    );
  },
  parameters: { controls: { disable: true } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await userEvent.click(canvas.getByRole('button', { name: 'Make link' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Narrow' }));

    const link = canvas.getByRole('link', {
      name: 'Acme Corp, Receiving Dock 4',
    });
    await waitFor(() =>
      expect(link.scrollWidth).toBeGreaterThan(link.clientWidth),
    );
    await userEvent.hover(link);
    await expect(await body.findByRole('tooltip')).toHaveTextContent(
      'Acme Corp, Receiving Dock 4',
    );
    await userEvent.unhover(link);
  },
};

export const ImeEnterDoesNotSave: Story = {
  name: 'Test: Enter during IME composition does not save',
  // Behavior test only. It looks the same as "Test: confirm mode saves and cancels".
  tags: ['!snapshot'],
  args: {
    label: 'PO number',
    value: 'PO-88213',
    editing: true,
    editMode: 'confirm',
    onSave: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', {
      name: 'PO number:',
    });

    fireEvent.keyDown(input, { key: 'Enter', isComposing: true });
    await expect(args.onSave).not.toHaveBeenCalled();

    fireEvent.keyDown(input, { key: 'Enter' });
    await expect(args.onSave).toHaveBeenCalledOnce();
  },
};

export const InputModeDefaults: Story = {
  name: 'Test: input mode has no default name and warns about onSave',
  // Behavior test only. It looks the same as "Editing".
  tags: ['!snapshot'],
  args: {
    label: 'PO number',
    value: 'PO-88213',
    editing: true,
    onSave: fn(),
  },
  beforeEach: () => {
    const warn = spyOn(console, 'warn').mockImplementation(() => {});
    return () => warn.mockRestore();
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', {
      name: 'PO number:',
    });

    // An unnamed input is left out of a form submit.
    await expect(input.getAttribute('name') ?? '').toBe('');
    // KeyFact warns only in development builds.
    const warning = expect.stringContaining('without editMode="confirm"');
    if (import.meta.env.DEV) {
      await expect(console.warn).toHaveBeenCalledWith(warning);
    } else {
      await expect(console.warn).not.toHaveBeenCalledWith(warning);
    }
  },
};
