import type { Placement } from '@floating-ui/react';
import type { BoxProps } from '../Box';
import type { IconNamesList } from '../Icon';
import type { MenuVariantProps } from '@styled-system/recipes';

// ============================================================================
// MENU CONTEXT
// ============================================================================

export interface MenuContextValue {
  // Floating UI state
  open: boolean;
  setOpen: (open: boolean) => void;
  refs: {
    setReference: (node: HTMLElement | null) => void;
    setFloating: (node: HTMLElement | null) => void;
  };
  floatingStyles: React.CSSProperties;

  // Interaction props from Floating UI hooks
  getReferenceProps: (
    userProps?: React.HTMLProps<Element>
  ) => Record<string, unknown>;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement>
  ) => Record<string, unknown>;
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement> & {
      index?: number;
      active?: boolean;
    }
  ) => Record<string, unknown>;

  // List navigation state
  activeIndex: number | null;
  listRef: React.MutableRefObject<(HTMLElement | null)[]>;

  // Recipe classes
  classes: ReturnType<typeof import('@styled-system/recipes').menu>;
}

// ============================================================================
// MENU PROPS
// ============================================================================

export type MenuProps = Omit<BoxProps, keyof MenuVariantProps> &
  MenuVariantProps & {
    /** Controlled open state (REQUIRED) */
    open: boolean;
    /** Callback when open state should change (REQUIRED) */
    onOpenChange: (open: boolean) => void;
    /** Floating UI placement */
    placement?: Placement;
    /** Offset distance from trigger (in pixels) */
    offset?: number;
    /** Children (MenuTrigger, MenuItem, MenuGroup, etc.) */
    children: React.ReactNode;
    /** Optional ID for ARIA attributes */
    id?: string;
  };

// ============================================================================
// MENU TRIGGER PROPS
// ============================================================================

export type MenuTriggerProps = Omit<BoxProps, 'children'> & {
  /** Trigger element (button, custom component, etc.) */
  children: React.ReactElement;
  /** Disable the trigger */
  disabled?: boolean;
};

// ============================================================================
// MENU ITEM PROPS
// ============================================================================

export type MenuItemType = 'action' | 'single-select' | 'multi-select';
export type SelectionIndicator = 'checkmark' | 'checkbox';

export type MenuItemProps = Omit<BoxProps, 'children'> & {
  /** Item behavior type */
  type?: MenuItemType;
  /** Selected state (for single-select and multi-select) */
  selected?: boolean;
  /** Callback when item is selected/activated */
  onSelect?: () => void;
  /** Disable the item */
  disabled?: boolean;
  /** Primary label (required) */
  label: string | React.ReactNode;
  /** Secondary description text */
  description?: string;
  /** Icon on the left side */
  iconLeft?: IconNamesList;
  /** Icon on the right side */
  iconRight?: IconNamesList;
  /** Text to highlight (for autocomplete/search scenarios) */
  highlightMatch?: string;
  /** Selection indicator style (only for select types) */
  selectionIndicator?: SelectionIndicator;
  /** Index for keyboard navigation (managed internally via context) */
  index?: number;
};

// ============================================================================
// MENU DIVIDER PROPS
// ============================================================================

export type MenuDividerProps = Omit<BoxProps, 'children'>;

// ============================================================================
// MENU GROUP PROPS
// ============================================================================

export type MenuGroupProps = Omit<BoxProps, 'title'> & {
  /** Group label */
  label?: string;
  /** Children (MenuItem components) */
  children: React.ReactNode;
};
