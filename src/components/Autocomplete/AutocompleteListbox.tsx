// biome-ignore-all lint/a11y/useSemanticElements: the combobox and listbox are composed from Box and List rather than native select markup, so the roles are applied explicitly
import { cx } from '@styled-system/css';
import { menu } from '@styled-system/recipes';
import type {
  CSSProperties,
  HTMLProps,
  ReactNode,
  RefCallback,
  UIEventHandler,
} from 'react';

import type { MenuDensity } from '~/components/Menu/context/menuContext';
import { useFloatingLayer } from '~/system/floating-ui/FloatingLayerContext';

import { Box } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import { List } from '../List/List';
import { ListItem } from '../List/ListItem';

import type { AnyAutocompleteValue, AutocompleteOptionData } from './types';

type AutocompleteListboxProps = {
  activeIndex: number | null;
  baseId: string;
  density: MenuDensity;
  floatingProps: Record<string, unknown>;
  floatingRef: RefCallback<HTMLDivElement>;
  floatingStyles: CSSProperties;
  getItemProps: (props: HTMLProps<HTMLElement>) => Record<string, unknown>;
  items: readonly AutocompleteOptionData[];
  listboxClassName: string;
  listboxId: string;
  loading: boolean;
  loadingMore: boolean;
  loadingText: ReactNode;
  multiple: boolean;
  noOptionsText: ReactNode;
  onScroll: UIEventHandler<HTMLDivElement>;
  onSelect: (option: AutocompleteOptionData) => void;
  query: string;
  selectedValues: readonly string[];
  setItemRef: (index: number, node: HTMLElement | null) => void;
  statusClassName: string;
  value: AnyAutocompleteValue;
};

export const AutocompleteListbox = (props: AutocompleteListboxProps) => {
  const floatingLayer = useFloatingLayer();
  const {
    activeIndex,
    baseId,
    density,
    floatingProps,
    floatingRef,
    floatingStyles,
    getItemProps,
    items,
    listboxClassName,
    listboxId,
    loading,
    loadingMore,
    loadingText,
    multiple,
    noOptionsText,
    onScroll,
    onSelect,
    query,
    selectedValues,
    setItemRef,
    statusClassName,
    value,
  } = props;
  const menuClasses = menu({ density, layer: floatingLayer });
  const showInitialLoading = loading && items.length === 0;
  const showNoOptions = !loading && items.length === 0;
  const selectedValueSet = new Set(selectedValues);

  return (
    <List
      ref={floatingRef}
      id={listboxId}
      role="listbox"
      aria-label="Suggestions"
      aria-multiselectable={multiple || undefined}
      aria-busy={loading || loadingMore || undefined}
      density={density}
      query={query}
      highlightMatches
      className={cx(menuClasses.wrapper, listboxClassName)}
      style={floatingStyles}
      onScroll={onScroll}
      {...floatingProps}
    >
      {items.map((option, index) => {
        const selected = multiple
          ? selectedValueSet.has(option.value)
          : value === option.value;

        return (
          <ListItem
            key={`${option.created ? 'create' : 'option'}-${option.value}`}
            id={`${baseId}-option-${index}`}
            ref={(node: HTMLElement | null) => setItemRef(index, node)}
            disabled={option.disabled}
            selected={selected}
            density={density}
            before={
              multiple ? (
                <Icon
                  name={selected ? 'checkbox-checked' : 'checkbox'}
                  fill={selected ? 'icon' : 'icon.subtlest'}
                  display="block"
                  aria-hidden
                />
              ) : undefined
            }
            label={option.label}
            description={option.description}
            iconBefore={option.iconLeft}
            iconAfter={option.iconRight}
            highlightMatches={!option.created}
            tabIndex={-1}
            bg={activeIndex === index ? 'bg.neutral.hovered' : undefined}
            data-active={activeIndex === index || undefined}
            {...getItemProps({
              onMouseDown: (event) => event.preventDefault(),
              onClick: () => {
                if (!option.disabled) {
                  onSelect(option);
                }
              },
            })}
          />
        );
      })}

      {showInitialLoading && (
        <Box className={statusClassName} role="status">
          {loadingText}
        </Box>
      )}

      {showNoOptions && (
        <Box className={statusClassName} role="status">
          {noOptionsText}
        </Box>
      )}

      {loadingMore && (
        <Box className={statusClassName} role="status">
          {loadingText}
        </Box>
      )}
    </List>
  );
};
