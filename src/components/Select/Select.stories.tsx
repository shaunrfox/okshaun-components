import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Avatar } from '../Avatar';
import { Box } from '../Box';
import { Button } from '../Button';
import { FormField } from '../FormField';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { Select } from './Select';
import { SelectOption } from './SelectOption';

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Custom listbox-style select for controlled and uncontrolled single and multi-select flows. Use with `FormField` for labels, help text, and error messaging.',
      },
    },
  },
  args: {
    placeholder: 'Choose an option...',
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Controlled selected value for single-select usage',
    },
    placeholder: {
      control: 'text',
      description: 'Display text when no value is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    error: {
      control: 'boolean',
      description: 'Error state styling',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple selected values',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    density: {
      control: 'select',
      options: ['compact', 'comfortable', 'spacious'],
    },
    autoSize: {
      control: 'boolean',
      description:
        'Allow the trigger content to grow vertically instead of staying on one scrollable line',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultRender(args) {
    return (
      <Box w="xs">
        <Select {...args}>
          <SelectOption value="starter" label="Starter" />
          <SelectOption value="growth" label="Growth" />
          <SelectOption value="enterprise" label="Enterprise" />
        </Select>
      </Box>
    );
  },
};

export const Uncontrolled: Story = {
  name: 'Uncontrolled',
  render: () => (
    <Box w="xs">
      <Select defaultValue="growth" placeholder="Choose an option...">
        <SelectOption value="starter" label="Starter" />
        <SelectOption value="growth" label="Growth" />
        <SelectOption value="enterprise" label="Enterprise" />
      </Select>
    </Box>
  ),
  parameters: {
    controls: { disable: true },
  },
};

export const States: Story = {
  render: () => (
    <Box display="grid" gap="12" w="xs">
      <Select placeholder="Default">
        <SelectOption value="starter" label="Starter" />
        <SelectOption value="growth" label="Growth" />
      </Select>

      <Select value="growth" placeholder="With value">
        <SelectOption value="starter" label="Starter" />
        <SelectOption value="growth" label="Growth" />
      </Select>

      <Select error placeholder="Error state">
        <SelectOption value="starter" label="Starter" />
        <SelectOption value="growth" label="Growth" />
      </Select>

      <Select disabled value="starter" placeholder="Disabled">
        <SelectOption value="starter" label="Starter" />
        <SelectOption value="growth" label="Growth" />
      </Select>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const Sizes: Story = {
  render: () => (
    <Box display="grid" gap="12" w="xs">
      <Select size="sm" placeholder="Small">
        <SelectOption value="a" label="Alpha" />
        <SelectOption value="b" label="Beta" />
      </Select>
      <Select size="md" placeholder="Medium">
        <SelectOption value="a" label="Alpha" />
        <SelectOption value="b" label="Beta" />
      </Select>
      <Select size="lg" placeholder="Large">
        <SelectOption value="a" label="Alpha" />
        <SelectOption value="b" label="Beta" />
      </Select>
      <Select size="xl" placeholder="Extra large">
        <SelectOption value="a" label="Alpha" />
        <SelectOption value="b" label="Beta" />
      </Select>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const WithDescriptionsAndIcons: Story = {
  render: () => (
    <Box w="xs">
      <Select placeholder="Choose a support channel...">
        <SelectOption
          value="email"
          label="Email"
          description="Best for non-urgent requests"
          iconLeft="envelope"
        />
        <SelectOption
          value="phone"
          label="Phone"
          description="Best for urgent issues"
          iconLeft="at"
        />
        <SelectOption
          value="chat"
          label="Live chat"
          description="During business hours"
          iconLeft="message"
        />
      </Select>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', fill: 'icon.danger' },
  { value: 'in-progress', label: 'In progress', fill: 'icon.info' },
  { value: 'waiting', label: 'Waiting on customer', fill: 'icon.warning' },
  { value: 'resolved', label: 'Resolved', fill: 'icon.success' },
] as const;

const ASSIGNEE_OPTIONS = [
  { value: 'unassigned', label: 'Unassigned', initials: '?' },
  { value: 'avery', label: 'Avery Jones', initials: 'AJ' },
  { value: 'sam', label: 'Sam Patel', initials: 'SP' },
  { value: 'riley', label: 'Riley Chen', initials: 'RC' },
] as const;

export const WithBefore: Story = {
  name: 'Before slot',
  render: () => (
    <Box display="grid" gap="12" w="xs">
      <Select defaultValue="waiting" clearable={false} aria-label="Status">
        {STATUS_OPTIONS.map((option) => (
          <SelectOption
            key={option.value}
            value={option.value}
            label={option.label}
            before={<Icon name="clock" size="20" fill={option.fill} />}
          />
        ))}
      </Select>

      <Select defaultValue="avery" clearable={false} aria-label="Assignee">
        {ASSIGNEE_OPTIONS.map((option) => (
          <SelectOption
            key={option.value}
            value={option.value}
            label={option.label}
            before={<Avatar size="sm" fallback={option.initials} />}
          />
        ))}
      </Select>
    </Box>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Give each `SelectOption` a `before` to show an avatar or a colored icon. The trigger shows the selected option's `before`. Pass `before` on the `Select` itself to show something else. `clearable={false}` keeps a value that must never be empty.",
      },
    },
  },
};

export const ExCaseWorkflowControls: Story = {
  name: 'Ex: Assignee and status on a support case',
  render: function ExCaseWorkflowControlsRender() {
    const [assignee, setAssignee] = useState<string>('unassigned');
    const [status, setStatus] = useState<string>('new');

    return (
      <Box display="grid" gap="12">
        <Box display="flex" gap="8">
          <Select
            w="200"
            size="sm"
            clearable={false}
            aria-label="Assignee"
            value={assignee}
            onChange={(nextValue: string | string[] | null) => {
              if (typeof nextValue === 'string') setAssignee(nextValue);
            }}
          >
            {ASSIGNEE_OPTIONS.map((option) => (
              <SelectOption
                key={option.value}
                value={option.value}
                label={option.label}
                before={<Avatar size="sm" fallback={option.initials} />}
              />
            ))}
          </Select>
          <Select
            w="200"
            size="sm"
            clearable={false}
            aria-label="Status"
            value={status}
            onChange={(nextValue: string | string[] | null) => {
              if (typeof nextValue === 'string') setStatus(nextValue);
            }}
          >
            {STATUS_OPTIONS.map((option) => (
              <SelectOption
                key={option.value}
                value={option.value}
                label={option.label}
                before={<Icon name="clock" size="20" fill={option.fill} />}
              />
            ))}
          </Select>
        </Box>
        <Text size="14" color="text.subtle">
          Assignee: {assignee}. Status: {status}.
        </Text>
      </Box>
    );
  },
  parameters: { controls: { disable: true } },
};

export const Multiple: Story = {
  render: function MultipleRender() {
    const [value, setValue] = useState<string[] | null>([
      'react',
      'typescript',
    ]);

    return (
      <Box display="grid" gap="12" maxW="xs">
        <Select
          multiple
          value={value}
          onChange={(nextValue: string | string[] | null) => {
            setValue(Array.isArray(nextValue) ? nextValue : null);
          }}
          placeholder="Choose tags..."
        >
          <SelectOption value="react" label="React" />
          <SelectOption value="typescript" label="TypeScript" />
          <SelectOption value="storybook" label="Storybook" />
          <SelectOption value="panda" label="Panda CSS" />
        </Select>

        <Text size="14" color="text.subtle">
          Selected: {value?.join(', ') || 'none'}
        </Text>
      </Box>
    );
  },
  parameters: { controls: { disable: true } },
};

const LONG_OPTION_LABELS = Array.from(
  { length: 40 },
  (_, index) => `${index + 1} - Option ${index + 1}`,
);

export const ExLongOptionList: Story = {
  name: 'Ex: Long Option List',
  render: () => (
    <Box display="flex" flexDirection="column" gap="8" maxW="xs">
      <Select
        data-testid="long-multiple"
        multiple
        placeholder="Choose options..."
      >
        {LONG_OPTION_LABELS.map((label, index) => (
          <SelectOption key={label} value={String(index + 1)} label={label} />
        ))}
      </Select>
      <Select data-testid="long-selected-near-end" defaultValue="35">
        {LONG_OPTION_LABELS.map((label, index) => (
          <SelectOption key={label} value={String(index + 1)} label={label} />
        ))}
      </Select>
    </Box>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByTestId('long-multiple'));
    const listbox = await screen.findByRole('listbox');

    // The listbox is capped to the space beside the trigger and scrolls,
    // rather than running past the viewport edge.
    const viewportHeight =
      canvasElement.ownerDocument.documentElement.clientHeight;
    const rect = listbox.getBoundingClientRect();
    expect(rect.top).toBeGreaterThanOrEqual(0);
    expect(rect.bottom).toBeLessThanOrEqual(viewportHeight);
    expect(getComputedStyle(listbox).overflowY).toBe('auto');
    expect(listbox.scrollHeight).toBeGreaterThan(listbox.clientHeight);

    await userEvent.keyboard('{Escape}');

    // A selected option past the fold is scrolled into view on open.
    await userEvent.click(canvas.getByTestId('long-selected-near-end'));
    const selectedListbox = await screen.findByRole('listbox');
    const selectedOption = within(selectedListbox).getByRole('option', {
      selected: true,
    });
    const listboxRect = selectedListbox.getBoundingClientRect();
    const optionRect = selectedOption.getBoundingClientRect();
    expect(optionRect.top).toBeGreaterThanOrEqual(listboxRect.top);
    expect(optionRect.bottom).toBeLessThanOrEqual(listboxRect.bottom);
  },
  parameters: { controls: { disable: true } },
};

export const ExAutoSize: Story = {
  name: 'Ex: Auto Size',
  render: function ExAutoSizeRender() {
    const [singleValue, setSingleValue] = useState<string | string[] | null>(
      'long',
    );
    const [multiScrollValue, setMultiScrollValue] = useState<string[] | null>([
      'react',
      'typescript',
      'storybook',
      'text',
    ]);
    const [multiWrapValue, setMultiWrapValue] = useState<string[] | null>([
      'react',
      'typescript',
      'storybook',
      'text',
    ]);

    return (
      <Box display="grid" gap="24" w="full" maxW="2xl">
        <Box display="grid" gap="12" gridTemplateColumns="repeat(2, 1fr)">
          <Box display="grid" gap="8">
            <Text size="14" color="text.subtle">
              autoSize=&#34;false&#34;
            </Text>
            <Box maxW="xs">
              <Select
                multiple
                value={multiScrollValue}
                onChange={(nextValue) =>
                  setMultiScrollValue(
                    Array.isArray(nextValue) ? nextValue : null,
                  )
                }
                placeholder="Choose tags..."
              >
                <SelectOption value="react" label="React" />
                <SelectOption value="typescript" label="TypeScript" />
                <SelectOption value="storybook" label="Storybook" />
                <SelectOption value="text" label="Text" />
              </Select>
            </Box>
          </Box>

          <Box display="grid" gap="8">
            <Text size="14" color="text.subtle">
              autoSize=&#34;true&#34;
            </Text>
            <Box maxW="xs">
              <Select
                multiple
                autoSize
                value={multiWrapValue}
                onChange={(nextValue) =>
                  setMultiWrapValue(Array.isArray(nextValue) ? nextValue : null)
                }
                placeholder="Choose tags..."
              >
                <SelectOption value="react" label="React" />
                <SelectOption value="typescript" label="TypeScript" />
                <SelectOption value="storybook" label="Storybook" />
                <SelectOption value="text" label="Text" />
              </Select>
            </Box>
          </Box>
        </Box>

        <Box display="grid" gap="12" gridTemplateColumns="repeat(2, 1fr)">
          <Box display="grid" gap="8">
            <Text size="14" color="text.subtle">
              Single select default
            </Text>
            <Box maxW="xs">
              <Select value={singleValue} onChange={setSingleValue}>
                <SelectOption
                  value="long"
                  label="Enim qui laboris sunt qui laborum veniam minim dolor veniam"
                />
                <SelectOption value="short" label="Short label" />
              </Select>
            </Box>
          </Box>

          <Box display="grid" gap="8">
            <Text size="14" color="text.subtle">
              Single select autoSize
            </Text>
            <Box maxW="xs">
              <Select autoSize value={singleValue} onChange={setSingleValue}>
                <SelectOption
                  value="long"
                  label="Enim qui laboris sunt qui laborum veniam minim dolor veniam"
                />
                <SelectOption value="short" label="Short label" />
              </Select>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  },
  parameters: { controls: { disable: true } },
};

export const InFormField: Story = {
  name: 'Ex: In FormField',
  render: function InFormFieldRender() {
    const [value, setValue] = useState<string | string[] | null>(null);

    return (
      <Box w="sm">
        <FormField
          label="Team size"
          labelFor="team-size"
          helpText="Choose the option that best fits your current headcount."
          error={!value}
          errorText="Select a team size."
        >
          <Select
            id="team-size"
            name="teamSize"
            value={value}
            onChange={setValue}
            placeholder="Select team size..."
          >
            <SelectOption value="1-10" label="1–10 people" />
            <SelectOption value="11-50" label="11–50 people" />
            <SelectOption value="51-200" label="51–200 people" />
            <SelectOption value="201-plus" label="201+ people" />
          </Select>
        </FormField>
      </Box>
    );
  },
  parameters: { controls: { disable: true } },
};

export const ExControlled: Story = {
  name: 'Ex: Controlled',
  render: function ExControlledRender() {
    const [value, setValue] = useState<string | string[] | null>('growth');

    return (
      <Box display="grid" gap="12" w="xs">
        <Select
          value={value}
          onChange={setValue}
          placeholder="Choose a plan..."
        >
          <SelectOption value="starter" label="Starter" />
          <SelectOption value="growth" label="Growth" />
          <SelectOption value="enterprise" label="Enterprise" />
        </Select>

        <Text size="14" color="text.subtle">
          Selected: {value || 'none'}
        </Text>
      </Box>
    );
  },
  parameters: { controls: { disable: true } },
};

export const A11yKeyboardInteraction: Story = {
  name: 'A11y: Keyboard Interaction',
  render: function A11yKeyboardInteractionRender() {
    const [value, setValue] = useState<string | string[] | null>(null);

    return (
      <Box w="xs">
        <Select
          value={value}
          onChange={setValue}
          placeholder="Choose an option..."
        >
          <SelectOption value="starter" label="Starter" />
          <SelectOption value="growth" label="Growth" />
          <SelectOption value="enterprise" label="Enterprise" />
        </Select>
      </Box>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('combobox', {
      name: /choose an option/i,
    });

    trigger.focus();
    expect(trigger).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeVisible();

    // Focus moves into the listbox after it opens. Keys sent before that land
    // on the trigger, which a real keyboard never does.
    await waitFor(() =>
      expect(listbox).toContainElement(document.activeElement as HTMLElement),
    );

    await userEvent.keyboard('{ArrowDown}{Enter}');

    expect(
      canvas.getByRole('combobox', {
        name: /growth/i,
      }),
    ).toBeVisible();
  },
  parameters: { controls: { disable: true } },
};

export const TestIdReachesPortaledListbox: Story = {
  name: 'Ex: Test Id Reaches The Listbox',
  render: () => (
    <Box w="xs" data-testid="filters">
      <Select data-testid="status" placeholder="Choose an option...">
        <SelectOption value="starter" label="Starter" />
        <SelectOption value="growth" label="Growth" />
        <SelectOption value="enterprise" label="Enterprise" />
      </Select>
    </Box>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    // The test id stays on the combobox trigger — the element a test drives,
    // and the element an existing selector already points at.
    const trigger = canvas.getByTestId('status');
    expect(trigger).toBe(canvas.getByRole('combobox'));

    // `data-ds-part` names the trigger for the collector. It is not a test
    // handle and it never contributes a chain node.
    expect(trigger).toHaveAttribute('data-ds-part', 'trigger');

    // The scope is opened above the root instead, because only the root
    // encloses the portal's position in the React tree.
    const root = trigger.closest('[data-ds-component="Select"]');
    expect(root).not.toBe(trigger);
    expect(root).not.toHaveAttribute('data-testid');

    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');

    const listbox = await screen.findByRole('listbox');

    // The listbox is portaled out of the root, so only the chain connects them.
    expect(root?.contains(listbox)).toBe(false);

    // Found by the unconditional marker, not by the chain value — the chain is
    // absent whenever nothing upstream is tagged, and the boundary still needs
    // to be findable then.
    const portalRoot = listbox.closest('[data-ds-portal-root]');
    expect(portalRoot).not.toBeNull();

    // The trigger's own `Box` opens a second scope with the same id; the
    // repeat is collapsed, so the chain reads `filters>status`, not
    // `filters>status>status`.
    expect(portalRoot).toHaveAttribute('data-ds-chain', 'filters>status');
    expect(portalRoot?.getAttribute('data-ds-chain')).not.toContain('trigger');
  },
  parameters: { controls: { disable: true } },
};

export const DsComponentAttribute: Story = {
  name: 'Test: data-ds-component',
  render: () => (
    <Box display="flex" flexDirection="column" gap="8" w="xs">
      <Select data-testid="ds-default" placeholder="Choose an option...">
        <SelectOption value="starter" label="Starter" />
        <SelectOption value="growth" label="Growth" />
      </Select>
      <Select
        data-testid="ds-override"
        data-ds-component="StatusSelect"
        placeholder="Choose an option..."
      >
        <SelectOption value="starter" label="Starter" />
        <SelectOption value="growth" label="Growth" />
      </Select>
    </Box>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    // Select forwards its rest props to the combobox trigger, so the test id
    // lands there and the root is reached from it.
    const trigger = canvas.getByTestId('ds-default');
    expect(trigger).toHaveAttribute('data-ds-part', 'trigger');

    // Emitted automatically on the root, without an author opting in, and it
    // must not leak onto the trigger along with the rest props.
    const root = trigger.closest('[data-ds-component]');
    expect(root).toHaveAttribute('data-ds-component', 'Select');
    expect(trigger).not.toHaveAttribute('data-ds-component');

    // An explicitly passed value wins, still on the root and not the trigger.
    const overriddenTrigger = canvas.getByTestId('ds-override');
    expect(overriddenTrigger.closest('[data-ds-component]')).toHaveAttribute(
      'data-ds-component',
      'StatusSelect',
    );
    expect(overriddenTrigger).not.toHaveAttribute('data-ds-component');

    // The portaled listbox is `List`, so it never reports as the Select.
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');

    const listbox = await screen.findByRole('listbox');

    expect(listbox).not.toHaveAttribute('data-ds-component', 'Select');
    expect(listbox).not.toHaveAttribute('data-ds-component', 'StatusSelect');
  },
  parameters: { controls: { disable: true } },
};

// `Icon` renders its sprite name as the `name` attribute on the svg.
const getOptionIconName = (option: HTMLElement) =>
  option.querySelector('svg[name]')?.getAttribute('name');

export const TestClearIconOnNavigation: Story = {
  name: 'Test: Clear icon follows hover and keyboard',
  render: () => (
    <Box w="xs">
      <Select defaultValue="starter" placeholder="Choose an option...">
        <SelectOption value="starter" label="Starter" />
        <SelectOption value="growth" label="Growth" />
        <SelectOption value="enterprise" label="Enterprise" />
      </Select>
    </Box>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('combobox');

    // Opened with the pointer, the selected row is active but untouched.
    await userEvent.click(trigger);
    const starter = await screen.findByRole('option', { name: /starter/i });
    const growth = screen.getByRole('option', { name: /growth/i });
    expect(getOptionIconName(starter)).toBe('check');

    // Hovering the selected row offers the clear icon; moving to another row
    // takes it back.
    await userEvent.hover(starter);
    expect(getOptionIconName(starter)).toBe('x');
    await userEvent.hover(growth);
    expect(getOptionIconName(starter)).toBe('check');

    // Once the pointer leaves the options, focus moves to the listbox rather
    // than an option. Arrowing from there must still be treated as navigation.
    await userEvent.hover(starter);
    await userEvent.unhover(starter);
    expect(getOptionIconName(starter)).toBe('check');
    await userEvent.keyboard('{ArrowDown}');
    expect(getOptionIconName(starter)).toBe('x');

    // Arrowing away restores the check.
    await userEvent.keyboard('{ArrowDown}');
    expect(getOptionIconName(starter)).toBe('check');

    // Typeahead is keyboard navigation too.
    await userEvent.keyboard('s');
    expect(getOptionIconName(starter)).toBe('x');

    // Opened with the keyboard, the selected row starts with the clear icon.
    await userEvent.keyboard('{Escape}');
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    const reopened = await screen.findByRole('option', { name: /starter/i });
    expect(getOptionIconName(reopened)).toBe('x');
  },
  parameters: { controls: { disable: true } },
};

export const TestClearIconOverridesCustomIcon: Story = {
  name: 'Test: Clear icon replaces a custom option icon',
  render: () => (
    <Box w="xs">
      <Select defaultValue="email" placeholder="Choose an option...">
        <SelectOption value="email" label="Email" iconLeft="envelope" />
        <SelectOption value="phone" label="Phone" iconLeft="at" />
      </Select>
    </Box>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByRole('combobox'));
    const email = await screen.findByRole('option', { name: /email/i });
    expect(getOptionIconName(email)).toBe('envelope');

    await userEvent.hover(email);
    expect(getOptionIconName(email)).toBe('x');

    await userEvent.hover(screen.getByRole('option', { name: /phone/i }));
    expect(getOptionIconName(email)).toBe('envelope');
  },
  parameters: { controls: { disable: true } },
};

export const TestClearIconResetsOnControlledOpen: Story = {
  name: 'Test: Clear icon resets when open is controlled',
  render: function TestClearIconResetsOnControlledOpenRender() {
    const [open, setOpen] = useState(false);

    return (
      <Box display="grid" gap="12" w="xs">
        {/* Above the Select so the open list never covers them. The Select
            has no `onOpenChange`, so only these buttons open or close it. */}
        <Box display="flex" gap="8">
          <Button onClick={() => setOpen(true)}>Open</Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Box>

        <Select
          open={open}
          defaultValue="growth"
          placeholder="Choose an option..."
        >
          <SelectOption value="starter" label="Starter" />
          <SelectOption value="growth" label="Growth" />
          <SelectOption value="enterprise" label="Enterprise" />
        </Select>
      </Box>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    // The parent opens and closes the Select directly, so none of this goes
    // through the Select's own open handling.
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
    const growth = await screen.findByRole('option', { name: /growth/i });
    expect(getOptionIconName(growth)).toBe('check');

    await userEvent.hover(growth);
    expect(getOptionIconName(growth)).toBe('x');

    await userEvent.click(canvas.getByRole('button', { name: 'Close' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }));

    // Reopened without any fresh interaction with the list.
    const reopened = await screen.findByRole('option', { name: /growth/i });
    expect(getOptionIconName(reopened)).toBe('check');
  },
  parameters: { controls: { disable: true } },
};

export const TestNotClearable: Story = {
  name: 'Test: clearable={false} keeps the value',
  tags: ['!dev', '!autodocs'],
  render: () => (
    <Box w="xs">
      <Select defaultValue="growth" clearable={false}>
        <SelectOption value="starter" label="Starter" />
        <SelectOption value="growth" label="Growth" />
      </Select>
    </Box>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('combobox');

    // Hovering the selected row shows the check, not the clear icon.
    await userEvent.click(trigger);
    const growth = await screen.findByRole('option', { name: /growth/i });
    await userEvent.hover(growth);
    expect(getOptionIconName(growth)).toBe('check');

    // Choosing it again closes the list and keeps the value.
    await userEvent.click(growth);
    expect(trigger).toHaveTextContent('Growth');

    // Backspace does not clear it either.
    trigger.focus();
    await userEvent.keyboard('{Backspace}');
    expect(trigger).toHaveTextContent('Growth');
  },
  parameters: { controls: { disable: true } },
};

export const TestBeforeFollowsSelection: Story = {
  name: 'Test: Trigger shows the selected option before',
  tags: ['!dev', '!autodocs'],
  render: () => (
    <Box w="xs">
      <Select defaultValue="new" clearable={false} aria-label="Status">
        {STATUS_OPTIONS.map((option) => (
          <SelectOption
            key={option.value}
            value={option.value}
            label={option.label}
            before={
              <Icon
                name="clock"
                size="20"
                fill={option.fill}
                data-testid={`status-icon-${option.value}`}
              />
            }
          />
        ))}
      </Select>
    </Box>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('combobox');

    expect(within(trigger).getByTestId('status-icon-new')).toBeInTheDocument();

    await userEvent.click(trigger);
    await userEvent.click(
      await screen.findByRole('option', { name: /resolved/i }),
    );

    expect(
      within(trigger).getByTestId('status-icon-resolved'),
    ).toBeInTheDocument();
    expect(within(trigger).queryByTestId('status-icon-new')).toBeNull();
  },
  parameters: { controls: { disable: true } },
};
