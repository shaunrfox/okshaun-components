import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex, HStack, VStack } from '@styled-system/jsx';
import {
  type ChangeEvent,
  type KeyboardEvent,
  useEffect,
  useState,
} from 'react';
import { configure, expect, userEvent, waitFor, within } from 'storybook/test';
import { Box } from '../Box';
import { BreakpointIndicator } from '../BreakpointIndicator';
import { Button } from '../Button';
import { FormField } from '../FormField';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import { Menu } from './Menu';
import { MenuGroup } from './MenuGroup';
import { MenuItem } from './MenuItem';
import { SubMenu } from './SubMenu';

// Floating UI moves focus on animation frames, which can lag under CI load.
configure({ asyncUtilTimeout: 4000 });

const meta = {
  title: 'Components/Menu',
  component: Menu,
  args: {
    children: null,
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

const SingleSelectExample = () => {
  const [selected, setSelected] = useState('item-2');

  return (
    <Menu inline closeOnSelect={false}>
      <MenuItem
        label="Option One"
        selected={selected === 'item-1'}
        onClick={() => setSelected('item-1')}
      />
      <MenuItem
        label="Option Two"
        selected={selected === 'item-2'}
        onClick={() => setSelected('item-2')}
      />
      <MenuItem
        label="Option Three"
        selected={selected === 'item-3'}
        onClick={() => setSelected('item-3')}
      />
    </Menu>
  );
};

const MultiSelectExample = () => {
  const [selected, setSelected] = useState<string[]>(['beta']);
  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((entry) => entry !== value)
        : [...prev, value],
    );
  };

  return (
    <Menu inline closeOnSelect={false}>
      <MenuGroup label="Wave type">
        <MenuItem
          variant="checkbox"
          label="Alpha"
          selected={selected.includes('alpha')}
          onClick={() => toggle('alpha')}
        />
        <MenuItem
          variant="checkbox"
          label="Beta"
          selected={selected.includes('beta')}
          onClick={() => toggle('beta')}
        />
        <MenuItem
          variant="checkbox"
          label="Gamma"
          selected={selected.includes('gamma')}
          onClick={() => toggle('gamma')}
        />
      </MenuGroup>
    </Menu>
  );
};

const ToggleOptionsExample = () => {
  const [compact, setCompact] = useState(false);
  const [alerts, setAlerts] = useState(true);

  return (
    <Menu inline closeOnSelect={false} w="264">
      <MenuGroup label="Options" divider>
        <MenuItem
          variant="toggle"
          label="Compact mode"
          selected={compact}
          onClick={() => setCompact((state) => !state)}
        />
        <MenuItem
          variant="toggle"
          label="Email alerts"
          selected={alerts}
          onClick={() => setAlerts((state) => !state)}
        />
      </MenuGroup>
      <MenuItem
        label="Open docs"
        href="https://example.com"
        iconAfter="arrow-square-out"
        target="_blank"
        rel="noreferrer"
      />
    </Menu>
  );
};

const SubMenuDiginFormsExample = () => {
  const [profileName, setProfileName] = useState('');
  const [profileOwner, setProfileOwner] = useState('');
  const [alertTopic, setAlertTopic] = useState('');
  const [alertChannel, setAlertChannel] = useState('');

  return (
    <Menu
      trigger={<Button iconAfter="caret-down">Open menu</Button>}
      subMenuInteraction="digin"
      closeOnSelect={false}
    >
      <MenuItem label="Dashboard" />

      <SubMenu label="Edit profile">
        <Box p="24" display="grid" gap="8" minW="248" justifyItems="end">
          <FormField label="Profile name" labelFor="profile-name">
            <TextInput
              id="profile-name"
              name="profileName"
              value={profileName}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setProfileName(event.target.value)
              }
            />
          </FormField>

          <FormField label="Owner" labelFor="profile-owner">
            <TextInput
              id="profile-owner"
              name="profileOwner"
              value={profileOwner}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setProfileOwner(event.target.value)
              }
            />
          </FormField>

          <Button variant="primary">Submit</Button>
        </Box>
      </SubMenu>

      <SubMenu label="Create alert">
        <Box p="24" display="grid" gap="8" minW="248" justifyItems="end">
          <FormField label="Topic" labelFor="alert-topic">
            <TextInput
              id="alert-topic"
              name="alertTopic"
              value={alertTopic}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setAlertTopic(event.target.value)
              }
            />
          </FormField>

          <FormField label="Channel" labelFor="alert-channel">
            <TextInput
              id="alert-channel"
              name="alertChannel"
              value={alertChannel}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setAlertChannel(event.target.value)
              }
            />
          </FormField>

          <Button variant="primary">Submit</Button>
        </Box>
      </SubMenu>
    </Menu>
  );
};

const AutocompleteFilteringExample = () => {
  const [query, setQuery] = useState('');

  return (
    <VStack gap="12" alignItems="stretch" width="full" maxW="sm">
      <TextInput
        name="menu-query"
        iconBefore="search"
        placeholder="Filter menu items"
        value={query}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setQuery(event.target.value)
        }
      />

      <Menu inline query={query} filterMode="contains" highlightMatches>
        <MenuItem
          label="Account settings"
          description="Manage profile and security"
        />
        <MenuItem
          label="Notifications"
          description="Email, SMS and push alerts"
        />
        <MenuItem label="Integrations" description="Connect external tools" />
        <MenuItem label="Audit history" description="Track critical events" />
      </Menu>
    </VStack>
  );
};

/** Menus render in a portal, so queries run against the document body. */
const getDocumentQueries = (canvasElement: HTMLElement) =>
  within(canvasElement.ownerDocument.body);

const expectFocusInsideMenu = async (canvasElement: HTMLElement) => {
  const body = getDocumentQueries(canvasElement);
  await waitFor(
    () => {
      const focused = canvasElement.ownerDocument.activeElement;
      expect(focused).not.toBe(canvasElement.ownerDocument.body);
      expect(body.getAllByRole('menu').some((m) => m.contains(focused))).toBe(
        true,
      );
    },
    { timeout: 4000 },
  );
};

const expectNoFocusableInAriaHidden = (canvasElement: HTMLElement) => {
  const leaks = Array.from(
    canvasElement.ownerDocument.querySelectorAll<HTMLElement>(
      '[data-ds-component="Menu"] [aria-hidden="true"] :is(button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"]))',
    ),
  ).filter(
    (element) =>
      !element.closest('[inert]') &&
      !element.hasAttribute('data-floating-ui-focus-guard') &&
      !element.closest('[data-floating-ui-focus-guard]'),
  );
  expect(leaks).toHaveLength(0);
};

export const Actions: Story = {
  render: () => (
    <Menu inline>
      <MenuItem label="Edit" iconBefore="pencil" />
      <MenuItem label="Duplicate" iconBefore="copy" />
      <MenuItem label="Archive" iconBefore="trash" />
    </Menu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Keyboard only: Tab enters the menu without any hover, then arrows/Home/End.
    await userEvent.tab();
    expect(canvas.getByRole('menuitem', { name: /edit/i })).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');
    expect(canvas.getByRole('menuitem', { name: /duplicate/i })).toHaveFocus();

    await userEvent.keyboard('{End}');
    expect(canvas.getByRole('menuitem', { name: /archive/i })).toHaveFocus();

    await userEvent.keyboard('{Home}');
    expect(canvas.getByRole('menuitem', { name: /edit/i })).toHaveFocus();
  },
  parameters: { controls: { disable: true } },
};

export const ActionsWithSections: Story = {
  render: () => (
    <Menu inline>
      <MenuGroup label="Actions" divider>
        <MenuItem label="Rename" />
        <MenuItem label="Move" />
      </MenuGroup>
      <MenuGroup label="Danger Zone">
        <MenuItem label="Delete" iconBefore="trash" />
      </MenuGroup>
    </Menu>
  ),
  parameters: { controls: { disable: true } },
};

export const SingleSelect: Story = {
  render: () => <SingleSelectExample />,
  parameters: { controls: { disable: true } },
};

export const MultiSelect: Story = {
  render: () => <MultiSelectExample />,
  parameters: { controls: { disable: true } },
};

export const Density: Story = {
  render: () => (
    <HStack gap="12" alignItems="flex-start">
      <Menu inline density="compact">
        <MenuItem label="Compact" description="Small row spacing" />
        <MenuItem label="Second row" iconBefore="apps" />
        <MenuItem label="Third row" iconBefore="settings" />
      </Menu>
      <Menu inline density="comfortable">
        <MenuItem label="Comfortable" description="Default row spacing" />
        <MenuItem label="Second row" iconBefore="apps" />
        <MenuItem label="Third row" iconBefore="settings" />
      </Menu>
      <Menu inline density="spacious">
        <MenuItem label="Spacious" description="Large row spacing" />
        <MenuItem label="Second row" iconBefore="apps" />
        <MenuItem label="Third row" iconBefore="settings" />
      </Menu>
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};

export const ConditionalBreakpoints: Story = {
  render: () => (
    <VStack>
      <Menu
        inline
        closeOnSelect={false}
        density={{ base: 'spacious', xs: 'comfortable', sm: 'compact' }}
      >
        <MenuGroup label="Actions" divider>
          <MenuItem label="Edit profile" iconBefore="pencil" />
          <MenuItem label="Notifications" iconBefore="bell" />
        </MenuGroup>
        <SubMenu label="More actions" iconBefore="apps">
          <MenuItem label="Export" />
          <MenuItem label="Share" />
          <SubMenu label="Advanced">
            <MenuItem label="Audit log" />
            <MenuItem label="Settings" />
          </SubMenu>
        </SubMenu>
      </Menu>
      <Text
        textAlign="center"
        textStyle="mono.sm"
        _after={{
          display: 'inline',
          content: { base: '"spacious"', xs: '"comfortable"', sm: '"compact"' },
          color: 'text.bold',
          fontWeight: 'bold',
        }}
      >
        Size:{' '}
      </Text>
      <BreakpointIndicator />
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};

export const ToggleOptions: Story = {
  render: () => <ToggleOptionsExample />,
  parameters: { controls: { disable: true } },
};

export const SubMenuHover: Story = {
  render: () => (
    <Menu
      trigger={<Button iconAfter="caret-down">Open menu</Button>}
      subMenuInteraction="hover"
    >
      <MenuItem label="View profile" />
      <SubMenu label="More actions">
        <MenuItem label="Export" />
        <MenuItem label="Share" />
        <SubMenu label="Advanced">
          <MenuItem label="Audit log" />
          <MenuItem label="Settings" />
        </SubMenu>
      </SubMenu>
    </Menu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = getDocumentQueries(canvasElement);
    const trigger = canvas.getByRole('button', { name: /open menu/i });

    await userEvent.tab();
    expect(trigger).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await waitFor(() =>
      expect(
        body.getByRole('menuitem', { name: /view profile/i }),
      ).toHaveFocus(),
    );

    await userEvent.keyboard('{ArrowDown}');
    expect(body.getByRole('menuitem', { name: /more actions/i })).toHaveFocus();

    // ArrowRight opens the flyout and focuses its first row; ArrowLeft returns.
    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() =>
      expect(body.getByRole('menuitem', { name: /export/i })).toHaveFocus(),
    );
    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(() =>
      expect(
        body.getByRole('menuitem', { name: /more actions/i }),
      ).toHaveFocus(),
    );

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByRole('menu')).toBeNull());
    expect(trigger).toHaveFocus();
  },
  parameters: { controls: { disable: true } },
};

/**
 * Example of composing multiple `Menu` components into a top navigation bar with
 * APG-aligned semantics. See "Top Nav Keyboard UI" documentation.
 */
const TopNavExampleWrapper = () => {
  /** Stable ids so Top nav example can move focus between menubar triggers (APG horizontal navigation). */
  const TopNavMenubarTriggerIds = [
    'story-topnav-menubar-sales',
    'story-topnav-menubar-production',
    'story-topnav-menubar-admin',
  ] as const;

  const TopNavOrder = ['sales', 'production', 'admin'] as const;

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const getMenuProps = (id: string) => ({
    open: openMenu === id,
    onOpenChange: (nextOpen: boolean) => {
      if (nextOpen) {
        setOpenMenu(id);
        return;
      }
      // When roving focus between section triggers, the previous Menu can emit
      // onOpenChange(false) from focus-out after openMenu already points at the
      // next section. Only clear if this Menu was still the open one.
      setOpenMenu((current) => (current === id ? null : current));
    },
  });

  const navigateTopNavMenubar = (
    direction: 1 | -1,
    fromKey: (typeof TopNavOrder)[number],
  ) => {
    const idx = TopNavOrder.indexOf(fromKey);
    const len = TopNavOrder.length;
    const nextIndex = (idx + direction + len * 10) % len;
    const nextKey = TopNavOrder[nextIndex];
    const nextId = TopNavMenubarTriggerIds[nextIndex];
    if (nextKey === undefined) {
      return;
    }

    // APG Navigation Menubar: when no section menu is open, Left/Right only
    // rove focus between triggers. When any menu is open, moving to another
    // trigger also opens that section’s menu (see example JS: openPopup when
    // isAnyPopupOpen / menubar expanded).
    const shouldOpenNextMenu = openMenu !== null;

    if (!shouldOpenNextMenu) {
      window.requestAnimationFrame(() => {
        if (nextId) {
          document.getElementById(nextId)?.focus();
        }
      });
      return;
    }

    window.requestAnimationFrame(() => {
      setOpenMenu(nextKey);
      if (nextId) {
        document.getElementById(nextId)?.focus();
      }
    });
  };

  const handleMenubarTriggerKeyDown =
    (menuKey: (typeof TopNavOrder)[number]) =>
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      navigateTopNavMenubar(event.key === 'ArrowRight' ? 1 : -1, menuKey);
    };

  return (
    <VStack
      alignItems="stretch"
      minW="3xl"
      h="2xl"
      bg="bg.neutral"
      p="24"
      gap="16"
    >
      <Box
        role="menubar"
        aria-label="Example site sections"
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap="12"
        borderWidth="1"
        borderColor="border"
        bg="surface"
        px="24"
        py="16"
      >
        <Menu
          triggerInteraction="click-and-hover"
          trigger={
            <Button
              id={TopNavMenubarTriggerIds[0]}
              variant="selectedBold"
              onKeyDown={handleMenubarTriggerKeyDown('sales')}
            >
              Sales
            </Button>
          }
          subMenuInteraction="hover"
          closeOnSelect={false}
          onMenubarEdgeNavigate={(direction) =>
            navigateTopNavMenubar(direction, 'sales')
          }
          {...getMenuProps('sales')}
        >
          <SubMenu label="Quotes">
            <MenuItem label="Open quotes" />
            <MenuItem label="Draft quotes" />
          </SubMenu>

          <SubMenu label="Orders" selected>
            <MenuItem label="Order list" />
            <SubMenu label="Used orders" selected>
              <MenuItem label="Order as used" selected />
              <MenuItem label="Bookings" />
              <MenuItem label="Order commissions" />
            </SubMenu>
          </SubMenu>

          <SubMenu label="Invoices">
            <MenuItem label="All invoices" />
            <MenuItem label="Credit notes" />
          </SubMenu>
        </Menu>

        <Menu
          triggerInteraction="click-and-hover"
          trigger={
            <Button
              id={TopNavMenubarTriggerIds[1]}
              onKeyDown={handleMenubarTriggerKeyDown('production')}
            >
              Production
            </Button>
          }
          subMenuInteraction="hover"
          closeOnSelect={false}
          onMenubarEdgeNavigate={(direction) =>
            navigateTopNavMenubar(direction, 'production')
          }
          {...getMenuProps('production')}
        >
          <SubMenu label="Work Orders">
            <MenuItem label="Open work orders" />
            <MenuItem label="Completed" />
          </SubMenu>

          <SubMenu label="Scheduling">
            <MenuItem label="Production schedule" />
            <MenuItem
              href="https://www.google.com"
              label="Resource calendar"
              target="_blank"
              rel="noopener noreferrer"
            />
          </SubMenu>

          <MenuItem label="Inventory" />
        </Menu>

        <Menu
          triggerInteraction="click-and-hover"
          trigger={
            <Button
              id={TopNavMenubarTriggerIds[2]}
              onKeyDown={handleMenubarTriggerKeyDown('admin')}
            >
              Admin
            </Button>
          }
          subMenuInteraction="hover"
          closeOnSelect={false}
          onMenubarEdgeNavigate={(direction) =>
            navigateTopNavMenubar(direction, 'admin')
          }
          {...getMenuProps('admin')}
        >
          <SubMenu label="Users">
            <MenuItem label="All users" />
            <MenuItem label="Roles & permissions" />
          </SubMenu>

          <SubMenu label="Settings">
            <MenuItem label="General" />
            <MenuItem label="Integrations" />
            <MenuItem label="Billing" />
          </SubMenu>

          <MenuItem label="Audit log" iconBefore="list-bullets" />
        </Menu>
      </Box>
    </VStack>
  );
};

export const TopNavExample: Story = {
  name: 'Top nav example',
  render: () => <TopNavExampleWrapper />,
  parameters: { controls: { disable: true } },
};

export const SubMenuDigin: Story = {
  render: () => (
    <Menu
      trigger={<Button iconAfter="caret-down">Open menu</Button>}
      subMenuInteraction="digin"
    >
      <MenuItem label="Dashboard" />
      <SubMenu label="Settings">
        <MenuItem label="Profile" />
        <MenuItem label="Billing" />
        <SubMenu label="Team">
          <MenuItem label="Members" />
          <MenuItem label="Permissions" />
        </SubMenu>
      </SubMenu>
    </Menu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = getDocumentQueries(canvasElement);
    const trigger = canvas.getByRole('button', { name: /open menu/i });
    const item = (name: RegExp) => body.getByRole('menuitem', { name });

    // Keyboard only: open from the trigger and land inside the menu.
    await userEvent.tab();
    expect(trigger).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await expectFocusInsideMenu(canvasElement);
    await waitFor(() => expect(item(/dashboard/i)).toHaveFocus());

    await userEvent.keyboard('{ArrowDown}');
    expect(item(/settings/i)).toHaveFocus();

    // Drill in: focus moves to the first row of the new level and stays usable.
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(item(/profile/i)).toHaveFocus());
    expectNoFocusableInAriaHidden(canvasElement);
    await userEvent.keyboard('{ArrowDown}');
    expect(item(/billing/i)).toHaveFocus();

    // Left goes back and restores focus to the row that opened the level.
    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(() => expect(item(/settings/i)).toHaveFocus());

    // Space drills in again; a second level pushes the same way.
    await userEvent.keyboard(' ');
    await waitFor(() => expect(item(/profile/i)).toHaveFocus());
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowRight}');
    await waitFor(() => expect(item(/members/i)).toHaveFocus());

    // Escape steps back one level at a time, then closes and returns to the trigger.
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(item(/team/i)).toHaveFocus());
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(item(/settings/i)).toHaveFocus());
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByRole('menu')).toBeNull());
    expect(trigger).toHaveFocus();
  },
  parameters: { controls: { disable: true } },
};

const LONG_MENU_LABELS = Array.from(
  { length: 40 },
  (_, index) => `${index + 1} - Item ${index + 1}`,
);

export const ExLongMenu: Story = {
  name: 'Ex: Long Menu',
  render: () => (
    <Menu trigger={<Button iconAfter="caret-down">Open long menu</Button>}>
      <SubMenu label="More items">
        {LONG_MENU_LABELS.map((label) => (
          <MenuItem key={label} label={`Nested ${label}`} />
        ))}
      </SubMenu>
      {LONG_MENU_LABELS.map((label) => (
        <MenuItem key={label} label={label} />
      ))}
    </Menu>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await userEvent.click(
      canvas.getByRole('button', { name: /open long menu/i }),
    );
    const menuElement = await screen.findByRole('menu');

    // The menu is capped to the space beside the trigger and scrolls,
    // rather than running past the viewport edge.
    const viewportHeight =
      canvasElement.ownerDocument.documentElement.clientHeight;
    const rect = menuElement.getBoundingClientRect();
    expect(rect.top).toBeGreaterThanOrEqual(0);
    expect(rect.bottom).toBeLessThanOrEqual(viewportHeight);
    expect(getComputedStyle(menuElement).overflowY).toBe('auto');
    expect(menuElement.scrollHeight).toBeGreaterThan(menuElement.clientHeight);
  },
  parameters: { controls: { disable: true } },
};

export const ExLongDiginMenu: Story = {
  name: 'Ex: Long Drill-In Menu',
  render: () => (
    <Menu
      trigger={<Button iconAfter="caret-down">Open drill-in menu</Button>}
      subMenuInteraction="digin"
    >
      <SubMenu label="Long list">
        {LONG_MENU_LABELS.map((label) => (
          <MenuItem key={label} label={`Nested ${label}`} />
        ))}
      </SubMenu>
      <SubMenu label="Short list">
        <MenuItem label="First" />
        <MenuItem label="Second" />
      </SubMenu>
      {LONG_MENU_LABELS.map((label) => (
        <MenuItem key={label} label={label} />
      ))}
    </Menu>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await userEvent.click(
      canvas.getByRole('button', { name: /open drill-in menu/i }),
    );
    const menuElement = await screen.findByRole('menu');

    // The viewport clips the size probe; it must not be a scrollable ancestor
    // that keyboard `scrollIntoView()` can move out from under the header.
    const levelsViewport = menuElement.querySelector<HTMLElement>(
      '[class*="menu__levelsViewport"]',
    ) as HTMLElement;
    expect(getComputedStyle(levelsViewport).overflowY).toBe('clip');
    levelsViewport.scrollTop = 48;
    expect(levelsViewport.scrollTop).toBe(0);

    // In a long level, the back header stays pinned while the level scrolls.
    await userEvent.click(screen.getByRole('menuitem', { name: /long list/i }));
    const longBack = await screen.findByRole('button', { name: /long list/i });
    const longLevel = longBack.parentElement as HTMLElement;
    await waitFor(() =>
      expect(longLevel.scrollHeight).toBeGreaterThan(longLevel.clientHeight),
    );
    longLevel.scrollTop = longLevel.scrollHeight;
    await waitFor(() =>
      expect(
        Math.abs(
          longBack.getBoundingClientRect().top -
            longLevel.getBoundingClientRect().top,
        ),
      ).toBeLessThanOrEqual(1),
    );

    // A short level after a long one has no blank space to scroll into.
    await userEvent.click(longBack);
    await userEvent.click(
      await screen.findByRole('menuitem', { name: /short list/i }),
    );
    const shortBack = await screen.findByRole('button', {
      name: /short list/i,
    });
    const shortLevel = shortBack.parentElement as HTMLElement;
    await waitFor(() => {
      expect(menuElement.scrollHeight).toBeLessThanOrEqual(
        menuElement.clientHeight + 1,
      );
      expect(shortLevel.scrollHeight).toBeLessThanOrEqual(
        shortLevel.clientHeight + 1,
      );
    });
  },
  parameters: { controls: { disable: true } },
};

export const ExLongDiginMenuFocusReturn: Story = {
  name: 'Ex: Long Drill-In Menu (focus return on back)',
  // Menu width varies between runs after drill-in back navigation. Excluded
  // from visual snapshots until that is understood; behavior is still tested.
  tags: ['!snapshot'],
  render: () => (
    <Menu
      trigger={<Button iconAfter="caret-down">Open drill-in menu</Button>}
      subMenuInteraction="digin"
    >
      <SubMenu label="Long list">
        {LONG_MENU_LABELS.map((label) => (
          <MenuItem key={label} label={`Nested ${label}`} />
        ))}
        <SubMenu label="Deep submenu">
          <MenuItem label="Deep first" />
          <MenuItem label="Deep second" />
        </SubMenu>
      </SubMenu>
    </Menu>
  ),
  play: async ({ canvasElement }) => {
    const body = getDocumentQueries(canvasElement);
    const item = (name: RegExp) => body.getByRole('menuitem', { name });

    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => expect(item(/long list/i)).toHaveFocus());
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(item(/nested 1 - item 1$/i)).toHaveFocus());

    // Jump to the last row (a submenu below the fold) and drill into it.
    await userEvent.keyboard('{End}');
    await waitFor(() => expect(item(/deep submenu/i)).toHaveFocus());
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(item(/deep first/i)).toHaveFocus());

    // Going back remounts the long level at scrollTop 0. Focus must return to
    // the opening row and that row must end up in view, not left below the
    // fold or underneath the sticky back header.
    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(() => expect(item(/deep submenu/i)).toHaveFocus());
    await waitFor(() => {
      const menu = body.getByRole('menu');
      const header = menu.querySelector<HTMLElement>('[data-menu-back]');
      const rowRect = item(/deep submenu/i).getBoundingClientRect();
      expect(header).not.toBeNull();
      expect(rowRect.top).toBeGreaterThanOrEqual(
        (header as HTMLElement).getBoundingClientRect().bottom - 1,
      );
      expect(rowRect.bottom).toBeLessThanOrEqual(
        menu.getBoundingClientRect().bottom + 1,
      );
    });
  },
  parameters: { controls: { disable: true } },
};

export const ExLongDiginMenuMouseBack: Story = {
  name: 'Ex: Long Drill-In Menu (focus return on mouse back)',
  // Menu width varies between runs after drill-in back navigation. Excluded
  // from visual snapshots until that is understood; behavior is still tested.
  tags: ['!snapshot'],
  render: () => (
    <Menu
      trigger={<Button iconAfter="caret-down">Open drill-in menu</Button>}
      subMenuInteraction="digin"
    >
      <SubMenu label="Long list">
        {LONG_MENU_LABELS.map((label) => (
          <MenuItem key={label} label={`Nested ${label}`} />
        ))}
        <SubMenu label="Deep submenu">
          <MenuItem label="Deep first" />
        </SubMenu>
      </SubMenu>
    </Menu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = getDocumentQueries(canvasElement);
    const item = (name: RegExp) => body.getByRole('menuitem', { name });

    await userEvent.click(
      canvas.getByRole('button', { name: /open drill-in menu/i }),
    );
    await userEvent.click(
      await body.findByRole('menuitem', { name: /long list/i }),
    );
    await waitFor(() => expect(item(/nested 1 - item 1$/i)).toBeVisible());

    // Open the submenu from a row below the fold, then use the Back header
    // with the mouse. The remounted level starts at scrollTop 0.
    item(/deep submenu/i).scrollIntoView({ block: 'nearest' });
    await userEvent.click(item(/deep submenu/i));
    await waitFor(() => expect(item(/deep first/i)).toBeVisible());
    const back = body
      .getByRole('menu')
      .querySelector<HTMLElement>('[data-menu-back]');
    expect(back).not.toBeNull();
    await userEvent.click(back as HTMLElement);

    await waitFor(() => expect(item(/deep submenu/i)).toHaveFocus());
    await waitFor(() => {
      const menu = body.getByRole('menu');
      const header = menu.querySelector<HTMLElement>('[data-menu-back]');
      const rowRect = item(/deep submenu/i).getBoundingClientRect();
      expect(header).not.toBeNull();
      expect(rowRect.top).toBeGreaterThanOrEqual(
        (header as HTMLElement).getBoundingClientRect().bottom - 1,
      );
      expect(rowRect.bottom).toBeLessThanOrEqual(
        menu.getBoundingClientRect().bottom + 1,
      );
    });
  },
  parameters: { controls: { disable: true } },
};

export const ExLongDiginMenuWidthAfterBack: Story = {
  name: 'Ex: Long Drill-In Menu (width after back)',
  render: () => (
    <Menu
      trigger={<Button iconAfter="caret-down">Open drill-in menu</Button>}
      subMenuInteraction="digin"
    >
      <SubMenu label="Long list">
        {LONG_MENU_LABELS.map((label) => (
          <MenuItem key={label} label={`Nested ${label}`} />
        ))}
        <SubMenu label="Deep submenu">
          <MenuItem label="Deep first" />
        </SubMenu>
      </SubMenu>
    </Menu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = getDocumentQueries(canvasElement);
    const item = (name: RegExp) => body.getByRole('menuitem', { name });
    const menu = () =>
      canvasElement.ownerDocument.querySelector<HTMLElement>(
        '[data-ds-component="Menu"]',
      ) as HTMLElement;
    // Let the width transition finish, as it does at human speed.
    const settled = () =>
      waitFor(() =>
        expect(menu().getAnimations({ subtree: true })).toHaveLength(0),
      );

    await userEvent.click(
      canvas.getByRole('button', { name: /open drill-in menu/i }),
    );
    await userEvent.click(
      await body.findByRole('menuitem', { name: /long list/i }),
    );
    await waitFor(() => expect(item(/nested 1 - item 1$/i)).toBeVisible());
    await settled();

    // Drill into the narrow level and let the menu shrink to it.
    item(/deep submenu/i).scrollIntoView({ block: 'nearest' });
    await userEvent.click(item(/deep submenu/i));
    await waitFor(() => expect(item(/deep first/i)).toBeVisible());
    await settled();

    // Back to the long level: the menu must grow back, so no row wraps.
    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(() => expect(item(/deep submenu/i)).toHaveFocus());
    await settled();
    const rows = body
      .getAllByRole('menuitem')
      .filter((row) => !row.closest('[aria-hidden="true"]'));
    const heights = new Set(rows.map((row) => row.offsetHeight));
    expect(heights.size).toBe(1);
  },
  parameters: { controls: { disable: true } },
};

export const ExLongDiginMenuKeyboard: Story = {
  name: 'Ex: Long Drill-In Menu (keyboard repro)',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Repro for the sticky back header covering keyboard-focused items. ' +
          'The play function opens the menu, drills into "Long list" and ' +
          'scrolls it to the bottom, then leaves it open. Press Home, or ' +
          'ArrowUp repeatedly, and check whether the focused item scrolls ' +
          'underneath the pinned back header.',
      },
    },
  },
  render: () => (
    <Menu
      trigger={<Button iconAfter="caret-down">Open drill-in menu</Button>}
      subMenuInteraction="digin"
      density="spacious"
    >
      <SubMenu label="Long list">
        {LONG_MENU_LABELS.map((label) => (
          <MenuItem key={label} label={`Nested ${label}`} />
        ))}
      </SubMenu>
    </Menu>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await userEvent.click(
      canvas.getByRole('button', { name: /open drill-in menu/i }),
    );
    await userEvent.click(
      await screen.findByRole('menuitem', { name: /long list/i }),
    );
    const back = await screen.findByRole('button', { name: /long list/i });
    const level = back.parentElement as HTMLElement;
    await waitFor(() =>
      expect(level.scrollHeight).toBeGreaterThan(level.clientHeight),
    );
    level.scrollTop = level.scrollHeight;
  },
};

const DiginFilterExample = ({ query: initialQuery }: { query?: string }) => {
  const [query, setQuery] = useState(initialQuery ?? '');

  useEffect(() => {
    setQuery(initialQuery ?? '');
  }, [initialQuery]);

  return (
    <VStack gap="12">
      <HStack gap="8">
        <Button onClick={() => setQuery('zzz')}>Filter: no match</Button>
        <Button onClick={() => setQuery('')}>Clear filter</Button>
      </HStack>
      <Menu
        trigger={<Button iconAfter="caret-down">Open drill-in menu</Button>}
        subMenuInteraction="digin"
        density="spacious"
        query={query}
        filterMode="contains"
      >
        <SubMenu label="Long list">
          {LONG_MENU_LABELS.map((label) => (
            <MenuItem key={label} label={`Nested ${label}`} />
          ))}
        </SubMenu>
      </Menu>
    </VStack>
  );
};

export const ExLongDiginMenuFiltered: Story = {
  name: 'Ex: Long Drill-In Menu (filtered)',
  args: { query: '' },
  argTypes: { query: { control: 'text' } },
  parameters: {
    docs: {
      description: {
        story:
          'A filter with no matches unmounts the drill-in level and its back ' +
          'header. After the filter is cleared, keyboard scrolling must still ' +
          'reserve the header height. Use the Controls panel (`query`) to ' +
          'filter: clicking buttons on the canvas closes the floating menu.',
      },
    },
  },
  render: (args: { query?: string }) => (
    <DiginFilterExample query={args.query} />
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);
    const levelPadding = () => {
      const levels = canvasElement.ownerDocument.querySelectorAll<HTMLElement>(
        '[class*="menu__level"]:not([aria-hidden])',
      );
      const level = levels[levels.length - 1] as HTMLElement;
      return {
        variable: level.style.getPropertyValue('--menu-back-header-height'),
        padding: getComputedStyle(level).scrollPaddingTop,
      };
    };

    await userEvent.click(
      canvas.getByRole('button', { name: /open drill-in menu/i }),
    );
    await userEvent.click(
      await screen.findByRole('menuitem', { name: /long list/i }),
    );
    await screen.findByRole('button', { name: /long list/i });
    await waitFor(() => expect(levelPadding().variable).not.toBe(''));
    const measured = levelPadding().variable;

    // Programmatic clicks avoid the outside-press that would close the menu.
    canvas.getByRole('button', { name: /filter: no match/i }).click();
    await screen.findByText(/no results found/i);

    canvas.getByRole('button', { name: /clear filter/i }).click();
    await screen.findByRole('button', { name: /long list/i });
    await waitFor(() => {
      expect(levelPadding().variable).toBe(measured);
      expect(levelPadding().padding).toBe(measured);
    });
  },
};

export const SubMenuDiginEdgeCases: Story = {
  name: 'Sub menu digin (duplicate labels, nested flyout)',
  render: () => (
    <Menu
      trigger={<Button iconAfter="caret-down">Open menu</Button>}
      subMenuInteraction="digin"
    >
      <SubMenu label="Settings">
        <MenuItem label="First child" />
      </SubMenu>
      <SubMenu label="Settings">
        <MenuItem label="Second child" />
        <SubMenu label="Flyout" interaction="hover">
          <MenuItem label="Flyout item" />
        </SubMenu>
      </SubMenu>
    </Menu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = getDocumentQueries(canvasElement);
    const item = (name: RegExp) => body.getByRole('menuitem', { name });

    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() =>
      expect(
        body.getAllByRole('menuitem', { name: /settings/i })[0],
      ).toHaveFocus(),
    );

    // The second of two same-labelled submenus shows its own children.
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await waitFor(() => expect(item(/second child/i)).toHaveFocus());
    expect(body.queryByText('First child')).toBeNull();

    // ArrowLeft in a nested flyout closes the flyout, not the drilled level.
    await userEvent.keyboard('{ArrowDown}{ArrowRight}');
    await waitFor(() => expect(item(/flyout item/i)).toHaveFocus());
    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(() => expect(item(/^flyout$/i)).toHaveFocus());
    expect(body.getByRole('menuitem', { name: /second child/i })).toBeVisible();
    expect(canvas.getByRole('button', { name: /open menu/i })).toBeTruthy();
  },
  parameters: { controls: { disable: true } },
};

export const SubMenuDiginForms: Story = {
  render: () => <SubMenuDiginFormsExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = getDocumentQueries(canvasElement);
    const trigger = canvas.getByRole('button', { name: /open menu/i });

    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() =>
      expect(body.getByRole('menuitem', { name: /dashboard/i })).toHaveFocus(),
    );
    await userEvent.keyboard('{ArrowDown}{Enter}');

    // A level without menu rows still receives focus (first control).
    const nameInput = await body.findByLabelText('Profile name');
    await waitFor(() => expect(nameInput).toHaveFocus());

    // Left/Right edit text instead of navigating; Escape goes back.
    await userEvent.keyboard('abc{ArrowLeft}');
    expect(nameInput).toHaveFocus();
    expect(nameInput).toHaveValue('abc');

    // Escape that cancels an IME candidate must not pop the level.
    nameInput.dispatchEvent(
      new CompositionEvent('compositionstart', { bubbles: true }),
    );
    await userEvent.keyboard('{Escape}');
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveFocus();
    nameInput.dispatchEvent(
      new CompositionEvent('compositionend', { bubbles: true }),
    );
    await new Promise((resolve) => setTimeout(resolve, 50));

    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(
        body.getByRole('menuitem', { name: /edit profile/i }),
      ).toHaveFocus(),
    );

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByRole('menu')).toBeNull());
    expect(trigger).toHaveFocus();
  },
  parameters: { controls: { disable: true } },
};

export const AutocompleteFiltering: Story = {
  render: () => <AutocompleteFilteringExample />,
  parameters: { controls: { disable: true } },
};

export const PanelAsSidebar: Story = {
  name: 'Panel as sidebar',
  render: () => (
    <Flex
      minW="3xl"
      h="lg"
      bg="bg.neutral"
      overflow="hidden"
      boxShadow="overlay"
    >
      <Menu
        subMenuInteraction="hover"
        panel={true}
        maxW="264"
        density="comfortable"
      >
        <MenuItem label="View profile" />
        <SubMenu label="More actions" minW="180">
          <MenuItem label="Export" />
          <MenuItem label="Share" />
          <SubMenu label="Advanced" minW="180">
            <MenuItem label="Audit log" />
            <MenuItem label="Settings" />
          </SubMenu>
        </SubMenu>
      </Menu>
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const body = getDocumentQueries(canvasElement);
    const item = (name: RegExp) => body.getByRole('menuitem', { name });

    await userEvent.tab();
    expect(item(/view profile/i)).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}{ArrowRight}');
    await waitFor(() => expect(item(/export/i)).toHaveFocus());
    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(() => expect(item(/more actions/i)).toHaveFocus());

    // A panel has no popup to return focus to, so Escape in a flyout
    // returns focus to the flyout's trigger, as Arrow Left does.
    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => expect(item(/export/i)).toHaveFocus());
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(body.queryByRole('menuitem', { name: /export/i })).toBeNull(),
    );
    await waitFor(() => expect(item(/more actions/i)).toHaveFocus());

    // From a nested flyout, Escape closes every level and lands on the
    // trigger that is still in the panel.
    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => expect(item(/export/i)).toHaveFocus());
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowRight}');
    await waitFor(() => expect(item(/audit log/i)).toHaveFocus());
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(body.queryByRole('menuitem', { name: /export/i })).toBeNull(),
    );
    await waitFor(() => expect(item(/more actions/i)).toHaveFocus());
  },
  parameters: { controls: { disable: true } },
};

export const PanelAsMobileNav: Story = {
  name: 'Panel as mobile nav',
  render: () => (
    <Flex
      minW="3xl"
      h="lg"
      bg="bg.neutral"
      overflow="hidden"
      boxShadow="overlay"
    >
      <Menu
        subMenuInteraction="digin"
        panel={true}
        maxW="264"
        w="full"
        density="comfortable"
      >
        <MenuItem label="View profile" />
        <SubMenu label="More actions" minW="180">
          <MenuItem label="Export" />
          <MenuItem label="Share" />
          <SubMenu label="Advanced" minW="180">
            <MenuItem label="Audit log" />
            <MenuItem label="Settings" />
          </SubMenu>
        </SubMenu>
      </Menu>
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const body = getDocumentQueries(canvasElement);
    const item = (name: RegExp) => body.getByRole('menuitem', { name });

    await userEvent.tab();
    expect(item(/view profile/i)).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await waitFor(() => expect(item(/export/i)).toHaveFocus());
    expectNoFocusableInAriaHidden(canvasElement);

    // Inline menus stay mounted: Escape with focus elsewhere must not pop.
    (document.activeElement as HTMLElement | null)?.blur();
    await userEvent.keyboard('{Escape}');
    expect(item(/export/i)).toBeVisible();
    item(/export/i).focus();
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}');
    await waitFor(() => expect(item(/audit log/i)).toHaveFocus());
    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(() => expect(item(/advanced/i)).toHaveFocus());
    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(() => expect(item(/more actions/i)).toHaveFocus());
  },
  parameters: { controls: { disable: true } },
};
