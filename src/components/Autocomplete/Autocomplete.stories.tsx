import type { Meta, StoryObj } from '@storybook/react';

import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { FormField } from '../FormField';
import { Autocomplete } from './Autocomplete';
import { Option } from './Option';

const baseOptions = [
  { value: 'react', label: 'React', description: 'UI library' },
  { value: 'typescript', label: 'TypeScript', description: 'Type safety' },
  { value: 'storybook', label: 'Storybook', description: 'Component workshop' },
  { value: 'panda', label: 'Panda CSS', description: 'Design system styles' },
  { value: 'floating-ui', label: 'Floating UI', description: 'Popup engine' },
  { value: 'vite', label: 'Vite', description: 'Build tooling' },
];

const extendedOptions = [
  ...baseOptions,
  { value: 'vitest', label: 'Vitest', description: 'Unit testing' },
  { value: 'playwright', label: 'Playwright', description: 'Browser testing' },
  { value: 'eslint', label: 'ESLint', description: 'Code analysis' },
  { value: 'prettier', label: 'Prettier', description: 'Code formatting' },
  { value: 'react-router', label: 'React Router', description: 'Routing' },
  { value: 'tanstack-query', label: 'TanStack Query', description: 'Data' },
];

const renderOptions = (options = baseOptions) =>
  options.map((option) => (
    <Option
      key={option.value}
      value={option.value}
      label={option.label}
      description={option.description}
    />
  ));

const meta = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Use Autocomplete when people benefit from filtering a set of options as they type. Matching uses case-insensitive substrings within each option label or description. Focusing the field opens its suggestions and activates the first available option. Use Select for a short fixed list and TextInput for unrestricted text.',
      },
    },
  },
  args: {
    'aria-label': 'Technology',
    placeholder: 'Choose a technology…',
  },
  argTypes: {
    multiple: { control: 'boolean' },
    limitTags: { control: 'number' },
    allowCustomValue: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    invalid: { control: 'boolean' },
    valid: { control: 'boolean' },
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultRender(args) {
    const [value, setValue] = useState<string | null>(null);

    return (
      <Box w="xs">
        <Autocomplete
          {...args}
          multiple={false}
          value={value}
          defaultValue={undefined}
          onValueChange={setValue}
          onChange={undefined}
          name="technology"
        >
          {renderOptions()}
        </Autocomplete>
      </Box>
    );
  },
};

export const Filtering: Story = {
  render: () => (
    <Box w="xs">
      <Autocomplete name="technology-filter" aria-label="Filter technologies">
        {renderOptions()}
      </Autocomplete>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const input = canvas.getByRole('combobox');

    await userEvent.type(input, 'typ');
    await expect(
      body.getByRole('option', { name: /typescript type safety/i }),
    ).toBeInTheDocument();
    await expect(
      body.queryByRole('option', { name: /storybook/i }),
    ).not.toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, 'workshop');
    const descriptionMatch = body.getByRole('option', {
      name: /storybook component workshop/i,
    });
    await expect(
      within(descriptionMatch).getByText('workshop', { selector: 'mark' }),
    ).toBeInTheDocument();
  },
  parameters: { controls: { disable: true } },
};

export const Selected: Story = {
  render: (args) => (
    <Box w="xs">
      <Autocomplete
        {...args}
        multiple={false}
        value={undefined}
        defaultValue="react"
        onValueChange={undefined}
        onChange={undefined}
        name="technology"
      >
        {renderOptions()}
      </Autocomplete>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox', {
      name: 'Technology',
    });
    await expect(input).toHaveValue('');
    await expect(
      canvas.getByRole('button', { name: 'Remove React' }),
    ).toBeInTheDocument();
    await userEvent.click(input);
    await userEvent.keyboard('P');
    await expect(input).toHaveValue('P');
    await expect(
      canvas.queryByRole('button', { name: 'Remove React' }),
    ).not.toBeInTheDocument();
  },
};

export const Multiple: Story = {
  render: function MultipleRender() {
    const [value, setValue] = useState<string[]>([
      'react',
      'typescript',
      'storybook',
    ]);

    return (
      <Box w="sm">
        <Autocomplete
          multiple
          value={value}
          onValueChange={setValue}
          name="stack"
          aria-label="Project stack"
          placeholder="Add technology…"
        >
          {renderOptions()}
        </Autocomplete>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const input = canvas.getByRole('combobox');
    const removeReact = canvas.getByRole('button', {
      name: 'Remove React',
    });

    await userEvent.click(input);
    await expect(body.queryByRole('checkbox')).not.toBeInTheDocument();
    await userEvent.click(removeReact);
    await expect(
      canvas.queryByRole('button', { name: 'Remove React' }),
    ).not.toBeInTheDocument();
    await expect(input).toHaveFocus();
  },
  parameters: { controls: { disable: true } },
};

export const MultipleLongValues: Story = {
  render: () => (
    <Box w="224">
      <Autocomplete
        multiple
        defaultValue={['storybook', 'floating-ui', 'typescript']}
        name="narrow-stack"
        aria-label="Narrow project stack"
        placeholder="Add…"
      >
        {renderOptions()}
      </Autocomplete>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const LimitTags: Story = {
  render: () => (
    <Box w="sm">
      <Autocomplete
        multiple
        limitTags={2}
        defaultValue={[
          'react',
          'typescript',
          'storybook',
          'panda',
          'floating-ui',
        ]}
        name="limited-stack"
        aria-label="Limited project stack"
      >
        {renderOptions()}
      </Autocomplete>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('+3')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('combobox'));
    await expect(canvas.queryByText('+3')).not.toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'Remove Floating UI' }),
    ).toBeInTheDocument();
  },
  parameters: { controls: { disable: true } },
};

export const Sizes: Story = {
  render: () => (
    <Box display="grid" gap="12" w="sm">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Autocomplete
          key={size}
          size={size}
          defaultValue="react"
          name={`technology-${size}`}
          aria-label={`${size} autocomplete`}
        >
          {renderOptions()}
        </Autocomplete>
      ))}
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const ValidationStates: Story = {
  render: () => (
    <Box display="grid" gap="12" w="sm">
      <Autocomplete name="default" aria-label="Default">
        {renderOptions()}
      </Autocomplete>
      <Autocomplete name="valid" aria-label="Valid" valid>
        {renderOptions()}
      </Autocomplete>
      <Autocomplete name="invalid" aria-label="Invalid" invalid>
        {renderOptions()}
      </Autocomplete>
      <Autocomplete name="error" aria-label="Error" error>
        {renderOptions()}
      </Autocomplete>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const Disabled: Story = {
  render: () => (
    <Box w="sm">
      <Autocomplete
        multiple
        disabled
        defaultValue={['react', 'typescript']}
        name="disabled-stack"
        aria-label="Disabled technologies"
      >
        {renderOptions()}
      </Autocomplete>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('combobox')).toBeDisabled();
    await expect(
      canvas.getByRole('button', { name: 'Remove React' }),
    ).toBeDisabled();
  },
  parameters: { controls: { disable: true } },
};

export const DisabledOptions: Story = {
  render: () => (
    <Box w="sm">
      <Autocomplete name="framework" aria-label="Framework">
        <Option value="react" label="React" />
        <Option value="legacy" label="Legacy framework" disabled />
        <Option value="storybook" label="Storybook" />
      </Autocomplete>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const AllowCustomValue: Story = {
  render: () => (
    <Box w="sm">
      <Autocomplete
        multiple
        allowCustomValue
        defaultValue={['react']}
        name="custom-stack"
        aria-label="Technologies"
        placeholder="Add a technology…"
      >
        {renderOptions()}
      </Autocomplete>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.type(input, 'Script');
    const body = within(document.body);
    const options = body.getAllByRole('option');
    await expect(options[0]).toHaveAccessibleName(/add “script”/i);
    await expect(options[1]).toHaveAccessibleName(/typescript type safety/i);
    await userEvent.keyboard('{Enter}');
    const removeScript = canvas.getByRole('button', {
      name: 'Remove Script',
    });
    await expect(removeScript).toBeInTheDocument();
    await expect(removeScript.parentElement).toHaveAttribute(
      'data-new',
      'true',
    );
    await userEvent.type(input, 'React');
    await expect(
      body.queryByRole('option', { name: /add “react”/i }),
    ).not.toBeInTheDocument();
  },
  parameters: { controls: { disable: true } },
};

export const Loading: Story = {
  render: () => (
    <Box w="sm">
      <Autocomplete
        loading
        defaultOpen
        name="loading"
        aria-label="Loading technologies"
      />
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const InfiniteLoading: Story = {
  render: function InfiniteLoadingRender() {
    const [options, setOptions] = useState(() => extendedOptions.slice(0, 8));
    const [loadingMore, setLoadingMore] = useState(false);
    const hasMore = options.length < extendedOptions.length;

    const loadMore = () => {
      if (loadingMore || !hasMore) {
        return;
      }

      setLoadingMore(true);
      window.setTimeout(() => {
        setOptions((currentOptions) =>
          extendedOptions.slice(0, currentOptions.length + 4),
        );
        setLoadingMore(false);
      }, 200);
    };

    return (
      <Box w="sm">
        <Autocomplete
          defaultOpen
          name="infinite"
          aria-label="Technology with more results"
          hasMore={hasMore}
          loadingMore={loadingMore}
          onLoadMore={loadMore}
        >
          {renderOptions(options)}
        </Autocomplete>
      </Box>
    );
  },
  parameters: { controls: { disable: true } },
};

export const EmptyResults: Story = {
  render: () => (
    <Box w="sm">
      <Autocomplete
        defaultInputValue="angular"
        defaultOpen
        name="empty"
        aria-label="Technology with no matches"
      >
        {renderOptions()}
      </Autocomplete>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const ControlledInput: Story = {
  render: function ControlledInputRender() {
    const [inputValue, setInputValue] = useState('');

    return (
      <Box display="grid" gap="8" w="sm">
        <Autocomplete
          inputValue={inputValue}
          onInputValueChange={setInputValue}
          name="controlled-input"
          aria-label="Controlled query"
        >
          {renderOptions()}
        </Autocomplete>
        <Box color="text.subtle">{`Query: ${inputValue || 'empty'}`}</Box>
      </Box>
    );
  },
  parameters: { controls: { disable: true } },
};

export const ControlledOpen: Story = {
  render: function ControlledOpenRender() {
    const [open, setOpen] = useState(false);
    const [openChangeCount, setOpenChangeCount] = useState(0);

    const handleOpenChange = (nextOpen: boolean) => {
      setOpen(nextOpen);
      setOpenChangeCount((currentCount) => currentCount + 1);
    };

    return (
      <Box display="grid" gap="8" w="sm">
        <Button onClick={() => setOpen((currentOpen) => !currentOpen)}>
          Toggle suggestions
        </Button>
        <Autocomplete
          open={open}
          onOpenChange={handleOpenChange}
          name="controlled-open"
          aria-label="Controlled suggestions"
        >
          {renderOptions()}
        </Autocomplete>
        <Box color="text.subtle">{`Open changes: ${openChangeCount}`}</Box>
      </Box>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    await userEvent.click(input);
    await expect(canvas.getByText('Open changes: 1')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    await expect(canvas.getByText('Open changes: 2')).toBeInTheDocument();
    await expect(input).toHaveAttribute('aria-expanded', 'false');
  },
  parameters: { controls: { disable: true } },
};

export const WithFormField: Story = {
  name: 'Ex: With FormField',
  render: () => (
    <Box w="sm">
      <FormField
        label="Primary technology"
        labelFor="primary-technology"
        helpText="Choose the technology this project depends on most."
      >
        <Autocomplete id="primary-technology" name="primaryTechnology">
          {renderOptions()}
        </Autocomplete>
      </FormField>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const TechnologyAssignmentExample: Story = {
  name: 'Ex: Technology Assignment',
  render: () => (
    <Box w="md">
      <FormField
        label="Project stack"
        labelFor="project-stack"
        helpText="Search the supported catalog or create a project-specific value."
      >
        <Autocomplete
          id="project-stack"
          name="projectStack"
          multiple
          allowCustomValue
          defaultValue={['react', 'typescript']}
          placeholder="Add technology…"
        >
          {renderOptions(extendedOptions)}
        </Autocomplete>
      </FormField>
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const KeyboardSelection: Story = {
  name: 'Ex: Keyboard Selection',
  render: () => (
    <Box w="sm">
      <Autocomplete name="keyboard" aria-label="Keyboard selection">
        {renderOptions()}
      </Autocomplete>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.click(input);
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await expect(input).toHaveAttribute('aria-activedescendant');
    await userEvent.keyboard('{Enter}');
    await expect(input).toHaveValue('');
    await expect(
      canvas.getByRole('button', { name: 'Remove React' }),
    ).toBeInTheDocument();
  },
  parameters: { controls: { disable: true } },
};

export const KeyboardTokenEditing: Story = {
  name: 'Ex: Keyboard Token Editing',
  render: () => (
    <Box w="sm">
      <Autocomplete
        multiple
        defaultValue={['react', 'typescript']}
        name="token-editing"
        aria-label="Token editing"
      >
        {renderOptions()}
      </Autocomplete>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    const removeTypeScript = canvas.getByRole('button', {
      name: 'Remove TypeScript',
    });
    await userEvent.click(input);
    await userEvent.keyboard('{Backspace}');
    await expect(removeTypeScript).toHaveFocus();
    await expect(removeTypeScript).toBeInTheDocument();
    await userEvent.keyboard('{Backspace}');
    await expect(
      canvas.queryByRole('button', { name: 'Remove TypeScript' }),
    ).not.toBeInTheDocument();
  },
  parameters: { controls: { disable: true } },
};

export const TestIdReachesPortaledListbox: Story = {
  name: 'Ex: Test Id Reaches The Listbox',
  render: () => (
    <Box w="sm" data-testid="filters">
      <Autocomplete data-testid="technology" aria-label="Technology">
        {renderOptions()}
      </Autocomplete>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    // The test id is written on the root, not on the combobox input, so the
    // chain scope it opens encloses the portal the input only sits beside.
    const root = canvas.getByTestId('technology');
    const input = canvas.getByRole('combobox');

    await expect(root).not.toBe(input);
    await expect(root).toContainElement(input);
    await expect(input).not.toHaveAttribute('data-testid');

    // The input keeps a stable query handle through `data-ds-part`, which the
    // component emits on its own. It marks the trigger only, never the root.
    await expect(input).toHaveAttribute('data-ds-part', 'trigger');
    await expect(root).not.toHaveAttribute('data-ds-part');

    await userEvent.click(input);

    const listbox = await screen.findByRole('listbox');

    // The listbox is portaled out of the root, so only the chain connects them.
    await expect(root.contains(listbox)).toBe(false);

    const chainRoot = listbox.closest('[data-ds-chain]');

    // The chain is built from `data-testid` alone, so the trigger's
    // `data-ds-part` contributes no node to it.
    await expect(chainRoot).toHaveAttribute(
      'data-ds-chain',
      'filters>technology',
    );
    await expect(chainRoot?.getAttribute('data-ds-chain')).not.toContain(
      'trigger',
    );
  },
  parameters: { controls: { disable: true } },
};

export const DsComponentAttribute: Story = {
  name: 'Test: data-ds-component',
  render: () => (
    <Box display="flex" flexDirection="column" gap="8" w="sm">
      <Autocomplete data-testid="ds-default" aria-label="Default technology">
        {renderOptions()}
      </Autocomplete>
      <Autocomplete
        data-testid="ds-override"
        data-ds-component="TechnologyPicker"
        aria-label="Overridden technology"
      >
        {renderOptions()}
      </Autocomplete>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    // Emitted automatically on the root, without an author opting in.
    const root = canvas.getByTestId('ds-default');
    await expect(root).toHaveAttribute('data-ds-component', 'Autocomplete');

    // The combobox input is an inner part of the root, so it stays unmarked.
    const input = canvas.getByRole('combobox', { name: 'Default technology' });
    await expect(input).toHaveAttribute('data-ds-part', 'trigger');
    await expect(input).not.toHaveAttribute('data-ds-component');

    // An explicitly passed value wins, still on the root and not the input.
    const overriddenRoot = canvas.getByTestId('ds-override');
    await expect(overriddenRoot).toHaveAttribute(
      'data-ds-component',
      'TechnologyPicker',
    );
    await expect(
      canvas.getByRole('combobox', { name: 'Overridden technology' }),
    ).not.toHaveAttribute('data-ds-component');

    // The portaled listbox is not the Autocomplete root either.
    await userEvent.click(input);

    const listbox = await screen.findByRole('listbox');

    await expect(listbox).not.toHaveAttribute(
      'data-ds-component',
      'Autocomplete',
    );
    await expect(listbox).not.toHaveAttribute(
      'data-ds-component',
      'TechnologyPicker',
    );
  },
  parameters: { controls: { disable: true } },
};
