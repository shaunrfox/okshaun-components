import { BoxProps } from '../Box';
import { ToggleVariantProps } from '../../../styled-system/recipes';
import { default as React } from 'react';
export type ToggleProps = Omit<BoxProps, keyof ToggleVariantProps> & ToggleVariantProps & {
    name: string;
    id?: string;
    error?: boolean;
    disabled?: boolean;
};
export declare const Toggle: React.FC<ToggleProps>;
