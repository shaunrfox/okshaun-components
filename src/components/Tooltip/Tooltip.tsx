import { cx } from '@styled-system/css';
import { type TooltipVariantProps, tooltip } from '@styled-system/recipes';
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { splitProps } from '~/utils/splitProps';
import { Box, type BoxProps } from '../Box';
import { Text } from '../Text';

export type Position =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'bottom-start'
  | 'left-start'
  | 'right-start'
  | 'top-end'
  | 'bottom-end'
  | 'left-end'
  | 'right-end';

export type TooltipProps = Omit<BoxProps, keyof TooltipVariantProps> &
  TooltipVariantProps & {
    text: string;
    title?: string;
    caret?: boolean;
    position?: Position;
    children?: ReactNode;
    trigger?: 'onHover' | 'onClick';
  };

export const Tooltip = (props: TooltipProps) => {
  const {
    trigger = 'onHover',
    caret = true,
    size = 'md',
    text,
    title,
    children,
    position = 'bottom',
    ...rest
  } = props;
  const [className, otherProps] = splitProps(rest);
  const [currentPlacement, setCurrentPlacement] = useState(position);

  const [show, setShow] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const resolvedPlacement = typeof position === 'string' ? position : 'bottom';

  const clockWisePlacement = useMemo(
    () => [
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'top',
      'top-start',
      'top-end',
      'right',
      'right-start',
      'right-end',
    ],
    [],
  );

  const getClockwise = useCallback(
    (start: Position): Position[] => {
      const index = clockWisePlacement.indexOf(start as string);
      if (index === -1) return clockWisePlacement as Position[];

      const reordered = [
        ...(clockWisePlacement.slice(index + 1) as Position[]),
        ...(clockWisePlacement.slice(0, index) as Position[]),
      ];
      return reordered;
    },
    [clockWisePlacement],
  );

  const checkPosition = useCallback(() => {
    const tooltipPositioning = tooltipRef.current;
    const triggerPositioning = triggerRef.current;
    if (!tooltipPositioning || !triggerPositioning) return;

    const triggerRect = triggerPositioning.getBoundingClientRect();
    const fallbacks = getClockwise(resolvedPlacement);

    for (const positioning of [resolvedPlacement, ...fallbacks]) {
      const tooltipRect = getSimulatedRect(
        triggerRect,
        tooltipPositioning.offsetWidth,
        tooltipPositioning.offsetHeight,
        positioning,
      );

      const fits =
        tooltipRect.top >= 0 &&
        tooltipRect.left >= 0 &&
        tooltipRect.bottom <= window.innerHeight &&
        tooltipRect.right <= window.innerWidth;

      if (fits) {
        setCurrentPlacement(positioning);
        return;
      }
    }
    setCurrentPlacement(resolvedPlacement);
  }, [resolvedPlacement, getClockwise]);

  function getSimulatedRect(
    triggerRect: DOMRect,
    tooltipWidth: number,
    tooltipHeight: number,
    place: Position,
  ) {
    const gap = 8;

    const verticalCenter =
      triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2;
    const horizontalCenter =
      triggerRect.top + triggerRect.height / 2 - tooltipHeight / 2;

    switch (place) {
      case 'top':
        return {
          top: triggerRect.top - tooltipHeight - gap,
          bottom: triggerRect.top - gap,
          left: verticalCenter,
          right: verticalCenter + tooltipWidth,
        };
      case 'top-start':
        return {
          top: triggerRect.top - tooltipHeight - gap,
          bottom: triggerRect.top - gap,
          left: triggerRect.left,
          right: triggerRect.left + tooltipWidth,
        };
      case 'top-end':
        return {
          top: triggerRect.top - tooltipHeight - gap,
          bottom: triggerRect.top - gap,
          left: triggerRect.right - tooltipWidth,
          right: triggerRect.right,
        };
      case 'bottom':
        return {
          top: triggerRect.bottom + gap,
          bottom: triggerRect.bottom + tooltipHeight + gap,
          left: verticalCenter,
          right: verticalCenter + tooltipWidth,
        };
      case 'bottom-start':
        return {
          top: triggerRect.bottom + gap,
          bottom: triggerRect.bottom + gap + tooltipHeight,
          left: triggerRect.left,
          right: triggerRect.left + tooltipWidth,
        };
      case 'bottom-end':
        return {
          top: triggerRect.bottom + gap,
          bottom: triggerRect.bottom + gap + tooltipHeight,
          left: triggerRect.right - tooltipWidth,
          right: triggerRect.right,
        };
      case 'left':
        return {
          top: horizontalCenter,
          bottom: horizontalCenter + tooltipHeight,
          left: triggerRect.left - tooltipWidth - gap,
          right: triggerRect.left - gap,
        };
      case 'left-start':
        return {
          top: triggerRect.top,
          bottom: triggerRect.top + tooltipHeight,
          left: triggerRect.left - tooltipWidth - gap,
          right: triggerRect.left - gap,
        };
      case 'left-end':
        return {
          top: triggerRect.bottom - tooltipHeight,
          bottom: triggerRect.bottom,
          left: triggerRect.left - tooltipWidth - gap,
          right: triggerRect.left - gap,
        };
      case 'right':
        return {
          top: horizontalCenter,
          bottom: horizontalCenter + tooltipHeight,
          left: triggerRect.right + gap,
          right: triggerRect.right + gap + tooltipWidth,
        };
      case 'right-start':
        return {
          top: triggerRect.top,
          bottom: triggerRect.top + tooltipHeight,
          left: triggerRect.right + gap,
          right: triggerRect.right + gap + tooltipWidth,
        };
      case 'right-end':
        return {
          top: triggerRect.bottom - tooltipHeight,
          bottom: triggerRect.bottom,
          left: triggerRect.right + gap,
          right: triggerRect.right + gap + tooltipWidth,
        };
      default:
        return { top: 0, bottom: 0, left: 0, right: 0 };
    }
  }

  useEffect(() => {
    if (show) {
      checkPosition();
      window.addEventListener('resize', checkPosition);
      return () => window.removeEventListener('resize', checkPosition);
    }
  }, [show, checkPosition]);

  useEffect(() => {
    if (trigger !== 'onClick') return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [trigger]);

  const handleMouseEnter = () => {
    if (trigger === 'onHover') setShow(true);
  };

  const handleMouseLeave = () => {
    if (trigger === 'onHover') setShow(false);
  };

  const handleClick = () => {
    if (trigger === 'onClick') setShow((prev) => !prev);
  };

  const classes = tooltip({
    position: currentPlacement,
    caret,
    size,
  });

  return (
    <Box className={classes.wrapper} {...otherProps}>
      <Box
        ref={triggerRef}
        onMouseEnter={trigger === 'onHover' ? handleMouseEnter : undefined}
        onMouseLeave={trigger === 'onHover' ? handleMouseLeave : undefined}
        onClick={trigger === 'onClick' ? handleClick : undefined}
      >
        {children}
      </Box>

      {show && (
        <Box className={cx(classes.tooltipContent, className)} ref={tooltipRef}>
          {title && <Text className={classes.title}>{title}</Text>}
          {text && (
            <Text
              className={classes.text}
              color={title ? 'text.subtlest' : 'text'}
            >
              {text}
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
};
