import { createContext, useContext } from 'react';

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
    userProps?: React.HTMLProps<Element>,
  ) => Record<string, unknown>;
  getFloatingProps: (
    userProps?: React.HTMLProps<HTMLElement>,
  ) => Record<string, unknown>;
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement> & {
      index?: number;
      active?: boolean;
    },
  ) => Record<string, unknown>;

  // List navigation state
  activeIndex: number | null;
  listRef: React.RefObject<(HTMLElement | null)[]>;

  // Recipe classes
  classes: ReturnType<typeof import('@styled-system/recipes').menu>;
}

export const MenuContext = createContext<MenuContextValue | null>(null);

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu components must be used within a <Menu> provider');
  }
  return context;
};
