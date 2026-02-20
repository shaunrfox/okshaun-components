import {
  FloatingFocusManager,
  FloatingPortal,
  type Placement,
  autoUpdate,
  flip,
  offset as floatingOffset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from '@floating-ui/react';
import { cx } from '@styled-system/css';
import {
  type MenuVariantProps,
  menu as menuRecipe,
} from '@styled-system/recipes';
import React, { useRef, useState, useMemo } from 'react';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
import { MenuContext } from './MenuContext';
import type { MenuContextValue } from './MenuContext';
import { MenuTrigger } from './MenuTrigger';

export type MenuProps = Omit<BoxProps, keyof MenuVariantProps> &
  MenuVariantProps & {
    /** Controlled open state (REQUIRED) */
    open: boolean;
    /** Callback when open state should change (REQUIRED) */
    onOpenChange: (open: boolean) => void;
    /** Floating UI placement */
    placement?: Placement;
    /** Offset distance from trigger (in pixels) */
    offset?: number;
    /** Children (MenuTrigger, MenuItem, MenuGroup, etc.) */
    children: React.ReactNode;
    /** Optional ID for ARIA attributes */
    id?: string;
  };

export const Menu = (props: MenuProps) => {
  const {
    open,
    onOpenChange,
    placement = 'bottom-start',
    offset = 4,
    children,
    id,
    packing,
    indicatorPosition,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const classes = menuRecipe({ packing, indicatorPosition });

  // List navigation state
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<(HTMLElement | null)[]>([]);
  const listContentRef = useRef<string[]>([]);

  // Floating UI setup
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange,
    placement,
    middleware: [floatingOffset(offset), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  // Interaction hooks
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'menu' });
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    // below disabled because it was causing the first MenuItem to appear focused immediately on open
    // onNavigate: setActiveIndex,
  });
  const typeahead = useTypeahead(context, {
    listRef: listContentRef,
    activeIndex,
    onMatch: (index) => {
      if (open) setActiveIndex(index);
    },
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role, listNavigation, typeahead],
  );

  // Context value
  const contextValue: MenuContextValue = useMemo(
    () => ({
      open,
      setOpen: onOpenChange,
      refs: {
        setReference: refs.setReference,
        setFloating: refs.setFloating,
      },
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
      getItemProps,
      activeIndex,
      listRef,
      classes,
    }),
    [
      open,
      onOpenChange,
      refs.setReference,
      refs.setFloating,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
      getItemProps,
      activeIndex,
      classes,
    ],
  );

  // Separate trigger children from menu content children
  const triggerChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === MenuTrigger,
  );

  const menuChildren = React.Children.toArray(children).filter(
    (child) => !(React.isValidElement(child) && child.type === MenuTrigger),
  );

  return (
    <MenuContext.Provider value={contextValue}>
      {/* Render trigger children */}
      {triggerChild}

      {/* Floating menu content */}
      {open && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <Box
              ref={refs.setFloating}
              style={floatingStyles}
              className={cx(classes.menu, className)}
              id={id}
              role="menu"
              aria-orientation="vertical"
              {...(getFloatingProps() as Record<string, unknown>)}
              {...otherProps}
            >
              {menuChildren}
            </Box>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </MenuContext.Provider>
  );
};
