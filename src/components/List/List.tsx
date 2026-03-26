import { cx } from '@styled-system/css';
import { type ListVariantProps, list } from '@styled-system/recipes';
import { type KeyboardEvent, type ReactNode, useMemo, useRef } from 'react';

import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';

import { type ListDensity, ListProvider } from './listContext';

export type ListProps = Omit<BoxProps, keyof ListVariantProps | 'children'> &
  ListVariantProps & {
    children: ReactNode;
    density?: ListDensity;
    query?: string;
    highlightMatches?: boolean;
  };

export const List = (props: ListProps) => {
  const {
    children,
    density = 'compact',
    query = '',
    highlightMatches = false,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const listRef = useRef<HTMLDivElement | null>(null);
  const isListbox = otherProps.role === 'listbox';
  const userOnKeyDown =
    typeof otherProps.onKeyDown === 'function'
      ? (otherProps.onKeyDown as (event: KeyboardEvent<HTMLDivElement>) => void)
      : undefined;

  const value = useMemo(
    () => ({
      density,
      query,
      highlightMatches,
    }),
    [density, query, highlightMatches],
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    userOnKeyDown?.(event);

    if (event.defaultPrevented || !isListbox) {
      return;
    }

    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      return;
    }

    const rootNode = listRef.current;

    if (!rootNode) {
      return;
    }

    const optionNodes = Array.from(
      rootNode.querySelectorAll<HTMLElement>(
        '[role="option"]:not([disabled]):not([aria-disabled="true"])',
      ),
    );

    if (optionNodes.length === 0) {
      return;
    }

    event.preventDefault();

    const focusedIndex = optionNodes.findIndex(
      (node) => node === document.activeElement,
    );
    const selectedIndex = optionNodes.findIndex(
      (node) => node.getAttribute('aria-selected') === 'true',
    );
    const currentIndex =
      focusedIndex >= 0 ? focusedIndex : selectedIndex >= 0 ? selectedIndex : 0;

    let nextIndex = currentIndex;

    if (event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % optionNodes.length;
    } else if (event.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + optionNodes.length) % optionNodes.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = optionNodes.length - 1;
    }

    const nextNode = optionNodes[nextIndex];
    nextNode?.focus();
    nextNode?.scrollIntoView({ block: 'nearest' });
  };

  return (
    <ListProvider value={value}>
      <Box
        ref={listRef}
        {...otherProps}
        onKeyDown={handleKeyDown}
        className={cx(list({}), className)}
      >
        {children}
      </Box>
    </ListProvider>
  );
};
