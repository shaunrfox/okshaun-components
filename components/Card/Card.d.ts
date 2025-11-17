import { CardVariantProps } from '../../../styled-system/recipes';
import { BoxProps } from '../Box';
import { ReactNode } from 'react';
export type CardProps = Omit<BoxProps, keyof CardVariantProps> & CardVariantProps & {
    href?: string;
    children?: string | ReactNode;
    grabbed?: boolean;
    disabled?: boolean;
};
export declare const Card: React.FC<CardProps>;
