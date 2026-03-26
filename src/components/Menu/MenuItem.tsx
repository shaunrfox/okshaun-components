import { useFloatingTree, useListItem } from '@floating-ui/react';
import { cx } from '@styled-system/css';
import { listItem as listItemRecipe } from '@styled-system/recipes';
import type { ChangeEventHandler, HTMLProps, MouseEvent } from 'react';

import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';
import { Checkbox } from '../Checkbox';
import { Divider } from '../Divider';
import { Icon } from '../Icon';
import { HighlightText } from '../List';
import { Text } from '../Text';
import { Toggle } from '../Toggle';

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

  const handleControlChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
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

  const role =
    variant === 'checkbox' || variant === 'toggle'
      ? 'menuitemcheckbox'
      : 'menuitem';

  // const selectionControl =
  //   variant === 'checkbox' || variant === 'toggle' ? variant : 'none';

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
          ? listContext.activeIndex === listItemData.index
            ? 0
            : -1
          : 0
      }
      {...itemProps}
      {...otherProps}
    >
      {variant === 'checkbox' && (
        <Checkbox
          name={controlName}
          checked={Boolean(selected)}
          onChange={handleControlChange}
          tabIndex={-1}
        />
      )}

      {variant === 'toggle' && (
        <Toggle
          name={controlName}
          checked={Boolean(selected)}
          onChange={handleControlChange}
          mr="4"
          tabIndex={-1}
        />
      )}

      {iconBefore && <Icon className={classes.icon} name={iconBefore} />}

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
        <Icon className={classes.icon} name={iconAfter} ml="auto" />
      )}
    </Box>
  );
};

(MenuItem as unknown as { [menuComponentTypeKey]: string })[
  menuComponentTypeKey
] = MENU_COMPONENT_TYPES.item;
