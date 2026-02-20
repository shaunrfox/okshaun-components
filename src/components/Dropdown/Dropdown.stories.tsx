import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Box } from '../Box';
import { MenuDivider, MenuGroup, MenuItem } from '../Menu';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// ============================================================================
// BASIC EXAMPLES
// ============================================================================

export const Default: Story = {
  render: () => (
    <Dropdown label="Options">
      <MenuItem label="Edit" onSelect={() => console.log('Edit')} index={0} />
      <MenuItem
        label="Duplicate"
        onSelect={() => console.log('Duplicate')}
        index={1}
      />
      <MenuItem
        label="Delete"
        onSelect={() => console.log('Delete')}
        index={2}
      />
    </Dropdown>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Dropdown label="Actions">
      <MenuItem label="Edit" iconLeft="edit" onSelect={() => {}} index={0} />
      <MenuItem label="Copy" iconLeft="copy" onSelect={() => {}} index={1} />
      <MenuItem label="Delete" iconLeft="trash" onSelect={() => {}} index={2} />
    </Dropdown>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <Dropdown label="Create New">
      <MenuItem
        label="New Document"
        description="Create a blank document"
        iconLeft="file"
        onSelect={() => {}}
        index={0}
      />
      <MenuItem
        label="New Spreadsheet"
        description="Create a blank spreadsheet"
        iconLeft="view-table"
        onSelect={() => {}}
        index={1}
      />
      <MenuItem
        label="New Presentation"
        description="Create a blank presentation"
        iconLeft="monitor"
        onSelect={() => {}}
        index={2}
      />
    </Dropdown>
  ),
};

// ============================================================================
// SINGLE SELECT
// ============================================================================

export const SingleSelect: Story = {
  render: () => {
    const Component = () => {
      const [selected, setSelected] = useState<string>('name');

      return (
        <Dropdown label={`Sort by: ${selected}`}>
          <MenuItem
            type="single-select"
            label="Name"
            selected={selected === 'name'}
            onSelect={() => setSelected('name')}
            index={0}
          />
          <MenuItem
            type="single-select"
            label="Date"
            selected={selected === 'date'}
            onSelect={() => setSelected('date')}
            index={1}
          />
          <MenuItem
            type="single-select"
            label="Size"
            selected={selected === 'size'}
            onSelect={() => setSelected('size')}
            index={2}
          />
        </Dropdown>
      );
    };
    return <Component />;
  },
};

// ============================================================================
// MULTI SELECT
// ============================================================================

export const MultiSelect: Story = {
  render: () => {
    const Component = () => {
      const [selected, setSelected] = useState<Set<string>>(new Set(['name']));

      const toggle = (value: string) => {
        setSelected((prev) => {
          const next = new Set(prev);
          if (next.has(value)) {
            next.delete(value);
          } else {
            next.add(value);
          }
          return next;
        });
      };

      return (
        <Dropdown label={`Columns (${selected.size})`}>
          <MenuItem
            type="multi-select"
            label="Name"
            selectionIndicator="checkbox"
            selected={selected.has('name')}
            onSelect={() => toggle('name')}
            index={0}
          />
          <MenuItem
            type="multi-select"
            label="Date"
            selectionIndicator="checkbox"
            selected={selected.has('date')}
            onSelect={() => toggle('date')}
            index={1}
          />
          <MenuItem
            type="multi-select"
            label="Size"
            selectionIndicator="checkbox"
            selected={selected.has('size')}
            onSelect={() => toggle('size')}
            index={2}
          />
          <MenuItem
            type="multi-select"
            label="Type"
            selectionIndicator="checkbox"
            selected={selected.has('type')}
            onSelect={() => toggle('type')}
            index={3}
          />
        </Dropdown>
      );
    };
    return <Component />;
  },
};

// ============================================================================
// WITH GROUPS AND DIVIDERS
// ============================================================================

export const WithGroups: Story = {
  render: () => (
    <Dropdown label="User Menu">
      <MenuGroup label="Account">
        <MenuItem
          label="Profile"
          iconLeft="user"
          onSelect={() => {}}
          index={0}
        />
        <MenuItem
          label="Settings"
          iconLeft="settings"
          onSelect={() => {}}
          index={1}
        />
      </MenuGroup>
      <MenuDivider />
      <MenuGroup label="Actions">
        <MenuItem label="Help" iconLeft="help" onSelect={() => {}} index={2} />
        <MenuItem
          label="Log Out"
          iconLeft="arrow-square-out"
          onSelect={() => {}}
          index={3}
        />
      </MenuGroup>
    </Dropdown>
  ),
};

// ============================================================================
// DISABLED
// ============================================================================

export const Disabled: Story = {
  render: () => (
    <Dropdown label="Disabled" disabled>
      <MenuItem label="Option 1" onSelect={() => {}} index={0} />
      <MenuItem label="Option 2" onSelect={() => {}} index={1} />
    </Dropdown>
  ),
};

// ============================================================================
// PLACEMENT VARIANTS
// ============================================================================

export const PlacementVariants: Story = {
  render: () => (
    <Box display="flex" gap="16" flexWrap="wrap" p="80">
      <Dropdown label="Bottom Start" placement="bottom-start">
        <MenuItem label="Item 1" onSelect={() => {}} />
        <MenuItem label="Item 2" onSelect={() => {}} />
      </Dropdown>

      <Dropdown label="Bottom End" placement="bottom-end">
        <MenuItem label="Item 1" onSelect={() => {}} />
        <MenuItem label="Item 2" onSelect={() => {}} />
      </Dropdown>

      <Dropdown label="Top Start" placement="top-start">
        <MenuItem label="Item 1" onSelect={() => {}} />
        <MenuItem label="Item 2" onSelect={() => {}} />
      </Dropdown>

      <Dropdown label="Right Start" placement="right-start">
        <MenuItem label="Item 1" onSelect={() => {}} />
        <MenuItem label="Item 2" onSelect={() => {}} />
      </Dropdown>
    </Box>
  ),
};

// ============================================================================
// SIZE VARIANTS
// ============================================================================

export const PackingCompact: Story = {
  render: () => (
    <Dropdown
      label="Compact"
      packing="compact"
      triggerProps={{ size: 'small' }}
    >
      <MenuItem label="Option 1" onSelect={() => {}} index={0} />
      <MenuItem label="Option 2" onSelect={() => {}} index={1} />
      <MenuItem label="Option 3" onSelect={() => {}} index={2} />
    </Dropdown>
  ),
};

export const PackingComfortable: Story = {
  render: () => (
    <Dropdown
      label="Comfortable"
      packing="comfortable"
      triggerProps={{ size: 'lg' }}
    >
      <MenuItem
        label="Option 1"
        description="First option"
        onSelect={() => {}}
        index={0}
      />
      <MenuItem
        label="Option 2"
        description="Second option"
        onSelect={() => {}}
        index={1}
      />
    </Dropdown>
  ),
};

// ============================================================================
// TRIGGER CUSTOMIZATION
// ============================================================================

export const CustomTrigger: Story = {
  render: () => (
    <Dropdown
      label="Primary Action"
      triggerProps={{ appearance: 'primary', size: 'lg' }}
    >
      <MenuItem
        label="Create Project"
        iconLeft="square-add"
        onSelect={() => {}}
        index={0}
      />
      <MenuItem
        label="Import Data"
        iconLeft="upload"
        onSelect={() => {}}
        index={1}
      />
      <MenuItem
        label="Generate Report"
        iconLeft="file"
        onSelect={() => {}}
        index={2}
      />
    </Dropdown>
  ),
};
