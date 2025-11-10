import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Icon } from '~/components/ui/Icon';
import { css, Theme } from '@emotion/react';
import { Button, ButtonProps } from '~/components/ui/Button';
import { MenuItem, MenuItemProps } from '~/components/ui/MenuItem';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & ButtonProps
>(({ children, variant = 'default', size = 'default', ...props }, ref) => (
  <SelectPrimitive.Trigger asChild>
    <Button
      ref={ref}
      variant={variant}
      size={size}
      css={(theme) => css`
        justify-content: space-between;
        & > span {
          line-clamp: 1;
        }
      `}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <Icon name="caret-down" />
      </SelectPrimitive.Icon>
    </Button>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const menuStyles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.size[8]};
  background-color: ${theme.mode === 'light'
    ? theme.color.gray[0]
    : theme.color.gray[80]};
  padding: ${theme.size[12]};
  border-radius: ${theme.radius[4]};
  margin-top: ${theme.size[4]};
  box-shadow: ${theme.mode === 'light'
    ? theme.shadow.low.light
    : theme.shadow.low.dark};
`;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton ref={ref} {...props}>
    <Icon name="chevron-up" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton ref={ref} {...props}>
    <Icon name="chevron-down" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      css={menuStyles}
      ref={ref}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> & MenuItemProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label asChild>
    <MenuItem ref={ref} itemType="subheader" {...props} />
  </SelectPrimitive.Label>
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & MenuItemProps
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item value={props.value} asChild>
    <MenuItem
      ref={ref}
      key={props.value}
      itemType="singleSelect"
      {...props}
      // css={(theme) => [
      //   css`
      //     [data-highlighted] {
      //       background-color: ${theme.color.gray[10]};
      //     }
      //   `,
      // ]}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <Icon name="check" className="h-4 w-4 ml-auto" />
      </SelectPrimitive.ItemIndicator>
    </MenuItem>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> &
    MenuItemProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator asChild>
    <MenuItem ref={ref} itemType="divider" {...props} />
  </SelectPrimitive.Separator>
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
