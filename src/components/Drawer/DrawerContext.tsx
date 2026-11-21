import { createContext, type RefObject, useContext } from 'react';

/** State and close behavior shared with descendants of {@link Drawer}. */
export interface DrawerContextValue {
  /** Whether the drawer is currently in its open phase. */
  open: boolean;
  /** Requests closing through the parent drawer's `onOpenChange(false)`. */
  onClose: () => void;
  /** Whether the parent drawer traps focus and blocks the page behind it. */
  modal: boolean;
  /**
   * Tells the drawer that a header close button is rendered. A modal drawer
   * then focuses its panel on open, so the close button's tooltip does not
   * open and take the first Escape. Returns the cleanup that unregisters it.
   */
  registerHeaderCloseButton: () => () => void;
  /** The drawer panel. Use it to check whether an element is inside the drawer. */
  panelRef: RefObject<HTMLElement | null>;
}

export const DrawerContext = createContext<DrawerContextValue | null>(null);

/**
 * Returns state and close behavior from the closest parent {@link Drawer}.
 *
 * Call only in a drawer descendant; it throws when no drawer context is present.
 * Use it to build a custom close control inside a custom {@link DrawerHeader}.
 *
 * @example
 * ```tsx
 * const { onClose } = useDrawerContext();
 * ```
 */
export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('Drawer components must be used within a <Drawer>');
  }
  return context;
};
