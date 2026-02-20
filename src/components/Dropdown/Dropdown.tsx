import type { Placement } from '@floating-ui/react';
import { cx } from '@styled-system/css';
import { css } from '@styled-system/css';
import {
  type MenuVariantProps,
  menu as menuRecipe,
} from '@styled-system/recipes';
import type React from 'react';
import { useState } from 'react';
import { splitProps } from '~/utils/splitProps';
import { Button, type ButtonProps } from '../Button';
import { Icon } from '../Icon';
import { Menu, MenuTrigger } from '../Menu';

export type DropdownProps = MenuVariantProps & {
  /** Trigger button label */
  label: string;
  /** Floating UI placement */
  placement?: Placement;
  /** Offset distance from trigger (in pixels) */
  offset?: number;
  /** Children (MenuItem, MenuGroup, MenuDivider, etc.) */
  children: React.ReactNode;
  /** Optional ID for ARIA attributes */
  id?: string;
  /** Disable the dropdown */
  disabled?: boolean;
  /** Props to pass to the trigger Button */
  triggerProps?: Omit<ButtonProps, 'children' | 'disabled'>;
};

const caretStyles = css({
  transitionProperty: 'transform',
  transitionDuration: 'normal',
  transitionTimingFunction: 'default',
  '&[data-open="true"]': {
    transform: 'rotate(180deg)',
  },
});

export const Dropdown = (props: DropdownProps) => {
  const {
    label,
    placement = 'bottom-start',
    offset = 4,
    children,
    id,
    disabled = false,
    packing,
    indicatorPosition,
    triggerProps,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = menuRecipe({ packing, indicatorPosition });
  const [open, setOpen] = useState(false);

  return (
    <Menu
      open={open}
      onOpenChange={setOpen}
      placement={placement}
      offset={offset}
      id={id}
      packing={packing}
      indicatorPosition={indicatorPosition}
      className={cx(classes.menu, className)}
      {...otherProps}
    >
      <MenuTrigger disabled={disabled}>
        <Button disabled={disabled} {...triggerProps}>
          {label}
          <Icon
            name="caret-down"
            size="20"
            className={caretStyles}
            data-open={open}
          />
        </Button>
      </MenuTrigger>
      {children}
    </Menu>
  );
};
