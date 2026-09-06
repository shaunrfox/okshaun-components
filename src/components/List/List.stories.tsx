import type { Meta, StoryObj } from '@storybook/react';
import { HStack } from '@styled-system/jsx';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Card } from '../Card';
import { List, ListItem, ListItemGroup } from './index';

const items = [
  { id: 'acct', label: 'Account settings', desc: 'Manage profile and access' },
  { id: 'notify', label: 'Notifications', desc: 'Email, SMS, and push alerts' },
  {
    id: 'audit',
    label: 'Audit history',
    desc: 'Track critical account events',
  },
  { id: 'integrations', label: 'Integrations', desc: 'Connect external tools' },
];

const meta = {
  title: 'Components/List',
  component: List,
  args: {
    children: null as ReactNode,
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

const SingleSelectExample = () => {
  const [selected, setSelected] = useState(items[1]?.id ?? '');

  return (
    <Card variant="flat" minW="2xs">
      <List role="listbox" aria-label="Settings list">
        {items.map((item) => (
          <ListItem
            key={item.id}
            selected={selected === item.id}
            onClick={() => setSelected(item.id)}
            label={item.label}
            description={item.desc}
          />
        ))}
      </List>
    </Card>
  );
};

const MultiSelectCheckboxExample = () => {
  const [selected, setSelected] = useState<string[]>(['notify', 'audit']);

  const toggleItem = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id],
    );
  };

  return (
    <Card variant="flat" minW="2xs">
      <List role="listbox" aria-label="Notification filters">
        {items.map((item) => (
          <ListItem
            key={item.id}
            variant="checkbox"
            selected={selected.includes(item.id)}
            onClick={() => toggleItem(item.id)}
            label={item.label}
            description={item.desc}
          />
        ))}
      </List>
    </Card>
  );
};

const ToggleSelectionExample = () => {
  const [selected, setSelected] = useState<string[]>(['notify', 'audit']);

  const toggleItem = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id],
    );
  };

  return (
    <Card variant="flat" minW="2xs">
      <List role="listbox" aria-label="Toggle list">
        {items.map((item) => (
          <ListItem
            key={item.id}
            variant="toggle"
            selected={selected.includes(item.id)}
            onClick={() => toggleItem(item.id)}
            label={item.label}
            description={item.desc}
          />
        ))}
      </List>
    </Card>
  );
};

const HighlightingExample = () => {
  const query = 'acc';

  return (
    <Card variant="flat" minW="2xs">
      <List
        role="listbox"
        aria-label="Search results"
        query={query}
        highlightMatches
      >
        {items.map((item, index) => (
          <ListItem
            key={item.id}
            selected={index === 0}
            iconAfter="arrow-right"
            label={item.label}
            description={item.desc}
          />
        ))}
      </List>
    </Card>
  );
};

const FloatingSearchBarExample = () => {
  const query = 'acc';

  return (
    <Card variant="flat" minW="lg" maxW="2xl">
      <List
        role="listbox"
        aria-label="Floating search results"
        density="comfortable"
        query={query}
        highlightMatches
      >
        {items.concat(items).map((item, index) => (
          <ListItem
            key={`${item.id}-${index}`}
            selected={index === 0}
            iconAfter="arrow-right"
            label={item.label}
            description={item.desc}
          />
        ))}
      </List>
    </Card>
  );
};

const LinkedItemsExample = () => {
  return (
    <Card variant="flat" minW="2xs">
      <List aria-label="Linked resources">
        <ListItem
          href="https://example.com/docs"
          target="_blank"
          rel="noreferrer"
          iconBefore="link"
          iconBeforeFill="icon"
          iconAfter="arrow-square-out"
          iconAfterFill="icon.decorative.subtle"
          label="Documentation"
          description="Open the public docs"
        />
        <ListItem
          href="https://example.com/status"
          active
          iconBefore="history"
          iconBeforeFill="icon.decorative"
          iconAfter="arrow-right"
          iconAfterFill="icon"
          label="Status page"
          description="Check service health"
        />
        <ListItem
          href="https://example.com/archive"
          disabled
          iconBefore="lock"
          iconBeforeFill="icon.decorative.subtle"
          label="Archived item"
          description="Disabled link state"
        />
      </List>
    </Card>
  );
};

export const Default: Story = {
  args: {},
  render: () => <SingleSelectExample />,
  parameters: { controls: { disable: true } },
};

export const Density: Story = {
  args: {},
  render: () => (
    <HStack gap="12" alignItems="start">
      <Card variant="flat" minW="2xs">
        <List density="compact">
          <ListItemGroup label="Account Settings" divider>
            {items.slice(0, 3).map((item) => (
              <ListItem
                key={`compact-${item.id}`}
                label={item.label}
                description={item.desc}
              />
            ))}
          </ListItemGroup>
          <ListItemGroup label="User Settings">
            <ListItem iconAfter="user" label="Profile" />
            <ListItem iconAfter="arrow-square-out" label="Logout" />
          </ListItemGroup>
        </List>
      </Card>
      <Card variant="flat" minW="2xs">
        <List density="comfortable">
          <ListItemGroup label="Account Settings" divider>
            {items.slice(0, 3).map((item) => (
              <ListItem
                key={`compact-${item.id}`}
                label={item.label}
                description={item.desc}
              />
            ))}
          </ListItemGroup>
          <ListItemGroup label="User Settings">
            <ListItem iconAfter="user" label="Profile" />
            <ListItem iconAfter="arrow-square-out" label="Logout" />
          </ListItemGroup>
        </List>
      </Card>
      <Card variant="flat" minW="2xs">
        <List density="spacious">
          <ListItemGroup label="Account Settings" divider>
            {items.slice(0, 3).map((item) => (
              <ListItem
                key={`compact-${item.id}`}
                label={item.label}
                description={item.desc}
              />
            ))}
          </ListItemGroup>
          <ListItemGroup label="User Settings">
            <ListItem iconAfter="user" label="Profile" />
            <ListItem iconAfter="arrow-square-out" label="Logout" />
          </ListItemGroup>
        </List>
      </Card>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

export const SelectionControls: Story = {
  args: {},
  render: () => (
    <HStack alignItems="start" gap="16">
      <MultiSelectCheckboxExample />
      <ToggleSelectionExample />
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

export const Highlighting: Story = {
  args: {},
  render: () => <HighlightingExample />,
  parameters: { controls: { disable: true } },
};

export const LinkedItems: Story = {
  args: {},
  render: () => <LinkedItemsExample />,
  parameters: { controls: { disable: true } },
};

export const ExFloatingSearchBar: Story = {
  name: 'Ex: Floating search bar',
  args: {},
  render: () => <FloatingSearchBarExample />,
  parameters: { controls: { disable: true } },
};

const RowIdExample = () => (
  <List aria-label="Customers" width="72">
    {[
      ['cus_1042', 'Acme Fabrication'],
      ['cus_1043', 'Bluebird Machining'],
      ['cus_1044', 'Copperline Tooling'],
    ].map(([id, name]) => (
      <ListItem key={id} rowId={id} value={id}>
        {name}
      </ListItem>
    ))}
  </List>
);

export const RowIdentifiers: Story = {
  name: 'Row identifiers',
  args: {},
  render: () => <RowIdExample />,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Pass the internal record key as `rowId`. It renders as `data-row-id` on the item root so tests and interaction logs can name the record. Never use a row index or a customer-facing number.',
      },
    },
  },
};
