import {
  defaultMenuFilterContextValue,
  defaultMenuRootContextValue,
  MenuFilterProvider,
  type MenuProviderProps,
  MenuRootProvider,
} from './context/menuContext';

/**
 * Provides menu root and filter context for custom compound-menu composition.
 *
 * Normal menus provide this context automatically. Use this provider only when
 * composing `MenuItem`, `MenuGroup`, or `SubMenu` outside a `Menu`.
 *
 * @example
 * ```tsx
 * <MenuProvider>
 *   <MenuItem label="Refresh" />
 * </MenuProvider>
 * ```
 */
export const MenuProvider = ({ children, root, filter }: MenuProviderProps) => {
  const rootValue = {
    ...defaultMenuRootContextValue,
    ...(root ?? {}),
  };

  const filterValue = {
    ...defaultMenuFilterContextValue,
    ...(filter ?? {}),
  };

  return (
    <MenuRootProvider value={rootValue}>
      <MenuFilterProvider value={filterValue}>{children}</MenuFilterProvider>
    </MenuRootProvider>
  );
};
