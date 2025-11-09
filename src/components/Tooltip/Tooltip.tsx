import { Box, type BoxProps } from '../Box';
import { tooltip, type TooltipVariantProps } from '@styled-system/recipes';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Text } from '../Text';

export type Position =
  | 'top' | 'bottom' | 'left' | 'right'
  | 'top-start' | 'bottom-start' | 'left-start' | 'right-start'
  | 'top-end' | 'bottom-end' | 'left-end' | 'right-end';

export type TooltipProps = Omit<BoxProps, keyof TooltipVariantProps> &
  TooltipVariantProps & {
    text: string;
    title?: string;
    caret?: boolean;
    position?: Position;
    children?: ReactNode;
    trigger?: 'onHover' | 'onClick';
  };

export const Tooltip: React.FC<TooltipProps> = ({
  trigger = 'onHover',
  caret = true,
  text,
  title,
  children,
  position = 'bottom',
  ...props
}) => {
  const [currentPlacement, setCurrentPlacement] = useState(position);
  const { wrapper, tooltipContent } = tooltip({
    position: currentPlacement,
    caret,
  });
  const [show, setShow] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const resolvedPlacement =
    typeof position === 'string' ? position : 'bottom';

    const clockWisePlacement : Position[] = ['bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'top', 'top-start', 'top-end', 'right', 'right-start', 'right-end'];

    function getClockwise(start: Position): Position[] {
      const index = clockWisePlacement.indexOf(start);
      if (index === -1) return clockWisePlacement;
    
      const reordered = [...clockWisePlacement.slice(index + 1), ...clockWisePlacement.slice(0, index)];
      return reordered;
    }
  
  
    const checkPosition = () => {
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
    };

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
  }, [show, position]);

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

  return (
    <Box {...props} className={wrapper}>
      <Box
        ref={triggerRef}
        onMouseEnter={trigger === 'onHover' ? handleMouseEnter : undefined}
        onMouseLeave={trigger === 'onHover' ? handleMouseLeave : undefined}
        onClick={trigger === 'onClick' ? handleClick : undefined}
      >
        {children}
      </Box>

      {show && (
        <Box className={tooltipContent} ref={tooltipRef}>
          {title && (
            <Text
              as="p"
              textStyle="body-md"
              bold
              color={{ base: 'gray.0', _dark: 'gray.90' }}
            >
              {title}
            </Text>
          )}
          {text && (
            <Text
              as="span"
              textStyle="body-sm"
              color={{ base: 'gray.0', _dark: 'gray.90' }}
            >
              {text}
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
};
