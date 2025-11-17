import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { css, Theme } from '@emotion/react';
import Icon from './Icon';
import { Box } from './Box';
import { Button, ButtonProps } from '~/components/ui/Button';
import { MenuItem, MenuItemProps } from '~/components/ui/MenuItem';
import { Rule } from './Rule';

// const DDM = DropdownMenuPrimitive;

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const menuStyles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.size[4]};
  overflow-y: auto;
  min-width: 8rem;
  background-color: ${theme.mode === 'light'
    ? theme.color.gray[0]
    : theme.color.gray[80]};
  padding: ${theme.size[8]};
  border-radius: ${theme.radius[4]};
  margin-top: ${theme.size[4]};
  box-shadow: ${theme.mode === 'light'
    ? theme.shadow.low.light
    : theme.shadow.low.dark};
  z-index: 50;
`;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      css={menuStyles}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    isActive?: boolean;
  }
>(({ isActive, className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={`${isActive ? 'isActive' : ''} ${className || ''}`}
    {...props}
  >
    <MenuItem isActive={isActive}>{children}</MenuItem>
  </DropdownMenuPrimitive.Item>
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem ref={ref} checked={checked} {...props}>
    <span
      css={(theme) => css`
        position: absolute;
        left: ${theme.size[2]};
        display: flex;
        height: ${theme.size[14]};
        width: ${theme.size[14]};
        align-items: center;
        justify-content: center;
      `}
    >
      <DropdownMenuPrimitive.ItemIndicator>
        <Icon name="check" className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    css={(theme) => css`
      position: relative;
      display: flex;
      cursor: default;
      user-select: none;
      align-items: center;
      border-radius: ${theme.radius[4]};
      padding-block: ${theme.size[2]};
      padding-inline: ${theme.size[16]} ${theme.size[4]};
      font-size: ${theme.size[14]};
      outline: none;
      &[data-disabled] {
        pointer-events: none;
        opacity: 0.4;
      }
    `}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Box
          css={(theme) => css`
            width: ${theme.size[16]};
            height: ${theme.size[16]};
            background-color: currentColor;
            border-radius: 50%;
          `}
        />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    css={(theme) => css`
      padding-block: ${theme.size[2]};
      padding-inline: ${theme.size[2]};
      font-size: ${theme.size[14]};
      font-weight: ${theme.font.weight.medium};
      ${inset && 'padding-left: ${theme.size[8]};'};
    `}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator ref={ref} asChild {...props}>
    <Rule />
  </DropdownMenuPrimitive.Separator>
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      css={(theme) => css`
        margin-left: auto;
        font-size: ${theme.size[12]};
        font-weight: ${theme.font.weight.medium};
        text-transform: uppercase;
      `}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger ref={ref} asChild {...props}>
    <MenuItem>
      {children}
      <Icon name="chevron-right" css={{ marginLeft: 'auto' }} />
    </MenuItem>
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    css={(theme) => css`
      z-index: 50;
      min-width: 8rem;
      overflow: hidden;
      border-radius: ${theme.radius[4]};
      background-color: ${theme.color.gray[0]};
      padding: ${theme.size[1]};
      color: ${theme.color.gray[100]};
      box-shadow: ${theme.shadow.lg};
      data-[state='open'] {
      }
      data-[state='closed'] {
      }
    `}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
