import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';
import { MenuTrigger } from './MenuTrigger';
import { MenuItem } from './MenuItem';
import { MenuDivider } from './MenuDivider';
import { MenuGroup } from './MenuGroup';
import { Button } from '../Button';
import { Box } from '../Box';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Menu>;

// ============================================================================
// ACTION TYPE STORIES
// ============================================================================

export const ActionDefault: Story = {
  render: () => {
    const Component = () => {
    const [open, setOpen] = useState(false);

    return (
      <Menu open={open} onOpenChange={setOpen}>
        <MenuTrigger>
          <Button>Open Menu</Button>
        </MenuTrigger>
        <MenuItem label="Edit" onSelect={() => console.log('Edit clicked')} />
        <MenuItem
          label="Duplicate"
          onSelect={() => console.log('Duplicate clicked')}
        />
        <MenuItem
          label="Delete"
          onSelect={() => console.log('Delete clicked')}
        />
      </Menu>
    );
    };
    return <Component />;
  },
};

export const ActionWithLeftIcon: Story = {
  render: () => {
    const Component = () => {
    const [open, setOpen] = useState(false);

    return (
      <Menu open={open} onOpenChange={setOpen}>
        <MenuTrigger>
          <Button>Actions</Button>
        </MenuTrigger>
        <MenuItem label="Edit" iconLeft="edit" onSelect={() => {}} />
        <MenuItem label="Copy" iconLeft="copy" onSelect={() => {}} />
        <MenuItem label="Delete" iconLeft="trash" onSelect={() => {}} />
      </Menu>
    );
    };
    return <Component />;
  },
};

export const ActionWithRightIcon: Story = {
  render: () => {
    const Component = () => {
    const [open, setOpen] = useState(false);

    return (
      <Menu open={open} onOpenChange={setOpen}>
        <MenuTrigger>
          <Button>Navigate</Button>
        </MenuTrigger>
        <MenuItem
          label="Settings"
          iconRight="chevron-right"
          onSelect={() => {}}
        />
        <MenuItem
          label="Profile"
          iconRight="chevron-right"
          onSelect={() => {}}
        />
        <MenuItem
          label="Help"
          iconRight="arrow-square-out"
          onSelect={() => {}}
        />
      </Menu>
    );
    };
    return <Component />;
  },
};

export const ActionWithDescription: Story = {
  render: () => {
    const Component = () => {
    const [open, setOpen] = useState(false);

    return (
      <Menu open={open} onOpenChange={setOpen}>
        <MenuTrigger>
          <Button>Create New</Button>
        </MenuTrigger>
        <MenuItem
          label="New Document"
          description="Create a blank document"
          onSelect={() => {}}
        />
        <MenuItem
          label="New Spreadsheet"
          description="Create a blank spreadsheet"
          onSelect={() => {}}
        />
        <MenuItem
          label="New Presentation"
          description="Create a blank presentation"
          onSelect={() => {}}
        />
      </Menu>
    );
    };
    return <Component />;
  },
};

export const ActionWithDescriptionAndIcons: Story = {
  render: () => {
    const Component = () => {
    const [open, setOpen] = useState(false);

    return (
      <Menu open={open} onOpenChange={setOpen}>
        <MenuTrigger>
          <Button>Create New</Button>
        </MenuTrigger>
        <MenuItem
          label="New Document"
          description="Create a blank document"
          iconLeft="file"
          iconRight="chevron-right"
          onSelect={() => {}}
        />
        <MenuItem
          label="Import File"
          description="Import from your computer"
          iconLeft="upload"
          onSelect={() => {}}
        />
        <MenuItem
          label="Templates"
          description="Start from a template"
          iconLeft="files"
          iconRight="chevron-right"
          onSelect={() => {}}
        />
      </Menu>
    );
    };
    return <Component />;
  },
};

// ============================================================================
// SINGLE-SELECT TYPE STORIES
// ============================================================================

export const SingleSelectCheckmark: Story = {
  render: () => {
    const Component = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string>('name');

    return (
      <Menu open={open} onOpenChange={setOpen}>
        <MenuTrigger>
          <Button>Sort by: {selected}</Button>
        </MenuTrigger>
        <MenuItem
          type="single-select"
          label="Name"
          selected={selected === 'name'}
          onSelect={() => setSelected('name')}
          index={0}
        />
        <MenuItem
          type="single-select"
          label="Date Created"
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
      </Menu>
    );
    };
    return <Component />;
  },
};

export const SingleSelectWithDescription: Story = {
  render: () => {
    const Component = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string>('standard');

    return (
      <Menu open={open} onOpenChange={setOpen}>
        <MenuTrigger>
          <Button>Shipping Method</Button>
        </MenuTrigger>
        <MenuItem
          type="single-select"
          label="Standard Shipping"
          description="5-7 business days"
          selected={selected === 'standard'}
          onSelect={() => setSelected('standard')}
          index={0}
        />
        <MenuItem
          type="single-select"
          label="Express Shipping"
          description="2-3 business days"
          selected={selected === 'express'}
          onSelect={() => setSelected('express')}
          index={1}
        />
        <MenuItem
          type="single-select"
          label="Overnight"
          description="Next business day"
          selected={selected === 'overnight'}
          onSelect={() => setSelected('overnight')}
          index={2}
        />
      </Menu>
    );
    };
    return <Component />;
  },
};

export const SingleSelectWithIcons: Story = {
  render: () => {
    const Component = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string>('grid');

    return (
      <Menu open={open} onOpenChange={setOpen}>
        <MenuTrigger>
          <Button>View</Button>
        </MenuTrigger>
        <MenuItem
          type="single-select"
          label="Grid View"
          iconLeft="view-grid"
          selected={selected === 'grid'}
          onSelect={() => setSelected('grid')}
          index={0}
        />
        <MenuItem
          type="single-select"
          label="List View"
          iconLeft="view-rows"
          selected={selected === 'list'}
          onSelect={() => setSelected('list')}
          index={1}
        />
        <MenuItem
          type="single-select"
          label="Table View"
          iconLeft="view-table"
          selected={selected === 'table'}
          onSelect={() => setSelected('table')}
          index={2}
        />
      </Menu>
    );
    };
    return <Component />;
  },
};

// ============================================================================
// MULTI-SELECT TYPE STORIES
// ============================================================================

export const MultiSelectCheckbox: Story = {
  render: () => {
    const Component = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Set<string>>(
      new Set(['name', 'date']),
    );

    const toggleSelection = (value: string) => {
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
      <Menu open={open} onOpenChange={setOpen}>
        <MenuTrigger>
          <Button>Show Columns ({selected.size})</Button>
        </MenuTrigger>
        <MenuItem
          type="multi-select"
          label="Name"
          selectionIndicator="checkbox"
          selected={selected.has('name')}
          onSelect={() => toggleSelection('name')}
          index={0}
        />
        <MenuItem
          type="multi-select"
          label="Date Modified"
          selectionIndicator="checkbox"
          selected={selected.has('date')}
          onSelect={() => toggleSelection('date')}
          index={1}
        />
        <MenuItem
          type="multi-select"
          label="Size"
          selectionIndicator="checkbox"
          selected={selected.has('size')}
          onSelect={() => toggleSelection('size')}
          index={2}
        />
        <MenuItem
          type="multi-select"
          label="Type"
          selectionIndicator="checkbox"
          selected={selected.has('type')}
          onSelect={() => toggleSelection('type')}
          index={3}
        />
      </Menu>
    );
    };
    return <Component />;
  },
};

export const MultiSelectWithDescriptions: Story = {
  render: () => {
    const Component = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Set<string>>(new Set(['email']));

    const toggleSelection = (value: string) => {
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
      <Menu open={open} onOpenChange={setOpen}>
        <MenuTrigger>
          <Button>Notifications</Button>
        </MenuTrigger>
        <MenuItem
          type="multi-select"
          label="Email Notifications"
          description="Receive updates via email"
          selectionIndicator="checkbox"
          selected={selected.has('email')}
          onSelect={() => toggleSelection('email')}
          index={0}
        />
        <MenuItem
          type="multi-select"
          label="Push Notifications"
          description="Receive mobile push alerts"
          selectionIndicator="checkbox"
          selected={selected.has('push')}
          onSelect={() => toggleSelection('push')}
          index={1}
        />
        <MenuItem
          type="multi-select"
          label="SMS Notifications"
          description="Receive text messages"
          selectionIndicator="checkbox"
          selected={selected.has('sms')}
          onSelect={() => toggleSelection('sms')}
          index={2}
        />
      </Menu>
    );
    };
    return <Component />;
  },
};

// ============================================================================
// GROUPS AND DIVIDERS
// ============================================================================

export const WithGroups: Story = {
  render: () => {
    const Component = () => {
    const [open, setOpen] = useState(false);

    return (
      <Menu open={open} onOpenChange={setOpen}>
        <MenuTrigger>
          <Button>User Menu</Button>
        </MenuTrigger>
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
          <MenuItem
            label="Help"
            iconLeft="help"
            onSelect={() => {}}
            index={2}
          />
          <MenuItem
            label="Log Out"
            iconLeft="arrow-square-out"
            onSelect={() => {}}
            index={3}
          />
        </MenuGroup>
      </Menu>
    );
    };
    return <Component />;
  },
};

export const WithDividers: Story = {
  render: () => {
    const Component = () => {
    const [open, setOpen] = useState(false);

    return (
      <Menu open={open} onOpenChange={setOpen}>
        <MenuTrigger>
          <Button>File</Button>
        </MenuTrigger>
        <MenuItem
          label="New"
          iconLeft="file-add"
          onSelect={() => {}}
          index={0}
        />
        <MenuItem label="Open" iconLeft="file" onSelect={() => {}} index={1} />
        <MenuItem label="Save" onSelect={() => {}} index={2} />
        <MenuDivider />
        <MenuItem
          label="Export"
          iconLeft="export"
          onSelect={() => {}}
          index={3}
        />
        <MenuItem
          label="Print"
          iconLeft="printer"
          onSelect={() => {}}
          index={4}
        />
        <MenuDivider />
        <MenuItem label="Close" onSelect={() => {}} index={5} />
      </Menu>
    );
    };
    return <Component />;
  },
};

// ============================================================================
// DISABLED ITEMS
// ============================================================================

export const WithDisabledItems: Story = {
  render: () => {
    const Component = () => {
    const [open, setOpen] = useState(false);

    return (
      <Menu open={open} onOpenChange={setOpen}>
        <MenuTrigger>
          <Button>Edit</Button>
        </MenuTrigger>
        <MenuItem label="Cut" iconLeft="cut" onSelect={() => {}} index={0} />
        <MenuItem label="Copy" iconLeft="copy" onSelect={() => {}} index={1} />
        <MenuItem
          label="Paste"
          iconLeft="clipboard"
          disabled
          onSelect={() => {}}
          index={2}
        />
        <MenuDivider />
        <MenuItem
          label="Undo"
          iconLeft="arrow-undo"
          disabled
          onSelect={() => {}}
          index={3}
        />
        <MenuItem
          label="Redo"
          iconLeft="arrow-redo"
          disabled
          onSelect={() => {}}
          index={4}
        />
      </Menu>
    );
    };
    return <Component />;
  },
};

// ============================================================================
// HIGHLIGHT MATCH (AUTOCOMPLETE)
// ============================================================================

export const HighlightMatch: Story = {
  render: () => {
    const Component = () => {
    const [open, setOpen] = useState(false);
    const searchTerm = 'doc';

    return (
      <Menu open={open} onOpenChange={setOpen}>
        <MenuTrigger>
          <Button>Search Results for "{searchTerm}"</Button>
        </MenuTrigger>
        <MenuItem
          label="Document.pdf"
          description="Modified yesterday"
          highlightMatch={searchTerm}
          onSelect={() => {}}
          index={0}
        />
        <MenuItem
          label="Documentation.md"
          description="Modified 2 days ago"
          highlightMatch={searchTerm}
          onSelect={() => {}}
          index={1}
        />
        <MenuItem
          label="My Documents"
          description="Folder"
          iconLeft="file"
          highlightMatch={searchTerm}
          onSelect={() => {}}
          index={2}
        />
      </Menu>
    );
    };
    return <Component />;
  },
};

// ============================================================================
// SIZE VARIANTS
// ============================================================================

export const SizeCompact: Story = {
  render: () => {
    const Component = () => {
    const [open, setOpen] = useState(false);

    return (
      <Menu open={open} onOpenChange={setOpen} size="compact">
        <MenuTrigger>
          <Button size="sm">Compact Menu</Button>
        </MenuTrigger>
        <MenuItem label="Option 1" onSelect={() => {}} index={0} />
        <MenuItem label="Option 2" onSelect={() => {}} index={1} />
        <MenuItem label="Option 3" onSelect={() => {}} index={2} />
      </Menu>
    );
    };
    return <Component />;
  },
};

export const SizeComfortable: Story = {
  render: () => {
    const Component = () => {
    const [open, setOpen] = useState(false);

    return (
      <Menu open={open} onOpenChange={setOpen} size="comfortable">
        <MenuTrigger>
          <Button size="lg">Comfortable Menu</Button>
        </MenuTrigger>
        <MenuItem
          label="Option 1"
          description="First option with more space"
          onSelect={() => {}}
          index={0}
        />
        <MenuItem
          label="Option 2"
          description="Second option with more space"
          onSelect={() => {}}
          index={1}
        />
        <MenuItem
          label="Option 3"
          description="Third option with more space"
          onSelect={() => {}}
          index={2}
        />
      </Menu>
    );
    };
    return <Component />;
  },
};

// ============================================================================
// INDICATOR POSITION
// ============================================================================

export const IndicatorRight: Story = {
  render: () => {
    const Component = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string>('option1');

    return (
      <Menu open={open} onOpenChange={setOpen} indicatorPosition="right">
        <MenuTrigger>
          <Button>Indicator Right</Button>
        </MenuTrigger>
        <MenuItem
          type="single-select"
          label="Option 1"
          selected={selected === 'option1'}
          onSelect={() => setSelected('option1')}
          index={0}
        />
        <MenuItem
          type="single-select"
          label="Option 2"
          selected={selected === 'option2'}
          onSelect={() => setSelected('option2')}
          index={1}
        />
        <MenuItem
          type="single-select"
          label="Option 3"
          selected={selected === 'option3'}
          onSelect={() => setSelected('option3')}
          index={2}
        />
      </Menu>
    );
    };
    return <Component />;
  },
};

// ============================================================================
// PLACEMENT OPTIONS
// ============================================================================

export const PlacementVariants: Story = {
  render: () => {
    const Component = () => {
    const [openTop, setOpenTop] = useState(false);
    const [openBottom, setOpenBottom] = useState(false);
    const [openLeft, setOpenLeft] = useState(false);
    const [openRight, setOpenRight] = useState(false);

    return (
      <Box display="flex" gap="16" flexWrap="wrap" p="80">
        <Menu open={openTop} onOpenChange={setOpenTop} placement="top-start">
          <MenuTrigger>
            <Button>Top Start</Button>
          </MenuTrigger>
          <MenuItem label="Item 1" onSelect={() => {}} />
          <MenuItem label="Item 2" onSelect={() => {}} />
        </Menu>

        <Menu
          open={openBottom}
          onOpenChange={setOpenBottom}
          placement="bottom-end"
        >
          <MenuTrigger>
            <Button>Bottom End</Button>
          </MenuTrigger>
          <MenuItem label="Item 1" onSelect={() => {}} />
          <MenuItem label="Item 2" onSelect={() => {}} />
        </Menu>

        <Menu open={openLeft} onOpenChange={setOpenLeft} placement="left-start">
          <MenuTrigger>
            <Button>Left Start</Button>
          </MenuTrigger>
          <MenuItem label="Item 1" onSelect={() => {}} />
          <MenuItem label="Item 2" onSelect={() => {}} />
        </Menu>

        <Menu
          open={openRight}
          onOpenChange={setOpenRight}
          placement="right-start"
        >
          <MenuTrigger>
            <Button>Right Start</Button>
          </MenuTrigger>
          <MenuItem label="Item 1" onSelect={() => {}} />
          <MenuItem label="Item 2" onSelect={() => {}} />
        </Menu>
      </Box>
    );
    };
    return <Component />;
  },
};

// ============================================================================
// COMPREHENSIVE EXAMPLE
// ============================================================================

export const KitchenSink: Story = {
  render: () => {
    const Component = () => {
    const [open, setOpen] = useState(false);
    const [view, setView] = useState<string>('grid');
    const [columns, setColumns] = useState<Set<string>>(
      new Set(['name', 'date']),
    );

    const toggleColumn = (col: string) => {
      setColumns((prev) => {
        const next = new Set(prev);
        if (next.has(col)) {
          next.delete(col);
        } else {
          next.add(col);
        }
        return next;
      });
    };

    return (
      <Menu open={open} onOpenChange={setOpen}>
        <MenuTrigger>
          <Button>View Options</Button>
        </MenuTrigger>

        <MenuGroup label="View Mode">
          <MenuItem
            type="single-select"
            label="Grid View"
            iconLeft="view-grid"
            selected={view === 'grid'}
            onSelect={() => setView('grid')}
            index={0}
          />
          <MenuItem
            type="single-select"
            label="List View"
            iconLeft="view-rows"
            selected={view === 'list'}
            onSelect={() => setView('list')}
            index={1}
          />
          <MenuItem
            type="single-select"
            label="Table View"
            iconLeft="view-table"
            selected={view === 'table'}
            onSelect={() => setView('table')}
            index={2}
          />
        </MenuGroup>

        <MenuDivider />

        <MenuGroup label="Visible Columns">
          <MenuItem
            type="multi-select"
            label="Name"
            selectionIndicator="checkbox"
            selected={columns.has('name')}
            onSelect={() => toggleColumn('name')}
            index={3}
          />
          <MenuItem
            type="multi-select"
            label="Date Modified"
            selectionIndicator="checkbox"
            selected={columns.has('date')}
            onSelect={() => toggleColumn('date')}
            index={4}
          />
          <MenuItem
            type="multi-select"
            label="Size"
            selectionIndicator="checkbox"
            selected={columns.has('size')}
            onSelect={() => toggleColumn('size')}
            index={5}
          />
        </MenuGroup>

        <MenuDivider />

        <MenuItem
          label="Refresh"
          iconLeft="refresh"
          onSelect={() => console.log('Refresh')}
          index={6}
        />
        <MenuItem
          label="Export"
          description="Download as CSV"
          iconLeft="download"
          onSelect={() => console.log('Export')}
          index={7}
        />
      </Menu>
    );
    };
    return <Component />;
  },
};
