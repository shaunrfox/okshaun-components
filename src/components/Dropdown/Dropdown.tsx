import React, { useState } from 'react';
import { Menu, MenuTrigger } from '../Menu';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { css } from '@styled-system/css';
import type { DropdownProps } from './types';

const caretStyles = css({
  transitionProperty: '[transform]',
  transitionDuration: 'normal',
  transitionTimingFunction: 'default',
  '&[data-open="true"]': {
    transform: 'rotate(180deg)',
  },
});

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  placement = 'bottom-start',
  offset = 4,
  children,
  id,
  disabled = false,
  size,
  indicatorPosition,
  triggerProps,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Menu
      open={open}
      onOpenChange={setOpen}
      placement={placement}
      offset={offset}
      id={id}
      size={size}
      indicatorPosition={indicatorPosition}
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
