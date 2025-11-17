import { BoxProps } from '../Box';
import { TooltipVariantProps } from '../../../styled-system/recipes';
import { ReactNode } from 'react';
export type Position = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'bottom-start' | 'left-start' | 'right-start' | 'top-end' | 'bottom-end' | 'left-end' | 'right-end';
export type TooltipProps = Omit<BoxProps, keyof TooltipVariantProps> & TooltipVariantProps & {
    text: string;
    title?: string;
    caret?: boolean;
    position?: Position;
    children?: ReactNode;
    trigger?: 'onHover' | 'onClick';
};
export declare const Tooltip: React.FC<TooltipProps>;
