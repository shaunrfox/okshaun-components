import {
  arrow,
  FloatingArrow,
  FloatingPortal,
  useDismiss,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react';
import { cx } from '@styled-system/css';
import {
  tabs as tabsRecipe,
  tooltip as tooltipRecipe,
} from '@styled-system/recipes';
import { token } from '@styled-system/tokens';
import type { KeyboardEvent, MouseEvent } from 'react';
import { useCallback, useRef, useState } from 'react';

import {
  createOverlayMiddleware,
  useOverlayFloating,
} from '~/system/floating-ui/floating';
import { setCompoundComponentType } from '~/utils/compoundComponent';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import { Badge } from '../Badge';
import { Box, type BoxProps } from '../Box';
import { DsChainPortalRoot } from '../DsChainScope/DsChainPortalRoot';

import {
  TABS_COMPONENT_TYPES,
  type TabProps,
  tabsComponentTypeKey,
  useTabsContext,
} from './context/tabsContext';

/** Static class for a tab that overflowed: hidden, but still measurable. */
const overflowedTabClass = tabsRecipe({ overflowed: true }).tab;

/** Same slots the standalone `Tooltip` uses at its default size. */
const badgeTooltipClasses = tooltipRecipe({ size: 'md', hasTitle: false });

/**
 * Selects one panel inside a {@link Tabs} strip.
 *
 * Renders a `button` with `role="tab"`. Only the selected tab is in the tab
 * order; Arrow, Home, and End move between the others. A tab that does not fit
 * the strip stays mounted but hidden so it can still be measured, and it is
 * offered in the overflow menu instead. The menu row is plain text, so give
 * `label` when `children` are not plain text.
 *
 * `badgeTooltip` opens on hover and on keyboard focus of the tab itself, points
 * at the badge, and is linked to the tab with `aria-describedby` while open.
 *
 * @example
 * ```tsx
 * <Tab value="materials" badge={3} badgeTooltip="2 Open Requests">
 *   Materials
 * </Tab>
 * ```
 */
export const Tab = (props: TabProps) => {
  const {
    value,
    children,
    // Read by `Tabs` off this element's props for the overflow menu. It is
    // pulled out here so it never reaches the DOM as a stray attribute.
    label: _label,
    badge,
    badgeTooltip,
    disabled = false,
    onClick,
    onKeyDown,
    ref,
    ...rest
  } = props;

  const {
    classes,
    getPanelId,
    getTabId,
    onTabKeyDown,
    overflowValues,
    registerTabElement,
    selectTab,
    selectedValue,
  } = useTabsContext();

  const isSelected = selectedValue === value;
  const isOverflowed = overflowValues.includes(value);
  const [className, otherProps] = splitProps(rest);

  const setElement = useCallback(
    (element: HTMLButtonElement | null) => {
      registerTabElement(value, element);
    },
    [registerTabElement, value],
  );

  const tabClassName = isOverflowed ? overflowedTabClass : classes.tab;

  const hasBadge = typeof badge === 'number' && badge !== 0;
  const hasBadgeTooltip = hasBadge && Boolean(badgeTooltip) && !isOverflowed;

  // The badge tooltip is anchored to the focusable tab button, not to a span
  // around the badge: a descendant never receives the button's focus, so a
  // nested `Tooltip` would be unreachable by keyboard. The badge is only the
  // position reference the tooltip points at.
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const arrowRef = useRef<SVGSVGElement>(null);
  const tooltipOpen = hasBadgeTooltip && isTooltipOpen;

  const { refs, elements, floatingStyles, context } = useOverlayFloating({
    open: tooltipOpen,
    onOpenChange: setIsTooltipOpen,
    placement: 'bottom',
    middleware: createOverlayMiddleware({
      offset: 8,
      extras: [arrow({ element: arrowRef })],
    }),
  });

  const hover = useHover(context, { enabled: hasBadgeTooltip, move: false });
  const focus = useFocus(context, { enabled: hasBadgeTooltip });
  const dismiss = useDismiss(context, { enabled: hasBadgeTooltip });
  const role = useRole(context, { enabled: hasBadgeTooltip, role: 'tooltip' });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  // A consumer `ref` must not replace tab registration: overflow measurement
  // and keyboard focus both read the registered element.
  const mergedRef = useMergeRefs([setElement, refs.setReference, ref]);

  const badgeElement = hasBadge ? (
    <Box ref={refs.setPositionReference} className={classes.badge}>
      <Badge count={badge} variant="subtle" />
    </Box>
  ) : null;

  return (
    <>
      <Box
        {...({
          as: 'button',
          type: 'button',
        } satisfies BoxProps<'button'>)}
        ref={mergedRef}
        role="tab"
        aria-selected={isSelected}
        aria-controls={getPanelId(value)}
        aria-hidden={isOverflowed || undefined}
        disabled={disabled}
        tabIndex={isSelected && !isOverflowed ? 0 : -1}
        className={cx(tabClassName, className)}
        {...getReferenceProps({
          ...otherProps,
          onClick: (event: MouseEvent<HTMLButtonElement>) => {
            onClick?.(event);
            if (disabled || event.defaultPrevented) return;
            selectTab(event, value, 'clicked-on-tab');
          },
          onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => {
            onKeyDown?.(event);
            if (!event.defaultPrevented) onTabKeyDown(event);
          },
        })}
        // Spread after consumer props: an untyped `id` must not break the
        // panel's `aria-labelledby`.
        id={getTabId(value)}
      >
        {children}
        {badgeElement}
      </Box>

      {/* Rendered beside the button, not inside it, so React events from the
          portalled tooltip never bubble into the tab's click handler. */}
      {tooltipOpen ? (
        <FloatingPortal>
          <DsChainPortalRoot reference={elements.domReference}>
            <Box
              {...dsComponent('Tooltip')}
              ref={refs.setFloating}
              style={floatingStyles}
              className={badgeTooltipClasses.tooltipContent}
              {...(getFloatingProps() as Record<string, unknown>)}
            >
              <Box className={badgeTooltipClasses.text}>{badgeTooltip}</Box>
              <FloatingArrow
                ref={arrowRef}
                context={context}
                fill={token.var('colors.bg.neutral.inverse')}
              />
            </Box>
          </DsChainPortalRoot>
        </FloatingPortal>
      ) : null}
    </>
  );
};

setCompoundComponentType(Tab, tabsComponentTypeKey, TABS_COMPONENT_TYPES.tab);
