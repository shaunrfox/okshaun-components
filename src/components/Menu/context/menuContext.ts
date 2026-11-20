import type { Placement } from '@floating-ui/react';

import type { MenuVariantProps } from '@styled-system/recipes';
import {
  Children,
  createContext,
  type HTMLProps,
  isValidElement,
  type ReactElement,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useContext,
} from 'react';
import type { BoxProps } from '~/components/Box';
import type { IconNamesList } from '~/components/Icon';
import type { ListDensity } from '~/components/List';
import { getCompoundComponentType } from '~/utils/compoundComponent';

/** Spacing density shared by a menu panel and its rows. */
export type MenuDensity = ListDensity;
/** Determines whether `query` hides non-matching menu items. */
export type MenuFilterMode = 'none' | 'contains';
/** Opens a submenu as a positioned flyout or as an in-panel drill-in level. */
export type SubMenuInteraction = 'hover' | 'digin';
/** Pointer or focus interactions that can open a menu trigger. */
export type MenuTriggerInteraction =
  | 'click'
  | 'hover'
  | 'focus'
  | 'click-and-hover';

type MenuOwnProps = {
  /** Trigger element cloned with the menu's event handlers and ARIA attributes. Omit it, or use `inline`, to render the menu in place. */
  trigger?: ReactElement;
  /** `MenuItem`, `MenuGroup`, and `SubMenu` children that make up the menu. */
  children: ReactNode;
  /** Controlled popup state. Pair with `onOpenChange`; omit it to use `defaultOpen`. */
  open?: boolean;
  /**
   * Initial popup state for an uncontrolled triggered menu. It is used only on first render.
   * @default false
   */
  defaultOpen?: boolean;
  /** Called when interaction requests that a triggered menu open or close. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Floating UI placement of a triggered menu relative to its trigger.
   * @default 'bottom-start'
   */
  placement?: Placement;
  /**
   * Positioning strategy for a triggered menu.
   * @default 'absolute'
   */
  strategy?: 'absolute' | 'fixed';
  /**
   * Closes the root menu after a `MenuItem` is selected unless that item overrides it.
   * @default true
   */
  closeOnSelect?: boolean;
  /**
   * Renders the panel in normal document flow without requiring a trigger.
   * @default false
   */
  inline?: boolean;
  /**
   * Pointer interactions that open the trigger.
   * @default 'click'
   */
  triggerInteraction?: MenuTriggerInteraction;
  /**
   * Delay before hover interaction opens the menu, in milliseconds.
   * @default 75
   */
  triggerOpenDelay?: number;
  /**
   * Delay before hover interaction closes the menu, in milliseconds.
   * @default 100
   */
  triggerCloseDelay?: number;
  /**
   * Default presentation for descendant `SubMenu` components.
   * @default 'hover'
   */
  subMenuInteraction?: SubMenuInteraction;
  /**
   * Spacing density for menu rows.
   * @default 'compact'
   */
  density?: MenuDensity;
  /**
   * Text used to filter `MenuItem` and `SubMenu` labels when `filterMode` is `'contains'`.
   * @default ''
   */
  query?: string;
  /** Reserved for external filtering controls; this component does not call it. */
  onQueryChange?: (query: string) => void;
  /**
   * Enables case-insensitive substring filtering when set to `'contains'`.
   * @default 'none'
   */
  filterMode?: MenuFilterMode;
  /**
   * Content rendered when filtering leaves no visible menu children.
   * @default 'No results found'
   */
  renderNoResults?: ReactNode;
  /**
   * Highlights case-insensitive query matches in visible labels and descriptions.
   * @default Boolean(query)
   */
  highlightMatches?: boolean;
  /**
   * Derives searchable text when an item does not provide `textValue`. It receives the item's label and description.
   * @default joins label and description with a space
   */
  getItemText?: (item: { label?: string; description?: string }) => string;
  /** Applies the recipe's panel visual treatment. */
  panel?: MenuVariantProps['panel'];
  /**
   * When this `Menu` is used as one section of a horizontal menubar, pass a
   * handler so Arrow Left / Arrow Right on **leaf** items and at the first
   * submenu level can move to the previous/next menubar section (APG Navigation
   * Menubar pattern). Typically closes this menu then focuses/opens the
   * adjacent section’s trigger.
   * Also enables focus order so the trigger keeps focus while the panel is open
   * until the user arrows into the list (otherwise focus would jump to the first
   * row and horizontal menubar keys would not run on the trigger).
   */
  onMenubarEdgeNavigate?: (direction: 1 | -1) => void;
};

/** Props for {@link Menu}, including popup state, filtering, and nested-menu behavior. */
export type MenuProps = Omit<BoxProps, keyof MenuOwnProps> & MenuOwnProps;

/** Visual and ARIA role variants supported by {@link MenuItem}. */
export type MenuItemVariant = 'default' | 'checkbox' | 'toggle' | 'divider';

/** Props for {@link MenuItem}, a selectable row inside a {@link Menu}. */
export type MenuItemProps = Omit<BoxProps, 'as' | 'ref' | 'onClick' | 'type'> &
  Omit<MenuVariantProps, 'iconBefore' | 'iconAfter'> & {
    /** Primary visible text, also used for typeahead and filtering unless `textValue` is supplied. */
    label?: string;
    /** Secondary visible text included in filtering by default. */
    description?: string;
    /**
     * Chooses a regular item, checkable item, toggle item, or divider.
     * @default 'default'
     */
    variant?: MenuItemVariant;
    /** Prevents activation and marks the row unavailable to assistive technology. */
    disabled?: boolean;
    /** Sets selected styling and `aria-checked` for checkbox and toggle variants. */
    selected?: boolean;
    /** Icon displayed before the item text. */
    iconBefore?: IconNamesList;
    /** Icon displayed after the item text. */
    iconAfter?: IconNamesList;
    /** Renders the item as an anchor instead of a button. */
    href?: string;
    /** Browsing context for an anchor item. */
    target?: string;
    /** Relationship attribute for an anchor item, such as `noopener` for a new tab. */
    rel?: string;
    /** Overrides the parent menu's `closeOnSelect` behavior for this item. */
    closeOnSelect?: boolean;
    /** Overrides the parent menu's row density for this item. */
    density?: MenuDensity;
    /** Explicit text used for typeahead and filtering instead of label and description. */
    textValue?: string;
    /** Called for pointer selection before the menu closes. Call `event.preventDefault()` to prevent the automatic close and tree click event. */
    onClick?: (event: ReactMouseEvent<HTMLElement>) => void;
  };

type MenuGroupOwnProps = {
  /** Optional group heading. */
  label?: string;
  /** Menu children shown only when at least one child matches the current filter. */
  children: ReactNode;
  /** Adds a divider before the group. */
  divider?: boolean;
};

/** Props for {@link MenuGroup}, a labeled group of related menu children. */
export type MenuGroupProps = Omit<BoxProps, keyof MenuGroupOwnProps> &
  MenuGroupOwnProps;

/** Props for {@link SubMenu}, a nested menu trigger and its child menu. */
export type SubMenuProps = Omit<BoxProps, 'as'> &
  Omit<MenuVariantProps, 'iconBefore' | 'iconAfter'> & {
    /** Visible submenu trigger text. */
    label: string;
    /** Secondary visible text included in filtering by default. */
    description?: string;
    /** Prevents opening the nested menu. */
    disabled?: boolean;
    /** Applies selected styling to the nested-menu trigger. */
    selected?: boolean;
    /** Icon displayed before the trigger text. */
    iconBefore?: IconNamesList;
    /** Overrides the parent menu's submenu interaction mode. */
    interaction?: SubMenuInteraction;
    /**
     * Floating placement for a hover submenu.
     * @default 'right-start'
     */
    placement?: Placement;
    /** `MenuItem`, `MenuGroup`, or nested `SubMenu` children. */
    children: ReactNode;
    /** Explicit text used for typeahead and filtering instead of label and description. */
    textValue?: string;
  };

/** Filtering state consumed by menu compound components. */
export type MenuFilterContextValue = {
  query: string;
  filterMode: MenuFilterMode;
  highlightMatches: boolean;
  getItemText: (item: { label?: string; description?: string }) => string;
};

/** Shared root behavior consumed by menu compound components. */
export type MenuRootContextValue = {
  density: MenuDensity;
  panel?: MenuVariantProps['panel'];
  closeOnSelect: boolean;
  subMenuInteraction: SubMenuInteraction;
  inline: boolean;
  /**
   * True when the root list renders in the page with no popup of its own
   * (`inline`, or no `trigger`). No root popup returns focus on close, so a
   * flyout restores focus to its own trigger instead.
   */
  rendersInline: boolean;
  onCloseMenu: () => void;
  onPushDiginLevel: (title: string, levelChildren: ReactNode) => void;
  onPopDiginLevel: () => void;
  diginDepth: number;
  /** See `Menu` prop `onMenubarEdgeNavigate`. */
  onMenubarEdgeNavigate?: (direction: 1 | -1) => void;
};

/** Roving-focus state for one menu level. */
export type MenuListContextValue = {
  activeIndex: number | null;
  /**
   * Row that holds the roving tab stop. Falls back to `activeIndex` when
   * omitted; the root menu sets it so Tab can enter before any row is active.
   */
  tabbableIndex?: number | null;
  getItemProps: (userProps?: HTMLProps<HTMLElement>) => HTMLProps<HTMLElement>;
  /** Move active item along the list main axis (looping), for nested submenu delegation. */
  navigateMainAxis?: (direction: 1 | -1) => void;
  /** 0 = root menu panel; each nested `SubMenu` flyout increments by 1. */
  nestedMenuDepth: number;
  /** Close the flyout for this list’s parent `SubMenu` and focus its trigger (APG popout Left). */
  closeParentSubMenuFlyout?: () => void;
};

/** Props for {@link MenuProvider}, an escape hatch for custom menu composition. */
export type MenuProviderProps = {
  /** Descendants that consume the supplied menu contexts. */
  children: ReactNode;
  /** Partial root behavior merged with the normal menu defaults. */
  root?: Partial<MenuRootContextValue>;
  /** Partial filtering behavior merged with the normal menu defaults. */
  filter?: Partial<MenuFilterContextValue>;
};

export const MENU_COMPONENT_TYPES = {
  group: 'MenuGroup',
  item: 'MenuItem',
  subMenu: 'SubMenu',
} as const;

export const menuComponentTypeKey = '__menuComponentType' as const;

const defaultGetItemText = ({
  label,
  description,
}: {
  label?: string;
  description?: string;
}) => {
  return [label, description].filter(Boolean).join(' ').trim();
};

const noop = () => undefined;

export const defaultMenuFilterContextValue: MenuFilterContextValue = {
  query: '',
  filterMode: 'none',
  highlightMatches: true,
  getItemText: defaultGetItemText,
};

export const defaultMenuRootContextValue: MenuRootContextValue = {
  density: 'compact',
  panel: false,
  closeOnSelect: true,
  subMenuInteraction: 'hover',
  inline: false,
  rendersInline: false,
  onCloseMenu: noop,
  onPushDiginLevel: noop,
  onPopDiginLevel: noop,
  diginDepth: 0,
};

const MenuFilterContext = createContext<MenuFilterContextValue>({
  ...defaultMenuFilterContextValue,
});

const MenuRootContext = createContext<MenuRootContextValue | null>(null);

const MenuListContext = createContext<MenuListContextValue | null>(null);

/** Returns the active menu filtering configuration, or the default configuration outside a `Menu`. */
export const useMenuFilterContext = () => useContext(MenuFilterContext);

/**
 * Returns the enclosing menu's shared behavior.
 *
 * Must be called below `Menu` or `MenuProvider`; otherwise it throws.
 */
export const useMenuRootContext = () => {
  const context = useContext(MenuRootContext);
  if (!context) {
    throw new Error('Menu compound components must be used within <Menu />');
  }

  return context;
};

/** Returns roving-focus state for the current menu level, or `null` when none is provided. */
export const useMenuListContext = () => {
  return useContext(MenuListContext);
};

export const MenuFilterProvider = MenuFilterContext.Provider;
export const MenuRootProvider = MenuRootContext.Provider;
export const MenuListProvider = MenuListContext.Provider;

/** Returns explicit `textValue` when present, otherwise derives searchable text from item metadata. */
export const deriveItemTextValue = ({
  textValue,
  label,
  description,
  getItemText,
}: {
  textValue?: string;
  label?: string;
  description?: string;
  getItemText: (item: { label?: string; description?: string }) => string;
}) => {
  if (textValue) {
    return textValue;
  }

  return getItemText({ label, description });
};

/** Returns whether text is visible for the supplied filtering mode and query. */
export const isItemMatch = ({
  textValue,
  query,
  filterMode,
}: {
  textValue: string;
  query: string;
  filterMode: MenuFilterMode;
}) => {
  if (filterMode === 'none' || !query.trim()) {
    return true;
  }

  return textValue.toLowerCase().includes(query.trim().toLowerCase());
};

/** Returns the internal menu compound-component marker for a React element, or `null` for other values. */
export const getComponentType = (node: unknown) => {
  return getCompoundComponentType(node, menuComponentTypeKey);
};

/** Returns whether a child tree contains any visible menu item, subgroup, or submenu for a filter. */
export const hasMatchingItems = (
  children: ReactNode,
  filterContext: MenuFilterContextValue,
): boolean => {
  return Children.toArray(children).some((childNode) => {
    if (!isValidElement(childNode)) {
      return false;
    }

    const child = childNode as ReactElement<Record<string, unknown>>;

    const componentType = getComponentType(child);

    if (componentType === MENU_COMPONENT_TYPES.item) {
      const variant = child.props.variant as MenuItemVariant | undefined;
      if (variant === 'divider') {
        return true;
      }

      const textValue = deriveItemTextValue({
        textValue: child.props.textValue as string | undefined,
        label: child.props.label as string | undefined,
        description: child.props.description as string | undefined,
        getItemText: filterContext.getItemText,
      });

      return isItemMatch({
        textValue,
        query: filterContext.query,
        filterMode: filterContext.filterMode,
      });
    }

    if (componentType === MENU_COMPONENT_TYPES.subMenu) {
      const textValue = deriveItemTextValue({
        textValue: child.props.textValue as string | undefined,
        label: child.props.label as string | undefined,
        description: child.props.description as string | undefined,
        getItemText: filterContext.getItemText,
      });

      const selfMatches = isItemMatch({
        textValue,
        query: filterContext.query,
        filterMode: filterContext.filterMode,
      });

      return (
        selfMatches ||
        hasMatchingItems(child.props.children as ReactNode, filterContext)
      );
    }

    if (componentType === MENU_COMPONENT_TYPES.group) {
      return hasMatchingItems(child.props.children as ReactNode, filterContext);
    }

    return true;
  });
};

/**
 * Returns the structural key path (`Children.toArray` keys, outermost first)
 * of the `SubMenu` whose `children` prop is `target`, searching through groups
 * and submenus. Keys identify a submenu by position, so duplicate labels are
 * safe.
 */
export const findSubMenuKeyPath = (
  children: ReactNode,
  target: ReactNode,
  trail: string[] = [],
): string[] | null => {
  for (const childNode of Children.toArray(children)) {
    if (!isValidElement(childNode)) {
      continue;
    }
    const child = childNode as ReactElement<Record<string, unknown>>;
    const componentType = getComponentType(child);
    const nextTrail = [...trail, String(child.key)];

    if (componentType === MENU_COMPONENT_TYPES.subMenu) {
      if (child.props.children === target) {
        return nextTrail;
      }
      const nested = findSubMenuKeyPath(
        child.props.children as ReactNode,
        target,
        nextTrail,
      );
      if (nested) {
        return nested;
      }
    } else if (componentType === MENU_COMPONENT_TYPES.group) {
      const nested = findSubMenuKeyPath(
        child.props.children as ReactNode,
        target,
        nextTrail,
      );
      if (nested) {
        return nested;
      }
    }
  }

  return null;
};

/**
 * Resolves the live children of the `SubMenu` at `keyPath` (see
 * {@link findSubMenuKeyPath}) so drilled-in levels render current props
 * (controlled inputs, filters) instead of the snapshot taken when the level
 * was pushed. Returns `undefined` when the path no longer exists.
 */
export const findSubMenuChildren = (
  children: ReactNode,
  keyPath: string[],
): ReactNode | undefined => {
  const [key, ...rest] = keyPath;
  if (key === undefined) {
    return children;
  }

  const match = Children.toArray(children).find(
    (childNode) => isValidElement(childNode) && String(childNode.key) === key,
  ) as ReactElement<Record<string, unknown>> | undefined;
  if (!match) {
    return undefined;
  }

  return findSubMenuChildren(match.props.children as ReactNode, rest);
};

/** Splits text into case-insensitive query-match parts for highlight rendering. */
export const getHighlightedTextParts = (value: string, query: string) => {
  if (!query.trim()) {
    return [{ text: value, match: false }];
  }

  const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regExp = new RegExp(`(${safeQuery})`, 'ig');
  const parts = value.split(regExp).filter((part) => part.length > 0);

  return parts.map((part) => ({
    text: part,
    match: part.toLowerCase() === query.toLowerCase(),
  }));
};
