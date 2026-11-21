import {
  arrow,
  type Placement,
  safePolygon,
  useClick,
  useDismiss,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  createOverlayMiddleware,
  useOverlayFloating,
} from '~/system/floating-ui/floating';

import {
  PopoverContext,
  type PopoverContextValue,
  type PopoverInteraction,
  type PopoverSize,
  type PopoverTone,
} from './PopoverContext';

/** Props for {@link Popover}, the compound root for multipurpose floating notes. */
export type PopoverProps = {
  /** Compound parts such as Trigger and Content. */
  children: ReactNode;
  /**
   * How the popover opens and manages focus.
   * - `definition`: hover + focus, no focus trap (handbook definitions).
   *   Keyboard users cannot move focus into the content, so it must be
   *   non-interactive: no links, buttons, or `PopoverClose`.
   * - `rich`: click open, focus trap + restore focus (interactive content)
   * @default 'rich'
   */
  interaction?: PopoverInteraction;
  /** Controlled open state. */
  open?: boolean;
  /**
   * Initial open state when uncontrolled.
   * @default false
   */
  defaultOpen?: boolean;
  /** Called when open state should change. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Preferred placement relative to the reference. The overlay can flip when it does not fit.
   * @default 'bottom'
   */
  placement?: Placement;
  /**
   * Gap between reference and content, in pixels.
   * @default 8
   */
  offset?: number;
  /**
   * Shows the arrow pointing at the reference.
   * @default true
   */
  showArrow?: boolean;
  /**
   * Content panel size. Wider than Tooltip (`240`).
   * @default 'md'
   */
  size?: PopoverSize;
  /**
   * Visual tone for handbook-style notes. Affects surface and border only —
   * never maps to `role="alert"`.
   */
  tone?: PopoverTone;
};

/**
 * Anchors multipurpose floating content for handbook notes, definitions, and
 * rich callouts.
 *
 * Compose with `PopoverTrigger`, optional `PopoverAnchor`, and
 * `PopoverContent` (plus Header/Title/Description/Body/Media/Footer/Close).
 * Use `interaction="definition"` for hover/focus plain notes without a focus
 * trap (content must be non-interactive), and `interaction="rich"` for
 * click-to-open interactive content with focus trapping.
 *
 * @example
 * ```tsx
 * <Popover interaction="definition" tone="warning">
 *   <PopoverTrigger>cycle time</PopoverTrigger>
 *   <PopoverContent>
 *     <PopoverHeader>
 *       <PopoverTitle>Warning</PopoverTitle>
 *     </PopoverHeader>
 *     <PopoverBody>
 *       Cycle time includes queue and wait, not only active work.
 *     </PopoverBody>
 *   </PopoverContent>
 * </Popover>
 * ```
 */
export const Popover = (props: PopoverProps) => {
  const {
    children,
    interaction = 'rich',
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    placement = 'bottom',
    offset = 8,
    showArrow = true,
    size = 'md',
    tone,
  } = props;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : uncontrolledOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const arrowRef = useRef<SVGSVGElement | null>(null);
  const [titleId, setTitleId] = useState<string | undefined>();
  const [descriptionId, setDescriptionId] = useState<string | undefined>();
  const [hasAnchor, setHasAnchor] = useState(false);

  const isDefinition = interaction === 'definition';

  const { refs, elements, floatingStyles, context } = useOverlayFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: createOverlayMiddleware({
      offset,
      flipOptions: { fallbackAxisSideDirection: 'end' },
      extras: [arrow({ element: arrowRef })],
    }),
  });

  const hover = useHover(context, {
    enabled: isDefinition,
    move: false,
    delay: { open: 200, close: 150 },
    handleClose: safePolygon({ requireIntent: false }),
  });
  const focus = useFocus(context, { enabled: isDefinition });
  const click = useClick(context, { enabled: !isDefinition });
  const dismiss = useDismiss(context);
  const role = useRole(context, {
    role: isDefinition ? 'tooltip' : 'dialog',
  });

  // Unmounting an Anchor clears the position reference; hand positioning back
  // to the trigger so the content keeps tracking it.
  const { domReference } = elements;
  const { setReference } = refs;
  useEffect(() => {
    if (!hasAnchor && domReference) {
      setReference(domReference);
    }
  }, [hasAnchor, domReference, setReference]);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    click,
    dismiss,
    role,
  ]);

  const setReferenceRef = useCallback(
    (node: Element | null) => {
      refs.setReference(node);
    },
    [refs],
  );

  const setFloatingRef = useCallback(
    (node: HTMLElement | null) => {
      refs.setFloating(node);
    },
    [refs],
  );

  const contextValue = useMemo<PopoverContextValue>(
    () => ({
      open,
      setOpen,
      interaction,
      placement,
      offset,
      showArrow,
      size,
      tone,
      floatingContext: context,
      refs: {
        setReference: refs.setReference,
        setFloating: refs.setFloating,
        setPositionReference: refs.setPositionReference,
      },
      floatingStyles,
      domReference: elements.domReference,
      getReferenceProps: (userProps) =>
        getReferenceProps(userProps) as Record<string, unknown>,
      getFloatingProps: (userProps) =>
        getFloatingProps(userProps) as Record<string, unknown>,
      arrowRef,
      titleId,
      setTitleId,
      descriptionId,
      setDescriptionId,
      hasAnchor,
      setHasAnchor,
      setReferenceRef,
      setFloatingRef,
    }),
    [
      open,
      setOpen,
      interaction,
      placement,
      offset,
      showArrow,
      size,
      tone,
      context,
      refs.setReference,
      refs.setFloating,
      refs.setPositionReference,
      floatingStyles,
      elements.domReference,
      getReferenceProps,
      getFloatingProps,
      titleId,
      descriptionId,
      hasAnchor,
      setReferenceRef,
      setFloatingRef,
    ],
  );

  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  );
};
