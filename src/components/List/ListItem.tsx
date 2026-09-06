import { cx } from '@styled-system/css';
import { type ListItemVariantProps, listItem } from '@styled-system/recipes';
import type { ColorToken } from '@styled-system/tokens';
import type { ConditionalValue } from '@styled-system/types';
import type { ChangeEventHandler, MouseEvent } from 'react';

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
  BoxProps,
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
    iconBeforeFill?: ConditionalValue<ColorToken>;
    iconAfterFill?: ConditionalValue<ColorToken>;
    href?: string;
    disabled?: boolean;
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
    iconBeforeFill,
    iconAfterFill,
    href,
    disabled = false,
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
  const isLink = Boolean(href);
  const isDisabled = Boolean(disabled);
  const {
    onClick: userOnClick,
    role: userRole,
    tabIndex: userTabIndex,
    ...elementProps
  } = otherProps;
  const resolvedRole = isLink ? userRole : (userRole ?? 'option');
  const handleDisabledLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
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
    <Box
      {...elementProps}
      as={isLink ? 'a' : 'button'}
      href={href}
      type={isLink ? undefined : 'button'}
      className={cx(classes.wrapper, className)}
      role={resolvedRole}
      aria-selected={isSelected}
      data-active={isActive || undefined}
      data-selected={isSelected || undefined}
      data-disabled={isDisabled || undefined}
      disabled={!isLink ? isDisabled : undefined}
      aria-disabled={isLink && isDisabled ? true : undefined}
      tabIndex={isLink && isDisabled ? -1 : userTabIndex}
      onClick={isLink && isDisabled ? handleDisabledLinkClick : userOnClick}
    >
      {hasCustomChildren ? (
        children
      ) : (
        <>
          {variant === 'checkbox' && (
            <Box className={classes.beforeSlot}>
              <Checkbox
                name={controlName}
                checked={isSelected}
                onChange={handleControlChange}
                tabIndex={-1}
              />
            </Box>
          )}

          {variant === 'toggle' && (
            <Box className={classes.beforeSlot}>
              <Toggle
                name={controlName}
                checked={isSelected}
                onChange={handleControlChange}
                tabIndex={-1}
              />
            </Box>
          )}

          {iconBefore && (
            <Box className={classes.beforeSlot}>
              <Icon
                className={classes.icon}
                name={iconBefore}
                fill={iconBeforeFill}
              />
            </Box>
          )}

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
            <Box className={classes.afterSlot} ml="auto">
              <Icon
                className={classes.icon}
                name={iconAfter}
                fill={iconAfterFill}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
