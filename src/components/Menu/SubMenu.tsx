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
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useFloatingLayer } from '~/system/floating-ui/FloatingLayerContext';
import { availableHeightMiddleware } from '~/system/floating-ui/floating';
import { setCompoundComponentType } from '~/utils/compoundComponent';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import { Box } from '../Box/Box';
import { DsChainPortalRoot } from '../DsChainScope/DsChainPortalRoot';
import { Icon } from '../Icon/Icon';
import { HighlightText } from '../List/HighlightText';
import { Text } from '../Text/Text';

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
import { useBlockPointerEventsForHoverPolygon } from './hooks/useBlockPointerEventsForHoverPolygon';
import {
  findFirstEnabledListIndex,
  navigateListMainAxisLoop,
} from './utils/navigateListMainAxis';

/**
 * Opens nested menu content from a row in a parent {@link Menu}.
 *
 * Hover submenus open as positioned flyouts; `interaction="digin"` replaces
 * the parent level in the same panel. Arrow Right opens a flyout and Arrow Left
 * returns focus to its trigger. Filtering also searches nested children.
 *
 * @example
 * ```tsx
 * <SubMenu label="More actions">
 *   <MenuItem label="Duplicate" />
 * </SubMenu>
 * ```
 */
export const SubMenu = (props: SubMenuProps) => {
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const tree = useFloatingTree();
  const floatingLayer = useFloatingLayer();
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
  // `classes.wrapper` is only used by the floating flyout.
  const classes = menu({
    density: resolvedDensity,
    layer: floatingLayer,
    scrollable: true,
  });
  const listClassName = list({ density: resolvedDensity });
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
  const subMenuTriggerRef = useRef<HTMLButtonElement | null>(null);
  const blockPointerEventsForHoverPolygon =
    useBlockPointerEventsForHoverPolygon();
  /** True until we apply first-item selection after ArrowRight opens the flyout. */
  const openedFromParentArrowRightRef = useRef(false);
  /** After keyboard open, focus the nested item matching `activeIndex` once. */
  const keyboardFocusFirstNestedItemRef = useRef(false);

  const openNestedFromParentKeyboard = useCallback(() => {
    openedFromParentArrowRightRef.current = true;
    setOpen(true);
  }, []);

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
    if (!nextOpen && reason === 'escape-key' && rootContext.rendersInline) {
      // Same as Arrow Left: close and return focus to this trigger.
      setOpen(false);
      queueMicrotask(() => subMenuTriggerRef.current?.focus());
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
      availableHeightMiddleware(),
    ],
  });

  const hover = useHover(floating.context, {
    enabled: !disabled && parentId != null,
    delay: { open: 75 },
    handleClose: safePolygon({
      blockPointerEvents: blockPointerEventsForHoverPolygon,
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
    // Default nested behavior focuses the first child when the flyout opens
    // (see Floating UI useListNavigation sync when nested is true). That
    // steals focus from the submenu trigger so ArrowDown navigates inside the
    // flyout instead of among sibling rows (Quotes → Orders) in the parent
    // menu. Keep focus on the trigger until the user opens into the panel with
    // ArrowRight (handled below and by the nested reference path). After
    // ArrowRight we set `activeIndex` and focus the first item in a layout effect.
    focusItemOnOpen: false,
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

  useEffect(() => {
    if (!open) {
      setActiveIndex(null);
    }
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !openedFromParentArrowRightRef.current) {
      return;
    }
    const applyFirst = () => {
      const idx = findFirstEnabledListIndex(floatingListRef);
      if (idx === null) {
        return false;
      }
      openedFromParentArrowRightRef.current = false;
      keyboardFocusFirstNestedItemRef.current = true;
      setActiveIndex(idx);
      return true;
    };
    if (!applyFirst()) {
      setTimeout(() => {
        if (!applyFirst()) {
          openedFromParentArrowRightRef.current = false;
        }
      });
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      keyboardFocusFirstNestedItemRef.current = false;
      return;
    }
    if (!keyboardFocusFirstNestedItemRef.current || activeIndex === null) {
      return;
    }
    const el = floatingListRef.current[activeIndex];
    if (el) {
      el.focus({ preventScroll: true });
    }
    keyboardFocusFirstNestedItemRef.current = false;
  }, [open, activeIndex]);

  const nestedFilterContext = useMemo(
    () => ({
      query: filterContext.query,
      filterMode: filterContext.filterMode,
      highlightMatches: filterContext.highlightMatches,
      getItemText: filterContext.getItemText,
    }),
    [filterContext],
  );

  const navigateNestedMainAxis = useCallback((direction: 1 | -1) => {
    setActiveIndex((prev) =>
      navigateListMainAxisLoop(floatingListRef, direction, prev),
    );
  }, []);

  const closeNestedFlyout = useCallback(() => {
    setOpen(false);
    queueMicrotask(() => {
      subMenuTriggerRef.current?.focus();
    });
  }, []);

  const parentNestedDepth = parentListContext?.nestedMenuDepth ?? 0;
  const nestedMenuDepth = parentNestedDepth + 1;

  const nestedListContext = {
    activeIndex,
    getItemProps: (userProps?: HTMLProps<HTMLElement>) =>
      getItemProps(userProps) as HTMLProps<HTMLElement>,
    navigateMainAxis: navigateNestedMainAxis,
    nestedMenuDepth,
    closeParentSubMenuFlyout: closeNestedFlyout,
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
            openNestedFromParentKeyboard();
          }
        },
      })
    : {
        onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
          if (event.key === 'ArrowRight' && !disabled) {
            event.preventDefault();
            openNestedFromParentKeyboard();
          }
        },
      };

  const referenceProps = getReferenceProps(parentItemProps);
  const referenceOnKeyDown = referenceProps.onKeyDown;
  const referencePropsWithoutRef: Omit<HTMLProps<HTMLElement>, 'ref'> = {
    ...referenceProps,
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      // APG Navigation Menubar: Left from a nested submenu trigger closes the flyout
      // and keeps focus on that trigger; at the root menu panel, Left moves to the
      // previous menubar section when onMenubarEdgeNavigate is provided.
      if (resolvedInteraction !== 'digin' && parentListContext) {
        const depth = parentListContext.nestedMenuDepth ?? 0;
        if (event.key === 'ArrowLeft') {
          if (open) {
            event.preventDefault();
            event.stopPropagation();
            setOpen(false);
            queueMicrotask(() => subMenuTriggerRef.current?.focus());
            return;
          }
          if (depth === 0 && rootContext.onMenubarEdgeNavigate) {
            event.preventDefault();
            event.stopPropagation();
            rootContext.onCloseMenu();
            rootContext.onMenubarEdgeNavigate(-1);
            return;
          }
        }
      }
      // APG: Arrow Down/Up move among siblings in the parent menu (Quotes → Orders).
      // Delegate to the parent list always from the submenu trigger — not only when
      // the nested flyout is open — so Down never descends into nested items before
      // Arrow Right / Enter (Floating UI bubble alone is unreliable here).
      if (
        resolvedInteraction !== 'digin' &&
        parentListContext?.navigateMainAxis &&
        (event.key === 'ArrowDown' || event.key === 'ArrowUp')
      ) {
        event.preventDefault();
        event.stopPropagation();
        if (open) {
          setOpen(false);
        }
        parentListContext.navigateMainAxis(event.key === 'ArrowDown' ? 1 : -1);
        return;
      }
      if (typeof referenceOnKeyDown === 'function') {
        referenceOnKeyDown(event);
      }
    },
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
        {...dsComponent('SubMenu')}
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
            ? (parentListContext.tabbableIndex ??
                parentListContext.activeIndex) === listItemData.index
              ? 0
              : -1
            : 0
        }
        {...diginButtonProps}
        type="button"
      >
        {iconBefore && (
          <Icon
            className={cx(itemClassName.icon, itemClassName.beforeSlot)}
            name={iconBefore}
          />
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

        <Icon
          className={cx(itemClassName.icon, itemClassName.afterSlot)}
          name="caret-right"
          ml="auto"
        />
      </button>
    );
  }

  return (
    <FloatingNode id={nodeId}>
      <button
        {...dsComponent('SubMenu')}
        {...menuItemHtmlProps}
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-disabled={disabled}
        disabled={disabled}
        className={itemClassName.wrapper}
        ref={(node: HTMLButtonElement | null) => {
          subMenuTriggerRef.current = node;
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
            ? (parentListContext.tabbableIndex ??
                parentListContext.activeIndex) === listItemData.index
              ? 0
              : -1
            : 0
        }
        {...referencePropsWithoutRef}
        type="button"
      >
        {iconBefore && (
          <Icon
            className={cx(itemClassName.icon, itemClassName.beforeSlot)}
            name={iconBefore}
          />
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

        <Icon
          className={cx(itemClassName.icon, itemClassName.afterSlot)}
          name="caret-right"
          ml="auto"
        />
      </button>

      {open && (
        <FloatingPortal>
          <DsChainPortalRoot reference={floating.elements.domReference}>
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
                          queueMicrotask(() =>
                            subMenuTriggerRef.current?.focus(),
                          );
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
          </DsChainPortalRoot>
        </FloatingPortal>
      )}
    </FloatingNode>
  );
};

setCompoundComponentType(
  SubMenu,
  menuComponentTypeKey,
  MENU_COMPONENT_TYPES.subMenu,
);
