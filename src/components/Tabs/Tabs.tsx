import { cx } from '@styled-system/css';
import { tabs as tabsRecipe } from '@styled-system/recipes';
import type { ReactNode } from 'react';
import { useId, useMemo, useRef, useState } from 'react';

import { useLocale } from '~/system/context/useLocale';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import { Box } from '../Box';
import { IconButton } from '../IconButton';
import { Menu, MenuItem } from '../Menu';

import {
  flattenTabsChildren,
  getTabsComponentType,
  TABS_COMPONENT_TYPES,
  type TabsChangeEvent,
  type TabsChangeReason,
  type TabsClasses,
  type TabsContextValue,
  type TabsProps,
  TabsProvider,
} from './context/tabsContext';
import { type TabDescriptor, useTabs } from './useTabs';

type TabsOverflowMenuProps = {
  className: string;
  focusTab: (value: string, options?: { afterMenuClose?: boolean }) => void;
  tabs: TabDescriptor[];
  selectTab: (
    event: TabsChangeEvent,
    value: string,
    reason: TabsChangeReason,
  ) => void;
  selectedValue: string | undefined;
};

const TabsOverflowMenu = ({
  className,
  focusTab,
  tabs,
  selectTab,
  selectedValue,
}: TabsOverflowMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { labels } = useLocale();

  return (
    <Menu
      open={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom-end"
      className={className}
      trigger={
        <IconButton
          variant="ghost"
          size="md"
          iconName={isOpen ? 'caret-up' : 'caret-down'}
          altText={labels.moreTabs}
          aria-haspopup="menu"
        />
      }
    >
      {tabs.map((tab) => {
        const hasBadge = typeof tab.badge === 'number' && tab.badge !== 0;

        return (
          <MenuItem
            key={tab.value}
            label={hasBadge ? `${tab.label} (${String(tab.badge)})` : tab.label}
            description={hasBadge ? tab.badgeTooltip : undefined}
            disabled={tab.disabled}
            selected={tab.value === selectedValue}
            role="menuitemradio"
            aria-checked={tab.value === selectedValue}
            onClick={(event) => {
              selectTab(event, tab.value, 'selected-from-overflow');
              setIsOpen(false);
              focusTab(tab.value, { afterMenuClose: true });
            }}
          />
        );
      })}
    </Menu>
  );
};

/**
 * Groups related content into a single view with one panel visible at a time.
 *
 * Compose it from `Tab` and `TabPanel` children; the first enabled `Tab` is
 * selected by default. Selection is uncontrolled with `defaultValue` or
 * controlled with `value` plus `onChange`. Tabs that do not fit the available width move into
 * an overflow menu at the end of the strip, and the selected tab always stays
 * visible. Every panel stays mounted and hidden unless `unmountInactive` is
 * set, so read `useTabPanelActive()` to pause work in a hidden panel.
 *
 * The strip renders a `tablist` with roving tabindex and Arrow, Home, and End
 * navigation. Supply `aria-label` or `aria-labelledby` so it is announced.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="work" aria-label="Order sections">
 *   <Tab value="work">Work</Tab>
 *   <Tab value="materials" badge={3}>Materials</Tab>
 *   <TabPanel value="work">Work content</TabPanel>
 *   <TabPanel value="materials">Materials content</TabPanel>
 * </Tabs>
 * ```
 */
export const Tabs = (props: TabsProps) => {
  const { labels } = useLocale();
  const {
    children,
    value,
    defaultValue,
    onChange,
    unmountInactive = false,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...rest
  } = props;

  const [className, otherProps] = splitProps(rest);
  const listRef = useRef<HTMLDivElement>(null);
  const overflowRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  const {
    focusTab,
    hasOverflow,
    onTabKeyDown,
    overflowTabs,
    overflowValues,
    registerTabElement,
    selectTab,
    selectedValue,
  } = useTabs({
    children,
    value,
    defaultValue,
    onChange,
    listRef,
    overflowRef,
  });

  const classes = useMemo(
    () => tabsRecipe({ hasOverflow }) as TabsClasses,
    [hasOverflow],
  );

  // `Tab` children belong in the strip; everything else (panels and any
  // consumer markup) renders below it. Fragments are expanded first so tabs
  // grouped in `<>…</>` still reach the strip.
  const [tabChildren, restChildren] = useMemo(() => {
    const strip: ReactNode[] = [];
    const below: ReactNode[] = [];

    flattenTabsChildren(children).forEach((child) => {
      if (getTabsComponentType(child) === TABS_COMPONENT_TYPES.tab) {
        strip.push(child);
      } else {
        below.push(child);
      }
    });

    return [strip, below] as const;
  }, [children]);

  const contextValue = useMemo<TabsContextValue>(
    () => ({
      classes,
      // Values are free text; encoding keeps spaces out of the IDs that
      // `aria-controls` and `aria-labelledby` parse as token lists.
      getPanelId: (tabValue: string) =>
        `${baseId}-panel-${encodeURIComponent(tabValue)}`,
      getTabId: (tabValue: string) =>
        `${baseId}-tab-${encodeURIComponent(tabValue)}`,
      onTabKeyDown,
      overflowValues,
      registerTabElement,
      selectTab,
      selectedValue,
      unmountInactive,
    }),
    [
      baseId,
      classes,
      onTabKeyDown,
      overflowValues,
      registerTabElement,
      selectTab,
      selectedValue,
      unmountInactive,
    ],
  );

  return (
    <TabsProvider value={contextValue}>
      <Box
        {...dsComponent('Tabs')}
        className={cx(classes.root, className)}
        {...otherProps}
      >
        <Box className={classes.strip}>
          <Box
            ref={listRef}
            role="tablist"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-orientation="horizontal"
            className={classes.list}
          >
            {tabChildren}
          </Box>
          <Box
            ref={overflowRef}
            className={classes.overflow}
            aria-hidden={!hasOverflow || undefined}
          >
            {hasOverflow ? (
              <TabsOverflowMenu
                className={classes.menu}
                focusTab={focusTab}
                tabs={overflowTabs}
                selectTab={selectTab}
                selectedValue={selectedValue}
              />
            ) : (
              <IconButton
                variant="ghost"
                size="md"
                iconName="caret-down"
                altText={labels.moreTabs}
                disabled
                tabIndex={-1}
              />
            )}
          </Box>
        </Box>
        {restChildren}
      </Box>
    </TabsProvider>
  );
};
