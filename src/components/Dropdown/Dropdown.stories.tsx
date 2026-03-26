import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Box } from '../Box';
import { MenuGroup, MenuItem } from '../Menu';
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
      <MenuItem label="Edit" onClick={() => console.log('Edit')} />
      <MenuItem label="Duplicate" onClick={() => console.log('Duplicate')} />
      <MenuItem label="Delete" onClick={() => console.log('Delete')} />
    </Dropdown>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Dropdown label="Actions">
      <MenuItem label="Edit" iconBefore="edit" onClick={() => {}} />
      <MenuItem label="Copy" iconBefore="copy" onClick={() => {}} />
      <MenuItem label="Delete" iconBefore="trash" onClick={() => {}} />
    </Dropdown>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <Dropdown label="Create New">
      <MenuItem
        label="New Document"
        description="Create a blank document"
        iconBefore="file"
        onClick={() => {}}
      />
      <MenuItem
        label="New Spreadsheet"
        description="Create a blank spreadsheet"
        iconBefore="view-table"
        onClick={() => {}}
      />
      <MenuItem
        label="New Presentation"
        description="Create a blank presentation"
        iconBefore="monitor"
        onClick={() => {}}
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
            label="Name"
            selected={selected === 'name'}
            onClick={() => setSelected('name')}
          />
          <MenuItem
            label="Date"
            selected={selected === 'date'}
            onClick={() => setSelected('date')}
          />
          <MenuItem
            label="Size"
            selected={selected === 'size'}
            onClick={() => setSelected('size')}
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
            label="Name"
            variant="checkbox"
            selected={selected.has('name')}
            onClick={() => toggle('name')}
          />
          <MenuItem
            label="Date"
            variant="checkbox"
            selected={selected.has('date')}
            onClick={() => toggle('date')}
          />
          <MenuItem
            label="Size"
            variant="checkbox"
            selected={selected.has('size')}
            onClick={() => toggle('size')}
          />
          <MenuItem
            label="Type"
            variant="checkbox"
            selected={selected.has('type')}
            onClick={() => toggle('type')}
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
      <MenuGroup label="Account" divider>
        <MenuItem label="Profile" iconBefore="user" onClick={() => {}} />
        <MenuItem label="Settings" iconBefore="settings" onClick={() => {}} />
      </MenuGroup>
      <MenuGroup label="Actions">
        <MenuItem label="Help" iconBefore="help" onClick={() => {}} />
        <MenuItem
          label="Log Out"
          iconBefore="arrow-square-out"
          onClick={() => {}}
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
      <MenuItem label="Option 1" onClick={() => {}} />
      <MenuItem label="Option 2" onClick={() => {}} />
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
        <MenuItem label="Item 1" onClick={() => {}} />
        <MenuItem label="Item 2" onClick={() => {}} />
      </Dropdown>

      <Dropdown label="Bottom End" placement="bottom-end">
        <MenuItem label="Item 1" onClick={() => {}} />
        <MenuItem label="Item 2" onClick={() => {}} />
      </Dropdown>

      <Dropdown label="Top Start" placement="top-start">
        <MenuItem label="Item 1" onClick={() => {}} />
        <MenuItem label="Item 2" onClick={() => {}} />
      </Dropdown>

      <Dropdown label="Right Start" placement="right-start">
        <MenuItem label="Item 1" onClick={() => {}} />
        <MenuItem label="Item 2" onClick={() => {}} />
      </Dropdown>
    </Box>
  ),
};

// ============================================================================
// SIZE VARIANTS
// ============================================================================

export const DensityCompact: Story = {
  render: () => (
    <Dropdown label="Compact" density="compact" triggerProps={{ size: 'sm' }}>
      <MenuItem label="Option 1" onClick={() => {}} />
      <MenuItem label="Option 2" onClick={() => {}} />
      <MenuItem label="Option 3" onClick={() => {}} />
    </Dropdown>
  ),
};

export const DensityComfortable: Story = {
  render: () => (
    <Dropdown
      label="Comfortable"
      density="comfortable"
      triggerProps={{ size: 'lg' }}
    >
      <MenuItem
        label="Option 1"
        description="First option"
        onClick={() => {}}
      />
      <MenuItem
        label="Option 2"
        description="Second option"
        onClick={() => {}}
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
        iconBefore="square-add"
        onClick={() => {}}
      />
      <MenuItem label="Import Data" iconBefore="upload" onClick={() => {}} />
      <MenuItem label="Generate Report" iconBefore="file" onClick={() => {}} />
    </Dropdown>
  ),
};
