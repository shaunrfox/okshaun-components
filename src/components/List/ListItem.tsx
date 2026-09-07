// biome-ignore-all lint/a11y/useSemanticElements: the combobox and listbox are composed from Box and List rather than native select markup, so the roles are applied explicitly
import { cx } from '@styled-system/css';
import { type ListItemVariantProps, listItem } from '@styled-system/recipes';
import type { ChangeEventHandler, ReactNode } from 'react';

import type { IconProps } from '~/components/Icon/Icon';
import type { IconNamesList } from '~/components/Icon/icons';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box/Box';
import { Checkbox } from '../Checkbox/Checkbox';
import { Divider } from '../Divider/Divider';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';
import { Toggle } from '../Toggle/Toggle';

import { HighlightText } from './HighlightText';
import { type ListDensity, useListContext } from './listContext';

/**
 * Props for {@link ListItem}. It extends button-like Box props, except its
 * semantic element and button type are controlled by the component.
 */
export type ListItemProps = Omit<
  BoxProps,
  keyof ListItemVariantProps | 'as' | 'type' | 'href'
> &
  Omit<ListItemVariantProps, 'selected' | 'iconBefore' | 'iconAfter'> & {
    /** When provided, renders an anchor instead of the default native button. */
    href?: string;
    /** Content rendered before the default label and description. */
    before?: ReactNode;
    /** Primary text rendered when custom `children` are not supplied. */
    label?: string;
    /** Secondary text rendered below `label` when custom `children` are not supplied. */
    description?: string;
    /** Search text used to highlight this item's default `label` and `description`. */
    query?: string;
    /**
     * Enables highlighting for this item's default text. When omitted, inherits
     * the nearest {@link List} setting.
     */
    highlightMatches?: boolean;
    /**
     * Native `name` passed to the checkbox or toggle created by the matching
     * `variant`.
     *
     * @default 'list-item'
     */
    controlName?: string;
    /**
     * Runs for the native change event from a checkbox or toggle variant. It
     * does not update `selected`; update that prop from the owning state.
     */
    onControlChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * Sets `aria-selected` and selected styling. This is controlled state and
     * does not change when the item is clicked.
     *
     * @default false
     */
    selected?: boolean;
    /**
     * Chooses default content, a checkbox, a toggle, or a noninteractive
     * divider. The `divider` variant ignores item content and other Box props.
     *
     * @default 'default'
     */
    variant?: ListItemVariantProps['variant'];
    /**
     * Overrides the nearest {@link List} or {@link ListItemGroup} density.
     * Responsive recipe values are supported.
     */
    density?: ListDensity;
    /** Icon symbol rendered before the default text content. */
    iconBefore?: IconNamesList;
    /** Icon symbol rendered after the default text content. */
    iconAfter?: IconNamesList;
    /** Fill token for `iconBefore`. */
    iconBeforeFill?: IconProps['fill'];
    /** Fill token for `iconAfter`. */
    iconAfterFill?: IconProps['fill'];
    /**
     * Internal record primary key rendered as `data-row-id` on the item root.
     * It targets one row in a test and identifies which record an interaction
     * applied to.
     *
     * It must never be a row index, a composite value, or a customer-facing
     * identifier such as an order number or part number. It is unrelated to
     * React's `key`.
     */
    rowId?: string;
  };

/**
 * Renders an interactive option, link, selection control, or visual divider.
 *
 * Except for the `divider` variant, it renders a native `button` with
 * `type="button"` by default, or an anchor when `href` is provided, and sets
 * `role="option"`. Place interactive items in a suitably labeled parent such
 * as `<List role="listbox">`. Pass custom `children` for fully custom item
 * content; doing so replaces the label, description, controls, icons, and
 * match highlighting.
 *
 * @example
 * ```tsx
 * <ListItem label="Profile" description="Manage your account" />
 * ```
 */
export const ListItem = (props: ListItemProps) => {
  const {
    selected = false,
    density,
    variant = 'default',
    before,
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
    rowId,
    'data-ds-component': dsComponentName,
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);

  const listContext = useListContext();

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
      <Box
        {...dsComponent('ListItem', dsComponentName)}
        className={classes.divider}
      >
        <Divider role="separator" />
      </Box>
    );
  }

  return (
    <Box
      {...dsComponent('ListItem', dsComponentName)}
      {...(href
        ? ({
            as: 'a',
            href,
          } satisfies BoxProps<'a'>)
        : ({
            as: 'button',
            type: 'button',
          } satisfies BoxProps<'button'>))}
      className={cx(classes.wrapper, className)}
      role="option"
      aria-selected={isSelected}
      data-selected={isSelected || undefined}
      data-row-id={rowId}
      {...otherProps}
    >
      {hasCustomChildren ? (
        children
      ) : (
        <>
          {before && (
            <Box className={classes.beforeSlot} aria-hidden>
              {before}
            </Box>
          )}

          {variant === 'checkbox' && (
            <Checkbox
              name={controlName}
              className={classes.beforeSlot}
              checked={isSelected}
              onChange={handleControlChange}
              tabIndex={-1}
            />
          )}

          {variant === 'toggle' && (
            <Toggle
              name={controlName}
              className={classes.beforeSlot}
              checked={isSelected}
              onChange={handleControlChange}
              mr="4"
              tabIndex={-1}
            />
          )}

          {iconBefore && (
            <Icon
              className={cx(classes.icon, classes.beforeSlot)}
              name={iconBefore}
              fill={iconBeforeFill}
            />
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
            <Icon
              className={cx(classes.icon, classes.afterSlot)}
              name={iconAfter}
              fill={iconAfterFill}
              ml="auto"
            />
          )}
        </>
      )}
    </Box>
  );
};
