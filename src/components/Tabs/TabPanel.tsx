import { cx } from '@styled-system/css';

import { setCompoundComponentType } from '~/utils/compoundComponent';
import { splitProps } from '~/utils/splitProps';

import { Box } from '../Box';

import {
  TABS_COMPONENT_TYPES,
  TabPanelActiveProvider,
  type TabPanelProps,
  type TabPanelRenderProps,
  tabsComponentTypeKey,
  useTabsContext,
} from './context/tabsContext';

/**
 * Renders the content for one {@link Tab}.
 *
 * The panel stays mounted when another tab is selected and is hidden with
 * `display: none`, which preserves scroll position and local state; set
 * `unmountInactive` on `Tabs` to render only the selected panel instead. A
 * function child receives `{ isActive }`, and descendants can call
 * `useTabPanelActive()` for the same signal, so hidden panels can pause polling
 * or animation.
 *
 * @example
 * ```tsx
 * <TabPanel value="materials">
 *   {({ isActive }) => <MaterialsGrid paused={!isActive} />}
 * </TabPanel>
 * ```
 */
export const TabPanel = (props: TabPanelProps) => {
  const { value, children, ...rest } = props;
  const { classes, getPanelId, getTabId, selectedValue, unmountInactive } =
    useTabsContext();

  const isActive = selectedValue === value;
  const [className, otherProps] = splitProps(rest);

  if (unmountInactive && !isActive) {
    return null;
  }

  const renderProps: TabPanelRenderProps = { isActive };
  const content =
    typeof children === 'function' ? children(renderProps) : children;

  return (
    <TabPanelActiveProvider value={isActive}>
      <Box
        role="tabpanel"
        aria-labelledby={getTabId(value)}
        tabIndex={isActive ? 0 : -1}
        display={isActive ? 'block' : 'none'}
        // A consumer's responsive `display` (for example `{ md: 'flex' }`)
        // must not reveal an inactive panel. The `[hidden]` rule outranks
        // single-class breakpoint utilities on specificity.
        _hidden={{ display: 'none' }}
        className={cx(classes.panel, className)}
        {...otherProps}
        // Set after consumer props: an untyped `id` must not break the tab's
        // `aria-controls`.
        id={getPanelId(value)}
        hidden={!isActive}
      >
        {content}
      </Box>
    </TabPanelActiveProvider>
  );
};

setCompoundComponentType(
  TabPanel,
  tabsComponentTypeKey,
  TABS_COMPONENT_TYPES.panel,
);
