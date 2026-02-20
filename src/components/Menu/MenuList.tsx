import { cx } from '@styled-system/css';
import {
  type MenuVariantProps,
  menu as menuRecipe,
} from '@styled-system/recipes';
import type React from 'react';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
import type { IconNamesList } from '../Icon';
import type { MenuItemType, SelectionIndicator } from './MenuItem';

export type MenuListProps = Omit<BoxProps, keyof MenuVariantProps> &
  MenuVariantProps;

export type MenuListItemProps = Omit<
  BoxProps,
  'children' | 'onClick' | keyof MenuVariantProps
> &
  MenuVariantProps & {
    /** Item behavior type */
    type?: MenuItemType;
    /** Selected state (for single-select and multi-select) */
    selected?: boolean;
    /** Active highlight state (controlled externally) */
    active?: boolean;
    /** Click handler */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    /** Disable the item */
    disabled?: boolean;
    /** Primary label (required) */
    label: string | React.ReactNode;
    /** Secondary description text */
    description?: string;
    /** Icon on the left side */
    iconLeft?: IconNamesList;
    /** Icon on the right side */
    iconRight?: IconNamesList;
    /** Text to highlight (for autocomplete/search scenarios) */
    highlightMatch?: string;
    /** Selection indicator style (only for select types) */
    selectionIndicator?: SelectionIndicator;
  };

export type MenuListDividerProps = Omit<
  BoxProps,
  'children' | keyof MenuVariantProps
> &
  MenuVariantProps;

export type MenuListGroupProps = Omit<
  BoxProps,
  'title' | keyof MenuVariantProps
> &
  MenuVariantProps & {
    /** Group label */
    label?: string;
    /** Children (MenuListItem components) */
    children: React.ReactNode;
  };

export const MenuList = (props: MenuListProps) => {
  const { packing, indicatorPosition, role = 'listbox', ref, ...rest } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = menuRecipe({ packing, indicatorPosition });

  return (
    <Box
      ref={ref}
      role={role}
      className={cx(classes.menu, className)}
      {...otherProps}
    />
  );
};

MenuList.displayName = 'MenuList';
