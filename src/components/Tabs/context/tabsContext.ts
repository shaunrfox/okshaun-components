import type { TabsVariantProps } from '@styled-system/recipes';
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from 'react';
import {
  Children,
  cloneElement,
  createContext,
  Fragment,
  isValidElement,
  useContext,
} from 'react';

import type { BoxProps } from '~/components/Box';
import { getCompoundComponentType } from '~/utils/compoundComponent';

/** Slot class names produced by the `tabs` recipe and shared with tab parts. */
export type TabsClasses = Record<
  'root' | 'strip' | 'list' | 'tab' | 'badge' | 'overflow' | 'menu' | 'panel',
  string
>;

/** React event that produced a tab selection, or `null` for an automatic fallback. */
export type TabsChangeEvent =
  | ReactMouseEvent<HTMLElement>
  | ReactKeyboardEvent<HTMLElement>
  | null;

/**
 * Why the selected tab changed.
 *
 * `clicked-on-tab` covers direct activation in the tab strip, by pointer or by
 * keyboard. `selected-from-overflow` covers a pick from the overflow menu.
 * `fallback-after-removal` keeps controlled state aligned when the selected
 * tab is removed or disabled.
 */
export type TabsChangeReason =
  | 'clicked-on-tab'
  | 'selected-from-overflow'
  | 'fallback-after-removal';

/**
 * Runs when user interaction changes the tab or an unavailable controlled
 * value falls back to the first enabled tab.
 *
 * @param event - The React event that caused the change, or `null` when the
 * selected tab became unavailable.
 * @param value - The `value` of the newly selected tab.
 * @param reason - Which interaction produced the change.
 */
export type TabsChangeHandler = (
  event: TabsChangeEvent,
  value: string,
  reason: TabsChangeReason,
) => void;

type TabsOwnProps = {
  /** `Tab` and `TabPanel` children. Tab order in the strip follows source order. */
  children: ReactNode;
  /** Controlled selected tab `value`. Pair with `onChange`; omit it to use `defaultValue`. */
  value?: string;
  /**
   * Initially selected tab `value` when `value` is not provided. It is used
   * only on first render.
   * @default the first `Tab` child's `value`
   */
  defaultValue?: string;
  /** Runs when user interaction selects a different tab. */
  onChange?: TabsChangeHandler;
  /**
   * Renders only the selected `TabPanel`. By default every panel stays mounted
   * and inactive panels are hidden with `display: none`, which preserves their
   * scroll position and local state.
   * @default false
   */
  unmountInactive?: boolean;
  /**
   * Accessible name for the tab strip. Provide this or `aria-labelledby` so the
   * `tablist` is announced.
   */
  'aria-label'?: string;
  /** Id of an element that labels the tab strip. */
  'aria-labelledby'?: string;
};

/** Props for {@link Tabs}, the tab strip and panel container. */
export type TabsProps = Omit<
  BoxProps,
  keyof TabsVariantProps | keyof TabsOwnProps
> &
  Omit<TabsVariantProps, 'overflowed'> &
  TabsOwnProps;

type TabOwnProps = {
  /** Identifies the tab and the `TabPanel` it controls. Must be unique within a `Tabs`. */
  value: string;
  /** Visible label rendered in the strip. Plain text is also reused as the overflow-menu row's text unless `label` overrides it. */
  children?: ReactNode;
  /**
   * Plain-text name for this tab's overflow-menu row, which cannot render
   * markup. Set it when `children` contain more than text — an icon, a nested
   * element — because flattening those to a string reads badly. It never
   * changes what the strip renders: `children` still render there as-is.
   * Without it the menu row falls back to the flattened `children`, then to
   * `value`.
   */
  label?: string;
  /** Count shown in a trailing {@link Badge}. A zero or omitted count renders no badge. */
  badge?: number;
  /** Tooltip text describing what the badge counts. Requires `badge`. */
  badgeTooltip?: string;
  /** Prevents selection and skips the tab during arrow-key navigation. */
  disabled?: boolean;
};

/**
 * Props for {@link Tab}, one selectable item in a {@link Tabs} strip.
 *
 * `id` is omitted: `Tabs` generates it so `aria-controls` and
 * `aria-labelledby` always point at the matching panel.
 */
export type TabProps = Omit<BoxProps, keyof TabOwnProps | 'id'> & TabOwnProps;

/** Argument passed to a {@link TabPanel} render-prop child. */
export type TabPanelRenderProps = {
  /** Whether this panel's tab is currently selected. */
  isActive: boolean;
};

type TabPanelOwnProps = {
  /** `value` of the {@link Tab} this panel belongs to. */
  value: string;
  /**
   * Panel content. A function child receives `{ isActive }` so expensive work
   * can pause while the panel is mounted but hidden.
   */
  children?: ReactNode | ((props: TabPanelRenderProps) => ReactNode);
};

/**
 * Props for {@link TabPanel}, the content region for one {@link Tab}.
 *
 * `id` is omitted: `Tabs` generates it so `aria-controls` and
 * `aria-labelledby` always point at the matching tab.
 */
export type TabPanelProps = Omit<BoxProps, keyof TabPanelOwnProps | 'id'> &
  TabPanelOwnProps;

/** State and behavior shared by tab compound components. */
export type TabsContextValue = {
  /** Currently selected tab value, or `undefined` when no tab is selectable. */
  selectedValue: string | undefined;
  /** Applies a selection request from a tab or the overflow menu. */
  selectTab: (
    event: TabsChangeEvent,
    value: string,
    reason: TabsChangeReason,
  ) => void;
  /** Stores or clears a tab's DOM element so widths can be measured. */
  registerTabElement: (value: string, element: HTMLElement | null) => void;
  /** Handles arrow-key, Home, and End navigation from any tab. */
  onTabKeyDown: (event: ReactKeyboardEvent<HTMLElement>) => void;
  /** Values currently moved into the overflow menu. */
  overflowValues: readonly string[];
  /** Whether only the selected panel is mounted. */
  unmountInactive: boolean;
  /** Recipe slot classes computed once by `Tabs`. */
  classes: TabsClasses;
  /** Returns the DOM id of a tab button. */
  getTabId: (value: string) => string;
  /** Returns the DOM id of a tab panel. */
  getPanelId: (value: string) => string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

const TabPanelActiveContext = createContext(true);

export const TabsProvider = TabsContext.Provider;

export const TabPanelActiveProvider = TabPanelActiveContext.Provider;

/**
 * Returns the enclosing tab strip's shared state.
 *
 * Must be called below `Tabs`; otherwise it throws.
 */
export const useTabsContext = (): TabsContextValue => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('Tabs compound components must be used within <Tabs />');
  }

  return context;
};

/**
 * Returns whether the surrounding `TabPanel` is the selected one.
 *
 * Panels stay mounted by default, so hidden content keeps running unless it
 * checks this value. Use it to pause polling, animation, or media playback.
 * Returns `true` outside a `TabPanel`.
 *
 * @example
 * ```tsx
 * const isActive = useTabPanelActive();
 * useEffect(() => {
 *   if (!isActive) return;
 *   const id = setInterval(refresh, 5000);
 *   return () => clearInterval(id);
 * }, [isActive]);
 * ```
 */
export const useTabPanelActive = (): boolean =>
  useContext(TabPanelActiveContext);

export const TABS_COMPONENT_TYPES = {
  tab: 'Tab',
  panel: 'TabPanel',
} as const;

export const tabsComponentTypeKey = '__tabsComponentType' as const;

/** Returns the internal tab compound-component marker for a node, or `null`. */
export const getTabsComponentType = (node: unknown): string | null => {
  return getCompoundComponentType(node, tabsComponentTypeKey);
};

/**
 * Flattens `Tabs` children into a single list, expanding React fragments at any
 * depth so tabs and panels grouped in `<>…</>` are treated as direct children.
 * Arrays are already flattened by `Children.toArray`. Each fragment's key
 * prefixes the keys of its children, so siblings from different fragments
 * keep unique keys.
 */
export const flattenTabsChildren = (children: ReactNode): ReactNode[] => {
  const flattened: ReactNode[] = [];

  const visit = (nodes: ReactNode, keyPrefix: string) => {
    Children.toArray(nodes).forEach((child) => {
      if (
        isValidElement<{ children?: ReactNode }>(child) &&
        child.type === Fragment
      ) {
        visit(child.props.children, `${keyPrefix}${String(child.key)}/`);
        return;
      }

      flattened.push(
        keyPrefix !== '' && isValidElement(child)
          ? cloneElement(child, { key: `${keyPrefix}${String(child.key)}` })
          : child,
      );
    });
  };

  visit(children, '');
  return flattened;
};
