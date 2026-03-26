import {
  autoUpdate,
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingPortal,
  flip,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListItem,
  useListNavigation,
  useRole,
  useTypeahead,
} from '@floating-ui/react';
import { cx } from '@styled-system/css';
import { list, listItem as listItemRecipe, menu } from '@styled-system/recipes';
import {
  type CSSProperties,
  type HTMLProps,
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { splitProps } from '~/utils/splitProps';

import { Box } from '../Box';
import { Icon } from '../Icon';
import { HighlightText } from '../List';
import { Text } from '../Text';

import {
  deriveItemTextValue,
  isItemMatch,
  MENU_COMPONENT_TYPES,
  MenuFilterProvider,
  MenuListProvider,
  menuComponentTypeKey,
  type SubMenuProps,
  useMenuFilterContext,
  useMenuListContext,
  useMenuRootContext,
} from './context/menuContext';

export const SubMenu = (props: SubMenuProps) => {
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const tree = useFloatingTree();
  const {
    label,
    description,
    disabled,
    selected,
    iconBefore,
    interaction,
    placement,
    children,
    textValue,
    density,
    ...rest
  } = props;
  const [contentClassName, htmlProps] = splitProps(rest);
  const { style, ...otherHtmlProps } = htmlProps;
  const contentStyle = style as CSSProperties | undefined;
  const menuItemHtmlProps: Omit<HTMLProps<HTMLElement>, 'ref'> = otherHtmlProps;

  const rootContext = useMenuRootContext();
  const filterContext = useMenuFilterContext();
  const parentListContext = useMenuListContext();

  const resolvedInteraction = interaction ?? rootContext.subMenuInteraction;
  const resolvedDensity =
    typeof density === 'string' ? density : rootContext.density;
  const classes = menu({ density: resolvedDensity });
  const listClassName = list({});
  const itemClassName = listItemRecipe({
    density: resolvedDensity,
    iconBefore: Boolean(iconBefore),
    iconAfter: true,
    selected: Boolean(selected),
  });

  const resolvedTextValue = deriveItemTextValue({
    textValue,
    label,
    description,
    getItemText: filterContext.getItemText,
  });

  const isVisible = isItemMatch({
    textValue: resolvedTextValue,
    query: filterContext.query,
    filterMode: filterContext.filterMode,
  });
  const listItemData = useListItem({ label: resolvedTextValue });

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const floatingListRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  const handleOpenChange = (
    nextOpen: boolean,
    _event?: Event,
    reason?: string,
  ) => {
    if (
      !nextOpen &&
      reason === 'focus-out' &&
      resolvedInteraction === 'hover' &&
      parentId != null
    ) {
      return;
    }
    setOpen(nextOpen);
  };

  const floating = useFloating({
    nodeId,
    open,
    onOpenChange: handleOpenChange,
    placement: placement ?? 'right-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({ mainAxis: 0, alignmentAxis: -4 }),
      flip(),
      shift({ padding: 8 }),
    ],
  });

  const hover = useHover(floating.context, {
    enabled: !disabled && parentId != null,
    delay: { open: 75 },
    handleClose: safePolygon({
      blockPointerEvents: true,
    }),
  });
  const click = useClick(floating.context, {
    event: 'mousedown',
    toggle: false,
    ignoreMouse: true,
  });
  const dismiss = useDismiss(floating.context, { bubbles: true });
  const role = useRole(floating.context, { role: 'menu' });
  const listNavigation = useListNavigation(floating.context, {
    listRef: floatingListRef,
    activeIndex,
    onNavigate: setActiveIndex,
    nested: true,
  });
  const typeahead = useTypeahead(floating.context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: open ? setActiveIndex : undefined,
    resetMs: 600,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [hover, click, dismiss, role, listNavigation, typeahead],
  );

  useEffect(() => {
    if (!tree) {
      return;
    }

    const handleTreeClick = () => {
      setOpen(false);
    };

    const onSubMenuOpen = (event: {
      nodeId: string;
      parentId: string | null;
    }) => {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        setOpen(false);
      }
    };

    tree.events.on('click', handleTreeClick);
    tree.events.on('menuopen', onSubMenuOpen);

    return () => {
      tree.events.off('click', handleTreeClick);
      tree.events.off('menuopen', onSubMenuOpen);
    };
  }, [tree, nodeId, parentId]);

  useEffect(() => {
    if (open && tree) {
      tree.events.emit('menuopen', { parentId, nodeId });
    }
  }, [tree, open, nodeId, parentId]);

  const nestedFilterContext = useMemo(
    () => ({
      query: filterContext.query,
      filterMode: filterContext.filterMode,
      highlightMatches: filterContext.highlightMatches,
      getItemText: filterContext.getItemText,
    }),
    [filterContext],
  );

  const nestedListContext = {
    activeIndex,
    getItemProps: (userProps?: HTMLProps<HTMLElement>) =>
      getItemProps(userProps) as HTMLProps<HTMLElement>,
  };

  const floatingStyle = {
    ...floating.floatingStyles,
    ...(contentStyle || {}),
  };

  const parentItemProps = parentListContext
    ? parentListContext.getItemProps({
        onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
          if (event.key === 'ArrowRight' && !disabled) {
            event.preventDefault();
            setOpen(true);
          }
        },
      })
    : {
        onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
          if (event.key === 'ArrowRight' && !disabled) {
            event.preventDefault();
            setOpen(true);
          }
        },
      };

  const referenceProps = getReferenceProps(parentItemProps);
  const referencePropsWithoutRef: Omit<HTMLProps<HTMLElement>, 'ref'> = {
    ...referenceProps,
  };

  if (!isVisible) {
    return null;
  }

  if (resolvedInteraction === 'digin') {
    const buttonProps: HTMLProps<HTMLElement> = parentListContext
      ? parentListContext.getItemProps({
          onClick: (event?: MouseEvent<HTMLElement>) => {
            event?.preventDefault();
            event?.stopPropagation();
            if (!disabled) {
              rootContext.onPushDiginLevel(label, children);
            }
          },
          onKeyDown: (event) => {
            if (
              event.key === 'ArrowRight' ||
              event.key === 'Enter' ||
              event.key === ' '
            ) {
              event.preventDefault();
              event.stopPropagation();
              if (!disabled) {
                rootContext.onPushDiginLevel(label, children);
              }
            }
          },
        })
      : {
          onClick: (event?: MouseEvent<HTMLElement>) => {
            event?.preventDefault();
            event?.stopPropagation();
            if (!disabled) {
              rootContext.onPushDiginLevel(label, children);
            }
          },
          onKeyDown: (event?: KeyboardEvent<HTMLElement>) => {
            if (
              event &&
              (event.key === 'ArrowRight' ||
                event.key === 'Enter' ||
                event.key === ' ')
            ) {
              event.preventDefault();
              event.stopPropagation();
              if (!disabled) {
                rootContext.onPushDiginLevel(label, children);
              }
            }
          },
        };
    const diginButtonProps: Omit<HTMLProps<HTMLElement>, 'ref'> = {
      ...buttonProps,
    };

    return (
      <button
        {...menuItemHtmlProps}
        role="menuitem"
        aria-disabled={disabled}
        disabled={disabled}
        className={cx(itemClassName.wrapper, contentClassName)}
        ref={(node: HTMLButtonElement | null) => {
          listItemData.ref(node as HTMLElement | null);
        }}
        style={contentStyle}
        data-selected={selected}
        data-disabled={disabled}
        data-active={
          parentListContext
            ? parentListContext.activeIndex === listItemData.index
            : false
        }
        tabIndex={
          parentListContext
            ? parentListContext.activeIndex === listItemData.index
              ? 0
              : -1
            : 0
        }
        {...diginButtonProps}
        type="button"
      >
        {iconBefore && (
          <Icon className={itemClassName.icon} name={iconBefore} />
        )}

        <Box className={itemClassName.itemMain}>
          <Text className={itemClassName.itemLabel}>
            <HighlightText
              value={label}
              query={filterContext.query}
              enabled={filterContext.highlightMatches}
            />
          </Text>

          {description && (
            <Text className={itemClassName.itemDescription}>
              <HighlightText
                value={description}
                query={filterContext.query}
                enabled={filterContext.highlightMatches}
              />
            </Text>
          )}
        </Box>

        <Icon className={itemClassName.icon} name="caret-right" ml="auto" />
      </button>
    );
  }

  return (
    <FloatingNode id={nodeId}>
      <button
        {...menuItemHtmlProps}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-disabled={disabled}
        disabled={disabled}
        className={itemClassName.wrapper}
        ref={(node: HTMLButtonElement | null) => {
          listItemData.ref(node as HTMLElement | null);
          floating.refs.setReference(node);
        }}
        data-selected={selected}
        data-disabled={disabled}
        data-active={
          parentListContext
            ? parentListContext.activeIndex === listItemData.index
            : false
        }
        tabIndex={
          parentListContext
            ? parentListContext.activeIndex === listItemData.index
              ? 0
              : -1
            : 0
        }
        {...referencePropsWithoutRef}
        type="button"
      >
        {iconBefore && (
          <Icon className={itemClassName.icon} name={iconBefore} />
        )}

        <Box className={itemClassName.itemMain}>
          <Text className={itemClassName.itemLabel}>
            <HighlightText
              value={label}
              query={filterContext.query}
              enabled={filterContext.highlightMatches}
            />
          </Text>

          {description && (
            <Text className={itemClassName.itemDescription}>
              <HighlightText
                value={description}
                query={filterContext.query}
                enabled={filterContext.highlightMatches}
              />
            </Text>
          )}
        </Box>

        <Icon className={itemClassName.icon} name="caret-right" ml="auto" />
      </button>

      {open && (
        <FloatingPortal>
          <FloatingFocusManager
            context={floating.context}
            modal={false}
            initialFocus={-1}
            returnFocus={false}
          >
            <MenuFilterProvider value={nestedFilterContext}>
              <MenuListProvider value={nestedListContext}>
                <Box
                  ref={floating.refs.setFloating}
                  className={cx(classes.wrapper, contentClassName)}
                  {...getFloatingProps({
                    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
                      if (event.key === 'ArrowLeft') {
                        event.preventDefault();
                        setOpen(false);
                      }
                    },
                  })}
                  style={floatingStyle}
                >
                  <FloatingList
                    elementsRef={floatingListRef}
                    labelsRef={labelsRef}
                  >
                    <Box className={listClassName}>{children}</Box>
                  </FloatingList>
                </Box>
              </MenuListProvider>
            </MenuFilterProvider>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </FloatingNode>
  );
};

(SubMenu as unknown as { [menuComponentTypeKey]: string })[
  menuComponentTypeKey
] = MENU_COMPONENT_TYPES.subMenu;
