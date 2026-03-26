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
  useRole,
} from '@floating-ui/react';
import { cx } from '@styled-system/css';
import { type TooltipVariantProps, tooltip } from '@styled-system/recipes';
import { token } from '@styled-system/tokens';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';

import {
  createOverlayMiddleware,
  useOverlayFloating,
} from '~/system/floating-ui/floating';
import { splitProps } from '~/utils/splitProps';

import { Box, type BoxProps } from '../Box';
import { Text } from '../Text';

export type TooltipProps = Omit<
  BoxProps,
  keyof TooltipVariantProps | 'children'
> &
  TooltipVariantProps & {
    /** Tooltip body text (required) */
    text: string;
    /** Optional bold title rendered above the text */
    title?: string;
    /** Show/hide the arrow caret. Default: true */
    caret?: boolean;
    /** Floating UI placement. Automatically flips if it doesn't fit. Default: 'bottom' */
    placement?: Placement;
    /** Distance in px between trigger and tooltip. Default: 8 */
    offset?: number;
    /** Hover open/close delay in ms, or { open, close } for separate delays */
    delay?: number | { open: number; close: number };
    /** Trigger element. Wrapped in a <span> to attach the floating ref. */
    children?: ReactNode;
  };

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
    ...rest
  } = props;

  const [className, otherProps] = splitProps(rest);
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef<SVGSVGElement>(null);

  const { refs, floatingStyles, context } = useOverlayFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: createOverlayMiddleware({
      offset,
      extras: [arrow({ element: arrowRef })],
    }),
  });

  const hover = useHover(context, { move: false, delay });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  // useRole sets role="tooltip" on the floating element and
  // aria-describedby on the reference — no manual useId needed
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const classes = tooltip({ size, hasTitle: !!title });

  return (
    <>
      <Box
        as="span"
        ref={refs.setReference}
        display="inline-flex"
        alignItems="center"
        lineHeight="none"
        {...getReferenceProps()}
      >
        {children}
      </Box>

      {isOpen && (
        <FloatingPortal>
          <Box
            ref={refs.setFloating}
            style={floatingStyles}
            className={cx(classes.tooltipContent, className)}
            {...(getFloatingProps() as Record<string, unknown>)}
            {...otherProps}
          >
            {title && <Text className={classes.title}>{title}</Text>}
            {text && <Text className={classes.text}>{text}</Text>}
            {caret && (
              <FloatingArrow
                ref={arrowRef}
                context={context}
                fill={token.var('colors.bg.neutral.inverse')}
              />
            )}
          </Box>
        </FloatingPortal>
      )}
    </>
  );
};
