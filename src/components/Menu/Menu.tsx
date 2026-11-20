import {
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  safePolygon,
  useClick,
  useDismiss,
  useFloatingNodeId,
  useFocus,
  useHover,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
} from '@floating-ui/react';
import { cx } from '@styled-system/css';
import { list, menu } from '@styled-system/recipes';
import {
  Children,
  type CSSProperties,
  cloneElement,
  type HTMLAttributes,
  type HTMLProps,
  isValidElement,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useLocale } from '~/system/context/useLocale';
import { useFloatingLayer } from '~/system/floating-ui/FloatingLayerContext';
import {
  availableHeightMiddleware,
  createOverlayMiddleware,
  useOverlayFloating,
} from '~/system/floating-ui/floating';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import { Box } from '../Box/Box';
import { DsChainPortalRoot } from '../DsChainScope/DsChainPortalRoot';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

import {
  findSubMenuChildren,
  findSubMenuKeyPath,
  hasMatchingItems,
  MenuFilterProvider,
  MenuListProvider,
  type MenuProps,
  type MenuRootContextValue,
  MenuRootProvider,
} from './context/menuContext';
import { useBlockPointerEventsForHoverPolygon } from './hooks/useBlockPointerEventsForHoverPolygon';
import {
  findFirstEnabledListIndex,
  navigateListMainAxisLoop,
} from './utils/navigateListMainAxis';

type DiginLevel = {
  key: string;
  title: string;
  children: ReactNode;
  /** Index of the parent-level row that opened this level (focus target on pop). */
  returnIndex: number | null;
  /** Structural key path of the opening SubMenu, used to resolve live children. */
  path: string[] | null;
};

/** Where focus should land after the drill-in level changes. */
type DiginFocusIntent = 'first' | { index: number | null };

const focusableInLevelSelector =
  'input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])';

const isTextEntryTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    (target instanceof HTMLInputElement &&
      !['button', 'checkbox', 'submit', 'reset'].includes(target.type)));

const defaultGetItemText = ({
  label,
  description,
}: {
  label?: string;
  description?: string;
}) => {
  return [label, description].filter(Boolean).join(' ').trim();
};

const tabbableSelector = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  '[tabindex]',
  '[contenteditable="true"]',
].join(',');

const isTabbable = (element: HTMLElement) => {
  if (element.hasAttribute('disabled')) return false;
  if (element.getAttribute('aria-hidden') === 'true') return false;
  if (element.getAttribute('tabindex') === '-1') return false;
  if (element.hasAttribute('data-floating-ui-focus-guard')) return false;

  const style = element.ownerDocument.defaultView?.getComputedStyle(element);
  if (style?.display === 'none' || style?.visibility === 'hidden') {
    return false;
  }

  return element.getClientRects().length > 0;
};

const getNextTabbableOutsideFloating = ({
  target,
  floatingElement,
  direction,
}: {
  target: HTMLElement;
  floatingElement: HTMLElement | null;
  direction: 1 | -1;
}) => {
  const candidates = Array.from(
    target.ownerDocument.querySelectorAll<HTMLElement>(tabbableSelector),
  ).filter((element) => {
    return isTabbable(element) && !floatingElement?.contains(element);
  });

  const currentIndex = candidates.indexOf(target);
  if (currentIndex === -1) return null;

  return candidates[currentIndex + direction] ?? null;
};

const withLevelScopedKeys = (nodes: ReactNode, levelKey: string) => {
  return Children.map(nodes, (childNode, index) => {
    if (!isValidElement(childNode)) {
      return childNode;
    }

    const childKey = childNode.key ?? index;
    return cloneElement(childNode, {
      key: `${levelKey}-${String(childKey)}`,
    });
  });
};

/**
 * Displays a keyboard-navigable action list from a trigger or inline in a layout.
 *
 * Use `MenuItem`, `MenuGroup`, and `SubMenu` as children. A triggered menu
 * restores the trigger relationship through Floating UI and dismisses on Escape
 * or outside press. Use an inline menu when the list should always be visible.
 *
 * @example
 * ```tsx
 * <Menu trigger={<Button>Actions</Button>}>
 *   <MenuItem label="Edit" onClick={edit} />
 *   <MenuItem label="Archive" onClick={archive} />
 * </Menu>
 * ```
 */
export const Menu = (props: MenuProps) => {
  const { labels } = useLocale();
  const nodeId = useFloatingNodeId();
  const floatingLayer = useFloatingLayer();
  const {
    trigger,
    children,
    open,
    defaultOpen,
    onOpenChange,
    placement = 'bottom-start',
    strategy = 'absolute',
    closeOnSelect = true,
    inline = false,
    triggerInteraction = 'click',
    triggerOpenDelay = 75,
    triggerCloseDelay = 100,
    subMenuInteraction = 'hover',
    density = 'compact',
    panel,
    query = '',
    filterMode = 'none',
    renderNoResults,
    highlightMatches = Boolean(query),
    getItemText = defaultGetItemText,
    onMenubarEdgeNavigate,
    ...rest
  } = props;

  const [className, otherProps] = splitProps(rest);
  const userStyle = otherProps.style as CSSProperties | undefined;
  const hasReference = Boolean(trigger) && !inline;
  // Only a floating dropdown is capped to the viewport; inline menus and
  // panels size to their container.
  const classes = menu({
    density,
    panel,
    layer: floatingLayer,
    scrollable: hasReference && !panel,
  });
  const listClassName = list({ density });

  const [uncontrolledOpen, setUncontrolledOpen] = useState(
    defaultOpen ?? false,
  );
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;
  const isMenuVisible = hasReference ? isOpen : true;

  const setOpenState = (nextOpen: boolean, _event?: Event, reason?: string) => {
    if (!nextOpen && (reason === 'hover' || reason === 'safe-polygon')) {
      if (
        triggerInteraction === 'hover' ||
        triggerInteraction === 'click-and-hover'
      ) {
        return;
      }
    }

    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const diginFocusIntentRef = useRef<DiginFocusIntent | null>(null);
  const [diginLevels, setDiginLevels] = useState<DiginLevel[]>([]);
  const [wrapperSize, setWrapperSize] = useState<{
    width: number | null;
    height: number | null;
  }>({
    width: null,
    height: null,
  });
  const diginDepth = diginLevels.length;

  useEffect(() => {
    if (!isOpen) {
      setDiginLevels([]);
    }
  }, [isOpen]);

  const floating = useOverlayFloating({
    nodeId,
    open: hasReference ? isOpen : true,
    onOpenChange: setOpenState,
    placement,
    strategy,
    middleware: createOverlayMiddleware({
      extras: [availableHeightMiddleware()],
    }),
  });

  const listRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const blockPointerEventsForHoverPolygon =
    useBlockPointerEventsForHoverPolygon();

  const hover = useHover(floating.context, {
    enabled:
      hasReference &&
      (triggerInteraction === 'hover' ||
        triggerInteraction === 'click-and-hover'),
    delay: {
      open: triggerOpenDelay,
      close: triggerCloseDelay,
    },
    handleClose: safePolygon({
      blockPointerEvents: blockPointerEventsForHoverPolygon,
    }),
  });
  const click = useClick(floating.context, {
    enabled:
      hasReference &&
      (triggerInteraction === 'click' ||
        triggerInteraction === 'focus' ||
        triggerInteraction === 'click-and-hover'),
    toggle: triggerInteraction !== 'focus',
  });
  const focus = useFocus(floating.context, {
    enabled: hasReference && triggerInteraction === 'focus',
  });
  // While drilled in, Escape steps back one level (handled below) and only
  // closes the menu from the root level.
  const dismiss = useDismiss(floating.context, {
    enabled: hasReference,
    escapeKey: diginDepth === 0,
  });
  const role = useRole(floating.context, { role: 'menu' });
  const listNavigation = useListNavigation(floating.context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });
  const typeahead = useTypeahead(floating.context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: setActiveIndex,
    resetMs: 600,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [hover, click, focus, dismiss, role, listNavigation, typeahead],
  );

  const filterContextValue = useMemo(
    () => ({
      query,
      filterMode,
      highlightMatches,
      getItemText,
    }),
    [filterMode, getItemText, highlightMatches, query],
  );

  // Resolve each drilled-in level from the current children so state changes
  // (controlled inputs, filtering) reach it; fall back to the pushed snapshot.
  const liveDiginLevels = diginLevels.map((level) => ({
    ...level,
    children:
      (level.path && findSubMenuChildren(children, level.path)) ??
      level.children,
  }));

  const activeLevelChildren =
    liveDiginLevels[liveDiginLevels.length - 1]?.children ?? children;

  const hasVisibleResults = hasMatchingItems(
    activeLevelChildren,
    filterContextValue,
  );

  const rootContextValue: MenuRootContextValue = {
    density,
    panel,
    closeOnSelect,
    subMenuInteraction,
    inline,
    rendersInline: inline || !trigger,
    onCloseMenu: () => {
      setOpenState(false);
      setDiginLevels([]);
    },
    onPushDiginLevel: (title, levelChildren) => {
      const returnIndex = activeIndex;
      diginFocusIntentRef.current = 'first';
      setDiginLevels((prev) => {
        const activeLevel = prev[prev.length - 1];

        if (
          activeLevel &&
          activeLevel.title === title &&
          activeLevel.children === levelChildren
        ) {
          return prev;
        }

        return [
          ...prev,
          {
            key: `${title}-${prev.length}`,
            title,
            children: levelChildren,
            returnIndex,
            path: findSubMenuKeyPath(children, levelChildren),
          },
        ];
      });
    },
    onPopDiginLevel: () => {
      const poppedLevel = diginLevels[diginLevels.length - 1];
      if (!poppedLevel) {
        return;
      }
      diginFocusIntentRef.current = { index: poppedLevel.returnIndex };
      setDiginLevels((prev) => prev.slice(0, -1));
    },
    diginDepth,
    onMenubarEdgeNavigate,
  };

  // Pushing or popping a level swaps the rendered list, which unmounts the row
  // that had focus. Reset the roving index and move focus into the new level so
  // the keyboard keeps working (push: first row, pop: the row that opened it).
  // biome-ignore lint/correctness/useExhaustiveDependencies: re-runs when the drill-in depth changes, to move focus into the new level
  useEffect(() => {
    const intent = diginFocusIntentRef.current;
    if (!intent) {
      return;
    }
    diginFocusIntentRef.current = null;
    setActiveIndex(null);

    let timer: ReturnType<typeof setTimeout> | undefined;
    const focusLevel = (attemptsLeft: number) => {
      const levelElement = activeLevelRef.current;
      const index =
        intent === 'first' ? findFirstEnabledListIndex(listRef) : intent.index;
      const item = index === null ? null : listRef.current[index];

      if (
        item &&
        item.isConnected &&
        levelElement?.contains(item) &&
        !item.hasAttribute('disabled')
      ) {
        item.focus({ preventScroll: true });
        // The level remounts at scrollTop 0. Floating UI skips its own scroll
        // after pointer navigation (e.g. clicking Back), so scroll explicitly;
        // the level's scroll-padding keeps the row clear of the sticky header.
        item.scrollIntoView?.({ block: 'nearest' });
        setActiveIndex(index);
        return;
      }

      if (attemptsLeft > 0) {
        timer = setTimeout(() => focusLevel(attemptsLeft - 1), 16);
        return;
      }

      // Levels without list rows (e.g. forms): focus the first control, else
      // the back header, so focus never falls to <body>.
      const focusables = Array.from(
        levelElement?.querySelectorAll<HTMLElement>(focusableInLevelSelector) ??
          [],
      );
      const fallback =
        focusables.find((element) => !element.matches('[data-menu-back]')) ??
        focusables[0];
      fallback?.focus({ preventScroll: true });
    };

    timer = setTimeout(() => focusLevel(3), 0);

    return () => {
      clearTimeout(timer);
    };
  }, [diginDepth]);

  // Floating UI moves focus with a single shared animation-frame handle, so
  // competing focus requests on keyboard open (list navigation and the focus
  // manager) can cancel each other and leave the active row highlighted while
  // focus stays on the trigger. Finish the job here so the arrow keys keep
  // working. Menubar and focus-triggered menus intentionally keep focus on the
  // trigger.
  const keepsFocusOnTrigger =
    Boolean(onMenubarEdgeNavigate) || triggerInteraction === 'focus';
  useEffect(() => {
    if (
      !hasReference ||
      !isOpen ||
      activeIndex === null ||
      keepsFocusOnTrigger
    ) {
      return;
    }

    const timer = setTimeout(() => {
      const referenceElement = floating.elements.domReference;
      const floatingElement = floating.elements.floating;
      const activeElement = document.activeElement;
      const focusIsStranded =
        Boolean(referenceElement) &&
        (activeElement === referenceElement || activeElement === document.body);
      const item = listRef.current[activeIndex];

      if (
        focusIsStranded &&
        item?.isConnected &&
        floatingElement?.contains(item)
      ) {
        item.focus({ preventScroll: true });
      }
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [
    activeIndex,
    floating.elements.domReference,
    floating.elements.floating,
    hasReference,
    isOpen,
    keepsFocusOnTrigger,
  ]);

  // Track IME composition so Escape that cancels a candidate is not treated as
  // "go back" (mirrors Floating UI's useDismiss, which escapeKey:false bypasses).
  const isComposingRef = useRef(false);
  useEffect(() => {
    let compositionTimeout: ReturnType<typeof setTimeout> | undefined;
    const handleCompositionStart = () => {
      clearTimeout(compositionTimeout);
      isComposingRef.current = true;
    };
    const handleCompositionEnd = () => {
      // Safari fires compositionend before the keydown that ended it, so wait
      // a few ms before clearing the flag.
      compositionTimeout = setTimeout(() => {
        isComposingRef.current = false;
      }, 5);
    };

    document.addEventListener('compositionstart', handleCompositionStart);
    document.addEventListener('compositionend', handleCompositionEnd);
    return () => {
      clearTimeout(compositionTimeout);
      document.removeEventListener('compositionstart', handleCompositionStart);
      document.removeEventListener('compositionend', handleCompositionEnd);
    };
  }, []);

  // Escape steps back one drill-in level instead of closing the whole menu.
  useEffect(() => {
    if (diginDepth === 0) {
      return;
    }

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (
        event.key !== 'Escape' ||
        event.defaultPrevented ||
        event.isComposing ||
        isComposingRef.current
      ) {
        return;
      }
      const activeElement = document.activeElement;
      const referenceElement = floating.elements.domReference;
      const floatingElement = floating.elements.floating;
      const focusIsInMenu =
        (hasReference && activeElement === document.body) ||
        Boolean(floatingElement?.contains(activeElement)) ||
        Boolean(referenceElement?.contains(activeElement));
      if (!focusIsInMenu) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      rootContextValue.onPopDiginLevel();
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  });

  // Floating UI's typeahead and list navigation call preventDefault on typed
  // characters and arrow/Home/End keys while the menu is open, which would
  // swallow typing in inputs rendered inside a level. Keep those keys local to
  // the input (Escape and Tab still reach dismiss and focus handling).
  const handleLevelsKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (
      event.key !== 'Escape' &&
      event.key !== 'Tab' &&
      isTextEntryTarget(event.target)
    ) {
      event.stopPropagation();
    }
  };

  const handleDiginKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (
      diginDepth > 0 &&
      event.key === 'ArrowLeft' &&
      !event.defaultPrevented
    ) {
      event.preventDefault();
      event.stopPropagation();
      rootContextValue.onPopDiginLevel();
    }
  };

  const navigateMainAxis = useCallback((direction: 1 | -1) => {
    setActiveIndex((prev) =>
      navigateListMainAxisLoop(listRef, direction, prev),
    );
  }, []);

  // Roving tab stop: before any row is active (nothing hovered or arrowed to
  // yet) the first enabled row stays tabbable so keyboard users can enter.
  const [firstEnabledIndex, setFirstEnabledIndex] = useState<number | null>(
    null,
  );
  // Runs every render on purpose: rows register in a follow-up render of the
  // list, so read the list in a microtask. The same-value bail-out prevents an
  // update loop.
  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) {
        return;
      }
      const next = findFirstEnabledListIndex(listRef);
      setFirstEnabledIndex((previous) => (previous === next ? previous : next));
    });
    return () => {
      cancelled = true;
    };
  });

  const menuListContextValue = {
    activeIndex,
    tabbableIndex: activeIndex ?? firstEnabledIndex,
    getItemProps: (userProps?: HTMLProps<HTMLElement>) =>
      getItemProps(userProps) as HTMLProps<HTMLElement>,
    navigateMainAxis,
    nestedMenuDepth: 0,
  };

  const levels = [{ key: 'root', title: 'Menu', children }, ...liveDiginLevels];
  const activeLevel = levels[Math.min(diginDepth, levels.length - 1)]!;
  const levelCount = levels.length;
  const trackWidthPercent = levelCount * 100;
  const levelWidthPercent = 100 / levelCount;
  const trackTranslatePercent = (diginDepth * 100) / levelCount;
  const shouldUsePanelDiginProbeFill =
    Boolean(panel) && subMenuInteraction === 'digin';
  const shouldUseDiginSizing =
    subMenuInteraction === 'digin' && hasVisibleResults;

  const sizeProbeRef = useRef<HTMLDivElement | null>(null);
  const activeLevelRef = useRef<HTMLDivElement | null>(null);
  const activeBackHeaderRef = useRef<HTMLButtonElement | null>(null);

  // The back header is sticky inside the scrolling level, so keyboard focus
  // scrolling must reserve its height or items land underneath it. A filter
  // with no matches unmounts the level, so re-measure when it comes back.
  // biome-ignore lint/correctness/useExhaustiveDependencies: re-measures the sticky header when the level, density, or result set changes
  useLayoutEffect(() => {
    const levelEl = activeLevelRef.current;
    const headerEl = activeBackHeaderRef.current;
    if (!levelEl) return;
    if (!headerEl) {
      levelEl.style.removeProperty('--menu-back-header-height');
      return;
    }
    const update = () =>
      levelEl.style.setProperty(
        '--menu-back-header-height',
        `${headerEl.offsetHeight}px`,
      );
    update();
    const observer = new ResizeObserver(update);
    observer.observe(headerEl);
    return () => observer.disconnect();
  }, [diginDepth, density, hasVisibleResults]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-measures the wrapper when the active level or its content changes
  useLayoutEffect(() => {
    if (!isMenuVisible || !shouldUseDiginSizing) {
      setWrapperSize({ width: null, height: null });
      return;
    }

    const sizeProbe = sizeProbeRef.current;
    if (!sizeProbe) {
      return;
    }

    const updateWrapperSize = () => {
      // `scrollWidth`/`scrollHeight` are rounded integers, so a 123.33px level
      // would measure 123 and wrap. Read the fractional size, then round up.
      const rect = sizeProbe.getBoundingClientRect();
      // The probe is never height-capped, so it never scrolls. The visible
      // level does, and a classic (non-overlay) scrollbar takes its width out
      // of the content box, so labels sized to the probe would wrap. Add the
      // visible level's scrollbar width. A panel's probe fills the wrapper, so
      // adding to it there would grow the wrapper on every measure.
      const activeLevelEl = activeLevelRef.current;
      const scrollbarWidth =
        activeLevelEl && !shouldUsePanelDiginProbeFill
          ? activeLevelEl.offsetWidth - activeLevelEl.clientWidth
          : 0;
      const nextWidth = Math.ceil(rect.width) + scrollbarWidth;
      const nextHeight = Math.ceil(rect.height);

      setWrapperSize((previous) => {
        if (previous.width === nextWidth && previous.height === nextHeight) {
          return previous;
        }

        return {
          width: nextWidth,
          height: nextHeight,
        };
      });
    };

    updateWrapperSize();

    const resizeObserver = new ResizeObserver(updateWrapperSize);
    resizeObserver.observe(sizeProbe);
    // The level's scrollbar appears only once the wrapper height caps it, and
    // that shrinks the level's content box, so re-measure when it does.
    if (activeLevelRef.current) {
      resizeObserver.observe(activeLevelRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    activeLevel.children,
    activeLevel.key,
    activeLevel.title,
    density,
    diginDepth,
    hasVisibleResults,
    isMenuVisible,
    shouldUseDiginSizing,
    shouldUsePanelDiginProbeFill,
  ]);

  // The probe is a hidden measuring copy of the active level. Duplicate ids
  // would hijack `<label for>` / `aria-labelledby` from the real controls, so
  // drop them from the copy after every render.
  useLayoutEffect(() => {
    sizeProbeRef.current
      ?.querySelectorAll('[id]')
      .forEach((element) => element.removeAttribute('id'));
  });

  const diginWrapperStyle: CSSProperties =
    shouldUseDiginSizing && wrapperSize.width && wrapperSize.height
      ? {
          width: `${wrapperSize.width}px`,
          height: `${wrapperSize.height}px`,
        }
      : {};

  const floatingStyle = {
    ...(hasReference && !inline ? floating.floatingStyles : {}),
    ...diginWrapperStyle,
    ...(userStyle ?? {}),
  };
  const diginSizeProbeStyle: CSSProperties = shouldUsePanelDiginProbeFill
    ? { inset: '0', width: '100%', height: '100%' }
    : {};

  const content = (
    <MenuRootProvider value={rootContextValue}>
      <MenuFilterProvider value={filterContextValue}>
        <Box
          {...dsComponent('Menu')}
          ref={floating.refs.setFloating}
          className={cx(classes.wrapper, className)}
          {...getFloatingProps({ onKeyDown: handleDiginKeyDown })}
          {...otherProps}
          style={floatingStyle}
        >
          {!hasVisibleResults && (
            <Box className={classes.noResults}>
              {renderNoResults ?? (
                <Text textStyle="body.sm">{labels.noResults}</Text>
              )}
            </Box>
          )}

          {hasVisibleResults && (
            <Box
              className={classes.levelsViewport}
              onKeyDown={handleLevelsKeyDown}
            >
              {shouldUseDiginSizing && (
                <Box
                  ref={sizeProbeRef}
                  className={classes.sizeProbe}
                  aria-hidden
                  inert
                  style={diginSizeProbeStyle}
                >
                  <Box className={classes.level}>
                    {diginDepth > 0 && (
                      <Box
                        as="button"
                        type="button"
                        className={classes.backHeader}
                      >
                        <Icon name="caret-left" fill="icon" />
                        {activeLevel.title}
                      </Box>
                    )}
                    <Box className={listClassName}>
                      {withLevelScopedKeys(
                        activeLevel.children,
                        `${activeLevel.key}-probe`,
                      )}
                    </Box>
                  </Box>
                </Box>
              )}

              <Box
                className={classes.levelsTrack}
                style={{
                  width: `${trackWidthPercent}%`,
                  transform: `translateX(-${trackTranslatePercent}%)`,
                }}
              >
                {levels.map((level, index) => {
                  const isActiveLevel = index === diginDepth;
                  const levelChildren = withLevelScopedKeys(
                    level.children,
                    level.key,
                  );

                  if (!isActiveLevel) {
                    return (
                      <Box
                        key={level.key}
                        className={classes.level}
                        style={{
                          flex: `0 0 ${levelWidthPercent}%`,
                        }}
                        aria-hidden
                        inert
                      >
                        {index > 0 && (
                          <Box
                            as="button"
                            type="button"
                            className={classes.backHeader}
                            onClick={rootContextValue.onPopDiginLevel}
                          >
                            <Icon name="caret-left" />
                            {level.title}
                          </Box>
                        )}
                        <Box className={listClassName}>{levelChildren}</Box>
                      </Box>
                    );
                  }

                  return (
                    <MenuListProvider
                      key={level.key}
                      value={menuListContextValue}
                    >
                      <FloatingList elementsRef={listRef} labelsRef={labelsRef}>
                        <Box
                          ref={activeLevelRef}
                          className={classes.level}
                          style={{
                            flex: `0 0 ${levelWidthPercent}%`,
                          }}
                        >
                          {index > 0 && (
                            <Box
                              as="button"
                              type="button"
                              ref={activeBackHeaderRef}
                              data-menu-back=""
                              className={classes.backHeader}
                              onClick={rootContextValue.onPopDiginLevel}
                            >
                              <Icon name="caret-left" />
                              {level.title}
                            </Box>
                          )}
                          <Box className={listClassName}>{levelChildren}</Box>
                        </Box>
                      </FloatingList>
                    </MenuListProvider>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      </MenuFilterProvider>
    </MenuRootProvider>
  );

  const shouldRenderInline = inline || !trigger;

  const triggerRefProp = isValidElement(trigger)
    ? (trigger.props as { ref?: Ref<Element | null> }).ref
    : undefined;

  const mergedTriggerRef = useMergeRefs([
    triggerRefProp,
    floating.refs.setReference,
  ]);

  if (shouldRenderInline) {
    return (
      <FloatingTree>
        <FloatingNode id={nodeId}>{content}</FloatingNode>
      </FloatingTree>
    );
  }

  const triggerExtract =
    isValidElement(trigger) && trigger.props
      ? (() => {
          const {
            ref: _r,
            children: _ch,
            onKeyDown: triggerOnKeyDownProp,
            ...rest
          } = trigger.props as Record<string, unknown> & {
            ref?: unknown;
            children?: unknown;
            onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
          };
          return {
            rest,
            onKeyDown: triggerOnKeyDownProp,
          };
        })()
      : {
          rest: {} as Record<string, unknown>,
          onKeyDown: undefined as
            | ((event: KeyboardEvent<HTMLElement>) => void)
            | undefined,
        };

  const triggerPropsForReference = triggerExtract.rest;
  const triggerOnKeyDown = triggerExtract.onKeyDown;

  const referencePropsFromFloating = getReferenceProps({
    ...triggerPropsForReference,
    ref: mergedTriggerRef,
  });

  const composedTriggerOnKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (isOpen && triggerInteraction === 'focus' && event.key === 'Tab') {
      const target = event.target;
      const referenceElement = floating.elements.domReference;

      if (target instanceof HTMLElement && referenceElement) {
        const nextElement = getNextTabbableOutsideFloating({
          target,
          floatingElement: floating.elements.floating,
          direction: event.shiftKey ? -1 : 1,
        });

        if (nextElement && !referenceElement.contains(nextElement)) {
          event.preventDefault();
          setOpenState(false);
          nextElement.focus();
          return;
        }

        if (!nextElement) {
          event.preventDefault();
          setOpenState(false);
          target.blur();
          return;
        }
      }
    }

    // When the menu is open, Floating UI's reference key handler often runs
    // before the consumer's onKeyDown, so menubar Left/Right (on the trigger)
    // never fires. Run the trigger handler first for horizontal navigation.
    if (
      isOpen &&
      (event.key === 'ArrowLeft' || event.key === 'ArrowRight') &&
      typeof triggerOnKeyDown === 'function'
    ) {
      triggerOnKeyDown(event);
      return;
    }
    const refOnKeyDown = referencePropsFromFloating.onKeyDown;
    if (typeof refOnKeyDown === 'function') {
      refOnKeyDown(event);
    }
    if (typeof triggerOnKeyDown === 'function') {
      triggerOnKeyDown(event);
    }
  };

  return (
    <FloatingTree>
      <FloatingNode id={nodeId}>
        {cloneElement(
          trigger as ReactElement<HTMLAttributes<HTMLElement>>,
          {
            ...referencePropsFromFloating,
            onKeyDown: composedTriggerOnKeyDown,
          } as HTMLAttributes<HTMLElement>,
        )}
        {isOpen && (
          <FloatingPortal>
            <DsChainPortalRoot reference={floating.elements.domReference}>
              <FloatingFocusManager
                context={floating.context}
                modal={false}
                // Menubar composition: keep focus on the section trigger until the
                // user arrows into the panel, so Left/Right can move between
                // top-level menubar items while the dropdown is open (APG pattern).
                // Default initialFocus=0 would move focus to the first menu row and
                // swallow menubar navigation until a child is focused.
                order={
                  onMenubarEdgeNavigate ? ['reference', 'content'] : undefined
                }
                initialFocus={triggerInteraction === 'focus' ? -1 : undefined}
                returnFocus={triggerInteraction === 'focus' ? false : undefined}
              >
                {content}
              </FloatingFocusManager>
            </DsChainPortalRoot>
          </FloatingPortal>
        )}
      </FloatingNode>
    </FloatingTree>
  );
};
