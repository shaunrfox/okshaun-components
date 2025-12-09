import React, { useRef, useState, useMemo } from 'react';
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useListNavigation,
  useTypeahead,
  offset as floatingOffset,
  flip,
  shift,
  autoUpdate,
  FloatingPortal,
  FloatingFocusManager,
} from '@floating-ui/react';
import { Box } from '../Box';
import { menu as menuRecipe } from '@styled-system/recipes';
import { cx } from '@styled-system/css';
import { splitProps } from '~/utils/splitProps';
import { MenuContext } from './MenuContext';
import { MenuTrigger } from './MenuTrigger';
import type { MenuProps, MenuContextValue } from './types';

export const Menu: React.FC<MenuProps> = ({
  open,
  onOpenChange,
  placement = 'bottom-start',
  offset = 4,
  children,
  id,
  size,
  indicatorPosition,
  ...props
}) => {
  const [className, otherProps] = splitProps(props);
  const classes = menuRecipe({ size, indicatorPosition });

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
    onNavigate: setActiveIndex,
  });
  const typeahead = useTypeahead(context, {
    listRef: listContentRef,
    activeIndex,
    onMatch: (index) => {
      if (open) setActiveIndex(index);
    },
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNavigation,
    typeahead,
  ]);

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
    ]
  );

  // Separate trigger children from menu content children
  const triggerChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === MenuTrigger
  );

  const menuChildren = React.Children.toArray(children).filter(
    (child) => !(React.isValidElement(child) && child.type === MenuTrigger)
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
