import { createContext, useContext } from 'react';
import type { MenuContextValue } from './types';

export const MenuContext = createContext<MenuContextValue | null>(null);

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu components must be used within a <Menu> provider');
  }
  return context;
};
