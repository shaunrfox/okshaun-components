import type { Meta, StoryObj } from '@storybook/react-vite';
import { type KeyboardEvent, useRef, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Box } from '../Box';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Tabs keep every `TabPanel` mounted by default and hide the inactive',
          'ones with `display: none`. That preserves scroll position, form',
          'drafts, and grid state when a user moves between tabs, at the cost',
          'of keeping hidden work alive. Hidden panels receive an `isActive`',
          'signal — as a render-prop argument or through `useTabPanelActive()`',
          '— so polling, timers, and animation can pause themselves. Set',
          '`unmountInactive` when a panel is expensive enough that discarding',
          'its state is the better trade.',
        ].join(' '),
      },
    },
  },
  args: {
    'aria-label': 'Example sections',
    children: null,
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="overview">
      <Tab value="overview">Overview</Tab>
      <Tab value="activity">Activity</Tab>
      <Tab value="settings">Settings</Tab>
      <TabPanel value="overview">
        <Text py="16">Summary of the current record.</Text>
      </TabPanel>
      <TabPanel value="activity">
        <Text py="16">Recent activity for the current record.</Text>
      </TabPanel>
      <TabPanel value="settings">
        <Text py="16">Settings for the current record.</Text>
      </TabPanel>
    </Tabs>
  ),
};

export const WithBadges: Story = {
  name: 'Badges',
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Tabs {...args} defaultValue="work">
      <Tab value="work">Work</Tab>
      <Tab
        value="materials"
        badge={3}
        badgeTooltip="2 Open Requests, 1 Backordered Item"
      >
        Materials
      </Tab>
      <Tab value="status" badge={12}>
        Status
      </Tab>
      <Tab value="documents" badge={0}>
        Documents
      </Tab>
      <TabPanel value="work">
        <Text py="16">A badge without a tooltip is a bare count.</Text>
      </TabPanel>
      <TabPanel value="materials">
        <Text py="16">
          Hover or focus the Materials tab to read what the count means.
        </Text>
      </TabPanel>
      <TabPanel value="status">
        <Text py="16">Status content.</Text>
      </TabPanel>
      <TabPanel value="documents">
        <Text py="16">A zero count renders no badge at all.</Text>
      </TabPanel>
    </Tabs>
  ),
};

const overflowTabs = [
  'Work',
  'Info',
  'Materials',
  'Status',
  'Documents',
  'History',
  'Labor',
  'Quality',
  'Shipping',
  'Invoicing',
  'Costing',
  'Notes',
];

export const Overflow: Story = {
  name: 'Overflow',
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Box
      resize="horizontal"
      overflow="auto"
      width="lg"
      maxWidth="full"
      minWidth="240"
      borderWidth="1"
      borderStyle="dashed"
      borderColor="border"
      p="16"
    >
      <Text pb="12" color="text.subtlest">
        Drag the bottom-right corner. Tabs nearest the selected one keep their
        place; the rest move into the overflow menu.
      </Text>
      <Tabs {...args} defaultValue="work">
        {overflowTabs.map((label) => (
          <Tab key={label} value={label.toLowerCase()}>
            {label}
          </Tab>
        ))}
        {overflowTabs.map((label) => (
          <TabPanel key={label} value={label.toLowerCase()}>
            <Text py="16">{label} content.</Text>
          </TabPanel>
        ))}
      </Tabs>
    </Box>
  ),
};

const iconTabs = [
  { value: 'work', label: 'Work', icon: 'wrench-2' },
  { value: 'materials', label: 'Materials', icon: 'cube-focus' },
  { value: 'schedule', label: 'Schedule', icon: 'calendar-view-week' },
  { value: 'shipping', label: 'Shipping', icon: 'truck-trailer' },
  { value: 'quality', label: 'Quality', icon: 'list-checks' },
  { value: 'history', label: 'History', icon: 'clock-countdown' },
  { value: 'notes', label: 'Notes', icon: 'note-stack' },
] as const;

export const LabelOverride: Story = {
  name: 'Label Override for Overflow',
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Box width="md" maxWidth="full">
      <Text pb="12" color="text.subtlest">
        These tabs render an icon beside their text, so flattening `children`
        would produce a poor menu row. Each one passes `label`, and the overflow
        menu uses that text. The strip still renders `children` as-is.
      </Text>
      <Tabs {...args} defaultValue="work">
        {iconTabs.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label}>
            <Icon name={tab.icon} aria-hidden />
            {tab.label}
          </Tab>
        ))}
        {iconTabs.map((tab) => (
          <TabPanel key={tab.value} value={tab.value}>
            <Text py="16">{tab.label} content.</Text>
          </TabPanel>
        ))}
      </Tabs>
    </Box>
  ),
};

export const UnmountInactive: Story = {
  name: 'Unmount Inactive Panels',
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Tabs {...args} defaultValue="first" unmountInactive>
      <Tab value="first">First</Tab>
      <Tab value="second">Second</Tab>
      <TabPanel value="first">
        <Text py="16">
          Only this panel exists in the DOM while it is selected.
        </Text>
      </TabPanel>
      <TabPanel value="second">
        <Text py="16">
          Switching tabs unmounts the other panel and discards its state.
        </Text>
      </TabPanel>
    </Tabs>
  ),
};

const WorkView = () => {
  const [hasSchedule, setHasSchedule] = useState(true);
  const [lastChange, setLastChange] = useState('none yet');

  return (
    <Box>
      <Box pb="12">
        <Button
          variant="hollow"
          size="sm"
          onClick={() => setHasSchedule((current) => !current)}
        >
          {hasSchedule ? 'Remove Schedule tab' : 'Add Schedule tab'}
        </Button>
      </Box>
      <Tabs
        aria-label="Work order sections"
        defaultValue="work"
        onChange={(_event, value, reason) =>
          setLastChange(`${value} (${reason})`)
        }
      >
        <Tab value="work">Work</Tab>
        <Tab value="info">Info</Tab>
        <Tab
          value="materials"
          badge={3}
          badgeTooltip="2 Open Requests, 1 Backordered Item"
        >
          Materials
        </Tab>
        <Tab value="status" badge={5} badgeTooltip="5 Operations Behind">
          Status
        </Tab>
        {hasSchedule ? <Tab value="schedule">Schedule</Tab> : null}
        <Tab value="documents">Documents</Tab>
        <Tab value="history">History</Tab>

        <TabPanel value="work">
          <Text py="16">Work instructions and operations.</Text>
        </TabPanel>
        <TabPanel value="info">
          <Text py="16">Order header and customer details.</Text>
        </TabPanel>
        <TabPanel value="materials">
          <Text py="16">Bill of materials and purchase orders.</Text>
        </TabPanel>
        <TabPanel value="status">
          <Text py="16">Operation status roll-up.</Text>
        </TabPanel>
        <TabPanel value="schedule">
          {({ isActive }) => (
            <Text py="16">
              Schedule board. Live refresh is {isActive ? 'running' : 'paused'}.
              Select this tab, remove it with the button above, and the strip
              falls back to the first remaining tab.
            </Text>
          )}
        </TabPanel>
        <TabPanel value="documents">
          <Text py="16">Attached drawings and travelers.</Text>
        </TabPanel>
        <TabPanel value="history">
          <Text py="16">Audit trail.</Text>
        </TabPanel>
      </Tabs>
      <Text pt="16" color="text.subtlest">
        Last change: {lastChange}
      </Text>
    </Box>
  );
};

export const ExWorkView: Story = {
  name: 'Ex: Record View',
  parameters: { controls: { disable: true } },
  render: () => <WorkView />,
};

const ControlledConditionalTabs = () => {
  const [hasSchedule, setHasSchedule] = useState(true);
  const [value, setValue] = useState('schedule');

  return (
    <Box>
      <Button
        variant="hollow"
        size="sm"
        onClick={() => setHasSchedule((current) => !current)}
      >
        {hasSchedule ? 'Remove Schedule tab' : 'Add Schedule tab'}
      </Button>
      <Text py="8" data-testid="controlled-value">
        Parent value: {value}
      </Text>
      <Tabs
        aria-label="Controlled sections"
        value={value}
        onChange={(_event, nextValue) => setValue(nextValue)}
      >
        <Tab value="work">Work</Tab>
        {hasSchedule ? <Tab value="schedule">Schedule</Tab> : null}
        <Tab value="history">History</Tab>
        <TabPanel value="work">Work content.</TabPanel>
        <TabPanel value="schedule">Schedule content.</TabPanel>
        <TabPanel value="history">History content.</TabPanel>
      </Tabs>
    </Box>
  );
};

export const ControlledFallback: Story = {
  name: 'Test: controlled value follows a removed tab',
  parameters: { controls: { disable: true } },
  render: () => <ControlledConditionalTabs />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('tab', { name: 'Schedule' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await userEvent.click(
      canvas.getByRole('button', { name: 'Remove Schedule tab' }),
    );

    await waitFor(async () => {
      await expect(canvas.getByTestId('controlled-value')).toHaveTextContent(
        'Parent value: work',
      );
      await expect(canvas.getByRole('tab', { name: 'Work' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
    });
  },
};

const UncontrolledConditionalTabs = () => {
  const [hasSchedule, setHasSchedule] = useState(true);

  return (
    <Box>
      <Button
        variant="hollow"
        size="sm"
        onClick={() => setHasSchedule((current) => !current)}
      >
        {hasSchedule ? 'Remove Schedule tab' : 'Add Schedule tab'}
      </Button>
      <Tabs aria-label="Uncontrolled sections" defaultValue="schedule">
        <Tab value="work">Work</Tab>
        {hasSchedule ? <Tab value="schedule">Schedule</Tab> : null}
        <Tab value="history">History</Tab>
        <TabPanel value="work">Work content.</TabPanel>
        <TabPanel value="schedule">Schedule content.</TabPanel>
        <TabPanel value="history">History content.</TabPanel>
      </Tabs>
    </Box>
  );
};

export const UncontrolledFallback: Story = {
  name: 'Test: removed uncontrolled value does not return',
  parameters: { controls: { disable: true } },
  render: () => <UncontrolledConditionalTabs />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole('button', { name: 'Remove Schedule tab' }),
    );
    await expect(canvas.getByRole('tab', { name: 'Work' })).toHaveAttribute(
      'aria-selected',
      'true',
    );

    await userEvent.click(
      canvas.getByRole('button', { name: 'Add Schedule tab' }),
    );
    await expect(canvas.getByRole('tab', { name: 'Work' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expect(canvas.getByRole('tab', { name: 'Schedule' })).toHaveAttribute(
      'aria-selected',
      'false',
    );
  },
};

export const OverflowMetadata: Story = {
  name: 'Test: overflow keeps badge details and selection semantics',
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Box data-overflow-metadata-wrapper>
      <Tabs {...args} defaultValue="work">
        <Tab value="work">Work</Tab>
        <Tab
          value="materials"
          badge={3}
          badgeTooltip="2 Open Requests, 1 Backordered Item"
        >
          Materials
        </Tab>
        <Tab value="documents">Documents</Tab>
        <Tab value="history">History</Tab>
        <TabPanel value="work">Work content.</TabPanel>
        <TabPanel value="materials">Materials content.</TabPanel>
        <TabPanel value="documents">Documents content.</TabPanel>
        <TabPanel value="history">History content.</TabPanel>
      </Tabs>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const wrapper = canvasElement.querySelector<HTMLElement>(
      '[data-overflow-metadata-wrapper]',
    );

    if (!wrapper) throw new Error('overflow metadata wrapper not found');
    wrapper.style.width = '180px';

    const trigger = await canvas.findByRole('button', { name: 'More tabs' });
    await userEvent.click(trigger);

    const materials = await body.findByRole('menuitemradio', {
      name: /Materials \(3\)/,
    });
    await expect(materials).toHaveAttribute('aria-checked', 'false');
    await expect(materials).toHaveTextContent(
      '2 Open Requests, 1 Backordered Item',
    );
  },
};

const ComposedTabHandlersExample = () => {
  const [clickCount, setClickCount] = useState(0);
  const [lastKey, setLastKey] = useState('none');

  return (
    <Box>
      <Text pb="8" data-testid="consumer-events">
        Clicks: {clickCount}; last key: {lastKey}
      </Text>
      <Tabs aria-label="Handler composition" defaultValue="first">
        <Tab
          value="first"
          onClick={() => setClickCount((current) => current + 1)}
        >
          First
        </Tab>
        <Tab
          value="second"
          onKeyDown={(event: KeyboardEvent<HTMLElement>) =>
            setLastKey(event.key)
          }
        >
          Second
        </Tab>
        <TabPanel value="first">First content.</TabPanel>
        <TabPanel value="second">Second content.</TabPanel>
      </Tabs>
    </Box>
  );
};

export const ComposedTabHandlers: Story = {
  name: 'Test: consumer handlers preserve tab interactions',
  parameters: { controls: { disable: true } },
  render: () => <ComposedTabHandlersExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole('tab', { name: 'First' });
    const second = canvas.getByRole('tab', { name: 'Second' });
    const consumerEvents = canvas.getByTestId('consumer-events');

    await userEvent.click(second);
    await expect(second).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{ArrowLeft}');
    await expect(first).toHaveAttribute('aria-selected', 'true');
    await expect(consumerEvents).toHaveTextContent('last key: ArrowLeft');

    await userEvent.click(first);
    await expect(consumerEvents).toHaveTextContent('Clicks: 1');
  },
};

export const DisabledFirstTab: Story = {
  name: 'Test: disabled first tab is not the default',
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Box>
      <Text pb="12" color="text.subtlest">
        No `defaultValue` is given and the first tab is disabled. The strip
        selects the first enabled tab so the keyboard can still enter it.
      </Text>
      <Tabs {...args}>
        <Tab value="archived" disabled>
          Archived
        </Tab>
        <Tab value="open">Open</Tab>
        <Tab value="closed">Closed</Tab>
        <TabPanel value="archived">
          <Text py="16">Archived content.</Text>
        </TabPanel>
        <TabPanel value="open">
          <Text py="16">Open content.</Text>
        </TabPanel>
        <TabPanel value="closed">
          <Text py="16">Closed content.</Text>
        </TabPanel>
      </Tabs>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const open = canvas.getByRole('tab', { name: 'Open' });

    await expect(open).toHaveAttribute('aria-selected', 'true');
    await expect(open).toHaveAttribute('tabindex', '0');
    await expect(canvas.getByRole('tab', { name: 'Archived' })).toHaveAttribute(
      'aria-selected',
      'false',
    );

    // Tab from the page body lands on the strip's only focusable tab.
    await userEvent.tab();
    await expect(open).toHaveFocus();
  },
};

export const BadgeKeepsHeight: Story = {
  name: 'Test: badge does not change tab height',
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Box display="flex" flexDirection="column" gap="16">
      <Text color="text.subtlest">
        Both strips are 40px tall. The 20px badge sits inside the 22px line box
        and never grows the tab. Matches Figma `_TabsTab`.
      </Text>
      <Tabs {...args} aria-label="Without badges" defaultValue="work">
        <Tab value="work">Work</Tab>
        <Tab value="materials">Materials</Tab>
      </Tabs>
      <Tabs {...args} aria-label="With badges" defaultValue="work">
        <Tab value="work" badge={3}>
          Work
        </Tab>
        <Tab value="materials" badge={12} badgeTooltip="12 Backordered Items">
          Materials
        </Tab>
      </Tabs>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [plain, badged] = canvas.getAllByRole('tablist');

    await expect(badged?.offsetHeight).toBe(plain?.offsetHeight);

    for (const tab of canvas.getAllByRole('tab')) {
      await expect(tab.offsetHeight).toBe(40);
    }
  },
};

const fitTabs = ['Work', 'Info', 'Materials', 'Status'];

export const ToggleReserveOnlyOnOverflow: Story = {
  name: 'Test: toggle space is reserved only once tabs overflow',
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Box>
      <Text pb="12" color="text.subtlest">
        The wrapper is sized just above the strip width. Every tab fits, so no
        toggle renders. Shrinking it below the strip makes the measured toggle
        appear.
      </Text>
      <Box
        data-fit-wrapper
        borderWidth="1"
        borderStyle="dashed"
        borderColor="border"
      >
        <Tabs {...args} defaultValue="work">
          {fitTabs.map((label) => (
            <Tab key={label} value={label.toLowerCase()}>
              {label}
            </Tab>
          ))}
          {fitTabs.map((label) => (
            <TabPanel key={label} value={label.toLowerCase()}>
              <Text py="16">{label} content.</Text>
            </TabPanel>
          ))}
        </Tabs>
      </Box>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wrapper =
      canvasElement.querySelector<HTMLElement>('[data-fit-wrapper]');
    const list = canvas.getByRole('tablist');
    const tabs = canvas.getAllByRole('tab');

    if (!wrapper) throw new Error('wrapper not found');

    const gap = Number.parseFloat(getComputedStyle(list).columnGap) || 0;
    const needed =
      tabs.reduce((sum, tab) => sum + tab.getBoundingClientRect().width, 0) +
      gap * (tabs.length - 1);

    // Room for every tab, without reserving a toggle that is not rendered.
    wrapper.style.width = `${String(Math.ceil(needed) + 16)}px`;

    await waitFor(async () => {
      await expect(canvas.getAllByRole('tab')).toHaveLength(fitTabs.length);
      await expect(
        canvas.queryByRole('button', { name: 'More tabs' }),
      ).not.toBeInTheDocument();
    });

    // Now genuinely too narrow: the toggle renders and at least one tab hides.
    wrapper.style.width = `${String(Math.floor(needed) - 8)}px`;

    await waitFor(async () => {
      await expect(
        canvas.getByRole('button', { name: 'More tabs' }),
      ).toBeInTheDocument();
      await expect(canvas.getAllByRole('tab').length).toBeLessThan(
        fitTabs.length,
      );
    });
  },
};

export const FragmentChildren: Story = {
  name: 'Test: tabs grouped in fragments join the strip',
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Tabs {...args} aria-label="Fragment children" defaultValue="work">
      <>
        <Tab value="work">Work</Tab>
        <>
          <Tab value="materials">Materials</Tab>
        </>
      </>
      <>
        <TabPanel value="work">Work content.</TabPanel>
        <TabPanel value="materials">Materials content.</TabPanel>
      </>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole('tablist');
    const materials = canvas.getByRole('tab', { name: 'Materials' });

    await expect(within(list).getAllByRole('tab')).toHaveLength(2);

    await userEvent.click(materials);
    await expect(materials).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByText('Materials content.')).toBeVisible();
  },
};

const ConsumerRefExample = () => {
  const tabRef = useRef<HTMLButtonElement>(null);
  const [refTag, setRefTag] = useState('none');

  return (
    <Box>
      <Button
        variant="standard"
        mb="8"
        onClick={() => setRefTag(tabRef.current?.tagName ?? 'none')}
      >
        Read ref
      </Button>
      <Text pb="8" data-testid="consumer-ref">
        Ref: {refTag}
      </Text>
      <Tabs aria-label="Consumer ref" defaultValue="first">
        <Tab value="first">First</Tab>
        <Tab value="second" ref={tabRef}>
          Second
        </Tab>
        <TabPanel value="first">First content.</TabPanel>
        <TabPanel value="second">Second content.</TabPanel>
      </Tabs>
    </Box>
  );
};

export const ConsumerRef: Story = {
  name: 'Test: consumer ref keeps tab registration',
  parameters: { controls: { disable: true } },
  render: () => <ConsumerRefExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole('tab', { name: 'First' });
    const second = canvas.getByRole('tab', { name: 'Second' });

    await userEvent.click(canvas.getByRole('button', { name: 'Read ref' }));
    await expect(canvas.getByTestId('consumer-ref')).toHaveTextContent(
      'Ref: BUTTON',
    );

    // Keyboard focus reaches the ref'd tab only if it is still registered.
    await userEvent.click(first);
    await userEvent.keyboard('{ArrowRight}');
    await expect(second).toHaveAttribute('aria-selected', 'true');
    await expect(second).toHaveFocus();
  },
};

export const BadgeTooltipOnFocus: Story = {
  name: 'Test: badge tooltip opens on tab keyboard focus',
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Tabs {...args} aria-label="Badge tooltip" defaultValue="materials">
      <Tab value="materials" badge={3} badgeTooltip="2 Open Requests">
        Materials
      </Tab>
      <Tab value="status">Status</Tab>
      <TabPanel value="materials">Materials content.</TabPanel>
      <TabPanel value="status">Status content.</TabPanel>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const materials = canvas.getByRole('tab', { name: /Materials/ });

    await userEvent.tab();
    await expect(materials).toHaveFocus();

    const tooltip = await body.findByRole('tooltip');
    await expect(tooltip).toHaveTextContent('2 Open Requests');
    await expect(materials).toHaveAttribute('aria-describedby', tooltip.id);
  },
};

const DeferredControlledTabs = () => {
  const [value, setValue] = useState('alpha');
  const [requests, setRequests] = useState<string[]>([]);

  return (
    <Box>
      <Text pb="8" data-testid="deferred-value">
        Parent value: {value}
      </Text>
      <Text pb="8" data-testid="deferred-requests">
        Requests: {requests.join(', ')}
      </Text>
      <Box data-deferred-wrapper>
        <Tabs
          aria-label="Deferred selection"
          value={value}
          // The parent commits the new value a moment later, the way a
          // transition or a server round trip would.
          onChange={(_event, nextValue) => {
            setRequests((current) => [...current, nextValue]);
            globalThis.setTimeout(() => setValue(nextValue), 300);
          }}
        >
          <Tab value="alpha">Alpha section</Tab>
          <Tab value="bravo">Bravo section</Tab>
          <Tab value="charlie">Charlie section</Tab>
          <TabPanel value="alpha">Alpha content.</TabPanel>
          <TabPanel value="bravo">Bravo content.</TabPanel>
          <TabPanel value="charlie">Charlie content.</TabPanel>
        </Tabs>
      </Box>
    </Box>
  );
};

export const DeferredControlledOverflow: Story = {
  name: 'Test: deferred controlled selection keeps the focused tab visible',
  parameters: { controls: { disable: true } },
  render: () => <DeferredControlledTabs />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wrapper = canvasElement.querySelector<HTMLElement>(
      '[data-deferred-wrapper]',
    );

    if (!wrapper) throw new Error('deferred wrapper not found');

    const alpha = canvas.getByRole('tab', { name: 'Alpha section' });
    // Room for the selected tab and the toggle only.
    wrapper.style.width = `${String(Math.ceil(alpha.getBoundingClientRect().width) + 48)}px`;

    await waitFor(async () => {
      await expect(canvas.getAllByRole('tab')).toHaveLength(1);
    });

    await userEvent.click(alpha);
    await userEvent.keyboard('{ArrowRight}');

    // Before the parent commits, the requested tab stays visible and focused.
    const bravo = await canvas.findByRole('tab', { name: 'Bravo section' });
    await expect(bravo).toHaveFocus();
    await expect(canvas.getByTestId('deferred-value')).toHaveTextContent(
      'Parent value: alpha',
    );

    await waitFor(async () => {
      await expect(canvas.getByTestId('deferred-value')).toHaveTextContent(
        'Parent value: bravo',
      );
    });
    await expect(bravo).toHaveAttribute('aria-selected', 'true');
    await expect(bravo).toHaveFocus();

    // Repeated keys walk from the focused tab, not the committed value.
    wrapper.style.width = '';
    await waitFor(async () => {
      await expect(canvas.getAllByRole('tab')).toHaveLength(3);
    });

    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(async () => {
      await expect(canvas.getByTestId('deferred-value')).toHaveTextContent(
        'Parent value: alpha',
      );
    });

    // Both presses land before the parent commits: Alpha → Bravo → Charlie.
    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    const charlie = canvas.getByRole('tab', { name: 'Charlie section' });
    await expect(charlie).toHaveFocus();
    await waitFor(async () => {
      await expect(canvas.getByTestId('deferred-value')).toHaveTextContent(
        'Parent value: charlie',
      );
    });

    // And back again: Charlie → Bravo → Alpha.
    await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');
    await expect(
      canvas.getByRole('tab', { name: 'Alpha section' }),
    ).toHaveFocus();
    await waitFor(async () => {
      await expect(canvas.getByTestId('deferred-value')).toHaveTextContent(
        'Parent value: alpha',
      );
    });
  },
};

export const DeferredControlledReversal: Story = {
  name: 'Test: a deferred return to the committed tab still reaches the parent',
  parameters: { controls: { disable: true } },
  render: () => <DeferredControlledTabs />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alpha = canvas.getByRole('tab', { name: 'Alpha section' });

    await userEvent.click(alpha);
    // Right then Left before the parent commits Bravo.
    await userEvent.keyboard('{ArrowRight}{ArrowLeft}');
    await expect(alpha).toHaveFocus();
    await expect(canvas.getByTestId('deferred-requests')).toHaveTextContent(
      'Requests: bravo, alpha',
    );

    // Both commits land in order, so the parent ends on the focused tab.
    await new Promise((resolve) => globalThis.setTimeout(resolve, 500));
    await expect(canvas.getByTestId('deferred-value')).toHaveTextContent(
      'Parent value: alpha',
    );
    await expect(alpha).toHaveAttribute('aria-selected', 'true');
    await expect(alpha).toHaveFocus();
  },
};

export const DeferredControlledNarrowStrip: Story = {
  name: 'Test: rapid keys in a narrow deferred strip keep focus through intermediate commits',
  parameters: { controls: { disable: true } },
  render: () => <DeferredControlledTabs />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wrapper = canvasElement.querySelector<HTMLElement>(
      '[data-deferred-wrapper]',
    );

    if (!wrapper) throw new Error('deferred wrapper not found');

    const value = canvas.getByTestId('deferred-value');
    const settle = async (expected: string) => {
      await waitFor(async () => {
        await expect(value).toHaveTextContent(`Parent value: ${expected}`);
      });
      // Let the last commit's layout and focus work finish.
      await new Promise((resolve) => globalThis.setTimeout(resolve, 100));
    };

    const alpha = canvas.getByRole('tab', { name: 'Alpha section' });
    // Room for the selected tab and the toggle only. The strip stays this
    // narrow for the whole test, so every requested tab starts overflowed.
    wrapper.style.width = `${String(Math.ceil(alpha.getBoundingClientRect().width) + 48)}px`;

    await waitFor(async () => {
      await expect(canvas.getAllByRole('tab')).toHaveLength(1);
    });

    await userEvent.click(alpha);

    // Both presses land before the parent commits: Alpha → Bravo → Charlie.
    // The Bravo commit arrives while Charlie still holds focus.
    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    const charlie = await canvas.findByRole('tab', { name: 'Charlie section' });
    await expect(charlie).toHaveFocus();

    await waitFor(async () => {
      await expect(value).toHaveTextContent('Parent value: bravo');
    });
    await expect(charlie).toBeVisible();
    await expect(charlie).toHaveFocus();

    await settle('charlie');
    await expect(charlie).toHaveAttribute('aria-selected', 'true');
    await expect(charlie).toHaveFocus();

    // And back: Charlie → Bravo → Alpha, with the Bravo commit in between.
    await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');
    await settle('alpha');
    const alphaAgain = canvas.getByRole('tab', { name: 'Alpha section' });
    await expect(alphaAgain).toHaveAttribute('aria-selected', 'true');
    await expect(alphaAgain).toHaveFocus();

    // A return to the committed tab: Right then Left before Bravo commits.
    await userEvent.keyboard('{ArrowRight}{ArrowLeft}');
    await settle('alpha');
    await expect(canvas.getByTestId('deferred-requests')).toHaveTextContent(
      /bravo, alpha$/,
    );
    await expect(
      canvas.getByRole('tab', { name: 'Alpha section' }),
    ).toHaveFocus();
  },
};

const EmptyStringValueTabs = () => {
  const [value, setValue] = useState('missing');

  return (
    <Box>
      <Text pb="8" data-testid="empty-fallback-value">
        Parent value: &quot;{value}&quot;
      </Text>
      <Tabs
        aria-label="Empty fallback"
        value={value}
        onChange={(_event, nextValue) => setValue(nextValue)}
      >
        <Tab value="">Overview</Tab>
        <Tab value="details">Details</Tab>
        <TabPanel value="">Overview content.</TabPanel>
        <TabPanel value="details">Details content.</TabPanel>
      </Tabs>
      <Box data-empty-wrapper pt="16">
        <Tabs aria-label="Empty selected" defaultValue="">
          <Tab value="work">Work section</Tab>
          <Tab value="materials">Materials section</Tab>
          <Tab value="">Summary section</Tab>
          <TabPanel value="work">Work content.</TabPanel>
          <TabPanel value="materials">Materials content.</TabPanel>
          <TabPanel value="">Summary content.</TabPanel>
        </Tabs>
      </Box>
    </Box>
  );
};

export const EmptyStringValue: Story = {
  name: 'Test: an empty-string tab value is a real selection',
  parameters: { controls: { disable: true } },
  render: () => <EmptyStringValueTabs />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fallback notifies the parent even when the first tab's value is ''.
    await waitFor(async () => {
      await expect(
        canvas.getByTestId('empty-fallback-value'),
      ).toHaveTextContent('Parent value: ""');
    });
    await expect(canvas.getByRole('tab', { name: 'Overview' })).toHaveAttribute(
      'aria-selected',
      'true',
    );

    // A selected '' tab stays visible in a narrow strip and keeps the tab stop.
    const wrapper = canvasElement.querySelector<HTMLElement>(
      '[data-empty-wrapper]',
    );
    if (!wrapper) throw new Error('empty wrapper not found');

    const summary = canvas.getByRole('tab', { name: 'Summary section' });
    wrapper.style.width = `${String(Math.ceil(summary.getBoundingClientRect().width) + 48)}px`;

    const list = canvas.getByRole('tablist', { name: 'Empty selected' });
    await waitFor(async () => {
      await expect(within(list).getAllByRole('tab')).toHaveLength(1);
    });
    const visible = within(list).getByRole('tab', { name: 'Summary section' });
    await expect(visible).toHaveAttribute('aria-selected', 'true');
    await expect(visible).toHaveAttribute('tabindex', '0');
  },
};

export const NoEnabledTabs: Story = {
  name: 'Test: with no enabled tabs, an empty-string tab is not selected',
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Tabs {...args} aria-label="No enabled tabs">
      <Tab value="" disabled>
        Overview
      </Tab>
      <Tab value="details" disabled>
        Details
      </Tab>
      <TabPanel value="">
        <Text py="16">Overview content.</Text>
      </TabPanel>
      <TabPanel value="details">
        <Text py="16">Details content.</Text>
      </TabPanel>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    for (const tab of canvas.getAllByRole('tab')) {
      await expect(tab).toHaveAttribute('aria-selected', 'false');
    }
    await expect(canvas.getByText('Overview content.')).not.toBeVisible();
    await expect(canvas.getByText('Details content.')).not.toBeVisible();
  },
};

export const ResponsivePanelDisplay: Story = {
  name: 'Test: a responsive panel display never reveals an inactive panel',
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Tabs {...args} aria-label="Responsive panels" defaultValue="work">
      <Tab value="work">Work</Tab>
      <Tab value="materials">Materials</Tab>
      <TabPanel value="work" display={{ xs: 'flex' }} gap="8" py="16">
        <Text>Work content.</Text>
        <Button>Start work</Button>
      </TabPanel>
      <TabPanel value="materials" display={{ xs: 'flex' }} gap="8" py="16">
        <Text>Materials content.</Text>
        <Button>Issue materials</Button>
      </TabPanel>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Work content.')).toBeVisible();
    await expect(canvas.getByText('Materials content.')).not.toBeVisible();
    await expect(
      canvas.queryByRole('button', { name: 'Issue materials' }),
    ).toBeNull();

    await userEvent.click(canvas.getByRole('tab', { name: 'Materials' }));
    await expect(canvas.getByText('Materials content.')).toBeVisible();
    await expect(canvas.getByText('Work content.')).not.toBeVisible();
  },
};

export const ValuesWithSpaces: Story = {
  name: 'Test: tab values with spaces still link tab and panel',
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Tabs {...args} aria-label="Order sections" defaultValue="work orders">
      <Tab value="work orders">Work orders</Tab>
      <Tab value="sales orders">Sales orders</Tab>
      <TabPanel value="work orders">
        <Text py="16">Open work orders.</Text>
      </TabPanel>
      <TabPanel value="sales orders">
        <Text py="16">Open sales orders.</Text>
      </TabPanel>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tab = canvas.getByRole('tab', { name: 'Work orders' });
    const panel = canvas.getByRole('tabpanel', { name: 'Work orders' });

    await expect(panel.id).not.toMatch(/\s/);
    await expect(tab.id).not.toMatch(/\s/);
    await expect(tab).toHaveAttribute('aria-controls', panel.id);
    await expect(panel).toHaveAttribute('aria-labelledby', tab.id);
  },
};

// `id` is not part of the Tab or TabPanel types; this simulates an untyped
// consumer passing one anyway.
const consumerId = (id: string) => ({ id }) as object;

export const ConsumerIdsIgnored: Story = {
  name: 'Test: a consumer id never breaks the tab and panel links',
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Tabs {...args} aria-label="Consumer ids" defaultValue="work">
      <Tab value="work" {...consumerId('work-tab')}>
        Work
      </Tab>
      <Tab value="materials">Materials</Tab>
      <TabPanel value="work" {...consumerId('work-panel')}>
        <Text py="16">Work content.</Text>
      </TabPanel>
      <TabPanel value="materials">
        <Text py="16">Materials content.</Text>
      </TabPanel>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tab = canvas.getByRole('tab', { name: 'Work' });
    const panel = canvas.getByRole('tabpanel', { name: 'Work' });

    await expect(tab.id).not.toBe('work-tab');
    await expect(panel.id).not.toBe('work-panel');
    await expect(tab).toHaveAttribute('aria-controls', panel.id);
    await expect(panel).toHaveAttribute('aria-labelledby', tab.id);
  },
};

export const OverflowMenuFocus: Story = {
  name: 'Test: choosing a hidden tab from the menu focuses that tab',
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Box data-overflow-focus-wrapper>
      <Tabs {...args} aria-label="Overflow focus" defaultValue="work">
        <Tab value="work">Work</Tab>
        <Tab value="materials">Materials</Tab>
        <Tab value="documents">Documents</Tab>
        <Tab value="history">History</Tab>
        <TabPanel value="work">Work content.</TabPanel>
        <TabPanel value="materials">Materials content.</TabPanel>
        <TabPanel value="documents">Documents content.</TabPanel>
        <TabPanel value="history">History content.</TabPanel>
      </Tabs>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const wrapper = canvasElement.querySelector<HTMLElement>(
      '[data-overflow-focus-wrapper]',
    );

    if (!wrapper) throw new Error('overflow focus wrapper not found');
    wrapper.style.width = '180px';

    await waitFor(async () => {
      await expect(canvas.queryByRole('tab', { name: 'History' })).toBeNull();
    });

    const trigger = await canvas.findByRole('button', { name: 'More tabs' });
    await userEvent.click(trigger);
    await userEvent.click(
      await body.findByRole('menuitemradio', { name: 'History' }),
    );

    const history = await canvas.findByRole('tab', { name: 'History' });
    await expect(history).toHaveAttribute('aria-selected', 'true');

    // Closing the menu queues a focus return to its trigger. Wait a frame so
    // that queued work has run, then check that focus stayed on the tab.
    await new Promise((resolve) => globalThis.requestAnimationFrame(resolve));
    await expect(history).toHaveFocus();
  },
};

const ExternallyControlledTabs = () => {
  const [value, setValue] = useState('alpha');
  const [requests, setRequests] = useState<string[]>([]);

  return (
    <Box>
      <Button variant="hollow" size="sm" onClick={() => setValue('bravo')}>
        Select Bravo from outside
      </Button>
      <Text py="8" data-testid="external-requests">
        Requests: {requests.length > 0 ? requests.join(', ') : 'none'}
      </Text>
      <Tabs
        aria-label="External selection"
        value={value}
        onChange={(_event, nextValue) => {
          setRequests((current) => [...current, nextValue]);
          setValue(nextValue);
        }}
      >
        <Tab value="alpha">Alpha section</Tab>
        <Tab value="bravo">Bravo section</Tab>
        <TabPanel value="alpha">Alpha content.</TabPanel>
        <TabPanel value="bravo">Bravo content.</TabPanel>
      </Tabs>
    </Box>
  );
};

export const ExternalValueChange: Story = {
  name: 'Test: clicking a tab the parent already selected sends no change',
  parameters: { controls: { disable: true } },
  render: () => <ExternallyControlledTabs />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const requests = canvas.getByTestId('external-requests');

    await userEvent.click(
      canvas.getByRole('button', { name: 'Select Bravo from outside' }),
    );
    const bravo = canvas.getByRole('tab', { name: 'Bravo section' });
    await expect(bravo).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(bravo);
    await expect(requests).toHaveTextContent('Requests: none');

    await userEvent.click(canvas.getByRole('tab', { name: 'Alpha section' }));
    await expect(requests).toHaveTextContent('Requests: alpha');
  },
};
