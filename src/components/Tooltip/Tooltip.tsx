// src/components/Tooltip/Tooltip.tsx

import {
  arrow,
  FloatingArrow,
  FloatingPortal,
  type Placement,
  useDismiss,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react';
import { cx } from '@styled-system/css';
import { type TooltipVariantProps, tooltip } from '@styled-system/recipes';
import { token } from '@styled-system/tokens';
import type { ReactElement, ReactNode, Ref } from 'react';
import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  createOverlayMiddleware,
  useOverlayFloating,
} from '~/system/floating-ui/floating';
import { dsComponent } from '~/utils/dsComponent';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';
import { DsChainPortalRoot } from '../DsChainScope/DsChainPortalRoot';

/** Props for {@link Tooltip}, nonessential contextual text shown on hover or focus. */
export type TooltipProps = Omit<
  BoxProps,
  keyof TooltipVariantProps | 'children'
> &
  TooltipVariantProps & {
    /** Text displayed in the tooltip body. Use an accessible label instead when this is essential control information. */
    text: string;
    /** Optional title displayed above the tooltip body. */
    title?: string;
    /**
     * Shows the arrow pointing at the trigger.
     * @default true
     */
    caret?: boolean;
    /**
     * Preferred placement relative to the trigger. The overlay can flip when it does not fit.
     * @default 'bottom'
     */
    placement?: Placement;
    /**
     * Gap between trigger and tooltip, in pixels.
     * @default 8
     */
    offset?: number;
    /**
     * Turns the tooltip off while keeping the trigger wrapper in the tree, so toggling it does not remount `children`.
     * @default false
     */
    disabled?: boolean;
    /** Hover open/close delay in milliseconds, or separate `open` and `close` delays. */
    delay?: number | { open: number; close: number };
    /**
     * Puts the trigger props on `children` instead of a wrapper span, so the
     * tooltip adds nothing to layout. `children` must be one element that
     * takes a `ref`. An `aria-describedby` on the child is kept, and the
     * tooltip's ID is added to it while the tooltip is open.
     * @default false
     */
    asChild?: boolean;
    /**
     * Links the open tooltip to the trigger with `aria-describedby`. Set it to
     * `false` only when the trigger already has the same text as its
     * description, so screen readers do not read it twice.
     * @default true
     */
    describeTrigger?: boolean;
    /** Trigger content, wrapped in an inline-flex span to receive floating interaction props unless `asChild` is set. */
    children?: ReactNode;
    /**
     * Tooltip recipe size.
     * @default 'md'
     */
    size?: TooltipVariantProps['size'];
  };

/**
 * Shows nonessential contextual text for a trigger on hover and keyboard focus.
 *
 * The trigger is wrapped in a span, or takes the props itself with `asChild`,
 * and is linked with `aria-describedby`; Escape dismisses the portalled
 * tooltip. Do not use a tooltip as the only accessible
 * name or instruction for an interactive control. Set `disabled` to suppress
 * the tooltip without changing the rendered structure.
 *
 * @example
 * ```tsx
 * <Tooltip text="Copies the link"><IconButton iconName="copy" altText="Copy link" /></Tooltip>
 * ```
 */
export const Tooltip = (props: TooltipProps) => {
  const {
    caret = true,
    size = 'md',
    text,
    title,
    children,
    placement = 'bottom',
    offset = 8,
    delay,
    disabled = false,
    asChild = false,
    describeTrigger = true,
    ...rest
  } = props;

  const [className, otherProps] = splitProps(rest);
  const [isOpen, setIsOpen] = useState(false);
  // Drop any open state when disabled so re-enabling doesn't reopen a stale tooltip.
  if (disabled && isOpen) setIsOpen(false);
  const arrowRef = useRef<SVGSVGElement>(null);

  const { refs, elements, floatingStyles, context } = useOverlayFloating({
    open: isOpen && !disabled,
    onOpenChange: setIsOpen,
    placement,
    middleware: createOverlayMiddleware({
      offset,
      extras: [arrow({ element: arrowRef })],
    }),
  });

  // A trigger that already has focus when the tooltip is enabled gets no new
  // focus event, so open the tooltip here.
  const wasDisabled = useRef(disabled);
  useEffect(() => {
    const trigger = elements.domReference;
    if (
      wasDisabled.current &&
      !disabled &&
      trigger?.contains(document.activeElement)
    ) {
      setIsOpen(true);
    }
    wasDisabled.current = disabled;
  }, [disabled, elements.domReference]);

  const hover = useHover(context, { move: false, delay, enabled: !disabled });
  const focus = useFocus(context, { enabled: !disabled });
  const dismiss = useDismiss(context, { enabled: !disabled });
  // useRole sets role="tooltip" on the floating element and
  // aria-describedby on the reference — no manual useId needed
  const role = useRole(context, { role: 'tooltip', enabled: !disabled });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const classes = tooltip({ size, hasTitle: !!title });

  const child =
    asChild && isValidElement<Record<string, unknown>>(children)
      ? children
      : null;
  const childRef = (child?.props.ref ?? null) as Ref<Element> | null;
  const childReferenceRef = useMergeRefs([refs.setReference, childRef]);

  let trigger: ReactNode;
  if (child) {
    // Floating UI lets the child's props win, so take the child's description
    // out first and join it with the tooltip's.
    const { 'aria-describedby': childDescribedBy, ...childProps } = child.props;
    const referenceProps = getReferenceProps(childProps);
    trigger = cloneElement(child as ReactElement<Record<string, unknown>>, {
      ...referenceProps,
      'aria-describedby':
        [
          childDescribedBy,
          describeTrigger ? referenceProps['aria-describedby'] : undefined,
        ]
          .filter(Boolean)
          .join(' ') || undefined,
      ref: childReferenceRef,
    });
  } else {
    trigger = (
      <Box
        as="span"
        ref={refs.setReference}
        display="inline-flex"
        alignItems="center"
        lineHeight="none"
        width="fit"
        {...getReferenceProps()}
        {...(!describeTrigger && { 'aria-describedby': undefined })}
      >
        {children}
      </Box>
    );
  }

  return (
    <>
      {trigger}

      {isOpen && !disabled && (
        <FloatingPortal>
          <DsChainPortalRoot reference={elements.domReference}>
            <Box
              {...dsComponent('Tooltip')}
              ref={refs.setFloating}
              style={floatingStyles}
              className={cx(classes.tooltipContent, className)}
              {...(getFloatingProps() as Record<string, unknown>)}
              {...otherProps}
            >
              {title && <Box className={classes.title}>{title}</Box>}
              {text && <Box className={classes.text}>{text}</Box>}
              {caret && (
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  fill={token.var('colors.bg.neutral.inverse')}
                />
              )}
            </Box>
          </DsChainPortalRoot>
        </FloatingPortal>
      )}
    </>
  );
};
