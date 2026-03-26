import { ListItemGroup } from '../List';

import {
  hasMatchingItems,
  MENU_COMPONENT_TYPES,
  type MenuGroupProps,
  menuComponentTypeKey,
  useMenuFilterContext,
  useMenuRootContext,
} from './context/menuContext';

export const MenuGroup = (props: MenuGroupProps) => {
  const { label, children, divider, ...rest } = props;
  const rootContext = useMenuRootContext();
  const filterContext = useMenuFilterContext();

  const hasMatches = hasMatchingItems(children, filterContext);

  if (!hasMatches) {
    return null;
  }

  return (
    <ListItemGroup
      density={rootContext.density}
      label={label}
      divider={divider}
      {...rest}
    >
      {children}
    </ListItemGroup>
  );
};

(MenuGroup as unknown as { [menuComponentTypeKey]: string })[
  menuComponentTypeKey
] = MENU_COMPONENT_TYPES.group;
