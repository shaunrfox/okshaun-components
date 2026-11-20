import { useFloatingTree, useListItem } from '@floating-ui/react';
import { css, cx } from '@styled-system/css';
import { listItem as listItemRecipe } from '@styled-system/recipes';
import type { HTMLProps, KeyboardEvent, MouseEvent } from 'react';

import { setCompoundComponentType } from '~/utils/compoundComponent';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box/Box';
import { Checkbox } from '../Checkbox/Checkbox';
import { Divider } from '../Divider/Divider';
import { Icon } from '../Icon/Icon';
import { HighlightText } from '../List/HighlightText';
import { Text } from '../Text/Text';
import { Toggle } from '../Toggle/Toggle';

import {
  deriveItemTextValue,
  isItemMatch,
  MENU_COMPONENT_TYPES,
  type MenuItemProps,
  menuComponentTypeKey,
  useMenuFilterContext,
  useMenuListContext,
  useMenuRootContext,
} from './context/menuContext';

/**
 * Renders an actionable row within a {@link Menu}.
 *
 * It renders a button by default, or an anchor when `href` is supplied. Arrow
 * keys and typeahead participate in the parent menu's roving focus behavior.
 * Use `variant="checkbox"` or `"toggle"` when `selected` is meaningful.
 *
 * @example
 * ```tsx
 * <MenuItem label="Duplicate" iconBefore="copy" onClick={duplicate} />
 * ```
 */
export const MenuItem = (props: MenuItemProps) => {
  const {
    label,
    description,
    variant = 'default',
    disabled,
    selected,
    iconBefore,
    iconAfter,
    href,
    target,
    rel,
    closeOnSelect,
    density,
    textValue,
    onClick,
    ...rest
  } = props;

  const [className, otherProps] = splitProps(rest);
  const restProps = { ...otherProps };
  const userOnKeyDown =
    'onKeyDown' in restProps && typeof restProps.onKeyDown === 'function'
      ? restProps.onKeyDown
      : undefined;
  delete (restProps as { onKeyDown?: unknown }).onKeyDown;

  const rootContext = useMenuRootContext();
  const tree = useFloatingTree();
  const filterContext = useMenuFilterContext();
  const listContext = useMenuListContext();
  const visualVariant: 'default' | 'checkbox' | 'toggle' =
    variant === 'divider' ? 'default' : variant;

  const resolvedDensity = density ?? rootContext.density;
  const classes = listItemRecipe({
    density: resolvedDensity,
    variant: visualVariant,
    iconBefore: Boolean(iconBefore),
    iconAfter: Boolean(iconAfter),
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

  // TODO: Fix Divider collapse
  if (variant === 'divider') {
    return <Divider />;
  }

  if (!isVisible) {
    return null;
  }

  const shouldCloseOnSelect = closeOnSelect ?? rootContext.closeOnSelect;
  const controlName = textValue ?? label ?? 'menu-item';

  const handleSelect = (event: MouseEvent<HTMLElement>) => {
    onClick?.(event);

    if (!event.defaultPrevented) {
      tree?.events.emit('click');
    }

    if (!event.defaultPrevented && shouldCloseOnSelect) {
      rootContext.onCloseMenu();
    }
  };

  type MenuInteractionProps = Pick<
    HTMLProps<HTMLElement>,
    'onClick' | 'onKeyDown' | 'onPointerMove' | 'onMouseMove' | 'onFocus'
  >;

  const itemProps = (
    listContext
      ? listContext.getItemProps({
          onClick: handleSelect,
        })
      : {
          onClick: handleSelect,
        }
  ) as MenuInteractionProps;

  const { onKeyDown: itemOnKeyDown, ...itemPropsRest } = itemProps;

  const handleItemKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (
      event.key === 'ArrowLeft' &&
      rootContext.diginDepth > 0 &&
      (listContext?.nestedMenuDepth ?? 0) === 0
    ) {
      // Drilled in: Left goes back a level (before menubar handling). Rows in
      // a nested flyout fall through so Left closes the flyout first.
      event.preventDefault();
      event.stopPropagation();
      rootContext.onPopDiginLevel();
      return;
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      if (href) {
        itemOnKeyDown?.(event);
        return;
      }
      const depth = listContext?.nestedMenuDepth ?? 0;
      if (
        event.key === 'ArrowLeft' &&
        depth > 0 &&
        listContext?.closeParentSubMenuFlyout
      ) {
        event.preventDefault();
        event.stopPropagation();
        listContext.closeParentSubMenuFlyout();
        return;
      }
      if (
        event.key === 'ArrowLeft' &&
        depth === 0 &&
        rootContext.onMenubarEdgeNavigate
      ) {
        event.preventDefault();
        event.stopPropagation();
        rootContext.onCloseMenu();
        rootContext.onMenubarEdgeNavigate(-1);
        return;
      }
      if (event.key === 'ArrowRight' && rootContext.onMenubarEdgeNavigate) {
        event.preventDefault();
        event.stopPropagation();
        rootContext.onCloseMenu();
        rootContext.onMenubarEdgeNavigate(1);
        return;
      }
    }
    itemOnKeyDown?.(event);
    userOnKeyDown?.(event);
  };

  const role =
    variant === 'checkbox' || variant === 'toggle'
      ? 'menuitemcheckbox'
      : 'menuitem';

  const elementProps: BoxProps<'a'> | BoxProps<'button'> = href
    ? ({
        as: 'a',
        href,
        target,
        rel,
        ...(disabled && {
          onClick: (event: MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
          },
        }),
      } satisfies BoxProps<'a'>)
    : ({
        as: 'button',
        type: 'button',
        disabled,
      } satisfies BoxProps<'button'>);

  const itemRef = (node: HTMLAnchorElement | HTMLButtonElement | null) => {
    listItemData.ref(node as HTMLElement | null);
  };

  return (
    <Box
      {...elementProps}
      className={cx(classes.wrapper, className)}
      ref={itemRef}
      role={role}
      aria-checked={
        variant === 'checkbox' || variant === 'toggle'
          ? Boolean(selected)
          : undefined
      }
      aria-disabled={disabled}
      data-selected={selected}
      data-disabled={disabled}
      data-active={
        listContext ? listContext.activeIndex === listItemData.index : false
      }
      tabIndex={
        listContext
          ? (listContext.tabbableIndex ?? listContext.activeIndex) ===
            listItemData.index
            ? 0
            : -1
          : 0
      }
      {...itemPropsRest}
      onKeyDown={handleItemKeyDown}
      {...restProps}
    >
      {variant === 'checkbox' && (
        <Checkbox
          name={controlName}
          className={cx(classes.beforeSlot, css({ pointerEvents: 'none' }))}
          checked={Boolean(selected)}
          readOnly
          tabIndex={-1}
          aria-hidden
        />
      )}

      {variant === 'toggle' && (
        <Toggle
          name={controlName}
          className={cx(classes.beforeSlot, css({ pointerEvents: 'none' }))}
          checked={Boolean(selected)}
          readOnly
          mr="4"
          tabIndex={-1}
          aria-hidden
        />
      )}

      {iconBefore && (
        <Icon
          className={cx(classes.icon, classes.beforeSlot)}
          name={iconBefore}
        />
      )}

      <Box className={classes.itemMain}>
        {label && (
          <Text className={classes.itemLabel}>
            <HighlightText
              value={label}
              query={filterContext.query}
              enabled={filterContext.highlightMatches}
            />
          </Text>
        )}

        {description && (
          <Text className={classes.itemDescription}>
            <HighlightText
              value={description}
              query={filterContext.query}
              enabled={filterContext.highlightMatches}
            />
          </Text>
        )}
      </Box>

      {iconAfter && (
        <Icon
          className={cx(classes.icon, classes.afterSlot)}
          name={iconAfter}
          ml="auto"
        />
      )}
    </Box>
  );
};

setCompoundComponentType(
  MenuItem,
  menuComponentTypeKey,
  MENU_COMPONENT_TYPES.item,
);
