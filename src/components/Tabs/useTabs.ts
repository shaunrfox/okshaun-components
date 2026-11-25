import type {
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
  RefObject,
} from 'react';
import { isValidElement, useCallback, useEffect, useMemo, useRef } from 'react';
import { useControllableState } from '~/system/hooks/useControllableState';
import { useOverflowItems } from '~/system/hooks/useOverflowItems';

import {
  flattenTabsChildren,
  getTabsComponentType,
  TABS_COMPONENT_TYPES,
  type TabsChangeEvent,
  type TabsChangeReason,
  type TabsProps,
} from './context/tabsContext';

/** One `Tab` child, described from its props. */
export type TabDescriptor = {
  value: string;
  label: string;
  disabled: boolean;
  badge?: number;
  badgeTooltip?: string;
};

type UseTabsOptions = Pick<
  TabsProps,
  'children' | 'defaultValue' | 'onChange' | 'value'
> & {
  /** Ref for the `tablist` element, used as the measurement container. */
  listRef: RefObject<HTMLElement | null>;
  /** Ref for the rendered overflow control whose width is reserved. */
  overflowRef: RefObject<HTMLElement | null>;
};

/** Flattens a label node to plain text for the overflow menu and tooltips. */
const getNodeText = (node: ReactNode): string => {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return '';
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map((child) => getNodeText(child as ReactNode)).join('');
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }

  return '';
};

/**
 * Owns tab selection, DOM registration, overflow measurement, and roving
 * keyboard navigation for `Tabs`.
 */
export const useTabs = ({
  children,
  value,
  defaultValue,
  onChange,
  listRef,
  overflowRef,
}: UseTabsOptions) => {
  const tabs = useMemo<TabDescriptor[]>(() => {
    const descriptors: TabDescriptor[] = [];

    flattenTabsChildren(children).forEach((child) => {
      if (
        !isValidElement(child) ||
        getTabsComponentType(child) !== TABS_COMPONENT_TYPES.tab
      ) {
        return;
      }

      const props = child.props as {
        value?: string;
        children?: ReactNode;
        label?: string;
        disabled?: boolean;
        badge?: number;
        badgeTooltip?: string;
      };

      if (typeof props.value !== 'string') return;

      descriptors.push({
        value: props.value,
        // An explicit `label` overrides the flattened children, which in turn
        // fall back to `value` when the children carry no text at all.
        label: props.label || getNodeText(props.children) || props.value,
        disabled: Boolean(props.disabled),
        badge: props.badge,
        badgeTooltip: props.badgeTooltip,
      });
    });

    return descriptors;
  }, [children]);

  const tabValues = useMemo(() => tabs.map((tab) => tab.value), [tabs]);

  // The default selection must be reachable: a disabled tab has no focusable
  // button, and every other tab sits at tabIndex -1, so selecting a disabled
  // first tab would leave keyboard users with no way into the tablist.
  // `undefined` means no tab is selectable; `''` is a valid tab value.
  const firstValue = tabs.find((tab) => !tab.disabled)?.value;

  const [storedValue, setStoredValue, isControlled] =
    useControllableState<string>({
      value,
      defaultValue: defaultValue ?? firstValue ?? '',
    });

  // The last value this strip asked for. A controlled parent may commit a
  // request after a delay, so the stored value alone cannot tell whether a
  // request is still pending: pressing Right then Left before the parent
  // commits must still send the return request back to the parent.
  const requestedValueRef = useRef(storedValue);

  // Requests sent to the parent and not yet committed, oldest first.
  const pendingRequestsRef = useRef<string[]>([]);

  const recordRequest = useCallback((nextValue: string) => {
    requestedValueRef.current = nextValue;
    pendingRequestsRef.current = [
      ...pendingRequestsRef.current.filter((pending) => pending !== nextValue),
      nextValue,
    ];
  }, []);

  // A stored value this strip requested is a commit: it settles that request
  // and every older one, and newer requests stay pending. Any other stored
  // value came from the parent alone, so no request is pending any more.
  // Without this, an external change leaves the ref on the old value, and a
  // click on the already-selected tab sends a redundant `onChange`.
  useEffect(() => {
    const pending = pendingRequestsRef.current;
    const index = pending.indexOf(storedValue);

    if (index === -1) {
      pendingRequestsRef.current = [];
      requestedValueRef.current = storedValue;
      return;
    }

    pendingRequestsRef.current = pending.slice(index + 1);
  }, [storedValue]);

  // A conditionally rendered or newly disabled tab cannot remain selected:
  // its button is absent from the tab order and would make the strip
  // unreachable by keyboard.
  const storedTab = tabs.find((tab) => tab.value === storedValue);
  const isStoredValueSelectable = Boolean(storedTab && !storedTab.disabled);
  // `undefined` means no tab is selected. It must stay distinct from `''`,
  // which is a valid tab value: with no enabled tabs, a disabled `value=""`
  // tab must not report itself selected.
  const selectedValue: string | undefined = isStoredValueSelectable
    ? storedValue
    : firstValue;

  // Commit automatic fallbacks to the real state, not only the rendered
  // selection. Otherwise an uncontrolled value can silently resurrect if its
  // tab is later added again. Controlled parents receive the same fallback so
  // their value remains aligned. A ref prevents repeated notifications when a
  // parent intentionally leaves an invalid controlled value unchanged.
  const fallbackNotificationRef = useRef<string | null>(null);
  useEffect(() => {
    if (isStoredValueSelectable) {
      fallbackNotificationRef.current = null;
      return;
    }

    const notificationKey = JSON.stringify([storedValue, firstValue ?? null]);
    if (fallbackNotificationRef.current === notificationKey) return;

    fallbackNotificationRef.current = notificationKey;
    if (!isControlled) {
      setStoredValue(firstValue ?? '');
    }
    if (firstValue !== undefined) {
      recordRequest(firstValue);
      onChange?.(null, firstValue, 'fallback-after-removal');
    }
  }, [
    firstValue,
    isControlled,
    isStoredValueSelectable,
    onChange,
    recordRequest,
    setStoredValue,
    storedValue,
  ]);

  const elementsRef = useRef(new Map<string, HTMLElement>());

  const registerTabElement = useCallback(
    (tabValue: string, element: HTMLElement | null) => {
      if (element) {
        elementsRef.current.set(tabValue, element);
      } else {
        elementsRef.current.delete(tabValue);
      }
    },
    [],
  );

  const getItemElement = useCallback(
    (tabValue: string) => elementsRef.current.get(tabValue) ?? null,
    [],
  );

  const { ensureVisible, overflow, hasOverflow } = useOverflowItems({
    items: tabValues,
    containerRef: listRef,
    getItemElement,
    activeItem: selectedValue ?? null,
    reserveRef: overflowRef,
  });

  const selectTab = useCallback(
    (event: TabsChangeEvent, nextValue: string, reason: TabsChangeReason) => {
      if (
        nextValue === storedValue &&
        requestedValueRef.current === storedValue
      ) {
        return;
      }

      recordRequest(nextValue);
      setStoredValue(nextValue);
      onChange?.(event, nextValue, reason);
    },
    [onChange, recordRequest, setStoredValue, storedValue],
  );

  const focusTab = useCallback(
    (tabValue: string, options?: { afterMenuClose?: boolean }) => {
      ensureVisible(tabValue, () => {
        const focus = () => elementsRef.current.get(tabValue)?.focus();

        // Closing the overflow menu queues a focus return to its trigger as a
        // microtask in the same commit. Queue the tab focus after it, so the
        // chosen tab keeps focus instead of the "More tabs" button.
        if (options?.afterMenuClose) {
          queueMicrotask(focus);
        } else {
          focus();
        }
      });
    },
    [ensureVisible],
  );

  const onTabKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLElement>) => {
      // Navigation walks every tab in source order, not only the ones that
      // currently fit: selecting an overflowed tab pulls it back into the strip.
      const navigable = tabs
        .filter((tab) => !tab.disabled)
        .map((tab) => tab.value);

      if (navigable.length === 0) return;

      // Start from the tab that holds focus, not the selected value. A
      // controlled parent may commit the selection after focus has moved, and
      // repeated keys must keep walking from the focused tab.
      let currentValue = selectedValue;
      for (const [tabValue, element] of elementsRef.current) {
        if (element === event.currentTarget) {
          currentValue = tabValue;
          break;
        }
      }

      const currentIndex =
        currentValue === undefined
          ? 0
          : Math.max(0, navigable.indexOf(currentValue));
      let nextIndex: number;

      switch (event.key) {
        case 'ArrowRight':
          nextIndex = (currentIndex + 1) % navigable.length;
          break;
        case 'ArrowLeft':
          nextIndex = (currentIndex - 1 + navigable.length) % navigable.length;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = navigable.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();

      const nextValue = navigable[nextIndex];
      if (nextValue === undefined) return;

      selectTab(event, nextValue, 'clicked-on-tab');

      focusTab(nextValue);
    },
    [focusTab, selectTab, selectedValue, tabs],
  );

  const overflowTabs = useMemo(
    () =>
      overflow
        .map((item) => tabs.find((tab) => tab.value === item))
        .filter((tab): tab is TabDescriptor => Boolean(tab)),
    [overflow, tabs],
  );

  return {
    hasOverflow,
    focusTab,
    onTabKeyDown,
    overflowTabs,
    overflowValues: overflow,
    registerTabElement,
    selectTab,
    selectedValue,
    tabs,
  };
};
