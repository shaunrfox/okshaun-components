import { cx } from '@styled-system/css';
import { type ListItemVariantProps, listItem } from '@styled-system/recipes';
import type { ChangeEventHandler } from 'react';

import type { IconNamesList } from '~/components/Icon';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';
import { Checkbox } from '../Checkbox';
import { Divider } from '../Divider';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { Toggle } from '../Toggle';

import { HighlightText } from './HighlightText';
import { useListContext } from './listContext';

export type ListItemProps = Omit<
  BoxProps<'button'>,
  keyof ListItemVariantProps | 'as' | 'type'
> &
  Omit<ListItemVariantProps, 'selected' | 'iconBefore' | 'iconAfter'> & {
    active?: boolean;
    label?: string;
    description?: string;
    query?: string;
    highlightMatches?: boolean;
    controlName?: string;
    onControlChange?: ChangeEventHandler<HTMLInputElement>;
    selected?: boolean;
    variant?: ListItemVariantProps['variant'];
    density?: ListItemVariantProps['density'];
    iconBefore?: IconNamesList;
    iconAfter?: IconNamesList;
  };

export const ListItem = (props: ListItemProps) => {
  const {
    active = false,
    selected = false,
    density,
    variant = 'default',
    label,
    description,
    query,
    highlightMatches,
    controlName = 'list-item',
    onControlChange,
    children,
    iconBefore,
    iconAfter,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);

  const listContext = useListContext();

  const isActive = Boolean(active);
  const isSelected = Boolean(selected);
  const resolvedDensity = density ?? listContext.density;
  const resolvedQuery = query ?? listContext.query;
  const shouldHighlight = highlightMatches ?? listContext.highlightMatches;
  const hasCustomChildren = children !== undefined && children !== null;
  const handleControlChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onControlChange?.(event);
  };

  const classes = listItem({
    selected: isSelected,
    density: resolvedDensity,
    variant,
    iconBefore: Boolean(iconBefore),
    iconAfter: Boolean(iconAfter),
  });

  if (variant === 'divider') {
    return (
      <Box className={classes.divider}>
        <Divider role="separator" />
      </Box>
    );
  }

  return (
    // biome-ignore lint/a11y/useSemanticElements: custom listbox options are interactive buttons with role="option", not native <option> elements
    <Box
      as="button"
      type="button"
      className={cx(classes.wrapper, className)}
      role="option"
      aria-selected={isSelected}
      data-active={isActive || undefined}
      data-selected={isSelected || undefined}
      {...otherProps}
    >
      {hasCustomChildren ? (
        children
      ) : (
        <>
          {variant === 'checkbox' && (
            <Checkbox
              name={controlName}
              checked={isSelected}
              onChange={handleControlChange}
              tabIndex={-1}
            />
          )}

          {variant === 'toggle' && (
            <Toggle
              name={controlName}
              checked={isSelected}
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
                  query={resolvedQuery}
                  enabled={shouldHighlight}
                />
              </Text>
            )}

            {description && (
              <Text className={classes.itemDescription}>
                <HighlightText
                  value={description}
                  query={resolvedQuery}
                  enabled={shouldHighlight}
                />
              </Text>
            )}
          </Box>

          {iconAfter && (
            <Icon className={classes.icon} name={iconAfter} ml="auto" />
          )}
        </>
      )}
    </Box>
  );
};
