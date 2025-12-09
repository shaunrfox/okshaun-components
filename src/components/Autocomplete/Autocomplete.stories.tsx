import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete } from './Autocomplete';
import type { AutocompleteOption } from './types';
import { Box } from '../Box';
import { Text } from '../Text';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

// Sample data
const fruits: AutocompleteOption[] = [
  { id: '1', label: 'Apple' },
  { id: '2', label: 'Banana' },
  { id: '3', label: 'Cherry' },
  { id: '4', label: 'Date' },
  { id: '5', label: 'Elderberry' },
  { id: '6', label: 'Fig' },
  { id: '7', label: 'Grape' },
  { id: '8', label: 'Honeydew' },
];

const countries: AutocompleteOption[] = [
  { id: 'us', label: 'United States', description: 'North America', icon: 'globe' },
  { id: 'uk', label: 'United Kingdom', description: 'Europe', icon: 'globe' },
  { id: 'ca', label: 'Canada', description: 'North America', icon: 'globe' },
  { id: 'au', label: 'Australia', description: 'Oceania', icon: 'globe' },
  { id: 'de', label: 'Germany', description: 'Europe', icon: 'globe' },
  { id: 'fr', label: 'France', description: 'Europe', icon: 'globe' },
  { id: 'jp', label: 'Japan', description: 'Asia', icon: 'globe' },
  { id: 'br', label: 'Brazil', description: 'South America', icon: 'globe' },
];

const users: AutocompleteOption[] = [
  { id: '1', label: 'Alice Johnson', description: 'alice@example.com', icon: 'user' },
  { id: '2', label: 'Bob Smith', description: 'bob@example.com', icon: 'user' },
  { id: '3', label: 'Charlie Brown', description: 'charlie@example.com', icon: 'user' },
  { id: '4', label: 'Diana Prince', description: 'diana@example.com', icon: 'user' },
  { id: '5', label: 'Edward Norton', description: 'edward@example.com', icon: 'user' },
];

// ============================================================================
// BASIC EXAMPLES
// ============================================================================

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [selected, setSelected] = useState<AutocompleteOption | null>(null);

    return (
      <Box w="280">
        <Autocomplete
          name="fruit"
          value={value}
          onChange={setValue}
          options={fruits}
          onSelect={setSelected}
          placeholder="Search fruits..."
        />
        {selected && (
          <Text mt="8" fontSize="14" color="text.subtlest">
            Selected: {selected.label}
          </Text>
        )}
      </Box>
    );
  },
};

export const WithDescriptions: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [selected, setSelected] = useState<AutocompleteOption | null>(null);

    return (
      <Box w="320">
        <Autocomplete
          name="country"
          value={value}
          onChange={setValue}
          options={countries}
          onSelect={setSelected}
          placeholder="Search countries..."
        />
        {selected && (
          <Text mt="8" fontSize="14" color="text.subtlest">
            Selected: {selected.label} ({selected.description})
          </Text>
        )}
      </Box>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Box w="320">
        <Autocomplete
          name="user"
          value={value}
          onChange={setValue}
          options={users}
          onSelect={(option) => setValue(option.label)}
          placeholder="Search users..."
        />
      </Box>
    );
  },
};

// ============================================================================
// CONTROLLED STATE
// ============================================================================

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleSelect = (option: AutocompleteOption) => {
      setValue(option.label);
      setSelectedId(option.id);
    };

    const handleClear = () => {
      setValue('');
      setSelectedId(null);
    };

    return (
      <Box w="280">
        <Autocomplete
          name="controlled"
          value={value}
          onChange={setValue}
          options={fruits}
          onSelect={handleSelect}
          placeholder="Type to search..."
        />
        <Box mt="12" display="flex" gap="8" alignItems="center">
          <Text fontSize="14" color="text.subtlest">
            Value: "{value}" | ID: {selectedId ?? 'none'}
          </Text>
          {value && (
            <Text
              as="button"
              fontSize="14"
              color="text.brand"
              cursor="pointer"
              onClick={handleClear}
            >
              Clear
            </Text>
          )}
        </Box>
      </Box>
    );
  },
};

// ============================================================================
// CUSTOM FILTER
// ============================================================================

export const CustomFilter: Story = {
  render: () => {
    const [value, setValue] = useState('');

    // Filter by label OR description
    const customFilter = (option: AutocompleteOption, inputValue: string) => {
      const search = inputValue.toLowerCase();
      return (
        option.label.toLowerCase().includes(search) ||
        (option.description?.toLowerCase().includes(search) ?? false)
      );
    };

    return (
      <Box w="320">
        <Text mb="8" fontSize="14" color="text.subtlest">
          Try searching by region (e.g., "Europe", "Asia")
        </Text>
        <Autocomplete
          name="custom-filter"
          value={value}
          onChange={setValue}
          options={countries}
          onSelect={(option) => setValue(option.label)}
          placeholder="Search by country or region..."
          filterFn={customFilter}
        />
      </Box>
    );
  },
};

// ============================================================================
// NO RESULTS
// ============================================================================

export const NoResults: Story = {
  render: () => {
    const [value, setValue] = useState('xyz');

    return (
      <Box w="280">
        <Autocomplete
          name="no-results"
          value={value}
          onChange={setValue}
          options={fruits}
          onSelect={(option) => setValue(option.label)}
          placeholder="Search fruits..."
          noResultsMessage="No matching fruits found"
        />
      </Box>
    );
  },
};

export const CustomNoResults: Story = {
  render: () => {
    const [value, setValue] = useState('xyz');

    return (
      <Box w="280">
        <Autocomplete
          name="custom-no-results"
          value={value}
          onChange={setValue}
          options={fruits}
          onSelect={(option) => setValue(option.label)}
          placeholder="Search fruits..."
          noResultsMessage={`No results for "${value}". Try a different search.`}
        />
      </Box>
    );
  },
};

// ============================================================================
// DISABLED OPTIONS
// ============================================================================

export const DisabledOptions: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const optionsWithDisabled: AutocompleteOption[] = [
      { id: '1', label: 'Available Option 1' },
      { id: '2', label: 'Disabled Option', disabled: true },
      { id: '3', label: 'Available Option 2' },
      { id: '4', label: 'Another Disabled', disabled: true },
      { id: '5', label: 'Available Option 3' },
    ];

    return (
      <Box w="280">
        <Autocomplete
          name="disabled-options"
          value={value}
          onChange={setValue}
          options={optionsWithDisabled}
          onSelect={(option) => setValue(option.label)}
          placeholder="Some options are disabled..."
        />
      </Box>
    );
  },
};

// ============================================================================
// STATES
// ============================================================================

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Box w="280">
        <Autocomplete
          name="disabled"
          value={value}
          onChange={setValue}
          options={fruits}
          onSelect={(option) => setValue(option.label)}
          placeholder="Disabled autocomplete"
          disabled
        />
      </Box>
    );
  },
};

export const Error: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Box w="280">
        <Autocomplete
          name="error"
          value={value}
          onChange={setValue}
          options={fruits}
          onSelect={(option) => setValue(option.label)}
          placeholder="Error state"
          error
        />
      </Box>
    );
  },
};

// ============================================================================
// SIZE VARIANTS
// ============================================================================

export const SizeCompact: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Box w="280">
        <Autocomplete
          name="compact"
          value={value}
          onChange={setValue}
          options={fruits}
          onSelect={(option) => setValue(option.label)}
          placeholder="Compact size"
          size="compact"
        />
      </Box>
    );
  },
};

export const SizeComfortable: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Box w="320">
        <Autocomplete
          name="comfortable"
          value={value}
          onChange={setValue}
          options={countries}
          onSelect={(option) => setValue(option.label)}
          placeholder="Comfortable size"
          size="comfortable"
        />
      </Box>
    );
  },
};

// ============================================================================
// REAL-WORLD EXAMPLE
// ============================================================================

export const UserSearch: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [selectedUser, setSelectedUser] = useState<AutocompleteOption | null>(null);

    const handleSelect = (option: AutocompleteOption) => {
      setValue(option.label);
      setSelectedUser(option);
    };

    return (
      <Box w="320">
        <Text mb="8" fontWeight="medium">
          Assign to user
        </Text>
        <Autocomplete
          name="user-search"
          value={value}
          onChange={setValue}
          options={users}
          onSelect={handleSelect}
          placeholder="Search by name or email..."
          filterFn={(option, input) => {
            const search = input.toLowerCase();
            return (
              option.label.toLowerCase().includes(search) ||
              (option.description?.toLowerCase().includes(search) ?? false)
            );
          }}
        />
        {selectedUser && (
          <Box
            mt="12"
            p="12"
            bg="surface.sunken"
            borderRadius="8"
            display="flex"
            gap="8"
            alignItems="center"
          >
            <Text fontSize="14">
              Assigned to: <strong>{selectedUser.label}</strong>
            </Text>
          </Box>
        )}
      </Box>
    );
  },
};
