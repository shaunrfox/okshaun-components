import {
  defaultMenuFilterContextValue,
  defaultMenuRootContextValue,
  MenuFilterProvider,
  type MenuProviderProps,
  MenuRootProvider,
} from './context/menuContext';

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
