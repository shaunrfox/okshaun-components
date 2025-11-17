import { FC, ReactNode } from 'react';
import { BoxProps } from '../Box';
import { ToggleInputVariantProps } from '../../../styled-system/recipes';
export type ToggleInputProps = BoxProps & ToggleInputVariantProps & {
    name: string;
    id?: string;
    error?: boolean;
    children?: string | ReactNode;
};
export declare const ToggleInput: FC<ToggleInputProps>;
