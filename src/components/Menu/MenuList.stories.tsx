import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box';
import { MenuList } from './MenuList';
import { MenuListDivider } from './MenuListDivider';
import { MenuListGroup } from './MenuListGroup';
import { MenuListItem } from './MenuListItem';

const meta: Meta<typeof MenuList> = {
  title: 'Components/MenuList',
  component: MenuList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MenuList>;

export const Basic: Story = {
  render: () => (
    <MenuList>
      <MenuListItem label="Edit" iconLeft="edit" />
      <MenuListItem label="Duplicate" iconLeft="copy" active />
      <MenuListItem label="Delete" iconLeft="trash" disabled />
      <MenuListItem
        label="Documentation"
        description="Updated 2 days ago"
        iconLeft="file"
        highlightMatch="doc"
      />
    </MenuList>
  ),
};

export const SelectionIndicators: Story = {
  render: () => (
    <MenuList indicatorPosition="right">
      <MenuListItem type="single-select" label="Option A" selected />
      <MenuListItem type="single-select" label="Option B" />
      <MenuListItem
        type="multi-select"
        label="Option C"
        selectionIndicator="checkbox"
        selected
      />
    </MenuList>
  ),
};

export const GroupsAndDividers: Story = {
  render: () => (
    <Box display="flex" gap="24">
      <MenuList>
        <MenuListGroup label="Account">
          <MenuListItem label="Profile" iconLeft="user" />
          <MenuListItem label="Settings" iconLeft="settings" />
        </MenuListGroup>
        <MenuListDivider />
        <MenuListGroup label="Actions">
          <MenuListItem label="Help" iconLeft="help" />
          <MenuListItem label="Log Out" iconLeft="arrow-square-out" />
        </MenuListGroup>
      </MenuList>

      <MenuList size="compact">
        <MenuListItem label="Compact One" size="compact" />
        <MenuListItem label="Compact Two" size="compact" active />
        <MenuListItem label="Compact Three" size="compact" disabled />
      </MenuList>
    </Box>
  ),
};
